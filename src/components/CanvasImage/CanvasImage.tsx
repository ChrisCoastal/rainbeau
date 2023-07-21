import { FC, useCallback, useRef, useEffect } from 'react';

// components
import CanvasMarkers from '../CanvasMarkers/CanvasMarkers';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';

// config
import {
  INITIAL_IMAGE,
  MEASUREMENT_PRECISION,
  RGBA_GROUP,
} from '../../utils/constants';

// helpers
import {
  getCanvasDimension,
  rgbToHsl,
  translateApiResponse,
} from '../../utils/helpers';

// hooks
import useAppContext from '../../hooks/useAppContext';
import useMarkers from '../../hooks/useMarkers';
import useCanvasImage from '../../hooks/useCanvasImage';

// styles
import {
  Canvas,
  ChildBox,
  ImageBox,
  MarkersBox,
  BlurFallback,
} from './CanvasImage.styles';
import { create } from 'domain';
import { Blurhash } from 'react-blurhash';

interface CanvasImageProps {
  windowSize: WindowSize;
  currentImageIndex: number;
  children?: React.ReactNode;
}

const CanvasImage: FC<CanvasImageProps> = ({
  currentImageIndex,
  windowSize,
  children,
}) => {
  const { addMarker } = useMarkers();
  const { state, dispatch } = useAppContext();
  const {
    images,
    canvasXY,
    // currentImageIndex,
    currentImageData,
    paletteMarkers,
    isLoading,
    isError,
  } = state;

  const imageURL = images[currentImageIndex]?.imageURL || null;
  const imageBlurHash = images[currentImageIndex]?.blurImage || null;

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const imageBoxRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  // px color/position data for current image
  const sampledPxData = useRef<IndexedPxColor[]>([]);

  const setImageDataState = useCallback(
    (imageData: Uint8ClampedArray) => {
      const dataPoints = imageData.length;
      const sampled: IndexedPxColor[] = [];
      // imageData[] format is [r,g,b,a,r,g,b,a...]
      const sampleRate = RGBA_GROUP * MEASUREMENT_PRECISION;

      for (let i = 0; i < dataPoints; i += sampleRate) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        // const a = imageData[i + 3]; // this is the alpha channel; account for if transparency
        // const { h, s, l } = rgbToHsl({ r, g, b });

        sampled.push({ r, g, b, i });
      }
      sampledPxData.current = sampled;
      dispatch({
        type: 'setCurrentImageData',
        payload: sampled,
      });
      return sampled;
    },
    [dispatch]
  );

  const onImageDraw = useCallback(
    (imageDrawn: boolean) => {
      if (!imageDrawn) dispatch({ type: 'setError', payload: true });
      dispatch({
        type: 'setLoading',
        payload: false,
      });
    },
    [dispatch]
  );

  const createCanvas = useCallback(() => {
    if (canvasRef.current === null || imageBoxRef.current === null) return;
    canvasCtxRef.current = canvasRef.current.getContext('2d', {
      willReadFrequently: true,
    })!;
    const ctx = canvasCtxRef.current;
    // const devicePixelRatio = window.devicePixelRatio || 1;

    // assign the dimension of the grid area to the canvas
    ctx.canvas.width = imageBoxRef.current.getBoundingClientRect().width;
    ctx.canvas.height = imageBoxRef.current.getBoundingClientRect().height;
    const canvasXY = {
      x: ctx.canvas.width,
      y: ctx.canvas.height,
    };
    return { ctx, canvasXY };
  }, []);

  const drawCanvasImage = useCallback(
    (ctx: CanvasRenderingContext2D, canvasXY: { x: number; y: number }) => {
      if (!imageURL) return;
      console.log(canvasXY);
      const canvasImage = new Image();
      canvasImage.setAttribute('crossOrigin', 'anonymous');

      // asign image to canvas context
      canvasImage.src = imageURL;

      // after image is loaded
      canvasImage.onload = () => {
        sampledPxData.current = []; // reset from previous image

        // drawImage(image, startx, starty, widthx, widthy)
        ctx.drawImage(canvasImage, 0, 0, canvasXY.x, canvasXY.y);
        const imageData = ctx.getImageData(0, 0, canvasXY.x, canvasXY.y).data;
        onImageDraw(!!imageData);

        const indexedImagePx = setImageDataState(imageData);
        addMarker(indexedImagePx, !paletteMarkers.length ? 1 : 0);
      };
    },
    [imageURL, addMarker, onImageDraw, paletteMarkers.length, setImageDataState]
  );

  useEffect(() => {
    dispatch({ type: 'setLoading', payload: true });

    const canvas = createCanvas();
    if (!canvas?.ctx) return;

    drawCanvasImage(canvas.ctx, canvas.canvasXY);

    // FIXME: intinite rerenders from currentImageData dep in addMarkerHandler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageURL, setImageDataState, onImageDraw]);

  useEffect(() => {
    const initImage = translateApiResponse(INITIAL_IMAGE);
    dispatch({ type: 'setImages', payload: [initImage] });
    // changeImageHandler(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateResizeMarkers = useCallback(
    (
      prevCanvasXY: { x: number; y: number },
      canvasXY: { x: number; y: number }
    ) => {
      const xRatio = canvasXY.x / prevCanvasXY.x;
      const yRatio = canvasXY.y / prevCanvasXY.y;
      const translatedMarkers: ColorMarker[] = paletteMarkers.map((marker) => {
        const translateX = Math.floor(marker.x * xRatio);
        const translateY = Math.floor(marker.y * yRatio);
        return { ...marker, x: translateX, y: translateY };
      });
      dispatch({
        type: 'deletePalette',
      });
      dispatch({ type: 'setCanvasXY', payload: canvasXY });

      if (translatedMarkers.length) {
        dispatch({
          type: 'addMarker',
          payload: translatedMarkers,
        });
      }
    },
    [dispatch, paletteMarkers]
  );

  // resize canvas and translate markers on window resize event
  useEffect(() => {
    console.log('resize');
    if (canvasCtxRef.current) {
      const ctx = canvasCtxRef.current;

      // throttle resize effects
      if (timerRef.current) clearTimeout(timerRef.current);
      const timer = setTimeout(() => {
        // dispatch({ type: 'setLoading', payload: true });
        const prevCanvasXY = {
          x: ctx.canvas.width,
          y: ctx.canvas.height,
        };

        const canvas = createCanvas();
        if (!canvas?.ctx) return;

        drawCanvasImage(canvas.ctx, canvas.canvasXY);
        updateResizeMarkers(prevCanvasXY, canvas.canvasXY);
        timerRef.current = null;
      }, 150);

      timerRef.current = timer;
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize.innerHeight, windowSize.innerWidth, dispatch]);

  return (
    <>
      {isError && <p>There was an error. Please try again.</p>}
      <ImageBox
        ref={imageBoxRef}
        className="imageBox"
        style={{ touchAction: 'none' }}
      >
        {isLoading && <LoadingSpinner />}
        <Canvas ref={canvasRef} />
        <BlurFallback>
          {imageBlurHash && (
            <Blurhash
              hash={imageBlurHash}
              width="100%"
              height="100%"
              style={{
                gridArea: 'image',
                aspectRatio: '1/1',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            />
          )}
        </BlurFallback>
        {/* <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} /> */}
      </ImageBox>
      <MarkersBox className="markerBox">
        <CanvasMarkers />
      </MarkersBox>
      <ChildBox>{children}</ChildBox>
    </>
  );
};

export default CanvasImage;

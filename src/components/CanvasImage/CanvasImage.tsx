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
import { rgbToHsl, translateApiResponse } from '../../utils/helpers';

// hooks
import useAppContext from '../../hooks/useAppContext';
import useMarkers from '../../hooks/useMarkers';
import useCanvasImage from '../../hooks/useCanvasImage';

// styles
import { Canvas, ImageBox, MarkersBox } from './CanvasImage.styles';
import useResizeWindow from '../../hooks/useResizeWindow';

interface CanvasImageProps {
  windowSize: WindowSize;
  currentImageIndex: number;
}

const CanvasImage: FC<CanvasImageProps> = ({
  currentImageIndex,
  windowSize,
}) => {
  const { state, dispatch } = useAppContext();
  const { addMarker } = useMarkers();
  // const { innerWidth } = useResizeWindow();
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
        const { h, s, l } = rgbToHsl({ r, g, b });

        sampled.push({ r, g, b, h, s, l, i } as IndexedPxColor);
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
    canvasCtxRef.current = canvasRef.current.getContext('2d')!;
    const ctx = canvasCtxRef.current;
    // const devicePixelRatio = window.devicePixelRatio || 1;
    console.log(
      canvasRef.current?.getBoundingClientRect(),
      canvasRef.current,
      ctx,
      imageBoxRef.current?.getBoundingClientRect()
    );
    // assign the dimension of the grid area to the canvas
    ctx.canvas.width = imageBoxRef.current.getBoundingClientRect().width;
    ctx.canvas.height = imageBoxRef.current.getBoundingClientRect().height;
    const canvasXY = {
      x: ctx.canvas.width,
      y: ctx.canvas.height,
    };
    console.log(canvasXY);
    return { ctx, canvasXY };
  }, []);

  const drawCanvasImage = useCallback(
    (ctx: CanvasRenderingContext2D, canvasXY: { x: number; y: number }) => {
      if (!imageURL) return;
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

  useEffect(() => {
    if (windowSize.innerWidth * 0.9 !== canvasXY.y) {
      dispatch({ type: 'setLoading', payload: true });

      const canvas = createCanvas();
      if (!canvas?.ctx) return;

      drawCanvasImage(canvas.ctx, canvas.canvasXY);
    }
  }, [windowSize, canvasXY]);

  return (
    <>
      {isError && <p>There was an error. Please try again.</p>}
      <ImageBox ref={imageBoxRef} className="imageBox" canvasXY={canvasXY}>
        {isLoading && <LoadingSpinner />}
        <Canvas ref={canvasRef} />
        {/* <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} /> */}
      </ImageBox>
      <MarkersBox className="markerBox" canvasXY={canvasXY}>
        <CanvasMarkers
          // paletteMarkers={paletteMarkers}
          // currentImageData={currentImageData}
          canvasXY={canvasXY}
          canvasBound={canvasRef.current?.getBoundingClientRect()}
          // dispatch={dispatch}
        />
      </MarkersBox>
    </>
  );
};

export default CanvasImage;

import { FC, useCallback, useState, useRef, useEffect } from 'react';

// components
import CanvasMarkers from '../CanvasMarkers/CanvasMarkers';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';

// mui
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

// config
import {
  // CANVAS_RESOLUTION,
  MEASUREMENT_PRECISION,
  RGBA_GROUP,
} from '../../utils/constants';

// helpers
import {
  getCanvasDimension,
  getPxGroupXY,
  rgbToColorName,
  rgbToHsl,
} from '../../utils/helpers';

// hooks
import useAppContext from '../../hooks/useContext';

// styles
import { Canvas, ImageBox, MarkersBox } from './CanvasImage.styles';

interface CanvasImageProps {
  imageURL: string | null;
  // paletteMarkers: ColorMarker[];
  addMarkerHandler: (
    _: React.MouseEvent<HTMLElement, MouseEvent> | null,
    indexedImagePx?: IndexedPxColor[],
    markerQty?: number
  ) => ColorMarker[];
  // currentImageData: IndexedPxColor[];
  // isLoading: boolean;
  // isError: boolean;
  // dispatch: React.Dispatch<ReducerActions>;
}

const CanvasImage: FC<CanvasImageProps> = ({
  imageURL,
  addMarkerHandler,
  // paletteMarkers,
  // currentImageData,
  // isLoading,
  // isError,
  // dispatch,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const { state, dispatch } = useAppContext();
  const { images, currentImageData, paletteMarkers, isLoading, isError } =
    state;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const canvasXY = {
    x: canvasCtxRef.current?.canvas.width,
    y: canvasCtxRef.current?.canvas.height,
  };

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

  // useEffect(() => {
  //   const canvasXY = {
  //     x: canvasCtxRef.current?.canvas.width,
  //     y: canvasCtxRef.current?.canvas.height,
  //   };

  //   dispatch({ type: 'setCanvasXY', payload: canvasXY });
  // }, [canvasCtxRef.current]);

  const onImageDraw = useCallback(
    (imageDrawn: boolean) => {
      if (!imageDrawn) {
        dispatch({ type: 'setError', payload: true });
        dispatch({
          type: 'setLoading',
          payload: false,
        });
      }
    },
    [dispatch]
  );

  useEffect(() => {
    // setIsLoading(true);
    if (!imageURL || canvasRef.current === null) return;
    canvasCtxRef.current = canvasRef.current.getContext('2d')!;
    const ctx = canvasCtxRef.current;
    const devicePixelRatio = window.devicePixelRatio || 1;
    console.log(
      canvasRef.current?.getBoundingClientRect(),
      canvasRef.current,
      ctx
    );
    // define canvas resolution
    ctx.canvas.width = 720 / devicePixelRatio;
    ctx.canvas.height = 720 / devicePixelRatio;

    // dev test marker accuracy (if testing, comment out ctx.drawImage)
    // ctx!.fillStyle = '#FF0000';
    // ctx!.fillRect(0, 0, 400, 800);
    // ctx!.fillStyle = '#00FF00';
    // ctx!.fillRect(400, 0, 800, 800);

    const canvasImage = new Image();
    canvasImage.setAttribute('crossOrigin', 'anonymous');

    // after image is loaded
    canvasImage.onload = () => {
      sampledPxData.current = []; // reset from previous image

      // drawImage(image, startx, starty, widthx, widthy)
      ctx.drawImage(canvasImage, 0, 0, ctx.canvas.width, ctx.canvas.height);
      // setIsLoading(false);
      const imageData = ctx.getImageData(
        0,
        0,
        ctx.canvas.width,
        ctx.canvas.height
      ).data;

      console.log(imageData);
      onImageDraw(!!imageData);

      const indexedImagePx = setImageDataState(imageData);
      console.log(indexedImagePx);
      // createMarkers(indexedImagePx);
      addMarkerHandler(null, indexedImagePx, !paletteMarkers.length ? 1 : 0);

      console.log(canvasRef.current?.getBoundingClientRect());
    };

    // asign image to canvas context
    canvasImage.src = imageURL;

    // FIXME: intinite rerenders from currentImageData dep in addMarkerHandler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageURL, setImageDataState, onImageDraw]);

  return (
    <>
      {isError && <p>There was an error. Please try again.</p>}
      <ImageBox>
        {isLoading && <LoadingSpinner />}
        <Canvas ref={canvasRef} />
      </ImageBox>
      <MarkersBox>
        <CanvasMarkers
          paletteMarkers={paletteMarkers}
          currentImageData={currentImageData}
          canvasXY={canvasXY}
          canvasBound={canvasRef.current?.getBoundingClientRect()}
          dispatch={dispatch}
        />
      </MarkersBox>
      {/* <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} /> */}
    </>
  );
};

export default CanvasImage;

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
import useMarkers from '../../hooks/useMarkers';

// styles
import { Canvas, ImageBox, MarkersBox } from './CanvasImage.styles';
import useResizeWindow from '../../hooks/useResizeWindow';
interface CanvasImageProps {
  currentImageIndex: number;
}

const CanvasImage: FC<CanvasImageProps> = ({ currentImageIndex }) => {
  const { state, dispatch } = useAppContext();
  const { addMarker } = useMarkers();
  const { clientWidth } = useResizeWindow();
  const {
    images,
    canvasXY,
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

  useEffect(() => {
    if (!imageURL || canvasRef.current === null || imageBoxRef.current === null)
      return;
    dispatch({ type: 'setLoading', payload: true });
    canvasCtxRef.current = canvasRef.current.getContext('2d')!;
    const ctx = canvasCtxRef.current;
    const devicePixelRatio = window.devicePixelRatio || 1;
    console.log(
      canvasRef.current?.getBoundingClientRect(),
      canvasRef.current,
      ctx,
      imageBoxRef.current?.getBoundingClientRect()
    );
    // assign the dimension of the grid area to the canvas
    ctx.canvas.width =
      imageBoxRef.current.getBoundingClientRect().width / devicePixelRatio;
    ctx.canvas.height =
      imageBoxRef.current.getBoundingClientRect().height / devicePixelRatio;
    const canvasXY = {
      x: ctx.canvas.width,
      y: ctx.canvas.height,
    };
    console.log(canvasXY);
    dispatch({ type: 'setCanvasXY', payload: canvasXY });
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
      addMarker(indexedImagePx, !paletteMarkers.length ? 1 : 0);
      console.log(canvasRef.current?.getBoundingClientRect());
    };

    // asign image to canvas context
    canvasImage.src = imageURL;

    // FIXME: intinite rerenders from currentImageData dep in addMarkerHandler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageURL, setImageDataState, onImageDraw, clientWidth]);
  console.log(canvasXY);
  return (
    <>
      {isError && <p>There was an error. Please try again.</p>}
      <ImageBox ref={imageBoxRef} className="imageBox" canvasXY={canvasXY}>
        {isLoading && <LoadingSpinner />}
        <Canvas ref={canvasRef} />
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
      {/* <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} /> */}
    </>
  );
};

export default CanvasImage;

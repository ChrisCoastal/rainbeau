import { FC, useCallback } from 'react';
import React, { useRef, useEffect } from 'react';

// images
import purpleImage from '../../assets/images/martin-brechtl-zs3HRrWW66A-unsplash.jpg';

// components
import CanvasMarkers from '../CanvasMarkers/CanvasMarkers';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';

// mui
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

// config
import {
  CANVAS_RESOLUTION,
  MEASUREMENT_PRECISION,
  RGBA_GROUP,
} from '../../utils/config';

// helpers
import { getPxGroupXY, rgbToColorName, rgbToHsl } from '../../utils/helpers';

// styles
import { Wrapper, Canvas, ImageFallback } from './CanvasImage.styles';

interface CanvasImageProps {
  imageURL: string | null;
  paletteMarkers: ColorMarker[];
  addMarkers: (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    markerQty?: number
  ) => ColorMarker[];
  currentImageData: IndexedPxColor[];
  isLoading: boolean;
  isError: boolean;
  onImageDraw: (imageDrawn: boolean) => void;
  dispatch: React.Dispatch<ReducerActions>;
}

const CanvasImage: FC<CanvasImageProps> = ({
  imageURL,
  paletteMarkers,
  currentImageData,
  isLoading,
  isError,
  onImageDraw,
  dispatch,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  const canvasXY = {
    x: canvasCtxRef.current?.canvas.width,
    y: canvasCtxRef.current?.canvas.height,
  };

  // px color/position data for current image
  const sampledPxData = useRef<IndexedPxColor[]>([]);

  const createMarkers = useCallback(
    (indexedImagePx: IndexedPxColor[], markerQty: number = 3) => {
      const markers: ColorMarker[] = [];
      const totalPx = indexedImagePx.length; // 640000
      // TODO: sort by hue

      for (let loop = 0; loop < markerQty; loop++) {
        const randomIndex = Math.floor(Math.random() * totalPx);
        const randomPx = indexedImagePx[randomIndex];
        const { r, g, b } = randomPx;
        markers.push({
          ...randomPx,
          xy: getPxGroupXY(randomPx.i),
          name: rgbToColorName({ r, g, b }),
        });
      }

      dispatch({ type: 'addMarker', payload: markers });
      return markers;
    },
    [dispatch]
  );

  const setImageDataState = useCallback(
    (imageData: Uint8ClampedArray) => {
      const dataPoints = imageData.length;
      // imageData[] format is [r,g,b,a,r,g,b,a...]
      const sampleRate = RGBA_GROUP * MEASUREMENT_PRECISION;
      console.log('calculating image data...');

      for (let i = 0; i < dataPoints; i += sampleRate) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        // const a = imageData[i + 3]; // this is the alpha channel; account for if transparency
        const { h, s, l } = rgbToHsl({ r, g, b });

        //prettier-ignore
        sampledPxData.current.push({r, g, b, h, s, l, i} as IndexedPxColor);
      }

      dispatch({
        type: 'setCurrentImageData',
        payload: sampledPxData.current,
      });
      return sampledPxData.current;
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

  useEffect(() => {
    // setIsLoading(true);
    if (imageURL === null || canvasRef.current === null) return;
    canvasCtxRef.current = canvasRef.current.getContext('2d')!;
    const ctx = canvasCtxRef.current;
    const devicePixelRatio = window.devicePixelRatio || 1;

    // define canvas resolution
    ctx.canvas.width = CANVAS_RESOLUTION.med / devicePixelRatio;
    ctx.canvas.height = CANVAS_RESOLUTION.med / devicePixelRatio;

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
      const imageData = ctx!.getImageData(
        0,
        0,
        ctx.canvas.width,
        ctx.canvas.height
      ).data;

      onImageDraw(!!imageData);

      const indexedImagePx = setImageDataState(imageData);
      createMarkers(indexedImagePx);

      console.log(canvasRef.current?.getBoundingClientRect());
    };

    // asign image to canvas context
    canvasImage.src = imageURL;
  }, [imageURL, createMarkers, setImageDataState, onImageDraw]);

  return (
    <Wrapper>
      {isLoading && <LoadingSpinner />}
      {isError && <p>There was an error. Please try again.</p>}
      <CanvasMarkers
        paletteMarkers={paletteMarkers}
        currentImageData={currentImageData}
        canvasXY={canvasXY}
        canvasBound={canvasRef.current?.getBoundingClientRect()}
        dispatch={dispatch}
      />
      <Canvas ref={canvasRef}>
        <ImageFallback src={purpleImage} alt="Fallback image" />
      </Canvas>
      <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
    </Wrapper>
  );
};

export default CanvasImage;

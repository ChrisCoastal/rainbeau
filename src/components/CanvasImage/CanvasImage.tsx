import { FC, useCallback } from 'react';
import React, { useRef, useEffect, useState } from 'react';

// firestore
import database from '../../firestore.config';
import { doc, getDoc, collection } from 'firebase/firestore';

// hooks
import useAddMarkers from '../../hooks/useAddMarkers';
import useFetch from '../../hooks/useFetch';

// images
import redImage from '../../images/brennan-ehrhardt-HALe2SmkWAI-unsplash.jpg';
import purpleImage from '../../images/martin-brechtl-zs3HRrWW66A-unsplash.jpg';

// components
import CanvasMarkers from '../CanvasMarkers/CanvasMarkers';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';

// config
import {
  DUMMY_RESPONSE,
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
  // addMarkers: (markerQty?: number) => ColorMarker[];
  currentImageData: IndexedPxColor[];
  dispatch: React.Dispatch<ReducerActions>;
}

const CanvasImage: FC<CanvasImageProps> = ({
  imageURL,
  paletteMarkers,
  // addMarkers,
  currentImageData,
  dispatch,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  const canvasXY = [
    canvasCtxRef.current?.canvas.width,
    canvasCtxRef.current?.canvas.height,
  ];
  console.log(canvasXY);

  console.log(paletteMarkers);

  // px color/position data for current image
  const sampledPxData = useRef<IndexedPxColor[]>([]);

  const createMarkers = useCallback(
    (indexedImagePx: IndexedPxColor[], markerQty: number = 3) => {
      const markers: ColorMarker[] = [];
      const totalPx = indexedImagePx.length; // 640000
      // TODO: sort by hue
      // const sortedPxGroups = getSortedPx([...indexedImagePx], 'h');
      // console.log('SORTED', sortedPxGroups, 'UNSORTED', indexedImagePx);

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

  // get images from api
  useEffect(() => {
    const API_KEY = process.env!.REACT_APP_UNSPLASH_API_KEY;
    (async () => {
      try {
        //////////////// UNSPLASH API
        // get unsplash key from firestore
        // const col = await collection(database, 'unsplash_api');
        // const keyRef = doc(database, 'unsplash_api', 'key');
        // const reponse = await getDoc(keyRef); //.then((response) => console.log(response));
        // const apiKey = reponse.data()?.key;
        // console.log(apiKey);

        // if (apiKey === undefined) throw new Error('No response from database');
        //   // TODO: switch to apiKey for production
        // const response = await fetch(
        //   `https://api.unsplash.com/photos/random?count=1&orientation=squarish&client_id=${API_KEY}`,
        //   {
        //     method: 'GET',
        //     headers: {
        //       'Content-Type': 'application/json',
        //       'Accept-Version': 'v1',
        //     },
        //   }
        // );
        // const data: APIResponse = await response.json();
        ///////////////

        // test data from unsplash api
        const data = DUMMY_RESPONSE;

        const imageData = data.map((image) => ({
          altText: image.alt_description || image.description,
          blurImage: image.blur_hash,
          color: image.color,
          imageDimensions: { x: image.width, y: image.height },
          imageURL: image.urls.full,
          imageThumb: image.urls.thumb,
          downloadLink: image.links.download,
          id: image.id,
          artistName: image.user.name || image.user.username,
          artistLink: image.user.portfolio_url,
        }));
        console.log(data, imageData);
        dispatch({ type: 'setImages', payload: imageData });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // create initial markers
  useEffect(() => {
    setIsLoading(true);
    if (imageURL === null) return;
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
      const ctx = canvasCtxRef.current;

      // define canvas resolution
      ctx!.canvas.width = CANVAS_RESOLUTION.med;
      ctx!.canvas.height = CANVAS_RESOLUTION.med;

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
        ctx?.drawImage(canvasImage, 0, 0, ctx.canvas.width, ctx.canvas.height);
        setIsLoading(false);

        const imageData = ctx!.getImageData(
          0,
          0,
          ctx!.canvas.width,
          ctx!.canvas.height
        ).data;

        const indexedImagePx = setImageDataState(imageData);
        const markers = createMarkers(indexedImagePx);

        console.log(canvasRef.current?.getBoundingClientRect());
      };

      // asign image to canvas context
      // canvasImage.src = redImage;
      canvasImage.src = imageURL;
    }
  }, [imageURL, createMarkers, setImageDataState]);

  return (
    <>
      <Wrapper>
        {isLoading && <LoadingSpinner />}
        <CanvasMarkers
          paletteMarkers={paletteMarkers}
          currentImageData={currentImageData}
          canvasXY={canvasXY}
          canvasBound={canvasRef.current?.getBoundingClientRect()}
          dispatch={dispatch}
        />
        <Canvas ref={canvasRef}>
          <ImageFallback src={redImage} alt="Fallback image" />
        </Canvas>
      </Wrapper>
    </>
  );
};

export default CanvasImage;

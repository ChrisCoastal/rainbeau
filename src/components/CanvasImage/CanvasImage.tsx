import { FC, useCallback } from 'react';
import React, { useRef, useEffect, useState } from 'react';

// hooks
import useAddMarkers from '../../hooks/useAddMarkers';
import useFetch from '../../hooks/useFetch';

// images
import redImage from '../../images/brennan-ehrhardt-HALe2SmkWAI-unsplash.jpg';
import purpleImage from '../../images/martin-brechtl-zs3HRrWW66A-unsplash.jpg';

// components
import CanvasMarkers from '../CanvasMarker/CanvasMarkers';
import LoadingSpinner from '../../UI/LoadingSpinner';

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
  imageURL: string;
  paletteMarkers: ColorMarker[];
  // addMarkers: (markerQty?: number) => ColorMarker[];
  currentImageData: IndexedPxColor[];
  dispatch: React.Dispatch<ReducerActions>;
}

const DUMMY_RESPONSE = [
  {
    alt_description: null,
    blur_hash: 'L5I=faX9WS-DpwWI1cI-E4S*E[^0',
    categories: [],
    color: '#c0d9f3',
    created_at: '2022-06-20T10:19:27Z',
    current_user_collections: [],
    description:
      'Chip design: “AI is set to revolutionise chip design. Chips are specifically made for each specific task on an AI. They are designed to perform at their best capacity in a computer vision algorithm as visualised through this artwork.” Artist: Champ Panupong Techawongthawon',
    downloads: 1366,
    exif: {
      make: null,
      model: null,
      name: null,
      exposure_time: null,
      aperture: null,
    },
    height: 4000,
    id: 'fOwb7GrCg5I',
    liked_by_user: false,
    likes: 33,
    links: {
      download:
        'https://unsplash.com/photos/fOwb7GrCg5I/download?ixid=MnwzNDUxODl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTg5MDQxMjU',
      download_location:
        'https://api.unsplash.com/photos/fOwb7GrCg5I/download?ixid=MnwzNDUxODl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTg5MDQxMjU',
      html: 'https://unsplash.com/photos/fOwb7GrCg5I',
      self: 'https://api.unsplash.com/photos/fOwb7GrCg5I',
    },
    location: { title: null, name: null, city: null, country: null },
    promoted_at: '2022-07-01T06:56:01Z',
    sponsorship: null,
    topic_submissions: {},
    updated_at: '2022-07-26T07:28:05Z',
    urls: {
      full: 'https://images.unsplash.com/photo-1655720028125-d5979d4bf62f?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzNDUxODl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTg5MDQxMjU&ixlib=rb-1.2.1&q=80',
      raw: 'https://images.unsplash.com/photo-1655720028125-d5979d4bf62f?ixid=MnwzNDUxODl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTg5MDQxMjU&ixlib=rb-1.2.1',
      regular:
        'https://images.unsplash.com/photo-1655720028125-d5979d4bf62f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDUxODl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTg5MDQxMjU&ixlib=rb-1.2.1&q=80&w=1080',
      small:
        'https://images.unsplash.com/photo-1655720028125-d5979d4bf62f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDUxODl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTg5MDQxMjU&ixlib=rb-1.2.1&q=80&w=400',
      small_s3:
        'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1655720028125-d5979d4bf62f',
      thumb:
        'https://images.unsplash.com/photo-1655720028125-d5979d4bf62f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDUxODl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTg5MDQxMjU&ixlib=rb-1.2.1&q=80&w=200',
    },
    user: {
      accepted_tos: true,
      bio: 'We’re a team of scientists, engineers, ethicists and more, committed to solving intelligence, to advance science and benefit humanity.',
      first_name: 'DeepMind',
      for_hire: false,
      id: '1yTi39xvCxo',
      instagram_username: 'visualising.ai',
      last_name: null,
      links: {
        self: 'https://api.unsplash.com/users/deepmind',
        html: 'https://unsplash.com/@deepmind',
        photos: 'https://api.unsplash.com/users/deepmind/photos',
        likes: 'https://api.unsplash.com/users/deepmind/likes',
        portfolio: 'https://api.unsplash.com/users/deepmind/portfolio',
      },
      location: null,
      name: 'DeepMind',
      portfolio_url: 'http://www.deepmind.com',
      profile_image: {
        small:
          'https://images.unsplash.com/profile-1655482131364-…mage?ixlib=rb-1.2.1&crop=faces&fit=crop&w=32&h=32',
        medium:
          'https://images.unsplash.com/profile-1655482131364-…mage?ixlib=rb-1.2.1&crop=faces&fit=crop&w=64&h=64',
        large:
          'https://images.unsplash.com/profile-1655482131364-…ge?ixlib=rb-1.2.1&crop=faces&fit=crop&w=128&h=128',
      },
      social: {
        instagram_username: 'visualising.ai',
        portfolio_url: 'http://www.deepmind.com',
        twitter_username: 'deepmind',
        paypal_email: null,
      },
      total_collections: 4,
      total_likes: 0,
      total_photos: 46,
      twitter_username: 'deepmind',
      updated_at: '2022-07-27T06:35:39Z',
      username: 'deepmind',
    },
    views: 261139,
    width: 4000,
  },
];

const CanvasImage: FC<CanvasImageProps> = ({
  imageURL,
  paletteMarkers,
  // addMarkers,
  currentImageData,
  dispatch,
}) => {
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [error, setError] = useState<boolean>(false);

  // const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  // const canvasXY = [
  //   canvasCtxRef.current?.canvas.width,
  //   canvasCtxRef.current?.canvas.height,
  // ];
  // console.log(palette);

  // const sampledPxData = useRef<IndexedPxColor[]>([]);
  // // const sampledPxData = useRef<IndexedPxColor[]>([]);
  // const channelTotal = useRef<rgbType>({ r: 0, g: 0, b: 0 });

  // const createCanvas = () => {
  //   return;
  // };

  // const fetchImages = useCallback(async () => {
  //   // const response = await fetch(
  //   //   // TODO: add query
  //   //   'https://api.unsplash.com/photos/random?count=1&orientation=squarish&client_id=CLIENTID',
  //   //   {
  //   //     method: 'GET',
  //   //     headers: {
  //   //       'Content-Type': 'application/json',
  //   //       'Accept-Version': 'v1',
  //   //     },
  //   //   }
  //   // );
  //   // const data: APIResponse = await response.json();
  //   // const data: APIResponse = DUMMY_RESPONSE;
  //   const data = DUMMY_RESPONSE;
  //   console.log(data);

  //   const imageData = data.map((image) => ({
  //     altText: image.alt_description || image.description,
  //     blurImage: image.blur_hash,
  //     color: image.color,
  //     imageDimensions: { x: image.width, y: image.height },
  //     imageURL: image.urls.full,
  //     imageThumb: image.urls.thumb,
  //     downloadLink: image.links.download,
  //     id: image.id,
  //     artistName: image.user.name || image.user.username,
  //     artistLink: image.user.portfolio_url,
  //   }));
  //   console.log(imageData);

  //   dispatch({ type: 'setImages', payload: imageData });
  // }, []);

  // const setImageDataState = useCallback((imageData: Uint8ClampedArray) => {
  //   const dataPoints = imageData.length;
  //   const sampleRate = RGBA_GROUP * MEASUREMENT_PRECISION;
  //   // const pxMeasuredPerChannel = dataPoints / sampleRate;

  //   for (let i = 0; i < dataPoints; i += sampleRate) {
  //     const r = imageData[i];
  //     const g = imageData[i + 1];
  //     const b = imageData[i + 2];
  //     // const a = imageData[i + 3]; // this is the alpha channel; can be accounted for if transparency
  //     const { h, s, l } = rgbToHsl({ r, g, b });
  //     const xy = getPxGroupXY(i);

  //     //prettier-ignore
  //     sampledPxData.current.push({r, g, b, h, s, l, i, xy});
  //     channelTotal.current.r += r;
  //     channelTotal.current.g += g;
  //     channelTotal.current.b += b;
  //   }

  //   dispatch({
  //     type: 'setCurrentImageData',
  //     payload: sampledPxData.current,
  //   });
  // }, []);

  // // get images from api
  // useEffect(() => {
  //   try {
  //     fetchImages();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [fetchImages]); // memoized

  //TODO:
  // useEffect(() => {
  //   if (canvasRef.current) {
  //     canvasCtxRef.current = canvasRef.current.getContext('2d');
  //     const ctx = canvasCtxRef.current;

  //     // define canvas resolution
  //     ctx!.canvas.width = CANVAS_RESOLUTION.med;
  //     ctx!.canvas.height = CANVAS_RESOLUTION.med;
  //   }
  // }, []);

  //TODO:
  // const getInitialMarkerPositions = (imageData: IndexedPxColor[]) => {
  //   const markers: IndexedPxColor[] = [];
  //   const totalDataPoints = imageData.length; // 640000
  //   // sort by hue
  //   // const sortedPxGroups = getSortedPx([...imageData], 'h');
  //   // console.log('SORTED', sortedPxGroups, 'UNSORTED', imageData);

  //   // for (let i = 0; i < 3; i++) {
  //   const randomPx = Math.floor(Math.random() * totalDataPoints);
  //   markers.push(imageData[randomPx]);
  //   // }

  //   console.log('markersss', markers);

  //   return markers;
  // };

  // const addMarker = useCallback(
  //   (marker: IndexedPxColor) => {
  //     dispatch({ type: 'addMarker', payload: marker });
  //   },
  //   [dispatch]
  // );

  // // load image to canvas and create initial markers
  // useEffect(() => {
  //   setIsLoading(true);
  //   if (!imageURL) return;

  //   const ctx = canvasCtxRef.current;
  //   const canvasImage = new Image();
  //   // allow images from API
  //   canvasImage.setAttribute('crossOrigin', 'anonymous');

  //   // after image is loaded
  //   canvasImage.onload = () => {
  //     sampledPxData.current = []; // reset from previous image
  //     channelTotal.current = { r: 0, g: 0, b: 0 }; // reset from previous image

  //     // dev test marker accuracy
  //     ctx!.fillStyle = '#FF0000';
  //     ctx!.fillRect(0, 0, 400, 800);
  //     ctx!.fillStyle = '#00FF00';
  //     ctx!.fillRect(400, 0, 800, 800);
  //     // drawImage(image, startx, starty, widthx, widthy)
  //     // ctx?.drawImage(canvasImage, 0, 0, ctx.canvas.width, ctx.canvas.height);

  //     setIsLoading(false);

  //     console.log('Bound', canvasRef.current?.getBoundingClientRect());
  //     // rgba [] from loaded image
  //     const imageData = ctx!.getImageData(
  //       0,
  //       0,
  //       ctx!.canvas.width,
  //       ctx!.canvas.height
  //     ).data;

  //     setImageDataState(imageData);
  //     const markers = getInitialMarkerPositions(sampledPxData.current);

  //     // add initial markers
  //     markers.map((marker) => addMarker(marker));
  //   };

  //   // asign image src to canvas context
  //   canvasImage.src = imageURL;
  //   // update when image is URL is passed from props
  // }, [imageURL, setImageDataState, addMarker]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const newMarkers = useAddMarkers;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  const canvasXY = [
    canvasCtxRef.current?.canvas.width,
    canvasCtxRef.current?.canvas.height,
  ];
  console.log(paletteMarkers);

  const sampledPxData = useRef<IndexedPxColor[]>([]);
  // const sampledPxData = useRef<IndexedPxColor[]>([]);
  const channelTotal = useRef<rgbType>({ r: 0, g: 0, b: 0 });

  const createCanvas = () => {
    return;
  };

  // function addMarker(imagePx: IndexedPxColor) {
  //   dispatch({ type: 'addMarker', payload: imagePx });
  // }

  const createMarkers = useCallback(
    (indexedImagePx: IndexedPxColor[], markerQty: number = 3) => {
      const markers: ColorMarker[] = [];
      const totalPx = indexedImagePx.length; // 640000
      // sort by hue
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
      const sampleRate = RGBA_GROUP * MEASUREMENT_PRECISION;
      // const pxMeasuredPerChannel = dataPoints / sampleRate;

      for (let i = 0; i < dataPoints; i += sampleRate) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        // const a = imageData[i + 3]; // this is the alpha channel; can be accounted for if transparency
        const { h, s, l } = rgbToHsl({ r, g, b });
        // const xy = getPxGroupXY(i);

        //prettier-ignore
        sampledPxData.current.push({r, g, b, h, s, l, i} as IndexedPxColor);
        channelTotal.current.r += r;
        channelTotal.current.g += g;
        channelTotal.current.b += b;
      }

      dispatch({
        type: 'setCurrentImageData',
        payload: sampledPxData.current,
      });
      return sampledPxData.current;
    },
    [dispatch]
  );
  // const { data: apiData, error: fetchError } = useFetch();
  // console.log(data, fetchError);

  const getImages = async () => {
    const { data, fetch } = useFetch();
  };

  // get images from api
  useEffect(() => {
    const API_KEY = process.env!.UNSPLASH_API_KEY;
    (async () => {
      try {
        // const response = await fetch();
        // 'https://api.unsplash.com/photos/random?client_id=CLIENT_ID',
        // TODO: add query
        // 'https://api.unsplash.com/photos/random?count=1&orientation=squarish&client_id=CLIENT_ID',
        // {
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Accept-Version': 'v1',
        //   },
        // }
        // const data: APIResponse= await response.json();
        // const data: APIResponse = DUMMY_RESPONSE;
        const images = await getImages();
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
          artist: image.user.name || image.user.username,
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
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
      const ctx = canvasCtxRef.current;

      // define canvas resolution
      ctx!.canvas.width = CANVAS_RESOLUTION.med;
      ctx!.canvas.height = CANVAS_RESOLUTION.med;

      const canvasImage = new Image();
      canvasImage.setAttribute('crossOrigin', 'anonymous');

      // after image is loaded
      canvasImage.onload = () => {
        sampledPxData.current = []; // reset from previous image
        channelTotal.current = { r: 0, g: 0, b: 0 }; // reset from previous image

        // drawImage(image, startx, starty, widthx, widthy)
        console.log(canvasImage);

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

        const sampleSize = {
          lowerLimit: Math.floor(sampledPxData.current.length * 0.5),
          upperLimit: Math.floor(sampledPxData.current.length * 0.5) + 1,
        };
        // markers.push(sampledPxData.current[0]); //FIXME:

        const centerPx =
          sampledPxData.current[sampledPxData.current.length * 0.5];
        const rgbValue = { ...centerPx, xy: getPxGroupXY(centerPx.i) };

        // console.log(rgbValue);
        console.log(canvasRef.current?.getBoundingClientRect());

        // addMarker(rgbValue);
        // dispatch({ type: 'addMarker', payload: rgbValue });
        //     // add initial markers
        // markers.map((marker) => addMarker(marker));
      };

      // asign image src to canvas context
      // canvasImage.src = redImage;
      canvasImage.src = imageURL;
      console.log(canvasImage.src);
    }
    // update when image is URL is passed from props
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

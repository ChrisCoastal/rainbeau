import type { FC } from 'react';
import { useCallback, useState, useEffect } from 'react';

// firestore
import { functions } from '../../firestore.config';
import { httpsCallable } from 'firebase/functions';

// mui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// components
import CanvasImage from '../CanvasImage/CanvasImage';

// helpers
import { getPxGroupXY, rgbToColorName } from '../../utils/helpers';

// config
import { DUMMY_RESPONSE } from '../../utils/config';

// styles
import { Wrapper, ImageBox, MainGrid, MarkersBox } from './MainView.styles';
import Palette from '../Palette/Palette';
import Output from '../Output/Output';
import Actions from '../Actions/Actions';
import Credit from '../Credit/Credit';
import CanvasMarkers from '../CanvasMarkers/CanvasMarkers';

interface MainViewProps {
  size: WindowSize;
  state: AppState;
  dispatch: React.Dispatch<ReducerActions>;
}

const MainView: FC<MainViewProps> = ({ state, dispatch }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const { images, currentImageData, paletteMarkers, isLoading, isError } =
    state;

  const fetchAPIKey = async () => {
    try {
      const getUnsplashAPIKey = httpsCallable(functions, 'getUnsplashAPIKey');
      const apiKey = await getUnsplashAPIKey().then((res) => res.data);
      if (!apiKey) throw new Error('No response from database');
      return apiKey;
    } catch (err) {
      console.log(err);
      dispatch({ type: 'setError', payload: true });
    }
  };

  const fetchImages = async (key: string) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?count=4&orientation=squarish&client_id=${key}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept-Version': 'v1',
          },
        }
      );
      const data: APIResponse = await response.json();
      return data;
    } catch (err) {
      dispatch({ type: 'setError', payload: true });
      console.log(err);
    }
  };

  const setImagesState = useCallback(
    (dataFromAPI: APIResponse) => {
      const imageData = dataFromAPI.map((image) => ({
        altText: image.alt_description || image.description,
        blurImage: image.blur_hash,
        color: image.color,
        imageDimensions: { x: image.width, y: image.height },
        imageURL: image.urls.full,
        imageThumb: image.urls.thumb,
        downloadLink: image.links.download,
        unsplashLink: image.links.html,
        id: image.id,
        artistName: image.user.name || image.user.username,
        artistLink: image.user.portfolio_url,
      }));
      console.log(dataFromAPI, imageData);

      dispatch({ type: 'setImages', payload: imageData });
    },
    [dispatch]
  );

  useEffect(() => {
    // test data from unsplash api
    const data = DUMMY_RESPONSE;

    setImagesState(data);
  }, [dispatch, setImagesState]);

  const CardSx = {
    // position: 'absolute',
    // top: '0',
    // left: '0',
    maxWidth: '100%',
    maxHeight: '100%',
    overflow: 'visible',
    borderRadius: '8px',
    boxShadow: {
      xs: '0 0.3rem 1.2rem 0 #3333333e',
      sm: '0 0.4rem 1.4rem 0 #3333333e',
      lg: '0 0.8rem 2.2rem 0 #3333333e',
    },
  };

  const changeImageHandler = async (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    indexStep: number = 1
  ) => {
    try {
      console.log(images.length, currentImageIndex);
      dispatch({ type: 'setError', payload: false });
      dispatch({ type: 'setLoading', payload: true });

      if (images.length > 0 && images.length > currentImageIndex + 1) {
        setCurrentImageIndex((prev) => prev + indexStep);
      } else if (currentImageIndex + 1 >= images.length) {
        const apiKey = (await fetchAPIKey()) as string;
        const images = await fetchImages(apiKey);

        if (!apiKey || !images)
          throw new Error('Failed to load new image; please try again.');

        setImagesState(images);
        setCurrentImageIndex(0);
      }
      deletePaletteHandler();
      dispatch({ type: 'setLoading', payload: false });
    } catch (err) {
      dispatch({ type: 'setError', payload: true });
      dispatch({ type: 'setLoading', payload: false });
      console.log(err);
    }
  };

  const addMarkerHandler = useCallback(
    (
      _: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
      markerQty: number = 1
    ) => {
      if (!currentImageData) return [];
      const markers: ColorMarker[] = [];
      const totalPx = currentImageData.length; // 640000

      // create random marker(s)
      for (let loop = 0; loop < markerQty; loop++) {
        const randomIndex = Math.floor(Math.random() * totalPx);
        const randomPx = currentImageData[randomIndex];
        const { r, g, b } = randomPx;

        markers.push({
          ...randomPx,
          xy: getPxGroupXY(randomPx.i),
          color: {
            r,
            g,
            b,
            name: rgbToColorName({ r, g, b }),
          },
        });
      }
      dispatch({ type: 'addMarker', payload: markers });

      return markers;
    },
    [dispatch, currentImageData]
  );

  const deletePaletteHandler = async () => {
    dispatch({ type: 'deletePalette', payload: null });
  };

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

  const artistName = images[currentImageIndex]?.artistName || 'anonymous';
  const imageURL = images[currentImageIndex]?.imageURL || null;
  const downloadLink = images[currentImageIndex]?.downloadLink || null;
  const unsplashLink = images[currentImageIndex]?.unsplashLink;

  return (
    <Wrapper>
      <MainGrid className="grid">
        <CanvasImage
          imageURL={imageURL}
          paletteMarkers={paletteMarkers}
          addMarkers={addMarkerHandler}
          currentImageData={currentImageData}
          isLoading={isLoading}
          isError={isError}
          onImageDraw={onImageDraw}
          dispatch={dispatch}
        />
        <Actions
          changeImageHandler={changeImageHandler}
          imageDownloadURL={downloadLink}
        />
        <Palette
          paletteMarkers={paletteMarkers}
          addMarkerHandler={addMarkerHandler}
          deletePaletteHandler={deletePaletteHandler}
          dispatch={dispatch}
        />
        <Output paletteMarkers={paletteMarkers} />
      </MainGrid>
    </Wrapper>
  );
};

export default MainView;

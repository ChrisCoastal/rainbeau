import type { FC } from 'react';
import { useCallback, useState, useEffect } from 'react';

// firestore
import { functions } from '../../firestore.config';
import { httpsCallable } from 'firebase/functions';

// components
import CanvasImage from '../CanvasImage/CanvasImage';

// helpers
import {
  getPxGroupXY,
  rgbToColorName,
  getCanvasDimension,
} from '../../utils/helpers';

// config
import { INITIAL_IMAGE } from '../../utils/constants';

// styles
import { Wrapper, MainGrid } from './MainView.styles';
import Palette from '../Palette/Palette';
import Output from '../Output/Output';
import Actions from '../Actions/Actions';
import Credit from '../Credit/Credit';
import CanvasMarkers from '../CanvasMarkers/CanvasMarkers';

import useAppContext from '../../hooks/useContext';

interface MainViewProps {
  // size: WindowSize;
  // state: AppState;
  // dispatch: React.Dispatch<ReducerActions>;
}

const MainView: FC<MainViewProps> = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const { state, dispatch } = useAppContext();
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
    setImagesState(INITIAL_IMAGE);
    // changeImageHandler(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeImageHandler = async (
    _: React.MouseEvent<HTMLElement, MouseEvent> | null,
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
      dispatch({ type: 'deletePalette', payload: null });
      dispatch({ type: 'setLoading', payload: false });
    } catch (err) {
      dispatch({ type: 'setError', payload: true });
      dispatch({ type: 'setLoading', payload: false });
      console.log(err);
    }
  };

  const artistName = images[currentImageIndex]?.artistName || 'anonymous';
  const downloadLink = images[currentImageIndex]?.downloadLink || null;
  const unsplashLink = images[currentImageIndex]?.unsplashLink;

  return (
    <Wrapper>
      <MainGrid className="grid">
        <CanvasImage currentImageIndex={currentImageIndex} />
        <Actions
          changeImageHandler={changeImageHandler}
          imageDownloadURL={downloadLink}
        />
        <Palette />
        <Output />
      </MainGrid>
    </Wrapper>
  );
};

export default MainView;

import { useEffect, useCallback } from 'react';
import useAppContext from './useAppContext';

// firestore
import { functions } from '../firestore.config';
import { httpsCallable } from 'firebase/functions';

// helpers
import { translateApiResponse } from '../utils/helpers';

// constants
import { INITIAL_IMAGE } from '../utils/constants';

const useCanvasImage = () => {
  const { state, dispatch } = useAppContext();
  const { images, currentImageIndex } = state;

  async function fetchAPIKey() {
    try {
      const getUnsplashAPIKey = httpsCallable(functions, 'getUnsplashAPIKey');
      const apiKey = await getUnsplashAPIKey().then((res) => res.data);
      if (!apiKey) throw new Error('No response from database');
      return apiKey;
    } catch (err) {
      dispatch({ type: 'setError', payload: true });
    }
  }

  async function fetchImages(key: string) {
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
    }
  }

  useEffect(() => {
    const initImage = translateApiResponse(INITIAL_IMAGE);
    dispatch({ type: 'setImages', payload: [initImage] });
    // changeImageHandler(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   setImagesState(INITIAL_IMAGE);
  //   // changeImageHandler(null);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  async function changeImage(
    _: React.MouseEvent<HTMLElement, MouseEvent> | null,
    indexStep: number = 1
  ) {
    try {
      dispatch({ type: 'setError', payload: false });
      dispatch({ type: 'setLoading', payload: true });

      if (images.length > 0 && images.length > currentImageIndex + 1) {
        dispatch({ type: 'setCurrentImageIndex' });
      } else if (currentImageIndex + 1 >= images.length) {
        const apiKey = (await fetchAPIKey()) as string;
        const response = await fetchImages(apiKey);

        if (!apiKey || !response)
          throw new Error('Failed to load new image; please try again.');

        const imageData = translateApiResponse(response);
        dispatch({ type: 'setImages', payload: imageData });
        dispatch({ type: 'setCurrentImageIndex', payload: 0 });
      }
      dispatch({ type: 'deletePalette', payload: null });
      dispatch({ type: 'setLoading', payload: false });
    } catch (err) {
      dispatch({ type: 'setError', payload: true });
      dispatch({ type: 'setLoading', payload: false });
    }
  }

  return { changeImage };
};

export default useCanvasImage;

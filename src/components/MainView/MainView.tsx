import { FC, Suspense } from 'react';
import { useCallback, useEffect } from 'react';

// firestore
import { functions } from '../../firestore.config';
import { httpsCallable } from 'firebase/functions';

// components
import CanvasImage from '../CanvasImage/CanvasImage';

// config
import { IMAGE_COUNT, INITIAL_IMAGE } from '../../utils/constants';

// styles
import { Wrapper, MainGrid } from './MainView.styles';
import Palette from '../Palette/Palette';
import Output from '../Output/Output';
import Actions from '../Actions/Actions';

import useAppContext from '../../hooks/useAppContext';
import useResizeWindow from '../../hooks/useResizeWindow';
import { Blurhash } from 'react-blurhash';
import Credit from '../Credit/Credit';

const MainView: FC = () => {
  const {
    state: { images, currentImageIndex },
    dispatch,
  } = useAppContext();

  const fetchAPIKey = async () => {
    try {
      const getUnsplashAPIKey = httpsCallable(functions, 'getUnsplashAPIKey');
      const apiKey = await getUnsplashAPIKey().then((res) => res.data);
      if (!apiKey) throw new Error('No response from database');
      return apiKey;
    } catch (err) {
      dispatch({ type: 'setError', payload: true });
    }
  };

  const fetchImages = async (key: string) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?count=${IMAGE_COUNT}&orientation=squarish&client_id=${key}`,
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
  };

  const setImagesState = useCallback(
    (dataFromAPI: APIResponse) => {
      const imageData = dataFromAPI.map((image) => ({
        altText: image.alt_description || image.description,
        blurImage: image.blur_hash,
        color: image.color,
        imageDimensions: { x: image.width, y: image.height },
        imageURL: image.urls.regular,
        imageThumb: image.urls.thumb,
        downloadLink: image.links.download,
        unsplashLink: image.links.html,
        id: image.id,
        artistName: image.user.name || image.user.username,
        artistLink: image.user.portfolio_url,
      }));

      dispatch({ type: 'setImages', payload: imageData });
    },
    [dispatch]
  );

  const changeImageHandler = async (indexStep: number = 1) => {
    try {
      dispatch({ type: 'setError', payload: false });
      dispatch({ type: 'setLoading', payload: true });

      if (currentImageIndex + 1 >= images.length) {
        const apiKey = (await fetchAPIKey()) as string;
        const images = await fetchImages(apiKey);

        if (!apiKey || !images)
          throw new Error('Failed to load new image; please try again.');

        setImagesState(images);
      }
      dispatch({ type: 'setCurrentImageIndex' });
      dispatch({ type: 'deletePalette', payload: null });
      dispatch({ type: 'setLoading', payload: false });
    } catch (err) {
      dispatch({ type: 'setError', payload: true });
      dispatch({ type: 'setLoading', payload: false });
    }
  };

  const size = useResizeWindow();
  const imageBlurHash = images[currentImageIndex]?.blurImage || null;
  const artistName = images[currentImageIndex]?.artistName || 'anonymous';
  const downloadLink = images[currentImageIndex]?.downloadLink || null;
  const unsplashLink = images[currentImageIndex]?.unsplashLink;

  const imageBlurFallback = imageBlurHash && (
    <Blurhash
      hash={imageBlurHash}
      width="100%"
      height="100%"
      style={{
        gridArea: 'image',
        height: '100%',
        aspectRatio: '1/1',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    />
  );

  useEffect(() => {
    setImagesState(INITIAL_IMAGE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <MainGrid className="main-grid">
        <Suspense fallback={imageBlurFallback}>
          <CanvasImage currentImageIndex={currentImageIndex} windowSize={size}>
            <Credit link={unsplashLink} name={artistName} />
          </CanvasImage>
        </Suspense>
        <Actions
          changeImageHandler={() => changeImageHandler()}
          imageDownloadURL={downloadLink}
        />
        <Palette />
        <Output />
      </MainGrid>
    </Wrapper>
  );
};

export default MainView;

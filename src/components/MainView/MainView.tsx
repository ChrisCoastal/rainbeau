import type { FC } from 'react';
import { useCallback, useState, useEffect } from 'react';

// firestore
import { functions } from '../../firestore.config';
import { httpsCallable } from 'firebase/functions';

// mui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// images
// import purpleImage from '../../images/martin-brechtl-zs3HRrWW66A-unsplash.jpg';

// components
import CanvasImage from '../CanvasImage/CanvasImage';

// helpers
import { getPxGroupXY, rgbToColorName } from '../../utils/helpers';

// config
import { CANVAS_SIZE, DUMMY_RESPONSE } from '../../utils/config';

// styles
import { Wrapper, FlipBox, ImageBox, ActionsBox } from './MainView.styles';
import Palette from '../Palette/Palette';
import Output from '../Output/Output';
import Actions from '../Actions/Actions';
import Credit from '../Credit/Credit';

interface MainViewProps {
  images: Image[];
  currentImageData: IndexedPxColor[];
  paletteMarkers: ColorMarker[];
  dispatch: React.Dispatch<ReducerActions>;
}

const MainView: FC<MainViewProps> = ({
  images,
  currentImageData,
  paletteMarkers,
  dispatch,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchAPIKey = async () => {
    try {
      const getUnsplashAPIKey = httpsCallable(functions, 'getUnsplashAPIKey');
      const apiKey = await getUnsplashAPIKey().then((res) => res.data);
      if (!apiKey) throw new Error('No response from database');
      return apiKey;
    } catch (err) {
      console.log(err);
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
      console.log(err);
    }
  };

  const setImagesState = (dataFromAPI: APIResponse) => {
    const imageData = dataFromAPI.map((image) => ({
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
    console.log(dataFromAPI, imageData);

    dispatch({ type: 'setImages', payload: imageData });
  };

  useEffect(() => {
    (async () => {
      try {
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
  }, [dispatch]);

  const CardSx = {
    position: 'absolute',
    top: '0',
    left: '0',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: '8px',
    boxShadow: '0 0.8rem 2rem 0 #3333333e',
    transition: 'all 1.2s ease',
    // '&:hover': {
    //   transform: 'rotateY(-180deg)',
    // },
  };
  console.log(images.length);
  const changeImageHandler = async (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    indexStep: number = 1
  ) => {
    try {
      console.log(images.length, currentImageIndex);
      setIsError(false);
      setIsLoading(true);

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
      // setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
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
          name: rgbToColorName({ r, g, b }),
        });
      }
      dispatch({ type: 'addMarker', payload: markers });

      return markers;
    },
    [dispatch, currentImageData]
  );

  const deletePaletteHandler = async () => {
    dispatch({ type: 'deletePalette' });
  };

  const onImageDraw = useCallback((imageDrawn: boolean) => {
    if (!imageDrawn) setIsError(true);
    setIsLoading(false);
  }, []);

  const artistName = images[currentImageIndex]?.artistName || 'unknown artist';
  const imageURL = images[currentImageIndex]?.imageURL || null;
  const downloadLink = images[currentImageIndex]?.downloadLink || null;

  return (
    <Wrapper>
      <ImageBox>
        <FlipBox pxDimension={CANVAS_SIZE.med}>
          <Card sx={CardSx}>
            <CardContent sx={{ p: '0' }}>
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
            </CardContent>
          </Card>
        </FlipBox>
        <Credit name={artistName} />
      </ImageBox>
      <ActionsBox>
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
      </ActionsBox>
    </Wrapper>
  );
};

export default MainView;

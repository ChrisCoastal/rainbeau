import type { FC } from 'react';
import { useCallback, useState, useEffect } from 'react';

// firestore
import database from '../../firestore.config';
import { doc, getDoc, collection } from 'firebase/firestore';

// mui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// images
// import redImage from '../../images/brennan-ehrhardt-HALe2SmkWAI-unsplash.jpg';
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

  const fetchAPIKey = async () => {
    try {
      // const API_KEY = process.env!.REACT_APP_UNSPLASH_API_KEY;
      // get unsplash key from firestore
      const keyRef = doc(database, 'unsplash_api', 'key');
      const reponse = await getDoc(keyRef); //.then((response) => console.log(response));
      const apiKey = reponse.data()?.key;

      if (apiKey === undefined) throw new Error('No response from database');
      console.log(apiKey);
      return apiKey;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchImages = async (key: string) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?count=1&orientation=squarish&client_id=${key}`,
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

  const changeImageHandler = async (
    _: React.MouseEvent<Element, MouseEvent>,
    indexStep: number = 1
  ) => {
    console.log('CHANGE IMAGE');

    if (images.length > 0 && images.length < currentImageIndex)
      setCurrentImageIndex((prev) => prev + indexStep);

    if (images.length >= currentImageIndex) {
      const apiKey = await fetchAPIKey();
      const images = await fetchImages(apiKey);
      images && setImagesState(images);
      setCurrentImageIndex(0);
    }
  };

  const addMarkerHandler = useCallback(
    (
      _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      markerQty: number = 1
    ) => {
      if (!currentImageData) return [];
      const markers: ColorMarker[] = [];
      const totalPx = currentImageData.length; // 640000
      // sort by hue
      // const sortedPxGroups = getSortedPx([...currentImageData], 'h');
      // console.log('SORTED', sortedPxGroups, 'UNSORTED', currentImageData);
      console.log(markerQty);

      for (let loop = 0; loop < markerQty; loop++) {
        const randomIndex = Math.floor(Math.random() * totalPx);
        const randomPx = currentImageData[randomIndex];
        const { r, g, b } = randomPx;
        console.log(randomPx);

        markers.push({
          ...randomPx,
          xy: getPxGroupXY(randomPx.i),
          name: rgbToColorName({ r, g, b }),
        });
      }
      console.log(totalPx, markers);

      dispatch({ type: 'addMarker', payload: markers });
      return markers;
    },
    [dispatch, currentImageData]
  );

  const artistName = images[currentImageIndex]?.artistName || 'unknown artist';
  const id = images[currentImageIndex]?.id || null;
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
          name={artistName}
          id={id}
        />
        <Palette
          paletteMarkers={paletteMarkers}
          addMarkerHandler={addMarkerHandler}
          dispatch={dispatch}
        />
        <Output paletteMarkers={paletteMarkers} />
      </ActionsBox>
    </Wrapper>
  );
};

export default MainView;

import type { FC } from 'react';
import { useCallback, useState, useEffect } from 'react';

// firestore
import database from '../../firestore.config';
import { doc, getDoc, collection } from 'firebase/firestore';

// mui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// images
import redImage from '../../images/brennan-ehrhardt-HALe2SmkWAI-unsplash.jpg';
import purpleImage from '../../images/martin-brechtl-zs3HRrWW66A-unsplash.jpg';

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
  const [currentImage, setCurrentImage] = useState<number>(0);

  // get images from api
  useEffect(() => {
    (async () => {
      try {
        const API_KEY = process.env!.REACT_APP_UNSPLASH_API_KEY;
        ////////////// UNSPLASH API
        //// get unsplash key from firestore
        const keyRef = doc(database, 'unsplash_api', 'key');
        const reponse = await getDoc(keyRef); //.then((response) => console.log(response));
        const apiKey = reponse.data()?.key;
        console.log(apiKey);

        if (apiKey === undefined) throw new Error('No response from database');
        // TODO: switch to apiKey for production
        const response = await fetch(
          `https://api.unsplash.com/photos/random?count=1&orientation=squarish&client_id=${API_KEY}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept-Version': 'v1',
            },
          }
        );
        const data: APIResponse = await response.json();
        /////////////

        // test data from unsplash api
        // const data = DUMMY_RESPONSE;

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

  const changeImageHandler = (e: React.MouseEvent, indexStep: number = 1) => {
    if (images.length === currentImage)
      setCurrentImage((prev) => prev + indexStep);
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

  const CardBackSx = {
    ...CardSx,
  };

  const artistName = images[currentImage]?.artistName || 'unknown artist';
  const id = images[currentImage]?.id || null;
  const imageURL = images[currentImage]?.imageURL || null;
  const downloadLink = images[currentImage]?.downloadLink || null;

  return (
    <Wrapper>
      <ImageBox>
        <FlipBox pxDimension={CANVAS_SIZE.med}>
          {/* <AvgColor bgColor={color}>Color</AvgColor> */}
          <Card sx={CardSx}>
            <CardContent sx={{ p: '0' }}>
              <CanvasImage
                imageURL={imageURL}
                paletteMarkers={paletteMarkers}
                // addMarkers={addMarkers}
                currentImageData={currentImageData}
                dispatch={dispatch}
              />
            </CardContent>
          </Card>
          {/* <Card sx={CardBackSx}></Card> */}
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

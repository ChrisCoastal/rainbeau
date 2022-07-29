import React, { FC, useCallback, useState } from 'react';

// mui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// images
import redImage from '../../images/brennan-ehrhardt-HALe2SmkWAI-unsplash.jpg';
import purpleImage from '../../images/martin-brechtl-zs3HRrWW66A-unsplash.jpg';

// components
import CanvasImage from '../CanvasImage/CanvasImage';

// helpers
import { getPxGroupXY } from '../../utils/helpers';

// config
import { CANVAS_SIZE } from '../../utils/config';

// styles
import { Wrapper, FlipBox, ActionsBox } from './MainView.styles';
import Palette from '../Palette/Palette';
import Output from '../Output/Output';
import Actions from '../Actions/Actions';
import Credit from '../Credit/Credit';

interface MainViewProps {
  images: Image[];
  currentImageData: IndexedPxColor[];
  paletteMarkers: PaletteMarkerXY[];
  dispatch: React.Dispatch<ReducerActions>;
}

const MainView: FC<MainViewProps> = ({
  images,
  currentImageData,
  paletteMarkers,
  dispatch,
}) => {
  const [currentImage, setCurrentImage] = useState<number>(0);

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

  const changeCanvasImage = (indexStep: 1 | -1) => {
    setCurrentImage((prev) => prev + indexStep);
  };

  const addMarkerHandler = useCallback(
    (
      _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      markerQty: number = 1
    ) => {
      if (!currentImageData) return [];
      const markers: PaletteMarkerXY[] = [];
      const totalPx = currentImageData.length; // 640000
      // sort by hue
      // const sortedPxGroups = getSortedPx([...currentImageData], 'h');
      // console.log('SORTED', sortedPxGroups, 'UNSORTED', currentImageData);
      console.log(markerQty);

      for (let loop = 0; loop < markerQty; loop++) {
        const randomIndex = Math.floor(Math.random() * totalPx);
        const randomPx = currentImageData[randomIndex];
        console.log(randomPx);

        markers.push({ ...randomPx, xy: getPxGroupXY(randomPx.i) });
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

  const artist = images[currentImage]?.artistName ?? 'unknown artist';
  const imageURL = images[currentImage]?.imageURL;

  return (
    <Wrapper>
      <div>
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
        <Credit name={artist} />
      </div>
      <ActionsBox>
        <Actions />
        <Palette
          paletteMarkers={paletteMarkers}
          addMarkerHandler={addMarkerHandler}
        />
        <Output />
      </ActionsBox>
    </Wrapper>
  );
};

export default MainView;

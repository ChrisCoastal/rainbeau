import React, { FC, useEffect, useState } from 'react';

// mui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// images
import redImage from '../../images/brennan-ehrhardt-HALe2SmkWAI-unsplash.jpg';
import purpleImage from '../../images/martin-brechtl-zs3HRrWW66A-unsplash.jpg';

// components
import CanvasImage from '../CanvasImage/CanvasImage';

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

  function changeCanvasImage(indexStep: 1 | -1) {
    setCurrentImage((prev) => prev + indexStep);
  }

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
        <Palette paletteMarkers={paletteMarkers} />
        <Output />
      </ActionsBox>
    </Wrapper>
  );
};

export default MainView;

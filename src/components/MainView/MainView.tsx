import React, { FC, useEffect, useState } from 'react';

// mui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// components
import CanvasImage from '../CanvasImage/CanvasImage';

// styles
import { Wrapper, FlipBox, ActionsBox } from './MainView.styles';
import Palette from '../Palette/Palette';
import Output from '../Output/Output';
import Actions from '../Actions/Actions';
import Credit from '../Credit/Credit';

interface MainViewProps {
  images: {}[];
  palette: indexRgbType[];
  dispatch: React.Dispatch<ReducerActions>;
}

const MainView: FC<MainViewProps> = ({ images, palette, dispatch }) => {
  // const [color, setColor] = useState<rgbType>({ r: 0, g: 0, b: 0 });
  const CardSx = {
    position: 'absolute',
    top: '0',
    left: '0',
    maxWidth: '100%',
    maxHeight: '100%',
    // transform: 'translate(-50%, -50%)',
    borderRadius: '8px',
    boxShadow: '0 0.8rem 2rem 0 #3333333e',
    transition: 'all 1.2s ease',
    // '&:hover': {
    //   transform: 'rotateY(-180deg)',
    // },
  };

  const CardBackSx = {
    ...CardSx,
  };

  const artist = {
    name: 'SuperArtist',
  };

  return (
    <Wrapper>
      <div>
        <FlipBox>
          {/* <AvgColor bgColor={color}>Color</AvgColor> */}
          <Card sx={CardSx}>
            <CardContent sx={{ p: '0' }}>
              <CanvasImage palette={palette} dispatch={dispatch} />
            </CardContent>
          </Card>
          {/* <Card sx={CardBackSx}></Card> */}
        </FlipBox>
        <Credit name={artist.name} />
      </div>
      <ActionsBox>
        <Actions />
        <Palette palette={palette} />
        <Output />
      </ActionsBox>
    </Wrapper>
  );
};

export default MainView;

import React, { useEffect, useState } from 'react';

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

type Props = {};

const MainView = (props: Props) => {
  const [color, setColor] = useState({ r: 0, g: 0, b: 0 });
  const CardSx = {
    position: 'absolute',
    top: '0',
    left: '0',
    maxWidth: '100%',
    maxHeight: '100%',
    // transform: 'translate(-50%, -50%)',
    transition: 'all 1.2s ease',
    boxShadow: '0 0.8rem 2rem 0 #3333333e',
    '&:hover': {
      transform: 'rotateY(-180deg)',
    },
  };

  const CardBackSx = {
    ...CardSx,
  };

  const artist = {
    name: 'SuperArtist',
  };

  return (
    <Wrapper bgColor={color}>
      <div>
        <FlipBox>
          {/* <AvgColor bgColor={color}>Color</AvgColor> */}
          <Card sx={CardSx}>
            <CardContent sx={{ p: '0' }}>
              <CanvasImage callback={(color) => setColor(() => color)} />
            </CardContent>
          </Card>
          {/* <Card sx={CardBackSx}></Card> */}
        </FlipBox>
        <Credit name={artist.name} />
      </div>
      <ActionsBox>
        <Actions />
        <Palette color={color} />
        <Output />
      </ActionsBox>
    </Wrapper>
  );
};

export default MainView;

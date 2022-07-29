import React, { FC } from 'react';

// components
import PaletteItem from '../PaletteItem/PaletteItem';

// uuid
import { v4 as uuidv4 } from 'uuid';

// styles
import {
  Wrapper,
  PaletteActions,
  PaletteItemsContainer,
} from './Palette.styles';

// mui
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface PaletteProps {
  paletteMarkers: PaletteMarkerXY[];
  addMarkerHandler: (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    markerQty?: number
  ) => PaletteMarkerXY[];
}

const Palette: FC<PaletteProps> = ({ paletteMarkers, addMarkerHandler }) => {
  return (
    <Wrapper>
      <PaletteActions>
        <p>Palette</p>
        <Tooltip title="add marker">
          <IconButton onClick={addMarkerHandler}>
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
      </PaletteActions>
      <PaletteItemsContainer>
        {paletteMarkers.length > 0 &&
          paletteMarkers.map((color, i) => {
            return <PaletteItem key={uuidv4()} color={color} />;
          })}
      </PaletteItemsContainer>
    </Wrapper>
  );
};

export default Palette;

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
  palette: PaletteType[];
}

const Palette: FC<PaletteProps> = ({ palette }) => {
  return (
    <Wrapper>
      <PaletteActions>
        <p>Palette</p>
        <Tooltip title="add marker">
          <IconButton>
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
      </PaletteActions>
      <PaletteItemsContainer>
        {palette.length > 0 &&
          palette.map((color, i) => {
            return <PaletteItem key={uuidv4()} color={color} />;
          })}
      </PaletteItemsContainer>
    </Wrapper>
  );
};

export default Palette;

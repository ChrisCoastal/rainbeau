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
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SaveIcon from '@mui/icons-material/Save';

interface PaletteProps {
  paletteMarkers: PaletteMarkerXY[];
  addMarkerHandler: (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    markerQty?: number
  ) => PaletteMarkerXY[];
  dispatch: React.Dispatch<ReducerActions>;
}

const Palette: FC<PaletteProps> = ({
  paletteMarkers,
  addMarkerHandler,
  dispatch,
}) => {
  const clearMarkersHandler = () => {
    return;
  };

  const deleteMarkerHandler = (marker: PaletteMarkerXY) => {
    // paletteMarkers
    dispatch({ type: 'deleteMarker', payload: marker });
  };
  return (
    <Wrapper>
      <PaletteActions>
        <p>Palette</p>
        <div>
          <Tooltip title="add marker">
            <IconButton onClick={addMarkerHandler}>
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="clear palette">
            <IconButton onClick={clearMarkersHandler}>
              <RemoveCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="save palette">
            <IconButton onClick={() => console.log('SAVED')}>
              <SaveIcon />
            </IconButton>
          </Tooltip>
        </div>
      </PaletteActions>
      <PaletteItemsContainer>
        {paletteMarkers.length > 0 &&
          paletteMarkers.map((color, i) => {
            return (
              <PaletteItem
                key={uuidv4()}
                color={color}
                deleteMarkerHandler={deleteMarkerHandler}
              />
            );
          })}
      </PaletteItemsContainer>
    </Wrapper>
  );
};

export default Palette;

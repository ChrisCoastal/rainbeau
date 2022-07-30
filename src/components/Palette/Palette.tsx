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
import UndoIcon from '@mui/icons-material/Undo';
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
  const deletePaletteHandler = () => {
    dispatch({ type: 'deletePalette' });
  };

  const deleteMarkerHandler = (marker: PaletteMarkerXY) => {
    // paletteMarkers
    dispatch({ type: 'deleteMarker', payload: marker });
  };

  const undoHandler = () => {
    // paletteMarkers
    dispatch({ type: 'undoPalette' });
  };

  const disableAddMarker = paletteMarkers.length > 8;

  return (
    <Wrapper>
      <PaletteActions>
        <p>Palette</p>
        <div>
          <Tooltip title="add marker">
            <IconButton onClick={addMarkerHandler} disabled={disableAddMarker}>
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="clear palette">
            <IconButton onClick={deletePaletteHandler}>
              <RemoveCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="undo">
            <IconButton onClick={undoHandler}>
              <UndoIcon />
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

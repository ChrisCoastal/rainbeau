import type { FC } from 'react';
import { useState } from 'react';

// components
import PaletteItem from '../PaletteItem/PaletteItem';
import Modal from '../../UI/Modal/Modal';

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
import { MAX_NUM_MARKERS } from '../../utils/config';

interface PaletteProps {
  paletteMarkers: ColorMarker[];
  addMarkerHandler: (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    markerQty?: number
  ) => ColorMarker[];
  deletePaletteHandler: () => void;
  dispatch: React.Dispatch<ReducerActions>;
}

const Palette: FC<PaletteProps> = ({
  paletteMarkers,
  addMarkerHandler,
  deletePaletteHandler,
  dispatch,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const modalHandler = (isVisible: boolean, action?: string) => {
    setOpen(isVisible);
    if (action === 'delete') deletePaletteHandler();
  };

  const undoHandler = () => {
    dispatch({ type: 'undoPalette', payload: null });
  };

  const disableDeletePalette = paletteMarkers.length === 0;
  const disableAddMarker = paletteMarkers.length >= MAX_NUM_MARKERS;

  const deletePaletteModal = {
    openState: open,
    text: 'Are you sure you want to delete the current palette?',
    buttons: [{ text: 'Delete', action: 'delete' }],
    handler: modalHandler,
    openModalButton: (
      <Tooltip title="clear palette">
        <span>
          <IconButton
            onClick={() => modalHandler(true)}
            disabled={disableDeletePalette}
          >
            <RemoveCircleIcon />
          </IconButton>
        </span>
      </Tooltip>
    ),
  };

  const paletteItems = paletteMarkers.map((marker, i) => (
    <PaletteItem
      key={uuidv4()}
      markerNum={i}
      marker={marker}
      dispatch={dispatch}
    />
  ));

  return (
    <Wrapper>
      <PaletteActions>
        <div>
          <Tooltip
            title={
              paletteMarkers.length >= MAX_NUM_MARKERS
                ? 'cannot add marker'
                : 'add marker'
            }
          >
            <span>
              <IconButton
                onClick={addMarkerHandler}
                disabled={disableAddMarker}
              >
                <AddCircleIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Modal
            openState={deletePaletteModal.openState}
            openModalButton={deletePaletteModal.openModalButton}
            text={deletePaletteModal.text}
            buttons={deletePaletteModal.buttons}
            modalHandler={deletePaletteModal.handler}
          />
          <Tooltip title="undo">
            <span>
              <IconButton onClick={undoHandler} disabled={true}>
                <UndoIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="save palette">
            <span>
              <IconButton onClick={() => console.log('SAVED')} disabled={true}>
                <SaveIcon />
              </IconButton>
            </span>
          </Tooltip>
        </div>
      </PaletteActions>
      <PaletteItemsContainer>
        {paletteMarkers.length > 0 && paletteItems}
      </PaletteItemsContainer>
    </Wrapper>
  );
};

export default Palette;

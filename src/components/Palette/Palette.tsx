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

interface PaletteProps {
  paletteMarkers: ColorMarker[];
  addMarkerHandler: (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    markerQty?: number
  ) => ColorMarker[];
  dispatch: React.Dispatch<ReducerActions>;
}

const Palette: FC<PaletteProps> = ({
  paletteMarkers,
  addMarkerHandler,
  dispatch,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const modalHandler = (isVisible: boolean, action?: string) => {
    setOpen(isVisible);
    if (action === 'delete') deletePaletteHandler();
  };

  const deletePaletteHandler = () => {
    dispatch({ type: 'deletePalette' });
  };

  const undoHandler = () => {
    dispatch({ type: 'undoPalette' });
  };

  const disableDeletePalette = paletteMarkers.length === 0;
  const disableAddMarker = paletteMarkers.length >= 8;

  const uploadModal = {
    openState: open,
    content: <div>drop here</div>,
    text: 'Are you sure you want to delete the current palette?',
    buttons: [{ text: 'Delete', action: 'delete' }],
    handler: modalHandler,
    openModalButton: (
      <Tooltip title="clear palette">
        <span>
          <IconButton
            onClick={() => modalHandler(true)}
            sx={{ transform: 'rotate: 180deg;' }}
            disabled={disableDeletePalette}
          >
            <RemoveCircleIcon />
          </IconButton>
        </span>
      </Tooltip>
    ),
  };

  return (
    <Wrapper>
      <PaletteActions>
        <p>Palette</p>
        <div>
          <Tooltip title="add marker">
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
            openState={uploadModal.openState}
            openModalButton={uploadModal.openModalButton}
            content={uploadModal.content}
            text={uploadModal.text}
            buttons={uploadModal.buttons}
            modalHandler={uploadModal.handler}
          />
          {/* <Tooltip title="clear palette">
            <IconButton
              onClick={deletePaletteHandler}
              disabled={disableDeletePalette}
            >
              <RemoveCircleIcon />
            </IconButton>
          </Tooltip> */}
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
        {paletteMarkers.length > 0 &&
          paletteMarkers.map((color, i) => (
            <PaletteItem
              key={uuidv4()}
              markerNum={i}
              color={color}
              dispatch={dispatch}
            />
          ))}
      </PaletteItemsContainer>
    </Wrapper>
  );
};

export default Palette;

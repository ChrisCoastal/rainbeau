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
  PaletteTab,
} from './Palette.styles';

// hooks
import useMarkers from '../../hooks/useMarkers';
import useAppContext from '../../hooks/useAppContext';

// mui
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import SaveIcon from '@mui/icons-material/Save';
import { MAX_NUM_MARKERS } from '../../utils/constants';

interface PaletteProps {
  // paletteMarkers: ColorMarker[];
  // addMarkerHandler: (
  //   _: React.MouseEvent<HTMLElement, MouseEvent> | null,
  //   indexedImagePx?: IndexedPxColor[],
  //   markerQty?: number
  // ) => ColorMarker[];
  // deletePaletteHandler: () => void;
  // dispatch: React.Dispatch<ReducerActions>;
}

const Palette: FC<PaletteProps> = () => {
  const [open, setOpen] = useState<boolean>(false);
  const {
    state: {
      paletteMarkers,
      activeMenuTab,
      currentImageData,
      history,
      canvasXY,
      currentImageIndex,
    },
    dispatch,
  } = useAppContext();
  const { addMarker } = useMarkers();

  const deletePalette = () => {
    dispatch({ type: 'deletePalette', payload: null });
    dispatch({
      type: 'updateHistory',
      payload: {
        canvasXY,
        paletteMarkers: [] as ColorMarker[],
        currentImageIndex,
      } as History,
    });
  };

  const setActiveMenuTab = () => {
    console.log('activeTabPALETTE', activeMenuTab);
    dispatch({ type: 'setActiveMenuTab', payload: 'palette' });
  };

  const modalHandler = (isVisible: boolean, action?: string) => {
    setOpen(isVisible);
    if (action === 'delete') deletePalette();
  };

  const undoHandler = (action: 'undo' | 'redo') => {
    dispatch({ type: 'undoAction', payload: action });
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
            <CancelIcon />
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

  console.log(history.snapshots, history.index, history.snapshots.length);

  return (
    <Wrapper activeMenuTab={activeMenuTab}>
      <PaletteTab onClick={setActiveMenuTab} activeMenuTab={activeMenuTab}>
        palette
      </PaletteTab>
      <PaletteActions>
        <div>
          <Tooltip
            title={
              paletteMarkers.length >= MAX_NUM_MARKERS
                ? 'max markers reached'
                : 'add marker'
            }
          >
            <span>
              <IconButton
                onClick={() => addMarker(currentImageData, 1)}
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
              <IconButton
                onClick={() => undoHandler('undo')}
                disabled={history.index <= 0}
              >
                <UndoIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="redo">
            <span>
              <IconButton
                onClick={() => undoHandler('redo')}
                disabled={history.index >= history.snapshots.length - 1}
              >
                <RedoIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="save palette disabled">
            <span>
              <IconButton onClick={() => null} disabled={true}>
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

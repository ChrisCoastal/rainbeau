import type { FC } from 'react';
import { useState, useMemo, useRef } from 'react';

// hooks
import useInput from '../../hooks/useInput';

// components
import Swatch from '../Swatch/Swatch';

// mui
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DragHandleIcon from '@mui/icons-material/DragHandle';

// helpers
import { rgbToColorName } from '../../utils/helpers';

// styles
import {
  Wrapper,
  SwatchContainer,
  ColorValue,
  ItemContent,
  ItemControls,
} from './PaletteItem.styles';
import { Typography } from '@mui/material';

interface PaletteItemProps {
  marker: ColorMarker;
  markerNum: number;
  dispatch: React.Dispatch<ReducerActions>;
}

const PaletteItem: FC<PaletteItemProps> = ({ marker, markerNum, dispatch }) => {
  const initialValue = marker.customName || marker.name;
  const { r, g, b } = marker;

  const [prevInputValue, setPrevInputValue] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>(initialValue);
  const [focus, setFocus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLParagraphElement>(null);

  const inputValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = (event.target as HTMLInputElement).value;
    setInputValue(userInput);
  };

  const inputReset = () => {
    setPrevInputValue(inputValue);
    setInputValue('');

    if (inputRef.current) {
      inputRef.current.focus();
      setFocus(true);
    }
  };

  const focusHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.type === 'focus') setFocus(true);
    if (event.type === 'blur' && focus) {
      !inputValue && setInputValue(prevInputValue);
      dispatch({
        type: 'updatePalette',
        payload: {
          markerNum,
          updatedMarker: { ...marker, customName: inputValue },
        },
      });
    }
    if (event.type === 'blur') setFocus(false);
  };

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // setPrevInputValue(inputValue);
      inputRef.current && inputRef.current.blur();
      // TODO: this should call the focusHandler??
      setFocus(false);
    }
    if (event.key === 'Escape') {
      // setInputValue(prevInputValue);
      inputRef.current && inputRef.current.blur();
      setFocus(false);
    }
  };

  const deleteMarkerHandler = (marker: ColorMarker) => {
    dispatch({ type: 'deleteMarker', payload: marker });
  };

  const colorToClipboard = () => {
    if (colorRef.current) {
      navigator.clipboard.writeText(colorRef.current?.innerText);
    }
  };

  // TODO: add dnd change item order
  return (
    <Wrapper>
      <ItemContent>
        <SwatchContainer>
          <Typography fontSize="small" pr={1}>
            {markerNum + 1}
          </Typography>
          <Swatch color={{ r, g, b }} />
          <input
            value={inputValue}
            onChange={inputValueHandler}
            // autoFocus={focus}
            onFocus={focusHandler}
            onBlur={focusHandler}
            onKeyDown={(event) => keyDownHandler(event)}
            ref={inputRef}
          ></input>
          <Tooltip title="clear color name">
            <IconButton onClick={inputReset}>
              <HighlightOffIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </SwatchContainer>
        <ColorValue onClick={colorToClipboard}>
          <Typography fontSize="small" ref={colorRef}>
            {`rgb(
          ${marker.r},
          ${marker.g},
          ${marker.b}
          )`}
          </Typography>
        </ColorValue>
      </ItemContent>
      <ItemControls>
        <Tooltip title="delete color">
          <IconButton onClick={() => deleteMarkerHandler(marker)}>
            <RemoveCircleOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        {/* <Tooltip title="reorder">
          <IconButton onClick={deleteMarker}>
            <DragHandleIcon fontSize="small" />
          </IconButton>
        </Tooltip> */}
      </ItemControls>
    </Wrapper>
  );
};

export default PaletteItem;

import type { FC } from 'react';
import { useState, useRef } from 'react';

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
import { hslToColorName } from '../../utils/helpers';

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
  // const initialValue = marker ? hslToColorName(marker) : 'default-color-name';
  // const initialValue = marker?.name || 'default-color-name';
  const [inputValue, setInputValue] = useState<string>('hello');
  const inputRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLParagraphElement>(null);
  // const { inputValueHandler, inputValue, inputReset } = useInput(
  //// validateInput,
  // inputRef,
  // initialValue
  // );

  // const inputValue = initialValue;

  const inputValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    const userInput = (event.target as HTMLInputElement).value;
    const updatedMarker = { ...marker, name: userInput };
    console.log(updatedMarker);

    setInputValue(userInput);
    // dispatch({
    //   type: 'updatePalette',
    //   payload: { markerNum, updatedMarker: updatedMarker },
    // });
  };

  const inputReset = () => {
    setInputValue('');
    // dispatch({
    //   type: 'updatePalette',
    //   payload: { markerNum, updatedMarker: { ...marker, name: '' } },
    // });
    if (inputRef.current) inputRef.current.focus();
  };

  const deleteMarkerHandler = (marker: ColorMarker) => {
    dispatch({ type: 'deleteMarker', payload: marker });
  };

  const colorToClipboard = () => {
    if (colorRef.current) {
      navigator.clipboard.writeText(colorRef.current?.innerText);
    }
  };

  const { r, g, b } = marker;

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

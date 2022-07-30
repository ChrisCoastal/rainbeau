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
  color: PaletteMarkerXY;
  deleteMarkerHandler: (marker: PaletteMarkerXY) => void;
}

const PaletteItem: FC<PaletteItemProps> = ({ color, deleteMarkerHandler }) => {
  const initialValue = color ? hslToColorName(color) : 'default-color-name';
  const inputRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLParagraphElement>(null);
  const { inputValueHandler, inputValue, inputReset } = useInput(
    // validateInput,
    inputRef,
    initialValue
  );

  const colorToClipboard = () => {
    colorRef.current &&
      navigator.clipboard.writeText(colorRef.current?.innerText);
  };

  return (
    <Wrapper>
      <ItemContent>
        <SwatchContainer>
          <Swatch color={color} />
          <input
            value={inputValue}
            onChange={inputValueHandler}
            ref={inputRef}
          ></input>
          {/* <Button onClick={inputReset}>x</Button> */}
          <Tooltip title="clear color name">
            <IconButton onClick={inputReset}>
              <HighlightOffIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </SwatchContainer>
        <ColorValue onClick={colorToClipboard}>
          <Typography fontSize="small" ref={colorRef}>
            {`rgb(
          ${color.r},
          ${color.g},
          ${color.b}
          )`}
          </Typography>
        </ColorValue>
      </ItemContent>
      <ItemControls>
        <Tooltip title="delete color">
          <IconButton onClick={() => deleteMarkerHandler(color)}>
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

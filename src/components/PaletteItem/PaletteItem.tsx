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

// helpers
import { hslToColorName } from '../../utils/helpers';

// styles
import { Wrapper, SwatchContainer } from './PaletteItem.styles';

interface PaletteItemProps {
  color: PaletteMarkerXY;
}

const PaletteItem: FC<PaletteItemProps> = ({ color }) => {
  const initialValue = color ? hslToColorName(color) : 'default-color-name';
  const inputRef = useRef<HTMLInputElement>(null);
  const { inputValueHandler, inputValue, inputReset } = useInput(
    // validateInput,
    inputRef,
    initialValue
  );

  return (
    <Wrapper>
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
            <HighlightOffIcon />
          </IconButton>
        </Tooltip>
      </SwatchContainer>
      <div>{`rgb(
    ${color.r},
    ${color.g},
    ${color.b}
  )`}</div>
    </Wrapper>
  );
};

export default PaletteItem;

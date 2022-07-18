import React, { FC } from 'react';

// components
import Swatch from '../Swatch/Swatch';

// helpers
import { rgbToColorName, hslToColorName } from '../../utils/helpers';

// styles
import { Wrapper, SwatchContainer } from './PaletteItem.styles';

interface PaletteItemProps {
  color: indexRgbType;
}

const PaletteItem: FC<PaletteItemProps> = ({ color }) => {
  return (
    <Wrapper>
      <SwatchContainer>
        <Swatch color={color} />
        <input
          value={color ? hslToColorName(color) : 'default-color-name'}
        ></input>
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

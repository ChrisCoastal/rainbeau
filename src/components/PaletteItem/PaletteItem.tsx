import type { FC } from 'react';
import { useState } from 'react';

// components
import Swatch from '../Swatch/Swatch';

// helpers
import { rgbToColorName, hslToColorName } from '../../utils/helpers';

// styles
import { Wrapper, SwatchContainer } from './PaletteItem.styles';

interface PaletteItemProps {
  color: xyRgbType;
}

const PaletteItem: FC<PaletteItemProps> = ({ color }) => {
  const [inputValue, setInputValue] = useState<string>(
    color ? hslToColorName(color) : 'default-color-name'
  );

  return (
    <Wrapper>
      <SwatchContainer>
        <Swatch color={color} />
        <input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
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

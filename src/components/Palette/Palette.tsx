import React, { FC } from 'react';

// components
import PaletteItem from '../PaletteItem/PaletteItem';

import { Wrapper } from './Palette.styles';

interface PaletteProps {
  color: { r: number; g: number; b: number };
}

const Palette: FC<PaletteProps> = ({ color }) => {
  // const colors = [{ r: 140, g: 30, b: 214 }];
  // colors.map <div rounded>color</div>hex code<input>#prefill name <light><dark>
  return (
    <Wrapper>
      <p>Palette</p>
      <PaletteItem color={color} />
    </Wrapper>
  );
};

export default Palette;

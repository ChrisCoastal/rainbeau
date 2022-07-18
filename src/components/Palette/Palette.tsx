import React, { FC } from 'react';

// components
import PaletteItem from '../PaletteItem/PaletteItem';

// uuid
import { v4 as uuidv4 } from 'uuid';

// styles
import { Wrapper, PaletteItemsContainer } from './Palette.styles';

interface PaletteProps {
  palette: indexRgbType[];
}

const Palette: FC<PaletteProps> = ({ palette }) => {
  // const colors = [{ r: 140, g: 30, b: 214 }];
  // colors.map <div rounded>color</div>hex code<input>#prefill name <light><dark>
  console.log(palette);

  return (
    <Wrapper>
      <p>Palette</p>
      <PaletteItemsContainer>
        {palette.length > 0 &&
          palette.map((color, i) => {
            return <PaletteItem key={uuidv4()} color={color} />;
          })}
      </PaletteItemsContainer>
    </Wrapper>
  );
};

export default Palette;

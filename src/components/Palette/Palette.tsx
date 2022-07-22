import React, { FC } from 'react';

// components
import PaletteItem from '../PaletteItem/PaletteItem';

// uuid
import { v4 as uuidv4 } from 'uuid';

// styles
import { Wrapper, PaletteItemsContainer } from './Palette.styles';

interface PaletteProps {
  palette: PaletteType[];
}

const Palette: FC<PaletteProps> = ({ palette }) => {
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

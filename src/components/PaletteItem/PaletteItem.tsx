import React, { FC } from 'react';

// components
import Swatch from '../Swatch/Swatch';

// styles
import { Wrapper, Container } from './PaletteItem.styles';

interface PaletteItemProps {
  color: { r: number; g: number; b: number };
}

const PaletteItem: FC<PaletteItemProps> = ({ color }) => {
  return (
    <Wrapper>
      <p>PaletteItem</p>
      <Container>
        <Swatch color={color} />
        <input placeholder="$automatic-color-name"></input>
      </Container>
      <div>{`rgb(
    ${color.r},
    ${color.g},
    ${color.b}
  )`}</div>
    </Wrapper>
  );
};

export default PaletteItem;

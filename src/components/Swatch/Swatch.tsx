import React, { FC } from 'react';

// styles
import { Color } from './Swatch.styles';

interface SwatchProps {
  color: { r: number; g: number; b: number };
}

const Swatch: FC<SwatchProps> = ({ color }) => {
  return <Color bgColor={color} />;
};

export default Swatch;

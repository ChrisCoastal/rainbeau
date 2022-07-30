import type { FC } from 'react';
import { useState } from 'react';

// mui
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Typography';

// styles
import { Wrapper, TextArea, FormatContainer } from './Output.styles';

interface OutputProps {
  paletteMarkers: ColorMarker[];
}

interface Format {
  detail: string;
  text: string;
}

interface Styles {
  tailwind: Format;
}

const Output: FC<OutputProps> = ({ paletteMarkers }) => {
  const [format, setFormat] = useState<keyof Styles>('tailwind');
  const markerColors = paletteMarkers
    .map((marker) => {
      const { r, g, b } = marker;
      return `'${marker.name}': 'rgb(${r},${g},${b})'`;
    })
    .join(',\n        ');

  const tailwind = {
    detail: 'add to tailwind.config.js',
    text: `
  module.exports = {
    theme: {
      colors: {
        ${markerColors}
      },
  `,
  };

  const style: Styles = {
    tailwind: tailwind,
  };

  return (
    <Wrapper>
      <div>Output</div>
      <Typography fontSize="small">
        css scss tailwind mui styled emotion
      </Typography>
      <FormatContainer>
        <Typography fontSize="small">{style[format].detail}</Typography>
        <TextArea value={style[format].text} spellCheck={false} />
      </FormatContainer>
    </Wrapper>
  );
};

export default Output;

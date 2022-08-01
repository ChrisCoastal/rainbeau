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
  mui: Format;
  styled: Format;
  css: Format;
}

const Output: FC<OutputProps> = ({ paletteMarkers }) => {
  const [format, setFormat] = useState<keyof Styles>('styled');
  const cssMarkerColors = paletteMarkers
    .map((marker) => {
      const { r, g, b } = marker;
      return `--${marker.name}: 'rgb(${r},${g},${b})'`;
    })
    .join(',\n      ');

  const twMarkerColors = paletteMarkers
    .map((marker) => {
      const { r, g, b } = marker;
      return `'${marker.name}': 'rgb(${r},${g},${b})'`;
    })
    .join(',\n        ');

  const muiMarkerColors = paletteMarkers
    .map((marker) => {
      const { r, g, b } = marker;
      return `${marker.name}: 'rgb(${r},${g},${b})'`;
    })
    .join(',\n        ');

  const muiFormatted = {
    detail: '*add to mui theme',
    text: `
  import { createTheme } from '@mui/material/styles';

  const theme = createTheme({
    palette: {
      custom: {
        ${muiMarkerColors}
      },
    },
  });
    `,
  };

  const tailwindFormatted = {
    detail: '*add to tailwind.config.js',
    text: `
  module.exports = {
    theme: {
      colors: {
        ${twMarkerColors}
      },
  `,
  };

  const cssFormatted = {
    detail: '*add to css/scss stylesheet',
    text: `
  :root {
      ${cssMarkerColors}
    },
  `,
  };

  const styledFormatted = {
    detail: '*pass theme object to ThemeProvider',
    text: `
  const theme = {
        ${muiMarkerColors}
    },
  `,
  };

  const style: Styles = {
    css: cssFormatted,
    tailwind: tailwindFormatted,
    styled: styledFormatted,
    mui: muiFormatted,
  };

  return (
    <Wrapper>
      <div>Output</div>
      <Typography fontSize="small">
        css scss tailwind mui styled emotion
      </Typography>
      <FormatContainer>
        {paletteMarkers.length !== 0 ? (
          <>
            <TextArea
              value={style[format].text}
              wrap="off"
              spellCheck={false}
            />
            <Typography fontSize="small">{style[format].detail}</Typography>
          </>
        ) : (
          <TextArea
            value={`\n  No palette markers...`}
            readOnly={true}
            wrap="off"
            spellCheck={false}
          />
        )}
      </FormatContainer>
    </Wrapper>
  );
};

export default Output;

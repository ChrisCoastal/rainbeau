import type { FC } from 'react';
import { useState } from 'react';

// mui
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

// styles
import {
  Wrapper,
  CopyIconWrapper,
  TextArea,
  FormatContainer,
} from './Output.styles';

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
    .map((marker, i) => {
      const { r, g, b } = marker;
      return `--${
        paletteMarkers[i].customName || paletteMarkers[i].name
      }: 'rgb(${r},${g},${b})'`;
    })
    .join(',\n      ');

  const twMarkerColors = paletteMarkers
    .map((marker, i) => {
      const { r, g, b } = marker;
      return `'${
        paletteMarkers[i].customName || paletteMarkers[i].name
      }': 'rgb(${r},${g},${b})'`;
    })
    .join(',\n        ');

  const muiMarkerColors = paletteMarkers
    .map((marker, i) => {
      const { r, g, b } = marker;
      return `${
        paletteMarkers[i].customName || paletteMarkers[i].name
      }: 'rgb(${r},${g},${b})'`;
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(style[format].text);
  };

  const stylesTextArea = (
    <FormatContainer>
      <TextArea value={style[format].text} wrap="off" spellCheck={false} />
      <CopyIconWrapper>
        <Tooltip title="copy">
          <IconButton onClick={copyToClipboard}>
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
      </CopyIconWrapper>
      <Typography fontSize="small">{style[format].detail}</Typography>
    </FormatContainer>
  );

  const fallbackTextArea = (
    <TextArea
      value={`\n  No palette markers...`}
      readOnly={true}
      wrap="off"
      spellCheck={false}
    />
  );

  return (
    <Wrapper>
      <div>Output</div>
      <Typography fontSize="small">
        css scss tailwind mui styled emotion
      </Typography>
      {paletteMarkers.length !== 0 ? stylesTextArea : fallbackTextArea}
    </Wrapper>
  );
};

export default Output;

import type { FC } from 'react';
import { useState, useEffect } from 'react';

// mui
import Zoom from '@mui/material/Zoom';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

// styles
import {
  Wrapper,
  OutputActions,
  CopyIconWrapper,
  TextArea,
  FormatContainer,
} from './Output.styles';
import SelectFormatButton from './SelectFormatButton';

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
  const [copied, setCopied] = useState<boolean>(true);

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
    setCopied(true);
    navigator.clipboard.writeText(style[format].text);
  };

  useEffect(() => {
    const copiedTimer = setTimeout(() => {
      setCopied(false);
    }, 1800);
    return () => clearTimeout(copiedTimer);
  }, [copied]);

  const stylesTextArea = (
    <FormatContainer>
      <TextArea
        value={style[format].text}
        wrap="off"
        readOnly={true}
        spellCheck={false}
      />
      <CopyIconWrapper>
        {copied ? (
          <Tooltip title="copied!">
            <IconButton onClick={copyToClipboard}>
              <Fade in={copied} timeout={600}>
                <CheckIcon
                  sx={{
                    color: '#7dffbe',
                  }}
                />
              </Fade>
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="copy">
            <IconButton onClick={copyToClipboard}>
              <Zoom in={!copied} appear={true}>
                <ContentCopyIcon />
              </Zoom>
            </IconButton>
          </Tooltip>
        )}
      </CopyIconWrapper>
      <Typography fontSize="small" color={'#555'}>
        {style[format].detail}
      </Typography>
    </FormatContainer>
  );

  const fallbackTextArea = (
    <FormatContainer>
      <TextArea
        value={`\n  No palette markers...`}
        readOnly={true}
        wrap="off"
        spellCheck={false}
      />
    </FormatContainer>
  );

  const formatOptions = ['css', 'scss', 'tailwind', 'mui', 'styled', 'emotion'];

  return (
    <Wrapper>
      <OutputActions>
        <Typography>Output</Typography>
        <SelectFormatButton
          options={formatOptions}
          format={format}
          setFormat={setFormat}
        />
      </OutputActions>
      {paletteMarkers.length !== 0 ? stylesTextArea : fallbackTextArea}
    </Wrapper>
  );
};

export default Output;

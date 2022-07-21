import { COLOR_NAMES } from './config';

export function rgbToHex(r: number, g: number, b: number) {
  let hexR = r.toString(16);
  let hexG = g.toString(16);
  let hexB = b.toString(16);

  if (hexR.length === 1) hexR = '0' + hexR;
  if (hexG.length === 1) hexG = '0' + hexG;
  if (hexB.length === 1) hexB = '0' + hexB;

  return '#' + hexR + hexG + hexB;
}

export function rgbToHsl(rgbColor: { r: number; g: number; b: number }) {
  // Make r, g, and b fractions of 1
  let { r, g, b } = rgbColor;
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;
  let h = 0;
  let s = 0;
  let l = 0;

  // Calculate hue
  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else if (cmax === b) h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // l/s to % value
  s = +(s * 100).toFixed(0);
  l = +(l * 100).toFixed(0);

  // 'hsl(' + h + ',' + s + '%,' + l + '%)';
  return { h, s, l };
}

// translate canvas index (from getImageData()) to x y values on the canvas
export const getXY = (index: number) => {
  const yPos = (index / 2000) * 0.4; // channel values per width * px per width: ;
  const xPos = (index % 2000) * 0.4;

  return { xPos, yPos };
};

export const getIndex = (xPos: number, yPos: number) => {
  let index = (yPos * 2000) / 0.4;
  if (yPos !== 800) index += xPos / 0.4;
  // const yPos = Math.floor((index / 2000) * 0.4); // channel values per width * px per width
  // const xPos = Math.round((index % 2000) * 0.4);
  return Math.round(index);
};

export const getColorAtIndexRGB = () => {
  return;
};

const filterChannel = (
  channelValue: number,
  channelName: 'r' | 'g' | 'b',
  colorNames = COLOR_NAMES
) =>
  colorNames.filter(
    (colorName) => Math.abs(colorName[channelName] - channelValue) < 4
  );

export function rgbToColorName(paletteColor: indexRgbType) {
  const name = COLOR_NAMES.reduce(
    (acc, colorName) => {
      let diff = 0;
      for (const channel in colorName) {
        if (channel === 'r' || channel === 'g' || channel === 'b') {
          diff += Math.abs(
            (colorName[channel as keyof typeof colorName] as number) -
              paletteColor[channel as keyof typeof paletteColor]
          );
        }
      }
      console.log(diff);

      return diff < acc.diff
        ? {
            name: colorName.name,
            r: colorName.r,
            g: colorName.g,
            b: colorName.b,
            diff: diff,
          }
        : acc;
    },
    { name: 'default-color-name', r: -1, g: -1, b: -1, diff: Infinity }
  ) as { name: string; r: number; g: number; b: number; diff: number };
  console.log(name);

  return name.name;
}

export function hslToColorName(
  rgbPaletteColor: indexRgbType | rgbType | xyRgbType
) {
  const rgbColor = {
    r: rgbPaletteColor.r,
    g: rgbPaletteColor.g,
    b: rgbPaletteColor.b,
  };
  const hslColor = rgbToHsl(rgbColor);
  const name = COLOR_NAMES.reduce(
    (acc, colorName) => {
      let hDiff = 0;
      let slDiff = 0;

      for (const channel in colorName) {
        if (channel === 'h') {
          hDiff += Math.abs(
            (colorName[channel as keyof typeof colorName] as number) -
              hslColor[channel as keyof typeof hslColor]
          );
        }
        if (channel === 's' || channel === 'l') {
          slDiff += Math.abs(
            (colorName[channel as keyof typeof colorName] as number) -
              hslColor[channel as keyof typeof hslColor]
          );
        }
      }

      const diff = Math.floor(hDiff * 1.2) + slDiff;
      return diff < acc.diff
        ? {
            name: colorName.name,
            r: colorName.r,
            g: colorName.g,
            b: colorName.b,
            diff: diff,
          }
        : acc;
    },
    { name: 'default-color-name', r: -1, g: -1, b: -1, diff: Infinity }
  ) as { name: string; r: number; g: number; b: number; diff: number };
  console.log(hslColor, name);

  return name.name;
}

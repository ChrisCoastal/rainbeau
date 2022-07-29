import { COLOR_NAMES, RGBA_GROUP, CANVAS_SIZE } from './config';

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
export const getPxGroupXY = (index: number) => {
  const yPos = Math.floor(index / (CANVAS_SIZE.med * RGBA_GROUP));
  const xPos = (index % (CANVAS_SIZE.med * RGBA_GROUP)) / RGBA_GROUP; // channel values per width * canvaswidth/channelvalues/width ;

  return { xPos, yPos };
};

export const getPxGroupIndex = (xPos: number, yPos: number) => {
  let rgbIndex = yPos * 3200;
  if (xPos !== 800) rgbIndex += xPos * 4;
  const pxIndex = rgbIndex / RGBA_GROUP;

  // return +pxIndex.toFixed(0);
  return pxIndex;
};

// export const getRgbAtPxGroup = (
//   pxGroup = 4,
//   sampleRate = 1,
//   imageData: IndexedPxColor[]
// ) => {
//   let rgb = { r: 0, g: 0, b: 0 };
//   for (let i = 0; i < pxGroup; i += sampleRate) {
//     rgb.r = imageData[i];
//     rgb.g = imageData[i + 1];
//     rgb.b = imageData[i + 2];
//   }
// };

// export const getImagePx = () => {

// for (let i = 0; i < dataPoints; i += sampleRate) {
//   const rPx = imageData[i];
//   const gPx = imageData[i + 1];
//   const bPx = imageData[i + 2];
//   // const a = imageData[i + 3]; // this is the alpha channel; can be accounted for when transparency

//   sampledPxData.current.push({
//     r: rPx,
//     g: gPx,
//     b: bPx,
//     i: i,
//     // xy: getXY(i),
//   });
//   channelTotal.current.r += rPx;
//   channelTotal.current.g += gPx;
//   channelTotal.current.b += bPx;
// }}

export const getDominantChannel = (rgbChannels: rgbType) => {
  const { r, g, b } = rgbChannels;
  if (r >= g && r >= b) return 'r';
  if (g >= r && g >= b) return 'g';
  if (b >= g && b >= r) return 'b';
  return 'r';
};
// TODO: is this cleaner?
// const chanMax = Math.max(
//   channelTotal.current.r,
//   channelTotal.current.g,
//   channelTotal.current.b
// );
// const chanMin = Math.min(
//   channelTotal.current.r,
//   channelTotal.current.g,
//   channelTotal.current.b
// );

// export const getSortedPx = (
//   imagePx: IndexedPxColor[],
//   sortBy: keyof IndexedPxColor
// ) => {
//   const sortedPx = imagePx.sort(pxSort);

//   // comparator (low to high sort)
//   function pxSort(a: IndexedPxColor, b: IndexedPxColor) {
//     if (a[sortBy] < b[sortBy]) {
//       return -1;
//     }
//     if (a[sortBy] > b[sortBy]) {
//       return 1;
//     }
//     return 0;
//   }
//   return sortedPx;
// };

export const getMedianColor = (
  imagePx: IndexedPxColor[],
  lowerLimit: number,
  upperLimit: number
) => {
  if (imagePx.length < upperLimit || lowerLimit < 0) return;
  imagePx.slice(lowerLimit, upperLimit).reduce(
    (acc, rgb, _, { length }) => ({
      r: acc.r + rgb.r / length,
      g: acc.g + rgb.g / length,
      b: acc.b + rgb.b / length,
      xy: getPxGroupXY(rgb.i),
    }),
    { r: 0, g: 0, b: 0, xy: { xPos: 0, yPos: 0 } }
  );
};

const filterChannel = (
  channelValue: number,
  channelName: 'r' | 'g' | 'b',
  colorNames = COLOR_NAMES
) =>
  colorNames.filter(
    (colorName) => Math.abs(colorName[channelName] - channelValue) < 4
  );

export function rgbToColorName(paletteColor: PaletteMarkerXY) {
  const name = COLOR_NAMES.reduce(
    (acc, colorName) => {
      let diff = 0;
      for (const channel in colorName) {
        if (channel === 'r' || channel === 'g' || channel === 'b') {
          diff += Math.abs(
            (colorName[channel as keyof typeof colorName] as number) -
              (paletteColor[channel as keyof typeof paletteColor] as number)
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

export function hslToColorName(rgbPaletteColor: PaletteMarkerXY) {
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
  // console.log(hslColor, name);

  return name.name;
}

const changeToWarmth = (color: string) => {
  if (color === 'red' || color === 'orange' || color === 'yellow')
    return 'warm';
  else return 'cool';
};

export const hslToColorDescription = (paletteColor: IndexedPxColor) => {
  const { h, s, l } = paletteColor;
  let color = hueToColor(h);
  let satur = saturationToColor(s);
  let light = lightToColor(l);

  if (light === 'black' || light === 'white') {
    color = changeToWarmth(color);
    return `${color} ${light}`;
  }
  if (satur === 'grey') {
    return `${light} neutral ${satur}`;
  }

  if (light && satur !== 'grey') {
    return `${light} ${color} ${satur}`;
  }
  if (light === 'white' && (satur === 'grey' || satur === 'dull'))
    satur = 'neutral';
};

export const hueToColor = (hue: number) => {
  if (hue > 342 && hue <= 12) return 'red';
  if (hue > 12 && hue <= 32) return 'orange';
  if (hue > 32 && hue <= 64) return 'yellow';
  if (hue > 64 && hue <= 164) return 'green';
  if (hue > 164 && hue <= 256) return 'blue';
  if (hue > 256 && hue <= 288) return 'purple';
  if (hue > 288 && hue <= 342) return 'pink';
  else return '';
  // const hueName: string[] = [];
  // if (hue > 338 && hue <= 18) hueName.push('red');
  // if (hue > 38 && hue <= 86) hueName.push('yellow');
  // if (hue > 160 && hue <= 256) hueName.push('blue');
  // if (hue > 10 && hue <= 46) hueName.push('orange');
  // if (hue > 66 && hue <= 166) hueName.push('green');
  // if (hue > 256 && hue <= 308) hueName.push('purple');
  // if (hue > 284 && hue <= 344) hueName.push('pink');
  // return hueName.join('-');
};

const lightToColor = (light: number) => {
  if (light <= 6) return 'black';
  if (light <= 22) return 'dark';
  if (light > 22 && light <= 75) return '';
  if (light > 75 && light <= 90) return 'light';
  if (light > 90) return 'white';
};

const saturationToColor = (saturation: number) => {
  if (saturation <= 2) return 'neutral grey';
  if (saturation <= 12) return 'grey';
  if (saturation <= 30) return 'dull';
  if (saturation <= 45) return 'muted';
  if (saturation > 84) return 'bright';
};

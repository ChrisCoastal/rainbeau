export function RGBToHex(r: number, g: number, b: number) {
  let hexR = r.toString(16);
  let hexG = g.toString(16);
  let hexB = b.toString(16);

  if (hexR.length === 1) hexR = '0' + hexR;
  if (hexG.length === 1) hexG = '0' + hexG;
  if (hexB.length === 1) hexB = '0' + hexB;

  return '#' + hexR + hexG + hexB;
}

export function RGBToHSL(r: number, g: number, b: number) {
  // Make r, g, and b fractions of 1
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
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return 'hsl(' + h + ',' + s + '%,' + l + '%)';
}

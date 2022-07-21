interface appState {
  images: {}[];
  imageData: indexRgbType[];
  palette: xyRgbType[];
  // markers: [];
}

interface ReducerActions {
  type: 'setImages' | 'addPalette' | 'replacePalette';
  payload?: any;
}

interface rgbType {
  r: number;
  g: number;
  b: number;
}

interface coordinate {
  xPos: number;
  yPos: number;
}

interface xyRgbType extends rgbType {
  xy: coordinate;
}

interface indexRgbType extends rgbType {
  i: number;
}

interface hslType {
  h: number;
  s: number;
  l: number;
}

interface ColorName {
  name: string;
  r: number;
  g: number;
  b: number;
}

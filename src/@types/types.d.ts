interface appState {
  images: {}[];
  palette: indexRgbType[];
  // markers: [];
}

interface ReducerActions {
  type: 'setImages' | 'setPalette';
  payload?: any;
}

interface rgbType {
  r: number;
  g: number;
  b: number;
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

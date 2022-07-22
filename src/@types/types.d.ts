interface appState {
  images: {}[];
  currentImageData: indexRgbType[];
  markerPositions: MarkerPosition;
  palette: PaletteType[];
  // markers: [];
}

interface ReducerActions {
  type:
    | 'setImages'
    | 'setCurrentImageData'
    | 'addPalette'
    | 'replacePalette'
    | 'setMarkerPosition';
  payload?: any;
}

type MarkerPosition = Array<[number, number]>;

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

interface PaletteType extends rgbType {
  xy: coordinate;
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

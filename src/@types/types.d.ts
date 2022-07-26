interface appState {
  images: {}[];
  currentImageData: IndexedPxColor[];
  markerPositions: MarkerPosition;
  palette: PaletteType[];
  // markers: [];
}

interface ReducerActions {
  type:
    | 'setImages'
    | 'setCurrentImageData'
    | 'addMarker'
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

interface hslType {
  h: number;
  s: number;
  l: number;
}

interface IndexedPxColor extends rgbType, hslType {
  i: number;
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

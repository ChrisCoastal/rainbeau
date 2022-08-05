// state and reducer
interface appState {
  canvasXY: { x: number; y: number };
  images: Image[];
  currentImageData: IndexedPxColor[];
  paletteMarkers: ColorMarker[];
  markerHistory: ColorMarker[][];
}

interface ReducerActions {
  type:
    | 'setCanvasXY'
    | 'setImages'
    | 'setCurrentImageData'
    | 'addMarker'
    | 'deleteMarker'
    | 'addColorName'
    | 'updateColorNames'
    | 'updatePalette'
    | 'deletePalette'
    | 'undoPalette';
  payload?: any;
}

// API response
interface APIImageData {
  alt_description: string | null;
  description: string | null;
  blur_hash: string;
  color: string; // HEX
  height: number;
  width: number;
  id: string;
  links: {
    download: string;
  };
  urls: {
    full: string;
    regular: string; // use for canvas
    thumb: string;
  };
  user: {
    name: string;
    username: string;
    portfolio_url: string;
  };
  [key: string]: string | number | null;
}

type APIResponse = APIImageData[];

// Image
interface Image {
  altText: string | null;
  blurImage: string;
  color: string; // HEX
  imageDimensions: { x: image.width; y: image.height };
  imageURL: string;
  imageThumb: string;
  downloadLink: string;
  id: string;
  artistName: string | null;
  artistLink: string | null;
}

// px and markers
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

interface ColorMarker extends IndexedPxColor {
  xy: coordinate;
  name: string;
  customName?: string;
}

interface ColorName {
  name: string;
  r: number;
  g: number;
  b: number;
}

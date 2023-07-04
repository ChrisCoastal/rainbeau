declare module '*.mp4';

declare module '*.jpeg';

declare module '*.png';

declare module '*.jpg';

declare module '*.webm';

declare module '*.svg';

declare module '*.gif';

// canvas and windowSize

type WindowSize = {
  clientWidth: number;
  clientHeight: number;
};

// state and reducer
interface AppState {
  canvasXY: { x: number; y: number };
  images: Image[];
  currentImageData: IndexedPxColor[];
  paletteMarkers: ColorMarker[];
  markerHistory: ColorMarker[][];
  isLoading: boolean;
  isError: boolean;
}

interface ReducerActions {
  type:
    | 'setCanvasXY'
    | 'setImages'
    | 'setCurrentImageData'
    | 'setLoading'
    | 'setError'
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
    html: string;
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
  [key: string]: any;
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
  unsplashLink: string;
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

// state and reducer
interface appState {
  images: Image[];
  currentImageData: IndexedPxColor[];
  palette: PaletteType[];
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
  xy: coordinate;
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

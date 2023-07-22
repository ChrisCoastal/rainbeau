// state and reducer
interface AppState {
  canvasXY: { x: number; y: number };
  images: Image[];
  currentImageIndex: number;
  currentImageData: IndexedPxColor[];
  paletteMarkers: ColorMarker[];
  activeMarker: number | null;
  history: { index: number; snapshots: History[] };
  activeMenuTab: 'palette' | 'output';
  isLoading: boolean;
  isError: boolean;
}

type AppContextType = {
  state: AppState;
  dispatch: Dispatch<ReducerActions>;
};

type SetCanvasXYAction = {
  type: 'setCanvasXY';
  payload: { x: number; y: number };
};
type SetImagesAction = {
  type: 'setImages';
  payload: Image[];
};
type SetCurrentImageIndexAction = {
  type: 'setCurrentImageIndex';
  payload?: number;
};
type SetCurrentImageDataAction = {
  type: 'setCurrentImageData';
  payload: IndexedPxColor[];
};
type SetLoadingAction = {
  type: 'setLoading';
  payload: boolean;
};
type SetErrorAction = {
  type: 'setError';
  payload: boolean;
};
type AddMarkerAction = {
  type: 'addMarker';
  payload: ColorMarker[];
};
type DeleteMarkerAction = {
  type: 'deleteMarker';
  payload: ColorMarker;
};
type SetActiveMarkerAction = {
  type: 'setActiveMarker';
  payload: number | null;
};
type AddColorNameAction = {
  type: 'addColorName';
  payload: ColorName;
};
type UpdateColorNamesAction = {
  type: 'updateColorNames';
  payload: ColorName[];
};
type UpdatePaletteAction = {
  type: 'updatePalette';
  payload: { markerIndex: number; updatedMarker: ColorMarker };
};
type UpdateHistoryAction = {
  type: 'updateHistory';
  payload: History;
};
type DeletePaletteAction = {
  type: 'deletePalette';
  payload?: undefined;
};
type UndoAction = {
  type: 'undoAction';
  payload?: 'undo' | 'redo';
};
type SetActiveMenuTabAction = {
  type: 'setActiveMenuTab';
  payload: 'palette' | 'output';
};

type ReducerActions =
  | SetCanvasXYAction
  | SetImagesAction
  | SetCurrentImageIndexAction
  | SetCurrentImageDataAction
  | SetLoadingAction
  | SetErrorAction
  | AddMarkerAction
  | DeleteMarkerAction
  | SetActiveMarkerAction
  | AddColorNameAction
  | UpdateColorNamesAction
  | UpdatePaletteAction
  | UpdateHistoryAction
  | DeletePaletteAction
  | UndoAction
  | SetActiveMenuTabAction;

interface History {
  canvasXY: { x: number; y: number };
  currentImageIndex: number;
  paletteMarkers: ColorMarker[];
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
    html?: string;
    download?: string;
  };
  urls: {
    full: string;
    regular: string; // use for canvas
    thumb: string;
  };
  user: {
    name?: string;
    username?: string;
    portfolio_url?: string;
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

// canvas and windowSize
type WindowSize = {
  innerWidth: number;
  innerHeight: number;
};

// px and markers
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

interface IndexedPxColor extends rgbType {
  i: number;
}

interface Coordinate {
  x: number;
  y: number;
}

interface ColorMarker extends IndexedPxColor {
  readonly id: string;
  readonly name: string;
  customName?: string;
  markerIndex: number;
  x: number;
  y: number;
}

declare module '*.mp4';

declare module '*.jpeg';

declare module '*.png';

declare module '*.jpg';

declare module '*.webm';

declare module '*.svg';

declare module '*.gif';

// state
export const INITIAL_STATE: AppState = {
  canvasXY: { x: 0, y: 0 },
  images: [],
  currentImageIndex: 0,
  currentImageData: [],
  paletteMarkers: [],
  activeMarker: null,
  history: { index: -1, snapshots: [] },
  activeMenuTab: 'palette',
  isLoading: false,
  isError: false,
} as AppState;

// UI
export const BREAKPOINTS_X = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
} as const;

export const BREAKPOINTS_Y = {
  xs: 480,
  sm: 640,
  md: 720,
  lg: 900,
  xl: 1200,
} as const;

export const MEDIA_QUERY = {
  mobile: `(min-width: ${BREAKPOINTS_X.sm}px) and (min-height: ${BREAKPOINTS_Y.sm}px) and (orientation: portrait)`,
  tablet: `(min-width: ${BREAKPOINTS_X.sm}px) and (min-height: ${BREAKPOINTS_Y.md}px) and (orientation: portrait)`,
  sm: `(min-width: ${BREAKPOINTS_X.md}px) and (max-height: ${BREAKPOINTS_Y.sm}px) and (orientation: landscape)`,
  md: `(min-width: ${BREAKPOINTS_X.md}px) and (min-height: ${BREAKPOINTS_Y.sm}px) and (orientation: landscape)`,
  lg: `(min-width: ${BREAKPOINTS_X.md}px) and (min-height: ${BREAKPOINTS_Y.md}px) and (orientation: landscape)`,
  xl: `(min-width: ${BREAKPOINTS_X.lg}px) and (min-height: ${BREAKPOINTS_Y.lg}px)`,
} as const;

export const MAX_NUM_MARKERS = 6;

// image canvas / color
export const REM_RATIO = 16;

export const RGBA_GROUP = 4; // fixed jpg rgb px grouping (do not change)

export const MEASUREMENT_PRECISION = 1; // can be adjusted? FIXME: check for num > 1

// unsplash api
export const IMAGE_BASE_URL = 'https://api.unsplash.com/photos/';

export const IMAGE_COUNT = 8;

export const INITIAL_IMAGE = [
  {
    alt_description: 'a multicolored rainbeau floating on a white background',
    blur_hash: 'LOP?E%XnqEvfN^i_M{b^YjngmST1',
    color: '#d9d9d9',
    created_at: '2023-06-16T06:20:41Z',
    description: 'a multicolored rainbeau floating on a white background',
    downloads: 6340,
    height: 6000,
    id: '8UHu4sfnXqA',
    liked_by_user: false,
    likes: 93,
    links: {
      // download:
      //   'https://unsplash.com/photos/8UHu4sfnXqA/download?ixid=M3wzNDUxODl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODg0OTcxMzB8',
      // download_location:
      //   'https://api.unsplash.com/photos/8UHu4sfnXqA/download?ixid=M3wzNDUxODl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODg0OTcxMzB8',
      // html: 'https://unsplash.com/photos/a-multicolored-sculpture-of-a-fish-on-a-white-background-8UHu4sfnXqA',
      // self: 'https://api.unsplash.com/photos/a-multicolored-sculpture-of-a-fish-on-a-white-background-8UHu4sfnXqA',
      // slug: 'a-multicolored-sculpture-of-a-fish-on-a-white-background-8UHu4sfnXqA',
    },
    sponsorship: null,
    urls: {
      full: 'https://images.unsplash.com/photo-1686895712747-e7c4287fe41a?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzNDUxODl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODg0OTcxMzB8&ixlib=rb-4.0.3&q=85',
      raw: 'https://images.unsplash.com/photo-1686895712747-e7c4287fe41a?ixid=M3wzNDUxODl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODg0OTcxMzB8&ixlib=rb-4.0.3',
      regular:
        'https://images.unsplash.com/photo-1686895712747-e7c4287fe41a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDUxODl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODg0OTcxMzB8&ixlib=rb-4.0.3&q=80&w=1080',
      small:
        'https://images.unsplash.com/photo-1686895712747-e7c4287fe41a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDUxODl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODg0OTcxMzB8&ixlib=rb-4.0.3&q=80&w=400',
      small_s3:
        'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1686895712747-e7c4287fe41a',
      thumb:
        'https://images.unsplash.com/photo-1686895712747-e7c4287fe41a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNDUxODl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODg0OTcxMzB8&ixlib=rb-4.0.3&q=80&w=200',
    },
    user: {
      accepted_tos: true,
      bio: 'Just Nick doing some quirky work ',
      first_name: 'Niquirk',
      for_hire: false,
      id: 'GigPKnKZFAE',
      instagram_username: 'niquirk_n.panovic',
      last_name: '.',
      links: {
        followers: 'https://api.unsplash.com/users/niquirk/followers',
        following: 'https://api.unsplash.com/users/niquirk/following',
        html: 'https://unsplash.com/@niquirk',
        likes: 'https://api.unsplash.com/users/niquirk/likes',
        photos: 'https://api.unsplash.com/users/niquirk/photos',
        portfolio: 'https://api.unsplash.com/users/niquirk/portfolio',
        self: 'https://api.unsplash.com/users/niquirk',
      },
      name: 'Niquirk .',
      portfolio_url:
        'https://stock.adobe.com/contributor/202246000/niquirk?load_type=author',
      username: 'niquirk',
    },
    views: 839078,
    width: 6000,
  },
];

// firestore
export const FIRESTORE_BASE_URL = 'https://api.unsplash.com/photos/';

export const MEDIAN = { lower: 1 / 2, upper: 1 / 2 + 1 };

export const MID_AVG = { lower: 1 / 3, upper: 2 / 3 };

export const COLOR_NAMES = [
  { name: 'black', h: 0, s: 0, l: 0, r: 0, g: 0, b: 0 },
  { name: 'green', h: 120, s: 100, l: 25, r: 0, g: 128, b: 0 },
  { name: 'clover', h: 146, s: 100, l: 50, r: 0, g: 255, b: 111 },
  { name: 'british-racing-green', h: 154, s: 100, l: 13, r: 0, g: 66, b: 37 },
  { name: 'cadmium-green', h: 154, s: 100, l: 21, r: 0, g: 107, b: 60 },
  { name: 'jade', h: 158, s: 100, l: 33, r: 0, g: 168, b: 107 },
  { name: 'caribbean-green', h: 165, s: 100, l: 40, r: 0, g: 204, b: 153 },
  { name: 'tropical-rain-forest', h: 168, s: 100, l: 23, r: 0, g: 117, b: 94 },
  { name: 'teal', h: 180, s: 100, l: 25, r: 0, g: 128, b: 128 },
  { name: 'dark-cyan', h: 180, s: 100, l: 27, r: 0, g: 139, b: 139 },
  { name: 'cyan', h: 180, s: 100, l: 50, r: 0, g: 255, b: 255 },
  { name: 'cerulean', h: 196, s: 100, l: 33, r: 0, g: 123, b: 167 },
  { name: 'dark-midnight-blue', h: 210, s: 100, l: 20, r: 0, g: 51, b: 102 },
  { name: 'azure', h: 210, s: 100, l: 50, r: 0, g: 127, b: 255 },
  { name: 'oxford-blue', h: 212, s: 100, l: 14, r: 0, g: 33, b: 71 },
  { name: 'cool-black', h: 212, s: 100, l: 19, r: 0, g: 46, b: 99 },
  { name: 'cobalt', h: 215, s: 100, l: 34, r: 0, g: 71, b: 171 },
  { name: 'royal-blue', h: 219, s: 100, l: 20, r: 0, g: 35, b: 102 },
  { name: 'dark-powder-blue', h: 220, s: 100, l: 30, r: 0, g: 51, b: 153 },
  { name: 'klein-blue', h: 223, s: 100, l: 33, r: 0, g: 47, b: 167 },
  { name: 'navy-blue', h: 240, s: 100, l: 25, r: 0, g: 0, b: 128 },
  { name: 'dark-blue', h: 240, s: 100, l: 27, r: 0, g: 0, b: 139 },
  { name: 'duke-blue', h: 240, s: 100, l: 31, r: 0, g: 0, b: 156 },
  { name: 'blue', h: 240, s: 100, l: 50, r: 0, g: 0, b: 255 },
  { name: 'forest-green', h: 149, s: 97, l: 14, r: 1, g: 68, b: 33 },
  { name: 'dark-green', h: 158, s: 96, l: 10, r: 1, g: 50, b: 32 },
  { name: 'pine-green', h: 175, s: 98, l: 24, r: 1, g: 121, b: 111 },
  { name: 'dark-pastel-green', h: 138, s: 97, l: 38, r: 3, g: 192, b: 60 },
  { name: 'bright-turquoise', h: 177, s: 93, l: 47, r: 8, g: 232, b: 222 },
  { name: 'dark-cerulean', h: 209, s: 88, l: 26, r: 8, g: 69, b: 126 },
  { name: 'sapphire', h: 222, s: 86, l: 22, r: 8, g: 37, b: 103 },
  { name: 'yale-blue', h: 212, s: 81, l: 32, r: 15, g: 77, b: 146 },
  { name: 'ultramarine', h: 244, s: 87, l: 30, r: 18, g: 10, b: 143 },
  { name: 'india-green', h: 115, s: 89, l: 28, r: 19, g: 136, b: 8 },
  { name: 'denim', h: 213, s: 80, l: 41, r: 21, g: 96, b: 189 },
  { name: 'dark-spring-green', h: 150, s: 66, l: 27, r: 23, g: 114, b: 69 },
  { name: 'midnight-blue', h: 240, s: 64, l: 27, r: 25, g: 25, b: 112 },
  { name: 'dark-jungle-green', h: 162, s: 16, l: 12, r: 26, g: 36, b: 33 },
  { name: 'cerulean-blue', h: 224, s: 64, l: 45, r: 42, g: 82, b: 190 },
  { name: 'dark-slate-gray', h: 180, s: 25, l: 25, r: 47, g: 79, b: 79 },
  { name: 'turquoise', h: 175, s: 66, l: 51, r: 48, g: 213, b: 200 },
  { name: 'bleu-de-france', h: 210, s: 79, l: 55, r: 49, g: 140, b: 231 },
  { name: 'seal-brown', h: 0, s: 43, l: 14, r: 50, g: 20, b: 20 },
  { name: 'charcoal', h: 204, s: 19, l: 26, r: 54, g: 69, b: 79 },
  { name: 'arsenic', h: 206, s: 12, l: 26, r: 59, g: 68, b: 75 },
  { name: 'dark-sienna', h: 0, s: 50, l: 16, r: 60, g: 20, b: 20 },
  { name: 'bistre', h: 24, s: 33, l: 18, r: 61, g: 43, b: 31 },
  { name: 'mint', h: 158, s: 49, l: 47, r: 62, g: 180, b: 137 },
  { name: 'rifle-green', h: 80, s: 17, l: 24, r: 65, g: 72, b: 51 },
  { name: 'steel-blue', h: 207, s: 44, l: 49, r: 70, g: 130, b: 180 },
  { name: 'dark-lava', h: 27, s: 18, l: 24, r: 72, g: 60, b: 50 },
  { name: 'army-green', h: 69, s: 44, l: 23, r: 75, g: 83, b: 32 },
  { name: 'emerald', h: 140, s: 52, l: 55, r: 80, g: 200, b: 120 },
  { name: 'cadet', h: 206, s: 18, l: 40, r: 83, g: 104, b: 120 },
  { name: 'davys-grey', h: 0, s: 0, l: 33, r: 85, g: 85, b: 85 },
  { name: 'dark-olive-green', h: 82, s: 39, l: 30, r: 85, g: 107, b: 47 },
  { name: 'dark-scarlet', h: 344, s: 93, l: 17, r: 86, g: 3, b: 25 },
  { name: 'united-nations-blue', h: 216, s: 73, l: 63, r: 91, g: 146, b: 229 },
  { name: 'air-force-blue', h: 204, s: 30, l: 51, r: 93, g: 138, b: 168 },
  { name: 'dark-byzantium', h: 315, s: 24, l: 29, r: 93, g: 57, b: 84 },
  { name: 'glaucous', h: 216, s: 37, l: 55, r: 96, g: 130, b: 182 },
  { name: 'eggplant', h: 329, s: 21, l: 32, r: 97, g: 64, b: 81 },
  { name: 'cornflower-blue', h: 219, s: 79, l: 66, r: 100, g: 149, b: 237 },
  { name: 'dark-brown', h: 30, s: 51, l: 26, r: 101, g: 67, b: 33 },
  { name: 'rosewood', h: 353, s: 100, l: 20, r: 101, g: 0, b: 11 },
  { name: 'bright-green', h: 96, s: 100, l: 50, r: 102, g: 255, b: 0 },
  { name: 'dim-gray', h: 0, s: 0, l: 41, r: 105, g: 105, b: 105 },
  { name: 'purple-heart', h: 270, s: 49, l: 41, r: 105, g: 53, b: 156 },
  { name: 'auburn', h: 20, s: 61, l: 26, r: 109, g: 53, b: 26 },
  { name: 'prune', h: 0, s: 60, l: 27, r: 112, g: 28, b: 28 },
  { name: 'sepia', h: 30, s: 70, l: 26, r: 112, g: 66, b: 20 },
  { name: 'byzantium', h: 311, s: 46, l: 30, r: 112, g: 41, b: 99 },
  { name: 'iceberg', h: 207, s: 52, l: 63, r: 113, g: 166, b: 210 },
  { name: 'xanadu', h: 136, s: 8, l: 49, r: 115, g: 134, b: 120 },
  { name: 'dark-lavender', h: 270, s: 31, l: 45, r: 115, g: 79, b: 150 },
  { name: 'pastel-green', h: 120, s: 60, l: 67, r: 119, g: 221, b: 119 },
  { name: 'dark-pastel-blue', h: 212, s: 45, l: 63, r: 119, g: 158, b: 203 },
  { name: 'camouflage-green', h: 91, s: 11, l: 47, r: 120, g: 134, b: 107 },
  { name: 'bole', h: 9, s: 34, l: 35, r: 121, g: 68, b: 59 },
  { name: 'chocolate', h: 31, s: 100, l: 24, r: 123, g: 63, b: 0 },
  { name: 'lawn-green', h: 90, s: 100, l: 49, r: 124, g: 252, b: 0 },
  { name: 'aquamarine', h: 160, s: 100, l: 75, r: 127, g: 255, b: 212 },
  { name: 'gray', h: 0, s: 0, l: 50, r: 128, g: 128, b: 128 },
  { name: 'maroon', h: 0, s: 100, l: 25, r: 128, g: 0, b: 0 },
  { name: 'olive', h: 60, s: 100, l: 25, r: 128, g: 128, b: 0 },
  { name: 'burgundy', h: 345, s: 100, l: 25, r: 128, g: 0, b: 32 },
  { name: 'raw-umber', h: 33, s: 31, l: 39, r: 130, g: 102, b: 68 },
  { name: 'pastel-brown', h: 28, s: 22, l: 42, r: 131, g: 105, b: 83 },
  { name: 'battleship-grey', h: 60, s: 1, l: 51, r: 132, g: 132, b: 130 },
  { name: 'dollar-bill', h: 98, s: 39, l: 56, r: 133, g: 187, b: 101 },
  { name: 'asparagus', h: 93, s: 27, l: 54, r: 135, g: 169, b: 107 },
  { name: 'sky-blue', h: 197, s: 71, l: 73, r: 135, g: 206, b: 235 },
  { name: 'dark-raspberry', h: 330, s: 56, l: 34, r: 135, g: 38, b: 87 },
  { name: 'baby-blue', h: 199, s: 77, l: 74, r: 137, g: 207, b: 240 },
  { name: 'cordovan', h: 355, s: 37, l: 39, r: 137, g: 63, b: 69 },
  { name: 'burnt-umber', h: 9, s: 59, l: 34, r: 138, g: 51, b: 36 },
  { name: 'shadow', h: 37, s: 19, l: 45, r: 138, g: 121, b: 93 },
  { name: 'dark-magenta', h: 300, s: 100, l: 27, r: 139, g: 0, b: 139 },
  { name: 'cool-grey', h: 229, s: 16, l: 61, r: 140, g: 146, b: 172 },
  { name: 'apple-green', h: 74, s: 100, l: 36, r: 141, g: 182, b: 0 },
  { name: 'plum', h: 307, s: 35, l: 41, r: 142, g: 69, b: 133 },
  { name: 'violet', h: 274, s: 100, l: 50, r: 143, g: 0, b: 255 },
  { name: 'dark-tan', h: 45, s: 28, l: 44, r: 145, g: 129, b: 81 },
  { name: 'ceil', h: 225, s: 39, l: 69, r: 146, g: 161, b: 207 },
  { name: 'pistachio', h: 96, s: 42, l: 61, r: 147, g: 197, b: 114 },
  { name: 'dark-violet', h: 282, s: 100, l: 41, r: 148, g: 0, b: 211 },
  { name: 'brown', h: 30, s: 100, l: 29, r: 150, g: 75, b: 0 },
  { name: 'sand-dune', h: 43, s: 73, l: 34, r: 150, g: 113, b: 23 },
  { name: 'dark-pastel-purple', h: 263, s: 56, l: 64, r: 150, g: 111, b: 214 },
  { name: 'carmine', h: 350, s: 100, l: 29, r: 150, g: 0, b: 24 },
  { name: 'dark-chestnut', h: 10, s: 23, l: 49, r: 152, g: 105, b: 96 },
  { name: 'cinereous', h: 12, s: 12, l: 54, r: 152, g: 129, b: 123 },
  { name: 'bazaar', h: 353, s: 14, l: 53, r: 152, g: 119, b: 123 },
  { name: 'golden-brown', h: 36, s: 76, l: 34, r: 153, g: 101, b: 21 },
  { name: 'carolina-blue', h: 211, s: 50, l: 73, r: 153, g: 186, b: 221 },
  { name: 'columbia-blue', h: 200, s: 100, l: 80, r: 155, g: 221, b: 255 },
  { name: 'chamoisee', h: 26, s: 28, l: 49, r: 160, g: 120, b: 90 },
  { name: 'baby-blue-eyes', h: 209, s: 74, l: 79, r: 161, g: 202, b: 241 },
  { name: 'cambridge-blue', h: 140, s: 19, l: 70, r: 163, g: 193, b: 173 },
  { name: 'dark-candy-apple-red', h: 0, s: 100, l: 32, r: 164, g: 0, b: 0 },
  { name: 'android-green', h: 74, s: 55, l: 50, r: 164, g: 198, b: 57 },
  { name: 'spring-bud', h: 80, s: 100, l: 49, r: 167, g: 252, b: 0 },
  { name: 'celadon', h: 123, s: 47, l: 78, r: 172, g: 225, b: 175 },
  { name: 'pastel-blue', h: 196, s: 26, l: 75, r: 174, g: 198, b: 207 },
  { name: 'firebrick', h: 0, s: 68, l: 42, r: 178, g: 34, b: 34 },
  { name: 'inchworm', h: 84, s: 79, l: 65, r: 178, g: 236, b: 93 },
  { name: 'ash-grey', h: 135, s: 8, l: 72, r: 178, g: 190, b: 181 },
  { name: 'cornell-red', h: 0, s: 74, l: 40, r: 179, g: 27, b: 27 },
  { name: 'pastel-purple', h: 295, s: 13, l: 66, r: 179, g: 158, b: 181 },
  { name: 'brass', h: 52, s: 47, l: 48, r: 181, g: 166, b: 66 },
  { name: 'lavender', h: 275, s: 57, l: 68, r: 181, g: 126, b: 220 },
  { name: 'rust', h: 18, s: 86, l: 39, r: 183, g: 65, b: 14 },
  { name: 'copper', h: 29, s: 57, l: 46, r: 184, g: 115, b: 51 },
  { name: 'dark-goldenrod', h: 43, s: 89, l: 38, r: 184, g: 134, b: 11 },
  { name: 'dark-khaki', h: 56, s: 38, l: 58, r: 189, g: 183, b: 107 },
  { name: 'byzantine', h: 311, s: 58, l: 47, r: 189, g: 51, b: 164 },
  { name: 'lime', h: 75, s: 100, l: 50, r: 191, g: 255, b: 0 },
  { name: 'bright-lavender', h: 272, s: 60, l: 74, r: 191, g: 148, b: 228 },
  { name: 'silver', h: 0, s: 0, l: 75, r: 192, g: 192, b: 192 },
  { name: 'mahogany', h: 20, s: 100, l: 38, r: 192, g: 64, b: 0 },
  { name: 'desert', h: 33, s: 41, l: 59, r: 193, g: 154, b: 107 },
  { name: 'dark-pastel-red', h: 9, s: 70, l: 45, r: 194, g: 59, b: 34 },
  { name: 'sand', h: 45, s: 35, l: 63, r: 194, g: 178, b: 128 },
  { name: 'khaki', h: 37, s: 29, l: 67, r: 195, g: 176, b: 145 },
  { name: 'bright-maroon', h: 346, s: 71, l: 45, r: 195, g: 33, b: 72 },
  { name: 'lavender-gray', h: 245, s: 12, l: 79, r: 196, g: 195, b: 208 },
  { name: 'cardinal', h: 350, s: 73, l: 44, r: 196, g: 30, b: 58 },
  { name: 'sinopia', h: 17, s: 90, l: 42, r: 203, g: 65, b: 11 },
  { name: 'pastel-violet', h: 302, s: 32, l: 70, r: 203, g: 153, b: 201 },
  { name: 'boston-university-red', h: 0, s: 100, l: 40, r: 204, g: 0, b: 0 },
  { name: 'burnt-orange', h: 25, s: 100, l: 40, r: 204, g: 85, b: 0 },
  { name: 'ochre', h: 30, s: 71, l: 47, r: 204, g: 119, b: 34 },
  { name: 'lavender-blue', h: 240, s: 100, l: 90, r: 204, g: 204, b: 255 },
  { name: 'dark-terra-cotta', h: 353, s: 55, l: 55, r: 204, g: 78, b: 92 },
  { name: 'chestnut', h: 0, s: 53, l: 58, r: 205, g: 92, b: 92 },
  { name: 'dark-coral', h: 10, s: 58, l: 54, r: 205, g: 91, b: 69 },
  { name: 'bronze', h: 30, s: 61, l: 50, r: 205, g: 127, b: 50 },
  { name: 'fire-engine-red', h: 357, s: 81, l: 45, r: 206, g: 22, b: 32 },
  { name: 'pastel-gray', h: 60, s: 10, l: 79, r: 207, g: 207, b: 196 },
  { name: 'sky-magenta', h: 320, s: 49, l: 63, r: 207, g: 113, b: 175 },
  { name: 'pear', h: 66, s: 75, l: 54, r: 209, g: 226, b: 49 },
  { name: 'bright-ube', h: 281, s: 61, l: 77, r: 209, g: 159, b: 232 },
  { name: 'cinnamon', h: 25, s: 75, l: 47, r: 210, g: 105, b: 30 },
  { name: 'jasper', h: 359, s: 66, l: 54, r: 215, g: 59, b: 62 },
  { name: 'goldenrod', h: 43, s: 74, l: 49, r: 218, g: 165, b: 32 },
  { name: 'crimson', h: 348, s: 83, l: 47, r: 220, g: 20, b: 60 },
  { name: 'burlywood', h: 34, s: 57, l: 70, r: 222, g: 184, b: 135 },
  { name: 'blush', h: 342, s: 66, l: 62, r: 222, g: 93, b: 131 },
  { name: 'cherry', h: 343, s: 72, l: 53, r: 222, g: 49, b: 99 },
  { name: 'chartreuse', h: 68, s: 100, l: 50, r: 223, g: 255, b: 0 },
  { name: 'ruby', h: 337, s: 86, l: 47, r: 224, g: 17, b: 95 },
  { name: 'earth-yellow', h: 34, s: 68, l: 63, r: 225, g: 169, b: 95 },
  { name: 'terra-cotta', h: 10, s: 70, l: 62, r: 226, g: 114, b: 91 },
  { name: 'flame', h: 17, s: 77, l: 51, r: 226, g: 88, b: 34 },
  { name: 'cinnabar', h: 5, s: 76, l: 55, r: 227, g: 66, b: 52 },
  { name: 'indian-yellow', h: 35, s: 71, l: 62, r: 227, g: 168, b: 87 },
  { name: 'raspberry', h: 337, s: 91, l: 47, r: 227, g: 11, b: 93 },
  { name: 'cadmium-red', h: 351, s: 100, l: 45, r: 227, g: 0, b: 34 },
  { name: 'alizarin', h: 355, s: 77, l: 52, r: 227, g: 38, b: 54 },
  { name: 'gamboge', h: 39, s: 88, l: 48, r: 228, g: 155, b: 15 },
  { name: 'straw', h: 54, s: 68, l: 66, r: 228, g: 217, b: 111 },
  { name: 'citrine', h: 55, s: 92, l: 47, r: 228, g: 208, b: 10 },
  { name: 'fawn', h: 30, s: 69, l: 67, r: 229, g: 170, b: 112 },
  { name: 'platinum', h: 40, s: 5, l: 89, r: 229, g: 228, b: 226 },
  { name: 'amaranth', h: 348, s: 78, l: 53, r: 229, g: 43, b: 80 },
  { name: 'peridot', h: 59, s: 100, l: 45, r: 230, g: 226, b: 0 },
  { name: 'bubbles', h: 183, s: 100, l: 95, r: 231, g: 254, b: 255 },
  { name: 'dark-pink', h: 342, s: 75, l: 62, r: 231, g: 84, b: 128 },
  { name: 'burnt-sienna', h: 14, s: 78, l: 62, r: 233, g: 116, b: 81 },
  { name: 'dark-salmon', h: 15, s: 72, l: 70, r: 233, g: 150, b: 122 },
  { name: 'arylide-yellow', h: 51, s: 74, l: 67, r: 233, g: 214, b: 107 },
  { name: 'sandstorm', h: 52, s: 82, l: 59, r: 236, g: 213, b: 64 },
  { name: 'desert-sand', h: 25, s: 63, l: 81, r: 237, g: 201, b: 175 },
  { name: 'cadmium-orange', h: 28, s: 84, l: 55, r: 237, g: 135, b: 45 },
  { name: 'carrot-orange', h: 33, s: 85, l: 53, r: 237, g: 145, b: 33 },
  { name: 'titanium-yellow', h: 58, s: 100, l: 47, r: 238, g: 230, b: 0 },
  { name: 'pearl', h: 46, s: 46, l: 89, r: 240, g: 234, b: 214 },
  { name: 'buff', h: 49, s: 79, l: 73, r: 240, g: 220, b: 130 },
  { name: 'dandelion', h: 55, s: 86, l: 56, r: 240, g: 225, b: 48 },
  { name: 'alice-blue', h: 208, s: 100, l: 97, r: 240, g: 248, b: 255 },
  { name: 'tangerine', h: 33, s: 100, l: 47, r: 242, g: 133, b: 0 },
  { name: 'vanilla', h: 48, s: 75, l: 81, r: 243, g: 229, b: 171 },
  { name: 'baby-pink', h: 0, s: 69, l: 86, r: 244, g: 194, b: 194 },
  { name: 'saffron', h: 45, s: 90, l: 57, r: 244, g: 196, b: 48 },
  { name: 'pastel-magenta', h: 333, s: 80, l: 78, r: 244, g: 154, b: 194 },
  { name: 'white-smoke', h: 0, s: 0, l: 96, r: 245, g: 245, b: 245 },
  { name: 'wheat', h: 39, s: 77, l: 83, r: 245, g: 222, b: 179 },
  { name: 'beige', h: 60, s: 56, l: 91, r: 245, g: 245, b: 220 },
  { name: 'champagne', h: 37, s: 72, l: 89, r: 247, g: 231, b: 206 },
  { name: 'flavescent', h: 52, s: 87, l: 76, r: 247, g: 233, b: 142 },
  { name: 'ghost-white', h: 240, s: 100, l: 99, r: 248, g: 248, b: 255 },
  { name: 'sunset', h: 35, s: 89, l: 81, r: 250, g: 214, b: 165 },
  { name: 'blond', h: 50, s: 86, l: 86, r: 250, g: 240, b: 190 },
  { name: 'apricot', h: 24, s: 90, l: 84, r: 251, g: 206, b: 177 },
  { name: 'corn', h: 54, s: 95, l: 67, r: 251, g: 236, b: 93 },
  { name: 'classic-rose', h: 326, s: 85, l: 89, r: 251, g: 204, b: 231 },
  { name: 'icterine', h: 58, s: 96, l: 68, r: 252, g: 247, b: 94 },
  { name: 'flamingo-pink', h: 344, s: 95, l: 77, r: 252, g: 142, b: 172 },
  { name: 'pastel-yellow', h: 60, s: 96, l: 79, r: 253, g: 253, b: 150 },
  { name: 'white', h: 0, s: 0, l: 100, r: 255, g: 255, b: 255 },
  { name: 'red', h: 0, s: 100, l: 50, r: 255, g: 0, b: 0 },
  { name: 'indian-red', h: 0, s: 100, l: 68, r: 255, g: 92, b: 92 },
  { name: 'snow', h: 0, s: 100, l: 99, r: 255, g: 250, b: 250 },
  { name: 'candy-apple-red', h: 2, s: 100, l: 50, r: 255, g: 8, b: 0 },
  { name: 'pastel-red', h: 3, s: 100, l: 69, r: 255, g: 105, b: 97 },
  { name: 'ferrari-red', h: 7, s: 100, l: 50, r: 255, g: 28, b: 0 },
  { name: 'portland-orange', h: 11, s: 100, l: 61, r: 255, g: 90, b: 54 },
  { name: 'coquelicot', h: 13, s: 100, l: 50, r: 255, g: 56, b: 0 },
  { name: 'salmon', h: 14, s: 100, l: 71, r: 255, g: 140, b: 105 },
  { name: 'coral', h: 16, s: 100, l: 66, r: 255, g: 127, b: 80 },
  { name: 'atomic-tangerine', h: 20, s: 100, l: 70, r: 255, g: 153, b: 102 },
  { name: 'safety-orange', h: 24, s: 100, l: 50, r: 255, g: 103, b: 0 },
  { name: 'pumpkin', h: 24, s: 100, l: 55, r: 255, g: 117, b: 24 },
  { name: 'seashell', h: 25, s: 100, l: 97, r: 255, g: 245, b: 238 },
  { name: 'orange', h: 30, s: 100, l: 50, r: 255, g: 127, b: 0 },
  { name: 'dark-orange', h: 33, s: 100, l: 50, r: 255, g: 140, b: 0 },
  { name: 'pastel-orange', h: 35, s: 100, l: 64, r: 255, g: 179, b: 71 },
  { name: 'dark-tangerine', h: 38, s: 100, l: 54, r: 255, g: 168, b: 18 },
  { name: 'chrome-yellow', h: 39, s: 100, l: 50, r: 255, g: 167, b: 0 },
  { name: 'peach', h: 39, s: 100, l: 85, r: 255, g: 229, b: 180 },
  { name: 'amber', h: 45, s: 100, l: 50, r: 255, g: 191, b: 0 },
  { name: 'banana-yellow', h: 47, s: 100, l: 58, r: 255, g: 209, b: 42 },
  { name: 'mustard', h: 47, s: 100, l: 67, r: 255, g: 219, b: 88 },
  { name: 'cornsilk', h: 48, s: 100, l: 93, r: 255, g: 248, b: 220 },
  { name: 'golden-yellow', h: 52, s: 100, l: 50, r: 255, g: 223, b: 0 },
  { name: 'canary-yellow', h: 56, s: 100, l: 50, r: 255, g: 239, b: 0 },
  { name: 'cream', h: 57, s: 100, l: 91, r: 255, g: 253, b: 208 },
  { name: 'lemon', h: 58, s: 100, l: 50, r: 255, g: 247, b: 0 },
  { name: 'yellow', h: 60, s: 100, l: 50, r: 255, g: 255, b: 0 },
  { name: 'daffodil', h: 60, s: 100, l: 60, r: 255, g: 255, b: 49 },
  { name: 'ivory', h: 60, s: 100, l: 97, r: 255, g: 255, b: 240 },
  { name: 'magenta', h: 300, s: 100, l: 50, r: 255, g: 0, b: 255 },
  { name: 'bright-pink', h: 330, s: 100, l: 50, r: 255, g: 0, b: 127 },
  { name: 'lavender-blush', h: 340, s: 100, l: 97, r: 255, g: 240, b: 245 },
  { name: 'pastel-pink', h: 346, s: 100, l: 91, r: 255, g: 209, b: 220 },
  { name: 'sakura', h: 348, s: 100, l: 86, r: 255, g: 183, b: 197 },
  { name: 'bubble-gum', h: 349, s: 100, l: 88, r: 255, g: 193, b: 204 },
  { name: 'pink', h: 350, s: 100, l: 88, r: 255, g: 192, b: 203 },
];

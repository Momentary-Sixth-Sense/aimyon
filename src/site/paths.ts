import { Photo } from '@/photo';
import { BASE_URL } from './config';
import {
  Camera,
  createCameraKey,
  getCameraFromKey,
} from '@/camera';
import { FilmSimulation } from '@/simulation';

// Core paths
export const PATH_ROOT      = '/';
export const PATH_GALLERY   = '/gallery';
export const PATH_GRID      = '/gallery/grid';
export const PATH_SETS      = '/gallery/sets';
export const PATH_ADMIN     = '/admin';
export const PATH_SIGN_IN   = '/sign-in';
export const PATH_OG        = '/og';
export const PATH_RECORD    = '/record';

// Path prefixes
export const PREFIX_PHOTO           = '/gallery/p';
export const PREFIX_TAG             = '/gallery/tag';
export const PREFIX_CAMERA          = '/gallery/shot-on';
export const PREFIX_FILM_SIMULATION = '/gallery/film';
export const PREFIX_RECORD          = '/record/r';
export const PREFIX_TRACK           = '/record/s';

// Dynamic paths
const PATH_PHOTO_DYNAMIC            = `${PREFIX_PHOTO}/[photoId]`;
const PATH_TAG_DYNAMIC              = `${PREFIX_TAG}/[tag]`;
const PATH_CAMERA_DYNAMIC           = `${PREFIX_CAMERA}/[camera]`;
const PATH_FILM_SIMULATION_DYNAMIC  = `${PREFIX_FILM_SIMULATION}/[simulation]`;
const PATH_RECORD_DYNAMIC           = `${PREFIX_RECORD}/[recordNo]`;

// Admin paths
export const PATH_ADMIN_PHOTOS        = `${PATH_ADMIN}/photos`;
export const PATH_ADMIN_UPLOADS       = `${PATH_ADMIN}/uploads`;
export const PATH_ADMIN_TAGS          = `${PATH_ADMIN}/tags`;
export const PATH_ADMIN_UPLOAD_BLOB   = `${PATH_ADMIN_UPLOADS}/blob`;
export const PATH_ADMIN_CONFIGURATION = `${PATH_ADMIN}/configuration`;

// Modifiers
const SHARE = 'share';
const NEXT  = 'next';
const EDIT  = 'edit';

export const PATHS_ADMIN = [
  PATH_ADMIN,
  PATH_ADMIN_PHOTOS,
  PATH_ADMIN_UPLOADS,
  PATH_ADMIN_TAGS,
  PATH_ADMIN_UPLOAD_BLOB,
  PATH_ADMIN_CONFIGURATION,
];

export const PATHS_TO_CACHE = [
  PATH_GALLERY,
  PATH_GRID,
  PATH_SETS,
  PATH_OG,
  PATH_PHOTO_DYNAMIC,
  PATH_TAG_DYNAMIC,
  PATH_CAMERA_DYNAMIC,
  PATH_FILM_SIMULATION_DYNAMIC,
  ...PATHS_ADMIN,
];

// Absolute paths
export const ABSOLUTE_PATH_FOR_HOME_IMAGE = `${BASE_URL}/home-image`;

const pathWithNext = (path: string, next?: number) =>
  next !== undefined ? `${path}?${NEXT}=${next}` : path;

export const pathForRoot = (next?: number) =>
  pathWithNext(PATH_GALLERY, next);

export const pathForGrid = (next?: number) =>
  pathWithNext(PATH_GRID, next);

export const pathForAdminPhotos = (next?: number) =>
  pathWithNext(PATH_ADMIN_PHOTOS, next);

export const pathForAdminUploadUrl = (url: string) =>
  `${PATH_ADMIN_UPLOADS}/${encodeURIComponent(url)}`;

export const pathForAdminPhotoEdit = (photo: PhotoOrPhotoId) =>
  `${PATH_ADMIN_PHOTOS}/${getPhotoId(photo)}/${EDIT}`;

export const pathForAdminTagEdit = (tag: string) =>
  `${PATH_ADMIN_TAGS}/${tag}/${EDIT}`;

export const pathForOg = (next?: number) =>
  pathWithNext(PATH_OG, next);

type PhotoOrPhotoId = Photo | string;

const getPhotoId = (photoOrPhotoId: PhotoOrPhotoId) =>
  typeof photoOrPhotoId === 'string' ? photoOrPhotoId : photoOrPhotoId.id;

export const pathForPhoto = (
  photo: PhotoOrPhotoId,
  tag?: string,
  camera?: Camera,
  simulation?: FilmSimulation,
) =>
  tag
    ? `${pathForTag(tag)}/${getPhotoId(photo)}`
    : camera
      ? `${pathForCamera(camera)}/${getPhotoId(photo)}`
      : simulation
        ? `${pathForFilmSimulation(simulation)}/${getPhotoId(photo)}`
        : `${PREFIX_PHOTO}/${getPhotoId(photo)}`;

export const pathForPhotoShare = (
  photo: PhotoOrPhotoId,
  tag?: string,
  camera?: Camera,
  simulation?: FilmSimulation,
) =>
  `${pathForPhoto(photo, tag, camera, simulation)}/${SHARE}`;

export const pathForTag = (tag: string, next?: number) =>
  pathWithNext(
    `${PREFIX_TAG}/${tag}`,
    next,
  );

export const pathForTagShare = (tag: string) =>
  `${pathForTag(tag)}/${SHARE}`;

export const pathForCamera = (camera: Camera, next?: number) =>
  pathWithNext(`${PREFIX_CAMERA}/${createCameraKey(camera)}`, next);

export const pathForCameraShare = (camera: Camera) =>
  `${pathForCamera(camera)}/${SHARE}`;

export const pathForFilmSimulation =
  (simulation: FilmSimulation, next?: number) =>
    pathWithNext(
      `${PREFIX_FILM_SIMULATION}/${simulation}`,
      next,
    );

export const pathForFilmSimulationShare = (simulation: FilmSimulation) =>
  `${pathForFilmSimulation(simulation)}/${SHARE}`;

export const absolutePathForPhoto = (
  photo: PhotoOrPhotoId,
  tag?: string,
  camera?: Camera,
  simulation?: FilmSimulation
) =>
  `${BASE_URL}${pathForPhoto(photo, tag, camera, simulation)}`;

export const absolutePathForTag = (tag: string) =>
  `${BASE_URL}${pathForTag(tag)}`;

export const absolutePathForCamera= (camera: Camera) =>
  `${BASE_URL}${pathForCamera(camera)}`;

export const absolutePathForFilmSimulation = (simulation: FilmSimulation) =>
  `${BASE_URL}${pathForFilmSimulation(simulation)}`;

export const absolutePathForPhotoImage = (photo: PhotoOrPhotoId) =>
  `${absolutePathForPhoto(photo)}/image`;

export const absolutePathForTagImage = (tag: string) =>
  `${absolutePathForTag(tag)}/image`;

export const absolutePathForCameraImage= (camera: Camera) =>
  `${absolutePathForCamera(camera)}/image`;

export const absolutePathForFilmSimulationImage =
  (simulation: FilmSimulation) =>
    `${absolutePathForFilmSimulation(simulation)}/image`;

// p/[photoId]
export const isPathPhoto = (pathname = '') =>
  new RegExp(`^${PREFIX_PHOTO}/[^/]+/?$`).test(pathname);

// p/[photoId]/share
export const isPathPhotoShare = (pathname = '') =>
  new RegExp(`^${PREFIX_PHOTO}/[^/]+/${SHARE}/?$`).test(pathname);

// tag/[tag]
export const isPathTag = (pathname = '') =>
  new RegExp(`^${PREFIX_TAG}/[^/]+/?$`).test(pathname);

// tag/[tag]/share
export const isPathTagShare = (pathname = '') =>
  new RegExp(`^${PREFIX_TAG}/[^/]+/${SHARE}/?$`).test(pathname);

// tag/[tag]/[photoId]
export const isPathTagPhoto = (pathname = '') =>
  new RegExp(`^${PREFIX_TAG}/[^/]+/[^/]+/?$`).test(pathname);

// tag/[tag]/[photoId]/share
export const isPathTagPhotoShare = (pathname = '') =>
  new RegExp(`^${PREFIX_TAG}/[^/]+/[^/]+/${SHARE}/?$`).test(pathname);

// shot-on/[camera]
export const isPathCamera = (pathname = '') =>
  new RegExp(`^${PREFIX_CAMERA}/[^/]+/?$`).test(pathname);

// shot-on/[camera]/share
export const isPathCameraShare = (pathname = '') =>
  new RegExp(`^${PREFIX_CAMERA}/[^/]+/${SHARE}/?$`).test(pathname);

// shot-on/[camera]/[photoId]
export const isPathCameraPhoto = (pathname = '') =>
  new RegExp(`^${PREFIX_CAMERA}/[^/]+/[^/]+/?$`).test(pathname);

// shot-on/[camera]/[photoId]/share
export const isPathCameraPhotoShare = (pathname = '') =>
  new RegExp(`^${PREFIX_CAMERA}/[^/]+/[^/]+/${SHARE}/?$`).test(pathname);

// film/[simulation]
export const isPathFilmSimulation = (pathname = '') =>
  new RegExp(`^${PREFIX_FILM_SIMULATION}/[^/]+/?$`).test(pathname);

// film/[simulation]/share
export const isPathFilmSimulationShare = (pathname = '') =>
  new RegExp(`^${PREFIX_FILM_SIMULATION}/[^/]+/${SHARE}/?$`).test(pathname);

// film/[simulation]/[photoId]
export const isPathFilmSimulationPhoto = (pathname = '') =>
  new RegExp(`^${PREFIX_FILM_SIMULATION}/[^/]+/[^/]+/?$`).test(pathname);

// film/[simulation]/[photoId]/share
export const isPathFilmSimulationPhotoShare = (pathname = '') =>
  new RegExp(`^${PREFIX_FILM_SIMULATION}/[^/]+/[^/]+/${SHARE}/?$`)
    .test(pathname);

export const checkPathPrefix = (pathname = '', prefix: string) =>
  pathname.toLowerCase().startsWith(prefix);

export const isPathGallery = (pathname?: string) =>
  checkPathPrefix(pathname, PATH_GALLERY);

export const isPathGrid = (pathname?: string) =>
  checkPathPrefix(pathname, PATH_GRID);

export const isPathSets = (pathname?: string) =>
  checkPathPrefix(pathname, PATH_SETS);

export const isPathRecord = (pathname?: string) =>
  checkPathPrefix(pathname, PATH_RECORD);

export const isPathSignIn = (pathname?: string) =>
  checkPathPrefix(pathname, PATH_SIGN_IN);

export const isPathAdmin = (pathname?: string) =>
  checkPathPrefix(pathname, PATH_ADMIN);

export const isPathAdminConfiguration = (pathname?: string) =>
  checkPathPrefix(pathname, PATH_ADMIN_CONFIGURATION);

export const isPathProtected = (pathname?: string) =>
  checkPathPrefix(pathname, PATH_ADMIN);

export const getPathComponents = (pathname = ''): {
  photoId?: string
  tag?: string
  camera?: Camera
  simulation?: FilmSimulation
} => {
  const photoIdFromPhoto = pathname.match(
    new RegExp(`^${PREFIX_PHOTO}/([^/]+)`))?.[1];
  const photoIdFromTag = pathname.match(
    new RegExp(`^${PREFIX_TAG}/[^/]+/((?!${SHARE})[^/]+)`))?.[1];
  const photoIdFromCamera = pathname.match(
    new RegExp(`^${PREFIX_CAMERA}/[^/]+/((?!${SHARE})[^/]+)`))?.[1];
  const photoIdFromFilmSimulation = pathname.match(
    new RegExp(`^${PREFIX_FILM_SIMULATION}/[^/]+/((?!${SHARE})[^/]+)`))?.[1];
  const tag = pathname.match(
    new RegExp(`^${PREFIX_TAG}/([^/]+)`))?.[1];
  const cameraString = pathname.match(
    new RegExp(`^${PREFIX_CAMERA}/([^/]+)`))?.[1];
  const simulation = pathname.match(
    new RegExp(`^${PREFIX_FILM_SIMULATION}/([^/]+)`))?.[1] as FilmSimulation;

  const camera = cameraString
    ? getCameraFromKey(cameraString)
    : undefined;

  return {
    photoId: (
      photoIdFromPhoto ||
      photoIdFromTag ||
      photoIdFromCamera ||
      photoIdFromFilmSimulation
    ),
    tag,
    camera,
    simulation,
  };
};

export const getEscapePath = (pathname?: string) => {
  const { photoId, tag, camera, simulation } = getPathComponents(pathname);
  if (
    (photoId && isPathPhoto(pathname)) ||
    (tag && isPathTag(pathname)) ||
    (camera && isPathCamera(pathname)) ||
    (simulation && isPathFilmSimulation(pathname))
  ) {
    return PATH_GRID;
  } else if (photoId && isPathTagPhotoShare(pathname)) {
    return pathForPhoto(photoId, tag);
  } else if (photoId && isPathCameraPhotoShare(pathname)) {
    return pathForPhoto(photoId, undefined, camera);
  } else if (photoId && isPathFilmSimulationPhotoShare(pathname)) {
    return pathForPhoto(photoId, undefined, undefined, simulation);
  } else if (photoId && isPathPhotoShare(pathname)) {
    return pathForPhoto(photoId);
  } else if (tag && (
    isPathTagPhoto(pathname) ||
    isPathTagShare(pathname)
  )) {
    return pathForTag(tag);
  } else if (camera && (
    isPathCameraPhoto(pathname) ||
    isPathCameraShare(pathname)
  )) {
    return pathForCamera(camera);
  } else if (simulation && (
    isPathFilmSimulationPhoto(pathname) ||
    isPathFilmSimulationShare(pathname)
  )) {
    return pathForFilmSimulation(simulation);
  }
};

// Record
export const absolutePathForRecord = (recordNo: number) => {
  return `${BASE_URL}${PREFIX_RECORD}/${recordNo}`;
};
export const pathForRecord = (recordTitle: string) => {
  return `${PREFIX_RECORD}/${recordTitle}`;
};

export const RECORD_MATCHER = {
  1: 'あのね',
  2: 'ノット・オーケー',
  3: '愛の花 初回限定盤',
  4: '愛の花 通常盤',
  5: '瞳へ落ちるよレコード 12inchアナログレコード［完全生産限定盤］',
  6: '瞳へ落ちるよレコード 初回限定盤',
  7: '瞳へ落ちるよレコード 通常盤',
  8: '初恋が泣いている',
  9: 'ハート',
};
export const RECORD_MATCHER_REVERSE =
  {} as Record<string, keyof typeof RECORD_MATCHER>;
Object.entries(RECORD_MATCHER).forEach(([key, value]) => {
  RECORD_MATCHER_REVERSE[value] = key as unknown as keyof typeof RECORD_MATCHER;
});
export const getRecordNoByTitle = (title: string) => {
  return RECORD_MATCHER_REVERSE[decodeURI(title)];
};
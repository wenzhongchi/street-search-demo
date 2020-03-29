import { screenWidth, screenHeight } from '../utils/screenUtils';

export const ASPECT_RATIO = screenWidth / screenHeight;
export const LATITUDE_DELTA = 0.0922;
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

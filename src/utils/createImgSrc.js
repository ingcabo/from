import { MEDIA_VIEW_BASEURL, MEDIA_VIEW_PRESET } from "./constants";

export function createImgSrc(name) {
  return `${MEDIA_VIEW_BASEURL}${name}?${MEDIA_VIEW_PRESET}`;
}

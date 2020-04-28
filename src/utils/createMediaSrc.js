import { getFileExt, createImgSrc } from "../utils";

import pdf from "./../assets/pdf.svg";
import video from "./../assets/video.png";
import tiff from "./../assets/tiff.svg";

export function createMediaSrc(original_name, name) {
  const ext = getFileExt(original_name);

  //hashes at the end can be used if needed to target the img element by type
  switch (ext) {
    case "pdf":
      return `${pdf}?type=pdf`;

    case "mp4":
      return `${video}?type=vid`;
    case "tiff":
    case "tif":
      return `${tiff}?type=tiff`;

    default:
      return `${createImgSrc(name)}#img`;
  }
}

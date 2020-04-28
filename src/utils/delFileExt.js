// remove file extention
export function delFileExt(name) {
  const parts = name.split(".");

  return parts[0];
}

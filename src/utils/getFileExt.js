// remove file extention
export function getFileExt(name = "") {
  const parts = name.split(".");

  return parts.pop().toLowerCase();
}

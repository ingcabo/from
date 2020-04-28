// takes fileList and returns object with their names in loading setState
export function getIntialFileState(files) {
  const state = {},
    numberOfFiles = files.length;
  for (let x = 0; x < numberOfFiles; x++) {
    const file = files[x],
      { name } = file;
    state[name] = "loading";
  }
  return state;
}

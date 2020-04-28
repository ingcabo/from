// these are utils used to create the uplaod path

// state is searchkit state
//newPath is the "Crear carpeta" input state

//get new path sections
function newPathlevels(newPath) {
  return newPath.split("/").filter(part => part.length > 0);
}

//parse searchkit folder state into a path strin
function getPathFromState(state = []) {
  let path = "";
  const length = state.length;
  if (length > 0) {
    state.forEach((folder, i) => {
      if (i < length - 1) {
        path += (folder[0] || "") + "/";
      }
    });
  }
  return path;
}

// get last folder in state
function getCurrentFolderFromState(state = []) {
  const length = state.length;
  return length > 0 ? state[length - 1][0] || "" : "";
}

function createUploadPath(state = [], newPath) {
  let computedpath = {};

  const folderLevel = state.length,
    statePath = getPathFromState(state),
    newPathSections = newPathlevels(newPath),
    newPathlSectionsNumber = newPathSections.length,
    newFullPath = newPathSections.join("/"),
    stateCurrentFolder = getCurrentFolderFromState(state),
    totalLevels = folderLevel + newPathlSectionsNumber;

  if (totalLevels > 3 && newPathlSectionsNumber !== 1) {
    // if total levels are more than 3 then use newPath only
    const currentFolder = newPathSections[newPathlSectionsNumber - 1];

    computedpath = {
      currentFolder,
      fullPath: newFullPath
    };
  } else {
    // if total levels are lesr than 3 then  make new path from state and newPath
    const currentFolder = newPath
        ? newPathSections[newPathlSectionsNumber - 1]
        : stateCurrentFolder,
      fullPath = `${statePath}${
        folderLevel === 3
          ? newPath || stateCurrentFolder
          : `${stateCurrentFolder}${stateCurrentFolder && newPath ? "/" : ""}${
              newPath ? `${newFullPath}` : ""
            }`
      }`; //replace folder name if last level else add new folder to current path

    computedpath = {
      currentFolder,
      fullPath
    };
  }

  return computedpath;
}

export {
  createUploadPath,
  newPathlevels,
  getPathFromState,
  getCurrentFolderFromState
};

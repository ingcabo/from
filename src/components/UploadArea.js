import React from "react";
import axios from "axios";
import {
  createUploadPath,
  getIntialFileState,
  handleInputChange,
  NEW_FOLDER_REGEX,
  newPathlevels,
  UPLOAD_URL,
  checkFileName
} from "../utils";
import icon from "../assets/upload.svg";
import { HierarchicalMenuFilter } from "searchkit";

import CustomSearchKitComponent from "./CustomSearchKitComponent";
import Loading from "./Loading";
import Modal from "./Modal";
import UploadStatus from "./UploadStatus";

// create axios instance for s3 upload without app Authorization.
const uploadInstance = axios.create({});

uploadInstance.interceptors.request.use(config => {
  delete config.headers.Authorization;
  return config;
});

class UploadArea extends CustomSearchKitComponent {
  constructor(props) {
    super(props);
    this.el = React.createRef();
  }
  state = {
    filesProgress: {}
  };

  cancelUpload = () => {
    this.toggleModal();
    this.el.current.value = "";
    this.setState({
      filesProgress: {},
      files: undefined
    });
  };

  //create folder form
  createFolder = e => {
    e.preventDefault();
    const { newFolderPath } = this.state,
      validPath =
        NEW_FOLDER_REGEX.test(newFolderPath) &&
        newPathlevels(newFolderPath).length < 4; // can only be three levels deep

    if (validPath) {
      this.setState({
        newFolder: newFolderPath,
        createFolderError: false,
        newFolderPath: ""
      });
    } else {
      this.setState({ createFolderError: true });
    }
  };

  // hanlde new path input change
  handleChange = handleInputChange.bind(this);

  // user enter area while dragging
  onDragEnter = e => {
    this.setState({
      entered: true
    });
  };

  //when clicking a folder remove new folder then call elastic
  onClickFolder = callback => {
    this.setState(
      {
        newFolder: undefined
      },
      () => {
        callback();
      }
    );
  };

  // user exits area
  onDragLeave = e => {
    this.setState({
      entered: false
    });
  };

  // toggle files names modal
  toggleModal = () => {
    this.setState(prev => ({ showFilesModal: !prev.showFilesModal }));
  };

  //upload files on change of input
  uploadAll = e => {
    e.preventDefault();

    const input = e.target,
      files = input.files,
      numberOfFiles = files.length;

    if (numberOfFiles > 0) {
      this.setState(
        {
          errors: undefined,
          filesProgress: getIntialFileState(files),
          files
        },
        () => {
          this.toggleModal();
        }
      );
    }
  };

  //user confirms upload from modal
  startUplaod = async () => {
    this.toggleModal();
    const { files } = this.state,
      numberOfFiles = files.length;
    this.setState(
      {
        uploading: true
      },
      async () => {
        for (let x = 0; x < numberOfFiles; x++) {
          const file = files[x];
          await this.uploadFile(file);
        }
        this.setState({
          uploading: false
        });
      }
    );
  };

  //upload single file
  uploadFile = file => {
    const { name, type, size } = file,
      validFileName = checkFileName(name);

    // updates files upload error state array
    const updateErrorStateArray = function updateErrorStateArray(error) {
      this.setState(prev => {
        const { errors = [], filesProgress } = prev,
          newFilesProgress = { ...filesProgress };
        delete newFilesProgress[name];
        return {
          filesProgress: newFilesProgress,
          errors: [...errors, { name, error }]
        };
      });
    }.bind(this);

    if (validFileName) {
      // upload file if name doesn't contain dots
      //get the signedURL First then upload file
      return axios
        .post(
          `${UPLOAD_URL}`,
          JSON.stringify({
            key: name,
            type: type,
            size: size,
            path: this.path
          }),
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(
          resp => {
            var url = "";
            try {
              url = resp.data.body.signedURL;
            } catch (e) {
              url = JSON.parse(resp.data.body).signedURL;
            }

            //upload file and update its progress
            return uploadInstance
              .put(url, file, {
                headers: {
                  "content-type": file.type,
                  "x-amz-acl": "public-read"
                }
              })
              .then(resp => {
                this.setState(prev => ({
                  filesProgress: {
                    ...prev.filesProgress,
                    [name]: "done"
                  }
                }));
              })
              .catch(err => {
                this.setState(prev => ({
                  filesProgress: {
                    ...prev.filesProgress,
                    [name]: "error"
                  }
                }));
              });
          },
          err => {
            // server error getting signed url
            updateErrorStateArray(err.response.data.body);
          }
        );
    } else {
      // throw error because file name contains dots
      updateErrorStateArray(
        "los nombres no pueden contener más de dos '.' o '-' caracteres"
      );
    }
  };

  //enable editing of new path
  resetNewPath = () => {
    this.setState({
      newFolder: "",
      newFolderPath: this.state.newFolder
    });
  };

  // disply progress of files uploads
  showProgress = () => {
    const { filesProgress = {} } = this.state,
      filesNames = Object.keys(filesProgress);

    const progress = filesNames.map(name => {
      const status = filesProgress[name];
      return (
        <li className="file-progress list-group-item" key={`progress-${name}`}>
          <p className="file-progress__name">{name}</p>{" "}
          <UploadStatus status={status} />
        </li>
      );
    });
    return progress.length > 0 ? (
      <div className="progress-section card">
        <div className="card-body">
          <h4>Cargar</h4>
          <ul className="list-group list-group-flush">{progress}</ul>
        </div>
      </div>
    ) : null;
  };

  render() {
    const {
        entered,
        errors,
        filesProgress,
        createFolderError,
        newFolder = "",
        newFolderPath = "",
        showFilesModal,
        uploading
      } = this.state,
      filesNames = Object.keys(filesProgress),
      searchkit = this.context.searchkit,
      folderState = searchkit.state.folder || [],
      updatingFolders = searchkit.loading,
      uploadPath = createUploadPath(folderState, newFolder);

    this.path = uploadPath.fullPath;
    const selectedFolder = this.path.length > 0;

    return (
      <div className="flex-container flex-start">
        <div className="card upload-area__folders">
          {updatingFolders && <Loading className="updating-folders" />}
          <div className="card-body">
            <HierarchicalMenuFilter
              fields={["lvl1", "lvl2", "lvl3"]}
              title="1.- Seleccionar carpeta"
              id="folder"
              mod="upload-area__folders-select"
              itemComponent={({ label, onClick }) => (
                <button
                  className={`upload-area__folders-option ${
                    label === uploadPath.currentFolder ? "here" : ""
                  }`}
                  onClick={() => this.onClickFolder(onClick)}
                >
                  {label}
                </button>
              )}
            />
            {selectedFolder && (
              <div className="flex-container space-between align-center upload-area__path">
                <p className="">
                  Carpeta destino: <span>{this.path}</span>
                </p>
                {newFolder && (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={this.resetNewPath}
                  >
                    Reiniciar
                  </button>
                )}
              </div>
            )}
            <p className="or">O crear carpetas (usar formato:  nivel1/nivel2/nivel3 para varios niveles)</p>
            <form
              className="flex-container add-folder-form"
              onSubmit={this.createFolder}
            >
              <input
                type="text"
                name="newFolderPath"
                className="form-control"
                placeholder="Crear carpeta"
                onChange={this.handleChange}
                value={newFolderPath}
              />
              <button className="btn btn-primary" type="submit">
                Crear
              </button>
            </form>
            {createFolderError && (
              <p className="text-danger mt-2">
                Solo se aceptan letras y numeros, además solo puede tener hasta 3 niveles.
              </p>
            )}
          </div>
        </div>
        <div>
          <div
            className={`card upload-area ${
              entered && !uploading ? "over" : ""
            }`}
          >
            <div className="card-body">
              <input
                className="upload-area__input"
                disabled={uploading || !selectedFolder}
                multiple
                onChange={this.uploadAll}
                onDragEnter={this.onDragEnter}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDragLeave}
                ref={this.el}
                title={
                  uploading
                    ? "uploading"
                    : !selectedFolder
                    ? "Primero seleccione una carpeta"
                    : ""
                }
                type="file"
              />
              <div className="upload-area__title">

                <p> 2.- Arrastar medios acá ó seleccionar desde el computador</p>
                  {!selectedFolder && <p>(Primero debe seleccionar carpeta donde subir medios)</p>}
                {uploading ? (
                  <Loading className="upload-area__icon" />
                ) : (
                  <img
                    src={icon}
                    alt="upload icon"
                    className="upload-area__icon"
                  />
                )}
              </div>
            </div>
          </div>
          {!showFilesModal && this.showProgress()}
          {errors && (
            <div className="errors-list card">
              <ul className="card-body">
                {errors.map((errorObj, i) => {
                  const { name, error } = errorObj;
                  return (
                    <li
                      className="errors-list__item"
                      key={`error-${name}-${i}`}
                    >
                      <strong>{name}</strong>: {error}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
        {showFilesModal && (
          <Modal
            title="Subiré estos artículos"
            confirm={this.startUplaod}
            cancel={this.cancelUpload}
          >
            <ul className="list-group list-group-flush">
              {filesNames.map(name => (
                <li className="list-group-item" key={"modal-item" + name}>
                  {name}
                </li>
              ))}
            </ul>
          </Modal>
        )}
      </div>
    );
  }
}

export default UploadArea;

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { SearchkitComponent } from "searchkit";

import tiff from "./../../assets/tiff.svg";
import {
  parseDate,
  getFileExt,
  createImgSrc,
  MEDIA_VIEW_BASEURL,
  deleteMediaCall,
  createMediaSrc
} from "../../utils";

import Loading from "../Loading";
import Modal from "../Modal";

class DisplayMediaDetails extends SearchkitComponent {
  state = { openModal: false };

  //toggle the delete modal
  toggleModal = () => {
    this.setState(prev => ({ openModal: !prev.openModal }));
  };

  // confirm item delete action
  deleteItem = () => {
    const { hit, selcetitem } = this.props;
    this.setState({ loading: true }, () => {
      deleteMediaCall(hit.original_name).then(() => {
        this.searchkit.reloadSearch();
        selcetitem(hit);
      });
    });
  };

  viewItem = () => {
    const { name, original_name } = this.props.hit,
      ext = getFileExt(original_name),
      src = `${MEDIA_VIEW_BASEURL}${original_name}`,
      imgSrc = createImgSrc(name);

    switch (ext) {
      case "pdf":
        return (
          <object
            data={src}
            type="application/pdf"
            width="100%"
            className="display-item-details__view"
          >
            <p>
              This browser does not support PDF viewing
              <a href={src}>to the PDF!</a>
            </p>
          </object>
        );

      case "mp4":
        return (
          <video src={src} className="display-item-details__view" controls />
        );
      case "tiff":
      case "tif":
        return (
          <img
            src={tiff}
            alt="tiff file"
            className="display-item-details__view"
          />
        );

      default:
        return (
          <img src={imgSrc} alt="" className="display-item-details__view" />
        );
    }
  };

  render() {
    const {
        created_by,
        fecha_carga,
        height,
        name,
        original_name,
        path,
        preset_names = [],
        type,
        width
      } = this.props.hit,
      { openModal, loading } = this.state;

    return (
      <Fragment>
        <div className="card display-item-details action-view-section">
          <div className="card-body">
            <h4 className="display-item-details__header">{name}</h4>
            {this.viewItem()}
            <div className="display-item-details__properties">
              <p className="display-item-details__property">
                Creado por: <span>{created_by}</span>
              </p>
              <p className="display-item-details__property">
                Fecha carga: <span>{parseDate(fecha_carga, true)}</span>
              </p>
              <p className="display-item-details__property">
                Original name: <span>{original_name}</span>
              </p>
              {preset_names.length > 0 && (
                <p className="display-item-details__property">
                  Preset names:{" "}
                  {preset_names.map((name, i) => (
                    <span key={`preset-${name}`}>
                      {i > 0 ? ", " : ""}
                      {name}
                    </span>
                  ))}
                </p>
              )}
              <p className="display-item-details__property">
                Path: <span>{path}</span>
              </p>
              {type && (
                <p className="display-item-details__property">
                  Tipo: <span>{type}</span>
                </p>
              )}
              {width && (
                <p className="display-item-details__property">
                  Width: <span>{width}</span>
                </p>
              )}
              {height && (
                <p className="display-item-details__property">
                  Height: <span>{height}</span>
                </p>
              )}
            </div>
            <button className="btn btn-primary mt-3" onClick={this.toggleModal}>
              Borrar
            </button>
          </div>
        </div>
        {openModal && (
          <Modal
            title="Eliminar medios"
            confirm={this.deleteItem}
            cancel={this.toggleModal}
            loading={loading}
          >
            <div className="delete-modal flex-container flex-column align-center justify-center">
              <img
                src={createMediaSrc(original_name, name)}
                alt={name}
                className="delete-modal__img mb-2"
              />
              <h4 className="mb-2">{original_name}</h4>
              {loading && <Loading />}
            </div>
          </Modal>
        )}
      </Fragment>
    );
  }
}

export default DisplayMediaDetails;

DisplayMediaDetails.propTypes = {
  hit: PropTypes.object
};

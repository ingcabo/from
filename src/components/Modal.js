import React, { Fragment } from "react";
import PropTypes from "prop-types";

function Modal({ title, children, confirm, cancel, loading }) {
  return (
    <Fragment>
      <div className="modal-backdrop fade show" />
      <div className="modal" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={cancel}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={loading}
                className="btn btn-primary"
                onClick={confirm}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Modal;
Modal.propTypes = {
  cancel: PropTypes.func,
  confirm: PropTypes.func,
  loading: PropTypes.bool,
  title: PropTypes.string
};

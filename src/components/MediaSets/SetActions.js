import React from "react";
import PropTypes from "prop-types";

import Loading from "../Loading";

function SetActions({
  createSetError,
  inputChange,
  loading,
  saveSet,
  setName = ""
}) {
  return (
    <div className="set-actions mt-3">
      <input
        name="setName"
        type="text"
        className="new-set-name form-control "
        placeholder="Nombre"
        value={setName}
        onChange={inputChange}
      />

      <div className="flex-container space-between align-center mt-3">
        <button className="btn btn-primary create-set" onClick={saveSet}>
          Guardar
        </button>
        {loading && <Loading className="spinner-border-sm" />}
      </div>
      {createSetError && <p className="text-danger mt-3">{createSetError}</p>}
    </div>
  );
}

export default SetActions;

SetActions.propTypes = {
  createSetError: PropTypes.bool,
  inputChange: PropTypes.func,
  loading: PropTypes.bool,
  setName: PropTypes.string,
  saveSet: PropTypes.func
};

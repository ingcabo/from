import React from "react";
import PropTypes from "prop-types";

function SelectMode({ mode, resetSelectedSet, inputChange }) {
  return (
    <div className="flex-container mt-3 align-center toggle-mode">
      <label className="mr-3">
        <input
          type="radio"
          checked={mode === "create"}
          value="create"
          name="mode"
          onChange={e => {
            inputChange(e, resetSelectedSet);
          }}
        />
        crear
      </label>
      <label className="mr-3">
        <input
          type="radio"
          checked={mode === "update"}
          value="update"
          name="mode"
          onChange={inputChange}
        />
        actualizar
      </label>
    </div>
  );
}

export default SelectMode;

SelectMode.propTypes = {
  inputChange: PropTypes.func,
  mode: PropTypes.string,
  resetSelectedSet: PropTypes.func
};

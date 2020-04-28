import React from "react";
import PropTypes from "prop-types";

function ResetElasticFilters({ resetFilters }) {
  return (
    <button className="btn btn-primary btn-sm mt-4" onClick={resetFilters}>
      Reiniciar
    </button>
  );
}

export default ResetElasticFilters;

ResetElasticFilters.propTypes = {
  resetFilters: PropTypes.func
};

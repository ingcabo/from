import React from "react";
import PropTypes from "prop-types";
function Loading({ className }) {
  return (
    <div
      className={`spinner-border ${className ? className : ""}`}
      role="status"
    />
  );
}
export default Loading;

Loading.propTypes = {
  status: PropTypes.string
};

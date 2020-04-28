import React from "react";
import PropTypes from "prop-types";
import { createMediaSrc } from "../../utils";

function HitImage({ className, name, original_name }) {
  return (
    <img
      className={className}
      src={createMediaSrc(original_name, name)}
      alt={name}
    />
  );
}

export default HitImage;

HitImage.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  original_name: PropTypes.string
};

import React from "react";
import PropTypes from "prop-types";
import Loading from "./Loading";

import done from "../assets/checked.svg";
import failed from "../assets/cancel.svg";

function UploadStatus({ status }) {
  return status === "loading" ? (
    <Loading />
  ) : status === "done" ? (
    <img src={done} alt="upload successful" className="file-progress__icon" />
  ) : (
    <img src={failed} alt="upload failed" className="file-progress__icon" />
  );
}

export default UploadStatus;

UploadStatus.propTypes = {
  status: PropTypes.string
};

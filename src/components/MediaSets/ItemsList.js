import React, { Fragment } from "react";
import PropTypes from "prop-types";
import HitImage from "../Browse/HitImage";

function ItemsList({ list=[], toggleItem, justViewing }) {
  return (
    <Fragment>
      {list.map(hit => {
        const { original_name, name } = hit;
        return (
          <div
            className={`selected-item ${justViewing ? "just-viewing" : ""}`}
            key={`selcted-${name}`}
            data-id={name}
          >
            <HitImage
              name={name}
              original_name={original_name}
              className="selected-item__img"
            />
            <p className="selected-item__name">{name}</p>
            {!justViewing && (
              <button
                className="selected-item__remove close"
                onClick={() => toggleItem(hit, false)}
              />
            )}
          </div>
        );
      })}
    </Fragment>
  );
}

export default ItemsList;

ItemsList.propTypes = {
  justViewing: PropTypes.bool,
  list: PropTypes.array,
  toggleItem: PropTypes.func
};

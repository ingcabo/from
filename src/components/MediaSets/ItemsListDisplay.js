import React, { Fragment } from "react";
import PropTypes from "prop-types";
import ReactSortable from "react-sortablejs";

import ItemsList from "./ItemsList"; // had to rename to avoid name conflict with itemsList

function ItemsListDisplay({ itemsList, toggleItem, sort }) {
  return (
    <Fragment>
      {itemsList.length > 0 && (
        <ReactSortable
          options={{
            animation: 150,
            draggable: ".selected-item"
          }}
          className="selected-items"
          onChange={names => {
            sort(names);
          }}
        >
          {<ItemsList list={itemsList} toggleItem={toggleItem} />}
        </ReactSortable>
      )}
    </Fragment>
  );
}

export default ItemsListDisplay;

ItemsListDisplay.propTypes = {
  ItemsList: PropTypes.array,
  toggleItem: PropTypes.func,
  sort: PropTypes.func
};

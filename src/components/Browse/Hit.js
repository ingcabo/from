import React from "react";

import HitImage from "./HitImage";
function Hit({ checked, hit, toggleItemSelect, id }) {
  const { name, original_name } = hit;
  const toggleItem = () => {
    toggleItemSelect(hit, !checked, id);
  };

  return (
    <div className="search-results__hit">
      <div className="search-results__hit__img-wrapper" onClick={toggleItem}>
        <HitImage
          name={name}
          original_name={original_name}
          className="search-results__hit__img"
        />
      </div>
      <h2 className="search-results__hit__name">{name}</h2>
      <input
        type="checkbox"
        checked={checked}
        className="search-results__hit__select"
        onChange={toggleItem}
      />
    </div>
  );
}

export default Hit;

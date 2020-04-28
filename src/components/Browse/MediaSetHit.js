import React from "react";

import HitImage from "./HitImage";

function MediaSetHit({ checked, hit, toggleItemSelect }) {
  const { name, items = [] } = hit,
    toggleItem = () => {
      toggleItemSelect(hit, !checked);
    };

  return (
    <div className="search-results__hit set-hit">
      <div className="search-results__hit__set-images" onClick={toggleItem}>
        {items.map((item, index) => {
          if (index < 4) {
            const { name, original_name, seq } = item;
            return (
              <div
                className="search-results__hit__img-wrapper"
                key={`${hit.name}-${name}-${seq}`}>
                <HitImage
                  name={name}
                  original_name={original_name}
                  className="search-results__hit__img"
                />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="search-results__hit-meta">
        <h2 className="search-results__hit__name">{name}</h2>
        <p className="search-results__hit__items-count">
          <strong>{items.length}</strong> items.
        </p>
      </div>
      <input
        type="checkbox"
        checked={checked}
        className="search-results__hit__select"
        onChange={toggleItem}
      />
    </div>
  );
}

export default MediaSetHit;

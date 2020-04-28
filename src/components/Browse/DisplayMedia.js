import React from "react";
import PropTypes from "prop-types";
import { Hits, Pagination } from "searchkit";

import Hit from "./Hit";
import MediaSetHit from "./MediaSetHit";

function DisplayMedia({ check, onClick, type }) {
  const viewingSets = type === "sets",
    HitComponent = viewingSets ? MediaSetHit : Hit;
  return (
    <div
      className={`card search-results__hits-card ${
        viewingSets ? "viewing-sets" : ""
      }`}
    >
      <div className="card-body">
        <Hits
          hitsPerPage={15}
          mod="search-results__hits"
          itemComponent={props => {
            const hit = props.result._source,
              id = props.result._id;
            return (
              <HitComponent
                hit={hit}
                toggleItemSelect={onClick}
                checked={check(hit)}
                id={id}
              />
            );
          }}
        />
        <Pagination showNumbers={true} mod="pagination" pageScope={1} />
      </div>
    </div>
  );
}

export default DisplayMedia;

DisplayMedia.propTypes = {
  check: PropTypes.func,
  onClick: PropTypes.func
};

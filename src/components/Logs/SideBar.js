import React from "react";
import { RefinementListFilter } from "searchkit";
function SideBar() {
  return (
    <div className="card search-results__sidebar">
      <div className="card-body">
        <div className="search-results__sidebar-filter">
          <RefinementListFilter
            id="created_by"
            title="Creado por"
            mode="check-filter"
            field="created_by.keyword"
            size={10}
          />
        </div>
        <div className="search-results__sidebar-filter">
          <RefinementListFilter
            id="action"
            title="Acción"
            mode="check-filter"
            field="action.keyword"
            size={10}
          />
        </div>
        <div className="search-results__sidebar-filter">
          <RefinementListFilter
            id="object_type"
            title="Tipo"
            mode="check-filter"
            field="object_type.keyword"
            size={10}
          />
        </div>
      </div>
    </div>
  );
}

export default SideBar;

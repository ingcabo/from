import React from "react";
import PropTypes from "prop-types";
import {
  RefinementListFilter,
  HierarchicalMenuFilter,
  ResetFilters,
  DynamicRangeFilter
} from "searchkit";

import { parseDate } from "./../../utils";

import ResetElasticFilters from "../ResetElasticFilters";

function SideBar({ currentFolder }) {
  return (
    <div className="card search-results__sidebar">
      <div className="card-body">
        <div className="search-results__sidebar-filter">
          <HierarchicalMenuFilter
            fields={["lvl1", "lvl2", "lvl3"]}
            title="Carpetas"
            id="folder"
            mod="upload-area__folders-select"
            itemComponent={({ label, onClick, count }) => (
              <button
                className={`upload-area__folders-option  flex-container align-center space-between ${
                  label === currentFolder ? "here" : ""
                }`}
                onClick={onClick}
              >
                <span className="upload-area__folders-option__name">
                  {label}
                </span>
                <span className="upload-area__folders-option__count">
                  ({count})
                </span>
              </button>
            )}
          />
          {currentFolder && (
            <ResetFilters
              options={{ query: false, filter: true, pagination: true }}
              component={ResetElasticFilters}
            />
          )}
        </div>
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
            id="type"
            title="Tipo"
            mode="check-filter"
            field="type.keyword"
            size={10}
          />
        </div>
        <div className="search-results__sidebar-filter">
          <DynamicRangeFilter
            id="upload-range"
            title="Fecha carga"
            mode="range-filter"
            field="fecha_carga"
            rangeFormatter={parseDate}
          />
        </div>
      </div>
    </div>
  );
}

export default SideBar;

SideBar.propTypes = {
  currentFolder: PropTypes.string
};

import React from "react";
import PropTypes from "prop-types";
import { SearchBox, SearchkitComponent, ResetFilters } from "searchkit";

function ResetSearchQuery({ resetFilters }) {
  return <button className="main-search__clear" onClick={resetFilters} />;
}

class MainSearch extends SearchkitComponent {
  render() {
    const { placeholder, fields } = this.props,
      query = this.searchkit.state.q,
      hasQuery = query && query.length > 0;
    return (
      <div className="card main-search-card">
        <div className="card-body">
          {hasQuery && (
            <ResetFilters
              options={{ query: true, filter: true, pagination: true }}
              component={ResetSearchQuery}
            />
          )}
          <SearchBox
            placeholder={placeholder || "Buscar Medios"}
            mod="main-search"
            searchOnChange={true}
            translations={{ "searchbox.placeholder": "Buscar" }}
            queryFields={fields || ["name","a_items"]}
          />
        </div>
      </div>
    );
  }
}

export default MainSearch;

MainSearch.propTypes = {
  placeholder: PropTypes.string,
  fields: PropTypes.array
};

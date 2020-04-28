import React from "react";
import { SearchkitComponent, Hits, Pagination } from "searchkit";

import SideBar from "../components/Logs/SideBar";
import HitsTable from "../components/Logs/HitsTable";
import MainSearch from "../components/MainSearch";
class Logs extends SearchkitComponent {
  render() {
    const hits = this.searchkit.results ? this.searchkit.results.hits.hits : [];
    return (
      <div className="flex-container flex-start route search-results logs">
        <SideBar />
        <div className="flex-grow-1">
          <MainSearch
            placeholder="Registros de búsqueda"
            fields={[
              "created_by.keyword",
              "fecha.keyword",
              "action.keyword",
              "object.keyword",
              "object_type.keyword"
            ]}
          />
          {hits.length > 0 && (
            <div className="card mt-3">
              <div className="card-body">
                <Hits hitsPerPage={30} listComponent={HitsTable} />
                <Pagination showNumbers={true} mod="pagination" pageScope={1} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Logs;

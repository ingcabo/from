import React from "react";
import { SortingSelector } from "searchkit";

function Sort() {
  return (
    <div className="card sort-card">
      <div className="card-body flex-container align-center">
        <span>Ordenar por:</span>
        <SortingSelector
          mod="sort"
          options={[
            {
              label: "Nombre",
              field: "name.keyword",
              order: "asc",
              key: "name"
            },
            {
              label: "Fecha",
              field: "fecha_carga",
              order: "DESC",
              defaultOption: true,
              key: "earliest"
            }
          ]}
        />
      </div>
    </div>
  );
}

export default Sort;

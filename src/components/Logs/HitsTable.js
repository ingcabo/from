import React from "react";
import { parseDate } from "../../utils";

function HitsTable({ hits }) {
  return (
    <table className="table table-striped table-hover">
      <thead className="text-left thead-dark ">
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Creado por</th>
          <th scope="col">Fecha carga</th>
          <th scope="col">Acción</th>
          <th scope="col">Tipo</th>
        </tr>
      </thead>
      <tbody>
        {hits.map(hit => {
          const {
            fecha,
            created_by,
            action,
            object,
            object_type
          } = hit._source;
          return (
            <tr key={hit._id}>
              <td>{object}</td>
              <td>{created_by}</td>
              <td>{parseDate(fecha)}</td>
              <td>{action}</td>
              <td>{object_type}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default HitsTable;

import React, { Component } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

class ExportToExcel extends Component {
  render() {
    return (
      <div style={{ marginRight: "25px" }}>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="export"
          table="table-to-xls"
          filename="Productos"
          sheet="tablexls"
          buttonText="Exportar"
        />
        <table hidden={true} id="table-to-xls">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Cantidad</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {this.props.TableData.map((post, i) => {
              return (
                <tr key={i}>
                  <td>{post.nombre}</td>
                  <td>{post.descripcion}</td>
                  <td>{post.categoria.nombre}</td>
                  <td>{post.cantidad}</td>
                  <td>{post.precio}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default ExportToExcel;

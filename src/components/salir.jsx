import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axiosConfig from "../axios";
import Swal from "sweetalert2";

class Salir extends Component {
  constructor() {
    super();
  }

  render() {
    axiosConfig.get("/cerrarSesion").then(respuesta => {
      if (respuesta.status === 200) {
        Swal.fire("Control de acceso", respuesta.data.mensaje, "success");
        localStorage.setItem("autorizado", false);
        localStorage.removeItem("usuarioNombre");
        localStorage.removeItem("usuarioCorreo");
        localStorage.removeItem("products");
      } else {
        Swal.fire("Error", respuesta.data.mensaje, "warning");
        // return <Redirect to={"/iniciarSesion"} />;
      }
    });

    return <Redirect to={"/iniciarSesion"} />;
  }
}
export default Salir;

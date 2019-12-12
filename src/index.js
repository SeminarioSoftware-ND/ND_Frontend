/*!

=========================================================
* Argon Design System React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss";

import Index from "views/indexCliente";
import Landing from "views/examples/Landing.jsx";
// import Login from "views/examples/Login.jsx";
import Profile from "views/examples/Profile.jsx";
// import Register from "views/examples/Register.jsx";

// Imports propios
import CrearCuenta from "views/crearCuenta.jsx";
import IniciarSesion from "views/iniciarSesion.jsx";
import IndexDash from "views/indexDash.jsx";
import DashCategorias from "views/DashCategorias.jsx";
import DashProductos from "views/DashProductos2.jsx";
import UsuarioPerfil from "views/perfilUsuario.jsx";
import Productos from "views/productos.jsx";
import Carrito from "views/carrito.jsx";
import Contacto from "views/contacto.jsx";
import Acerca from "views/acerca.jsx";
import Orden from "views/orden.jsx";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* <Route path="/" exact render={props => <Index {...props} />} /> */}
      <Route
        path="/landing-page"
        exact
        render={props => <Landing {...props} />}
      />

      <Route
        path="/profile-page"
        exact
        render={props => <Profile {...props} />}
      />
      {/* RUTAS CREADAS */}
      {/* TIENDA */}
      <Route path="/" exact render={props => <Index {...props} />} />

      <Route
        path="/producto/:url"
        exact
        render={props => <Productos {...props} />}
      />

      <Route path="/ordenCompra" exact render={props => <Orden {...props} />} />

      {/* /TIENDA */}
      <Route path="/carrito" exact render={props => <Carrito {...props} />} />
      <Route path="/contacto" exact render={props => <Contacto {...props} />} />
      <Route path="/acercade" exact render={props => <Acerca {...props} />} />

      {/* DASHBOARD / ADMIN */}
      <Route path="/admin" exact render={props => <IndexDash {...props} />} />

      <Route
        path="/admin/categorias"
        exact
        render={props => <DashCategorias {...props} />}
      />

      <Route
        path="/admin/productos"
        exact
        render={props => <DashProductos {...props} />}
      />

      <Route
        path="/iniciarSesion"
        exact
        render={props => <IniciarSesion {...props} />}
      />

      <Route
        path="/crearCuenta"
        exact
        render={props => <CrearCuenta {...props} />}
      />

      <Route
        path="/usuarioPerfil"
        exact
        render={props => <UsuarioPerfil {...props} />}
      />

      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

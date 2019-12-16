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
import { Link } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Button
} from "reactstrap";

class DashNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombreUsuario: ""
    };
    this.acceso = this.acceso.bind(this);
  }
  // Método para cargar los componentes al renderizar la página
  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();

    // Cargamos el nombre del usuario actual
    this.setState({
      nombreUsuario: localStorage.getItem("usuarioNombre")
    });
  }

  // Método para verificar acceso
  acceso() {
    if (this.state.nombreUsuario) {
      window.location = "/salir";
    } else {
      window.location = "/iniciarSesion";
    }
  }
  render() {
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                <img alt="..." src={require("assets/img/descarga.png")} />
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse navbar toggler="#navbar_global">
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link to="/">
                        <img
                          alt="..."
                          src={require("assets/img/brand/argon-react.png")}
                        />
                      </Link>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                  {/* Inicio */}
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav to="/admin" tag={Link}>
                      <i className="ni ni-shop d-lg-none mr-1" />
                      <span className="nav-link-inner--text">Inicio</span>
                    </DropdownToggle>
                  </UncontrolledDropdown>
                  {/* /Inicio */}

                  {/* Categorías */}
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav to="/admin/categorias" tag={Link}>
                      <i className="ni ni-tag d-lg-none mr-1" />
                      <span className="nav-link-inner--text">Categorías</span>
                    </DropdownToggle>
                  </UncontrolledDropdown>
                  {/* /Categorías */}

                  {/* Productos */}
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav to="/admin/productos" tag={Link}>
                      <i className="ni ni-bag-17 d-lg-none mr-1" />
                      <span className="nav-link-inner--text">Productos</span>
                    </DropdownToggle>
                  </UncontrolledDropdown>
                  {/* /Productos */}
                </Nav>

                <Nav
                  className="navbar-nav-hover align-items-lg-right ml-lg-auto"
                  navbar
                >
                  {/* Servicios */}
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-collection d-lg-none mr-1" />
                      <span className="nav-link-inner--text">
                        {this.state.nombreUsuario}
                      </span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem to="/salir" tag={Link}>
                        <i className="ni ni-single-copy-04 d-lg-none mr-1" />
                        <span className="nav-link-inner--text">Salir</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  {/* /Servicios */}
                </Nav>

                <Nav className="align-items-lg-center" navbar>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="https://www.facebook.com/novedadesdaniela1/"
                      id="tooltip333589074"
                      target="_blank"
                    >
                      <i className="fa fa-facebook-square" />
                      <span className="nav-link-inner--text d-lg-none ml-2">
                        Facebook
                      </span>
                    </NavLink>
                    <UncontrolledTooltip delay={0} target="tooltip333589074">
                      Síguenos en Facebook
                    </UncontrolledTooltip>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="https://www.instagram.com/novedadesdaniela"
                      id="tooltip356693867"
                      target="_blank"
                    >
                      <i className="fa fa-instagram" />
                      <span className="nav-link-inner--text d-lg-none ml-2">
                        Instagram
                      </span>
                    </NavLink>
                    <UncontrolledTooltip delay={0} target="tooltip356693867">
                      Síguenos en Instagram
                    </UncontrolledTooltip>
                  </NavItem>

                  <NavItem className="d-none d-lg-block ml-lg-4">
                    <Button
                      className="btn-neutral btn-icon"
                      color="default"
                      onClick={this.acceso}
                    >
                      <span className="nav-link-inner--text ml-1">
                        {this.state.nombreUsuario
                          ? "Cerrar sesión"
                          : "Iniciar sesión"}
                      </span>
                    </Button>
                  </NavItem>
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default DashNavbar;

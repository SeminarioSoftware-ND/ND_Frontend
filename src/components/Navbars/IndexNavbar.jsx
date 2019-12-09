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
  Media
} from "reactstrap";

class DashNavbar extends React.Component {
  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
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
                <img
                  alt="..."
                  src={require("assets/img/brand/argon-react-white.png")}
                />
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
                    <DropdownToggle nav to="/" tag={Link}>
                      <i className="ni ni-shop d-lg-none mr-1" />
                      <span className="nav-link-inner--text">Inicio</span>
                    </DropdownToggle>
                  </UncontrolledDropdown>
                  {/* /Inicio */}

                  {/* Categorías */}
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav to="/categorias" tag={Link}>
                      <i className="ni ni-tag d-lg-none mr-1" />
                      <span className="nav-link-inner--text">Categorías</span>
                    </DropdownToggle>
                  </UncontrolledDropdown>
                  {/* /Categorías */}

                  {/* Productos */}
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav to="/productos" tag={Link}>
                      <i className="ni ni-bag-17 d-lg-none mr-1" />
                      <span className="nav-link-inner--text">Productos</span>
                    </DropdownToggle>
                  </UncontrolledDropdown>
                  {/* /Productos */}

                  {/* Pedidos */}
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-badge d-lg-none mr-1" />
                      <span className="nav-link-inner--text">Nosotros</span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem to="/usuarioPerfil" tag={Link}>
                        <i className="ni ni-single-copy-04 d-lg-none mr-1" />
                        <span className="nav-link-inner--text">Acerca</span>
                      </DropdownItem>
                      <DropdownItem to="/impresiones" tag={Link}>
                        <i className="ni ni-single-copy-04 d-lg-none mr-1" />
                        <span className="nav-link-inner--text">
                          Contáctanos
                        </span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  {/* /Pedidos */}
                </Nav>

                <Nav
                  className="navbar-nav-hover align-items-lg-right ml-lg-auto"
                  navbar
                >
                  {/* Usuario */}
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-collection d-lg-none mr-1" />
                      <span className="nav-link-inner--text">Usuario</span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem to="/usuarioPerfil" tag={Link}>
                        <i className="ni ni-single-copy-04 d-lg-none mr-1" />
                        <span className="nav-link-inner--text">Perfil</span>
                      </DropdownItem>
                      <DropdownItem to="/impresiones" tag={Link}>
                        <i className="ni ni-single-copy-04 d-lg-none mr-1" />
                        <span className="nav-link-inner--text">Salir</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  {/* /Usuario */}

                  {/* Carrito */}
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-cart" />
                      <span className="nav-link-inner--text d-lg-none ml-2">
                        Carrito
                      </span>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-lg">
                      <div className="dropdown-menu-inner">
                        <Media
                          className="d-flex align-items-center"
                          href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/overview?ref=adsr-navbar"
                          target="_blank"
                        >
                          <div className="icon icon-shape bg-gradient-primary rounded-circle text-white">
                            <i className="ni ni-spaceship" />
                          </div>
                          <Media body className="ml-3">
                            <h6 className="heading text-primary mb-md-1">
                              Getting started
                            </h6>
                            <p className="description d-none d-md-inline-block mb-0">
                              Learn how to use Argon compiling Scss, change
                              brand colors and more.
                            </p>
                          </Media>
                        </Media>
                        <Media
                          className="d-flex align-items-center"
                          href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/colors?ref=adsr-navbar"
                          target="_blank"
                        >
                          <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                            <i className="ni ni-palette" />
                          </div>
                          <Media body className="ml-3">
                            <h6 className="heading text-primary mb-md-1">
                              Foundation
                            </h6>
                            <p className="description d-none d-md-inline-block mb-0">
                              Learn more about colors, typography, icons and the
                              grid system we used for Argon.
                            </p>
                          </Media>
                        </Media>
                        <Media
                          className="d-flex align-items-center"
                          href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/alert?ref=adsr-navbar"
                          target="_blank"
                        >
                          <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                            <i className="ni ni-ui-04" />
                          </div>
                          <Media body className="ml-3">
                            <h5 className="heading text-warning mb-md-1">
                              Components
                            </h5>
                            <p className="description d-none d-md-inline-block mb-0">
                              Browse our 50 beautiful handcrafted components
                              offered in the Free version.
                            </p>
                          </Media>
                        </Media>
                      </div>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  {/* Carrito */}
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

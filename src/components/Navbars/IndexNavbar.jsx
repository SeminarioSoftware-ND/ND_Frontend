import React from "react";
import { Link } from "react-router-dom";
import axiosConfig from "../../axios";
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
  Media,
  Button
} from "reactstrap";

class IndexNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lasCategorias: [],
      cart: []
    };
  }

  // Métodos para cargar los componentes al renderizar la página
  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();

    // Petición para cargar las categoría
    axiosConfig.get("/categorias", { responseType: "json" }).then(response => {
      // Modificamos el estado del arreglo para cargar las categorías
      this.setState({ lasCategorias: response.data });
    });

    // Cargar el carrito
    this.setState({ cart: JSON.parse(localStorage.getItem("products")) });

    console.log(this.state.cart.length);
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

                  {/* Productos */}
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-badge d-lg-none mr-1" />
                      <span className="nav-link-inner--text">Productos</span>
                    </DropdownToggle>
                    <DropdownMenu>
                      {this.state.lasCategorias.map((categoria, i) => {
                        return (
                          <DropdownItem
                            key={i}
                            to={{
                              pathname: `/producto/${categoria.url}`,
                              state: {
                                fromNotifications: true
                              }
                            }}
                            tag={Link}
                          >
                            <i className="ni ni-single-copy-04 d-lg-none mr-1" />
                            <span className="nav-link-inner--text">
                              {categoria.nombre}
                            </span>
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  {/* Productos */}

                  {/* Pedidos */}
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-badge d-lg-none mr-1" />
                      <span className="nav-link-inner--text">Nosotros</span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem to="/acercade" tag={Link}>
                        <i className="ni ni-single-copy-04 d-lg-none mr-1" />
                        <span className="nav-link-inner--text">Acerca</span>
                      </DropdownItem>
                      <DropdownItem to="/contacto" tag={Link}>
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

                    {/* Desplegamos los artículos que se han agregado al carrito */}
                    <DropdownMenu className="dropdown-menu-lg">
                      <div className="dropdown-menu-inner">
                        {/* Realizamos una condición si hay artículos en el carrito */}
                        {this.state.cart == null || this.state.cart == 0 ? (
                          // Si no hay, envíamos mensaje
                          <p>Aún no has agregado al carrito</p>
                        ) : (
                          // Si hay artículo, mapeamos cada uno de ellos
                          this.state.cart.map((carrito, i) => {
                            return (
                              <div key={i}>
                                <Media className="d-flex align-items-center">
                                  <h6 className="heading text-primary mb-md-1">
                                    {`${carrito.nombre} X ${carrito.cantidad}`}
                                  </h6>
                                </Media>
                              </div>
                            );
                          })
                        )}
                      </div>

                      <Row className="justify-content-center align-items-center text-center">
                        {/* Evaluar el estado del carro para mostrar los botones */}
                        {this.state.cart == null || this.state.cart == 0 ? (
                          <br />
                        ) : (
                          <div>
                            <Col sm={12} className="mb-md-1">
                              <Button
                                color="default"
                                block
                                to="/ordenCompra"
                                tag={Link}
                              >
                                Ver orden
                              </Button>
                            </Col>
                            <Col sm={12} className="mt-2 mb-md-1">
                              <Button color="success" block>
                                Confirmar
                              </Button>
                            </Col>
                          </div>
                        )}
                      </Row>
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

export default IndexNavbar;

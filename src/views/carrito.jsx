import React from "react";
import axiosConfig from "../axios";
import Swal from "sweetalert2";

// nodejs library that concatenates classes
import classnames from "classnames";

import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import DashHero from "./IndexSections/DashHero.jsx";
import SimpleFooter from "components/Footers/SimpleFooter.jsx";

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  CardImgOverlay,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Row,
  Col,
  Container,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal
} from "reactstrap";

class Productos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iconTabs: 1,
      plainTabs: 1
    };
    this.agregarACarrito = this.agregarACarrito.bind(this);
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  // Evento para desplegar lo contenido en las tabs y modals
  toggleNavs = (e, state, index) => {
    e.preventDefault();
    // Si es "" es un modal
    if (index == "") {
      this.setState({
        [state]: !this.state[state]
      });
    }
    // Si trae un index es para desplegar un tabs
    else {
      this.setState({
        [state]: index
      });
    }
    // this.setState({
    //   [state]: index,
    //   [state]: !this.state[state]
    // });
  };

  agregarACarrito(e) {
    // Mensaje de confirmación
    Swal.fire("¡Agregado!", "Producto agregado al carrito", "success");
    // Cerrar el modal después de agregar
    this.toggleNavs(e, "mostrarProductoModal", "");
  }

  //   // Función para desplegar los modales
  //   toggleModal(state) {
  //     this.setState({
  //       [state]: !this.state[state]
  //     });
  //   }
  render() {
    return (
      <>
        <IndexNavbar />
        <main ref="main">
          <DashHero
            mensaje="¡BIENVENIDO A NUESTRA TIENDA!"
            imagen="Logo Blanco ND.png"
          />
          <section className="section">
            <Container>
              <section
                className="section section-components pb-0"
                id="section-components"
              >
                <Row className="justify-content-center">
                  <Col lg="12">
                    {/* Pedidos Pendientes */}
                    <h2 className="mb-3 text-center">
                      <span>PRODUCTOS</span>
                    </h2>
                  </Col>
                </Row>
              </section>

              {/* Cards de productos */}
              <Row>
                <Col lg="10">
                  <FormGroup
                    className={classnames({
                      focused: this.state.searchFocused
                    })}
                  >
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-zoom-split-in" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Buscar producto"
                        type="text"
                        onFocus={e => this.setState({ searchFocused: true })}
                        onBlur={e => this.setState({ searchFocused: false })}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col lg="2" className="mb-3 align-items-center text-center">
                  <Button className="btn-icon" color="default" type="button">
                    Buscar
                  </Button>
                </Col>
              </Row>

              <h3 className="h4 text-success font-weight-bold mt-4">
                CATEGORÍAS
              </h3>

              <Row className="justify-content-center">
                <Col lg="12">
                  {/* Tabs with icons */}
                  <div className="nav-wrapper">
                    <Nav
                      className="nav-fill flex-column flex-md-row"
                      id="tabs-icons-text"
                      pills
                      role="tablist"
                    >
                      <NavItem>
                        <NavLink
                          aria-selected={this.state.iconTabs === 1}
                          className={classnames("mb-sm-3 mb-md-0", {
                            active: this.state.iconTabs === 1
                          })}
                          onClick={e => this.toggleNavs(e, "iconTabs", 1)}
                          href="#pablo"
                          role="tab"
                        >
                          <i className="ni ni-book-bookmark mr-2" />
                          Todos
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          aria-selected={this.state.iconTabs === 2}
                          className={classnames("mb-sm-3 mb-md-0", {
                            active: this.state.iconTabs === 2
                          })}
                          onClick={e => this.toggleNavs(e, "iconTabs", 2)}
                          href="#pablo"
                          role="tab"
                        >
                          <i className="ni ni-ruler-pencil mr-2" />
                          Lápices
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          aria-selected={this.state.iconTabs === 3}
                          className={classnames("mb-sm-3 mb-md-0", {
                            active: this.state.iconTabs === 3
                          })}
                          onClick={e => this.toggleNavs(e, "iconTabs", 3)}
                          href="#pablo"
                          role="tab"
                        >
                          <i className="ni ni-calendar-grid-58 mr-2" />
                          Cuadernos
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>

                  {/* ESTOS SON LAS COSAS QUE SE ABREN EN EL TAB */}
                  <div>
                    <div className="mt-4">
                      <TabContent activeTab={"iconTabs" + this.state.iconTabs}>
                        <TabPane tabId="iconTabs1">
                          <Container>
                            <Row className="justify-content-center">
                              <Col lg="12">
                                <Row className="row-grid">
                                  {/* CADA TARJETA DE PRODUCTO */}
                                  <Col lg="4">
                                    <Card className="card-lift--hover shadow border-0 mb-4">
                                      <CardImg
                                        top
                                        width="100%"
                                        src={require("assets/img/theme/team-1-800x800.jpg")}
                                        alt="Imagen producto"
                                      />
                                      <CardImgOverlay className="align-items-between">
                                        <Button
                                          className="btn-icon btn-3"
                                          color="success"
                                          type="button"
                                          size="sm"
                                          onClick={this.agregarACarrito}
                                        >
                                          <span className="btn-inner--icon">
                                            <i className="ni ni-cart" />
                                          </span>
                                        </Button>
                                        <Button
                                          className="btn-icon btn-3"
                                          color="danger"
                                          type="button"
                                          size="sm"
                                          onClick={e =>
                                            this.toggleNavs(
                                              e,
                                              "mostrarProductoModal",
                                              ""
                                            )
                                          }
                                        >
                                          <span className="btn-inner--icon">
                                            <i className="ni ni-zoom-split-in" />
                                          </span>
                                        </Button>
                                      </CardImgOverlay>

                                      <CardBody className="py-2">
                                        <h6 className="text-primary text-uppercase">
                                          Nombre del producto
                                        </h6>
                                        <p className="description mt-3">
                                          L.150.00
                                        </p>
                                      </CardBody>
                                    </Card>
                                  </Col>
                                </Row>
                                <Row className="row-grid">
                                  <Col lg="4">
                                    <Card className="card-lift--hover shadow border-0">
                                      <CardBody className="py-5">
                                        <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                                          <i className="ni ni-check-bold" />
                                        </div>
                                        <h6 className="text-primary text-uppercase">
                                          Download Argon
                                        </h6>
                                        <p className="description mt-3">
                                          Argon is a great free UI package based
                                          on Bootstrap 4 that includes the most
                                          important components and features.
                                        </p>
                                        <div>
                                          <Badge
                                            color="primary"
                                            pill
                                            className="mr-1"
                                          >
                                            design
                                          </Badge>
                                          <Badge
                                            color="primary"
                                            pill
                                            className="mr-1"
                                          >
                                            system
                                          </Badge>
                                          <Badge
                                            color="primary"
                                            pill
                                            className="mr-1"
                                          >
                                            creative
                                          </Badge>
                                        </div>
                                        <Button
                                          className="mt-4"
                                          color="primary"
                                          href="#pablo"
                                          onClick={e => e.preventDefault()}
                                        >
                                          Learn more
                                        </Button>
                                      </CardBody>
                                    </Card>
                                  </Col>
                                  <Col lg="4">
                                    <Card className="card-lift--hover shadow border-0">
                                      <CardBody className="py-5">
                                        <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                                          <i className="ni ni-istanbul" />
                                        </div>
                                        <h6 className="text-success text-uppercase">
                                          Build Something
                                        </h6>
                                        <p className="description mt-3">
                                          Argon is a great free UI package based
                                          on Bootstrap 4 that includes the most
                                          important components and features.
                                        </p>
                                        <div>
                                          <Badge
                                            color="success"
                                            pill
                                            className="mr-1"
                                          >
                                            business
                                          </Badge>
                                          <Badge
                                            color="success"
                                            pill
                                            className="mr-1"
                                          >
                                            vision
                                          </Badge>
                                          <Badge
                                            color="success"
                                            pill
                                            className="mr-1"
                                          >
                                            success
                                          </Badge>
                                        </div>
                                        <Button
                                          className="mt-4"
                                          color="success"
                                          href="#pablo"
                                          onClick={e => e.preventDefault()}
                                        >
                                          Learn more
                                        </Button>
                                      </CardBody>
                                    </Card>
                                  </Col>
                                  <Col lg="4">
                                    <Card className="card-lift--hover shadow border-0">
                                      <CardBody className="py-5">
                                        <div className="icon icon-shape icon-shape-warning rounded-circle mb-4">
                                          <i className="ni ni-planet" />
                                        </div>
                                        <h6 className="text-warning text-uppercase">
                                          Prepare Launch
                                        </h6>
                                        <p className="description mt-3">
                                          Argon is a great free UI package based
                                          on Bootstrap 4 that includes the most
                                          important components and features.
                                        </p>
                                        <div>
                                          <Badge
                                            color="warning"
                                            pill
                                            className="mr-1"
                                          >
                                            marketing
                                          </Badge>
                                          <Badge
                                            color="warning"
                                            pill
                                            className="mr-1"
                                          >
                                            product
                                          </Badge>
                                          <Badge
                                            color="warning"
                                            pill
                                            className="mr-1"
                                          >
                                            launch
                                          </Badge>
                                        </div>
                                        <Button
                                          className="mt-4"
                                          color="warning"
                                          href="#pablo"
                                          onClick={e => e.preventDefault()}
                                        >
                                          Learn more
                                        </Button>
                                      </CardBody>
                                    </Card>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Container>
                        </TabPane>
                        <TabPane tabId="iconTabs2">
                          <p className="description">
                            Cosby sweater eu banh mi, qui irure terry richardson
                            ex squid. Aliquip placeat salvia cillum iphone.
                            Seitan aliquip quis cardigan american apparel,
                            butcher voluptate nisi qui.
                          </p>
                        </TabPane>
                        <TabPane tabId="iconTabs3">
                          <p className="description">
                            Raw denim you probably haven't heard of them jean
                            shorts Austin. Nesciunt tofu stumptown aliqua, retro
                            synth master cleanse. Mustache cliche tempor,
                            williamsburg carles vegan helvetica. Reprehenderit
                            butcher retro keffiyeh dreamcatcher synth.
                          </p>
                        </TabPane>
                      </TabContent>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        <SimpleFooter />

        {/* MODAL PARA MOSTRAR DETALLES PRODUCTO */}
        <Modal
          className="modal-dialog-centered modal-lg"
          isOpen={this.state.mostrarProductoModal}
          toggle={e => this.toggleNavs(e, "mostrarProductoModal", "")}
        >
          <div className="modal-header">
            <h6 className="modal-title" id="modal-title-default">
              Detalles del producto
            </h6>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={e => this.toggleNavs(e, "mostrarProductoModal", "")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body p-0">
            <Card className="bg-secondary shadow border-0">
              <Container>
                <Row>
                  {/* LADO IZQUIERDO IMAGEN */}
                  <Col
                    sm={6}
                    className="mt-2 justify-content-center text-center d-flex align-items-center"
                  >
                    <div className="shadow border-1 mb-4 justify-content-center">
                      <img
                        className="center-block"
                        alt="..."
                        src={require("assets/img/icons/common/github.svg")}
                        style={{ width: "300px" }}
                      />
                    </div>
                  </Col>
                  {/* LADO DERECHO INFORMACIÓN */}
                  <Col sm={6} className="mt-1">
                    {/* Nombre producto */}
                    <Row className="text-center ml-1">
                      <div>
                        <h3 className="heading-title text-warning mb-0 ">
                          El nombre
                        </h3>
                      </div>
                    </Row>

                    <hr className="mt-1 mb-0" />

                    {/* Descripción del producto */}
                    <Row className="mt-3 ml-1">
                      <p>
                        "Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam, eaque ipsa quae ab illo inventore veritatis et
                        quasi architecto beatae vitae dicta sunt explicabo. Nemo
                        enim ipsam voluptatem quia voluptas sit aspernatur aut
                        odit aut fugit, sed quia consequuntur magni dolores eos
                        qui ratione voluptatem sequi nesciunt. Neque porro
                        quisquam est, qui dolorem ipsum quia dolor sit amet,
                        consectetur, adipisci velit, sed quia non numquam eius
                        modi tempora incidunt ut labore et dolore magnam aliquam
                        quaerat voluptatem.
                      </p>
                    </Row>

                    {/* Precio */}
                    <Row className="ml-1 ">
                      <Col sm={6}></Col>
                      <Col sm={6}>
                        <h4 className="display-4 ">L. 150.00 </h4>
                      </Col>
                    </Row>

                    <hr className="mt-1 mb-0" />

                    {/* Agregar a carrito */}
                    <Row className="mt-3 ml-1 mb-4 align-items-center text-center justify-content-center">
                      {/* Input cantidad */}
                      <Col sm={6}>
                        <InputGroup className="input-group-alternative">
                          <Input
                            id="cantidadPro"
                            type="number"
                            placeholder="0"
                            step="1"
                            min="1"
                            pattern="^[0-9]"
                            name="cantidad"
                            required
                            onChange={this.handleChange}
                          />
                        </InputGroup>
                      </Col>
                      {/* Agregar */}
                      <Col sm={6}>
                        <Button
                          color="primary"
                          type="button"
                          onClick={this.agregarACarrito}
                        >
                          <span className="btn-inner--icon mr-1">
                            <i className="ni ni-basket" />
                          </span>
                          <span className="btn-inner--text">Agregar</span>
                        </Button>
                      </Col>
                    </Row>

                    {/* Ir a carrito */}
                    <Row className="mt-3 ml-1 mb-4">
                      <Col sm={12}>
                        <Button color="default" type="button" block>
                          <span className="btn-inner--icon mr-1">
                            <i className="ni ni-cart" />
                          </span>
                          <span className="btn-inner--text">Ver carrito</span>
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </Card>
          </div>
        </Modal>

        {/* MODAL PARA MOSTRAR DETALLES PRODUCTO */}
      </>
    );
  }
}

export default Productos;

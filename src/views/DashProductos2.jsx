import React from "react";
import classnames from "classnames";

// core components
import DashNavbar from "components/Navbars/DashNavbar.jsx";
import DashHero from "./IndexSections/DashHero.jsx";
import SimpleFooter from "components/Footers/SimpleFooter.jsx";

import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
  Modal,
  Label,
  Card,
  CardBody,
  CardFooter
} from "reactstrap";

class DashProductos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idProducto: "",
      nombre: "",
      descripcion: "",
      idCategoria: "",
      categoriaNombre: "",
      cantidad: "",
      precio: "",
      selectedFile: null,
      imagen: "",
      laUrl: "",
      estado: ""
    };
    this.agregarProducto = this.agregarProducto.bind(this);
    this.editarProducto = this.editarProducto.bind(this);
    this.inhabilitarProducto = this.inhabilitarProducto.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  // Función para desplegar los modales
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  // Evento para atrapar el cambio en los inputs
  handleChange(e) {
    // Obtenemos por destructuring lo que está en los Inputs
    const { name, value } = e.target;
    // Actualizamos su estado
    this.setState({
      [name]: value
    });
  }

  // Evento para atrapar la imagen seleccionada
  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  };

  agregarProducto(e) {
    e.preventDefault();
    console.log("Click Agregar");
  }

  editarProducto(e) {
    e.preventDefault();
  }

  inhabilitarProducto(e) {
    e.preventDefault();
  }

  render() {
    return (
      <>
        <DashNavbar />
        <main ref="main">
          <DashHero mensaje="¡BIENVENIDO AL PANEL DE ADMINISTRACIÓN!" />
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
              {/* Buscar */}
              <Row>
                <Col lg="10">
                  <FormGroup>
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
              {/* AGREGAR PRODUCTO */}
              {/* Botón Agregar */}
              <Row>
                <Col lg="12" className="mb-3">
                  <Button
                    color="default"
                    block
                    type="button"
                    onClick={() => this.toggleModal("agregarProductoModal")}
                  >
                    <span className="btn-inner--icon mr-1">
                      <i className="ni ni-fat-add" />
                    </span>
                    <span className="btn-inner--text">Agregar producto</span>
                  </Button>
                </Col>
              </Row>
              {/* /Botón Agregar */}

              {/* MODAL AGREGAR */}
              <Modal
                className="modal-dialog-centered modal-lg"
                isOpen={this.state.agregarProductoModal}
                toggle={() => this.toggleModal("agregarProductoModal")}
              >
                <div className="modal-header">
                  <h6 className="modal-title" id="modal-title-default">
                    Agregar producto
                  </h6>
                  <button
                    aria-label="Close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={() => this.toggleModal("agregarProductoModal")}
                  >
                    <span aria-hidden={true}>×</span>
                  </button>
                </div>
                {/* Modal Body */}
                <div className="modal-body p-0">
                  <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                      {/* Formulario */}
                      <Form onSubmit={this.agregarProducto}>
                        {/* Nombre */}
                        <FormGroup row className={classnames("mb-3")}>
                          <Label for="nombrePro" sm={2}>
                            Nombre
                          </Label>
                          <Col sm={10}>
                            <InputGroup className="input-group-alternative">
                              <Input
                                id="nombrePro"
                                placeholder="Nombre"
                                type="text"
                                name="nombre"
                                required
                                onChange={this.handleChange}
                              />
                            </InputGroup>
                          </Col>
                        </FormGroup>
                        {/* /Nombre */}

                        {/* Descripción */}
                        <FormGroup row className={classnames("mb-3")}>
                          <Label for="descripcionPro" sm={2}>
                            Descripción
                          </Label>
                          <Col sm={10}>
                            <InputGroup className="input-group-alternative">
                              <Input
                                id="descripcionPro"
                                placeholder="Descripción"
                                rows="3"
                                type="textarea"
                                name="descripcion"
                                required
                                onChange={this.handleChange}
                              />
                            </InputGroup>
                          </Col>
                        </FormGroup>
                        {/* /Descripcion */}

                        {/* Categoría */}
                        <FormGroup row className={classnames("mb-3")}>
                          <Label for="categoriaPro" sm={2}>
                            Categoría
                          </Label>
                          <Col sm={10}>
                            <InputGroup className="input-group-alternative">
                              <Input
                                id="categoriaPro"
                                type="select"
                                name="categoria"
                                required
                                onChange={this.handleChange}
                              >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                              </Input>
                            </InputGroup>
                          </Col>
                        </FormGroup>
                        {/* /Categoria */}

                        {/* Cantidad */}
                        <FormGroup row className={classnames("mb-3")}>
                          <Label for="cantidadPro" sm={2}>
                            Cantidad
                          </Label>
                          <Col sm={10}>
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
                        </FormGroup>
                        {/* /Cantidad */}

                        {/* Precio */}
                        <FormGroup row className={classnames("mb-3")}>
                          <Label for="precioPro" sm={2}>
                            Precio (L)
                          </Label>
                          <Col sm={10}>
                            <InputGroup className="input-group-alternative">
                              <Input
                                id="precioPro"
                                type="number"
                                placeholder="0"
                                step="0.01"
                                min="0.01"
                                pattern="^[0-9]"
                                name="precio"
                                required
                                onChange={this.handleChange}
                              />
                            </InputGroup>
                          </Col>
                        </FormGroup>
                        {/* /Precio */}

                        {/* Imagen */}
                        <FormGroup row className={classnames("mb-3")}>
                          <InputGroup className="input-group-alternative">
                            <Input
                              id="imagenPro"
                              type="file"
                              name="file"
                              onChange={this.onChangeHandler}
                            />
                          </InputGroup>
                        </FormGroup>
                        {/* /Imagen */}

                        <div className="modal-footer  pb-1">
                          <FormGroup row className={classnames("mt-3")}>
                            {/* Botón agregar */}
                            <Button color="success" type="submit">
                              Agregar
                            </Button>
                            {/* Botón cerrar */}
                            <Button
                              className="ml-auto"
                              color="link"
                              data-dismiss="modal"
                              type="button"
                              onClick={() =>
                                this.toggleModal("agregarProductoModal")
                              }
                            >
                              Cerrar
                            </Button>
                          </FormGroup>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                </div>
              </Modal>
              {/* /MODAL AGREGAR */}
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default DashProductos;

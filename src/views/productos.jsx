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
      losProductos: [],
      source: null,
      id: "",
      nombre: "",
      descripcion: "",
      imagen: "",
      precio: "",
      cart: []
    };
    this.agregarACarrito = this.agregarACarrito.bind(this);
    this.cargarImagen = this.cargarImagen.bind(this);
    this.cargarDatos = this.cargarDatos.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // Método para cargar los componentes al renderizar la página
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;

    // Obtenemos la url que viene del indexNavbar
    const { url } = this.props.match.params;
    const { fromNotification } = this.props.location.state;

    // Petición para cargar los productos
    axiosConfig
      .get("/listarProductoCategoria/", {
        params: {
          url: url
        }
      })
      .then(response => {
        this.setState({ losProductos: response.data });
      })
      .catch(error => {
        console.log(error.response.data.error);
      });

    // LLenamos el carrito con los elementos que se agregó con LocalStorage
    this.setState({ cart: JSON.parse(localStorage.getItem("products")) });

    console.log({ cart: JSON.parse(localStorage.getItem("products")) });
  }

  // Evento para atrapar el cambio en los inputs
  handleChange(e) {
    // Obtenemos por destructuring lo que está en los Inputs
    const { name, value } = e.target;
    // Actualizamos su estado
    this.setState({
      [name]: value
    });
  }

  // Método para cargar la Imagen
  cargarImagen(nombreImagen) {
    axiosConfig
      .get("/imagenProducto", {
        params: {
          url: nombreImagen
        },
        responseType: "arraybuffer"
      })
      .then(respuesta => {
        // Convertir imagen para mostrarla en el modal
        const base64 = btoa(
          new Uint8Array(respuesta.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        this.setState({ source: "data:;base64," + base64 });
      });
  }

  // Método para cargar los datos al modal
  cargarDatos(losDatos) {
    this.setState({
      id: losDatos._id,
      nombre: losDatos.nombre,
      descripcion: losDatos.descripcion,
      precio: losDatos.precio,
      imagen: losDatos.imagen
    });
    this.cargarImagen(this.state.imagen);
  }

  // Método para agregar un producto seleccionado al LocalStorage
  agregarACarrito(elProducto, cantidad) {
    // Creamos el arreglo donde se iran almecando temporalmente los productos
    let products = [];

    // Si ya existen productos en el carrito, los mandamos a traer
    // y lo agregamos al arreglo interno
    if (localStorage.getItem("products")) {
      products = JSON.parse(localStorage.getItem("products"));
    }

    // Calcular el subtotal del producto
    const subTotal = cantidad * elProducto.precio;

    // Agregar el producto al arreglo de productos
    products.push({
      productoId: elProducto._id,
      nombre: elProducto.nombre,
      precio: elProducto.precio,
      cantidad: cantidad,
      subTotal: subTotal
    });

    // Agregamos el arreglo al Local Storage
    localStorage.setItem(`products`, JSON.stringify(products));
    console.log("agregado");

    // Mensaje de confirmación
    Swal.fire("¡Agregado!", "Producto agregado al carrito", "success");
  }

  // Método para agregar un producto seleccionado al LocalStorage desde el modal
  agregarACarritoModal(id, nombre, precio, cantidad) {
    let products = [];
    if (localStorage.getItem("products")) {
      products = JSON.parse(localStorage.getItem("products"));
    }

    // Calcular el subtotal del producto
    const subTotal = cantidad * precio;

    // Agregar el producto al arreglo de productos
    products.push({
      productoId: id,
      nombre: nombre,
      precio: precio,
      cantidad: parseInt(cantidad),
      subTotal: subTotal
    });
    // Agregamos el arreglo al Local Storage
    localStorage.setItem("products", JSON.stringify(products));
    console.log("agregado");

    // Mensaje de confirmación
    Swal.fire("¡Agregado!", "Producto agregado al carrito", "success");
  }

  // Evento para desplegar los modales
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

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

              <section className="section">
                <Container>
                  <Row className="justify-content-center">
                    <Col lg="12">
                      <Row className="row-grid">
                        {this.state.losProductos.map(producto => {
                          return (
                            <Col lg="4">
                              <Card
                                className="card-lift--hover shadow border-0 mb-4"
                                onClick={() => {
                                  this.cargarImagen(producto.imagen);
                                }}
                              >
                                <CardImg
                                  top
                                  width="100%"
                                  src={this.state.source}
                                  alt="Imagen producto"
                                />
                                <CardImgOverlay className="align-items-between">
                                  <Button
                                    className="btn-icon btn-3"
                                    color="success"
                                    type="button"
                                    size="sm"
                                    onClick={() =>
                                      this.agregarACarrito(producto, 1)
                                    }
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
                                    onClick={() => {
                                      this.toggleModal("mostrarProductoModal");
                                      this.cargarDatos(producto);
                                    }}
                                  >
                                    <span className="btn-inner--icon">
                                      <i className="ni ni-zoom-split-in" />
                                    </span>
                                  </Button>
                                </CardImgOverlay>

                                <CardBody className="py-2">
                                  <h6 className="text-primary text-uppercase">
                                    {producto.nombre}
                                  </h6>
                                  <p className="description mt-3">
                                    L.{producto.precio}
                                  </p>
                                </CardBody>
                              </Card>
                            </Col>
                          );
                        })}
                      </Row>
                    </Col>
                  </Row>
                </Container>
              </section>
            </Container>
          </section>
        </main>
        <SimpleFooter />

        {/* MODAL PARA MOSTRAR DETALLES PRODUCTO */}
        <Modal
          className="modal-dialog-centered modal-lg"
          isOpen={this.state.mostrarProductoModal}
          toggle={() => this.toggleModal("mostrarProductoModal")}
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
              onClick={() => this.toggleModal("mostrarProductoModal")}
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
                        src={this.state.source}
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
                          {this.state.nombre}
                        </h3>
                      </div>
                    </Row>

                    <hr className="mt-1 mb-0" />

                    {/* Descripción del producto */}
                    <Row className="mt-3 ml-1">
                      <p>{this.state.descripcion}</p>
                    </Row>

                    {/* Precio */}
                    <Row className="ml-1 ">
                      <Col sm={6}></Col>
                      <Col sm={6}>
                        <h4 className="display-4 ">L. {this.state.precio} </h4>
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
                          onClick={() =>
                            this.agregarACarritoModal(
                              this.state.id,
                              this.state.nombre,
                              this.state.precio,
                              this.state.cantidad
                            )
                          }
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

import React from "react";
import { Route, Redirect } from "react-router-dom";
import axiosConfig from "../axios";
import Swal from "sweetalert2";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";

// reactstrap components
import { Button, Card, Container, Row, Col } from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import SimpleFooter from "components/Footers/SimpleFooter.jsx";

class VerOrden extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      cantidad: 10,
      fila: null,
      total: 0
    };

    // Para que nos funcionen en el CallBack
    this.handleChange = this.handleChange.bind(this);
    this.eliminarProducto = this.eliminarProducto.bind(this);
    this.sumar = this.sumar.bind(this);
    this.restar = this.restar.bind(this);
    this.guardarPedido = this.guardarPedido.bind(this);
    this.calcularTotal = this.calcularTotal.bind(this);
    this.cancelarPedido = this.cancelarPedido.bind(this);
  }
  // Método que renderiza la página
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;

    // Cargamos los productos del carrito al LocalStorage
    this.setState({ cart: JSON.parse(localStorage.getItem("products")) });

    // Calculamos el Total de la orden
    {
      this.calcularTotal(JSON.parse(localStorage.getItem("products")));
    }
  }

  // Evento para atrapar el cambio en los inputs
  handleChange(e, elProducto) {
    console.log(elProducto);
    // Obtenemos por destructuring lo que está en los Inputs
    const { name, value } = e.target;
    // Actualizamos su estado
    this.setState({
      [name]: value
    });
    console.log(this.state.cantidad);
  }

  // Método para restar la cantidad de productos
  restar(elProducto, cantidad) {
    var resta = cantidad - 1;
    if (resta <= 0) {
      resta = 1;
    }
    // Obtenemos la posición del producto en el arreglo del carrito
    var posicion = this.state.cart.indexOf(elProducto);
    // Obtenemos el arreglo actual de productos
    var losProductos = JSON.parse(localStorage.getItem("products"));
    losProductos[posicion].cantidad = resta;
    // Actualizar el subtotal
    var subTotal =
      losProductos[posicion].cantidad * losProductos[posicion].precio;
    losProductos[posicion].subTotal = subTotal;
    // Cambiamos el estado del carrito
    this.setState({
      cart: losProductos
    });
    // Almacenamos el nuevo arreglo con los productos restantes
    localStorage.setItem(`products`, JSON.stringify(losProductos));

    // Actualizamos el total
    {
      this.calcularTotal(losProductos);
    }
  }

  // Método para sumar la cantidad de productos
  sumar(elProducto, cantidad) {
    var suma = cantidad + 1;
    // Obtenemos la posición del producto en el arreglo del carrito
    var posicion = this.state.cart.indexOf(elProducto);
    // Obtenemos el arreglo actual de productos
    var losProductos = JSON.parse(localStorage.getItem("products"));
    losProductos[posicion].cantidad = suma;
    // Actualizar el subtotal
    var subTotal =
      losProductos[posicion].cantidad * losProductos[posicion].precio;
    losProductos[posicion].subTotal = subTotal;
    // Cambiamos el estado del carrito
    this.setState({
      cart: losProductos
    });
    // Almacenamos el nuevo arreglo con los productos restantes
    localStorage.setItem(`products`, JSON.stringify(losProductos));

    // Actualizamos el total
    {
      this.calcularTotal(losProductos);
    }
  }

  // Método para eliminar el producto de LocalStorage
  eliminarProducto(elProducto) {
    // Obtenemos la posición del producto en el arreglo del carrito
    var posicion = this.state.cart.indexOf(elProducto);
    // Obtenemos el arreglo actual de productos
    var losProductos = JSON.parse(localStorage.getItem("products"));
    // Quitamos del arreglo el producto que estamos eliminando
    losProductos.splice(posicion, 1);
    // Cambiamos el estado del carrito
    this.setState({
      cart: losProductos
    });
    // Almacenamos el nuevo arreglo con los productos restantes
    localStorage.setItem(`products`, JSON.stringify(losProductos));

    this.calcularTotal(losProductos);
  }

  // Método para calcular el total del pedido
  calcularTotal(cart) {
    if (!cart) {
      this.setState({ total: 0 });
    } else {
      var elTotal = 0;

      cart.forEach(producto => {
        elTotal += producto.subTotal;
      });
      this.setState({ total: elTotal });
    }
  }

  // Método para guardar en la base de datos
  guardarPedido() {
    // Creamos una variable para enviar los datos de la orden
    let datos = {
      productos: this.state.cart,
      total: this.state.total,
      cliente: localStorage.getItem("usuarioNombre"),
      email: localStorage.getItem("usuarioCorreo")
    };

    // Evaluamos si el cliente ya inició sesión
    if (localStorage.getItem("autorizado") === "true") {
      // Petición para realizar la inserción del pedido
      axiosConfig
        .post("/guardarPedido", datos)
        .then(respuesta => {
          if (respuesta.status === 200) {
            Swal.fire("Compra Realizada", respuesta.data.mensaje, "success");
            localStorage.removeItem("products");

            // Petición para enviar la factura
            axiosConfig
              .post("/enviarCorreo", datos)
              .then(respuesta2 => {
                if (respuesta2.status === 200) {
                  console.log("Factura enviada");
                  Swal.fire(
                    "¡Revisa tu correo!",
                    respuesta2.data.mensaje,
                    "success"
                  );
                  window.location = "/";
                } else {
                  Swal.fire("¡Alerta!", respuesta2.data.mensaje, "warning");
                }
              })
              .catch(error => {
                Swal.fire("Error", error.response.data.error, "warning");
              });
          } else {
            Swal.fire("Error", respuesta.response.data.mensaje, "warning");
          }
        })
        .catch(error => {
          Swal.fire("Error", error.response.data.error, "warning");
        });
    } else {
      window.location = "/iniciarSesion";
    }
  }

  // Método para cancelar el pedido
  cancelarPedido() {
    localStorage.removeItem("products");
    Swal.fire("Orden cancelada", "", "success");
    window.location = "/";
  }

  render() {
    // Obtenemos por destructuring el arreglo con los productos
    const { cart } = this.state;
    // Etablecer las columnas de nuestra tabla
    const columns = [
      {
        Header: "Código",
        accessor: "productoId",
        style: {
          textAlign: "center"
        },
        filterable: false
      },
      {
        Header: "Nombre",
        accessor: "nombre"
      },
      {
        Header: "Cantidad",
        Cell: props => {
          return (
            <div>
              <Row>
                <Col sm={4}>
                  <Button
                    className="btn-icon"
                    color="default"
                    type="button"
                    size="sm"
                    onClick={() =>
                      this.restar(props.original, props.original.cantidad)
                    }
                  >
                    -
                  </Button>
                </Col>
                <Col sm={4}>
                  <h5>{props.original.cantidad}</h5>
                </Col>
                <Col sm={4}>
                  <Button
                    className="btn-icon"
                    color="default"
                    type="button"
                    size="sm"
                    onClick={() =>
                      this.sumar(props.original, props.original.cantidad)
                    }
                  >
                    +
                  </Button>
                </Col>
              </Row>
            </div>
          );
        },
        style: {
          textAlign: "center"
        },
        filterable: false
      },
      {
        Header: "Precio",
        accessor: "precio",
        style: {
          textAlign: "right"
        },
        filterable: false
      },
      {
        Header: "Subtotal",
        accessor: "subTotal",
        style: {
          textAlign: "right"
        },
        filterable: false
      },
      {
        Header: "Opciones",
        Cell: props => {
          return (
            <Button
              className="btn-icon"
              color="danger"
              type="button"
              size="sm"
              onClick={() => {
                this.eliminarProducto(props.original);
              }}
            >
              Eliminar
            </Button>
          );
        },
        style: {
          textAlign: "center"
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100,
        filterable: false
      }
    ];

    return (
      <>
        <IndexNavbar />
        <main className="profile-page" ref="main">
          <section className="section-profile-cover section-shaped my-0">
            {/* Circles background */}
            <div className="shape shape-style-1 shape-default alpha-4">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          {/* Sección datos */}
          <section className="section">
            <Container>
              <Card className="card-profile shadow mt--300">
                <div className="px-4">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <a>
                          {/* IMAGEN */}
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("assets/img/theme/team-4-800x800.jpg")}
                          />
                        </a>
                      </div>
                    </Col>
                    {/* Botones pequeños derecha */}
                    <Col
                      className="order-lg-3 text-lg-right align-self-lg-center"
                      lg="4"
                    ></Col>
                    <Col className="order-lg-1 mb-5" lg="4">
                      <div className="card-profile-stats d-flex justify-content-center"></div>
                    </Col>
                  </Row>

                  {/* Información actual */}
                  <div className="text-center mt-5">
                    <h2>
                      El nombre del cliente
                      <span className="font-weight-light"></span>
                    </h2>

                    <div className="h5 mt-2">
                      <i className="ni business_briefcase-24 mr-2" />
                      Tu orden de compra
                    </div>
                  </div>
                  {/* Información actual */}
                </div>

                <div className="px-4">
                  <ReactTable
                    columns={columns}
                    data={cart}
                    filterable
                    defaultPageSize={10}
                    noDataText={"No hay datos disponibles"}
                    previousText={"Anterior"}
                    nextText={"Siguiente"}
                    pageText={"Página"}
                    ofText={"de"}
                    rowsText={"productos"}
                  ></ReactTable>
                </div>
                <section className="section">
                  <Container>
                    <Row className="justify-content-center">
                      <Col sm="12">
                        <h3 className="text-right">Total</h3>
                      </Col>
                      {/* Calculamos el total recorriendo el arreglo */}
                      <Col sm="12">
                        <h3 className="text-right">L. {this.state.total}</h3>
                      </Col>
                      {/* Botón de confirmar el pedido */}
                      <Col sm="12">
                        <Button
                          className="btn-icon"
                          color="success"
                          type="button"
                          block
                          onClick={this.guardarPedido}
                        >
                          Confirmar orden
                        </Button>
                      </Col>
                      <Col sm="12" className="mt-2">
                        <Button
                          className="btn-icon"
                          color="danger"
                          type="button"
                          block
                          onClick={this.cancelarPedido}
                        >
                          Cancelar orden
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </section>
              </Card>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}
export default VerOrden;

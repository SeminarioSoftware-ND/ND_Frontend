import React from "react";
import { Link } from "react-router-dom";
import axiosConfig from "../axios";
import Swal from "sweetalert2";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";

// reactstrap components
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import SimpleFooter from "components/Footers/SimpleFooter.jsx";

class VerOrden extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      cantidad: 1,
      fila: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.eliminarProducto = this.eliminarProducto.bind(this);
  }
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;

    this.setState({ cart: JSON.parse(localStorage.getItem("products")) });
    this.setState({});
    console.log({ cart: JSON.parse(localStorage.getItem("products")) });

    // this.setState({ cantidad: this.cart.cantidad });
  }

  // Evento para atrapar el cambio en los inputs
  handleChange(e) {
    // Obtenemos por destructuring lo que está en los Inputs
    const { name, value } = e.target;
    // Actualizamos su estado
    this.setState({
      [name]: value
    });
    console.log(this.state.cantidad);
  }

  // Evento para atrapar la imagen seleccionada
  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  };

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
  }

  render() {
    // Obtenemos por destructurin el arreglo con los productos
    const { cart } = this.state;
    // Etablecer las columnas de nuestra tabla
    const columns = [
      {
        Header: "Código",
        accessor: "productoId",
        style: {
          textAlign: "center"
        }
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
              <InputGroup className="input-group-alternative">
                <Input
                  id="cantidadPro"
                  type="number"
                  placeholder="1"
                  step="1"
                  min="1"
                  pattern="^[0-9]"
                  name="cantidad"
                  value={this.state.cantidad}
                  required
                  onChange={this.handleChange}
                />
              </InputGroup>
            </div>
          );
        },
        width: 120,
        maxWidth: 120,
        minWidth: 100
      },
      {
        Header: "Precio",
        accessor: "precio"
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
        }
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

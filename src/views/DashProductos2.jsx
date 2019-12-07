import React from "react";
import classnames from "classnames";
import axiosConfig from "../axios";
import Swal from "sweetalert2";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import ExportToExcel from "../ExportToExcel";

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
      estado: "",
      fechaCreacion: "",
      posts: []
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

    const urlPrueba = "https://jsonplaceholder.typicode.com/posts";
    fetch(urlPrueba, {
      method: "GET"
    })
      .then(reponse => reponse.json())
      .then(posts => {
        this.setState({ posts: posts });
      });
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

    let newDate = new Date();
    let fecha = newDate.getDate();

    // Crear JSON para enviar datos
    // let datos = {
    //   nombre: this.state.nombre,
    //   descripcion: this.state.descripcion,
    //   categoriaNombre: this.state.categoriaNombre,
    //   cantidad: this.state.cantidad,
    //   precio: this.state.precio,
    //   fechaCreacion: fecha
    // };

    const datos = {};
    datos.nombre = this.state.nombre;
    datos.descripcion = this.state.descripcion;
    datos.categoriaNombre = this.state.categoriaNombre;
    datos.cantidad = this.state.cantidad;
    datos.precio = this.state.precio;
    datos.fechaCreacion = fecha;

    // Si el usuario seleccionó una imagen
    if (this.state.selectedFile !== null) {
      console.log("Imprimiendo con imagen");
      // Creamos una variable para recoger la imagen
      const data = new FormData();
      data.append(
        "file",
        this.state.selectedFile,
        this.state.selectedFile.name
      );

      // Realizamos la petición para la imagen
      axiosConfig
        .post("/productoImagen", data)
        .then(respuesta => {
          // Si se sube la imagen, almacenamos el producto
          if (respuesta.status === 200) {
            // Creamos nuestro JSON para insertar todo
            datos.imagen = respuesta.data.imagen;

            // Realizamos la petición de almacenar producto
            axiosConfig
              .post("/agregarProducto", datos)
              .then(respuesta2 => {
                // Si se almacenaron los datos
                if (respuesta2.status === 200) {
                  Swal.fire("¡Agregado!", respuesta2.data.mensaje, "success");
                } else {
                  Swal.fire(
                    "¡Alerta!",
                    respuesta2.response.data.mensaje,
                    "warning"
                  );
                }
              })
              // Error de ingresar Producto
              .catch(error => {
                Swal.fire("¡Alerta!", error.response.data.mensaje, "warning");
              });
          }
        })
        // Error de imagen
        .catch(error => {
          Swal.fire("¡Alerta!", error.response.data.mensaje, "warning");
        });
    }
    // Si no seleccionó una imagen
    else {
      console.log("Imprimiendo sin imagen " + datos);
      // Petición de almacenar usuario
      axiosConfig
        .post("/agregarProducto", datos)
        .then(respuesta2 => {
          // Si se almacenaron los datos
          if (respuesta2.status === 200) {
            Swal.fire("¡Agregado!", respuesta2.data.mensaje, "success");
          } else {
            Swal.fire("¡Alerta!", respuesta2.response.data.mensaje, "warning");
          }
        })
        // Error de ingresar Producto
        .catch(error => {
          Swal.fire("¡Alerta!", error.response.data.mensaje, "warning");
        });
    }
  }

  editarProducto(id) {
    console.log("id", id);
  }

  inhabilitarProducto(e) {
    e.preventDefault();
  }

  render() {
    const columns = [
      {
        Header: "User ID",
        accessor: "userId",
        style: {
          textAlign: "center"
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "ID",
        accessor: "id",
        style: {
          textAlign: "center"
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "Title",
        accessor: "title"
      },
      {
        Header: "Content",
        accessor: "body"
      },
      {
        Header: "Opciones",
        Cell: props => {
          return (
            <div>
              <Button
                className="btn-icon"
                color="info"
                type="button"
                size="sm"
                onClick={() => {
                  this.editarProducto(props.original.id);
                }}
              >
                Editar
              </Button>
              <Button
                className="btn-icon"
                color="danger"
                type="button"
                size="sm"
              >
                Eliminar
              </Button>
            </div>
          );
        },
        sortable: false,
        filterable: false,
        style: {
          textAlign: "center"
        },
        width: 200,
        maxWidth: 200,
        minWidth: 100
      }
    ];
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
              <section>
                <ReactTable
                  columns={columns}
                  data={this.state.posts}
                  filterable
                  defaultPageSize={10}
                  noDataText={"No hay datos disponible"}
                >
                  {(state, Productos, instance) => {
                    this.reactTable = state.pageRows.map(post => {
                      return post._original;
                    });
                    return (
                      <div>
                        {Productos()}
                        <ExportToExcel posts={this.reactTable} />
                      </div>
                    );
                  }}
                </ReactTable>
              </section>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default DashProductos;

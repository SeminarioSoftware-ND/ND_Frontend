import React from "react";
import classnames from "classnames";
import axiosConfig from "../axios";
import Swal from "sweetalert2";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";

// reactstrap components
import {
  Container,
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  Row,
  Col,
  Modal,
  Label
} from "reactstrap";

// core components
import DashNavbar from "components/Navbars/DashNavbar.jsx";
import DashHero from "./IndexSections/DashHero.jsx";
import SimpleFooter from "components/Footers/SimpleFooter.jsx";

class DashCategorias extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idCategoria: "",
      nombre: "",
      descripcion: "",
      selectedFile: null,
      imagen: "",
      imagenActual: "",
      laUrl: "",
      nombreEstado: "",
      source: null,
      TableData: [
        {
          id: "",
          nombre: "",
          descripcion: "",
          estado: "",
          url: ""
        }
      ]
    };
    // Este enlace es necesario para hacer que `this` funcione en el callback
    this.agregarCategoria = this.agregarCategoria.bind(this);
    this.editarCategoria = this.editarCategoria.bind(this);
    this.cambiarEstadoCategoria = this.cambiarEstadoCategoria.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // Componente que carga al renderizar la página
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;

    // Petición para cargar las categoría
    axiosConfig.get("/categorias", { responseType: "json" }).then(response => {
      // Modificamos el estado del arreglo TableData para llenarlo con la consulta
      this.setState({ TableData: response.data });
    });
  }

  // Evento para desplegar los modales
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  // Función para cargar datos al modal
  cargarDatos(items, laImagen) {
    this.setState({
      nombre: items.nombre,
      descripcion: items.descripcion,
      nombreEstado: items.nombreEstado,
      laUrl: items.url,
      imagenActual: items.imagen
    });

    // Petición para cargar la imagen
    axiosConfig
      .get(`/imagen/`, {
        params: {
          url: laImagen
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

  // Función para agregar categoria
  agregarCategoria(e) {
    e.preventDefault();

    // Si el usuario seleccionó una imagen
    if (this.state.selectedFile !== null) {
      // Creamos una variable para recoger la imagen
      const data = new FormData();
      data.append(
        "file",
        this.state.selectedFile,
        this.state.selectedFile.name
      );

      // Realizamos la petición para insertar la imagen
      axiosConfig
        .post("/categoriaImagen", data)
        .then(respuesta => {
          // Si se sube la imagen, almacenamos la categoria
          if (respuesta.status === 200) {
            // Creamos nuestro JSON para insertar los datos
            let datos = {
              nombre: this.state.nombre,
              descripcion: this.state.descripcion,
              imagen: respuesta.data.imagen
            };

            // Realizamos la petición para almacenar categoría
            axiosConfig
              .post("/crearCategoria", datos)
              .then(respuesta2 => {
                // Si se almacenaron los datos
                if (respuesta2.status === 200) {
                  Swal.fire("¡Agregado!", respuesta2.data.mensaje, "success");
                  window.location = "/admin/categorias";
                } else {
                  Swal.fire(
                    "¡Alerta!",
                    respuesta2.response.data.mensaje,
                    "warning"
                  );
                }
              })
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
    // Si no se seleccionó imagen
    else {
      // Creamos nuestro JSON para insertar todos los datos

      let datos = {
        nombre: this.state.nombre,
        descripcion: this.state.descripcion
      };

      // Realizamos la petición para almacenar categoría
      axiosConfig
        .post("/crearCategoria", datos)
        .then(respuesta2 => {
          // Si se almacenaron los datos
          if (respuesta2.status === 200) {
            Swal.fire("¡Agregado!", respuesta2.data.mensaje, "success");
            window.location = "/admin/categorias";
          } else {
            Swal.fire("¡Alerta!", respuesta2.response.data.mensaje, "warning");
          }
        })
        // Error de ingresar categoría
        .catch(error => {
          Swal.fire("¡Alerta!", error.response.data.mensaje, "warning");
        });
    }
  }

  // Función para editar categoria
  editarCategoria(e) {
    e.preventDefault();

    // Si el usuario seleccionó una imagen
    if (this.state.selectedFile !== null) {
      // Creamos una variable para recoger la imagen
      const data = new FormData();
      data.append(
        "file",
        this.state.selectedFile,
        this.state.selectedFile.name
      );

      // Realizamos la petición para insertar la imagen
      axiosConfig
        .post("/categoriaImagen/", data, {
          params: {
            url: this.state.laUrl
          }
        })
        .then(respuesta => {
          // Si se sube la imagen, actualizamos la categoria
          if (respuesta.status === 200) {
            // Creamos nuestro JSON para modificar los datos
            let datos = {
              nombre: this.state.nombre,
              descripcion: this.state.descripcion,
              imagen: respuesta.data.imagen,
              imagenActual: this.state.imagenActual
            };

            // Realizamos la petición para actualizar la categoría
            axiosConfig
              .post(`/actualizarCategoria/${this.state.laUrl}`, datos)
              .then(respuesta2 => {
                // Si se modificaron los datos
                if (respuesta2.status === 200) {
                  Swal.fire(
                    "¡Actualizado!",
                    respuesta2.data.mensaje,
                    "success"
                  );
                  window.location = "/admin/categorias";
                } else {
                  Swal.fire(
                    "¡Alerta!",
                    respuesta2.response.data.mensaje,
                    "warning"
                  );
                }
              })
              .catch(error => {
                Swal.fire("¡Error!", error.response.data.mensaje, "warning");
              });
          }
        })
        // Error de imagen
        .catch(error => {
          Swal.fire("¡Alerta!", error.response.data.mensaje, "warning");
        });
    }
    // Si no se seleccionó imagen
    else {
      // Creamos nuestro JSON para modificar los datos
      let datos = {
        nombre: this.state.nombre,
        descripcion: this.state.descripcion,
        imagenActual: this.state.imagenActual,
        imagen: this.state.imagenActual
      };
      // Realizamos la petición para actualizar la categoría
      axiosConfig
        .post(`/actualizarCategoria/${this.state.laUrl}`, datos)
        .then(respuesta2 => {
          // Si se modificaron los datos
          if (respuesta2.status === 200) {
            Swal.fire("¡Actualizado!", respuesta2.data.mensaje, "success");
            window.location = "/admin/categorias";
          } else {
            Swal.fire("¡Alerta!", respuesta2.response.data.mensaje, "warning");
          }
        })
        .catch(error => {
          Swal.fire("¡Error!", error.response.data.mensaje, "warning");
        });
    }
  }

  // Función para habilitar categoria
  cambiarEstadoCategoria(estado) {
    // Está habilitada
    if (estado === "Inhabilitada") {
      Swal.fire({
        title: "¿Desea habilitar la categoría?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Habilitar"
      }).then(result => {
        if (result.value) {
          axiosConfig
            .post(`/habilitarCategoria/${this.state.laUrl}`)
            .then(respuesta => {
              if (respuesta.status === 200) {
                Swal.fire("Habilitada", respuesta.data.mensaje, "success");
                window.location = "/admin/categorias";
              } else {
                Swal.fire(
                  "¡Alerta!",
                  respuesta.response.data.mensaje,
                  "warning"
                );
              }
            })
            .catch(error => {
              Swal.fire("¡Error!", error.response.data.mensaje, "warning");
            });
        }
      });
    }
    // Está habilitado
    else {
      Swal.fire({
        title: "¿Desea habilitar la categoría?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Inhabilitar"
      }).then(result => {
        if (result.value) {
          axiosConfig
            .post(`/inhabilitarCategoria/${this.state.laUrl}`)
            .then(respuesta => {
              if (respuesta.status === 200) {
                Swal.fire("Inhabilitada", respuesta.data.mensaje, "success");
                window.location = "/admin/categorias";
              } else {
                Swal.fire(
                  "¡Alerta!",
                  respuesta.response.data.mensaje,
                  "warning"
                );
              }
            })
            .catch(error => {
              Swal.fire("¡Error!", error.response.data.mensaje, "warning");
            });
        }
      });
    }
  }

  render() {
    // Obtenemos por destructuring el arreglo con los datos
    const { TableData } = this.state;
    // Establecemos las columnas de nuestra tabla
    const columns = [
      {
        Header: "Id",
        accessor: "_id",
        style: {
          textAlign: "center"
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100,
        show: false
      },
      {
        Header: "Nombre",
        accessor: "nombre",
        width: 200,
        maxWidth: 200,
        minWidth: 100
      },
      {
        Header: "Descripción",
        accessor: "descripcion"
      },
      {
        Header: "Estado",
        accessor: "nombreEstado",
        width: 120,
        maxWidth: 120,
        minWidth: 100
      },
      {
        Header: "URL",
        accessor: "url",
        show: false
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
                  this.toggleModal("editarCategoriaModal");
                  // Enviar los datos que están en la tabla
                  this.cargarDatos(props.original, props.original.imagen);
                }}
              >
                Editar
              </Button>
            </div>
          );
        },
        sortable: false,
        filterable: false,
        style: {
          textAlign: "center"
        },
        width: 100,
        maxWidth: 100,
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
                      <span>CATEGORÍAS</span>
                    </h2>
                  </Col>
                </Row>

                <Row>
                  <Col lg="12" className="mb-3">
                    <Button
                      color="default"
                      block
                      type="button"
                      onClick={() => this.toggleModal("defaultModal")}
                    >
                      <span className="btn-inner--icon mr-1">
                        <i className="ni ni-fat-add" />
                      </span>
                      <span className="btn-inner--text">Agregar categoría</span>
                    </Button>
                  </Col>
                </Row>

                {/* MODAL AGREGAR */}
                <Modal
                  className="modal-dialog-centered"
                  isOpen={this.state.defaultModal}
                  toggle={() => this.toggleModal("defaultModal")}
                >
                  <div className="modal-header">
                    <h6 className="modal-title" id="modal-title-default">
                      Agregar categoría
                    </h6>
                    <button
                      aria-label="Close"
                      className="close"
                      data-dismiss="modal"
                      type="button"
                      onClick={() => this.toggleModal("defaultModal")}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <div className="modal-body p-0">
                    <Card className="bg-secondary shadow border-0">
                      <CardBody className="px-lg-5 py-lg-5">
                        {/* Formulario */}
                        <Form onSubmit={this.agregarCategoria}>
                          {/* Nombre */}
                          <FormGroup row className={classnames("mb-3")}>
                            <Label for="nombreCat" sm={4}>
                              Nombre
                            </Label>
                            <Col sm={8}>
                              <InputGroup className="input-group-alternative">
                                <Input
                                  id="nombreCat"
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
                            <Label for="descripcionCat" sm={4}>
                              Descripción
                            </Label>
                            <Col sm={8}>
                              <InputGroup className="form-control-alternative">
                                <Input
                                  id="descripcionCat"
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

                          {/* Imagen */}
                          <FormGroup row className={classnames("mb-3")}>
                            <InputGroup className="input-group-alternative">
                              <Input
                                id="imagenCat"
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
                                onClick={() => this.toggleModal("defaultModal")}
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
                {/* MODAL AGREGAR */}
              </section>

              {/* TABLA DE CATEGORÍAS */}
              <ReactTable
                columns={columns}
                data={TableData}
                filterable
                defaultPageSize={10}
                noDataText={"No hay datos disponibles"}
                previousText={"Anterior"}
                nextText={"Siguiente"}
                pageText={"Página"}
                ofText={"de"}
                rowsText={"registros"}
              ></ReactTable>
              {/* /TABLA DE CATEGORÍAS */}
            </Container>
          </section>
        </main>
        <SimpleFooter />

        {/* MODAL EDITAR CATEGORÍA */}
        <Modal
          className="modal-dialog-centered modal-lg"
          isOpen={this.state.editarCategoriaModal}
          toggle={() => this.toggleModal("editarCategoriaModal")}
        >
          <div className="modal-header">
            <h6 className="modal-title" id="modal-title-default">
              Editar categoría
            </h6>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("editarCategoriaModal")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body p-0">
            <Card className="bg-secondary shadow border-0">
              <CardBody className="px-lg-5 py-lg-5">
                {/* Formulario */}
                <Form onSubmit={this.editarCategoria}>
                  {/* Imagen Actual */}
                  <div>
                    <FormGroup row className="justify-content-center">
                      <img
                        className="center-block"
                        alt="..."
                        src={this.state.source}
                        style={{ width: "210px" }}
                      />
                    </FormGroup>
                  </div>
                  {/* Imagen Actual */}

                  {/* Nombre */}
                  <FormGroup row className={classnames("mb-3")}>
                    <Label for="nombreCatEditar" sm={4}>
                      Nombre
                    </Label>
                    <Col sm={8}>
                      <InputGroup className="input-group-alternative">
                        <Input
                          id="nombreCatEditar"
                          placeholder="Nombre"
                          type="text"
                          name="nombre"
                          value={this.state.nombre}
                          required
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  {/* /Nombre */}

                  {/* Descripción */}
                  <FormGroup row className={classnames("mb-3")}>
                    <Label for="descripcionCatEditar" sm={4}>
                      Descripción
                    </Label>
                    <Col sm={8}>
                      <InputGroup className="form-control-alternative">
                        <Input
                          id="descripcionCatEditar"
                          rows="3"
                          type="textarea"
                          name="descripcion"
                          value={this.state.descripcion}
                          required
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  {/* /Descripcion */}

                  {/* Estado */}
                  <FormGroup row className={classnames("mb-3")}>
                    <Label for="estadoCat" sm={4}>
                      Estado
                    </Label>
                    <Col sm={4}>
                      <InputGroup className="form-control-alternative">
                        <Input
                          id="estadoCat"
                          type="text"
                          value={this.state.nombreEstado}
                          readOnly
                        />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  {/* Estado */}

                  {/* Imagen */}
                  <FormGroup row className={classnames("mb-3")}>
                    <InputGroup className="input-group-alternative">
                      <Input
                        id="imagenCat"
                        type="file"
                        name="file"
                        onChange={this.onChangeHandler}
                      />
                    </InputGroup>
                  </FormGroup>
                  {/* /Imagen */}

                  {/* Opciones Footer */}
                  <div className="modal-footer  pb-1">
                    <FormGroup row className={classnames("mt-3")}>
                      {/* Cambiar estado */}
                      <Button
                        color="danger"
                        type="button"
                        className="mr-5"
                        onClick={() =>
                          this.cambiarEstadoCategoria(this.state.nombreEstado)
                        }
                      >
                        {this.state.nombreEstado === "Habilitada"
                          ? "Inhabilitar"
                          : "Habilitar"}
                      </Button>
                      {/* Cambiar estado */}
                      {/* Botón editar */}
                      <Button color="success" type="submit">
                        Editar
                      </Button>
                      {/* Botón cerrar */}
                      <Button
                        className="ml-auto"
                        color="link"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => this.toggleModal("editarCategoriaModal")}
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
        {/* MODAL EDITAR CATEGORÍA */}
      </>
    );
  }
}
export default DashCategorias;

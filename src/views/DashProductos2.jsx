import React from "react";
import classnames from "classnames";
import axiosConfig from "../axios";
import Swal from "sweetalert2";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import ExportToExcel from "../ExportToExcel";
import Select from "react-select";

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
      nombreCategoria: "",
      cantidad: "",
      precio: "",
      selectedFile: null,
      imagen: "",
      imagenActual: "",
      laUrl: "",
      nombreEstado: "",
      source: null,
      registradoPor: "",
      fechaCreacion: "",
      selectedOption: null,
      TableData: [
        {
          id: "",
          nombre: "",
          descripcion: "",
          categoria: [],
          cantidad: "",
          precio: "",
          estado: "",
          url: "",
          registradoPor: ""
        }
      ],
      lasCategorias: []
    };
    this.agregarProducto = this.agregarProducto.bind(this);
    this.editarProducto = this.editarProducto.bind(this);
    this.cambiarEstadoProducto = this.cambiarEstadoProducto.bind(this);
    // this.cargarDatos = this.cargarDatos.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
  }
  // Componente que carga al renderizar la página
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;

    // Petición para cargar los productos
    axiosConfig
      .get("/listarProductos", { responseType: "json" })
      .then(response => {
        // Modificamos el estado del arreglo TableData para llenarlo con la consulta
        this.setState({ TableData: response.data });
        console.log(response.data);
      });

    // Petición para cargar las categorias para select
    axiosConfig
      .get("/categoriasProducto", { responseType: "json" })
      .then(respuesta => {
        if (respuesta.status === 200) {
          this.setState({ lasCategorias: respuesta.data });
          console.log(this.state.lasCategorias);
        } else {
          Swal.fire("¡Alerta!", respuesta.response.data.mensaje, "warning");
        }
      });
  }

  // Función para desplegar los modales
  toggleModal(state) {
    this.setState({
      [state]: !this.state[state]
    });
  }

  cargarDatos(items, laImagen, categoriaNombre, idCategoria) {
    this.setState({
      nombre: items.nombre,
      descripcion: items.descripcion,
      idCategoria: idCategoria,
      nombreCategoria: categoriaNombre,
      cantidad: items.cantidad,
      precio: items.precio,
      nombreEstado: items.nombreEstado,
      laUrl: items.url,
      imagenActual: items.imagen
    });

    // Petición para cargar la imagen
    axiosConfig
      .get("/imagenProducto", {
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

  handleChangeSelect = selectedOption => {
    this.setState({ selectedOption });
    console.log("Opcion seleccionada: " + selectedOption.value);
  };

  // Evento para atrapar la imagen seleccionada
  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  };

  // Función para agregar producto
  agregarProducto(e) {
    e.preventDefault();
    console.log("Click Agregar");
    console.log(this.state.nombreCategoria);

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
        .post("/productoImagen", data)
        .then(respuesta => {
          // Si se sube la imagen, almacenamos el producto
          if (respuesta.status === 200) {
            // Creamos nuestro JSON para insertar los datos
            let datos = {
              nombre: this.state.nombre,
              descripcion: this.state.descripcion,
              categoria: this.state.selectedOption.value,
              cantidad: this.state.cantidad,
              precio: this.state.precio,
              imagen: respuesta.data.imagen
            };

            // Realizamos la petición para almcenar el producto
            axiosConfig
              .post("/crearProducto", datos)
              .then(respuesta2 => {
                // Si se almacenaron los datos
                if (respuesta2.status === 200) {
                  Swal.fire("¡Agregado!", respuesta2.data.mensaje, "success");
                  window.location = "/admin/productos";
                } else {
                  Swal.fire(
                    "¡Alerta!",
                    respuesta2.response.data.mensaje,
                    "warning"
                  );
                }
              })
              // Error de ingresar producto
              .catch(error => {
                Swal.fire("¡Error!", error.response.data.mensaje, "warning");
              });
          }
        })
        // Error de imagen
        .catch(error => {
          Swal.fire("¡Error!", error.response.data.mensaje, "warning");
        });
    }
    // Si no se seleccionó la imagen
    else {
      // Creamos nuestro JSON para insertar los datos
      let datos = {
        nombre: this.state.nombre,
        descripcion: this.state.descripcion,
        categoria: this.state.selectedOption.value,
        cantidad: this.state.cantidad,
        precio: this.state.precio
      };

      // Realizamos la petición para almcenar el producto
      axiosConfig
        .post("/crearProducto", datos)
        .then(respuesta2 => {
          // Si se almacenaron los datos
          if (respuesta2.status === 200) {
            Swal.fire("¡Agregado!", respuesta2.data.mensaje, "success");
            window.location = "/admin/productos";
          } else {
            Swal.fire("¡Alerta!", respuesta2.response.data.mensaje, "warning");
          }
        })
        // Error de ingresar producto
        .catch(error => {
          Swal.fire("¡Error!", error.response.data.mensaje, "warning");
        });
    }
  }

  // Función para editar producto
  editarProducto(e) {
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
        .post("/productoImagen", data, {
          params: {
            url: this.state.laUrl
          }
        })
        .then(respuesta => {
          // Si se sube la imagen, almacenamos el producto
          if (respuesta.status === 200) {
            // Creamos nuestro JSON para insertar los datos
            var datos = {};
            if (this.state.selectedOption == null) {
              datos = {
                nombre: this.state.nombre,
                descripcion: this.state.descripcion,
                categoria: this.state.idCategoria,
                cantidad: this.state.cantidad,
                precio: this.state.precio,
                imagen: respuesta.data.imagen,
                imagenActual: this.state.imagenActual
              };
            } else {
              datos = {
                nombre: this.state.nombre,
                descripcion: this.state.descripcion,
                categoria: this.state.selectedOption.value,
                cantidad: this.state.cantidad,
                precio: this.state.precio,
                imagen: respuesta.data.imagen,
                imagenActual: this.state.imagenActual
              };
            }

            // Realizamos la petición para actualizar el producto
            axiosConfig
              .post(`/actualizarProducto/${this.state.laUrl}`, datos)
              .then(respuesta2 => {
                // Si se almacenaron los datos
                if (respuesta2.status === 200) {
                  Swal.fire(
                    "¡Actualizado!",
                    respuesta2.data.mensaje,
                    "success"
                  );
                  window.location = "/admin/productos";
                } else {
                  Swal.fire(
                    "¡Alerta!",
                    respuesta2.response.data.mensaje,
                    "warning"
                  );
                }
              })
              // Error de ingresar producto
              .catch(error => {
                Swal.fire("¡Error!", error.response.data.mensaje, "warning");
              });
          }
        })
        // Error de imagen
        .catch(error => {
          Swal.fire("¡Error!", error.response.data.mensaje, "warning");
        });
    }
    // Si no se seleccionó la imagen
    else {
      // Creamos nuestro JSON para insertar los datos
      var datos = {};
      if (this.state.selectedOption == null) {
        datos = {
          nombre: this.state.nombre,
          descripcion: this.state.descripcion,
          categoria: this.state.idCategoria,
          cantidad: this.state.cantidad,
          precio: this.state.precio,
          imagen: this.state.imagenActual,
          imagenActual: this.state.imagenActual
        };
      } else {
        datos = {
          nombre: this.state.nombre,
          descripcion: this.state.descripcion,
          categoria: this.state.selectedOption.value,
          cantidad: this.state.cantidad,
          precio: this.state.precio,
          imagen: this.state.imagenActual,
          imagenActual: this.state.imagenActual
        };
      }

      // Realizamos la petición para actualizar el producto
      axiosConfig
        .post(`/actualizarProducto/${this.state.laUrl}`, datos)
        .then(respuesta2 => {
          // Si se almacenaron los datos
          if (respuesta2.status === 200) {
            Swal.fire("¡Actualizado!", respuesta2.data.mensaje, "success");
            window.location = "/admin/productos";
          } else {
            Swal.fire("¡Alerta!", respuesta2.response.data.mensaje, "warning");
          }
        })
        // Error de ingresar producto
        .catch(error => {
          Swal.fire("¡Error!", error.response.data.mensaje, "warning");
        });
    }
  }

  cambiarEstadoProducto(estado) {
    console.log(estado);
    console.log(this.state.laUrl);
    // Está Inhabilitado
    if (estado === "Inhabilitado") {
      Swal.fire({
        title: "¿Desea habilitar el producto?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Habilitar"
      }).then(result => {
        if (result.value) {
          // Realizamos la petición
          axiosConfig
            .post(`/habilitarProducto/${this.state.laUrl}`)
            .then(respuesta => {
              if (respuesta.status === 200) {
                Swal.fire("Habilitado", respuesta.data.mensaje, "success");
                window.location = "/admin/productos";
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
        title: "¿Desea inhabilitar el producto?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Inhabilitar"
      }).then(result => {
        if (result.value) {
          // Realizamos la petición
          axiosConfig
            .post(`/inhabilitarProducto/${this.state.laUrl}`)
            .then(respuesta => {
              if (respuesta.status === 200) {
                Swal.fire("Inhabilitado", respuesta.data.mensaje, "success");
                window.location = "/admin/productos";
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
    const { selectedOption } = this.state;
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
        Header: "Categoría",
        accessor: "categoria._id",
        show: false
      },
      {
        Header: "Categoría",
        accessor: "categoria.nombre"
      },
      {
        Header: "Cantidad",
        accessor: "cantidad",
        width: 50,
        maxWidth: 50,
        minWidth: 100
      },
      {
        Header: "Precio",
        accessor: "precio",
        width: 50,
        maxWidth: 50,
        minWidth: 100
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
              {/* AQUI SE ABRE EL MODAL */}
              <Button
                className="btn-icon"
                color="info"
                type="button"
                size="sm"
                onClick={() => {
                  this.toggleModal("editarProductoModal");
                  this.cargarDatos(
                    props.original,
                    props.original.imagen,
                    props.original.categoria.nombre,
                    props.original.categoria._id
                  );
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
                      <span>PRODUCTOS</span>
                    </h2>
                  </Col>
                </Row>
              </section>

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
                            <Select
                              options={this.state.lasCategorias}
                              onChange={this.handleChangeSelect}
                            />
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
                  data={TableData}
                  filterable
                  defaultPageSize={10}
                  noDataText={"No hay datos disponibles"}
                  previousText={"Anterior"}
                  nextText={"Siguiente"}
                  pageText={"Página"}
                  ofText={"de"}
                  rowsText={"registros"}
                >
                  {(state, Productos, instance) => {
                    this.reactTable = state.pageRows.map(post => {
                      return post._original;
                    });
                    return (
                      <div>
                        {Productos()}
                        <ExportToExcel
                          TableData={this.reactTable}
                          key={TableData.id}
                        />
                      </div>
                    );
                  }}
                </ReactTable>
              </section>
            </Container>
          </section>
        </main>
        <SimpleFooter />

        {/* MODAL EDITAR PRODUCTO */}
        <Modal
          className="modal-dialog-centered modal-lg"
          isOpen={this.state.editarProductoModal}
          itemID={this.state.nombre}
          toggle={() => this.toggleModal("editarProductoModal")}
        >
          <div className="modal-header">
            <h6 className="modal-title" id="modal-title-default">
              Editar producto
            </h6>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("editarProductoModal")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          {/* Modal Body */}
          <div className="modal-body p-0">
            <Card className="bg-secondary shadow border-0">
              <CardBody className="px-lg-5 py-lg-5">
                {/* Formulario */}
                <Form onSubmit={this.editarProducto}>
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
                          value={this.state.descripcion}
                          required
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  {/* /Descripcion */}

                  {/* Categoría */}

                  {/* Categoría */}
                  <FormGroup row className={classnames("mb-3")}>
                    <Label for="categoriaPro" sm={2}>
                      Categoría
                    </Label>
                    <Col sm={10}>
                      <Select
                        options={this.state.lasCategorias}
                        onChange={this.handleChangeSelect}
                        value={{
                          label: this.state.nombreCategoria,
                          value: this.state.idCategoria
                        }}
                      />
                    </Col>
                  </FormGroup>
                  {/* /Categoria */}

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
                          value={this.state.cantidad}
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
                          value={this.state.precio}
                          required
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  {/* /Precio */}

                  {/* Estado */}
                  <FormGroup row className={classnames("mb-3")}>
                    <Label for="estadoCat" sm={2}>
                      Estado
                    </Label>
                    <Col sm={10}>
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
                        id="imagenPro"
                        type="file"
                        name="file"
                        onChange={this.onChangeHandler}
                      />
                    </InputGroup>
                  </FormGroup>
                  {/* /Imagen */}

                  {/* Opciones de footer */}
                  <div className="modal-footer  pb-1">
                    <FormGroup row className={classnames("mt-3")}>
                      {/* Cambiar estado */}
                      <Button
                        color="danger"
                        type="button"
                        className="mr-5 float-left"
                        onClick={() =>
                          this.cambiarEstadoProducto(this.state.nombreEstado)
                        }
                      >
                        {this.state.nombreEstado === "Habilitado"
                          ? "Inhabilitar"
                          : "Habilitar"}
                      </Button>

                      {/* Cambiar estado */}
                      {/* Botón agregar */}

                      <Button color="success" type="submit">
                        Editar
                      </Button>

                      {/* Botón cerrar */}

                      <Button
                        className="ml-auto"
                        color="link"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => this.toggleModal("editarProductoModal")}
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
        {/* /MODAL EDITAR */}
      </>
    );
  }
}

export default DashProductos;

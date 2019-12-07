import React from "react";
import axiosConfig from "../..//axios";
import Swal from "sweetalert2";

// nodejs library that concatenates classes
import classnames from "classnames";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  CardHeader,
  FormGroup,
  Form,
  Input,
  InputGroup,
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Modal,
  Label
} from "reactstrap";

class DashCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idCategoria: "",
      nombre: "",
      descripcion: "",
      selectedFile: null,
      imagen: ""
    };
    this.agregarCategoria = this.agregarCategoria.bind(this);
    this.editarCategoria = this.editarCategoria.bind(this);
    this.InhabilitarCategoria = this.InhabilitarCategoria.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // state = {};
  // Evento para desplegar los modales
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

  // Función para agregar una categoría
  agregarCategoria(e) {
    e.preventDefault();
    console.log("Se presionó");

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
            // Creamos nuestro JSON para insertar todos los datos
            let datos = {
              nombre: this.state.nombre,
              descripcion: this.state.descripcion,
              imagen: respuesta.data.imagen
            };

            // Realizamos la petición para almacenar categoría
            axiosConfig
              .post("/categoria", datos)
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
              // Error de ingresar categoría
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
      console.log("Aqui va");

      let datos = {
        nombre: this.state.nombre,
        descripcion: this.state.descripcion
      };

      // Realizamos la petición para almacenar categoría
      axiosConfig
        .post("/categoria", datos)
        .then(respuesta2 => {
          // Si se almacenaron los datos
          if (respuesta2.status === 200) {
            Swal.fire("¡Agregado!", respuesta2.data.mensaje, "success");
          } else {
            Swal.fire("¡Alerta!", respuesta2.response.data.mensaje, "warning");
          }
        })
        .catch(error => {
          Swal.fire("¡Alerta!", error.response.data.mensaje, "warning");
        });
    }
  }

  // Función para editar una categoría
  editarCategoria(e) {
    e.preventDefault();
    console.log("Se presionó editar");
    console.log(this.state.selectedFile);

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
          // Si se sube la nueva imagen, editamos la categoria
          if (respuesta.status === 200) {
            // Creamos nuestro JSON para editar los datos
            let datos = {
              nombre: this.state.nombre,
              descripcion: this.state.descripcion,
              imagen: respuesta.data.imagen
            };

            // Realizamos la petición para modificar la categoria
            axiosConfig
              .put("/editarCategoria", datos)
              .then(respuesta2 => {
                // Si se modificaron los datos
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
              // Error al modificar categoria
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
        descripcion: this.state.descripcion,
        imagen: this.state.imagen
      };

      // Realizamos la petición para modificar la categoria
      axiosConfig
        .put("/editarCategoria", datos)
        .then(respuesta2 => {
          // Si se modificaron los datos
          if (respuesta2.status === 200) {
            Swal.fire("¡Agregado!", respuesta2.data.mensaje, "success");
          } else {
            Swal.fire("¡Alerta!", respuesta2.response.data.mensaje, "warning");
          }
        })
        // Error al modificar categoria
        .catch(error => {
          Swal.fire("¡Alerta!", error.response.data.mensaje, "warning");
        });
    }
  }

  // Función para eliminar una categoría
  InhabilitarCategoria(e) {
    Swal.fire({
      title: "¿Desea inhabilitar una categoría?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Inhabilitar"
    }).then(result => {
      if (result.value) {
        Swal.fire(
          "¡Inhabilitado!",
          "La categoría se ha inhabilitado.",
          "success"
        );
      }
    });
  }

  render() {
    return (
      <>
        <main ref="main">
          <Container className="mt-4">
            <Row className="align-items-center">
              <Col lg="12">
                <Card>
                  <CardHeader>
                    <Row>
                      <Col xs="8">
                        <h5>Categorías</h5>
                      </Col>

                      <Col xs="4" className="text-right">
                        {/* Botón agregar categoría */}
                        <Button
                          className="btn-icon"
                          color="default"
                          type="button"
                          onClick={() => this.toggleModal("defaultModal")}
                        >
                          <span className="btn-inner--icon mr-1">
                            <i className="ni ni-fat-add" />
                          </span>
                          <span className="btn-inner--text">Agregar</span>
                        </Button>

                        {/* Modal agregar categoria */}
                        <Modal
                          className="modal-dialog-centered"
                          isOpen={this.state.defaultModal}
                          toggle={() => this.toggleModal("defaultModal")}
                        >
                          <div className="modal-header">
                            <h6
                              className="modal-title"
                              id="modal-title-default"
                            >
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
                                    <FormGroup
                                      row
                                      className={classnames("mt-3")}
                                    >
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
                                          this.toggleModal("defaultModal")
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
                        {/* /Modal agregar categoria */}
                      </Col>
                      {/* /agregar categoria */}
                    </Row>
                  </CardHeader>

                  {/* Lista de categorías */}
                  <CardBody>
                    <ListGroup>
                      <ListGroupItem className="mb-3">
                        <Row>
                          <Col xs={{ size: "auto" }}>
                            <img
                              alt="..."
                              className="img-fluid rounded shadow"
                              src={require("assets/img/theme/team-1-800x800.jpg")}
                              style={{ width: "80px" }}
                            />
                          </Col>
                          <Col className="ml--2">
                            <h4>Nombre</h4>
                            <span className="text-success">●</span>
                            <small>La descripción</small>
                          </Col>
                          <br />
                          <Col
                            xs={{ size: "auto" }}
                            className="align-items-left pr-5"
                          >
                            <Row>
                              {/* Botón editar categoría */}
                              <Button
                                color="primary"
                                size="sm"
                                type="button"
                                onClick={() =>
                                  this.toggleModal("editarCategoria")
                                }
                              >
                                <span className="btn-inner--icon mr-2">
                                  <i className="ni ni-ruler-pencil" />
                                </span>
                                <span className="btn-inner--text">Editar</span>
                              </Button>

                              {/* Modal editr categoria */}
                              <Modal
                                className="modal-dialog-centered"
                                isOpen={this.state.editarCategoria}
                                toggle={() =>
                                  this.toggleModal("editarCategoria")
                                }
                              >
                                <div className="modal-header">
                                  <h6
                                    className="modal-title"
                                    id="modal-title-default"
                                  >
                                    Modificar categoría
                                  </h6>
                                  <button
                                    aria-label="Close"
                                    className="close"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={() =>
                                      this.toggleModal("editarCategoria")
                                    }
                                  >
                                    <span aria-hidden={true}>×</span>
                                  </button>
                                </div>
                                <div className="modal-body p-0">
                                  <Card className="bg-secondary shadow border-0">
                                    <CardBody className="px-lg-5 py-lg-5">
                                      {/* Formulario */}
                                      <Form onSubmit={this.editarCategoria}>
                                        {/* Nombre */}
                                        <FormGroup
                                          row
                                          className={classnames("mb-3")}
                                        >
                                          <Label for="nombreCat" sm={4}>
                                            Nombre
                                          </Label>
                                          <Col sm={8}>
                                            <InputGroup className="input-group-alternative">
                                              <Input
                                                id="nombreCat"
                                                type="text"
                                                name="nombre"
                                                //value=""
                                                required
                                                onChange={this.handleChange}
                                              />
                                            </InputGroup>
                                          </Col>
                                        </FormGroup>
                                        {/* / Nombre */}

                                        {/* Descripción */}
                                        <FormGroup
                                          row
                                          className={classnames("mb-3")}
                                        >
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
                                                //value=""
                                                required
                                                onChange={this.handleChange}
                                              />
                                            </InputGroup>
                                          </Col>
                                        </FormGroup>
                                        {/* /Descripción */}

                                        {/* Imagen */}
                                        <FormGroup
                                          row
                                          className={classnames("mb-3")}
                                        >
                                          <InputGroup className="input-group-alternative">
                                            <Input
                                              id="imagenEditarCat"
                                              type="file"
                                              name="file"
                                              onChange={this.onChangeHandler}
                                            />
                                          </InputGroup>
                                        </FormGroup>
                                        {/* /Imagen */}

                                        <div className="modal-footer  pb-1">
                                          <FormGroup
                                            row
                                            className={classnames("mt-3")}
                                          >
                                            {/* Botón editar */}
                                            <Button
                                              color="success"
                                              type="submit"
                                            >
                                              Editar
                                            </Button>
                                            {/* Botón cerrar */}
                                            <Button
                                              className="ml-auto"
                                              color="link"
                                              data-dismiss="modal"
                                              type="button"
                                              onClick={() =>
                                                this.toggleModal(
                                                  "editarCategoria"
                                                )
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
                            </Row>
                            <br />
                            <Row>
                              <Button
                                color="danger"
                                size="sm"
                                type="button"
                                onClick={this.InhabilitarCategoria}
                              >
                                <span className="btn-inner--icon mr-2">
                                  <i className="ni ni-fat-delete" />
                                </span>
                                <span className="btn-inner--text">
                                  Eliminar
                                </span>
                              </Button>
                            </Row>
                          </Col>
                        </Row>
                      </ListGroupItem>
                      {/* Quitar cuando haya ciclo */}
                      <ListGroupItem>
                        <Row>
                          <Col xs={{ size: "auto" }}>
                            <img
                              alt="..."
                              className="img-fluid rounded shadow"
                              src={require("assets/img/theme/team-1-800x800.jpg")}
                              style={{ width: "80px" }}
                            />
                          </Col>
                          <Col className="ml--2">
                            <h4>Nombre</h4>
                            <span className="text-success">●</span>
                            <small>La descripción</small>
                          </Col>
                          <br />
                          <Col
                            xs={{ size: "auto" }}
                            className="align-items-left pr-5"
                          >
                            <Row>
                              <Button color="primary" size="sm" type="button">
                                Editar
                              </Button>
                            </Row>
                            <br />
                            <Row>
                              <Button color="danger" size="sm" type="button">
                                Eliminar
                              </Button>
                            </Row>
                          </Col>
                        </Row>
                      </ListGroupItem>
                      {/* Quitar cuando haya ciclo */}
                    </ListGroup>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </main>
      </>
    );
  }
}
export default DashCard;

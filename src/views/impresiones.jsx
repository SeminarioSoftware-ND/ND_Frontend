import React from "react";
import classnames from "classnames";
import Select from "react-select";
import axiosConfig from "../axios";
import Swal from "sweetalert2";

// reactstrap components
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Button,
  CardFooter,
  FormGroup,
  Form,
  Input,
  InputGroup,
  Label
} from "reactstrap";

// Componentes
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import SimpleFooter from "components/Footers/SimpleFooter.jsx";

// Arreglos para las opciones de select
const optionsColor = [
  { value: "Blanco/Negro", label: "Blanco/Negro" },
  { value: "Color", label: "Color" }
];

// Arreglos para las opciones de select
const tamanio = [
  { value: "Carta", label: "Carta" },
  { value: "Legal", label: "Legal" },
  { value: "Oficio", label: "Oficio" }
];

// Arreglos para las opciones de select
const tipoHoja = [
  { value: "Papel Bond", label: "Papel Bond" },
  { value: "Cartulina lino", label: "Cartulina lino" },
  { value: "Cartulina opalina", label: "Cartulina opalina" },
  { value: "Papel fotográfico", label: "Papel fotográfico" },
  { value: "Papel sticker", label: "Papel sticker" }
];

class Impresiones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombreDocumento: "",
      selectedFile: null,
      selectedColor: "",
      selectedTamanio: "",
      selectedTipoHoja: "",
      cantidadDeHojas: 0,
      especificaciones: ""
    };
    // Funciones para que funcionen en el CallBack
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSelectColor = this.handleChangeSelectColor.bind(this);
    this.handleChangeSelectTamanio = this.handleChangeSelectTamanio.bind(this);
    this.handleChangeSelectTipoHoja = this.handleChangeSelectTipoHoja.bind(
      this
    );
    this.subirDocumento = this.subirDocumento.bind(this);
  }
  // Componente que carga al renderizar la página
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
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

  // Seleccionar el color
  handleChangeSelectColor = selectedColor => {
    this.setState({ selectedColor: selectedColor.value });
    console.log("Opcion seleccionada: " + selectedColor.value);
  };

  // Seleccionar el tamanio
  handleChangeSelectTamanio = selectedTamanio => {
    this.setState({ selectedTamanio: selectedTamanio.value });
    console.log("Opcion seleccionada: " + selectedTamanio.value);
  };

  // Seleccionar el tipo Hoja
  handleChangeSelectTipoHoja = selectedTipoHoja => {
    this.setState({ selectedTipoHoja: selectedTipoHoja.value });
    console.log("Opcion seleccionada: " + selectedTipoHoja.value);
  };

  // Evento para atrapar el archivo que se está subiendo
  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
    console.log("si entró aquí");
  };

  // Función para subir archivos
  subirDocumento(e) {
    e.preventDefault();

    // Creamos una variable para recoger el archivo a subir
    const data = new FormData();
    data.append("file", this.state.selectedFile, this.state.selectedFile.name);

    // Realizamos la petición para insertar el documento
    axiosConfig
      .post("/subirArchivo", data)
      .then(respuesta => {
        // Si se sube el archivo, almacenamos la información de la petición
        if (respuesta.status === 200) {
          // Creamos nuestro JSON para insertar los datos
          console.log(respuesta.data.imagen);
          let datos = {
            documento: respuesta.data.imagen,
            color: this.state.selectedColor,
            tamanio: this.state.selectedTamanio,
            tipoHoja: this.state.selectedTipoHoja,
            cantidadHojas: this.state.cantidadDeHojas,
            especificaciones: this.state.especificaciones
          };

          // Realizamos la petición para almacenamos la información de la petición
          axiosConfig.post("/nuevaImpresion", datos).then(respuesta2 => {
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
          });
          // Error de ingresar información
          // .catch(error => {
          //   Swal.fire("¡Error!", error.response.data.mensaje, "warning");
          // });
        }
      })
      // Error de imagen
      .catch(error => {
        Swal.fire("¡Error!", error.response.data.mensaje, "warning");
      });
  }

  render() {
    return (
      <>
        {/* Llamos a la barra de navegación */}
        <IndexNavbar />
        <main ref="main">
          <div className="position-relative">
            {/* shape Hero */}
            <section className="section section-lg section-shaped pb-250">
              <div className="shape shape-style-1 shape-default">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <Container className="py-lg-md d-flex">
                {/* Encabezado */}
                <div className="col px-0">
                  <Row>
                    <Col lg="6">
                      <h1 className="display-3 text-white">
                        ¿Necesitas impresiones o copias?
                      </h1>
                      <p className="lead text-white">
                        ¡Envíanos tus documentos!
                      </p>
                    </Col>
                  </Row>
                </div>
              </Container>
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
          </div>

          {/* Tarjetas de contacto */}
          <section className="section section-lg pt-lg-0 mt--200">
            <Container>
              <Row className="justify-content-center">
                <Col lg="12">
                  <Row className="row-grid">
                    <Col
                      lg="4"
                      className="align-items-center justify-content-center text-center"
                    >
                      <Card className="shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-primary icon-lg shadow rounded-circle text-primary">
                            <i className="ni ni-archive-2 text-center" />
                          </div>
                          <h5 className="text-primary text-uppercase mt-4">
                            Seguro
                          </h5>
                        </CardBody>
                      </Card>
                    </Col>

                    <Col
                      lg="4"
                      className="align-items-center justify-content-center text-center"
                    >
                      <Card className="shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-success icon-lg shadow rounded-circle text-success">
                            <i className="ni ni-cloud-download-95 text-center" />
                          </div>
                          <h5 className="text-success text-uppercase mt-4">
                            Confiable
                          </h5>
                        </CardBody>
                      </Card>
                    </Col>

                    <Col
                      lg="4"
                      className="align-items-center justify-content-center text-center"
                    >
                      <Card className="shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-danger icon-lg shadow rounded-circle text-danger">
                            <i className="ni ni-delivery-fast text-center" />
                          </div>
                          <h5 className="text-danger text-uppercase mt-4">
                            Rápido
                          </h5>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>

          {/* Sección formulario de impresiones */}
          <section className="section">
            <Container>
              <Row className="justify-content-center">
                <Col lg="12">
                  {/* Impresiones */}
                  <h2 className="mb-3 text-center">
                    <span>IMPRESIONES</span>
                  </h2>
                </Col>
                {/* Card */}
                <Col lg="10">
                  <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                      <Form onSubmit={this.subirDocumento}>
                        {/* Documento */}
                        <FormGroup row className={classnames("mb-3")}>
                          <Label for="documento" sm={2}>
                            Documento
                          </Label>
                          <Col sm={10}>
                            <InputGroup className="input-group-alternative">
                              <Input
                                type="file"
                                name="file"
                                onChange={this.onChangeHandler}
                                required
                              />
                            </InputGroup>
                          </Col>
                        </FormGroup>
                        {/* /Documento */}

                        {/* Color */}
                        <FormGroup row className={classnames("mb-3")}>
                          <Label for="color" sm={2}>
                            Color
                          </Label>
                          <Col sm={10}>
                            <Select
                              options={optionsColor}
                              name="color"
                              onChange={this.handleChangeSelectColor}
                              required
                            />
                          </Col>
                        </FormGroup>
                        {/* Color */}

                        {/* Tamaño*/}
                        <FormGroup row className={classnames("mb-3")}>
                          <Label for="tamanio" sm={2}>
                            Tamaño
                          </Label>
                          <Col sm={10}>
                            <Select
                              options={tamanio}
                              onChange={this.handleChangeSelectTamanio}
                              required
                            />
                          </Col>
                        </FormGroup>
                        {/* Tamaño */}

                        {/* Tipo Hoja */}
                        <FormGroup row className={classnames("mb-3")}>
                          <Label for="tipoHoja" sm={2}>
                            Tipo Hoja
                          </Label>
                          <Col sm={10}>
                            <Select
                              options={tipoHoja}
                              onChange={this.handleChangeSelectTipoHoja}
                              required
                            />
                          </Col>
                        </FormGroup>
                        {/* Tipo Hoja */}

                        {/* Cantidad */}
                        <FormGroup row className={classnames("mb-3")}>
                          <Label for="cantidadPro" sm={2}>
                            Cantidad de páginas
                          </Label>
                          <Col sm={10}>
                            <InputGroup className="input-group-alternative">
                              <Input
                                id="cantidadPro"
                                type="number"
                                step="1"
                                min="1"
                                max="500"
                                pattern="^[0-9]"
                                name="cantidadDeHojas"
                                required
                                onChange={this.handleChange}
                              />
                            </InputGroup>
                          </Col>
                        </FormGroup>
                        {/* /Cantidad */}

                        {/* Especificaciones */}
                        <FormGroup row className={classnames("mb-3")}>
                          <Label for="descripcionCatEditar" sm={2}>
                            Detalles
                          </Label>
                          <Col sm={10}>
                            <InputGroup className="form-control-alternative">
                              <Input
                                id="descripcionCatEditar"
                                rows="3"
                                type="textarea"
                                name="especificaciones"
                                onChange={this.handleChange}
                              />
                            </InputGroup>
                          </Col>
                        </FormGroup>
                        {/* /Especificaciones */}

                        {/* Botón enviar */}
                        <div className="text-center">
                          <Button
                            className="mt-4"
                            color="success"
                            type="submit"
                          >
                            Subir documento
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
          {/* Tarjetas de contacto */}
          <SimpleFooter />
        </main>
      </>
    );
  }
}

export default Impresiones;

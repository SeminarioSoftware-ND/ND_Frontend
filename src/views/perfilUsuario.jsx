import React from "react";
import axiosConfig from "../axios";
import Swal from "sweetalert2";

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
import DashNavbar from "components/Navbars/DashNavbar.jsx";
import SimpleFooter from "components/Footers/SimpleFooter.jsx";

class perfilUsuario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      apellido: "",
      correo: "",
      selectedFile: null,
      imagen: ""
    };

    this.editarUsuario = this.editarUsuario.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
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

  // Evento para atrapar la imagen seleccionada
  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  };

  // Evento para editar el usuario
  editarUsuario = e => {
    e.preventDefault();

    // Si el usuario selecciona una imagen
    if (this.state.selectedFile !== null) {
      // Creamos una variable para recoger la imagen
      const data = new FormData();
      data.append(
        "file",
        this.state.selectedFile,
        this.state.selectedFile.name
      );

      // Realiazamos la petición para la imagen
      axiosConfig
        .post("/usuarioImagen", data)
        .then(respuesta => {
          // Si se sube la imagen, editamos el usuario
          if (respuesta.status === 200) {
            // Creamos nuestro JSON para insertar todos los datos
            let datos = {
              nombre: this.state.nombre,
              apellido: this.state.apellido,
              correo: this.state.correo,
              password: this.state.password,
              imagen: respuesta.data.imagen
            };

            // Realizamos la petición de editar usuario
            axiosConfig
              .put("/editarUsuario", datos)
              .then(respuesta2 => {
                // Si se actualizaron los datos
                if (respuesta2.status === 200) {
                  Swal.fire("!Agregado¡", respuesta2.data.mensaje, "success");
                } else {
                  Swal.fire(
                    "¡Alerta!",
                    respuesta2.response.data.mensaje,
                    "warning"
                  );
                }
              })
              // Error de actualizar usuario
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
      // Creamos JSON para enviar los datos
      let datos = {
        nombre: this.state.nombre,
        apellido: this.state.apellido,
        correo: this.state.correo,
        password: this.state.password,
        imagen: this.state.imagen
      };

      // Realizamos la petición de editar usuario
      axiosConfig
        .put("/editarUsuario", datos)
        .then(respuesta2 => {
          // Si se actualizaron los datos
          if (respuesta2.status === 200) {
            Swal.fire("!Agregado¡", respuesta2.data.mensaje, "success");
          } else {
            Swal.fire("¡Alerta!", respuesta2.response.data.mensaje, "warning");
          }
        })
        // Error de actualizar usuario
        .catch(error => {
          Swal.fire("¡Alerta!", error.response.data.mensaje, "warning");
        });
    }
  };

  render() {
    return (
      <>
        <DashNavbar />
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
                        <a href="https://google.com">
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
                      Sonia Villeda <span className="font-weight-light"></span>
                    </h2>

                    <div className="h5 mt-2">
                      <i className="ni business_briefcase-24 mr-2" />
                      sovilleda07@gmail.com
                    </div>
                  </div>
                  {/* Información actual */}

                  {/* Editar perfil */}
                  <div className="mt-5 py-5 border-top">
                    <Row className="justify-content-center">
                      <Col lg="8">
                        <div className="text-left mt-1">
                          <h3>
                            EDITAR PERFIL
                            <span className="font-weight-light"></span>
                          </h3>
                        </div>
                        <hr />

                        {/* Formulario */}
                        <Form onSubmit={this.editarUsuario}>
                          {/* Nombre */}
                          <small className="d-block text-uppercase font-weight-bold mb-3">
                            Nombre
                          </small>
                          <FormGroup className="focused">
                            <InputGroup className="input-group-alternative mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-single-02" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                id="nombre"
                                placeholder="Ingresa tu nombre"
                                type="text"
                                name="nombre"
                                // value=""
                                required
                                onChange={this.handleChange}
                              />
                            </InputGroup>
                          </FormGroup>
                          {/* /Nombre */}

                          {/* Apellido */}
                          <small className="d-block text-uppercase font-weight-bold mb-3 mt-4">
                            Apellido
                          </small>
                          <FormGroup className="focused">
                            <InputGroup className="input-group-alternative mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-single-02" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                id="apellido"
                                placeholder="Ingresa tu apellido"
                                type="text"
                                name="apellido"
                                // value=""
                                required
                                onChange={this.handleChange}
                              />
                            </InputGroup>
                          </FormGroup>
                          {/* /Apellido */}

                          {/* Email */}
                          <small className="d-block text-uppercase font-weight-bold mb-3 mt-4">
                            Correo electrónico
                          </small>
                          <FormGroup className="focused">
                            <InputGroup className="input-group-alternative mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-email-83" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                id="correo"
                                placeholder="Ingresa tu correo electrónico"
                                type="email"
                                name="correo"
                                //value =""
                                required
                                onChange={this.handleChange}
                              />
                            </InputGroup>
                          </FormGroup>
                          {/* /Email */}

                          {/* Imagen */}
                          <small className="d-block text-uppercase font-weight-bold mb-3 mt-4">
                            Imagen del perfil
                          </small>
                          <FormGroup>
                            <InputGroup className="input-group-alternative">
                              <Input
                                type="file"
                                name="file"
                                onChange={this.onChangeHandler}
                              />
                            </InputGroup>
                          </FormGroup>
                          {/* /Imagen */}

                          {/* Botón Registrarse */}
                          <div className="text-center">
                            <Button
                              className="mt-4"
                              color="primary"
                              type="submit"
                            >
                              Editar
                            </Button>
                          </div>
                        </Form>
                      </Col>
                    </Row>
                  </div>
                  {/* Editar perfil */}
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
export default perfilUsuario;

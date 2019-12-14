/*!

=========================================================
* Argon Design System React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link } from "react-router-dom";
import axiosConfig from "../axios";
import Swal from "sweetalert2";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.jsx";

class CrearCuenta extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      apellido: "",
      correo: "",
      password: "",
      confirmPassword: "",
      selectedFile: null,
      imagen: ""
    };

    this.agregarUsuario = this.agregarUsuario.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
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

  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  };

  // Evento para agregar un usuario
  agregarUsuario = e => {
    // console.log("En el botón agregar " + this.state);
    e.preventDefault();

    // Si el usuario si selecciona una imagen
    if (this.state.selectedFile !== null) {
      // Creamos una variable para recoger la imagen
      const data = new FormData();
      data.append(
        "file",
        this.state.selectedFile,
        this.state.selectedFile.name
      );

      // Realizamos la petición para la imagen
      axiosConfig
        .post(`/usuarioImagen`, data, {
          onUploadProgress: ProgressEvent => {
            console.log(
              "Upload Progress: " +
                Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
                "%"
            );
          }
        })
        .then(respuesta => {
          // Si se sube la imagen, almacenamos el usuario
          if (respuesta.status === 200) {
            // Creamos nuestro JSON para insertar todos los datos
            let datos = {
              nombre: this.state.nombre,
              apellido: this.state.apellido,
              correo: this.state.correo,
              password: this.state.password,
              confirmarPassword: this.state.confirmPassword,
              imagen: respuesta.data.imagen
            };

            // Realiazmos la petición de almacenar usuario
            axiosConfig
              .post(`/usuarios`, datos)
              .then(respuesta2 => {
                // Si se almacenaron los datos
                if (respuesta2.status === 200) {
                  Swal.fire("¡Agregado!", respuesta2.data.mensaje, "success");
                  window.location = "/iniciarSesion";
                } else {
                  Swal.fire(
                    "¡Alerta!",
                    respuesta2.response.data.mensaje,
                    "warning"
                  );
                }
              })
              // Error de ingresar usuario
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
    // Si no se seleccionó imagen
    else {
      // Creamos JSON para enviar los datos
      let datos = {
        nombre: this.state.nombre,
        apellido: this.state.apellido,
        correo: this.state.correo,
        password: this.state.password,
        confirmarPassword: this.state.confirmPassword
      };

      // petición de almacenar usuario
      axiosConfig
        .post(`/usuarios`, datos)
        .then(respuesta2 => {
          if (respuesta2.status === 200) {
            Swal.fire("!Agregado¡", respuesta2.data.mensaje, "success");
            window.location = "/iniciarSesion";
          } else {
            Swal.fire("¡Alerta!", respuesta2.response.data.mensaje, "warning");
          }
        })
        .catch(error => {
          console.log(error.response);
          Swal.fire("¡Error!", error.response.data[0].mensaje, "warning");
        });
    }
  };

  render() {
    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="pt-lg-md">
              <Row className="justify-content-center">
                <Col lg="6">
                  <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-white pb-2">
                      <div className="text-muted text-center mb-3">
                        <h3>REGISTRARSE</h3>
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <Form onSubmit={this.agregarUsuario}>
                        {/* Nombre */}
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-single-02" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              id="nombre"
                              placeholder="Nombre"
                              type="text"
                              name="nombre"
                              required
                              onChange={this.handleChange}
                            />
                          </InputGroup>
                        </FormGroup>
                        {/* /Nombre */}
                        {/* Apellido */}
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-single-02" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              id="apellido"
                              placeholder="Apellido"
                              type="text"
                              name="apellido"
                              required
                              onChange={this.handleChange}
                            />
                          </InputGroup>
                        </FormGroup>
                        {/* /Apellido */}
                        {/* Email */}
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              id="correo"
                              placeholder="Correo electrónico"
                              type="email"
                              name="correo"
                              required
                              onChange={this.handleChange}
                            />
                          </InputGroup>
                        </FormGroup>
                        {/* /Email */}
                        {/* Password */}
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              id="password"
                              placeholder="Contraseña"
                              type="password"
                              autoComplete="off"
                              name="password"
                              required
                              onChange={this.handleChange}
                            />
                          </InputGroup>
                        </FormGroup>
                        {/* /Password */}
                        {/* Confirm Password */}
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Confirmar contraseña"
                              type="password"
                              autoComplete="off"
                              name="confirmPassword"
                              required
                              onChange={this.handleChange}
                            />
                          </InputGroup>
                        </FormGroup>
                        {/* /Confirm Password */}

                        {/* Imagen */}
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
                            // onClick={() => this.Guardar()}
                          >
                            Crear cuenta
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>

                  <Row className="mt-3">
                    <Col className="text-light text-center" xs="12">
                      <Link to="/">
                        <small>Iniciar sesión</small>
                      </Link>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      </>
    );
  }
}

export default CrearCuenta;

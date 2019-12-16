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
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import SimpleFooter from "components/Footers/SimpleFooter.jsx";

class IniciarSesion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correo: "",
      password: ""
    };
    this.acceder = this.acceder.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  // Login
  acceder(e) {
    e.preventDefault();
    console.log("click");
    let datos = {
      email: this.state.correo,
      password: this.state.password
    };
    axiosConfig.post("/autenticarUsuario", datos).then(respuesta => {
      console.log(respuesta);
      if (respuesta.status === 200) {
        // Mostramos el mensaje de bienvenida
        Swal.fire("Control de acceso", respuesta.data.mensaje, "success");
        // Creamos otro item en el Local Storage con el estado de autorización del usuario
        localStorage.setItem("autorizado", "true");
        // Guardamos los datos generales
        localStorage.setItem("usuarioCorreo", respuesta.data.email);
        localStorage.setItem("usuarioNombre", respuesta.data.usuario);
        // Redireccionamos
        if (respuesta.data.admin === 0) {
          window.location = "/admin";
        } else {
          window.location = "/";
        }
      } else {
        // Mostramos mensaje de error
        Swal.fire("Error", respuesta.data.mensaje, "success");
        // Redireccionamos a el login
        window.location = "/iniciarSesion";
      }
    });
    // .catch(error => {
    //   Swal.fire("Error", error.response.data.mensaje, "warning");
    // });
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <IndexNavbar />
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
                        <h3>INICIAR SESIÓN</h3>
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <Form onSubmit={this.acceder}>
                        {/* Email */}
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
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
                              placeholder="Contraseña"
                              type="password"
                              autoComplete="off"
                              name="password"
                              onChange={this.handleChange}
                            />
                          </InputGroup>
                        </FormGroup>
                        {/* /Password */}

                        {/* Botón Registrarse */}
                        <div className="text-center">
                          <Button
                            className="mt-4"
                            color="primary"
                            type="submit"
                          >
                            Ingresar
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>

                  <Row className="mt-3">
                    <Col className="text-right text-light" xs="12">
                      <Link to="/crearCuenta">
                        <small>Crear cuenta</small>
                      </Link>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
          <SimpleFooter />
        </main>
      </>
    );
  }
}

export default IniciarSesion;

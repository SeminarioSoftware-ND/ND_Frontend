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
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
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
                      <Form role="form">
                        {/* Nombre */}
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-single-02" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Nombre"
                              type="text"
                              name="nombre"
                              required
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
                              placeholder="Apellido"
                              type="text"
                              name="apellido"
                              required
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
                              placeholder="Correo electrónico"
                              type="email"
                              name="correo"
                              required
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
                              required
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
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                        {/* /Confirm Password */}

                        {/* Imagen */}
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <Input type="file" name="imagen" id="exampleFile" />
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
                            Crear cuenta
                          </Button>
                        </div>
                      </Form>

                      <div className="text-center m-3">
                        <Link to="/">
                          <small>Iniciar sesión</small>
                        </Link>
                      </div>
                    </CardBody>
                  </Card>
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

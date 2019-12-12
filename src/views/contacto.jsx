import React from "react";

// reactstrap components
import { Card, CardBody, Container, Row, Col } from "reactstrap";

// Componentes
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import SimpleFooter from "components/Footers/SimpleFooter.jsx";

class Contacto extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
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
                        ¿Tienes alguna pregunta?
                        <span>Contáctanos</span>
                      </h1>
                      <p className="lead text-white">
                        Estamos dispuestos a proveer información y contestar
                        todas tus dudas
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
                    {/* Ubicación */}
                    <Col
                      lg="4"
                      className="align-items-center justify-content-center text-center"
                    >
                      <Card className="shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-primary icon-lg shadow rounded-circle text-primary">
                            <i className="ni ni-square-pin text-center" />
                          </div>
                          <h5 className="text-primary text-uppercase mt-2">
                            DIRECCIÓN
                          </h5>
                          <p className="description mt-3">
                            Siguatepeque, Comayagua.
                          </p>
                        </CardBody>
                      </Card>
                    </Col>

                    {/* Email */}
                    <Col
                      lg="4"
                      className="align-items-center justify-content-center text-center"
                    >
                      <Card className="shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-success icon-lg shadow rounded-circle text-success">
                            <i className="ni ni-email-83 text-center" />
                          </div>
                          <h5 className="text-success text-uppercase mt-2">
                            CORREO ELECTRÓNICO
                          </h5>
                          <p className="description mt-3">
                            novedadesdaniela1@gmail.com
                          </p>
                        </CardBody>
                      </Card>
                    </Col>

                    {/* Teléfono */}
                    <Col
                      lg="4"
                      className="align-items-center justify-content-center text-center"
                    >
                      <Card className="shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-danger icon-lg shadow rounded-circle text-danger">
                            <i className="ni ni-mobile-button text-center" />
                          </div>
                          <h5 className="text-danger text-uppercase mt-2">
                            Teléfono
                          </h5>
                          <p className="description mt-3">+504 2773-5409</p>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
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

export default Contacto;

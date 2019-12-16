import React from "react";

// reactstrap components
import { Container, Row, Col, Badge } from "reactstrap";

// Componentes
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import SimpleFooter from "components/Footers/SimpleFooter.jsx";
import DashHero from "./IndexSections/DashHero.jsx";

class Acerca extends React.Component {
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
          <DashHero
            mensaje="¡BIENVENIDO A NUESTRA TIENDA!"
            imagen="Logo Blanco ND.png"
          />
          {/* Intro */}

          {/* Valores */}
          <section className="section">
            <Container>
              <Col lg="12">
                {/* Pedidos Pendientes */}
                <h2 className="mb-3 text-center">
                  <span>¿QUIÉNES SOMOS?</span>
                </h2>
                <h5 className="text-justify">
                  Nos dedicamos al rubro de la comercialización de productos
                  escolares y servicios secretariales personalizados, con un
                  amplio surtido de mercadería escolar, productos tecnológicos y
                  asesorías para adquirir documentos personales; orientados a
                  cumplir con los más altos requisitos de la comunidad
                  estudiantil y demás personas en general.
                </h5>
              </Col>
              <Row className="row-grid align-items-center">
                <Col className="order-md-2" md="6">
                  <img
                    alt="..."
                    className="img-fluid floating"
                    src={require("assets/img/theme/promo-1.png")}
                  />
                </Col>
                <Col className="order-md-1" md="6">
                  <div className="pr-md-5">
                    <div className="icon icon-lg icon-shape icon-shape-success shadow rounded-circle mb-5">
                      <i className="ni ni-shop" />
                    </div>
                    <h3>Principios y valores</h3>

                    <ul className="list-unstyled mt-5">
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div>
                            <Badge
                              className="badge-circle mr-3"
                              color="success"
                            >
                              <i className="ni ni-settings-gear-65" />
                            </Badge>
                          </div>
                          <div>
                            <h6 className="mb-0">Puntualidad</h6>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div>
                            <Badge
                              className="badge-circle mr-3"
                              color="success"
                            >
                              <i className="ni ni-html5" />
                            </Badge>
                          </div>
                          <div>
                            <h6 className="mb-0">Calidad</h6>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div>
                            <Badge
                              className="badge-circle mr-3"
                              color="success"
                            >
                              <i className="ni ni-satisfied" />
                            </Badge>
                          </div>
                          <div>
                            <h6 className="mb-0">Ética</h6>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div>
                            <Badge
                              className="badge-circle mr-3"
                              color="success"
                            >
                              <i className="ni ni-satisfied" />
                            </Badge>
                          </div>
                          <div>
                            <h6 className="mb-0">Comunicación</h6>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div>
                            <Badge
                              className="badge-circle mr-3"
                              color="success"
                            >
                              <i className="ni ni-satisfied" />
                            </Badge>
                          </div>
                          <div>
                            <h6 className="mb-0">Trabajo en equipo</h6>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          {/* Misión */}
          <section className="section bg-secondary">
            <Container>
              <Row className="row-grid align-items-center mt-4">
                <Col md="6">
                  <div className="pl-md-5">
                    <div className="icon icon-lg icon-shape icon-shape-warning shadow rounded-circle mb-5">
                      <i className="ni ni-world-2" />
                    </div>
                    <h3>Misión</h3>
                    <p className="lead text-justify">
                      Proporcionar a nuestros clientes, los mejores productos
                      escolares y servicios secretariales; garantizando rapidez,
                      eficiencia y precios razonables, de esta manera contribuir
                      al desarrollo de nuestra comunidad.
                    </p>
                  </div>
                </Col>
                <Col md="6">
                  <div className="pl-md-5">
                    <div className="icon icon-lg icon-shape icon-shape-warning shadow rounded-circle mb-5">
                      <i className="ni ni-bulb-61" />
                    </div>
                    <h3>Visión</h3>
                    <p className="lead text-justify">
                      Para el 2022, posicionarnos como una empresa líder en
                      servicios secretariales, productos escolares con el más
                      amplio surtido y variedad, satisfaciendo al cliente de
                      manera permanente, logrando presencia a nivel nacional.
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          <section className="section"></section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Acerca;

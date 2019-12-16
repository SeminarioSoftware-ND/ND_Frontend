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

// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import DashHero from "./IndexSections/DashHero.jsx";
import CardsProductos from "./IndexSections/CardsProductosIndex.jsx";
import SimpleFooter from "components/Footers/SimpleFooter.jsx";

// index page sections

import Icons from "./IndexSections/Icons.jsx";

class IndexCliente extends React.Component {
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
          <CardsProductos />
          <section className="section section-lg bg-gradient-default">
            <Container className="pt-lg pb-300">
              <Row className="text-center justify-content-center mt-2">
                <Col lg="10">
                  <h2 className="display-3 text-white">
                    Haciendo la diferencia
                  </h2>
                  <p className="lead text-white">
                    Buscamos siempre la innovación de nuestros productos y
                    servicios, la satisfacción del cliente es nuestro principal
                    objetivo.
                  </p>
                </Col>
              </Row>
              <Row className="row-grid mt-5">
                <Col lg="4">
                  <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                    <i className="ni ni-settings text-primary" />
                  </div>
                  <h5 className="text-white mt-3">Próximamente</h5>
                  <p className="text-white mt-3">
                    Podremos reparar tus dispositivos electrónicos de manera
                    segura y confiable
                  </p>
                </Col>
                <Col lg="4">
                  <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                    <i className="ni ni-ruler-pencil text-primary" />
                  </div>
                  <h5 className="text-white mt-3">Asesoría</h5>
                  <p className="text-white mt-3">
                    Te ayudamos con tus tareas, investigaciones, informes y
                    tesis.
                  </p>
                </Col>
                <Col lg="4">
                  <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                    <i className="ni ni-air-baloon text-primary" />
                  </div>
                  <h5 className="text-white mt-3">Somos tu solución</h5>
                  <p className="text-white mt-3">
                    Contamos con disponibilidad de horarios y personal
                    capacitado.
                  </p>
                </Col>
              </Row>
            </Container>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew zindex-100">
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

          <section className="section section-components"></section>
          <Icons />
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default IndexCliente;

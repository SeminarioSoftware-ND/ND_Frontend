import React from "react";

// core components
import DashNavbar from "components/Navbars/DashNavbar.jsx";
import DashHero from "./IndexSections/DashHero.jsx";
import SimpleFooter from "components/Footers/SimpleFooter.jsx";
import DashTabsSection from "./IndexSections/DashTabsProductos.jsx";

import { Container, Row, Col } from "reactstrap";

class DashProductos extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
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
              <DashTabsSection />
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default DashProductos;

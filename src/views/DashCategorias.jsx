import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components
import DashNavbar from "components/Navbars/DashNavbar.jsx";
import DashHero from "./IndexSections/DashHero.jsx";
import SimpleFooter from "components/Footers/SimpleFooter.jsx";

import DashCard from "./IndexSections/DashCard.jsx";

class DashCategorias extends React.Component {
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
              <DashCard />
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default DashCategorias;

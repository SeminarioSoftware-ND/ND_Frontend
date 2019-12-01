import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components
import DashNavbar from "components/Navbars/DashNavbar.jsx";
import DashHero from "./IndexSections/DashHero.jsx";
import DashPedidosPendientes from "./IndexSections/DashPendientes.jsx";
import SimpleFooter from "components/Footers/SimpleFooter.jsx";

class IndexDash extends React.Component {
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
          <DashHero />
          <section className="section">
            <Container>
              <DashPedidosPendientes />
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default IndexDash;

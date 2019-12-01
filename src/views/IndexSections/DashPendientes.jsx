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
import { Button, Container, Row, Col } from "reactstrap";

import Tables from "./Tables.jsx";

class DashPedidosPendientes extends React.Component {
  render() {
    return (
      <>
        <section
          className="section section-components pb-0"
          id="section-components"
        >
          <Container>
            <Row className="justify-content-center">
              <Col lg="12">
                {/* Pedidos Pendientes */}
                <h2 className="mb-3 text-center">
                  <span>PEDIDOS PENDIENTES</span>
                </h2>
              </Col>
              <Tables />
            </Row>
          </Container>
        </section>
      </>
    );
  }
}

export default DashPedidosPendientes;

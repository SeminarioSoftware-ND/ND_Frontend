import React from "react";

import {
  Container,
  Row,
  UncontrolledCarousel,
  Col,
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  CardImgOverlay,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup
} from "reactstrap";

class CardProductos extends React.Component {
  render() {
    return (
      <>
        <Container>
          <Row className="justify-content-center">
            <Col lg="12">
              {/* Pedidos Pendientes */}
              <h2 className="mb-3 text-center">
                <span>PRODUCTOS NUEVOS</span>
              </h2>
            </Col>

            <Col lg="12">
              <Row className="row-grid">
                {/* Primer artículo */}
                <Col lg="4">
                  <Card className="card-lift--hover shadow border-0">
                    <CardImg
                      top
                      width="100%"
                      src={require("assets/img/theme/team-1-800x800.jpg")}
                      alt="Imagen producto"
                    />
                    <CardImgOverlay className="align-items-between">
                      <Button
                        className="btn-icon btn-3"
                        color="danger"
                        type="button"
                        size="sm"
                      >
                        <span className="btn-inner--icon">Nuevo</span>
                      </Button>
                    </CardImgOverlay>

                    <CardBody className="py-2">
                      <h5 className="text-primary text-uppercase">
                        Nombre del producto
                      </h5>
                      <p className="description mt-3">L.150.00</p>
                    </CardBody>
                  </Card>
                </Col>

                <Col lg="4">
                  <Card className="card-lift--hover shadow border-0">
                    <CardImg
                      top
                      width="100%"
                      src={require("assets/img/theme/team-1-800x800.jpg")}
                      alt="Imagen producto"
                    />
                    <CardImgOverlay className="align-items-between">
                      <Button
                        className="btn-icon btn-3"
                        color="danger"
                        type="button"
                        size="sm"
                      >
                        <span className="btn-inner--icon">Nuevo</span>
                      </Button>
                    </CardImgOverlay>

                    <CardBody className="py-2">
                      <h5 className="text-primary text-uppercase">
                        Nombre del producto
                      </h5>
                      <p className="description mt-3">L.150.00</p>
                    </CardBody>
                  </Card>
                </Col>

                <Col lg="4">
                  <Card className="card-lift--hover shadow border-0">
                    <CardImg
                      top
                      width="100%"
                      src={require("assets/img/theme/team-1-800x800.jpg")}
                      alt="Imagen producto"
                    />
                    <CardImgOverlay className="align-items-between">
                      <Button
                        className="btn-icon btn-3"
                        color="danger"
                        type="button"
                        size="sm"
                      >
                        <span className="btn-inner--icon">Nuevo</span>
                      </Button>
                    </CardImgOverlay>

                    <CardBody className="py-2">
                      <h5 className="text-primary text-uppercase">
                        Nombre del producto
                      </h5>
                      <p className="description mt-3">L.150.00</p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default CardProductos;

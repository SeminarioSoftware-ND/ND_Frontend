import React from "react";

import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardImg,
  CardImgOverlay
} from "reactstrap";

class CardProductos extends React.Component {
  render() {
    return (
      <>
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg="12">
              {/* Pedidos Pendientes */}
              <h2 className="mb-3 text-center mt-5">
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
                      src={require("assets/img/papeleria.jpg")}
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
                      <h5 className="text-primary text-uppercase">Papelería</h5>
                    </CardBody>
                  </Card>
                </Col>

                <Col lg="4">
                  <Card className="card-lift--hover shadow border-0">
                    <CardImg
                      top
                      width="100%"
                      src={require("assets/img/nueva-imagen.jpg")}
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
                        Servicios secretariales
                      </h5>
                    </CardBody>
                  </Card>
                </Col>

                <Col lg="4">
                  <Card className="card-lift--hover shadow border-0">
                    <CardImg
                      top
                      width="100%"
                      src={require("assets/img/regalos-kkSD--620x349@abc.jpg")}
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
                        Productos de temporada
                      </h5>
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

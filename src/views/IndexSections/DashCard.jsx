import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  CardHeader,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Modal,
  Label
} from "reactstrap";

class DashCard extends React.Component {
  state = {};
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };
  render() {
    return (
      <>
        <main ref="main">
          <Container className="mt-4">
            <Row className="align-items-center">
              <Col lg="12">
                <Card>
                  <CardHeader>
                    <Row>
                      <Col xs="8">
                        <h5>Categorías</h5>
                      </Col>
                      <Col xs="4" className="text-right">
                        <Button
                          className="btn-icon"
                          color="default"
                          type="button"
                          onClick={() => this.toggleModal("defaultModal")}
                        >
                          <span className="btn-inner--icon mr-1">
                            <i className="ni ni-fat-add" />
                          </span>
                          <span className="btn-inner--text">Agregar</span>
                        </Button>
                        {/* EL MODAL */}
                        <Modal
                          className="modal-dialog-centered"
                          isOpen={this.state.defaultModal}
                          toggle={() => this.toggleModal("defaultModal")}
                        >
                          <div className="modal-header">
                            <h6
                              className="modal-title"
                              id="modal-title-default"
                            >
                              Agregar categoría
                            </h6>
                            <button
                              aria-label="Close"
                              className="close"
                              data-dismiss="modal"
                              type="button"
                              onClick={() => this.toggleModal("defaultModal")}
                            >
                              <span aria-hidden={true}>×</span>
                            </button>
                          </div>
                          <div className="modal-body p-0">
                            <Card className="bg-secondary shadow border-0">
                              <CardBody className="px-lg-5 py-lg-5">
                                <Form role="form">
                                  <FormGroup row className={classnames("mb-3")}>
                                    <Label for="nombreCat" sm={4}>
                                      Nombre
                                    </Label>
                                    <Col sm={8}>
                                      <InputGroup className="input-group-alternative">
                                        <Input id="nombreCat" type="text" />
                                      </InputGroup>
                                    </Col>
                                  </FormGroup>
                                  <FormGroup row className={classnames("mb-3")}>
                                    <Label for="descripcionCat" sm={4}>
                                      Descripción
                                    </Label>
                                    <Col sm={8}>
                                      <InputGroup className="form-control-alternative">
                                        <Input
                                          id="descripcionCat"
                                          rows="3"
                                          type="textarea"
                                        />
                                      </InputGroup>
                                    </Col>
                                  </FormGroup>
                                </Form>
                              </CardBody>
                            </Card>
                          </div>
                          <div className="modal-footer">
                            <Button color="success" type="button">
                              Crear
                            </Button>
                            <Button
                              className="ml-auto"
                              color="link"
                              data-dismiss="modal"
                              type="button"
                              onClick={() => this.toggleModal("defaultModal")}
                            >
                              Cerrar
                            </Button>
                          </div>
                        </Modal>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <ListGroup>
                      <ListGroupItem className="mb-3">
                        <Row>
                          <Col xs={{ size: "auto" }}>
                            <img
                              alt="..."
                              className="img-fluid rounded shadow"
                              src={require("assets/img/theme/team-1-800x800.jpg")}
                              style={{ width: "80px" }}
                            />
                          </Col>
                          <Col className="ml--2">
                            <h4>Nombre</h4>
                            <span className="text-success">●</span>
                            <small>La descripción</small>
                          </Col>
                          <br />
                          <Col
                            xs={{ size: "auto" }}
                            className="align-items-left pr-5"
                          >
                            <Row>
                              <Button
                                color="primary"
                                size="sm"
                                type="button"
                                onClick={() =>
                                  this.toggleModal("editarCategoria")
                                }
                              >
                                <span className="btn-inner--icon mr-2">
                                  <i className="ni ni-ruler-pencil" />
                                </span>
                                <span className="btn-inner--text">Editar</span>
                              </Button>
                              {/* EL MODAL */}
                              <Modal
                                className="modal-dialog-centered"
                                isOpen={this.state.editarCategoria}
                                toggle={() =>
                                  this.toggleModal("editarCategoria")
                                }
                              >
                                <div className="modal-header">
                                  <h6
                                    className="modal-title"
                                    id="modal-title-default"
                                  >
                                    Modificar categoría
                                  </h6>
                                  <button
                                    aria-label="Close"
                                    className="close"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={() =>
                                      this.toggleModal("editarCategoria")
                                    }
                                  >
                                    <span aria-hidden={true}>×</span>
                                  </button>
                                </div>
                                <div className="modal-body p-0">
                                  <Card className="bg-secondary shadow border-0">
                                    <CardBody className="px-lg-5 py-lg-5">
                                      <Form role="form">
                                        <FormGroup
                                          row
                                          className={classnames("mb-3")}
                                        >
                                          <Label for="nombreCat" sm={4}>
                                            Nombre
                                          </Label>
                                          <Col sm={8}>
                                            <InputGroup className="input-group-alternative">
                                              <Input
                                                id="nombreCat"
                                                type="text"
                                              />
                                            </InputGroup>
                                          </Col>
                                        </FormGroup>
                                        <FormGroup
                                          row
                                          className={classnames("mb-3")}
                                        >
                                          <Label for="descripcionCat" sm={4}>
                                            Descripción
                                          </Label>
                                          <Col sm={8}>
                                            <InputGroup className="form-control-alternative">
                                              <Input
                                                id="descripcionCat"
                                                rows="3"
                                                type="textarea"
                                              />
                                            </InputGroup>
                                          </Col>
                                        </FormGroup>
                                      </Form>
                                    </CardBody>
                                  </Card>
                                </div>
                                <div className="modal-footer">
                                  <Button color="success" type="button">
                                    Editar
                                  </Button>
                                  <Button
                                    className="ml-auto"
                                    color="link"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={() =>
                                      this.toggleModal("editarCategoria")
                                    }
                                  >
                                    Cerrar
                                  </Button>
                                </div>
                              </Modal>
                            </Row>
                            <br />
                            <Row>
                              <Button color="danger" size="sm" type="button">
                                <span className="btn-inner--icon mr-2">
                                  <i className="ni ni-fat-delete" />
                                </span>
                                <span className="btn-inner--text">
                                  Eliminar
                                </span>
                              </Button>
                            </Row>
                          </Col>
                        </Row>
                      </ListGroupItem>
                      {/* Quitar cuando haya ciclo */}
                      <ListGroupItem>
                        <Row>
                          <Col xs={{ size: "auto" }}>
                            <img
                              alt="..."
                              className="img-fluid rounded shadow"
                              src={require("assets/img/theme/team-1-800x800.jpg")}
                              style={{ width: "80px" }}
                            />
                          </Col>
                          <Col className="ml--2">
                            <h4>Nombre</h4>
                            <span className="text-success">●</span>
                            <small>La descripción</small>
                          </Col>
                          <br />
                          <Col
                            xs={{ size: "auto" }}
                            className="align-items-left pr-5"
                          >
                            <Row>
                              <Button color="primary" size="sm" type="button">
                                Editar
                              </Button>
                            </Row>
                            <br />
                            <Row>
                              <Button color="danger" size="sm" type="button">
                                Eliminar
                              </Button>
                            </Row>
                          </Col>
                        </Row>
                      </ListGroupItem>
                      {/* Quitar cuando haya ciclo */}
                    </ListGroup>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </main>
      </>
    );
  }
}
export default DashCard;

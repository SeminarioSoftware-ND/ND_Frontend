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
// nodejs library that concatenates classes
import classnames from "classnames";

// reactstrap components
import {
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
  Row,
  Col,
  Container,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup
} from "reactstrap";

class DashTabsSection extends React.Component {
  state = {
    iconTabs: 1,
    plainTabs: 1
  };
  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index
    });
  };
  render() {
    return (
      <>
        <Row>
          <Col lg="10">
            <FormGroup
              className={classnames({
                focused: this.state.searchFocused
              })}
            >
              <InputGroup className="mb-4">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-zoom-split-in" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Buscar producto"
                  type="text"
                  onFocus={e => this.setState({ searchFocused: true })}
                  onBlur={e => this.setState({ searchFocused: false })}
                />
              </InputGroup>
            </FormGroup>
          </Col>
          <Col lg="2" className="mb-3 align-items-center text-center">
            <Button className="btn-icon" color="default" type="button">
              Buscar
            </Button>
          </Col>
        </Row>

        <Row>
          <Col lg="12" className="mb-3">
            <Button color="default" block>
              <span className="btn-inner--icon mr-1">
                <i className="ni ni-fat-add" />
              </span>
              <span className="btn-inner--text">Agregar producto</span>
            </Button>
          </Col>
        </Row>
        <h3 className="h4 text-success font-weight-bold mt-4">CATEGORÍAS</h3>

        <Row className="justify-content-center">
          <Col lg="12">
            {/* Tabs with icons */}
            <div className="nav-wrapper">
              <Nav
                className="nav-fill flex-column flex-md-row"
                id="tabs-icons-text"
                pills
                role="tablist"
              >
                <NavItem>
                  <NavLink
                    aria-selected={this.state.iconTabs === 1}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.iconTabs === 1
                    })}
                    onClick={e => this.toggleNavs(e, "iconTabs", 1)}
                    href="#pablo"
                    role="tab"
                  >
                    <i className="ni ni-book-bookmark mr-2" />
                    Todos
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    aria-selected={this.state.iconTabs === 2}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.iconTabs === 2
                    })}
                    onClick={e => this.toggleNavs(e, "iconTabs", 2)}
                    href="#pablo"
                    role="tab"
                  >
                    <i className="ni ni-ruler-pencil mr-2" />
                    Lápices
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    aria-selected={this.state.iconTabs === 3}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.iconTabs === 3
                    })}
                    onClick={e => this.toggleNavs(e, "iconTabs", 3)}
                    href="#pablo"
                    role="tab"
                  >
                    <i className="ni ni-calendar-grid-58 mr-2" />
                    Cuadernos
                  </NavLink>
                </NavItem>
              </Nav>
            </div>

            {/* ESTOS SON LAS COSAS QUE SE ABREN EN EL TAB */}
            <div>
              <div className="mt-4">
                <TabContent activeTab={"iconTabs" + this.state.iconTabs}>
                  <TabPane tabId="iconTabs1">
                    <Container>
                      <Row className="justify-content-center">
                        <Col lg="12">
                          <Row className="row-grid">
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
                                    color="success"
                                    type="button"
                                    size="sm"
                                  >
                                    <span className="btn-inner--icon">
                                      <i className="ni ni-ruler-pencil" />
                                    </span>
                                  </Button>
                                  <Button
                                    className="btn-icon btn-3"
                                    color="danger"
                                    type="button"
                                    size="sm"
                                  >
                                    <span className="btn-inner--icon">
                                      <i className="ni ni-fat-delete" />
                                    </span>
                                  </Button>
                                </CardImgOverlay>

                                <CardBody className="py-2">
                                  <h6 className="text-primary text-uppercase">
                                    Nombre del producto
                                  </h6>
                                  <p className="description mt-3">L.150.00</p>
                                </CardBody>
                              </Card>
                            </Col>

                            <Col lg="4">
                              <Card className="card-lift--hover shadow border-0">
                                <CardBody className="py-5">
                                  <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                                    <i className="ni ni-istanbul" />
                                  </div>
                                  <h6 className="text-success text-uppercase">
                                    Build Something
                                  </h6>
                                  <p className="description mt-3">
                                    Argon is a great free UI package based on
                                    Bootstrap 4 that includes the most important
                                    components and features.
                                  </p>
                                  <div>
                                    <Badge
                                      color="success"
                                      pill
                                      className="mr-1"
                                    >
                                      business
                                    </Badge>
                                    <Badge
                                      color="success"
                                      pill
                                      className="mr-1"
                                    >
                                      vision
                                    </Badge>
                                    <Badge
                                      color="success"
                                      pill
                                      className="mr-1"
                                    >
                                      success
                                    </Badge>
                                  </div>
                                  <Button
                                    className="mt-4"
                                    color="success"
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                  >
                                    Learn more
                                  </Button>
                                </CardBody>
                              </Card>
                            </Col>
                            <Col lg="4">
                              <Card className="card-lift--hover shadow border-0">
                                <CardBody className="py-5">
                                  <div className="icon icon-shape icon-shape-warning rounded-circle mb-4">
                                    <i className="ni ni-planet" />
                                  </div>
                                  <h6 className="text-warning text-uppercase">
                                    Prepare Launch
                                  </h6>
                                  <p className="description mt-3">
                                    Argon is a great free UI package based on
                                    Bootstrap 4 that includes the most important
                                    components and features.
                                  </p>
                                  <div>
                                    <Badge
                                      color="warning"
                                      pill
                                      className="mr-1"
                                    >
                                      marketing
                                    </Badge>
                                    <Badge
                                      color="warning"
                                      pill
                                      className="mr-1"
                                    >
                                      product
                                    </Badge>
                                    <Badge
                                      color="warning"
                                      pill
                                      className="mr-1"
                                    >
                                      launch
                                    </Badge>
                                  </div>
                                  <Button
                                    className="mt-4"
                                    color="warning"
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                  >
                                    Learn more
                                  </Button>
                                </CardBody>
                              </Card>
                            </Col>
                          </Row>
                          <Row className="row-grid">
                            <Col lg="4">
                              <Card className="card-lift--hover shadow border-0">
                                <CardBody className="py-5">
                                  <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                                    <i className="ni ni-check-bold" />
                                  </div>
                                  <h6 className="text-primary text-uppercase">
                                    Download Argon
                                  </h6>
                                  <p className="description mt-3">
                                    Argon is a great free UI package based on
                                    Bootstrap 4 that includes the most important
                                    components and features.
                                  </p>
                                  <div>
                                    <Badge
                                      color="primary"
                                      pill
                                      className="mr-1"
                                    >
                                      design
                                    </Badge>
                                    <Badge
                                      color="primary"
                                      pill
                                      className="mr-1"
                                    >
                                      system
                                    </Badge>
                                    <Badge
                                      color="primary"
                                      pill
                                      className="mr-1"
                                    >
                                      creative
                                    </Badge>
                                  </div>
                                  <Button
                                    className="mt-4"
                                    color="primary"
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                  >
                                    Learn more
                                  </Button>
                                </CardBody>
                              </Card>
                            </Col>
                            <Col lg="4">
                              <Card className="card-lift--hover shadow border-0">
                                <CardBody className="py-5">
                                  <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                                    <i className="ni ni-istanbul" />
                                  </div>
                                  <h6 className="text-success text-uppercase">
                                    Build Something
                                  </h6>
                                  <p className="description mt-3">
                                    Argon is a great free UI package based on
                                    Bootstrap 4 that includes the most important
                                    components and features.
                                  </p>
                                  <div>
                                    <Badge
                                      color="success"
                                      pill
                                      className="mr-1"
                                    >
                                      business
                                    </Badge>
                                    <Badge
                                      color="success"
                                      pill
                                      className="mr-1"
                                    >
                                      vision
                                    </Badge>
                                    <Badge
                                      color="success"
                                      pill
                                      className="mr-1"
                                    >
                                      success
                                    </Badge>
                                  </div>
                                  <Button
                                    className="mt-4"
                                    color="success"
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                  >
                                    Learn more
                                  </Button>
                                </CardBody>
                              </Card>
                            </Col>
                            <Col lg="4">
                              <Card className="card-lift--hover shadow border-0">
                                <CardBody className="py-5">
                                  <div className="icon icon-shape icon-shape-warning rounded-circle mb-4">
                                    <i className="ni ni-planet" />
                                  </div>
                                  <h6 className="text-warning text-uppercase">
                                    Prepare Launch
                                  </h6>
                                  <p className="description mt-3">
                                    Argon is a great free UI package based on
                                    Bootstrap 4 that includes the most important
                                    components and features.
                                  </p>
                                  <div>
                                    <Badge
                                      color="warning"
                                      pill
                                      className="mr-1"
                                    >
                                      marketing
                                    </Badge>
                                    <Badge
                                      color="warning"
                                      pill
                                      className="mr-1"
                                    >
                                      product
                                    </Badge>
                                    <Badge
                                      color="warning"
                                      pill
                                      className="mr-1"
                                    >
                                      launch
                                    </Badge>
                                  </div>
                                  <Button
                                    className="mt-4"
                                    color="warning"
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                  >
                                    Learn more
                                  </Button>
                                </CardBody>
                              </Card>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Container>
                  </TabPane>
                  <TabPane tabId="iconTabs2">
                    <p className="description">
                      Cosby sweater eu banh mi, qui irure terry richardson ex
                      squid. Aliquip placeat salvia cillum iphone. Seitan
                      aliquip quis cardigan american apparel, butcher voluptate
                      nisi qui.
                    </p>
                  </TabPane>
                  <TabPane tabId="iconTabs3">
                    <p className="description">
                      Raw denim you probably haven't heard of them jean shorts
                      Austin. Nesciunt tofu stumptown aliqua, retro synth master
                      cleanse. Mustache cliche tempor, williamsburg carles vegan
                      helvetica. Reprehenderit butcher retro keffiyeh
                      dreamcatcher synth.
                    </p>
                  </TabPane>
                </TabContent>
              </div>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

export default DashTabsSection;

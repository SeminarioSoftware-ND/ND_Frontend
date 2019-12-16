import React from "react";
import classnames from "classnames";
import axiosConfig from "../axios";
import Swal from "sweetalert2";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";

// reactstrap components
import {
  Container,
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  Row,
  Col,
  Modal,
  Label
} from "reactstrap";

// core components
import DashNavbar from "components/Navbars/DashNavbar.jsx";
import DashHero from "./IndexSections/DashHero.jsx";

import SimpleFooter from "components/Footers/SimpleFooter.jsx";

class IndexDash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      documento: "",
      color: "",
      tipoHoja: "",
      tamanio: "",
      especificaciones: "",
      cantidadHojas: "",
      cliente: "",
      correo: "",
      estado: "",
      fecha: "",
      url: "",
      TableData: [
        {
          _id: "",
          documento: "",
          color: "",
          tipoHoja: "",
          tamanio: "",
          especificaciones: "",
          cantidadHojas: "",
          cliente: "",
          correo: "",
          estado: "",
          fecha: "",
          url: ""
        }
      ]
    };
    // Función para el callback
    this.descargarArchivo = this.descargarArchivo.bind(this);
    this.cambiarEstadoImpresion = this.cambiarEstadoImpresion.bind(this);
  }

  // Componente que carga al renderizar la página
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;

    axiosConfig.get("/impresiones", { responseType: "json" }).then(response => {
      // Modificamos el estado del arreglo TableData para llenarlo con la consulta
      this.setState({ TableData: response.data.lasImpresiones });
    });
  }

  // Evento para desplegar los modales
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  // Función para cargar datos al modal
  cargarDatos(items) {
    this.setState({
      especificaciones: items.especificaciones,
      color: items.color,
      tamanio: items.tamanio,
      tipoHoja: items.tipoHoja,
      documento: items.documento,
      estado: items.estado,
      url: items.url
    });
  }

  // Función para descargar el archivo
  descargarArchivo(nombreArchivo) {
    console.log(nombreArchivo);
    axiosConfig
      .get("/descargarDocumento/", {
        params: {
          nombreArchivo
        },
        responseType: "blob"
      })
      .then(respuesta => {
        console.log(respuesta);
        const url = window.URL.createObjectURL(new Blob([respuesta.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", nombreArchivo);
        document.body.appendChild(link);
        link.click();
      });
  }

  // Función para cambiar el estado de la impresión
  cambiarEstadoImpresion() {
    // Estado = 0 => impreso
    // Estado = 1 => Por imprimir
    var elEstado = {
      estado: 0
    };
    if (this.state.estado === 1) {
      elEstado.estado = 0;
      axiosConfig
        .post(`/actualizarImpresion/${this.state.url}`, elEstado)
        .then(respuesta => {
          if (respuesta.status === 200) {
            Swal.fire("¡Exitoso!", respuesta.data.mensaje, "success");
            window.location = "/admin";
          }
        })
        .catch(error => {
          Swal.fire("¡Error!", error.response.data.error, "warning");
        });
    } else {
      Swal.fire("¡Atención!", "El documento ya se imprimió", "warning");
    }
  }

  render() {
    // variable para recorrer el arreglo con los datos
    // Obtenemos por destructurig el arreglo con los datos
    const { TableData } = this.state;
    // Establecemos las columnas de nuestra tabla
    const columns = [
      {
        Header: "Id",
        accessor: "_id",
        style: {
          textAlign: "center"
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100,
        show: false
      },
      {
        Header: "Archivo",
        accessor: "documento",
        show: false
      },
      {
        Header: "Color",
        accessor: "color",
        width: 150,
        maxWidth: 150,
        minWidth: 150
      },
      {
        Header: "Tipo de papel",
        accessor: "tipoHoja",
        width: 160,
        maxWidth: 160,
        minWidth: 160
      },
      {
        Header: "Tamaño de hoja ",
        accessor: "tamanio",
        width: 100,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "Especificaciones",
        accessor: "especificaciones",
        width: 300,
        maxWidth: 300,
        minWidth: 200,
        show: false
      },
      {
        Header: "Cantidad",
        accessor: "cantidadHojas",
        style: {
          textAlign: "center"
        }
      },
      {
        Header: "Usuario",
        accessor: "correo",
        width: 300,
        maxWidth: 300,
        minWidth: 200,
        style: {
          textAlign: "center"
        }
      },
      {
        Header: "Estado",
        accessor: "estado",
        show: false
      },
      {
        Header: "Fecha",
        accessor: "fecha",
        style: {
          textAlign: "center"
        },
        width: 300,
        maxWidth: 300,
        minWidth: 300
      },
      {
        Header: "Opciones",
        Cell: props => {
          return (
            <div>
              {/* AQUI SE ABRE EL MODAL */}
              <Button
                className="btn-icon"
                color="info"
                type="button"
                size="sm"
                onClick={() => {
                  this.toggleModal("infoImpresion");
                  this.cargarDatos(props.original);
                }}
              >
                ver
              </Button>
            </div>
          );
        }
      }
    ];
    return (
      <>
        <DashNavbar />
        <main ref="main">
          <DashHero
            mensaje="¡BIENVENIDO AL PANEL DE ADMINISTRACIÓN!"
            imagen="Logo Blanco ND.png"
          />
          <section className="section">
            <Container>
              <section
                className="section section-components pb-0"
                id="section-components"
              >
                {/* Título */}
                <Row className="justify-content-center">
                  <Col lg="12">
                    {/* Pedidos Pendientes */}
                    <h2 className="mb-3 text-center">
                      <span>IMPRESIONES PENDIENTES</span>
                    </h2>
                  </Col>
                </Row>
              </section>

              <section>
                {/* TABLA */}
                <ReactTable
                  columns={columns}
                  data={TableData}
                  filterable
                  defaultPageSize={10}
                  noDataText={"No hay datos disponibles"}
                  previousText={"Anterior"}
                  nextText={"Siguiente"}
                  pageText={"Página"}
                  ofText={"de"}
                  rowsText={"registros"}
                ></ReactTable>
                {/* TABLA */}
              </section>
            </Container>
          </section>
        </main>
        <SimpleFooter />

        {/* MODAL MOSTRAR INFORMACIÓN IMPRESIONES */}
        <Modal
          className="modal-dialog-centered modal-lg"
          isOpen={this.state.infoImpresion}
          itemID={this.state.nombre}
          toggle={() => this.toggleModal("infoImpresion")}
        >
          <div className="modal-header">
            <h6 className="modal-title" id="modal-title-default">
              Información de impresión
            </h6>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("infoImpresion")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          {/* Modal Body */}
          <div className="modal-body p-0">
            <Card className="bg-secondary shadow border-0">
              <CardBody className="px-lg-5 py-lg-5">
                {/* Formulario */}
                <Form>
                  {/* Descripción */}
                  <FormGroup row className={classnames("mb-3")}>
                    <Label for="descripcionPro" sm={2}>
                      Detalles
                    </Label>
                    <Col sm={10}>
                      <InputGroup className="input-group-alternative">
                        <Input
                          id="descripcionPro"
                          placeholder="No hay especificaciones"
                          rows="3"
                          type="textarea"
                          name="descripcion"
                          value={this.state.especificaciones}
                          disabled
                        />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  {/* /Descripcion */}

                  {/* Nombre */}
                  <FormGroup row className={classnames("mb-3")}>
                    <Label for="nombrePro" sm={2}>
                      Color
                    </Label>
                    <Col sm={10}>
                      <InputGroup className="input-group-alternative">
                        <Input
                          type="text"
                          name="nombre"
                          value={this.state.color}
                          disabled
                        />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  {/* /Nombre */}

                  {/* Nombre */}
                  <FormGroup row className={classnames("mb-3")}>
                    <Label for="nombrePro" sm={2}>
                      Tamaño
                    </Label>
                    <Col sm={10}>
                      <InputGroup className="input-group-alternative">
                        <Input
                          type="text"
                          name="nombre"
                          value={this.state.tamanio}
                          disabled
                        />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  {/* /Nombre */}

                  {/* Nombre */}
                  <FormGroup row className={classnames("mb-3")}>
                    <Label for="nombrePro" sm={2}>
                      Tipo de hoja
                    </Label>
                    <Col sm={10}>
                      <InputGroup className="input-group-alternative">
                        <Input
                          type="text"
                          name="nombre"
                          value={this.state.tipoHoja}
                          disabled
                        />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  {/* /Nombre */}

                  {/* Opciones de footer */}
                  <div className="modal-footer  pb-1">
                    <FormGroup row className={classnames("mt-3")}>
                      <Button
                        color="danger"
                        type="button"
                        className="mr-5 float-left"
                        onClick={() => {
                          this.cambiarEstadoImpresion();
                        }}
                      >
                        {this.state.estado === 0 ? "Impreso" : "Por imprimir"}
                      </Button>

                      {/* Cambiar estado */}
                      {/* Botón agregar */}

                      <Button
                        color="success"
                        type="button"
                        onClick={() => {
                          this.descargarArchivo(this.state.documento);
                        }}
                      >
                        Descargar
                      </Button>

                      {/* Botón cerrar */}

                      <Button
                        className="ml-auto"
                        color="link"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => this.toggleModal("infoImpresion")}
                      >
                        Cerrar
                      </Button>
                    </FormGroup>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Modal>
        {/* MODAL MOSTRAR INFORMACIÓN IMPRESIONES */}
      </>
    );
  }
}

export default IndexDash;

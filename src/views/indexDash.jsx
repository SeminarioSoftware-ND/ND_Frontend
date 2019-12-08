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
      TableData: [
        {
          idDocumento: "",
          selectedFile: null,
          documento: "",
          color: "",
          tipoHoja: "",
          tamano: "",
          especificaciones: "",
          cantidadHojas: "",
          usuario: "",
          estado: "",
          fechaEntrega: ""
        }
      ]
    };
    // Este enlace es necesario para hacer que "this" funciones en el callback
    this.cargarImpresiones = this.cargarImpresiones.bind(this);
  }
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;

    this.cargarImpresiones();
  }

  // Evento para desplegar los modales
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  // Función para cargar las impresiones
  cargarImpresiones() {
    // Petición para cargar las impresiones pendientes
    axiosConfig
      .get("/impresionesPendientes", { responseType: "json" })
      .then(response => {
        // Modificamos el estado del arreglo TableData para llenarlo con la consulta
        this.setState({ TableData: response.data });
      });
  }

  render() {
    // variable para recorrer el arreglo con los datos
    var a = -1;
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
        accessor: "documento"
      },
      {
        Header: "Color",
        accessor: "color"
      },
      {
        Header: "Tipo de papel",
        accessor: "tipoHoja"
      },
      {
        Header: "Tamaño de hoja ",
        accessor: "tamano"
      },
      {
        Header: "Especificaciones",
        accessor: "especificaciones"
      },
      {
        Header: "Cantidad",
        accessor: "cantidadHojas"
      },
      {
        Header: "Usuario",
        accessor: "usuario"
      },
      {
        Header: "Estado",
        accessor: "estado"
      },
      {
        Header: "Fecha",
        accessor: "fechaEntrega"
      },
      {
        Header: "Opciones",
        Cell: props => {}
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

                {/* Botón actualizar */}
                <Row>
                  <Col lg="12" className="mb-3">
                    <Button
                      color="default"
                      block
                      type="button"
                      onClick={() => this.toggleModal("defaultModal")}
                    >
                      <span className="btn-inner--icon mr-1">
                        <i className="ni ni-curved-next" />
                      </span>
                      <span className="btn-inner--text">Actualizar</span>
                    </Button>
                  </Col>
                </Row>
                {/* Botón actualizar */}
              </section>

              <section>
                {/* TABLA */}
                <ReactTable
                  columns={columns}
                  data={TableData}
                  filterable
                  defaultPageSize={10}
                  noDataText={"No hay datos disponibles"}
                ></ReactTable>
                {/* TABLA */}
              </section>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default IndexDash;

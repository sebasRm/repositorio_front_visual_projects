import React, { useEffect, useState } from "react";
import "../../css/project.css";
import NavBar from "../navbar/Navbar";
import imgFondo from "../../img/create-project.png";
import btnAddLider from "../../img/btn-add-lider.png";
import btn_continue from "../../img/btn-continuar.png";
import uno from "../../img/uno.png";
import dos from "../../img/dos.png";
import img_info from "../../img/img-info.png";
import { modalAddLeader } from "../../actions/events";
import { useDispatch, useSelector } from "react-redux";
import { FaUserTie } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useAlert } from "react-alert";
import Carousel from "react-elastic-carousel";
import MaterialTable, { MTableBody, MTableBodyRow } from "@material-table/core";
import {
  consutarLideresSinProyecto,
  crearProyecto,
  consultarProyectos,
} from "../../actions/apis";
import { useNavigate } from "react-router-dom";
//import { consutarLideres } from "../actions/apis";
import CardLider from "../cards/CardLider";
import {
  openModalCreateLeader,
  CancelConsultLiderToStorange,
  AddinfoProjectToStorange,
} from "../../actions/events";
import { ModalCrearLider } from "../modals/ModalCrearLider";

export const RegisterLider = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { infoProject, leaders, user } = useSelector((state) => state);
  const handleModalCreateLeader = () => {
    dispatch(openModalCreateLeader());
  };
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRowValue, setSelectedRowValue] = useState(null);

  async function handleRegisterProject() {
    if (!selectedRowValue) {
      alert.error("Seleccione un líder para asignarlo al proyecto");
    } else {
      let project = {
        data: {
          project: {
            name: infoProject.nameProyect,
            descripcion: infoProject.descriptionProyect,
            idLider: selectedRowValue.idLider,
            idDirector: user.directors[0].idDirector,
          },
        },
      };
      dispatch(crearProyecto(project));
      await dispatch(consultarProyectos());
      navigate("/Home");
    }
  }
  const handleRowClick = (event, rowData) => {
    setSelectedRowValue(rowData);
    setSelectedRow(rowData.tableData.id);
  };

  const columns = [
    {
      title: "Nombre",
      field: "nombre",
    },
    {
      title: "Correo",
      field: "correo",
    },
  ];

  const options = {
    selection: false,
    search: false,
    tableLayout: "auto",
    actions: true,
    filtering: false,
    maxBodyHeight: 200,
    rowStyle: (rowData) => ({
      backgroundColor:
        rowData.tableData.id === selectedRow ? "lightblue" : "transparent",
    }),
  };
  return (
    <>
      <div className="back">
        <NavBar />

        <div className="row ">
          <div
            className="col-xs-4 col-sm-4 col-md-4 col-lg-4"
            style={{ marginLeft: "5rem" }}
          >
            <h1 className="title-project " style={{ marginTop: "5rem" }}>
              {" "}
              A continuación deberá asignar un líder de proyecto{" "}
            </h1>

            {leaders ? (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={btnAddLider}
                    style={{
                      marginTop: "-7rem",
                      maxWidth: "10rem",
                      marginLeft: "55rem",
                    }}
                    onClick={handleModalCreateLeader}
                    className="btnAddLider"
                  />
                </div>
                <p style={{
                      
                      marginLeft: "4rem",
                
                    }}>Dé clic en el líder que desee seleccionar</p>
                <div className=" container mt-1">
                  <MaterialTable
                    title=""
                    columns={columns}
                    data={leaders && leaders}
                    onRowClick={handleRowClick}
                    options={options}
                    style={{
                      width: "31.5rem",
                      marginLeft: "-11rem",
                      backgroundColor: "transparent",
                    }}
                    localization={{
                      pagination: {
                        labelDisplayedRows: "{from}-{to} de {count}",
                        labelRowsSelect: "filas",
                      },
                      toolbar: {
                        nRowsSelected: "{0} Fila(s) seleccionadas",
                        searchTooltip: "Búsqueda",
                        searchPlaceholder: "Búsqueda",
                      },
                      header: {
                        actions: "Actions",
                      },
                      body: {
                        emptyDataSourceMessage: "No existen datos",
                        filterRow: {
                          filterTooltip: "Filter",
                        },
                      },
                    }}
                  />
                </div>

                <img
                  src={btn_continue}
                  style={{
                    marginTop: "3%",
                    maxWidth: "12rem",
                    marginLeft: "20rem",
                  }}
                  onClick={handleRegisterProject}
                  className="btnAddLider"
                />
              </>
            ) : (
              <>
                <div
                  className="subtitle-home"
                  style={{ marginTop: "9rem", marginLeft: "8rem" }}
                >
                  {" "}
                  Aún no tiene líderes registrados. ¡Registre uno!
                </div>

                <img
                  src={btnAddLider}
                  style={{
                    marginTop: "2rem",
                    maxWidth: "10rem",
                    marginLeft: "20rem",
                  }}
                  onClick={handleModalCreateLeader}
                  className="btnAddLider"
                />
              </>
            )}
          </div>
          <div className="row">
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <img
                src={imgFondo}
                style={{
                  marginTop: "-35rem",
                  maxWidth: "35rem",
                  marginLeft: "68rem",
                }}
                className="imgFondo"
              />
            </div>
          </div>
        </div>
      </div>
      <ModalCrearLider />
    </>
  );
};

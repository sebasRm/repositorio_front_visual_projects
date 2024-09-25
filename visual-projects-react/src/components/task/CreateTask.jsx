import React, { useEffect, useState } from "react";
import "../../css/project.css";
import axios, { formToJSON } from "axios";
import Swal from "sweetalert2";
import NavBar from "../navbar/Navbar";
import imgFondo from "../../img/create-project.png";
import btnAddLider from "../../img/btn-add-lider.png";
import uno from "../../img/uno.png";
import dos from "../../img/dos.png";
import img_info from "../../img/img-info.png";
import btn_lider from "../../img/btn-continuar.png";
import { modalAddLeader } from "../../actions/events";
import { useDispatch, useSelector } from "react-redux";
import { FaUserTie } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useAlert } from "react-alert";
import Carousel from "react-elastic-carousel";
import { useNavigate } from "react-router-dom";
//import { consutarLideres } from "../actions/apis";
import CardLider from "../cards/CardLider";
import {
  consultarResponsables,
  consultarActividadesMetaInicio,
  consultarActividadesMetas,
  consultarActividadesMetaOrganizacion,
  consultarActividadesMetaEjecucion,
  consultarActividadesMetaCierre,
  consultarTareasActividades,
  consultarTareasActividadesEjecucion,
  consultarTareasActividadesOrganizacion,
  consultarTareasActividadesInicio,
  consultarTareasActividadesCierre,
  actualizarEstadoMeta,
  actualizarEstadoActividad
} from "../../actions/apis";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "../../css/activities.css";
import {
  openModalCreateLeader,
  CancelConsultLiderToStorange,
  AddinfoProjectToStorange,
} from "../../actions/events";
import { ModalAgregarLider } from "../modals/ModalAgregarLider";
import MaterialTable, { MTableBody, MTableBodyRow } from "@material-table/core";
import { AddActivityToStorange } from "../../actions/events";
import { urlServer } from "../../actions/apis";
export const CreateTask = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    lideres,
    leader,
    responsables,
    dateInitialActivity,
    goal,
    idActivity,
  } = useSelector((state) => state);
  
  const initiEvent = {
    nameTask: "",
    descriptionTask: "",
    budgetTask: "",
  };
  const [dateInital, handleDateInitialChange] = useState(null);

  const [DateFinish, handleDateFinishChange] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRowValue, setSelectedRowValue] = useState(null);
  const options = {
    selection: false,
    search: false,
    tableLayout: "auto",
    actions: true,
    filtering: false,
    maxBodyHeight: "12rem",
    rowStyle: (rowData) => ({
      backgroundColor:
        rowData.tableData.id === selectedRow ? "lightblue" : "transparent",
    }),
  };
  const [formValues, setformValues] = useState(initiEvent);

  const { nameTask, descriptionTask, budgetTask } = formValues;

  const handleInputChange = ({ target }) => {
    setformValues({
      ...formValues,
      [target.name]: target.value,
    });
  };
  const handleRowClick = (event, rowData) => {
    setSelectedRowValue(rowData);
    setSelectedRow(rowData.tableData.id);
  };

  const columns = [
    {
      title: "Id",
      field: "idUsuario",
    },
    {
      title: "Nombre",
      field: "nombre",
    },
    {
      title: "Correo",
      field: "correo",
    },
  ];

  async function createTask() {
    let task = {
      data: {
        task: {
          nombre: nameTask,
          descripcion: descriptionTask,
          presupuesto: budgetTask,
          fechaInicio: dateInital,
          fechaFinal: DateFinish,
          usuario: selectedRowValue.idUsuario,
          idActividad: idActivity.idActividad,
          nombreActividad: idActivity.nombre
        },
      },
    };
    await axios({
      method: "post",
      url: urlServer + "/crear/tarea",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data: task,
    })
      .then(async (resJson) => {
        Swal.fire("Éxito", "La tarea fue creada con éxito", "success");
        let task = resJson.data.data;
        dispatch(AddActivityToStorange(task));
        let metaEstado = {
          data:{
            goal: {
              idMeta: goal.id,
            },
          }
          
        };
        let actividadEstado = {
          data:{
            activity: {
              idActividad: idActivity?.idActividad,
            },
          }
        };
        /*await dispatch(consultarActividadesMetaInicio(goal.id))
        await dispatch(consultarActividadesMetas(goal.id))
        await dispatch(consultarActividadesMetaOrganizacion(goal.id))
        await dispatch(consultarActividadesMetaEjecucion(goal.id))
        await dispatch(consultarActividadesMetaCierre(goal.id))*/
        await dispatch(actualizarEstadoActividad(actividadEstado));
        await dispatch(actualizarEstadoMeta(metaEstado));
        await dispatch(consultarTareasActividades(idActivity.idActividad));
        await dispatch(consultarTareasActividadesInicio(idActivity.idActividad));
        await dispatch(consultarTareasActividadesOrganizacion(idActivity.idActividad));
        await dispatch(consultarTareasActividadesEjecucion(idActivity.idActividad));
        await dispatch(consultarTareasActividadesCierre(idActivity.idActividad));

        navigate("/Activities");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, error);
      });
  }

  const handleCreateTask = () => {
    nameTask !== ""
      ? descriptionTask !== ""
        ? dateInital !== null
          ? DateFinish !== null
            ? budgetTask !== ""
              ? selectedRowValue !== null
                ? createTask()
                : alert.error("Seleccione un responsable para esta actividad")
              : alert.error("Ingresa el presupuesto de la actividad")
            : alert.error("Ingresa la fecha final")
          : alert.error("Ingresa la fecha inicial")
        : alert.error("Ingresa la descripción de la actividad")
      : alert.error("Ingresa el nombre de la actividad");
  };
  useEffect(() => {
    dispatch(consultarResponsables());
  }, []);

  return (
    <>
      <div className="back">
        <NavBar />

        <div className="row ">
          <div
            className="col-xs-4 col-sm-6 col-md-6 col-lg-4"
            style={{ marginLeft: "6rem" }}
          >
            <h1
              className="title-project "
              style={{ marginTop: "5.6rem", color: "black" }}
            >
              {" "}
              Crea una nueva tarea{" "}
            </h1>
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-8">
              <h1
                className="title-project "
                style={{ color: "black", marginLeft: "4.2rem" }}
              >
                1.{" "}
              </h1>
              <input
                name="nameTask"
                value={nameTask}
                onChange={handleInputChange}
                type="text"
                className="form-control"
                aria-label="emailname"
                aria-describedby="basic-addon1"
                placeholder="Ingrese el nombre de la tarea"
                style={{
                  marginTop: "-3rem",
                  fontSize: "22px",
                  width: "28rem",
                  textAlign: "left",
                  marginLeft: "29%",
                  background: "transparent",
                  border: 2,
                  color: "black",
                  "::placeholder": {
                    color: "black",
                  },
                }}
              />
              <div
                style={{
                  borderBottom: "1px solid white",
                  marginLeft: "32%",
                  width: "132%",
                }}
              ></div>

              <h1
                className="title-project "
                style={{ color: "black", marginLeft: "4.2rem" }}
              >
                2.{" "}
              </h1>

              <textarea
                name="descriptionTask"
                value={descriptionTask}
                onChange={handleInputChange}
                className="form-control"
                aria-label="emailname"
                aria-describedby="basic-addon1"
                placeholder="Ingrese la descripción de la tarea"
                style={{
                  marginTop: "-3rem",
                  fontSize: "22px",
                  width: "28rem",
                  height: "10rem", // Ajusta la altura del textarea según tus necesidades
                  textAlign: "left",
                  marginLeft: "28%",
                  background: "transparent",
                  border: "2px", // Asegúrate de especificar un valor (por ejemplo, "2px") para el borde
                  color: "black",
                  resize: "none",
                  "::placeholder": {
                    color: "black",
                  }, // Evita que el usuario redimensione el textarea
                }}
              />
              <div
                style={{
                  borderBottom: "1px solid white",
                  marginLeft: "32%",
                  width: "132%",
                }}
              ></div>

              <h1
                className="title-project "
                style={{ color: "black", marginLeft: "4.2rem" }}
              >
                3.{" "}
              </h1>
              <div
                className="subtitle-home"
                style={{
                  marginTop: "-3rem",
                  marginLeft: "8rem",
                  fontSize: "15px",
                  color: "black",
                  width:'70%'
                }}
              >
                {" "}
                Ingrese la fecha en que va a ejecutar esta tarea
              </div>
              <div style={{ marginLeft: "8rem", marginTop: "1rem" }}>
                <div className="date-picker-container">
                  <DatePicker
                    selected={dateInital}
                    onChange={(date) => handleDateInitialChange(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Fecha de inicio"
                    showYearDropdown
                    scrollableYearDropdown
                    className="custom-datepicker"
                  />
                </div>
              </div>

              <h1
                className="title-project "
                style={{
                  color: "black",
                  marginLeft: "26.2rem",
                  marginTop: "-5.9rem",
                }}
              >
                4.{" "}
              </h1>
              <div
                className="subtitle-home"
                style={{
                  marginTop: "-3.2rem",
                  marginLeft: "30rem",
                  fontSize: "15px",
                  color: "black",
                  width: "75%",
                }}
              >
                {" "}
                Ingrese la fecha en que planea terminar esta tarea
              </div>
              <div style={{ marginLeft: "30rem", marginTop: "1rem" }}>
                <div className="date-picker-container">
                  <DatePicker
                    selected={DateFinish}
                    onChange={(date) => handleDateFinishChange(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Fecha final"
                    showYearDropdown
                    scrollableYearDropdown
                    className="custom-datepicker"
                  />
                </div>
              </div>
            </div>
            <h1
              className="title-project "
              style={{ color: "black", marginLeft: "4.2rem" }}
            >
              5.{" "}
            </h1>
            <input
              name="budgetTask"
              value={budgetTask}
              onChange={handleInputChange}
              type="text"
              pattern="[0-9]*" // Patrón para aceptar solo números
              className="form-control"
              aria-label="emailname"
              aria-describedby="basic-addon1"
              placeholder="Ingrese el presupuesto total de la tarea (solo números)"
              style={{
                marginTop: "-3rem",
                fontSize: "22px",
                width: "38rem",
                textAlign: "left",
                marginLeft: "19%",
                background: "transparent",
                border: 2,
                color: "black",
                "::placeholder": {
                  color: "black",
                },
              }}
            />
            <div
              style={{
                borderBottom: "1px solid white",
                marginLeft: "20%",
                width: "90%",
              }}
            ></div>
          </div>

          <div className="col-xs-4 col-sm-6 col-md-6 col-lg-4">
            <img
              src={img_info}
              style={{
                marginTop: "4rem",
                maxWidth: "2.3rem",
                marginLeft: "12rem",
              }}
              className="btnAddLider"
            />

            <div
              className="subtitle-home"
              style={{
                marginTop: "-2.5rem",
                marginLeft: "18rem",
                width: "95%",
                color: "black",
              }}
            >
              {" "}
              Al inicio de la tarea, el estado por defecto corresponde a la
              primera fase, donde se establece el plan, el alcance inicial y los
              recursos financieros. También se identifican los miembros del
              equipo y las partes interesadas internas o externas.
            </div>
            <h1
              className="title-project "
              style={{ color: "black", marginLeft: "12rem", marginTop: "1rem" }}
            >
              6.{" "}
            </h1>
            <div
              className="subtitle-home"
              style={{
                marginTop: "-2.7rem",
                marginLeft: "18rem",
                fontSize: "15px",
                color: "black",
                width: "75%",
              }}
            >
              {" "}
              Seleccione el responsable de la tarea a realizar
            </div>
            <div className=" container mt-2" style={{}}>
              <MaterialTable
                title=""
                columns={columns}
                data={responsables && responsables}
                onRowClick={handleRowClick}
                options={options}
                style={{
                  marginTop: "-2rem",
                  maxWidth: "40.5rem",
                  marginLeft: "-5rem",
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
              src={btn_lider}
              style={{
                marginTop: "1%",
                maxWidth: "12rem",
                marginLeft: "20rem",
              }}
              onClick={handleCreateTask}
              className="btnAddLider"
            />
          </div>
        </div>
      </div>
      <ModalAgregarLider />
    </>
  );
};

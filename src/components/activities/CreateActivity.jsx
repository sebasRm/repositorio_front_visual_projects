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
import CardRecursos from "../cards/CardRecursos";
//import { consutarLideres } from "../actions/apis";
import CardLider from "../cards/CardLider";
import {
  consultarResponsables,
  consultarActividadesMetaInicio,
  consultarActividadesMetas,
  consultarActividadesMetaOrganizacion,
  consultarActividadesMetaEjecucion,
  consultarActividadesMetaCierre,
  actualizarEstadoMeta
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
export const CreateActivity = () => {
  //const urlServer = "http://localhost:4000/api";
  const breakpoint = [
    { width: 1, itemsToShow: 2 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 2 },
    { width: 1200, itemsToShow: 6 },
  ];
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lideres, leader, responsables, dateInitialActivity, goal, recursos } =
    useSelector((state) => state);

  const initiEvent = {
    nameActivity: "",
    descriptionActivity: "",
    budgetActivity: "",
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

  const { nameActivity, descriptionActivity, budgetActivity } = formValues;

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
  const [isChecked, setIsChecked] = useState(false);
  async function createActivity() {
    let activity = {
      data: {
        activity: {
          nombre: nameActivity,
          descripcion: descriptionActivity,
          presupuesto: budgetActivity,
          fechaInicio: dateInital,
          fechaFinal: DateFinish,
          usuario: selectedRowValue.idUsuario,
          meta: goal.id,
          cronograma: isChecked,
        },
      },
    };
    await axios({
      method: "post",
      url: urlServer + "/crear/actividad",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420",
      },
      data: activity,
    })
      .then(async (resJson) => {
        let metaEstado = {
          data:{
            goal: {
              idMeta: goal.id,
            },
          }
          
        };
        Swal.fire("Éxito", "La Actividad fue creada con éxito", "success");
        let activity = resJson.data.data;
        dispatch(AddActivityToStorange(activity));
        await dispatch(actualizarEstadoMeta(metaEstado));
        await dispatch(consultarActividadesMetaInicio(goal.id));
        await dispatch(consultarActividadesMetas(goal.id));
        await dispatch(consultarActividadesMetaOrganizacion(goal.id));
        await dispatch(consultarActividadesMetaEjecucion(goal.id));
        await dispatch(consultarActividadesMetaCierre(goal.id));

        navigate("/Activities");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, error);
      });
  }

  const handleCreateActivity = () => {
    nameActivity !== ""
      ? descriptionActivity !== ""
        ? dateInital !== null
          ? DateFinish !== null
            ? budgetActivity !== ""
              ? selectedRowValue !== null
                ? createActivity()
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

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
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
              style={{ marginTop: "7.5rem", color: "black" }}
            >
              {" "}
              Crea una nueva Actividad{" "}
            </h1>
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-8">
              <h1
                className="title-project "
                style={{ color: "black", marginLeft: "4.2rem" }}
              >
                1.{" "}
              </h1>
              <input
                name="nameActivity"
                value={nameActivity}
                onChange={handleInputChange}
                type="text"
                className="form-control"
                aria-label="emailname"
                aria-describedby="basic-addon1"
                placeholder="Ingrese el nombre de la actividad"
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
                name="descriptionActivity"
                value={descriptionActivity}
                onChange={handleInputChange}
                className="form-control"
                aria-label="emailname"
                aria-describedby="basic-addon1"
                placeholder="Ingrese la descripción de la actividad"
                style={{
                  marginTop: "-3rem",
                  fontSize: "22px",
                  width: "28rem",
                  height: "8rem", // Ajusta la altura del textarea según tus necesidades
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
                  width: "70%",
                  marginTop: "-3rem",
                  marginLeft: "8rem",
                  fontSize: "15px",
                  color: "black",
                }}
              >
                {" "}
                Ingrese la fecha en que va a ejecutar esta actividad
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
                  marginLeft: "27.5rem",
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
                Ingrese la fecha en que planea terminar esta actividad
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
            <div
              className="subtitle-home"
              style={{
                marginTop: "-3.2rem",
                marginLeft: "8rem",
                fontSize: "15px",
                color: "black",
                width: "75%",
              }}
            >
              {" "}
              Si esta actividad hace parte de su cronograma planeado incialmente
              marque el chekbox
            </div>
            <div
              style={{
                marginTop: "-2.2rem",
                marginLeft: "37rem",
                color: "black",
                display: "flex",
              }}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                style={{
                  width: "30px",
                  height: "30px",
                }}
              />
            </div>
            <div
              style={{
                borderBottom: "1px solid white",
                marginLeft: "20%",
                width: "90%",
                marginTop: "2rem",
              }}
            ></div>

            <h1
              className="title-project "
              style={{ color: "black", marginLeft: "4.2rem" }}
            >
              6.{" "}
            </h1>
            <input
              name="budgetActivity"
              value={budgetActivity}
              onChange={handleInputChange}
              type="text"
              pattern="[0-9]*" // Patrón para aceptar solo números
              className="form-control"
              aria-label="emailname"
              aria-describedby="basic-addon1"
              placeholder="Ingrese el presupuesto total de la actividad (solo números)"
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
                marginTop: "2rem",
              }}
            ></div>
          </div>

          <div className="col-xs-4 col-sm-6 col-md-6 col-lg-4">
            <img
              src={img_info}
              style={{
                marginTop: "4rem",
                maxWidth: "2.3rem",
                marginLeft: "17rem",
              }}
              className="btnAddLider"
            />

            <div
              className="subtitle-home"
              style={{
                marginTop: "-2.5rem",
                marginLeft: "20rem",
                width: "95%",
                color: "black",
              }}
            >
              {" "}
              Al inicio de la actividad, el estado por defecto corresponde a la
              primera fase, donde se establece el plan, el alcance inicial y los
              recursos financieros. También se identifican los miembros del
              equipo y las partes interesadas internas o externas.
            </div>
            <h1
              className="title-project "
              style={{ color: "black", marginLeft: "17rem", marginTop: "1rem" }}
            >
              7.{" "}
            </h1>
            <div
              className="subtitle-home"
              style={{
                marginTop: "-2.7rem",
                marginLeft: "20rem",
                fontSize: "15px",
                color: "black",
                width: "75%",
              }}
            >
              {" "}
              Seleccione el responsable de la actitividad a realizar
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
                  maxWidth: "45.5rem",
                  marginLeft: "2rem",
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
              onClick={handleCreateActivity}
              className="btnAddLider"
            />
          </div>
        </div>
      </div>
      <ModalAgregarLider />
    </>
  );
};

import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import axios, { formToJSON } from "axios";
import Swal from "sweetalert2";

import img_info from "../../img/img-info.png";
import btn_lider from "../../img/btn-continuar.png";

import { useDispatch, useSelector } from "react-redux";

import { useAlert } from "react-alert";

import { useNavigate } from "react-router-dom";
import CardRecursos from "../cards/CardRecursos";
import {
  consultarResponsables,
  consultarActividadesMetaInicio,
  consultarActividadesMetas,
  consultarActividadesMetaOrganizacion,
  consultarActividadesMetaEjecucion,
  consultarActividadesMetaCierre,
  consultarActividadPlaneada,
  actualizarActividad,
  consultarRecursoActividad,
  consultarPresupuestoActividad
} from "../../actions/apis";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "../../css/activities.css";

import MaterialTable, { MTableBody, MTableBodyRow } from "@material-table/core";
import {
  AddActivityToStorange,
  modalDetailActivity,
  AddCreateRecursoActividadToStorange
} from "../../actions/events";
import { urlServer } from "../../actions/apis";
import { Modal, ModalHeader, FormGroup } from "reactstrap";
import { ModalAgregarRecurso } from "./ModalAgregarRecurso";

export const ModalDetailActivity = (props) => {
  const formatCurrency = (number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
    }).format(number);
  };
  //console.log("soy el props1", props);
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    lideres,
    leader,
    responsables,
    dateInitialActivity,
    goal,
    user,
    detailActivityProject,
    activityPlaned,
    recursos,presupuestoActividad
  } = useSelector((state) => state);
  //console.log("soy el activityPlaned", props.totalRecursos);
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
    // console.log("soy el rowData", rowData);
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
  const breakpoint = [
    { width: 1, itemsToShow: 2 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 2 },
    { width: 1200, itemsToShow: 6 },
  ];

  function handleCrearRecurso(){
  dispatch(AddCreateRecursoActividadToStorange(true))
  }
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
        Swal.fire("Éxito", "La Actividad fue creada con éxito", "success");
        let activity = resJson.data.data;
        dispatch(AddActivityToStorange(activity));
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

  const handleCreateActivity = async () => {
    //console.log("soy el selectedRowValue", selectedRowValue)
    if (
      nameActivity == "" &&
      descriptionActivity == "" &&
      dateInital == null &&
      DateFinish == null &&
      budgetActivity == "" &&
      selectedRowValue == null
    ) {
      alert.error("No hay cambios que actualizar");
    } else {
      let actividad = {
        data: {
          activity: {
            idActividad: props?.activity?.idActividad,
            nombre: nameActivity ? nameActivity : props?.activity?.nombre,
            descripcion: descriptionActivity
              ? descriptionActivity
              : props?.activity?.descripcion,
            presupuesto: budgetActivity
              ? budgetActivity
              : props?.activity?.presupuesto,
            fechaInicio: dateInital
              ? dateInital
              : new Date(activityPlaned?.fechaInicio),
            fechaFinal: DateFinish
              ? DateFinish
              : new Date(activityPlaned?.FechaFinal),
            usuario: selectedRowValue && selectedRowValue.idUsuario,
          },
        },
      };

      dispatch(actualizarActividad(actividad));
      let data = {
        activity: {
          nombreActividad: nameActivity,
        },
      };
      await dispatch(consultarActividadPlaneada(data));
      await dispatch(consultarActividadesMetas(goal.id));
      await dispatch(modalDetailActivity(false));
      setformValues({
        ...formValues,
        nameActivity: "",
        descriptionActivity: "",
        budgetActivity: "",
      });
    }
  };
  useEffect(() => {
    dispatch(consultarPresupuestoActividad(props?.activity?.idActividad));
    //dispatch(consultarRecursoActividad(props?.activity?.idActividad));
    dispatch(consultarResponsables());
    setSelectedRowValue(props?.activity?.Responsable_?.Usuario_);
    setSelectedRow(props?.activity?.Responsable_?.Usuario_?.idUsuario - 1);
    let data = {
      activity: {
        nombreActividad: props?.activity?.nombre,
      },
    };
    dispatch(consultarActividadPlaneada(data));
  }, [props.activity]);

  function handleCloseModal() {
    dispatch(modalDetailActivity(false));
    setformValues({
      ...formValues,
      nameActivity: "",
      descriptionActivity: "",
      budgetActivity: "",
    });
  }

  return (
    <Modal
      className=""
      isOpen={detailActivityProject}
      style={{ marginTop: "2%", maxWidth: "100rem", maxHeight: "100rem" }}
    >
      <div className="row ">
        <div
          className="col-xs-4 col-sm-6 col-md-6 col-lg-4"
          style={{ marginLeft: "6rem" }}
        >
          <h1
            className="title-project "
            style={{ marginTop: "2rem", color: "black" }}
          >
            {" "}
            Detalles de la actividad{" "}
          </h1>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-8">
            <h1
              className="title-project "
              style={{ color: "black", marginLeft: "4.2rem" }}
            >
              1.{" "}
            </h1>
            <h5
              className="title-project "
              style={{
                color: "black",
                marginLeft: "7.2rem",
                marginTop: "-2.5rem",
              }}
            >
              Nombre:{" "}
            </h5>
            <input
              name="nameActivity"
              value={nameActivity}
              onChange={handleInputChange}
              type="text"
              className="form-control"
              aria-label="emailname"
              aria-describedby="basic-addon1"
              placeholder={props && props?.activity?.nombre}
              style={{
                marginTop: "0.5rem",
                fontSize: "17px",
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
            <h5
              className="title-project "
              style={{
                color: "black",
                marginLeft: "7.2rem",
                marginTop: "-2.5rem",
              }}
            >
              Descripción:{" "}
            </h5>
            <textarea
              name="descriptionActivity"
              value={descriptionActivity}
              onChange={handleInputChange}
              className="form-control"
              aria-label="emailname"
              aria-describedby="basic-addon1"
              placeholder={props && props?.activity?.descripcion}
              style={{
                marginTop: "0.5rem",
                fontSize: "14px",
                width: "35rem",
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
              style={{
                color: "black",
                marginLeft: "4.2rem",
                marginTop: "-2rem",
              }}
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
              Ingrese la fecha en que va a ejecutar esta actividad
            </div>
            <div style={{ marginLeft: "8rem", marginTop: "1rem" }}>
              <div className="date-picker-container">
                <DatePicker
                  selected={dateInital}
                  onChange={(date) => handleDateInitialChange(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText={
                    activityPlaned
                      ? activityPlaned.fechaInicio
                      : "Fecha de inicio"
                  }
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
                marginLeft: "27.2rem",
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
                  placeholderText={
                    activityPlaned ? activityPlaned.FechaFinal : "Fecha final"
                  }
                  showYearDropdown
                  scrollableYearDropdown
                  className="custom-datepicker"
                />
              </div>
            </div>
          </div>
          <img
            src={img_info}
            style={{
              marginTop: "4rem",
              maxWidth: "2.3rem",
              marginLeft: "4rem",
            }}
            className="btnAddLider"
          />

          <div
            className="subtitle-home"
            style={{
              marginTop: "-2.5rem",
              marginLeft: "8rem",
              width: "100%",
              color: "black",
              fontSize: "20px",
            }}
          >
            {" "}
            {props &&
              props?.activity?.Estado_.nombre +
                "=>" +
                props?.activity?.Estado_.descripcion}
          </div>
          {user?.liders[0] && <img
            src={btn_lider}
            style={{
              marginTop: "6rem",
              maxWidth: "12rem",
              marginLeft: "17rem",
              height: "50px",
            }}
            className="btnAddLider"
            onClick={handleCreateActivity}
          />}
        </div>

        <div className="col-xs-4 col-sm-6 col-md-6 col-lg-4">
          <h1
            className="btnAddLider"
            style={{
              color: "black",
              marginLeft: "54rem",
              marginTop: "1rem",
            }}
            onClick={handleCloseModal}
          >
            X{" "}
          </h1>

          <div
            style={{
              borderBottom: "1px solid white",
              marginLeft: "20%",
              width: "90%",
            }}
          ></div>
          <h1
            className="title-project "
            style={{ color: "black", marginLeft: "12rem", marginTop: "-2rem" }}
          >
            5.{" "}
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
            Selecciona el responsable de la actitividad a realizar
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
          <h1
            className="title-project "
            style={{
              color: "black",
              marginLeft: "12.2rem",
              marginTop: "-1rem",
            }}
          >
            6.{" "}
          </h1>
          <h5
            className="title-project "
            style={{
              color: "black",
              marginLeft: "19rem",
              marginTop: "-2.5rem",
              fontSize: "17px",
            }}
          >
            Recursos:{" "}
          </h5>
          <h5
            className="title-project "
            style={{
              marginTop: "-1.7rem",
              fontSize: "15px",
              width: "38rem",
              textAlign: "left",
              marginLeft: "24.5rem",
              background: "transparent",
              border: 2,
              color: "black",
              "::placeholder": {
                color: "black",
              },
            }}
          >
            {formatCurrency(props?.totalRecursos?.presupuestoTotal
              ? props.totalRecursos.presupuestoTotal
              : 0)}
          </h5>
          <h5
            className="title-project "
            style={{
              color: "black",
              marginLeft: "19rem",
              marginTop: "1rem",
              fontSize: "17px",
            }}
          >
            Presupuesto tareas:{" "}
          </h5>
          <h5
            className="title-project "
            style={{
              marginTop: "-1.7rem",
              fontSize: "15px",
              width: "38rem",
              textAlign: "left",
              marginLeft: "29rem",
              background: "transparent",
              border: 2,
              color: "black",
              "::placeholder": {
                color: "black",
              },
            }}
          >
            {formatCurrency(props?.totalRecursosTareas?.presupuestoTotal
              ? props.totalRecursosTareas.presupuestoTotal
              : 0)}
          </h5>
          <h5
            className="title-project "
            style={{
              color: "black",
              marginLeft: "39.2rem",
              marginTop: "-3.8rem",
              fontSize: "17px",
              width:'140%'
            }}
          >
            Total Presupuesto:{" "}
          </h5>
          <h5
            className="title-project "
            style={{
              marginTop: "-1.7rem",
              fontSize: "14px",
              width: "38rem",
              textAlign: "left",
              marginLeft: "49rem",
              background: "transparent",
              border: 2,
              color: "black",
              "::placeholder": {
                color: "black",
              },
            }}
          >
            {formatCurrency(presupuestoActividad && presupuestoActividad)}
          </h5>

          <h5
            className="title-project "
            style={{
              color: "black",
              marginLeft: "39.2rem",
              marginTop: "1rem",
              fontSize: "17px",
              width:'140%'
            }}
          >
            Presupuesto planeado:{" "}
          </h5>
          <h5
            className="title-project "
            style={{
              marginTop: "-1.8rem",
              fontSize: "15px",
              width: "38rem",
              textAlign: "left",
              marginLeft: "51rem",
              background: "transparent",
              border: 2,
              color: "black",
              "::placeholder": {
                color: "black",
              },
            }}
          >
            {formatCurrency(activityPlaned?.presupuesto && activityPlaned?.presupuesto)}
          </h5>
        </div>
        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-6">
          {recursos?.length > 0 ? (
            <Carousel
              breakPoints={breakpoint}
              style={user?.liders[0] ? { marginLeft: "47.8rem", marginTop: "-17rem" }:{ marginLeft: "47.8rem", marginTop: "-6rem" }}
            >
              {recursos?.map((recurso) => (
                <CardRecursos
                  id={recurso.idRecurso}
                  nombre={recurso.nombre}
                  descripcion={recurso.descripcion}
                  presupuesto={recurso.presupuesto}
                />
              ))}
            </Carousel>
          ) : (
            <div
              className="subtitle-home"
              style={{ marginLeft: "52rem", marginTop: "-15rem" }}
            >
              {" "}
              {user?.liders[0] && 'Aun no tienes recursos creados para esta actividad, Crea uno!'}
            </div>
          )}
        </div>
        {user?.liders[0] && <button
          className="btn btn-crear-recursos"
          style={{
            width: "150px",
            height: "50px",
            marginLeft: "18rem",
            marginTop: "-3rem",
          }}
          onClick={handleCrearRecurso}
        >
          Crear Recurso
        </button>}
      </div>
      <ModalAgregarRecurso idActividad={props?.activity?.idActividad}/>
    </Modal>
  );
};

import React, { useEffect, useState } from "react";
import "../../css/Card.css";
import NavBar from "../navbar/Navbar";
import imgCrearMeta from "../../img/btn-crear-meta.png";
import btnAddLider from "../../img/btn-crear-meta.png";
import uno from "../../img/uno.png";
import dos from "../../img/dos.png";
import imgCrearMetas from "../../img/img-info.png";
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
import CardMetas from "../cards/CardMetas";
import imgCrearActividad from "../../img/btn-crear-actividad.png";
import iconoUsuario from "../../img/directivo.png";
import { AddIdActivityToStorange, modalDetailActivity } from "../../actions/events";
import { MdTask } from "react-icons/md";
import { BiTask } from "react-icons/bi";
import { consultarMetasProyecto,consultarPresupuestoMeta } from "../../actions/apis";
import {
  consultarActividadesMetaInicio,
  consultarActividadesMetas,
  actualizarActividadesIOrganizacion,
  consultarActividadesMetaOrganizacion,
  actualizarActividadesInicio,
  actualizarActividadesEjecucion,
  consultarActividadesMetaEjecucion,
  consultarActividadesMetaCierre,
  actualizarActividadesCierre,
  consultarTareasActividades,
  consultarTareasActividadesInicio,
  consultarTareasActividadesOrganizacion,
  consultarTareasActividadesEjecucion,
  consultarTareasActividadesCierre,
  consultarRecursoActividad,
  totalPresupuestoRecursosActividad,
  totalPresupuestoTareasActividad
} from "../../actions/apis";
import {
  openModalCreateLeader,
  CancelConsultLiderToStorange,
  AddinfoProjectToStorange,
  modalDeleteActivity
} from "../../actions/events";
import { ModalAgregarLider } from "../modals/ModalAgregarLider";
import { GiStairsGoal } from "react-icons/gi";
import { AiOutlineEdit } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import Board from "./Board";
import { ModalDetailActivity } from "../modals/ModalDetailActivity";
import { MdDelete } from "react-icons/md";
import { ModalEliminarActividad } from "../modals/ModalEliminarActividad";
export const Activities = () => {
  const formatCurrency = (number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
    }).format(number);
  };
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activity, setActivity] = useState(null);
  const [createTaskButtom, setCreateTaskButtom] = useState(false);
  const [idActivitie, setIdActivitie] = useState(false);
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    projectLeader,
    goal,
    activitiesGoal,
    idActivity,
    taskActivities,
    taskactivitiesInitials,
    taskactivitiesOrganization,
    taskactivitiesEjecution,
    taskactivitiesFinish,
    detailActivityProject,
    detailTaskActivity,
    recursos,
    totalRecursos,
    totalRecursosTareas,
    presupuestoMeta,
    user
  } = useSelector((state) => state);
 
  const breakpoint = [
    { width: 1, itemsToShow: 2 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 2 },
    { width: 1200, itemsToShow: 6 },
  ];
  const initiEvent = {
    objectiveProyect: "",
    budgetProyect: "",
  };

  const [formValues, setformValues] = useState(initiEvent);

  const { objectiveProyect, budgetProyect } = formValues;

  const handleInputChange = ({ target }) => {
    setformValues({
      ...formValues,
      [target.name]: target.value,
    });
  };
  function hableCreateAntivitie() {
    navigate("/CreateActivity");
  }

  function handleCreateTask() {
    navigate("/CreateTask");
  }

  async function handleIdActivity(actividad) {
    dispatch(totalPresupuestoRecursosActividad(actividad?.idActividad))
    dispatch(totalPresupuestoTareasActividad(actividad?.idActividad))
    dispatch(consultarRecursoActividad(actividad?.idActividad));
    setCreateTaskButtom(true);
    setIdActivitie(actividad.idActividad);
    await dispatch(consultarTareasActividades(actividad.idActividad));
    await dispatch(consultarTareasActividadesInicio(actividad.idActividad));
    await dispatch(
      consultarTareasActividadesOrganizacion(actividad.idActividad)
    );
    await dispatch(consultarTareasActividadesEjecucion(actividad.idActividad));
    await dispatch(consultarTareasActividadesCierre(actividad.idActividad));
    await dispatch(AddIdActivityToStorange(actividad));
  }

  useEffect(() => {
    try {
      dispatch(consultarPresupuestoMeta(goal.id))
      projectLeader &&
        dispatch(
          consultarMetasProyecto(projectLeader[0]?.Cronograma_idCronograma)
        );
  
      dispatch(consultarActividadesMetaInicio(goal.id));
      dispatch(consultarActividadesMetas(goal.id));
    } catch (error) {
      console.log("error", error)
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 900); 
    } 
   
  }, [detailActivityProject,detailTaskActivity, ]);

  async function handleModalDetailActivity(activity) {
      dispatch(modalDetailActivity(true))
      setActivity(activity)
  }

  function handleModalDeleteActivity(activity){
    dispatch(modalDeleteActivity(true))
  }

  useEffect(() => {
    if (activitiesGoal?.length < 1) {
      setIdActivitie(false);
    }
  }, [activitiesGoal]);

  /*useEffect(() => {
   
    setLoading(true);
    
  }, [presupuestoMeta]);*/
  return (
    <>
      <div className="back">
        <NavBar />
        {  loading ? 
          <div className="subtitle-home" style={{fontSize:50, marginTop:'20rem', marginLeft:'30rem', width:'75%'}}>
            {" "}
                Cargando las actividades y tareas ...
          </div>
          : 
          (<>
                  <div className="row ">
          <div
            className="col-xs-4 col-sm-6 col-md-6 col-lg-4"
            style={{ marginLeft: "6rem" }}
          >
          
            <h1
              style={{
                marginLeft: "4rem",
                marginTop: "1rem",
                color: "#F5F7AF",
              }}
            >
              Meta {goal.id}
            </h1>

           <p
              style={{
                marginLeft: "4rem",
                marginTop: "0.5rem",
                color: "#F5F7AF",
                fontSize: 20,
              }}
            >
              Nombre:
            </p>
            <p
              style={{
                marginLeft: "12rem",
                marginTop: "-2.9rem",
                color: "#5254b1",
                fontSize: 20,
                width:'120%'
              }}
            >
              {goal.nombre}
            </p>
            <p
              style={{
                marginLeft: "4rem",
                marginTop: "-0.5rem",
                color: "#F5F7AF",
                fontSize: 20,
              }}
            >
              Descripción:
            </p>
            <p
              style={{
                marginLeft: "12rem",
                marginTop: "-2.9rem",
                color: "#5254b1",
                fontSize: 20,
                width:'155%'
              }}
            >
              {goal.descripcion ? goal.descripcion : 'No tiene descripción'}
            </p>
            <p
              style={{
                marginLeft: "4rem",
                marginTop: "-0.5rem",
                color: "#F5F7AF",
                fontSize: 20,
              }}
            >
              Estado:
            </p>
            <p
              style={{
                marginLeft: "12rem",
                marginTop: "-2.9rem",
                color: "#5254b1",
                fontSize: 20,
              }}
            >
              {presupuestoMeta ? presupuestoMeta.Estado_idEstado == 1 ?'Inicio':presupuestoMeta.Estado_idEstado == 2?'Organización' : presupuestoMeta.Estado_idEstado == 3?'Ejecución': presupuestoMeta.Estado_idEstado == 4?'Cierre':goal.estado:goal.estado}
            </p>
            <p
              style={{
                marginLeft: "22rem",
                marginTop: "-3rem",
                color: "#F5F7AF",
                fontSize: 20,
                width:'70%'
              }}
            >
             
              Presupuesto actividades cerradas:
            </p>
            <p
              style={{
                marginLeft: "42.5rem",
                marginTop: "-2.9rem",
                color: "#5254b1",
                fontSize: 20,
              }}
            >
              {formatCurrency(presupuestoMeta ? presupuestoMeta.presupuestoCerrado : goal.presupuesto)}
            </p>
        
            <p
              style={{
                marginLeft: "55rem",
                marginTop: "-3rem",
                color: "#F5F7AF",
                fontSize: 20,
                width:'70%'
              }}
            >
               Presupuesto total:
            </p>
            <p
              style={{
                marginLeft: "66rem",
                marginTop: "-2.9rem",
                color: "#5254b1",
                fontSize: 20,
              }}
            >
              {formatCurrency(presupuestoMeta ? presupuestoMeta.presupuesto : goal.presupuesto)}
            </p>

          </div>
          <div className="col-xs-4 col-sm-6 col-md-6 col-lg-4">
        
          {user?.liders[0] && <div
              className="card card-create-activities"
              style={{ marginTop: "1rem", marginLeft: "48rem" }}
              onClick={hableCreateAntivitie}
            >
              <div
                className="col"
                style={{ marginLeft: "1rem", marginRight: "1rem" }}
              >
                <h5 style={{ marginTop: "1.5rem",marginLeft: "-0.5rem" }}>Crear actividad</h5>
                <BiTask
                  size={30}
                  style={{ marginLeft: "8.5rem", marginTop: "-4.5rem" }}
                />
              </div>
            </div>}

            {idActivitie &&  user?.liders[0] && (
              <div
                className="card card-create-activities"
                style={{ marginTop: "-4.4rem", marginLeft: "35rem"}}
                onClick={handleCreateTask}
              >
                <div
                  className="col"
                  style={{ marginLeft: "1rem", marginRight: "1rem" }}
                >
                  <h5 style={{ marginTop: "1.5rem",marginLeft: "0.5rem" }}>Crear tarea</h5>
                  <MdTask
                    size={30}
                    style={{ marginLeft: "7.7rem", marginTop: "-4.5rem" }}
                  />
                </div>
              </div>
            )}  
          </div>
        </div>
        <div className="row" style={user?.liders[0] ?{ marginTop: "1rem" }:{ marginTop: "2rem" }} >
          <div className="col-xs-4 col-sm-6 col-md-2 col-lg-2">
            <div className="card card-activities">
              <div className="title-card-activities"> Actividades</div>
              <div className="horizontal-line"></div>
              <div className="tasks-container">
                <div className="activity-list">
                  {activitiesGoal &&
                    activitiesGoal.map((activity) => (
                      <div
                        className={`task-activities ${
                          idActivity?.idActividad &&
                          idActivity.idActividad === activity.idActividad
                            ? "selected"
                            : ""
                        }`}
                        key={activity.idActividad}
                        onMouseEnter={() =>
                          setSelectedActivity(activity.idActividad)
                        }
                        onMouseLeave={() => setSelectedActivity(null)}
                        onClick={() => handleIdActivity(activity)}
                      >
                        <div
                          className="status-circle"
                          style={{
                            backgroundColor:
                              activity.Estado_idEstado === 1
                                ? "red"
                                : activity.Estado_idEstado === 2
                                ? "orange"
                                : activity.Estado_idEstado === 3
                                ? "blue"
                                : "green",
                          }}
                        ></div>
                        <div>
                        
                          {user?.liders[0] ? <div
                            className="button-detail-task"
                            style={{
                              marginTop: "-1rem",
                              marginLeft: "11rem",
                              color: "black",
                              width:'8%'
                            }}
                            onClick={()=>handleModalDetailActivity(activity)}
                          >
                            <FaEye size={25} />
                          </div>:<div
                            className="button-detail-task"
                            style={{
                              marginTop: "-1rem",
                              marginLeft: "13rem",
                              color: "black",
                            }}
                            onClick={()=>handleModalDetailActivity(activity)}
                          >
                            <FaEye size={25} />
                          </div>}
                          {user?.liders[0] && <div
                            className="button-detail-task"
                            style={{
                              marginTop: "-1.6rem",
                              marginLeft: "13rem",
                              color: "black",
                            }}
                            onClick={()=>handleModalDeleteActivity(activity)}
                          >
                            <MdDelete size={25} />
                          </div>}
                          <p
                            style={{
                              marginTop: "-1.7rem",
                              marginLeft: "1rem",
                              width: "65%",
                            }}
                          >
                            {activity.nombre}
                          </p>
                          {/* Puedes agregar más información si es necesario */}
                          <p style={{ marginTop: "-0.8rem",}}>{formatCurrency(activity.presupuesto)}</p>
                          <p
                            style={{ marginTop: "-2.5rem", marginLeft: "10.5rem" }}
                          >
                            Tareas:{activity.contadorTareas}
                          </p>
                          <img
                            src={iconoUsuario}
                            style={{
                              width: "25px",
                              marginTop: "0.5em",
                            }}
                            alt="user-icon"
                          />
                          <div
                            className="col"
                            style={{
                              marginTop: "-1.5rem",
                              marginLeft: "2rem",
                            }}
                          >
                            {activity.Responsable_.Usuario_.nombre}
                          </div>
                        
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className="col-xs-4 col-sm-6 col-md-8 col-lg-8"
            style={{ marginLeft: "10rem", marginTop: "0.2rem" }}
          >
            <Board
              idActividad={idActivitie && idActivitie}
              taskActivities={taskActivities && taskActivities}
              taskactivitiesInitials={
                taskactivitiesInitials && taskactivitiesInitials
              }
              taskactivitiesOrganization={
                taskactivitiesOrganization && taskactivitiesOrganization
              }
              taskactivitiesEjecution={
                taskactivitiesEjecution && taskactivitiesEjecution
              }
              taskactivitiesFinish={
                taskactivitiesFinish && taskactivitiesFinish
              }
            />
          </div>
        </div>
          </>)

          }

      </div>
      <ModalDetailActivity activity={ activity && activity} recursos ={recursos&& recursos} totalRecursos={totalRecursos && totalRecursos} totalRecursosTareas = {totalRecursosTareas && totalRecursosTareas}/>
      <ModalEliminarActividad/>
    </>
  );
};

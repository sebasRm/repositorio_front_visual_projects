import { useDispatch, useSelector } from "react-redux";
import { MdDescription } from "react-icons/md";
import { BiRename } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import "../../css/Card.css";
import { GiCrane } from "react-icons/gi";
import { FaUserTie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  AddProjectToStorange,
  modalDetailRecurso,
  AddRecursoActividadToStorange,
  modalDeleteRecurso,
} from "../../actions/events";
import imgProyecto from "../../img/img-project.png";
import VelocimetroSPI from "../graphics/VelocimetroSPI";
import VelocimetroCPI from "../graphics/VelocimetroCPI";
import {
  consultarProyectoSPI,
  consultarProyectoCPI,
  consultarProyectoLider,
  contarActividades,
  contarActividadesFinalizadas,
  porcentajeActividadesFinalizadas,
  totalTareas,
  porcentajeTareasTerminadas,
} from "../../actions/apis";
import { FaEye } from "react-icons/fa";
import { ModalDetailRecurso } from "../modals/ModalDetailRecurso";
import { ModalEliminar } from "../modals/ModalEliminar";
import { MdDelete } from "react-icons/md";
const CardRecursos = (props) => {
  const formatCurrency = (number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
    }).format(number);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    lideres,
    leader,
    dataSpiProject,
    dataCpiProject,
    percentageFinishAct,
    percentageTask,
    user,
  } = useSelector((state) => state);

  function handleModalDetailRecurso(recurso) {
    console.log("estoy aqui", recurso);
    dispatch(AddRecursoActividadToStorange(recurso));
    dispatch(modalDetailRecurso(true));
  }
  function handleModalDeleteRecurso(recurso) {
    dispatch(AddRecursoActividadToStorange(recurso));
    dispatch(modalDeleteRecurso(true));
  }

  const handleProject = async () => {
    await dispatch(consultarProyectoLider(props?.idlider));
    await dispatch(contarActividades(props?.Cronograma_idCronograma));
    await dispatch(
      contarActividadesFinalizadas(props?.Cronograma_idCronograma)
    );
    await dispatch(
      porcentajeActividadesFinalizadas(props?.Cronograma_idCronograma)
    );
    await dispatch(totalTareas(props?.Cronograma_idCronograma));
    await dispatch(porcentajeTareasTerminadas(props?.Cronograma_idCronograma));
    await dispatch(AddProjectToStorange(props));
    navigate("/Proyecto");
  };
  return (
    <>
      <div className="card card-recursos">
        <div className="card-body card-body-liders">
          <div className="row ">
            <div
              className="col-xs-4 col-sm-4 col-md-4 col-lg-8"
              style={{
                marginLeft: "2rem",
                color: "white",
                fontSize: "12px",
                marginTop: "5px",
              }}
            >
              <div
                className="subtitle-info-project"
                style={{
                  marginLeft: "-2rem",
                  marginTop: "-0.3rem",
                  color: "#F5F7AF",
                }}
              >
                {" "}
                Id:
              </div>
              <div
                className="subtitle-info-project"
                style={{
                  marginLeft: "-0.5rem",
                  marginTop: "-1.6rem",
                  fontSize: 16,
                }}
              >
                {" "}
                {props.id}
              </div>
              <div
                className="button-detail-task"
                style={{
                  marginTop: "-2rem",
                  marginLeft: "10rem",
                  color: "white",
                }}
                onClick={() => handleModalDetailRecurso(props)}
              >
                <FaEye size={25} />
              </div>

              {user?.liders[0] && <div
                className="button-detail-task"
                style={{
                  marginTop: "-1.5rem",
                  marginLeft: "12.5rem",
                  color: "white",
                }}
                onClick={() => handleModalDeleteRecurso(props)}
              >
                <MdDelete size={25} />
              </div>}
            
              <div
                className="subtitle-info-project"
                style={{
                  marginLeft: "3rem",
                  marginTop: "-1.2rem",
                  fontSize: 16,
                  width: "85%",
                }}
              >
                {" "}
                {formatCurrency(props.presupuesto)}
              </div>

              <div
                className="subtitle-info-project"
                style={{
                  marginLeft: "-2rem",
                  marginTop: "0.5rem",
                  color: "#F5F7AF",
                  fontSize: 15,
                }}
              >
                {" "}
                Nombre:
              </div>
              <div
                className="subtitle-info-project"
                style={{
                  marginLeft: "-2rem",
                  marginTop: "-0.5rem",
                  fontSize: 16,
                  width: "180%",
                }}
              >
                {" "}
                {props.nombre}
              </div>
            </div>
          </div>

          <div className="row ">
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-5">
              <div className="row"></div>
              <div
                className="subtitle-info-project"
                style={{
                  marginLeft: "0.1rem",
                  marginTop: "0.5rem",
                  color: "#F5F7AF",
                  width: "150%",
                  fontSize: 15,
                }}
              >
                {" "}
                Descripción:
              </div>
            </div>
            <div
              className="subtitle-info-project"
              style={{
                marginLeft: "0.1rem",
                marginTop: "-0.2rem",
                fontSize: 14,
                width: "100%",
                height: "3rem",
              }}
            >
              {" "}
              {props.descripcion}
            </div>
          </div>
        </div>
      </div>
      <ModalDetailRecurso
        recurso={props && props}
        tarea={props.tarea && props.tarea}
        idTarea={props.idTarea && props.idTarea}
      />
      <ModalEliminar
        tarea={props.tarea && props.tarea}
        idTarea={props.idTarea && props.idTarea}
      />
    </>
  );
};

export default CardRecursos;

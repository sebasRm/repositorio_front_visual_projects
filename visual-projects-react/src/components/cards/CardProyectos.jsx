import { useDispatch, useSelector } from "react-redux";
import { MdDescription } from "react-icons/md";
import { BiRename } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import "../../css/Card.css";
import { GiCrane } from "react-icons/gi";
import { FaUserTie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AddProjectToStorange } from "../../actions/events";
import imgProyecto from "../../img/img-project.png";
import VelocimetroSPI from "../graphics/VelocimetroSPI";
import VelocimetroCPI from "../graphics/VelocimetroCPI";
import { MdDelete } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
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
import { modalDeleteProject,modalDetailProject } from "../../actions/events";
import { ModalEliminarProyecto } from "../modals/ModalEliminarProyecto";
import { ModalDetailProject } from "../modals/ModalDetailProject";
const CardProyectos = (props) => {
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
  } = useSelector((state) => state);

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
    console.log("soy el props", props);
    await dispatch(AddProjectToStorange(props));
    navigate("/Dashboard");
    //navigate("/Proyecto");
  };
  async function modalDeleteProjects() {
    dispatch(modalDeleteProject(true));
    await dispatch(AddProjectToStorange(props));
    //await dispatch(AddIdMetaToStorange(idMeta && idMeta));
  }

  async function modalDetailProjects(){
    
    dispatch(modalDetailProject(true));
    await dispatch(AddProjectToStorange(props));
  }
  return (
    <>
      <div className="card card-projects">
        <div className="card-body card-body-liders">
          <div className="row ">
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-2">
              <img
                src={imgProyecto}
                style={{
                  background: "#6DB8D0",
                  margin: "5px",
                  borderRadius: "5px",
                  width: "55px",
                  height: "50px",
                }}
              />
            </div>
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
                  marginLeft: "-4rem",
                  marginTop: "-0.3rem",
                  color: "#F5F7AF",
                }}
              >
                {" "}
                Id de proyecto:
              </div>
              <div
                className="subtitle-info-project"
                style={{
                  marginLeft: "4rem",
                  marginTop: "-1.5rem",
                  fontSize: 16,
                }}
              >
                {" "}
                {props.id}
              </div>
              <div
                className="button-detail-task"
                style={{
                  marginLeft: "21.5rem",
                  marginTop: "-1.5rem",
                  width:'12%'
                }}
                onClick={handleProject}
              >
                <FaEye size={35} />
              </div>
              <div
                className="button-detail-task"
                style={{
                  marginLeft: "25.8rem",
                  marginTop: "-2.2rem",
                }}
                onClick={() => modalDetailProjects()}
              >
                <AiOutlineEdit size={35} />
              </div>
              <div
                className="button-detail-task"
                style={{
                  marginLeft: "30rem",
                  marginTop: "-2.1rem",
                }}
                onClick={() => modalDeleteProjects(props.id)}
              >
                <MdDelete size={35} />
              </div>
              <div
                className="subtitle-info-project"
                style={{
                  marginLeft: "-4rem",
                  marginTop: "0.5rem",
                  color: "#F5F7AF",
                }}
              >
                {" "}
                Nombre:
              </div>
              <div
                className="subtitle-info-project"
                style={{
                  marginLeft: "1rem",
                  marginTop: "-1.6rem",
                  fontSize: 16,
                  width: "100%",
                }}
              >
                {" "}
                {props.nombre}
              </div>
            </div>
          </div>

          <div className="row " style={{display:'flex'}}>
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-5">
              <div
                className="subtitle-info-project"
                style={{
                  marginLeft: "0.1rem",
                  marginTop: "0.5rem",
                  color: "#F5F7AF",
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
                fontSize: 16,
                width: "100%",
                height: "3rem",
              }}
            >
              {" "}
              {props.descripcion}
            </div>
          </div>
          <div className="row" style={{display:'flex'}}>
            <div
              className="subtitle-info-project"
              style={{
                marginLeft: "0.1rem",
                marginTop: "4rem",
                color: "#F5F7AF",
              }}
            >
              {" "}
              Líder:
            </div>
            <div
              className="subtitle-info-project"
              style={{
                marginLeft: "4rem",
                marginTop: "-1.6rem",
                fontSize: 16,
                
              }}
            >
              {" "}
              {props.namelider}
            </div>

            <div
              className="subtitle-info-project"
              style={{
                marginLeft: "0.1rem", 
                marginTop: "0.5rem",
                color: "#F5F7AF",
              }}
            >
              {" "}
              Presupuesto:
            </div>
            <div
              className="subtitle-info-project"
              style={{
                marginLeft: "7.5rem",
                marginTop: "-1.6rem",
                fontSize: 16,
                width: "85%",
              }}
            >
              {" "}
              {formatCurrency(props.presupuesto)}
            </div>
          </div>
          <div className="card card-graphics-projects card1">
            <div
              className="grapich"
              style={{
                width: "10rem",
                height: "5rem",
                marginLeft: "0.7rem",

                marginTop: "1.5rem",
              }}
            >
              <VelocimetroSPI
                velocidad={Number(props?.indicator_spi?.spi.toFixed(3))}
              />
            </div>
          </div>

          <div className="card card-graphics-projects-cpi card1">
            <div
              className="grapich"
              style={{
                width: "10rem",
                height: "5rem",
                marginLeft: "0.6rem",
                padding: "5px 0",
                marginTop: "1.2rem",
              }}
            >
              <VelocimetroCPI
                velocidad={Number(props?.indicator_cpi?.cpi.toFixed(3))}
              />
            </div>
          </div>
        </div>
      </div>
      <ModalEliminarProyecto/>
      <ModalDetailProject/>
    </>
  );
};

export default CardProyectos;

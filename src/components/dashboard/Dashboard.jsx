import React, { useEffect, useState } from "react";
import "../../css/dashboard.css";
import NavBar from "../navbar/Navbar";
import imgInfo from "../../img/btn-inf-proyecto.png";
import imgActividades from "../../img/btn-navegate-actividades.png";
import imgTareas from "../../img/btn-tareas.png";
import imgIndicador from "../../img/btn-indicadores.png";
import imgMetas from "../../img/btn-metas.png";
import { DashboardIndicators } from "./DashboardIndicators";
import { useDispatch, useSelector } from "react-redux";
import { GraphicsActivities } from "../graphics/GraphicActivities";
import { useAlert } from "react-alert";
import Carousel from "react-elastic-carousel";
import { useNavigate } from "react-router-dom";
import { GraphicsTaks } from "../graphics/GraphicTaks";
import {
  consultarMetasProyecto,
  contadorEstadoTareas,
  consultarProyectoSPI,
  consultarProyectoCPI,
  infotmationIndicators,
} from "../../actions/apis";
import { DashboardGraphic } from "./DashboardGraphic";
import bntPlanificacion from "../../img/btn-planificacion.png";
import { GraphicGoals } from "../graphics/GraphicGoals";
import { MdDashboard } from "react-icons/md";
import { GiStairsGoal } from "react-icons/gi";
import {
  openModalCreateLeader,
  CancelConsultLiderToStorange,
  AddinfoProjectToStorange,
} from "../../actions/events";
import { Button } from "reactstrap";

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lideres, leader, projectLeader, goalsProject, user } = useSelector(
    (state) => state
  );

  function handlePlanification() {
    navigate("/Planification");
  }
  function handleMetas() {
    if (projectLeader[0].Planeacion_idPlaneacion == null) {
      alert.error("Aun no has registrado la planificación de tu proyecto");
    } else {
      navigate("/Metas");
    }
  }
  useEffect(() => {
    try {
      if (projectLeader) {
        dispatch(
          consultarMetasProyecto(projectLeader[0]?.Cronograma_idCronograma)
        );
        dispatch(contadorEstadoTareas(projectLeader[0]?.Cronograma_idCronograma));
        let data = {
          project: {
            idCronograma: projectLeader[0]?.Cronograma_idCronograma,
            idPlaneacion: projectLeader[0]?.Planeacion_idPlaneacion,
          },
        };
        dispatch(consultarProyectoSPI(data));
        dispatch(consultarProyectoCPI(data));
        data = {
          activity: {
            idCronograma: projectLeader[0]?.Cronograma_idCronograma,
          },
        };
        dispatch(infotmationIndicators(data));
      }
    }  catch (error) {
      console.log("error", error)
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 900); 
    } 
    
  }, []);
  function handleNavegate() {
    navigate("/Proyecto");
  }

  return (
    <>
      <div className="back">
        <NavBar />

        <div className="row ">
          <div
            className="col-xs-4 col-sm-6 col-md-6 col-lg-4"
            style={{ marginLeft: "3.8rem" }}
          >
            <h1
              className="title-project "
              style={{
                marginTop: "1rem",
                marginLeft: "1rem",
                color: "#F5F7AF",
              }}
            >
              {" "}
              Visual projects Dashboard{" "}
            </h1>
            <div
              style={{
                marginTop: "-3.2rem",
                marginLeft: "31rem",
                color: "#F5F7AF",
              }}
            >
              <MdDashboard size={45} />
            </div>

            {user?.directors[0] && (
              <button
                className="btn btn-crear-liders"
                onClick={handleNavegate}
                style={{
                  marginLeft: "36rem",
                  width: "25%",
                  marginTop: "-3.9rem",
                }}
              >
                Detalles proyecto
              </button>
            )}

            {loading ? (
              <div
                className="subtitle-home"
                style={{
                  fontSize: 50,
                  marginTop: "15rem",
                  marginLeft: "35rem",
                  width: "115%",
                }}
              >
                {" "}
                Cargando dashboard ...
              </div>
            ) : (
              <div className="row" style={{ marginTop: "0.5rem" }}>
                <div className="col-xs-4 col-sm-6 col-md-8 col-lg-8">
                  <DashboardIndicators />
                  {projectLeader[0].Planeacion_idPlaneacion == null ? (
                    <>
                      <div
                        style={{
                          marginLeft: "1.5rem",
                          width: "200%",
                          fontSize: "20px",
                          marginTop: "4rem",
                        }}
                      >
                        Aún no has registrado ninguna meta o planificación para
                        tu proyecto. ¡Hazlo aquí mismo y comienza a dar forma a
                        tus metas!
                      </div>
                      <img
                        src={bntPlanificacion}
                        style={{
                          marginTop: "5rem",
                          width: "17rem",
                          marginLeft: "17rem",
                        }}
                        className="btnAddLider"
                        onClick={handlePlanification}
                      />
                    </>
                  ) : goalsProject ? (
                    <>
                      <div
                        className="card-boton-metas cardMetas"
                        onClick={handleMetas}
                      >
                        <div
                          style={{ marginLeft: "-1.5rem", marginTop: "-1rem" }}
                        >
                          Metas
                        </div>
                        <div
                          style={{
                            marginTop: "-0.3rem",
                            marginLeft: "-1.3rem",
                          }}
                        >
                          <GiStairsGoal size={35} />
                        </div>
                      </div>
                      <div
                        style={{
                          marginLeft: "22rem",
                          width: "200%",
                          fontSize: "20px",
                          fontStyle: "oblique",
                          color: "#5254b1",
                          marginTop: "-12rem",
                        }}
                      >
                        Estado de metas
                      </div>
                      <div
                        style={{
                          marginLeft: "12rem",
                          width: "250rem",
                          height: "18rem",
                          marginTop: "0.2rem",
                        }}
                      >
                        <GraphicGoals />
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        style={{
                          marginLeft: "1.5rem",
                          width: "200%",
                          fontSize: "20px",
                          marginTop: "4rem",
                        }}
                      >
                        Aún no has registrado ninguna meta para tu proyecto.
                        ¡Selecciona el boton "Metas" y comienza a dar forma a
                        tus metas!
                      </div>
                      <div
                        className="card-boton-metas cardMetas"
                        onClick={handleMetas}
                        style={{ marginLeft: "20rem", marginTop: "3rem" }}
                      >
                        <div
                          style={{ marginLeft: "-1.5rem", marginTop: "-1rem" }}
                        >
                          Metas
                        </div>
                        <div
                          style={{
                            marginTop: "-0.3rem",
                            marginLeft: "-1.3rem",
                          }}
                        >
                          <GiStairsGoal size={35} />
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="col-xs-4 col-sm-6 col-md-6 col-lg-4">
                  <DashboardGraphic />
                </div>
                <div className="col-xs-4 col-sm-6 col-md-6 col-lg-8"></div>
              </div>
            )}

            <div className="row"></div>
          </div>
        </div>
      </div>
    </>
  );
};

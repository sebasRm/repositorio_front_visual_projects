import NavBar from "./navbar/Navbar";
import imgFondo from "../img/direccionProyectos.png";
import imgLider from "../img/img-lider.png";
import imgFondoLider from "../img/img-fondo-lider.png";
import btnCrearProyecto from "../img/btn-crear-proyecto.png";
import btnLideres from "../img/btn-lideres.png";
import Carousel from "react-elastic-carousel";
import "../css/home.css";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { FaUserTie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  consutarLideres,
  consultarProyectos,
  consultarProyectosDirector,
  consultarProyectoLider,
  contarActividades,
  contarActividadesFinalizadas,
  porcentajeActividadesFinalizadas,
  totalTareas,
  porcentajeTareasTerminadas,
} from "../actions/apis";
import CardProyectos from "./cards/CardProyectos";
import CardInfoProyecto from "./cards/CardInfoProyecto";
import { useEffect, useState } from "react";

import { HiSearch } from "react-icons/hi";
export const Home = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    user,
    projects,
    projectLeader,
    totalActivities,
    totalActivitiesFinish,
    percentageFinishAct,
    totalTask,
    percentageTask,
  } = useSelector((state) => state);

  const breakpoint = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 1 },
    { width: 768, itemsToShow: 1 },
    { width: 1200, itemsToShow: 6 },
  ];
  const handleLideres = () => {
    dispatch(consutarLideres());
    navigate("/Lideres");
  };

  const handleCrearProjecto = () => {
    navigate("/CreateProjects");
  };
  useEffect(() => {
    try {
      user?.directors[0] &&
        dispatch(consultarProyectosDirector(user?.directors[0].idDirector));
      if (user.liders[0]) {
        dispatch(consultarProyectoLider(user.liders[0].idLider));
        if (projectLeader) {
          dispatch(
            contarActividades(projectLeader[0]?.Cronograma_idCronograma)
          );
          dispatch(
            contarActividadesFinalizadas(
              projectLeader[0]?.Cronograma_idCronograma
            )
          );
          dispatch(
            porcentajeActividadesFinalizadas(
              projectLeader[0]?.Cronograma_idCronograma
            )
          );
          dispatch(totalTareas(projectLeader[0]?.Cronograma_idCronograma));
          dispatch(
            porcentajeTareasTerminadas(
              projectLeader[0]?.Cronograma_idCronograma
            )
          );
        } else {
          dispatch(consultarProyectoLider(user.liders[0].idLider));
        }
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 900);
    }
  }, []);

  if (totalActivities == undefined && projectLeader) {
    dispatch(contarActividades(projectLeader[0]?.Cronograma_idCronograma));
    dispatch(
      contarActividadesFinalizadas(projectLeader[0]?.Cronograma_idCronograma)
    );
    dispatch(
      porcentajeActividadesFinalizadas(
        projectLeader[0]?.Cronograma_idCronograma
      )
    );
    dispatch(totalTareas(projectLeader[0]?.Cronograma_idCronograma));
    dispatch(
      porcentajeTareasTerminadas(projectLeader[0]?.Cronograma_idCronograma)
    );
  }

  return (
    <>
      <div className="back">
        <NavBar />
        <div className="row">
          <div className="col-xs-4 col-sm-6 col-md-6 col-lg-8">
            <h3
              className="title-home "
              style={{ color: "#F5F7AF", marginLeft: "12rem" }}
            >
              {" "}
              Bienvenido al menú principal{" "}
            </h3>
            <h3 style={{ color: "#F5F7AF", marginLeft: "12rem" }}>
              {user?.liders[0] ? "Líder " : "Director "}
              {user?.nombre}
            </h3>
            {loading ? (
              <div
                className="subtitle-home"
                style={{
                  fontSize: 50,
                  marginTop: "15rem",
                  marginLeft: "35rem",
                  width: "75%",
                }}
              >
                {" "}
                Cargando datos del proyecto ...
              </div>
            ) : user?.liders[0] ? (
              <>
                <div
                  className="subtitle-home"
                  style={{
                    fontSize: 20,
                    marginTop: "-5rem",
                    marginLeft: "50rem",
                    width: "55%",
                  }}
                >
                  {" "}
                  Aquí dispones de tu proyecto para gestionar, donde puedes
                  organizar actividades, tareas y otros elementos para seguir de
                  cerca su desarrollo.
                </div>
                {user.liders[0] &&
                  projectLeader &&
                  totalActivitiesFinish &&
                  percentageFinishAct && (
                    <CardInfoProyecto
                      nombre={projectLeader[0].nombre}
                      fechaInicio={projectLeader[0].fechaInicio}
                      fechaFinal={projectLeader[0].fechaFinal}
                      idProyecto={projectLeader[0].idProyecto}
                      descripcion={projectLeader[0].descripcion}
                      estadoDescripcion={projectLeader[0].Estado_.descripcion}
                      estado={projectLeader[0].Estado_.nombre}
                      totalActivities={totalActivities}
                      totalActivitiesFinish={
                        totalActivitiesFinish[0].contadorActividad
                      }
                      totalTask={totalTask}
                      presupuesto={projectLeader[0]?.Planeacion_?.presupuesto}
                    />
                  )}
              </>
            ) : (
              <>
                <div className="row">
                  <div className="col-xs-4 col-sm-6 col-md-6 col-lg-4">
                    <img
                      src={btnLideres}
                      style={{
                        marginTop: "-5.5rem",
                        maxWidth: "9rem",
                        marginLeft: "67rem",
                      }}
                      onClick={handleLideres}
                      className="btnAddLider"
                    />
                  </div>
                  <div className="col-xs-4 col-sm-6 col-md-6 col-lg-4">
                    <img
                      src={btnCrearProyecto}
                      style={{
                        marginTop: "-5.5rem",
                        maxWidth: "13rem",
                        marginLeft: "51rem",
                      }}
                      onClick={handleCrearProjecto}
                      className="btnAddLider"
                    />
                  </div>
                </div>

                <div
                  className="subtitle-home"
                  style={{
                    fontSize: 20,
                    marginTop: "-1rem",
                    marginLeft: "12rem",
                    width: "60%",
                  }}
                >
                  {" "}
                  Desde aquí podrá desplegar diferentes funcionalidades de
                  creación tanto de los líderes como como de los proyectos que
                  posteriormente se gestionarán. Además, podrá visualizar,
                  editar y eliminar los proyectos existentes.
                </div>

                {projects?.length > 0 ? (
                  <Carousel
                    breakPoints={breakpoint}
                    style={{ marginLeft: "23%", marginTop: "1.5rem" }}
                  >
                    {projects?.map((project) => (
                      <CardProyectos
                        id={project.idProyecto}
                        nombre={project.nombre}
                        descripcion={project.descripcion}
                        namelider={project.Lider_.Usuario_.nombre}
                        idlider={project.Lider_.idLider}
                        estado={project.Estado_.nombre}
                        estadoDescripcion={project.Estado_.descripcion}
                        indicator_spi={project.indicator_spi}
                        indicator_cpi={project.indicator_cpi}
                        Cronograma_idCronograma={
                          project.Cronograma_idCronograma
                        }
                        presupuesto={
                          project.Planeacion_?.presupuesto
                            ? project.Planeacion_?.presupuesto
                            : 0
                        }
                        fechaInicio={project.fechaInicio}
                        fechaFinal={project.fechaFinal}
                      />
                    ))}
                  </Carousel>
                ) : (
                  <div className="subtitle-home">
                    {" "}
                    Aún no tiene proyectos creados. ¡Crea uno!
                  </div>
                )}
              </>
            )}
          </div>
          {user?.liders[0] && (
            <div className="col-xs-4 col-sm-6 col-md-6 col-lg-4">
              <img
                src={imgFondoLider}
                className="imgFondo"
                style={{
                  maxWidth: "100%",
                  marginTop: "75%",
                  marginLeft: "20%",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

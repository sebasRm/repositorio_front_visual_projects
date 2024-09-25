import NavBar from "../navbar/Navbar";
import imgFondoLider from "../../img/img-fondo-lider.png";
import imgFondo from "../../img/liderProyecto.png";
import { useDispatch, useSelector } from "react-redux";
import { FaUserTie } from "react-icons/fa";
import "../../css/project.css";
import CardInfoProyecto from "../cards/CardInfoProyecto";
import { useEffect, useState } from "react";
export const Project = () => {
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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      projectLeader && setLoading(false);
      
    } catch (error) {
      console.log("error", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 900);
    }
  }, []);

  return (
    <>
      <div className="back">
        <NavBar />

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
        ) : (
          <div className="row" style={{ marginTop: "5%" }}>
            <CardInfoProyecto
              nombre={projectLeader && projectLeader[0]?.nombre}
              fechaInicio={projectLeader && projectLeader[0]?.fechaInicio}
              fechaFinal={projectLeader && projectLeader[0]?.fechaFinal}
              idProyecto={projectLeader && projectLeader[0]?.idProyecto}
              descripcion={projectLeader && projectLeader[0]?.descripcion}
              estadoDescripcion={
                projectLeader && projectLeader[0]?.Estado_?.descripcion
              }
              estado={projectLeader && projectLeader[0]?.Estado_?.nombre}
              totalActivities={totalActivities && totalActivities}
              totalActivitiesFinish={
                projectLeader && totalActivitiesFinish[0]?.contadorActividad
              }
              totalTask={totalTask && totalTask}
              presupuesto={projectLeader && projectLeader[0]?.presupuesto}
            />
            <div className="col-xs-4 col-sm-6 col-md-6 col-lg-4">
              <img
                src={imgFondoLider}
                className="imgFondo"
                style={{
                  maxWidth: "100%",
                  marginTop: "-60%",
                  marginLeft: "85rem",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

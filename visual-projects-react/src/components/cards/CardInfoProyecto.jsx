import { useDispatch, useSelector } from "react-redux";
import { MdEmail } from "react-icons/md";
import { BiRename } from "react-icons/bi";
import imgProject from "../../img/img-project.png";
import imgCPI from "../../img/img-indicador-cpi.png";
import imgSPI from "../../img/img-indicador-spi.png";
import btnSeguimiento from "../../img/btn-seguimiento-proyecto.png";
import React from "react";
import "../../css/Card.css";
import { FaUserTie } from "react-icons/fa";
import { GraphicsActivities } from "../graphics/GraphicActivities";
import { GraphicsTaks } from "../graphics/GraphicTaks";
import { useNavigate } from "react-router-dom";

const CardInfoProyecto = (props) => {

  const formatCurrency = (number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
    }).format(number);
  };
  const navigate = useNavigate();
  const { percentageFinishAct, percentageTask, project ,projectLeader} = useSelector(
    (state) => state
  );

  const handleNavigateDashboard = () => {
    navigate("/Dashboard");
  };
  return (
    <>
      <div className="row ">
        <div className="col-xs-4 col-sm-6 col-md-6 col-lg-6 card-project">
          <div className="row ">
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-2">
              <img
                src={imgProject}
                style={{
                  background: "#6DB8D0",
                  margin: "5px",
                  borderRadius: "5px",
                  width: "95px",
                  marginTop: "1.5rem",
                }}
              />
            </div>
            <div
              className="col-xs-4 col-sm-4 col-md-4 col-lg-9"
              style={{
                marginLeft: "2rem",
                color: "white",
                fontSize: "12px",
                marginTop: "5px",
              }}
            >
              {props && (
                <>
                  <div
                    className="subtitle-info-project"
                    style={{
                      marginLeft: "-3rem",
                      marginTop: "1rem",
                      color: "#F5F7AF",
                    }}
                  >
                    {" "}
                    Nombre:
                  </div>
                  <div
                    className="subtitle-info-project"
                    style={{ marginLeft: "3rem", marginTop: "-1.7rem" }}
                  >
                    {props.nombre}
                  </div>

                  <div
                    className="subtitle-info-project"
                    style={{
                      marginLeft: "20rem",
                      marginTop: "1rem",
                      color: "#F5F7AF",
                    }}
                  >
                    {" "}
                    Fecha de creación:
                  </div>
                  <div
                    className="subtitle-info-project"
                    style={{ marginLeft: "30rem", marginTop: "-1.7rem" }}
                  >
                    {props.fechaInicio}
                  </div>
                  <div
                    className="subtitle-info-project"
                    style={{
                      marginLeft: "37.5rem",
                      marginTop: "-1.7rem",
                      color: "#F5F7AF",
                    }}
                  >
                    {" "}
                    $:
                  </div>
                  <div
                    className="subtitle-info-project"
                    style={{ marginLeft: "39.5rem", marginTop: "-1.7rem" }}
                  >
                   {formatCurrency(props.presupuesto? props.presupuesto : project?.presupuesto ? project.presupuesto:0)} 
                  </div>
                  <div
                    className="subtitle-info-project"
                    style={{
                      marginLeft: "20rem",
                      marginTop: "1rem",
                      color: "#F5F7AF",
                    }}
                  >
                    {" "}
                    Fecha de cierre:
                  </div>
                  <div
                    className="subtitle-info-project"
                    style={{ marginLeft: "30rem", marginTop: "-1.7rem" }}
                  >
                    {props.fechaFinal
                      ? props.fechaFinal
                      : "El proyecto está activo"}
                  </div>

                  <div
                    className="subtitle-info-project"
                    style={{
                      marginLeft: "-3rem",
                      marginTop: "-2rem",
                      color: "#F5F7AF",
                    }}
                  >
                    {" "}
                    Id proyecto:
                  </div>
                  <div
                    className="subtitle-info-project"
                    style={{
                      marginLeft: "4.5rem",
                      marginTop: "-1.6rem",
                    }}
                  >
                    {props.idProyecto}
                  </div>

                  <div
                    className="subtitle-info-project"
                    style={{
                      marginLeft: "-12.5rem",
                      marginTop: "1.8rem",
                      color: "#F5F7AF",
                    }}
                  >
                    {" "}
                    Descripción:
                  </div>
                  <div
                    className="subtitle-info-project"
                    style={{ marginLeft: "-5.8rem", marginTop: "-1.6rem" }}
                  >
                    {props.descripcion}
                  </div>

                  <div
                    className="subtitle-info-project"
                    style={{
                      marginLeft: "-12.5rem",
                      marginTop: "1.8rem",
                      color: "#F5F7AF",
                    }}
                  >
                    {" "}
                    Estado:
                  </div>
                  <div
                    className="subtitle-info-project"
                    style={{ marginLeft: "-6rem", marginTop: "-1.6rem" }}
                  >
                    {props.estado ? props.estado:projectLeader[0]?.Estado_?.nombre }{"-->"}{  props.estadoDescripcion ? props.estadoDescripcion: projectLeader[0]?.Estado_?.descripcion}
                  </div>
                  <div className="row">
                    <div className="col-xs-4 col-sm-4 col-md-5 col-lg-4">
                      <div
                        className="subtitle-info-project"
                        style={{
                          marginLeft: "-3.8rem",
                          marginTop: "3rem",
                          width: "110%",
                          color: "#F5F7AF",
                        }}
                      >
                        {" "}
                        Actividades
                      </div>

                      <div
                        className="grapich"
                        style={{
                          width: "19rem",
                          height: "15rem",
                          marginLeft: "-5.5rem",
                          padding: "10px 0",
                          marginTop: "-2rem",
                        }}
                      >
                        <GraphicsActivities
                          position={"right"}
                          data={percentageFinishAct}
                        />
                      </div>

                      <div
                        className="subtitle-info-project"
                        style={{
                          marginLeft: "-2.5rem",
                          color: "#F5F7AF",
                          marginTop: "-2rem",
                        }}
                      >
                        {" "}
                        Total:{props.totalActivities}
                      </div>
                    </div>

                    <div className="col-xs-4 col-sm-4 col-md-5 col-lg-4">
                      <div
                        className="subtitle-info-project"
                        style={{
                          marginLeft: "0.1rem",
                          marginTop: "3rem",
                          color: "#F5F7AF",
                        }}
                      >
                        {" "}
                        Tareas
                      </div>

                      <div
                        className="grapich"
                        style={{
                          width: "19rem",
                          height: "15rem",
                          marginLeft: "-3rem",
                          padding: "10px 0",
                          marginTop: "-2rem",
                        }}
                      >
                        <GraphicsTaks
                          position={"right"}
                          data={percentageTask}
                        />
                      </div>

                      <div
                        className="subtitle-info-project"
                        style={{
                          marginLeft: "-0.1rem",
                          color: "#F5F7AF",
                          marginTop: "-2rem",
                        }}
                      >
                        {" "}
                        Total:{props.totalTask}
                      </div>
                    </div>

                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                      <img
                        src={btnSeguimiento}
                        style={{
                          background: "#6DB8D0",
                          margin: "5px",
                          borderRadius: "5px",
                          width: "165px",
                          marginTop: "6.5rem",
                          marginLeft: "2rem",
                        }}
                        className="btnAddLider"
                        onClick={handleNavigateDashboard}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardInfoProyecto;

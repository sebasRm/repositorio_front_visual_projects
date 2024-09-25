import React, { useEffect, useState } from "react";
import "../../css/dashboard.css";
import NavBar from "../navbar/Navbar";
import imgFondo from "../../img/create-project.png";
import { GraphicsActivities } from "../graphics/GraphicActivities";
import { useDispatch, useSelector } from "react-redux";
import { GraphicsTaks } from "../graphics/GraphicTaks";
import { useAlert } from "react-alert";
import Carousel from "react-elastic-carousel";
import { useNavigate } from "react-router-dom";
import VelocimetroSPI from "../graphics/VelocimetroSPI";
import VelocimetroCPI from "../graphics/VelocimetroCPI";
import { consutarLideresSinProyecto } from "../../actions/apis";
import {
  openModalCreateLeader,
  CancelConsultLiderToStorange,
  AddinfoProjectToStorange,
  modalInformationSPI,
  modalInformationCPI
} from "../../actions/events";
import { HiInformationCircle } from "react-icons/hi2";
import { ModalInformationSPI } from "../modals/ModalInformationSPI";
import { ModalInformationCPI } from "../modals/ModalInformationcCPI";

export const DashboardGraphic = () => {
  const formatCurrency = (number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
    }).format(number);
  };
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lideres, leader, dataSpiProject, dataCpiProject, percentageFinishAct , percentageTask} = useSelector(
    (state) => state
  );

  const initiEvent = {
    nameProyect: "",
    descriptionProyect: "",
  };

  const [formValues, setformValues] = useState(initiEvent);

  const { nameProyect, descriptionProyect } = formValues;

  const handleInputChange = ({ target }) => {
    setformValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleRegisterProject = () => {
    if (nameProyect !== "") {
      if (descriptionProyect !== "") {
        dispatch(consutarLideresSinProyecto());
        dispatch(AddinfoProjectToStorange({ nameProyect, descriptionProyect }));
        navigate("/RegisterLider");
      } else {
        alert.error("Ingresa la descripción del proyecto");
      }
    } else {
      alert.error("Ingresa el nombre del proyecto");
    }
  };

  const handleModalCreateLeader = () => {
    dispatch(openModalCreateLeader());
  };
  const handleInformationSPI = () => {
    dispatch(modalInformationSPI(true));
  };
  const handleInformationCPI = () => {
    dispatch(modalInformationCPI(true));
  };
  const velocidadDeInternet = 0.9;
  return (
    <>
      <div className="dashboard-graphcs-activities">
        <div className="cardGraphic special-card-1">
          <div className="cardGraphic-title">Indicador SPI</div>
          <div className="inforIndicator" onClick={handleInformationSPI} style={{ marginLeft: "19rem", marginTop: "-3rem" }}  >
            <HiInformationCircle size={50}  />
          </div>

          {dataSpiProject && (
            <>
              <div
                className="grapich"
                style={{
                  width: "15rem",
                  height: "15rem",
                  marginLeft: "4.5rem",
                  padding: "10px 0",
                  marginTop: "2rem",
                }}
              >
                <VelocimetroSPI
                  velocidad={Number(dataSpiProject?.spi.toFixed(3))}
                />
              </div>
              <div
                className="card"
                style={{
                  border: 0,
                  background: "#3498db",
                  borderRadius: 0,
                  width: "35px",
                  height: "30px",
                  marginTop: "-6rem",
                  marginLeft: "1rem",
                }}
              >
                <div
                  style={{
                    fontSize: "22px",
                    width: "155%",
                    alignItems: "center",
                    marginLeft: "0.1rem",
                  }}
                >
                  EV =
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    marginLeft: "3.6rem",
                    width: "300%",
                    marginTop: "-1.7rem",
                  }}
                >
                  {formatCurrency(dataSpiProject?.ev)}
                </div>
              </div>
              <div
                className="card"
                style={{
                  border: 0,
                  background: "#4CAF50",
                  borderRadius: 0,
                  width: "35px",
                  height: "30px",
                  marginTop: "-1.9rem",
                  marginLeft: "12rem",
                }}
              >
                <div
                  style={{
                    fontSize: "22px",
                    width: "150%",
                    alignItems: "center",
                    marginLeft: "0.1rem",
                  }}
                >
                  PV =
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    marginLeft: "3.5rem",
                    width: "300%",
                    marginTop: "-1.7rem",
                  }}
                >
                  {formatCurrency(dataSpiProject?.pv)}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="cardGraphic special-card-2">
          <div className="cardGraphic-title">Indicador CPI</div>
          <div className="inforIndicator" onClick={handleInformationCPI}  style={{ marginLeft: "19rem", marginTop: "-3rem" }}>
            <HiInformationCircle size={50} />
          </div>
          {dataSpiProject && (
            <>
              <div
                className="grapich"
                style={{
                  width: "15rem",
                  height: "15rem",
                  marginLeft: "4.5rem",
                  padding: "10px 0",
                  marginTop: "2rem",
                }}
              >
                <VelocimetroCPI
                  velocidad={Number(dataCpiProject?.cpi.toFixed(3))}
                />
              </div>
              <div
                className="card"
                style={{
                  border: 0,
                  background: "#3498db",
                  borderRadius: 0,
                  width: "35px",
                  height: "30px",
                  marginTop: "-6rem",
                  marginLeft: "1rem",
                }}
              >
                <div
                  style={{
                    fontSize: "22px",
                    width: "155%",
                    alignItems: "center",
                    marginLeft: "0.1rem",
                  }}
                >
                  EV =
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    marginLeft: "3.6rem",
                    width: "300%",
                    marginTop: "-1.7rem",
                  }}
                >
                  {formatCurrency(dataCpiProject?.ev)}
                </div>
              </div>
              <div
                className="card"
                style={{
                  border: 0,
                  background: "#4CAF50",
                  borderRadius: 0,
                  width: "35px",
                  height: "30px",
                  marginTop: "-1.9rem",
                  marginLeft: "12rem",
                }}
              >
                <div
                  style={{
                    fontSize: "22px",
                    width: "150%",
                    alignItems: "center",
                    marginLeft: "0.1rem",
                  }}
                >
                  AC =
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    marginLeft: "3.5rem",
                    width: "300%",
                    marginTop: "-1.7rem",
                  }}
                >
                  {formatCurrency(dataCpiProject?.ac)}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="cardGraphic special-card-3">
          <div className="cardGraphic-title">Estado de actividades</div>
          <div
            className="grapich"
            style={{
              width: "15rem",
              height: "15rem",
              marginLeft: "3.5rem",
              padding: "10px 0",
            }}
          >
            <GraphicsActivities position={"bottom"} data={percentageFinishAct} />
          </div>
        </div>
        <div className="cardGraphic special-card-4">
          <div className="cardGraphic-title">Estado de tareas</div>
          <div
            className="grapich"
            style={{
              width: "15rem",
              height: "15rem",
              marginLeft: "3.5rem",
              padding: "10px 0",
            }}
          >
            <GraphicsTaks position={"bottom"}  data={percentageTask}/>
          </div>
        </div>
      </div>
      <ModalInformationSPI/>
      <ModalInformationCPI/>
    </>
  );
};

import React, { useEffect, useState } from "react";
import "../../css/project.css";
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
//import { consutarLideres } from "../actions/apis";
import CardLider from "../cards/CardLider";
import {  agregarPlaneacion,consultarProyectos, consultarProyectosDirector } from "../../actions/apis";
import {
  openModalCreateLeader,
  CancelConsultLiderToStorange,
  AddinfoProjectToStorange,
} from "../../actions/events";
import { ModalAgregarLider } from "../modals/ModalAgregarLider";

export const Planification = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectLeader,user } = useSelector((state) => state);

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

  const handleAddPlaneation = () => {
    if (objectiveProyect !== "") {
      if (budgetProyect !== "") {
        let data = {
            planeacion:{
                idProyecto:projectLeader&& projectLeader[0].idProyecto,
                objetivoProyecto:objectiveProyect,
                presupuestoProyecto:budgetProyect
            }
        }
        dispatch(agregarPlaneacion(data));
        if(user?.directors[0] ){
          dispatch(consultarProyectosDirector(user?.directors[0].idDirector));
          navigate("/Home");
        }else{
          navigate("/Metas");
        }
      } else {
        alert.error("Ingresa el presupuesto del proyecto");
      }
    } else {
      alert.error("Ingresa el obetivo del proyecto");
    }
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
            <h1 className="title-project " style={{ marginTop: "5rem" }}>
              {" "}
              Binvenido a la planeación del proyecto{" "}
            </h1>
            <div className="subtitle-home"  style={{ marginLeft: "4rem", width:'150%' }}>
                  {" "}
                  Comencemos por registrar el objetivo principal de tu proyecto, así como tu idea general y lo que esperas lograr o desplegar a través de él. ¡Vamos a dar forma a tus metas y aspiraciones!
                </div>
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-8">
              <img
                src={uno}
                style={{
                  marginTop: "8%",
                  maxWidth: "3rem",
                  marginLeft: "4rem",
                }}
                className="btnAddLider"
              />

              <textarea
                name="objectiveProyect"
                value={objectiveProyect}
                onChange={handleInputChange}
                className="form-control"
                aria-label="emailname"
                aria-describedby="basic-addon1"
                placeholder="Ingresa el objetivo del proyecto"
                style={{
                  marginTop: "-3rem",
                  fontSize: "22px",
                  width: "24rem",
                  height: "10rem", 
                  textAlign: "left",
                  marginLeft: "28%",
                  background: "transparent",
                  border: "2px", 
                  color: "black",
                  resize: "none", 
                }}
              />
              <div
                style={{
                  borderBottom: "1px solid white",
                  marginLeft: "32%",
                  width: "95%",
                }}
              ></div>

              <img
                src={dos}
                style={{
                  marginTop: "10%",
                  maxWidth: "3rem",
                  marginLeft: "4rem",
                }}
                className="btnAddLider"
              />

              <input
                name="budgetProyect"
                value={budgetProyect}
                onChange={handleInputChange}
                type="text"
                pattern="[0-9]*" // Patrón para aceptar solo números
                className="form-control"
                aria-label="emailname"
                aria-describedby="basic-addon1"
                placeholder="Ingresa el presupuesto total del proyecto (solo números)"
                style={{
                  marginTop: "-3rem",
                  fontSize: "22px",
                  width: "38rem",
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
                  width: "95%",
                }}
              ></div>
            </div>

            <img
              src={btn_lider}
              style={{
                marginTop: "15%",
                maxWidth: "12rem",
                marginLeft: "20rem",
              }}
              onClick={handleAddPlaneation}
              className="btnAddLider"
            />
          </div>

          <div className="col-xs-4 col-sm-6 col-md-6 col-lg-4">
            <img
              src={imgFondo}
              style={{
                marginTop: "35%",
                maxWidth: "35rem",
                marginLeft: "25rem",
              }}
              className="imgFondo"
            />
          </div>
        </div>
      </div>
      <ModalAgregarLider />
    </>
  );
};

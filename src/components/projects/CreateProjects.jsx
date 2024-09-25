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
import { useAlert } from 'react-alert'
import Carousel from "react-elastic-carousel";
import { useNavigate } from "react-router-dom";
//import { consutarLideres } from "../actions/apis";
import CardLider from "../cards/CardLider";
import { consutarLideresSinProyecto } from "../../actions/apis";
import {
  openModalCreateLeader,
  CancelConsultLiderToStorange,
  AddinfoProjectToStorange
} from "../../actions/events";
import { ModalAgregarLider } from "../modals/ModalAgregarLider";

export const CreateProjects = () => {
  const alert = useAlert()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lideres, leader } = useSelector((state) => state);

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

  const handleRegisterProject = ()=>{
    if(nameProyect!=='')
    {
      if(descriptionProyect!=='')
      {
        dispatch(consutarLideresSinProyecto())
        dispatch(AddinfoProjectToStorange({nameProyect,descriptionProyect}))
        navigate("/RegisterLider");
      }
      else{
        alert.error('Ingresa la descripción del proyecto')
      }
    }
    else{
      alert.error('Ingresa el nombre del proyecto')
    }
  }


  const handleModalCreateLeader = () => {
    dispatch(openModalCreateLeader());
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
              Comencemos con el nombre y descripción de su proyecto{" "}
            </h1>
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

              <input
                name="nameProyect"
                value={nameProyect}
                onChange={handleInputChange}
                type="text"
                className="form-control"
                aria-label="emailname"
                aria-describedby="basic-addon1"
                placeholder="Ingresa el nombre del proyecto"
                style={{
                  marginTop: "-3rem",
                  fontSize: "22px",
                  width: "24rem",
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

              <img
                src={dos}
                style={{
                  marginTop: "10%",
                  maxWidth: "3rem",
                  marginLeft: "4rem",
                }}
                className="btnAddLider"
              />

              <textarea
                name="descriptionProyect"
                value={descriptionProyect}
                onChange={handleInputChange}
                className="form-control"
                aria-label="emailname"
                aria-describedby="basic-addon1"
                placeholder="Ingresa la descripción del proyecto"
                style={{
                  marginTop: "-3rem",
                  fontSize: "22px",
                  width: "24rem",
                  height: "10rem", // Ajusta la altura del textarea según tus necesidades
                  textAlign: "left",
                  marginLeft: "28%",
                  background: "transparent",
                  border: "2px", // Asegúrate de especificar un valor (por ejemplo, "2px") para el borde
                  color: "black",
                  resize: "none", // Evita que el usuario redimensione el textarea
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
              src={img_info}
              style={{
                marginTop: "1.5rem",
                maxWidth: "2.3rem",
                marginLeft: "4rem",
              }}
              className="btnAddLider"
            />
            <div
              className="subtitle-home"
              style={{ marginTop: "-2.5rem", marginLeft: "8rem" }}
            >
              {" "}
              Al inicio del proyecto, el estado por defecto corresponde a la
              primera fase donde se establecen: el plan, el alcance inicial y los
              recursos financieros. También se identifican los miembros del
              equipo y las partes interesadas internas o externas.
            </div>
            <img
              src={btn_lider}
              style={{
                marginTop: "3%",
                maxWidth: "12rem",
                marginLeft: "20rem",
              }}
              onClick={handleRegisterProject}
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

import React, { useEffect, useState } from "react";
import "../../css/meta.css";
import NavBar from "../navbar/Navbar";
import {  consultarMetasProyecto } from "../../actions/apis";
import imgPlanos from "../../img/fondo-planos.png";
import imgCrearMeta from "../../img/btn-crear-nueva-meta.png";
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
import { crearMeta } from "../../actions/apis";
import {
  openModalCreateLeader,
  CancelConsultLiderToStorange,
  AddinfoProjectToStorange,
} from "../../actions/events";
import { ModalAgregarLider } from "../modals/ModalAgregarLider";

export const CreateMeta = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectLeader, goalsProject } = useSelector((state) => state);

  const initiEvent = {
    nameGoal: "",
    descriptionGoal: "",
    budgetGoal: "",
  };
  
  const [formValues, setformValues] = useState(initiEvent);

  const { nameGoal, descriptionGoal, budgetGoal } = formValues;

  const handleInputChange = ({ target }) => {
    setformValues({
      ...formValues,
      [target.name]: target.value,
    });
  };
  async function createGoal() {
    if(nameGoal!=='')
      {
        if(descriptionGoal!=='')
        {
          console.log("soy el projectLeader", projectLeader)
          let data = {
            goal: {
              idCronograma: projectLeader && projectLeader[0].Cronograma_idCronograma ,
              nombre: nameGoal,
              descripcion: descriptionGoal,
              presupuesto: budgetGoal,
            },
          };
          dispatch(crearMeta(data))
          await dispatch(consultarMetasProyecto(projectLeader[0]?.Cronograma_idCronograma));
          navigate("/Metas");
        }
        else{
          alert.error('Ingresa la descripción de la meta')
        }
      }
      else{
        alert.error('Ingresa el nombre de la meta')
      }
  }

  return (
    <>
      <div className="back">
        <NavBar />

        <div className="row ">
          <div className="col-xs-4 col-sm-6 col-md-6 col-lg-6">
            <div className="card card-meta">
              <h1 className="title-project " style={{ color: "black" }}>
                {" "}
                Nueva meta{" "}
              </h1>
              <h1 className="title-project " style={{ color: "black" }}>
                {" "}
                1.{" "}
                <input
                  name="nameGoal"
                  value={nameGoal}
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  aria-label="emailname"
                  aria-describedby="basic-addon1"
                  placeholder="Ingresa el nombre de la meta"
                  style={{
                    marginTop: "-3rem",
                    fontSize: "22px",
                    width: "24rem",
                    textAlign: "left",
                    marginLeft: "10%",
                    background: "transparent",
                    border: 1,
                    color: "black",
                    "::placeholder": {
                      color: "black",
                    },
                  }}
                />
                <div
                  style={{
                    borderBottom: "1px solid black",
                    marginLeft: "12%",
                    width: "70%",
                  }}
                ></div>
              </h1>

              <h1 className="title-project " style={{ color: "black" }}>
                2.{" "}
                <textarea
                  name="descriptionGoal"
                  value={descriptionGoal}
                  onChange={handleInputChange}
                  className="form-control"
                  aria-label="emailname"
                  aria-describedby="basic-addon1"
                  placeholder="Ingresa la descripción de la meta"
                  style={{
                    marginTop: "-3rem",
                    fontSize: "22px",
                    width: "24rem",
                    height: "10rem", // Ajusta la altura del textarea según tus necesidades
                    textAlign: "left",
                    marginLeft: "10%",
                    background: "transparent",
                    border: "2px", // Asegúrate de especificar un valor (por ejemplo, "2px") para el borde
                    color: "black",
                    resize: "none", // Evita que el usuario redimensione el textarea
                  }}
                />
                <div
                  style={{
                    borderBottom: "1px solid black",
                    marginLeft: "12%",
                    width: "70%",
                  }}
                ></div>
              </h1>
            
              <img
                src={imgCrearMeta}
                style={{
                  marginTop: "2.5rem",
                  width: "12rem",
                  marginLeft: "17rem",
                }}
                className="btnAddLider"
                onClick={createGoal}
              />
            </div>
          </div>
          <div className="col-xs-4 col-sm-6 col-md-6 col-lg-6">
            <img
              src={imgPlanos}
              className="imgFondo"
              style={{
                width: "50%",
                marginTop: "22%",
                marginLeft: "30rem",
                margin: "none",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

import React, { useEffect, useState } from "react";
import "../../css/project.css";
import NavBar from "../navbar/Navbar";
import imgCrearMeta from "../../img/btn-crear-meta.png";
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
import CardMetas from "../cards/CardMetas";
import {
  consultarMetasProyecto,
  consultarProyectoLider,
} from "../../actions/apis";
import {
  openModalCreateLeader,
  CancelConsultLiderToStorange,
  AddinfoProjectToStorange,
} from "../../actions/events";
import { ModalAgregarLider } from "../modals/ModalAgregarLider";
import Board from "../activities/Board";
import { GiStairsGoal } from "react-icons/gi";
export const Metas = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectLeader, goalsProject, user } = useSelector((state) => state);
  const [loading, setLoading] = useState(true);
  
  const breakpoint = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 1 },
    { width: 768, itemsToShow: 1 },
    { width: 1200, itemsToShow: 6 },
  ];
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
  function handleCreateMeta() {
    navigate("/CrearMeta");
  }
  useEffect(() => {
    try {
      projectLeader &&
      dispatch(
        consultarMetasProyecto(projectLeader[0]?.Cronograma_idCronograma)
      );
    user && dispatch(consultarProyectoLider(user?.liders[0]?.idLider));
    } catch (error) {
      console.log("error", error)
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

        <div className="row ">
          <div
            className="col-xs-4 col-sm-6 col-md-6 col-lg-4"
            style={{ marginLeft: "6rem" }}
          >
            <h1
              className="title-project "
              style={{
                marginTop: "2rem",
                marginLeft: "22rem",
                color: "#F5F7AF",
              }}
            >
              {" "}
              Metas{" "}
            </h1>
            <div
              style={{
                marginTop: "-3.5rem",
                marginLeft: "30rem",
                color: "#F5F7AF",
              }}
            >
              <GiStairsGoal size={45} />
            </div>

            <div className="subtitle-home"  style={{ marginTop:'-3rem',marginLeft: "35rem" }}>
              {" "}
              En este espacio, podrás visualizar y crear las distintas metas de
              tu proyecto.
            </div>

            {user?.liders[0] &&<img
              src={imgCrearMeta}
              style={{
                marginTop: "-8rem",
                width: "12rem",
                marginLeft: "70rem",
              }}
              className="btnAddLider"
              onClick={handleCreateMeta}
            />}
          </div>
        </div>
        { loading ? 
          <div className="subtitle-home" style={{fontSize:50, marginTop:'15rem', marginLeft:'45rem', width:'75%'}}>
            {" "}
                Cargando las metas ...
          </div>
          : 
          <div className="row">
          <div className="col-xs-4 col-sm-6 col-md-6 col-lg-8">
            {goalsProject.length>0 ? (
              <>
                <Carousel
                  breakPoints={breakpoint}
                  style={{ marginLeft: "25%" }}
                >
                  {goalsProject?.map((goal) => (
                    <CardMetas
                      id={goal.idMeta}
                      nombre={goal.nombre}
                      descripcion={goal.descripcion}
                      presupuesto={goal.presupuesto}
                      estado={goal.Estado_.nombre}
                      dataActivities={goal.totalActivitiesGoal}
                      totalAcitivities={goal.activitiesTotal}
                      dataTask={goal.totaltaskGoal}
                      totalTask={goal.taskTotal}
                    />
                  ))}
                </Carousel>
              </>
            ) : (
              <div
                className="subtitle-home"
                style={{
                  fontSize: "35px",
                  marginLeft: "32rem",
                  marginTop: "10rem",
                  width: "70%",
                }}
              >
                {" "}
                {user?.liders[0] ? "Aún no has establecido ninguna meta. ¡Registra una ahora mismo para iniciar tu proyecto!":"El líder aún no ha creado ninguna meta."}
              </div>
            )}
          </div>
        </div>
          
          }
       
      </div>
    </>
  );
};

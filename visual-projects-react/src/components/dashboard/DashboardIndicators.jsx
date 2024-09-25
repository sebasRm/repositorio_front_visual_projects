import React, { useEffect, useState } from "react";
import "../../css/dashboard.css";
import NavBar from "../navbar/Navbar";
import imgFondo from "../../img/create-project.png";

import { useDispatch, useSelector } from "react-redux";

import { useAlert } from "react-alert";
import Carousel from "react-elastic-carousel";
import { useNavigate } from "react-router-dom";

import { consutarLideresSinProyecto } from "../../actions/apis";
import {
  openModalCreateLeader,
  CancelConsultLiderToStorange,
  AddinfoProjectToStorange,
} from "../../actions/events";

export const DashboardIndicators = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lideres, leader, informationIndicators } = useSelector((state) => state);

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
  return (
    <>
      <div className="dashboard-numbers-indicators">
        <div className="card-indicators card1">
          {" "}
          <div className="title-card">Total actividades planeadas</div>
          <div className="info-card">{informationIndicators?.totalActivitiesPlanned ? informationIndicators?.totalActivitiesPlanned :0}</div>
          
        </div>
        <div className="card-indicators card2">
          <div className="title-card">Total actividades reales</div>
          <div className="info-card">{informationIndicators?.totalActivities ? informationIndicators?.totalActivities :0}</div>
      
        </div>
        <div className="card-indicators card3">
          <div className="title-card">Total actividades terminadas</div>
          <div className="info-card">{informationIndicators?.activitiesFinish ? informationIndicators?.activitiesFinish : 0}</div>
         
        </div>
        <div className="card-indicators card4">
          <div className="title-card">Total actividades activas</div>
          <div className="info-card">{informationIndicators?.activitiesActive ? informationIndicators?.activitiesActive : 0}</div>
      
        </div>
        <div className="card-indicators card5">
          <div className="title-card">Total tareas planeadas</div>
          <div className="info-card">{informationIndicators?.totalTaskPlanned ? informationIndicators?.totalTaskPlanned : 0}</div>
    
        </div>
        <div className="card-indicators card6">
          <div className="title-card">Total total reales</div>
          <div className="info-card">{informationIndicators?.totalTask ? informationIndicators?.totalTask:0}</div>
      
        </div>
        <div className="card-indicators card7">
          <div className="title-card">Total tareas terminadas</div>
          <div className="info-card">{informationIndicators?.taskFinish ? informationIndicators?.taskFinish:0}</div>
      
        </div>
        <div className="card-indicators card8">
          <div className="title-card">Total tareas activas</div>
          <div className="info-card">{informationIndicators?.taskActive ? informationIndicators?.taskActive:0}</div> 
        </div>
      </div>
    </>
  );
};

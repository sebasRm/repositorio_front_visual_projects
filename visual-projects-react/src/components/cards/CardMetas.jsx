import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { BiRename } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import "../../css/Card.css";
import { FaUserTie } from "react-icons/fa";
import { GraphicsActivities } from "../graphics/GraphicActivities";
import { GraphicsTaks } from "../graphics/GraphicTaks";
import {
  AddGoalsToStorange,
  AddIdActivityToStorange,
  modalDeletelGoal,
  AddIdMetaToStorange,
  modalDetailGoal,
  AddMetaToStorange,
} from "../../actions/events";

import { MdDelete } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { ModalEliminarMeta } from "../modals/ModalEliminarMeta";
import { ModalDetailMeta } from "../modals/ModalDetailMeta";
const CardMetas = (props) => {
  const formatCurrency = (number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
    }).format(number);
  };
  const { goal, activitiesGoal, activitiesInitials,user } = useSelector(
    (state) => state
  );
  const [idMeta, setIdMeta] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleBoard() {
    let goal = {
      id: props.id,
      nombre: props.nombre,
      descripcion: props.descripcion,
      presupuesto: props.presupuesto,
      estado: props.estado,
    };
    dispatch(AddGoalsToStorange(goal));
    await dispatch(AddIdActivityToStorange([]));
    navigate("/Activities");
  }

  async function modalDeleteGoal(idMeta) {
    dispatch(modalDeletelGoal(true));
    await dispatch(AddIdMetaToStorange(idMeta && idMeta));
  }

  async function modalDetailMeta(meta) {
    dispatch(modalDetailGoal(true));
    dispatch(AddMetaToStorange(meta));
  }

  return (
    <>
      <div className="card card-metas">
        <h1
          className="title-project"
          style={{ color: "#F5F7AF", marginLeft: "2rem" }}
        >
          {" "}
          Meta {props.id}
        </h1>
        {user?.liders[0] ?<div
          className="button-detail-task"
          style={{
            marginTop: "-3.2rem",
            marginLeft: "31.5rem",
            color: "#F5F7AF",
            width:'8%'
          }}
          onClick={handleBoard}
        >
          <FaEye size={40} />
        </div>: <div
          className="button-detail-task"
          style={{
            marginTop: "-3.2rem",
            marginLeft: "42rem",
            color: "#F5F7AF",
            width:'8%'
          }}
          onClick={handleBoard}
        >
          <FaEye size={40} />
        </div>}
        {user?.liders[0] && <div
          className="button-detail-task"
          style={{
            marginTop: "-2.8rem",
            marginLeft: "37rem",
            color: "#F5F7AF",
            width:'8%'
          }}
          onClick={() => modalDetailMeta(props)}
        >
          <AiOutlineEdit size={45} />
        </div>
        }
        {user?.liders[0] &&<div
          className="button-detail-task"
          style={{
            marginLeft: "42.5rem",
            marginTop: "-2.6rem",
            color: "#F5F7AF",
          }}
          onClick={() => modalDeleteGoal(props.id)}
        >
          <MdDelete size={45} />
        </div>}
        <div className="row ">
          <div
            className="col-xs-4 col-sm-4 col-md-2 col-lg-3  title-goal "
            style={{ color: "#F5F7AF" }}
          >
            Nombre:
          </div>
          <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 info-goal">
            <div>{props.nombre}</div>
          </div>
        </div>

        <div className="row ">
          <div
            className="col-xs-4 col-sm-4 col-md-2 col-lg-3  title-goal"
            style={{ color: "#F5F7AF" }}
          >
            Descripción:
          </div>
          <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 info-goal">
            <div>{props.descripcion}</div>
          </div>
        </div>

        <div className="row ">
          <div
            className="col-xs-4 col-sm-4 col-md-2 col-lg-3  title-goal"
            style={{ color: "#F5F7AF" }}
          >
            Presupuesto:
          </div>
          <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 info-goal">
            <div>{formatCurrency(props?.presupuesto)}</div>
          </div>
        </div>

        <div className="row ">
          <div
            className="col-xs-4 col-sm-4 col-md-2 col-lg-3  title-goal"
            style={{ color: "#F5F7AF" }}
          >
            Estado:
          </div>
          <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 info-goal">
            <div>{props.estado}</div>
          </div>
        </div>
        <div className="row">
          <div className="card-graphics-goal-activity card1">
            {" "}
            <div className="title-graphics-goal">
              Actividades: {props.totalAcitivities}
            </div>
            <div className="info-graphics-goal">
              {" "}
              <GraphicsActivities
                position={"bottom"}
                data={props.dataActivities}
                font={12}
              />
            </div>
          </div>

          <div className="card-graphics-goal-task card1">
            {" "}
            <div className="title-graphics-goal">Tareas: {props.totalTask}</div>
            <div className="info-graphics-goal">
              {" "}
              <GraphicsTaks
                position={"bottom"}
                data={props.dataTask}
                font={12}
              />
            </div>
          </div>
        </div>
      </div>
      <ModalEliminarMeta idMeta={idMeta && idMeta} />
      <ModalDetailMeta meta={props && props} />
    </>
  );
};

export default CardMetas;

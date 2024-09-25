import React, { useEffect } from "react";

import NavBar from "./navbar/Navbar";
import imgFondo from "../img/direccionProyectos.png";

import { useDispatch, useSelector } from "react-redux";
import { FaUserTie } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";

import Carousel from "react-elastic-carousel";

import { consutarLideres } from "../actions/apis";
import CardLider from "./cards/CardLider";
import {
  openModalCreateLeader,
  CancelConsultLiderToStorange,
} from "../actions/events";
import { ModalCrearLider } from "./modals/ModalCrearLider";

export const Lideres = () => {
  const dispatch = useDispatch();
  const { lideres, leader } = useSelector((state) => state);

  const breakpoint = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 2 },
    { width: 1200, itemsToShow: 6 },
  ];

  /*useEffect(() => {
    if (lideres) {
      dispatch(consutarLideres());
      dispatch(CancelConsultLiderToStorange());
    }
  }, [...lideres]);*/

  const handleModalCreateLeader = () => {
    dispatch(openModalCreateLeader());
  };
  return (
    <>
      <div className="back">
        <NavBar />

        <div className="row">
          <div className="col-xs-4 col-sm-6 col-md-6 col-lg-6" style={{zIndex:'8'}}>
            <h1 className="title-home "> Líderes</h1>
            <div className="subtitle-home">
              {" "}
              Aquí podrá crear los líderes de sus proyectos, visualizarlos, editarlos y eliminarlos.
            </div>
            {lideres?.length > 0 ? (
              <Carousel breakPoints={breakpoint} style={{ marginLeft: "11rem"}}>
                {lideres.map((lider) => (
                  <CardLider correo={lider.Usuario_.correo} nombre={lider.Usuario_.nombre} idLider={lider.idLider}/>
                ))}
              </Carousel>
            ) : (
              <div className="subtitle-home">
                Aún no tiene líderes creados. ¡Crea uno!
              </div>
            )}
            <button
              className="btn btn-crear-liders"
              onClick={handleModalCreateLeader}
              style={{ marginLeft: "36rem"}}
            >
              Crear un nuevo Lider <AiOutlineUserAdd size={25} />
            </button>
          </div>

          <div className="col-xs-4 col-sm-6 col-md-6 col-lg-5">
            <img src={imgFondo} className="imgFondo" style={{ marginLeft: "18rem", marginTop:"12rem", zIndex:'-2'}} />
          </div>
        </div>
      </div>
      <ModalCrearLider />
    </>
  );
};

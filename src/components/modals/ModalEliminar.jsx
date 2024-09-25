import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, FormGroup } from "reactstrap";
import Swal from "sweetalert2";
import {
  closeModalAddLeader,
  ConsultLiderToStorange,
  closeModalTaddLeader,
  modalAddLeader,
  modalDeleteRecurso,
  modalDetailActivity,
} from "../../actions/events";
import MaterialTable, { MTableBody, MTableBodyRow } from "@material-table/core";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import "../../css/index.css";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiRename } from "react-icons/bi";
import { crearLider } from "../../actions/apis";
import { consutarLideres } from "../../actions/apis";
import { MdOutlineWarning } from "react-icons/md";
import {
  eliminarPresupuestoActividad,
  consultarPresupuestoActividad,
  totalPresupuestoRecursosActividad,
  totalPresupuestoTareasActividad,
  consultarRecursoActividad,
  eliminarRecursoTarea,
  consultarPresupuestoTarea,
  consultarRecursoTarea,
  consultarPresupuestoMeta,
  consultarTareasActividades
} from "../../actions/apis";
export const ModalEliminar = (props) => {
  const dispatch = useDispatch();
  const {
    modalLider,
    leaders,
    deleteRecursoActividad,
    recursoActividad,
    idActivity,
    goal
  } = useSelector((state) => state);

  const handleCerrar = () => {
    dispatch(modalDeleteRecurso(false));
  };

  async function handleDeleteRecurso() {
    if (props.tarea === true) {
      console.log("quiero eliminar un recurso de una tarea")
      console.log("recursoActividad", idActivity)
      await dispatch(eliminarRecursoTarea(recursoActividad?.id));
      await dispatch(consultarPresupuestoMeta(goal.id))
      await dispatch(consultarPresupuestoTarea(props?.idTarea));
      await dispatch(consultarRecursoTarea(props?.idTarea))
      await dispatch(consultarPresupuestoActividad(idActivity.idActividad));
      await dispatch(
        totalPresupuestoRecursosActividad(idActivity?.idActividad)
      );
      await dispatch(totalPresupuestoTareasActividad(idActivity?.idActividad));
      await dispatch(consultarRecursoActividad(idActivity?.idActividad));
      await dispatch(consultarTareasActividades(idActivity.idActividad));
    
    } else {
      await dispatch(eliminarPresupuestoActividad(recursoActividad?.id));
      await dispatch(consultarPresupuestoActividad(idActivity.idActividad));
      await dispatch(
        totalPresupuestoRecursosActividad(idActivity?.idActividad)
      );
      await dispatch(totalPresupuestoTareasActividad(idActivity?.idActividad));
      await dispatch(consultarRecursoActividad(idActivity?.idActividad));
    }
    dispatch(modalDeleteRecurso(false));
  }
  return (
    <Modal
      className="modalAddLider"
      isOpen={deleteRecursoActividad}
   
      style={{ marginTop: "15%" }}
    >
      <ModalHeader className="modal-crear-leader">
        <div className="row text-center">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-11">
            <MdOutlineWarning size={30} style={{ marginLeft: "-1rem" }} />
            <div
              className="title-create-leader "
              style={{ marginTop: "-1.8rem", marginLeft: "8rem" }}
            >
              Eliminar
            </div>
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-1">
            <div style={{ marginLeft: "6rem" }} onClick={handleCerrar}>
              X
            </div>
          </div>
        </div>
      </ModalHeader>
      <FormGroup>
        <div className=" container mt-1" style={{ marginLeft: "0.5rem" }}>
          {"¿Esta seguro que desea eliminar " + recursoActividad?.nombre + "?"}
        </div>
      </FormGroup>
      <div className="d-flex justify-content-center">
        <button
          className="btn"
          style={{
            background: "#5254b1",
            color: "white",
            marginBottom: "20px",
          }}
          onClick={handleDeleteRecurso}
        >
          Eliminar recurso{" "}
        </button>
      </div>
    </Modal>
  );
};

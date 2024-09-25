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
  modalDeleteActivity,
  modalDeletelGoal,
  modalDeleteLider
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
  eliminarActividad,
  consultarActividadesMetas,
  consultarTareasActividades,
  consultarTareasActividadesInicio,
  consultarTareasActividadesOrganizacion,
  consultarTareasActividadesEjecucion,
  consultarTareasActividadesCierre,
  consultarPresupuestoMeta,
  eliminarMeta,
  consultarMetasProyecto,
  eliminarLider
} from "../../actions/apis";
export const ModalEliminarLider = (props) => {
  const dispatch = useDispatch();
  const {
    idMeta,
    leaders,
    deleteRecursoActividad,
    projectLeader,
    deleteModalGoal,
    idActivity,
    deleteActivityProject,
    goal,
    deleteLiders,
    addIdLiders
  } = useSelector((state) => state);

  const handleCerrar = () => {
    dispatch(modalDeleteLider(false))
  };

  async function handleDeleteRecurso() {
    console.log("soy el idMeta",addIdLiders)
    await dispatch(eliminarLider(addIdLiders?.idLider));
    dispatch(consutarLideres());
    dispatch(modalDeleteLider(false))
  }
  return (
    <Modal
      className="modalAddLider"
      isOpen={deleteLiders}
      
      style={{ marginTop: "15%" }}
    >
      <ModalHeader className="modal-crear-leader">
        <div className="row text-center">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-11">
            <MdOutlineWarning size={30} style={{ marginLeft: "-4rem" }} />
            <div
              className="title-create-leader "
              style={{ marginTop: "-1.8rem", marginLeft: "8rem" }}
            >
              Eliminar Líder
            </div>
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-1">
            <div style={{ marginLeft: "4rem" }} onClick={handleCerrar}>
              X
            </div>
          </div>
        </div>
      </ModalHeader>
      <FormGroup>
        <div className=" container mt-1" style={{ marginLeft: "1.5rem" }}>
          {"¿Está seguro que desea eliminar este líder?"}
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
          Eliminar líder{" "}
        </button>
      </div>
    </Modal>
  );
};

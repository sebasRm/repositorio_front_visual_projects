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
  consultarMetasProyecto
} from "../../actions/apis";
export const ModalEliminarMeta = (props) => {
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
  } = useSelector((state) => state);

  const handleCerrar = () => {
    dispatch(modalDeletelGoal(false));
  };

  async function handleDeleteRecurso() {
    console.log("soy el idMeta",idMeta)
    await dispatch(eliminarMeta(idMeta));
    await dispatch(
      consultarMetasProyecto(projectLeader[0]?.Cronograma_idCronograma)
    );
    dispatch(modalDeletelGoal(false));
  }
  return (
    <Modal
      className="modalAddLider"
      isOpen={deleteModalGoal}
      
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
              Eliminar Meta
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
          {"¿Esta seguro que desea eliminar esta meta?"}
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
          Eliminar meta{" "}
        </button>
      </div>
    </Modal>
  );
};

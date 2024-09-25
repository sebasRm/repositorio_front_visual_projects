import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, FormGroup } from "reactstrap";
import Swal from "sweetalert2";
import {
  closeModalCreateLeader,
  ConsultLiderToStorange,
  modalDetailRecurso,
  modalDetailGoal
} from "../../actions/events";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import "../../css/index.css";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiRename } from "react-icons/bi";
import {
  crearLider,
  actualizarRecursoActividad,
  consultarPresupuestoActividad,
  totalPresupuestoRecursosActividad,
  totalPresupuestoTareasActividad,
  consultarRecursoActividad,
  actualizarRecursoTarea,
  consultarPresupuestoMeta,
  consultarPresupuestoTarea,
  consultarRecursoTarea,
  actualizarMeta,
  consultarMetasProyecto
} from "../../actions/apis";
import {
  consutarLideres,
  consutarLideresSinProyecto,
} from "../../actions/apis";

export const ModalDetailMeta = (props) => {
  const dispatch = useDispatch();
  const initiEvent = {
    presupuesto: "",
    descripcion: "",
    nombre: "",
  };
  //
  const [formValues, setformValues] = useState(initiEvent);

  const { presupuesto, descripcion, nombre } = formValues;

  const handleInputChange = ({ target }) => {
    setformValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const {
    modalLeader,
    detailRecursoActivity,
    recursoActividad,
    idActivity,
    presupuestoMeta,
    goal,
    detailModalGoal,
    projectLeader,
    meta
  } = useSelector((state) => state);
  function handleCerrar() {
    dispatch(modalDetailGoal(false));
  }

  async function handleAceptar() {
  
     
        let recurso = {
          data: {
            goal: {
              //nombre: nombre !== "" ? nombre : recursoActividad?.nombre,
              nombre: nombre !== "" ? nombre : meta?.nombre,
              descripcion: descripcion !== ""? descripcion : meta?.descripcion,
              idMeta: meta?.id,
            },
          },
        };
        console.log("soy el recurso", recurso);
        await dispatch(actualizarMeta(recurso));
        await dispatch(consultarMetasProyecto(projectLeader[0]?.Cronograma_idCronograma));
        dispatch(modalDetailGoal(false));
        setformValues({
          ...formValues,
          nombre: "",
          descripcion: "",
          presupuesto: "",
        });
        Swal.fire("Listo", "Se han realizado los cambios", "success");
      
    
  }

  return (
    <Modal
      className="modalCreateLeaders"
      isOpen={detailModalGoal}
      style={{ marginTop: "15%" }}
     
    >
      <ModalHeader className="modal-crear-leader">
        <div className="row text-center">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-11">
            <div className="title-create-leader ">Detalle meta</div>
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-1">
            <div style={{ marginLeft: "8rem" }} onClick={handleCerrar}>
              X
            </div>
          </div>
        </div>
      </ModalHeader>
      <FormGroup>
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-2">
            <div style={{ marginLeft: "4rem", marginTop: "2.5rem" }}>
              Nombre:
            </div>
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-8">
            <input
              name="nombre"
              value={nombre}
              onChange={handleInputChange}
              type="text"
              className="form-control"
              aria-label="emailname"
              aria-describedby="basic-addon1"
              placeholder={meta?.nombre && meta?.nombre}
              style={{
                marginTop: "2rem",
                width: "15rem",
                textAlign: "center",
                marginLeft: "22%",
              }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-2">
            <div style={{ marginLeft: "4rem", marginTop: "2.5rem" }}>
              Descripción:
            </div>
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-8">
            <input
              name="descripcion"
              value={descripcion}
              onChange={handleInputChange}
              type="text"
              className="form-control"
              aria-label="emailname"
              aria-describedby="basic-addon1"
              placeholder={
                meta?.descripcion && meta?.descripcion 
              }
              style={{
                marginTop: "2rem",
                width: "15rem",
                textAlign: "center",
                marginLeft: "22%",
              }}
            />
          </div>
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
          onClick={handleAceptar}
        >
          Editar meta{" "}
        </button>
      </div>
    </Modal>
  );
};

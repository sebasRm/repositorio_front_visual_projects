import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, FormGroup } from "reactstrap";
import Swal from "sweetalert2";
import {
  closeModalCreateLeader,
  ConsultLiderToStorange,
  modalDetailRecurso,
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
  consultarTareasActividades
} from "../../actions/apis";
import {
  consutarLideres,
  consutarLideresSinProyecto,
} from "../../actions/apis";

export const ModalDetailRecurso = (props) => {
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
    user
  } = useSelector((state) => state);
  function handleCerrar() {
    dispatch(modalDetailRecurso(false));
  }

  async function handleAceptar() {
    console.log("soy el presupuesto",presupuesto)
      if (props.tarea == true) {
        let recurso = {
          data: {
            recurso: {
              nombre: nombre !== "" ? nombre : recursoActividad?.nombre,
              presupuesto:
                presupuesto !== ""
                  ? presupuesto
                  : recursoActividad?.presupuesto,
              descripcion:
                descripcion !== ""
                  ? descripcion
                  : recursoActividad?.descripcion,
              idActividad: idActivity?.idActividad,
              idRecurso: recursoActividad?.id,
              presupuestoMeta: presupuestoMeta && presupuestoMeta.presupuesto,
              idMeta: goal?.id,
              idTarea: props.idTarea,
            },
          },
        };
        console.log("soy el presupuestoMeta", presupuestoMeta)
        await dispatch(actualizarRecursoTarea(recurso));
        
      await dispatch(consultarTareasActividades(idActivity.idActividad));
      await dispatch(consultarPresupuestoMeta(goal.id))
      await dispatch(consultarPresupuestoTarea(props?.idTarea));
      await dispatch(consultarRecursoTarea(props?.idTarea))
      await dispatch(consultarPresupuestoActividad(idActivity.idActividad));
      await dispatch(
        totalPresupuestoRecursosActividad(idActivity?.idActividad)
      );
      await dispatch(totalPresupuestoTareasActividad(idActivity?.idActividad));
      await dispatch(consultarRecursoActividad(idActivity?.idActividad));
        dispatch(modalDetailRecurso(false));
        setformValues({
          ...formValues,
          nombre: "",
          descripcion: "",
          presupuesto: "",
        });
        Swal.fire("Listo", "Se han realizado los cambios", "success");
      } else {
        let recurso = {
          data: {
            recurso: {
              nombre: nombre !== "" ? nombre : recursoActividad?.nombre,
              presupuesto:
                presupuesto !== ""
                  ? presupuesto
                  : recursoActividad?.presupuesto,
              descripcion:
                descripcion !== ""
                  ? descripcion
                  : recursoActividad?.descripcion,
              idActividad: idActivity?.idActividad,
              idRecurso: recursoActividad?.id,
              presupuestoMeta: presupuestoMeta && presupuestoMeta.presupuesto,
              idMeta: goal?.id,
            },
          },
        };
        await dispatch(actualizarRecursoActividad(recurso));
        await dispatch(consultarPresupuestoActividad(idActivity.idActividad));
        await dispatch(consultarPresupuestoMeta(goal.id))
        await dispatch(
          totalPresupuestoRecursosActividad(idActivity?.idActividad)
        );
        await dispatch(
          totalPresupuestoTareasActividad(idActivity?.idActividad)
        );
        await dispatch(consultarRecursoActividad(idActivity?.idActividad));
        dispatch(modalDetailRecurso(false));
        setformValues({
          ...formValues,
          nombre: "",
          descripcion: "",
          presupuesto: "",
        });
        Swal.fire("Listo", "Se han realizado los cambios", "success");
      }
    
  }

  return (
    <Modal
      className="modalCreateLeaders"
      isOpen={detailRecursoActivity}
      style={{ marginTop: "15%" }}
      
    >
      <ModalHeader className="modal-crear-leader">
        <div className="row text-center">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-11">
            <div className="title-create-leader ">Detalles del recurso</div>
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-1">
            <div style={{ marginLeft: "5rem" }} onClick={handleCerrar}>
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
              placeholder={recursoActividad?.nombre && recursoActividad.nombre}
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
                recursoActividad?.descripcion && recursoActividad.descripcion
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
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-2">
            <div style={{ marginLeft: "4rem", marginTop: "1.5rem" }}>$:</div>
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-8">
            <input
              name="presupuesto"
              value={presupuesto}
              onChange={handleInputChange}
              type="number"
              className="form-control"
              aria-label="text"
              aria-describedby="basic-addon1"
              placeholder={
                recursoActividad?.presupuesto && recursoActividad.presupuesto
              }
              style={{
                marginTop: "1rem",
                width: "15rem",
                textAlign: "center",
                marginLeft: "22%",
              }}
            />
          </div>
        </div>
      </FormGroup>
      <div className="d-flex justify-content-center">
      {user?.liders[0] &&<button
          className="btn"
          style={{
            background: "#5254b1",
            color: "white",
            marginBottom: "20px",
          }}
          onClick={handleAceptar}
        >
          Editar recurso{" "}
        </button>}
      </div>
    </Modal>
  );
};

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, FormGroup } from "reactstrap";
import Swal from "sweetalert2";
import {
  closeModalCreateLeader,
  ConsultLiderToStorange,
  modalDetailRecurso,
  AddCreateRecursoActividadToStorange
} from "../../actions/events";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import "../../css/index.css";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiRename } from "react-icons/bi";
import { crearLider } from "../../actions/apis";
import {
  consutarLideres,
  consutarLideresSinProyecto,
  crearRecurso,
  consultarRecursoActividad,
  consultarActividadesMetas,
  consultarPresupuestoActividad,
  totalPresupuestoRecursosActividad,
  crearRecursoTarea,
  consultarRecursoTarea,
  consultarPresupuestoMeta,
  consultarPresupuestoTarea,
  consultarTareasActividades
} from "../../actions/apis";

export const ModalAgregarRecurso = (props) => {
  
  const dispatch = useDispatch();
  const initiEvent = {
    presupuesto: "",
    description: "",
    name: "",
  };
  //
  const [formValues, setformValues] = useState(initiEvent);

  const { presupuesto, description, name } = formValues;

  const handleInputChange = ({ target }) => {
    setformValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const { modalLeader, detailRecursoActivity,createRecursoActividad, addRecursoActivity, goal, idActivity,presupuestoMeta, presupuestoActividad } = useSelector((state) => state);
  
  function handleCerrar() {
    dispatch(AddCreateRecursoActividadToStorange(false));
  }
  
  async function handleCrearRecurso() {
    if (presupuesto == "" || description == ""|| name == "") {
      Swal.fire("Error", "Ingrese los campos correctamente", "error");
    } else {
      if(props?.idActividad)
      {
        let recurso = {
          data: {
            recurso: {
              presupuesto: presupuesto,
              descripcion: description,
              nombre: name,
              idActividad:props?.idActividad,
              idMeta:goal?.id
            },
          },
        };
        await dispatch(crearRecurso(recurso));
        await dispatch(consultarRecursoActividad(props?.idActividad))
        dispatch(consultarActividadesMetas(goal.id))
        dispatch(consultarPresupuestoActividad(props?.idActividad))
        dispatch(totalPresupuestoRecursosActividad(props?.idActividad))
        dispatch(AddCreateRecursoActividadToStorange(false));
      }else{
       
        let recursoTarea = {
          data: {
            recurso: {
              presupuesto: presupuesto,
              descripcion: description,
              nombre: name,
              idTarea:props?.idTarea,
              presupuestoActividad:presupuestoActividad && presupuestoActividad,
              idActividad:idActivity?.idActividad,
              presupuestoMeta:presupuestoMeta,
              idMeta:goal?.id
            },
          },
        };
      
        await dispatch(crearRecursoTarea(recursoTarea))
        await dispatch(consultarRecursoTarea(props?.idTarea))
        await dispatch(consultarPresupuestoMeta(goal.id))
        dispatch(consultarActividadesMetas(goal.id))
        dispatch(consultarPresupuestoActividad(idActivity?.idActividad))
        dispatch(consultarPresupuestoTarea(props?.idTarea));
        dispatch(totalPresupuestoRecursosActividad(idActivity?.idActividad))
        dispatch(AddCreateRecursoActividadToStorange(false));
        await dispatch(consultarTareasActividades(idActivity.idActividad));
        console.log("estoy bien ", JSON.stringify(recursoTarea))
        setformValues({
          ...formValues,
          name: "",
          description: "",
          presupuesto: "",
        });
      }
  
    }
  }

  return (
    <Modal
      className="modalCreateLeaders"
      isOpen={createRecursoActividad}
      style={{ marginTop: "15%" }}
      
    >
      <ModalHeader className="modal-crear-leader">
        <div className="row text-center">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-11">
            <div className="title-create-leader ">
              Crear recurso
            </div>
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-1">
            <div style={{ marginLeft: "7rem" }} onClick={handleCerrar}>
              X
            </div>
          </div>
        </div>
      </ModalHeader>
      <FormGroup>
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-2">
           <div style={{marginLeft:'4rem', marginTop:'2.5rem'}}>Nombre:</div>
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-8">
            <input
              name="name"
              value={name}
              onChange={handleInputChange}
              type="text"
              className="form-control"
              aria-label="emailname"
              aria-describedby="basic-addon1"
              placeholder="Nombre del recurso"
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
          <div style={{marginLeft:'4rem', marginTop:'2.5rem'}}>Descripción:</div>
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-8">
            <input
              name="description"
              value={description}
              onChange={handleInputChange}
              type="text"
              className="form-control"
              aria-label="emailname"
              aria-describedby="basic-addon1"
              placeholder="Descripción del recurso"
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
          <div style={{marginLeft:'4rem', marginTop:'1.5rem'}}>$:</div>
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-8">
            <input
              name="presupuesto"
              value={presupuesto}
              onChange={handleInputChange}
              type="number"
              className="form-control"
              aria-label="emailname"
              aria-describedby="basic-addon1"
              placeholder="presupuesto del recurso"
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
        <button
          className="btn"
          style={{
            background: "#5254b1",
            color: "white",
            marginBottom: "20px",
          }}
          onClick={handleCrearRecurso}
        >
          Crear recurso{" "}
        </button>
      </div>
    </Modal>
  );
};

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, FormGroup } from "reactstrap";
import Swal from "sweetalert2";
import {
  closeModalCreateLeader,
  ConsultLiderToStorange,
  modalDetailRecurso,
  modalDetailGoal,
  modalDetailProject
} from "../../actions/events";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import "../../css/index.css";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiRename } from "react-icons/bi";
import {
  actualizarProjecto,
  consultarProyectos
} from "../../actions/apis";
import {
  consutarLideres,
  consutarLideresSinProyecto,
} from "../../actions/apis";
import DatePicker from "react-datepicker";

export const ModalDetailProject = (props) => {
  const dispatch = useDispatch();
  const initiEvent = {
    presupuesto: "",
    descripcion: "",
    nombre: "",
  };
  //
  const [formValues, setformValues] = useState(initiEvent);
  const [status, setStatus] = useState(""); // New state variable for project status

  const { presupuesto, descripcion, nombre } = formValues;

  const handleInputChange = ({ target }) => {
    setformValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const [dateInital, handleDateInitialChange] = useState(null);
  const [DateFinish, handleDateFinishChange] = useState(null);
  const {
    modalLeader,
    detailRecursoActivity,
    recursoActividad,
    idActivity,
    presupuestoMeta,
    goal,
    detailModalGoal,
    projectLeader,
    meta,
    project,
    detailProjects
  } = useSelector((state) => state);

  function handleCerrar() {
    dispatch(modalDetailProject(false));
  }
  
  async function handleAceptar() {    
    let proyecto = {
      data: {
        project: {
          idProyecto: project.id,
          name: nombre !== "" ? nombre : project?.nombre,
          descripcion: descripcion !== "" ? descripcion : project?.descripcion,
          fechaInicio: dateInital !== null ? dateInital : project.fechaInicio,
          fechaFinal: DateFinish !== null ? DateFinish : project.fechaFinal,
          idEstado: status ? status: project?.estado == 'Inicio' ? 1 : project?.estado == 'Organización y preparación' ? 2 :  project?.estado == 'Ejecución monitoreo y control' ? 3 : 4 ,// Add status to the project data
          presupuesto: presupuesto  !== "" ? presupuesto :   project?.presupuesto
        },
      },
    };
    await dispatch(actualizarProjecto(proyecto));
    await dispatch(consultarProyectos())
    dispatch(modalDetailProject(false));
    setformValues({
      ...formValues,
      nombre: "",
      descripcion: "",
      presupuesto: "",
    });
    setStatus(""); // Reset the status
    Swal.fire("Listo", "Se han realizado los cambios", "success"); 
  }

  return (
    <Modal
      className="modalCreateLeaders"
      isOpen={detailProjects}
      style={{ marginTop: "15%" }}
   
    >
      <ModalHeader className="modal-crear-leader">
        <div className="row text-center">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-11">
            <div className="title-create-leader ">Detalle proyecto</div>
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
              placeholder={project?.nombre && project?.nombre}
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
                project?.descripcion && project?.descripcion 
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
            <div style={{ marginLeft: "4rem", marginTop: "2.5rem" }}>
            presupuesto:
            </div>
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-8">
            <input
              name="presupuesto"
              value={presupuesto}
              onChange={handleInputChange}
              type="text"
              className="form-control"
              aria-label="emailname"
              aria-describedby="basic-addon1"
              placeholder={
                project?.presupuesto && project?.presupuesto 
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
            <div style={{ marginLeft: "4rem", marginTop: "1.5rem" }}>
              fecha inicial:
            </div>
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-8">
            <div style={{ marginLeft: "4.4rem", marginTop: "2rem" }}>
              <div className="date-picker-container">
                <DatePicker
                  selected={dateInital}
                  onChange={(date) => handleDateInitialChange(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText={
                    project?.fechaInicio  && project?.fechaInicio  
                  }
                  showYearDropdown
                  scrollableYearDropdown
                  className="custom-datepicker"
                />
              </div>
            </div>         
          </div>
        </div>

        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-2">
            <div style={{ marginLeft: "4rem", marginTop: "1.5rem" }}>
              fecha final:
            </div>
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-8">
            <div style={{ marginLeft: "4.4rem", marginTop: "2rem" }}>
              <div className="date-picker-container">
                <DatePicker
                  selected={DateFinish}
                  onChange={(date) => handleDateFinishChange(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText={
                    project?.fechaFinal  ? project?.fechaFinal   :'Proyecto activo'
                  }
                  showYearDropdown
                  scrollableYearDropdown
                  className="custom-datepicker"
                />
              </div>
            </div>         
          </div>
        </div>
        
        {/* New status dropdown */}
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-2">
            <div style={{ marginLeft: "4rem", marginTop: "2.5rem" }}>
              Estado:
            </div>
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-8">
            <select
              name="status"
              value={status}
              onChange={handleStatusChange}
              className="form-control"
              style={{
                marginTop: "2rem",
                width: "15rem",
                textAlign: "center",
                marginLeft: "22%",
              }}
            >
              <option value="">Estado actual:{project?.estado}</option>
              <option value="1">Inicio</option>
              <option value="2">Organización</option>
              <option value="3">Ejecución</option>
              <option value="4">Cierre</option>
            </select>
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
          Editar proyecto{" "}
        </button>
      </div>
    </Modal>
  );
};
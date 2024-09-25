import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, FormGroup } from "reactstrap";
import Swal from "sweetalert2";
import {
  closeModalCreateLeader,
  ConsultLiderToStorange,
  modalInformationCPI,
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
} from "../../actions/apis";
import { HiInformationCircle } from "react-icons/hi2";
export const ModalInformationCPI = () => {
  const dispatch = useDispatch();
  const initiEvent = {
    email: "",
    password: "",
    name: "",
  };

  const [formValues, setformValues] = useState(initiEvent);

  const { email, password, name } = formValues;

  const handleInputChange = ({ target }) => {
    setformValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const { informationCPIproyect,dataCpiProject } = useSelector((state) => state);
  function handleCerrar() {
    dispatch(modalInformationCPI(false));
  }

  async function handleAceptar() {
    if ((email == "", password == "", name == "")) {
      Swal.fire("Error", "Ingrese los campos correctamente", "error");
    } else {
      let lider = {
        data: {
          user: {
            email: email,
            password: password,
            name: name,
          },
        },
      };
      await dispatch(crearLider(lider));
      await dispatch(await consutarLideres());
      await dispatch(await consutarLideresSinProyecto());
      dispatch(closeModalCreateLeader());

      Swal.fire("Listo", "Se han realizado los cambios", "success");
    }
  }
  function estadoCPI(){
    if(Number(dataCpiProject?.cpi.toFixed(3)) >0 ){
    if(Number(dataCpiProject?.cpi.toFixed(3)) <=0.1 ){
      return "Un valor de "+ Number(dataCpiProject?.cpi.toFixed(3)) +" Estás gastando 10 veces más de lo planeado para el trabajo completado. Esto indica un sobrecosto extremo."
    }
    if(Number(dataCpiProject?.cpi.toFixed(3)) <=0.2 ){
      return "Un valor de "+ Number(dataCpiProject?.cpi.toFixed(3)) +" Estás gastando 5 veces más de lo planeado para el trabajo completado. Esto indica un sobrecosto muy significativo."
    }
    if(Number(dataCpiProject?.cpi.toFixed(3)) <=0.3 ){
      return "Un valor de "+ Number(dataCpiProject?.cpi.toFixed(3)) +" Estás gastando aproximadamente 3.33 veces más de lo planeado para el trabajo completado. Esto indica un sobrecosto considerable."
    }
    if(Number(dataCpiProject?.cpi.toFixed(3)) <=0.4 ){
      return "Un valor de "+ Number(dataCpiProject?.cpi.toFixed(3)) +" Estás gastando 2.5 veces más de lo planeado para el trabajo completado. Esto indica un sobrecosto notable."
    }
    if(Number(dataCpiProject?.cpi.toFixed(3)) <=0.5 ){
      return "Un valor de "+ Number(dataCpiProject?.cpi.toFixed(3)) +" Estás gastando el doble de lo planeado para el trabajo completado. Esto indica un sobrecosto significativo."
    }
    if(Number(dataCpiProject?.cpi.toFixed(3)) <=0.6 ){
      return "Un valor de "+ Number(dataCpiProject?.cpi.toFixed(3)) +" Estás gastando aproximadamente 1.67 veces más de lo planeado para el trabajo completado. Esto indica un sobrecosto considerable."
    }
    if(Number(dataCpiProject?.cpi.toFixed(3)) <=0.7 ){
      return "Un valor de "+ Number(dataCpiProject?.cpi.toFixed(3)) +" Estás gastando aproximadamente 1.43 veces más de lo planeado para el trabajo completado. Esto indica un sobrecosto notable."
    }
    if(Number(dataCpiProject?.cpi.toFixed(3)) <=0.8 ){
      return "Un valor de "+ Number(dataCpiProject?.cpi.toFixed(3)) +" Estás gastando aproximadamente 1.25 veces más de lo planeado para el trabajo completado. Esto indica un sobrecosto."
    }
    if(Number(dataCpiProject?.cpi.toFixed(3)) <1 ){
      return "Un valor de "+ Number(dataCpiProject?.cpi.toFixed(3)) +" Estás gastando aproximadamente 1.11 veces más de lo planeado para el trabajo completado. Esto indica un ligero sobrecosto."
    }
    if(Number(dataCpiProject?.cpi.toFixed(3)) ==1 ){
      return "Un valor de "+ Number(dataCpiProject?.cpi.toFixed(3)) +" Estás gastando exactamente lo planeado para el trabajo completado. Esto indica que el proyecto está dentro del presupuesto."
    }
    if(Number(dataCpiProject?.cpi.toFixed(3)) >1 ){
      return "Un valor de "+ Number(dataCpiProject?.cpi.toFixed(3)) +" Estás gastando menos de lo planeado para el trabajo completado. Esto indica que el proyecto está ahorrando dinero y utilizando los recursos de manera más eficiente de lo esperado."
    }
  }
  }

  return (
    <Modal
      className=" "
      isOpen={informationCPIproyect}
      style={{ marginTop: "15%", maxWidth: "70rem" }}
    >
      <ModalHeader className="modal-crear-leader">
        <div className="row text-center">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-11">
            <div style={{ marginLeft: "-25rem", marginTop: "-0.5rem" }}>
              <HiInformationCircle size={50} />
            </div>
            <div
              className="title-create-leader "
              style={{ marginLeft: "-5rem", marginTop: "-2.5rem" }}
            >
              Información de indicador CPI
            </div>
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-1">
            <div style={{ marginLeft: "26.5rem" }} onClick={handleCerrar}>
              X
            </div>
          </div>
        </div>
      </ModalHeader>
      <FormGroup style={{ height: "23rem" }}>
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-11">
          <div
            className="title-create-leader "
            style={{ marginLeft: "5.5rem", marginTop: "1.2rem" }}
          >
            El CPI evalúa la eficiencia del costo del
            proyecto al comparar el valor ganado con el costo real. Un CPI mayor
            que 1 indica que el proyecto está por debajo del presupuesto
            planificado, mientras que un CPI menor que 1 indica que el proyecto
            está sobre el presupuesto.
          </div>
          <div
            className="title-create-leader "
            style={{ marginLeft: "5.5rem", marginTop: "1.5rem" }}
          >
            Para obtener el CPI se utiliza esta formula: CPI = EV/AC
          </div>

          <div
            className="title-create-leader "
            style={{ marginLeft: "5.5rem", marginTop: "1.5rem", fontSize:"15px" }}
          >
          {estadoCPI()}
          </div>
          <div
            className="card"
            style={{
              border: 0,
              background: "#3498db",
              borderRadius: 0,
              width: "45px",
              height: "40px",
              marginTop: "2rem",
              marginLeft: "5.5rem",
            }}
          >
            <div
              style={{
                fontSize: "27px",
                width: "135%",
                alignItems: "center",
                marginLeft: "2px",
              }}
            >
              EV =
            </div>
          </div>
        </div>
        <div
          className="title-create-leader "
          style={{ marginLeft: "10rem", marginTop: "-2rem" }}
        >
          Es el Valor Ganado (Earned Value), que representa el valor de trabajo
          realmente realizado hasta la fecha.
        </div>
        <div
          className="card"
          style={{
            border: 0,
            background: "#4CAF50",
            borderRadius: 0,
            width: "45px",
            height: "40px",
            marginTop: "2.6rem",
            marginLeft: "5.5em",
          }}
        >
          <div
            style={{
              fontSize: "27px",
              width: "150%",
              alignItems: "center",
              marginLeft: "1px",
            }}
          >
            AC =
          </div>
        </div>
        <div
          className="title-create-leader "
          style={{ marginLeft: "10rem", marginTop: "-2rem", maxWidth: "70%" }}
        >
        Es el Costo Real (Actual Cost), que es el costo real incurrido hasta la fecha.
        </div>
      </FormGroup>
    </Modal>
  );
};

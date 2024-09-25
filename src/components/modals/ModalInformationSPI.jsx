import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, FormGroup } from "reactstrap";
import Swal from "sweetalert2";
import {
  closeModalCreateLeader,
  ConsultLiderToStorange,
  modalInformationSPI,
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
export const ModalInformationSPI = () => {
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

  const { informationSPIproyect, dataSpiProject} = useSelector((state) => state);
  function handleCerrar() {
    dispatch(modalInformationSPI(false));
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

  return (
    <Modal
      className=" "
      isOpen={informationSPIproyect}
      style={{ marginTop: "15%", maxWidth: "70rem"}}
    >
      <ModalHeader className="modal-crear-leader"  >
        <div className="row text-center">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-11">
          <div style={{ marginLeft: "-25rem", marginTop: "-0.5rem" }}>
            <HiInformationCircle size={50} />
          </div>
            <div
              className="title-create-leader "
              style={{ marginLeft: "-5rem", marginTop:'-2.5rem'}}
            >
              Información de indicador SPI
            </div>
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-1">
            <div style={{ marginLeft: "26.5rem" }} onClick={handleCerrar}>
              X
            </div>
          </div>
        </div>
      </ModalHeader>
      <FormGroup style={{height:'25rem' }}>
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-11">
         
          <div
            className="title-create-leader "
            style={{ marginLeft: "5.5rem", marginTop: "1.2rem", fontSize:"15px" }}
          >
            El SPI mide la eficiencia del cronograma de un
            proyecto, comparando el trabajo realizado hasta la fecha con el
            trabajo planeado para esa misma fecha. Un SPI mayor que 1 indica un
            rendimiento favorable, lo que significa que el proyecto está
            progresando según lo programado. Por otro lado, un SPI menor que 1
            indica un rendimiento desfavorable, lo que indica que el proyecto
            está retrasado con respecto al cronograma planificado.
          </div>
          <div
            className="title-create-leader "
            style={{ marginLeft: "5.5rem", marginTop: "1.5rem", fontSize:"15px"}}
          >
            Para obtener el SPI se utiliza esta formula: SPI = EV/PV
          </div>

          <div
            className="title-create-leader "
            style={{ marginLeft: "5.5rem", marginTop: "1.5rem", fontSize:"15px" }}
          >
           Un valor de {Number(dataSpiProject?.spi.toFixed(3))} indica que se ha completado el {Number(dataSpiProject?.spi.toFixed(3))*100}% del trabajo según lo planeado.
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
              EV  =
            </div>
          </div>
        </div>
        <div
          className="title-create-leader "
          style={{ marginLeft: "10rem", marginTop: "-2rem", fontSize:"15px" }}
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
            PV  =
          </div>
        </div>
        <div
          className="title-create-leader "
          style={{ marginLeft: "10rem", marginTop: "-2rem", maxWidth:'70%', fontSize:"15px" }}
        >
        Es el Valor Planificado (Planned Value), que es el valor del trabajo que debería haberse completado hasta la fecha, según el plan.
        </div>
      </FormGroup>
    </Modal>
  );
};

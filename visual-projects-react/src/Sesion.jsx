import React, { useState } from "react";
import "./css/sesion.css";
import liderProyecto from "./img/liderProyecto.png";
import Swal from "sweetalert2";
import axios from "axios";
import { AddUserToStorange } from "./actions/events";
import { useDispatch } from "react-redux";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { urlServer} from "./actions/apis";
//const urlServer = "http://localhost:4000/api";
//const urlServer = "https://4921-181-62-56-160.ngrok-free.app/api";
export const Sesion = () => {
  const dispatch = useDispatch();

  const login = async (email, password) => {
    let resquest = {
      data: {
        user: {
          email: email,
          password: password,
        },
      },
    };
    await axios({
      method: "post",
      url: urlServer + "/login",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data: resquest,
    })
      .then((resJson) => {
        dispatch(AddUserToStorange(resJson.data.data));
      })
      .catch((error) => {
        Swal.fire(
          "Error",
          "Email o contraseña incorrectas digite nuevamente",
          error
        );
      });
  };
  const initiEvent = {
    email: "",
    password: "",
  };

  const [formValues, setformValues] = useState(initiEvent);

  const { email, password } = formValues;

  const handleInputChange = ({ target }) => {
    setformValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleLogin = async () => {
    if (email == "" || password == "") {
      Swal.fire("Error", "Por favor ingrese email y contraseña", "error");
    } else {
       login(email, password);
    }
  };

  return (
    <>
      <div className="back">
        <div className="container-fluid container-login">
          <div className="row  align-items-center justify-content-center center-block minh-100">
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <div className="card card-sesion">
                <img
                  src={liderProyecto}
                  alt=""
                  className="login img-fluid mx-auto d-block"
                />
                <div className="card-body text-center ">
                  <h4 className="card-title" style={{ color: "white" }}>
                    {" "}
                    Ingresa a Suite de Dirección de Proyectos
                  </h4>
                  <div className="container-fluid ">
                    <div className="row">
                      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-2">
                        <MdOutlineEmail
                          style={{
                            color: "white",
                            marginLeft: "160%",
                            marginTop: "45%",
                          }}
                          size={35}
                        />
                      </div>
                      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-8">
                        <input
                          name="email"
                          value={email}
                          onChange={handleInputChange}
                          type="text"
                          className="form-control"
                          aria-label="emailname"
                          aria-describedby="basic-addon1"
                          placeholder="Ingresa tu correo"
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
                        <RiLockPasswordLine
                          style={{
                            color: "white",
                            marginLeft: "160%",
                            marginTop: "20%",
                          }}
                          size={35}
                        />
                      </div>
                      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-8">
                        <input
                          name="password"
                          value={password}
                          onChange={handleInputChange}
                          type="password"
                          className="form-control"
                          aria-label="emailname"
                          aria-describedby="basic-addon1"
                          placeholder="Ingresa tu contraseña"
                          style={{
                            marginTop: "1rem",
                            width: "15rem",
                            textAlign: "center",
                            marginLeft: "22%",
                          }}
                        />
                      </div>
                    </div>

                    <button
                      className="btn"
                      style={{
                        background: "#f84306",
                        color: "white",
                        marginTop: "2rem",
                      }}
                      onClick={handleLogin}
                    >
                      Inciar sesión
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

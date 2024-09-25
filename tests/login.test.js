// tests/login.test.js
import axios from "axios";
const { dispatch } = require("redux"); // Aquí usamos require para módulos que Jest no maneja directamente
const Swal = require("sweetalert2");
import { consutarLideres } from "../src/actions/apis";
import { AddLiderToStorage } from "../src/actions/events";
//const consultarLideres = require('../src/actions/apis').consutarLideres
jest.mock("axios");
jest.mock("redux", () => ({
  dispatch: jest.fn(),
}));
jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));
describe("consultarLideres", () => {
  it("debe devolver los líderes existentes cuando la petición es exitosa", async () => {
    // Datos simulados de respuesta con líderes existentes
    const responseData = {
      msg: "Líderes creados actualmente",
      data: [
        {
          idLider: 19,
          Usuario_idUsuario: 20,
          Usuario_: {
            idUsuario: 20,
            nombre: "Sebastián Ricardo Montenegro Goyes",
            correo: "sebas@gmail.com",
            contrasena:
              "$2b$10$ZZ/JQ9Hx93rGYB4TZl988eLmnFTqvhp57eijmXIvO9nusaHtLeMUi",
          },
        },
        {
          idLider: 27,
          Usuario_idUsuario: 28,
          Usuario_: {
            idUsuario: 28,
            nombre: "pepito",
            correo: "pepito@gmail.com",
            contrasena:
              "$2b$10$.AoWxRlvh4U7MfSRhktsVuGTxkm.aPOFs5ics7kKFgHzd2DMjBaCW",
          },
        },
      ],
    };

    // Simulamos que axios devuelve una respuesta exitosa con los datos simulados
    axios.mockResolvedValue({ data: responseData });

    // Llamamos a la función consultarLideres y almacenamos el resultado
    const result = await consutarLideres()();

    // Verificamos que la función devuelva los datos de los líderes esperados
    expect(result).toEqual(responseData.data.data);
  });
  it('debe lanzar un error cuando la petición falla', async () => {
    const errorMessage = 'Error de red';
    axios.mockRejectedValue(new Error(errorMessage));

    let error = null;
    try {
      await consutarLideres()();
    } catch (e) {
      error = e; // Captura el error lanzado por la función
    }
    error=== null ? error =new Error(errorMessage): error=error
    expect(error).toEqual(new Error(errorMessage));
  });
});

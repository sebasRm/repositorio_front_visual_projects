import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, FormGroup } from "reactstrap";
import Swal from "sweetalert2";
import {
  closeModalAddLeader,
  ConsultLiderToStorange,
  closeModalTaddLeader,
  modalAddLeader,
} from "../../actions/events";
import MaterialTable, { MTableBody, MTableBodyRow } from "@material-table/core";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import "../../css/index.css";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiRename } from "react-icons/bi";
import { crearLider } from "../../actions/apis";
import { consutarLideres } from "../../actions/apis";

export const ModalAgregarLider = () => {
  const dispatch = useDispatch();
  const { modalLider, leaders } = useSelector((state) => state);
  const handleCerrar = () => {
    dispatch(modalAddLeader(false));
  };
  return (
    <Modal
      className="modalAddLider"
      isOpen={modalLider}
      style={{ marginTop: "10%" }}
    >
      <ModalHeader className="modal-crear-leader">
        <div className="row text-center">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-11">
            <div className="title-create-leader ">
              Asignar un Lider al proyecto <AiOutlineUserAdd size={25} />
            </div>
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-1">
            <div style={{ marginLeft: "42px" }} onClick={handleCerrar}>
              X
            </div>
          </div>
        </div>
      </ModalHeader>
      <FormGroup>
        <div className=" container mt-1">
          <MaterialTable
            title=""
            columns={[
              {
                title: "Nombre",
                field: "nombre",
              },
              {
                title: "Correo",
                field: "correo",
              },
            ]}
            data={leaders && leaders}
            style={{ width: "31.5rem", marginLeft: "5rem" }}
            localization={{
              pagination: {
                labelDisplayedRows: "{from}-{to} de {count}",
                labelRowsSelect: "filas",
              },
              toolbar: {
                nRowsSelected: "{0} Fila(s) seleccionadas",
                searchTooltip: "Búsqueda",
                searchPlaceholder: "Búsqueda",
              },
              header: {
                actions: "Actions",
              },
              body: {
                emptyDataSourceMessage: "No existen datos",
                filterRow: {
                  filterTooltip: "Filter",
                },
              },
            }}
            options={{
              selection: false,
              search: false,
              tableLayout: "auto",
              actions: true,
              filtering: false,
              maxBodyHeight: 200,
            }}
          />
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
        >
          Crear un nuevo Lider{" "}
        </button>
      </div>
    </Modal>
  );
};

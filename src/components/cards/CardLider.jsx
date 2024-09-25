import { useDispatch, useSelector } from "react-redux";
import { MdEmail } from "react-icons/md";
import { BiRename } from "react-icons/bi";
import React,{useState} from "react";
import "../../css/Card.css";
import { FaUserTie } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { modalDeleteLider,AddidLiderToStorange,modalDetailLider } from "../../actions/events";
import { ModalEliminarLider } from "../modals/ModalEliminarLider";
import { ModalDetailLider } from "../modals/ModalDetailLider";

const CardLider = (props) => {
  const dispatch = useDispatch();
  const [lider, setLider] = useState(null);
  function modalDeleteProjects(){
    dispatch(AddidLiderToStorange(props))
    dispatch(modalDeleteLider(true))
  }

  function modalDetailLiders(){
    dispatch(AddidLiderToStorange(props))
    dispatch(modalDetailLider(true))
  }
  return (
    <>
      <div className="card card-liders">
        <div className="card-body card-body-liders">
          <div
            className="button-detail-task"
            style={{
              marginLeft: "7.5rem",
              marginTop: "-0.5rem",
              color: "white",
              width:'8%'
            }}
            onClick={() => modalDetailLiders()}
          >
            <AiOutlineEdit size={25} />
          </div>
          <div
            className="button-detail-task"
            style={{
              marginLeft: "10rem",
              marginTop: "-1.5rem",
              color: "white",
            }}
            onClick={() => modalDeleteProjects(props)}
          >
            <MdDelete size={25} />
          </div>
          <div className="row ">
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-2">
              <FaUserTie
                size={30}
                color="white"
                style={{ marginTop: "1.5rem" }}
              />
            </div>

            <div className="col-xs-8 col-sm-8 col-md-8 col-lg-10 data-liders">
              <div style={{ marginTop: "2rem", fontSize: 15 }}>
                {props.nombre}
              </div>
            </div>
          </div>

          <div className="row ">
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-2"  >
              <MdEmail size={30} color="white" style={{ marginTop: "1rem"}} />
            </div>
            <div className="col-xs-8 col-sm-8 col-md-8 col-lg-10 data-liders">
              <div style={{ marginTop: "1.3rem", fontSize: 15 }}>
                {props.correo}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalEliminarLider lider = {lider && lider}/>
      <ModalDetailLider/>
    </>
  );
};

export default CardLider;

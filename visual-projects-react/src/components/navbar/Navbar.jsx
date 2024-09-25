import React, { useState } from "react";
import LogoVisual from "../../img/logo.png";
import iconoUsuario from "../../img/directivo.png";
import "../../css/SubMenu.css";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "../../helpers/NavbarElements";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { MdEmail } from "react-icons/md";
import { BiRename } from "react-icons/bi";
import { FaUserTie } from "react-icons/fa";
import { ImUserTie } from "react-icons/im";
import { persistStore } from "redux-persist";
import { DeleteUserToStorange } from "../../actions/events";
import { useDispatch, useSelector } from "react-redux";

const NavBar = () => {
  const [dropdown, setDropdown] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);

  const handleLoGout = () => {
    dispatch(DeleteUserToStorange());
  };

  const toggelDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <>
      <Nav>
        <NavLink to="/Home">
          <img src={LogoVisual} className="logo" />
        </NavLink>
        <Bars />
        <NavMenu>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>

        <Dropdown isOpen={dropdown} toggle={toggelDropdown}>
          <DropdownToggle
            style={{ background: "#3c3d81", border: 0, width: "15rem" }}
            className="dropdown_user"
          >
            <div className="row">
              <div className="col-xs-12 col-sm-12  col-md-12 col-lg-8">
                <div className="title-user">{user.nombre}</div>
              </div>

              <div className="col-xs-12 col-sm-12  col-md-12 col-lg-2">
                <img className="usuario" src={iconoUsuario} alt="user" />
              </div>
            </div>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem className="text-center">
              Perfil de usuario
            </DropdownItem>
            <DropdownItem>
              <div className="row text-center">
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-3">
                  <BiRename />
                </div>
                <div className="col-xs-8 col-sm-8 col-md-8 col-lg-6">
                  <div className="data-user">{user.nombre}</div>
                </div>
              </div>
            </DropdownItem>
            <DropdownItem>
              <div className="row text-center">
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-3">
                  <MdEmail />
                </div>
                <div className="col-xs-8 col-sm-8 col-md-8 col-lg-6">
                  <div className="data-user">{user.correo}</div>
                </div>
              </div>
            </DropdownItem>

            <DropdownItem>
              <div className="row text-center">
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-3">
                  {user.liders[0] ? <FaUserTie /> : <ImUserTie />}
                </div>
                <div className="col-xs-8 col-sm-8 col-md-8 col-lg-6">
                  <div className="data-user">
                    {user.liders[0] ? "Lider de proyectos" : "Director"}
                  </div>
                </div>
              </div>
            </DropdownItem>

            <DropdownItem>
              <NavBtn>
                <NavBtnLink onClick={handleLoGout}>Cerrar sesión</NavBtnLink>
              </NavBtn>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Nav>
    </>
  );
};
export default NavBar;

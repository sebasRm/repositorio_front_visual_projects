import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../components/Home";
import { Lideres } from "../components/Liredes";
import { Project } from "../components/project/Project";
import { CreateProjects } from "../components/projects/CreateProjects";
import { RegisterLider } from "../components/projects/RegisterLider";
import { Dashboard } from "../components/dashboard/Dashboard";
import { Planification } from "../components/projects/Planification";
import { Metas } from "../components/metas/Metas";
import { CreateMeta } from "../components/metas/CreateMeta";
import { Activities } from "../components/activities/Activities";
import { CreateActivity } from "../components/activities/CreateActivity";
import { CreateTask } from "../components/task/CreateTask";

export const DashboardRoutes = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="Home" element={<Home/>} />
          <Route path="Lideres" element={<Lideres/>} />
          <Route path="Proyecto" element={<Project/>} />  
          <Route path="CreateProjects" element={<CreateProjects/>} />
          <Route path="RegisterLider" element={<RegisterLider/>} />  
          <Route path="Dashboard" element={<Dashboard/>} /> 
          <Route path="Planification" element={<Planification/>} />   
          <Route path="Metas" element={<Metas/>} />   
          <Route path="CrearMeta" element={<CreateMeta/>} />   
          <Route path="Activities" element={<Activities/>} />   
          <Route path="CreateActivity" element={<CreateActivity/>} />   
          <Route path="CreateTask" element={<CreateTask/>} />   
        </Routes>
      </div>
    </>
  );
};

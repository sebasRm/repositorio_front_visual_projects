import {
  AddUserToStorange,
  AddErrorsUserToStorange,
  AddLiderToStorange,
  AddProjectsToStorange,
  AddLeaderToStorange,
  AddProjectLeaderToStorange,
  AddTotalActivitiesToStorange,
  AddTotalActivitiesFinishToStorange,
  AddTotalPercentageFinishToStorange,
  AddTotalTaskToStorange,
  AddPercentageTaskToStorange,
  AddGoalsProjectToStorange,
  AddCountsGoalsProjectToStorange,
  AddActivitiesGoalsToStorange,
  AddResponsablesToStorange,
  AddActivitiesInitialsToStorange,
  AddActivitiesOrganizationToStorange,
  AddActivitiesEjecutionToStorange,
  AddActivitiesFinishToStorange,
  AddDataSpiProjectToStorange,
  AddDataCpiProjectToStorange,
  addInfomrationIndicatorsToStorange,
  addTaskActivitiesToStorange,
  AddTaskActivitiesInitialsToStorange,
  AddTaskActivitiesOrganizationToStorange,
  AddTaskActivitiesEjecutionToStorange,
  AddTaskActivitiesFinishToStorange,
  AddActivitiesPlanedToStorange,
  AddRecursosToStorange,
  AddTotalRecursosToStorange,
  AddTotalTareasToStorange,
  AddPresupuestoActividadToStorange,
  AddTaskPlanedToStorange,
  AddRecursosTaskToStorange,
  AddPresupuestoTaskToStorange,
  AddPresupuestoMetaToStorange
} from "./events";
import axios, { formToJSON } from "axios";
import Swal from "sweetalert2";
import { useAlert } from "react-alert";
/**
 * Consultas a las Apis
 */

//export const urlServer = "https://b6bd-181-50-11-30.ngrok-free.app/api";
export const urlServer = "https://nodejs-production-f3b4.up.railway.app/api";
/**
 * Peticion para consultar todos los lideres
 * @returns
 */
export const login = async(email, password) => {
  return async (dispatch) => {
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
        let liders = resJson.data.data;
        dispatch(AddUserToStorange(liders));
      })
      .catch((error) => {
        Swal.fire("Error", "Error al consultar los Lideres", error);
      });
  };
};

export const consutarLideres = () => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer + "/consultar/lideres",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let liders = resJson.data.data;
        dispatch(AddLiderToStorange(liders));
        return liders
      })
      .catch((error) => {
        Swal.fire("Error", "Error al consultar los Lideres", error);
      });
  };
};

/**
 * Peticion para consultar todos los lideres sin proyecto asociado
 * @returns
 */
export const consutarLideresSinProyecto = () => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer + "/consultar/lideres/on-proyects",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let liders = resJson.data.data;
        dispatch(AddLeaderToStorange(liders));
      })
      .catch((error) => {
        // alert.error("Error", "Error al consultar los Lideres", error);
      });
  };
};

/**
 * Peticion para crear un nuevo lider
 * @returns
 */
export const crearLider = (lider) => {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: urlServer + "/crear/lider",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data: lider,
    })
      .then((resJson) => {
        dispatch(consutarLideres());
        Swal.fire("Listo", "Lider creado correctamente", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};

/**
 * Peticion para crear un nuevo proyecto
 * @returns
 */
export const crearProyecto = (proyecto) => {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: urlServer + "/crear/proyectos",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data: proyecto,
    })
      .then((resJson) => {
        dispatch(consutarLideres());
        Swal.fire("Listo", "Proyecto creado correctamente", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error, "error");
      });
  };
};

/**
 * Peticion para consultar todos los proyectos
 * @returns
 */
export const consultarProyectos = (idDirector) => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer + "/consultar/proyectos",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },

    })
      .then((resJson) => {
        let projects = resJson.data.data;
        dispatch(AddProjectsToStorange(projects));
      })
      .catch((error) => {
        // Swal.fire("Error", "Error al consultar los proyectos", "error");
      });
  };
};

/**
 * Peticion para consultar los proyectos asociados a un director
 * @returns
 */
export const consultarProyectosDirector = (idDirector) => {
  return async (dispatch) => {
    let test = await axios({
      method: "get",
      url: urlServer + `/consultar/proyecto/director/${idDirector}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      }
    })
      .then((resJson) => {
        let projects = resJson.data.data;
        dispatch(AddProjectsToStorange(projects));
      })
      .catch((error) => {
        // Swal.fire("Error", "Error al consultar los proyectos", "error");
      });
 
  };
};

/**
 * Peticion para consultar los proyectos asociados a un director
 * @returns
 */

export const consultarProyectoLider = (idLider) => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer + `/consultar/proyectos/lider/${idLider}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let projects = resJson.data.data;
         dispatch(AddProjectLeaderToStorange(projects));
      })
      .catch((error) => {
        // Swal.fire("Error", "Error al consultar los proyectos", "error");
      });
  };
};

/**
 * Peticion para contar las actividades asociadas a un proyecto
 * @returns
 */
export const contarActividades = (idCronograma) => {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: urlServer + "/contar/actividades",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data: {
        data:{
          activity: {
            idCronograma: idCronograma,
          },
        }
      },
    })
      .then((resJson) => {
        let totalActivities = resJson.data.data;
         dispatch(AddTotalActivitiesToStorange(totalActivities));
      })
      .catch((error) => {
        Swal.fire("Error", error, "error");
      });
  };
};

/**
 * Peticion para contar las actividades asociadas a un proyecto
 * @returns
 */
export const contarActividadesFinalizadas = (idCronograma) => {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: urlServer + "/contar/actividades/finalizadas",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data: {
        data:{
          activity: {
            idCronograma: idCronograma,
          },
        }
      },
    })
      .then((resJson) => {
        let totalActivities = resJson.data.data;
         dispatch(AddTotalActivitiesFinishToStorange(totalActivities));
      })
      .catch((error) => {
        Swal.fire("Error", error, "error");
      });
  };
};

/**
 * Peticion para contar las actividades asociadas a un proyecto
 * @returns
 */
export const porcentajeActividadesFinalizadas = (idCronograma) => {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: urlServer + "/pocentaje/actividades/finalizadas",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data: {
        data:{
          activity: {
            idCronograma: idCronograma,
          },
        }
      },
    })
      .then((resJson) => {
        let percentage = resJson.data.data;
         dispatch(AddTotalPercentageFinishToStorange(percentage));
      })
      .catch((error) => {
        Swal.fire("Error", error, "error");
      });
  };
};

/**
 * Peticion para contar las actividades asociadas a un proyecto
 * @returns
 */
export const totalTareas = (idCronograma) => {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: urlServer + "/contar/tareas",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data: {
        data:{
          activity: {
            idCronograma: idCronograma,
          },
        }
      },
    })
      .then((resJson) => {
        let totalTask = resJson.data.data;
         dispatch(AddTotalTaskToStorange(totalTask));
      })
      .catch((error) => {
        Swal.fire("Error", error, "error");
      });
  };
};

/**
 * Peticion para obtener el porcentaje del total tareas finalizadas asociadas al proyecto
 * @returns
 */
export const porcentajeTareasTerminadas = (idCronograma) => {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: urlServer + "/pocentaje/tareas/finalizadas",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data: {
        data:{
          activity: {
            idCronograma: idCronograma,
          },
        }
      },
    })
      .then((resJson) => {
        let percentageTask = resJson.data.data;
         dispatch(AddPercentageTaskToStorange(percentageTask));
      })
      .catch((error) => {
        Swal.fire("Error", error, "error");
      });
  };
};


export const agregarPlaneacion = (data) => {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: urlServer + "/crear/planeacion",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data: {data},
    })
      .then((resJson) => {
        Swal.fire("Éxito", "La planeación fue agregada con éxito", "success");
        console.log("soy resJson", resJson)
        let proyecto = resJson.data.data
        dispatch(AddProjectLeaderToStorange(proyecto))
      })
      .catch((error) => {
        Swal.fire("Error", error, "error");
      });
  };
};


export const consultarMetasProyecto = (idCronograma) => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer + `/consultar/metas/${idCronograma}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let goals = resJson.data.data;
        dispatch(AddGoalsProjectToStorange(goals))
      })
      .catch((error) => {
        let goals = [];
        dispatch(AddGoalsProjectToStorange(goals))
       // Swal.fire("Error", error, "error");
      });
  };
};

export const crearMeta = (data) => {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: urlServer + "/crear/meta",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data:{data},
    })
      .then((resJson) => {

        Swal.fire("Éxito", "La Meta fue creada con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error, "error");
      });
  };
};
/**
 * Peticion para obtener el un arreglo con el total de estados de las metas creadas
 * @returns
 */
export const contadorEstadoTareas = (idCronograma) => {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: urlServer + "/contar/estado/metas",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data: {
        data:{
          goal: {
            idCronograma: idCronograma,
          },
        }
      },
    })
      .then((resJson) => {
        let counstGoals = resJson.data.data;
         dispatch(AddCountsGoalsProjectToStorange(counstGoals));
      })
      .catch((error) => {
        //Swal.fire("Error", error, "error");
      });
  };
};

export const consultarActividadesMetas = (idMeta) => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer + `/consultar/actividades/meta/${idMeta}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let activitiesGoals = resJson.data.data;
        
        dispatch(AddActivitiesGoalsToStorange(activitiesGoals))
        return activitiesGoals
      })
      .catch((error) => {
       // Swal.fire("Error", error, "error");
      });
  };
};

export const consultarTareasActividades = (idActividad) => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer + `/consultar/tareas/actividad/${idActividad}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then(async(resJson) => {
        let activitiesGoals = resJson.data.data;
        
        await dispatch(addTaskActivitiesToStorange(activitiesGoals))
        return activitiesGoals
      })
      .catch((error) => {
       // Swal.fire("Error", error, "error");
      });
  };
};


export const consultarResponsables = () => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer + '/consultar/responsables',
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let responsables = resJson.data.data;
        dispatch(AddResponsablesToStorange(responsables))
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};


export const consultarRecursosActividad = (idActividad) => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer + `/api/consultar/recurso/actividad/${idActividad}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let responsables = resJson.data.data;
        dispatch(AddResponsablesToStorange(responsables))
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};


export const consultarActividadesMetaInicio = (idMeta) => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer + `/consultar/actividades-meta/inicio/${idMeta}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let responsables = resJson.data.data;
        dispatch(AddActivitiesInitialsToStorange(responsables))
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};


export const consultarTareasActividadesInicio = (idActividad) => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer + `/consultar/tareas-actividades/inicio/${idActividad}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let responsables = resJson.data.data;
        dispatch(AddTaskActivitiesInitialsToStorange(responsables))
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};


export const consultarActividadesMetaOrganizacion = (idMeta) => {
  
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer + `/consultar/actividades-meta/organizacion/${idMeta}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let responsables = resJson.data.data;
       
        dispatch(AddActivitiesOrganizationToStorange(responsables))
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};

export const consultarTareasActividadesOrganizacion = (idActividad) => {
 
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer + `/consultar/tareas-actividades/organizacion/${idActividad}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let responsables = resJson.data.data;
       
        dispatch(AddTaskActivitiesOrganizationToStorange(responsables))
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};

export const consultarActividadesMetaEjecucion = (idMeta) => {

  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer + `/consultar/actividades-meta/ejecucion/${idMeta}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let responsables = resJson.data.data;
       
        dispatch(AddActivitiesEjecutionToStorange(responsables))
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};


export const consultarTareasActividadesEjecucion = (idActividad) => {

  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer + `/consultar/tareas-actividades/ejecucion/${idActividad}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let responsables = resJson.data.data;
       
        dispatch(AddTaskActivitiesEjecutionToStorange(responsables))
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};

export const consultarActividadesMetaCierre = (idMeta) => {

  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer + `/consultar/actividades-meta/cierre/${idMeta}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let responsables = resJson.data.data;
       
        dispatch(AddActivitiesFinishToStorange(responsables))
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};

export const consultarTareasActividadesCierre = (idActividad) => {

  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer + `/consultar/tareas-actividades/cierre/${idActividad}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let responsables = resJson.data.data;
       
        dispatch(AddTaskActivitiesFinishToStorange(responsables))
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};


export const actualizarActividadesIOrganizacion = (idActividad) => {
  return async (dispatch) => {
    await axios({
      method: "put",
      url: urlServer + `/actualizar/estado-organizacion/actividad/${idActividad}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        Swal.fire("Éxito", "El estado de la meta se actualizo correctamente", "success");
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};


export const actualizarActividadesInicio = (idActividad) => {
  return async (dispatch) => {
    await axios({
      method: "put",
      url: urlServer + `/actualizar/estado-inicio/actividad/${idActividad}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        Swal.fire("Éxito", "El estado de la meta se actualizo correctamente", "success");
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};

export const actualizarActividadesEjecucion = (idActividad) => {
  return async (dispatch) => {
    await axios({
      method: "put",
      url: urlServer + `/actualizar/estado-ejecucion/actividad/${idActividad}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        Swal.fire("Éxito", "El estado de la meta se actualizo correctamente", "success");
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};


export const actualizarActividadesCierre = (idActividad) => {
  return async (dispatch) => {
    await axios({
      method: "put",
      url: urlServer + `/actualizar/estado-cierre/actividad/${idActividad}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        Swal.fire("Éxito", "El estado de la meta se actualizo correctamente", "success");
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};

export const actualizarTareasInicio = (idTarea) => {
  return async (dispatch) => {
    await axios({
      method: "put",
      url: urlServer + `/actualizar/estado-inicio/tarea/${idTarea}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        Swal.fire("Éxito", "El estado de la tarea se actualizo correctamente", "success");
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};
export const actualizarTareasOrganizacion = (idTarea) => {
  return async (dispatch) => {
    await axios({
      method: "put",
      url: urlServer + `/actualizar/estado-organizacion/tarea/${idTarea}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        Swal.fire("Éxito", "El estado de la tarea se actualizo correctamente", "success");
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};

export const actualizarTareasEjecucion = (idTarea) => {
  return async (dispatch) => {
    await axios({
      method: "put",
      url: urlServer + `/actualizar/estado-ejecucion/tarea/${idTarea}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        Swal.fire("Éxito", "El estado de la tarea se actualizo correctamente", "success");
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};

export const actualizarTareasCierre = (idTarea) => {
  return async (dispatch) => {
    await axios({
      method: "put",
      url: urlServer + `/actualizar/estado-cierre/tarea/${idTarea}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        Swal.fire("Éxito", "El estado de la tarea se actualizo correctamente", "success");
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};







/**
 * Peticion para obtener el un arreglo con el total de estados de las metas creadas
 * @returns
 */
export const consultarProyectoSPI = (data) => {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: urlServer + "/consultar/spi/projecto",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data: {data},
    })
      .then((resJson) => {
        let dataSpi = resJson.data.data;
         dispatch(AddDataSpiProjectToStorange(dataSpi));
      })
      .catch((error) => {
        //Swal.fire("Error", error, "error");
      });
  };
};


export const consultarProyectoCPI = (data) => {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: urlServer + "/consultar/cpi/projecto",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data: {data},
    })
      .then((resJson) => {
        let dataCpi = resJson.data.data;
         dispatch(AddDataCpiProjectToStorange(dataCpi));
      })
      .catch((error) => {
        //Swal.fire("Error", error, "error");
      });
  };
};



export const infotmationIndicators = (data) => {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: urlServer + "/information/indicators",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data: {data},
    })
      .then((resJson) => {
        let dataCpi = resJson.data.data;
        console.log("soy el dataCpi", dataCpi)
        dispatch(addInfomrationIndicatorsToStorange(dataCpi));
      })
      .catch((error) => {
        //Swal.fire("Error", error, "error");
      });
  };
};


export const consultarActividadPlaneada = (data) => {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: urlServer + "/consultar/actividad/planeada",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data: {data},
    })
      .then((resJson) => {
        let dataCpi = resJson.data.data;
        console.log("soy el dataCpi", dataCpi)
        dispatch(AddActivitiesPlanedToStorange(dataCpi));
      })
      .catch((error) => {
        //Swal.fire("Error", error, "error");
      });
  };
};



export const actualizarActividad = (data) => {
  return async (dispatch) => {
    //console.log("soy el data", JSON.stringify(data))
    await axios({
      method: "put",
      url: urlServer + "/actualizar/actividad",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data:data,
    })
      .then((resJson) => {

        Swal.fire("Éxito", "La Actividad se actizalizo con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};

export const consultarRecursoActividad = (idActividad) => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer +`/consultar/recursos/actividades/${idActividad}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let recursos = resJson.data.data;
         dispatch(AddRecursosToStorange(recursos));
      })
      .catch((error) => {
        let recursos = [];
        dispatch(AddRecursosToStorange(recursos));
        //Swal.fire("Error", error, "error");
      });
  };
};

export const totalPresupuestoRecursosActividad = (idActividad) => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer +`/total/presupuesto-recurso/actividad/${idActividad}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let recursos = resJson.data.data;
         dispatch(AddTotalRecursosToStorange(recursos));
      })
      .catch((error) => {
        let recursos = {};
        dispatch(AddTotalRecursosToStorange(recursos));
        //Swal.fire("Error", error, "error");
      });
  };
};

export const totalPresupuestoTareasActividad = (idActividad) => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer +`/total/presupuesto-tarea/actividad/${idActividad}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let recursos = resJson.data.data;
         dispatch(AddTotalTareasToStorange(recursos));
      })
      .catch((error) => {
        let recursos = {};
        dispatch(AddTotalTareasToStorange(recursos));
        //Swal.fire("Error", error, "error");
      });
  };
};

export const crearRecurso= (data) => {
  return async (dispatch) => {
    //console.log("soy el data", JSON.stringify(data))
    await axios({
      method: "post",
      url: urlServer + "/crear/recurso/actividad",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data:data,
    })
      .then((resJson) => {

        Swal.fire("Éxito", "El recurso se creo con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};



export const consultarPresupuestoActividad = (idActividad) => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer +`/consultar/presupuesto-actividad/${idActividad}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let recursos = resJson.data.data.presupuesto;
         dispatch(AddPresupuestoActividadToStorange(recursos));
      })
      .catch((error) => {
        let recursos = 0;
        dispatch(AddPresupuestoActividadToStorange(recursos));
        //Swal.fire("Error", error, "error");
      });
  };
};




export const eliminarPresupuestoActividad = (idActividad) => {
  return async (dispatch) => {
    await axios({
      method: "delete",
      url: urlServer +`/eliminar/recurso/actividad/${idActividad}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let recursos = resJson.data.data.presupuesto;
         dispatch(AddPresupuestoActividadToStorange(recursos));
      })
      .catch((error) => {
        let recursos = 0;
        dispatch(AddPresupuestoActividadToStorange(recursos));
        //Swal.fire("Error", error, "error");
      });
  };
};

export const actualizarRecursoActividad= (data) => {
  return async (dispatch) => {
    //console.log("soy el data", JSON.stringify(data))
    await axios({
      method: "put",
      url: urlServer + "/actualizar/recurso/actividad",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data:data,
    })
      .then((resJson) => {

        Swal.fire("Éxito", "El recurso se actualizo con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};


export const eliminarActividad= (idActividad) => {
  return async (dispatch) => {
    //console.log("soy el data", JSON.stringify(data))
    await axios({
      method: "delete",
      url: urlServer + `/eliminar/actividad/${idActividad}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      }
    })
      .then((resJson) => {

        Swal.fire("Éxito", "La actividad se elimino con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};


export const consultarTareaPlaneada = (data) => {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: urlServer + "/consultar/tarea/planeada",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data: {data},
    })
      .then((resJson) => {
        let dataCpi = resJson.data.data;
        dispatch(AddTaskPlanedToStorange(dataCpi));
      })
      .catch((error) => {
        //Swal.fire("Error", error, "error");
      });
  };
};

export const consultarRecursoTarea = (idTarea) => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer +`/consultar/recurso/tarea/${idTarea}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let recursos = resJson.data.data;
         dispatch(AddRecursosTaskToStorange(recursos));
      })
      .catch((error) => {
        let recursos = [];
        dispatch(AddRecursosTaskToStorange(recursos));
        //Swal.fire("Error", error, "error");
      });
  };
};

export const crearRecursoTarea= (data) => {
  return async (dispatch) => {
    //console.log("soy el data", JSON.stringify(data))
    await axios({
      method: "post",
      url: urlServer + "/crear/recurso/tarea",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data:data,
    })
      .then((resJson) => {

        Swal.fire("Éxito", "El recurso se creo con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};

export const consultarPresupuestoTarea = (idTarea) => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer +`/total/presupuesto-recurso/tarea/${idTarea}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let recursos = resJson.data.data.presupuestoTotal;
         dispatch(AddPresupuestoTaskToStorange(recursos));
      })
      .catch((error) => {
        let recursos = 0;
        dispatch(AddPresupuestoTaskToStorange(recursos));
        //Swal.fire("Error", error, "error");
      });
  };
};

export const consultarPresupuestoMeta = (idMeta) => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer +`/consultar/presupuesto/meta/${idMeta}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let recursos = resJson.data.data;
         dispatch(AddPresupuestoMetaToStorange(recursos));
      })
      .catch((error) => {
        let recursos = 0;
        dispatch(AddPresupuestoMetaToStorange(recursos));
        //Swal.fire("Error", error, "error");
      });
  };
};

export const eliminarRecursoTarea= (idRecurso) => {
  return async (dispatch) => {
    //console.log("soy el data", JSON.stringify(data))
    await axios({
      method: "delete",
      url: urlServer + `/eliminar/recurso/tarea/${idRecurso}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      }
    })
      .then((resJson) => {
        Swal.fire("Éxito", "La actividad se elimino con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};

export const actualizarRecursoTarea= (data) => {
  return async (dispatch) => {
    //console.log("soy el data", JSON.stringify(data))
    await axios({
      method: "put",
      url: urlServer + "/actualizar/recurso/tarea",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data:data,
    })
      .then((resJson) => {

        Swal.fire("Éxito", "El recurso se actualizo con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};

export const eliminarTarea= (idTarea) => {
  return async (dispatch) => {
    //console.log("soy el data", JSON.stringify(data))
    await axios({
      method: "delete",
      url: urlServer + `/eliminar/tarea/${idTarea}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      }
    })
      .then((resJson) => {
        Swal.fire("Éxito", "La tarea se elimino con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};

export const actualizarTarea= (data) => {
  return async (dispatch) => {
    //console.log("soy el data", JSON.stringify(data))
    await axios({
      method: "put",
      url: urlServer + "/actualizar/tarea",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data:data,
    })
      .then((resJson) => {

        Swal.fire("Éxito", "El tarea se actualizo con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};

export const actualizarEstadoActividad= (data) => {
  return async (dispatch) => {
    //console.log("soy el data", JSON.stringify(data))
    await axios({
      method: "put",
      url: urlServer + "/actualizar/estado/actividad",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data:data,
    })
      .then((resJson) => {

       // Swal.fire("Éxito", "El actividad se actualizo con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};

export const actualizarEstadoMeta= (data) => {
  return async (dispatch) => {
    //console.log("soy el data", JSON.stringify(data))
    await axios({
      method: "put",
      url: urlServer + "/actualizar/estado/meta",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data:data,
    })
      .then((resJson) => {

       // Swal.fire("Éxito", "El actividad se actualizo con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};

export const eliminarMeta= (idMeta) => {
  return async (dispatch) => {
    //console.log("soy el data", JSON.stringify(data))
    await axios({
      method: "delete",
      url: urlServer + `/eliminar/meta/${idMeta}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      }
    })
      .then((resJson) => {
        Swal.fire("Éxito", "La meta se elimino con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};


export const actualizarMeta= (data) => {
  return async (dispatch) => {
    //console.log("soy el data", JSON.stringify(data))
    await axios({
      method: "put",
      url: urlServer + "/actualizar/meta",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data:data,
    })
      .then((resJson) => {

       // Swal.fire("Éxito", "El actividad se actualizo con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};

export const eliminarProyecto= (idProyecto) => {
  return async (dispatch) => {
    //console.log("soy el data", JSON.stringify(data))
    await axios({
      method: "delete",
      url: urlServer + `/eliminar/proyecto/${idProyecto}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      }
    })
      .then((resJson) => {
        Swal.fire("Éxito", "EL proyecto se elimino con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};

export const actualizarProjecto= (data) => {
  return async (dispatch) => {
    console.log("soy el data", JSON.stringify(data))
    await axios({
      method: "put",
      url: urlServer + "/actualizar/proyecto",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data:data,
    })
      .then((resJson) => {

       // Swal.fire("Éxito", "El actividad se actualizo con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};

export const eliminarLider= (idLider) => {
  return async (dispatch) => {
    //console.log("soy el data", JSON.stringify(data))
    await axios({
      method: "delete",
      url: urlServer + `/eliminar/lider/${idLider}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      }
    })
      .then((resJson) => {
        Swal.fire("Éxito", "El líder se eliminó con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};

export const actualizarLider= (data) => {
  return async (dispatch) => {
    //console.log("soy el data", JSON.stringify(data))
    await axios({
      method: "put",
      url: urlServer + "/actualizar/lider",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data:data,
    })
      .then((resJson) => {

       // Swal.fire("Éxito", "El actividad se actualizo con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};

//export {consutarLideres}

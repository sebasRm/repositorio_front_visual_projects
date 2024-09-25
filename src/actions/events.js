import { types } from "../types/types";
/**
 *  funciones para almacenar data a storange
 * @param {*} event 
 * @returns 
 */

export const AddUserToStorange = (event) => ({
  type: types.addUser,
  payload: event,
});

export const AddErrorsUserToStorange = (event) => ({
  type: types.errorUser,
  payload: event,
});

export const DeleteUserToStorange = () => ({
  type: types.deleteUser,
});

export const AddLiderToStorange = (event) => ({
  type: types.addLideres,
  payload: event
});

export const ConsultLiderToStorange = () => ({
  type: types.consultLeader,
});

export const CancelConsultLiderToStorange = () => ({
  type: types.consultLeader,
});

export const AddProjectsToStorange = (event) => ({
  type: types.addProjects,
  payload: event
});

export const AddProjectToStorange = (event) => ({
  type: types.addProject,
  payload: event
});

export const AddLeaderToStorange = (event) => ({
  type: types.addLeaders,
  payload: event,
});

export const AddinfoProjectToStorange = (event) => ({
  type: types.addInfoProject,
  payload: event,
});

export const AddProjectLeaderToStorange = (event) => ({
  type: types.addProjectLeader,
  payload: event,
});

export const AddTotalActivitiesToStorange = (event) => ({
  type: types.addTotalActivities,
  payload: event,
});

export const AddTotalActivitiesFinishToStorange = (event) => ({
  type: types.addTotalActivitiesFinish,
  payload: event,
});

export const AddTotalPercentageFinishToStorange = (event) => ({
  type: types.addPercentageActivitiesFinish,
  payload: event,
});

export const AddTotalTaskToStorange = (event) => ({
  type: types.addTotalTask,
  payload: event,
});

export const AddPercentageTaskToStorange = (event) => ({
  type: types.addPercentageTaskFinish,
  payload: event,
});

export const AddGoalsProjectToStorange = (event) => ({
  type: types.addGoalsProject,
  payload: event,
});

export const AddCountsGoalsProjectToStorange = (event) => ({
  type: types.addCountsGoalsProject,
  payload: event,
});

export const AddGoalsToStorange = (event) => ({
  type: types.addGoal,
  payload: event,
});

export const AddActivitiesGoalsToStorange = (event) => ({
  type: types.addActivitiesGoal,
  payload: event,
});

export const AddResponsablesToStorange = (event) => ({
  type: types.addResponsables,
  payload: event,
});

export const AddActivityToStorange = (event) => ({
  type: types.addActivity,
  payload: event,
});

export const AddActivitiesInitialsToStorange = (event) => ({
  type: types.addActivitiesInitials,
  payload: event,
});

export const AddActivitiesOrganizationToStorange = (event) => ({
  type: types.addActivitiesOrganization,
  payload: event,
});

export const AddActivitiesEjecutionToStorange = (event) => ({
  type: types.addActivitiesEjecution,
  payload: event,
});

export const AddActivitiesFinishToStorange = (event) => ({
  type: types.addActivitiesFinish,
  payload: event,
});


export const AddDataSpiProjectToStorange = (event) => ({
  type: types.addDataSpiProject,
  payload: event,
});

export const AddDataCpiProjectToStorange = (event) => ({
  type: types.addDataCpiProject,
  payload: event,
});

export const AddIdActivityToStorange = (event) => ({
  type: types.addIdActivity,
  payload: event,
});

export const addInfomrationIndicatorsToStorange = (event) => ({
  type: types.addInfomrationIndicators,
  payload: event,
});


export const addTaskActivitiesToStorange = (event) => ({
  type: types.addTaskActivities,
  payload: event,
});


export const AddTaskActivitiesInitialsToStorange = (event) => ({
  type: types.addTaskActivitiesInitials,
  payload: event,
});

export const AddTaskActivitiesOrganizationToStorange = (event) => ({
  type: types.addTaskActivitiesOrganization,
  payload: event,
});

export const AddTaskActivitiesEjecutionToStorange = (event) => ({
  type: types.addTaskActivitiesEjecution,
  payload: event,
});

export const AddTaskActivitiesFinishToStorange = (event) => ({
  type: types.addTaskActivitiesFinish,
  payload: event,
});

export const AddActivitiesPlanedToStorange = (event) => ({
  type: types.addActivitiesPlanedFinish,
  payload: event,
});

export const AddRecursosToStorange = (event) => ({
  type: types.addRecursosActivities,
  payload: event,
});

export const AddTotalRecursosToStorange = (event) => ({
  type: types.addTotalPresupuestoRecursosActivities,
  payload: event,
});

export const AddTotalTareasToStorange = (event) => ({
  type: types.addTotalPresupuestoTareasActivities,
  payload: event,
});

export const AddRecursoActividadToStorange = (event) => ({
  type: types.addRecursoActivity,
  payload: event,
});

export const AddCreateRecursoActividadToStorange = (event) => ({
  type: types.createRecurso,
  payload: event,
});

export const AddPresupuestoActividadToStorange = (event) => ({
  type: types.addPresupuestoActivity,
  payload: event,
});

export const AddTaskPlanedToStorange = (event) => ({
  type: types.addTaskPlaned,
  payload: event,
});

export const AddRecursosTaskToStorange = (event) => ({
  type: types.addRecursosTask,
  payload: event,
});

export const AddPresupuestoTaskToStorange = (event) => ({
  type: types.addPresupuestoTareas,
  payload: event,
});

export const AddPresupuestoMetaToStorange = (event) => ({
  type: types.addPresupuestoMeta,
  payload: event,
});

export const AddIdMetaToStorange = (event) => ({
  type: types.addIdMeta,
  payload: event,
});

export const AddMetaToStorange = (event) => ({
  type: types.addMeta,
  payload: event,
});

export const AddidLiderToStorange = (event) => ({
  type: types.addIdLider,
  payload: event,
});






/**
 * ************************Interfaces************************
 */
export const openModalCreateLeader = () => ({
  type: types.createLeader,
});

export const closeModalCreateLeader = () => ({
  type: types.closeLeader,
});

export const modalAddLeader = (event) => ({
  type: types.addLider,
  payload: event,
});

export const modalInformationSPI = (event) => ({
  type: types.informationSPI,
  payload: event,
});


export const modalInformationCPI = (event) => ({
  type: types.informationCPI,
  payload: event,
});

export const modalDetailActivity = (event) => ({
  type: types.detailActivity,
  payload: event,
});

export const modalDetailRecurso = (event) => ({
  type: types.detailRecurso,
  payload: event,
});


export const modalDeleteRecurso = (event) => ({
  type: types.deleteRecurso,
  payload: event,
});

export const modalDeleteActivity = (event) => ({
  type: types.deleteActivity,
  payload: event,
});

export const modalDetailTask = (event) => ({
  type: types.detailTask,
  payload: event,
});

export const modalDeletelTask = (event) => ({
  type: types.deleteTask,
  payload: event,
});

export const modalDeletelGoal = (event) => ({
  type: types.deleteGoal,
  payload: event,
});

export const modalDetailGoal = (event) => ({
  type: types.detailGoal,
  payload: event,
});

export const modalDeleteProject = (event) => ({
  type: types.deleteProject,
  payload: event,
});


export const modalDetailProject = (event) => ({
  type: types.detailProject,
  payload: event,
});


export const modalDeleteLider = (event) => ({
  type: types.deleteLider,
  payload: event,
});

export const modalDetailLider = (event) => ({
  type: types.detailLider,
  payload: event,
});








import { types } from "../types/types";
const initialState = {
  leader: false,
};

export const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.addUser:
      return {
        ...state,
        user: action.payload,
      };

    case types.errorUser:
      return {
        ...state,
        errorsUser: action.payload,
      };

    case types.deleteUser:
      return {
        ...state,
        user: null,
        percentageFinishAct: null,
        projectLeader: null,
        totalActivities: null,
        totalActivitiesFinish: null,
        totalTask: null,
        dataSpiProject: null,
        activitiesFinish: null,
        activitiesEjecution: null,
        dataCpiProject: null,
        project: null,
      };

    case types.addLideres:
      return {
        ...state,
        lideres: action.payload,
      };

    case types.createLeader:
      return {
        ...state,
        modalLeader: true,
      };

    case types.closeLeader:
      return {
        ...state,
        modalLeader: false,
      };

    case types.addLider:
      return {
        ...state,
        modalLider: action.payload,
      };

    case types.consultLeader:
      return {
        ...state,
        leader: true,
      };

    case types.cancelConsultLeader:
      return {
        ...state,
        leader: false,
      };

    case types.addProjects:
      return {
        ...state,
        projects: action.payload,
      };

    case types.addProject:
      return {
        ...state,
        project: action.payload,
      };

    case types.addLeaders:
      return {
        ...state,
        leaders: action.payload,
      };

    case types.addInfoProject:
      return {
        ...state,
        infoProject: action.payload,
      };

    case types.addProjectLeader:
      return {
        ...state,
        projectLeader: action.payload,
      };

    case types.addTotalActivities:
      return {
        ...state,
        totalActivities: action.payload,
      };

    case types.addTotalActivitiesFinish:
      return {
        ...state,
        totalActivitiesFinish: action.payload,
      };

    case types.addPercentageActivitiesFinish:
      return {
        ...state,
        percentageFinishAct: action.payload,
      };

    case types.addTotalTask:
      return {
        ...state,
        totalTask: action.payload,
      };

    case types.addPercentageTaskFinish:
      return {
        ...state,
        percentageTask: action.payload,
      };
    case types.addGoalsProject:
      return {
        ...state,
        goalsProject: action.payload,
      };

    case types.addCountsGoalsProject:
      return {
        ...state,
        countStateGoals: action.payload,
      };

    case types.addGoal:
      return {
        ...state,
        goal: action.payload,
      };

    case types.addActivitiesGoal:
      return {
        ...state,
        activitiesGoal: action.payload,
      };

    case types.addResponsables:
      return {
        ...state,
        responsables: action.payload,
      };

    case types.addActivity:
      return {
        ...state,
        activity: action.payload,
      };

    case types.addActivitiesInitials:
      return {
        ...state,
        activitiesInitials: action.payload,
      };

    case types.addActivitiesOrganization:
      return {
        ...state,
        activitiesOrganization: action.payload,
      };

    case types.addActivitiesEjecution:
      return {
        ...state,
        activitiesEjecution: action.payload,
      };
    case types.addActivitiesFinish:
      return {
        ...state,
        activitiesFinish: action.payload,
      };
    case types.addDataSpiProject:
      return {
        ...state,
        dataSpiProject: action.payload,
      };
    case types.addDataCpiProject:
      return {
        ...state,
        dataCpiProject: action.payload,
      };

    case types.addIdActivity:
      return {
        ...state,
        idActivity: action.payload,
      };
    case types.informationSPI:
      return {
        ...state,
        informationSPIproyect: action.payload,
      };
    case types.informationCPI:
      return {
        ...state,
        informationCPIproyect: action.payload,
      };
    case types.addInfomrationIndicators:
      return {
        ...state,
        informationIndicators: action.payload,
      };
    case types.addTaskActivities:
      return {
        ...state,
        taskActivities: action.payload,
      };
    case types.addTaskActivitiesInitials:
      return {
        ...state,
        taskactivitiesInitials: action.payload,
      };

    case types.addTaskActivitiesOrganization:
      return {
        ...state,
        taskactivitiesOrganization: action.payload,
      };

    case types.addTaskActivitiesEjecution:
      return {
        ...state,
        taskactivitiesEjecution: action.payload,
      };
    case types.addTaskActivitiesFinish:
      return {
        ...state,
        taskactivitiesFinish: action.payload,
      };

    case types.detailActivity:
      return {
        ...state,
        detailActivityProject: action.payload,
      };

    case types.addActivitiesPlanedFinish:
      return {
        ...state,
        activityPlaned: action.payload,
      };

    case types.addRecursosActivities:
      return {
        ...state,
        recursos: action.payload,
      };

    case types.addTotalPresupuestoRecursosActivities:
      return {
        ...state,
        totalRecursos: action.payload,
      };

    case types.addTotalPresupuestoTareasActivities:
      return {
        ...state,
        totalRecursosTareas: action.payload,
      };

    case types.detailRecurso:
      return {
        ...state,
        detailRecursoActivity: action.payload,
      };

    case types.addRecursoActivity:
      return {
        ...state,
        recursoActividad: action.payload,
      };

    case types.createRecurso:
      return {
        ...state,
        createRecursoActividad: action.payload,
      };

    case types.addPresupuestoActivity:
      return {
        ...state,
        presupuestoActividad: action.payload,
      };

    case types.deleteRecurso:
      return {
        ...state,
        deleteRecursoActividad: action.payload,
      };

    case types.deleteActivity:
      return {
        ...state,
        deleteActivityProject: action.payload,
      };

    case types.detailTask:
      return {
        ...state,
        detailTaskActivity: action.payload,
      };

    case types.addTaskPlaned:
      return {
        ...state,
        taskPlaned: action.payload,
      };

    case types.addRecursosTask:
      return {
        ...state,
        resucursosTask: action.payload,
      };

    case types.addPresupuestoTareas:
      return {
        ...state,
        presupuestoTarea: action.payload,
      };

    case types.addPresupuestoMeta:
      return {
        ...state,
        presupuestoMeta: action.payload,
      };

    case types.deleteTask:
      return {
        ...state,
        deleteModalTask: action.payload,
      };
    case types.deleteGoal:
      return {
        ...state,
        deleteModalGoal: action.payload,
      };

    case types.addIdMeta:
      return {
        ...state,
        idMeta: action.payload,
      };

    case types.detailGoal:
      return {
        ...state,
        detailModalGoal: action.payload,
      };

    case types.addMeta:
      return {
        ...state,
        meta: action.payload,
      };

    case types.deleteProject:
      return {
        ...state,
        deleteProjects: action.payload,
      };

    case types.detailProject:
      return {
        ...state,
        detailProjects: action.payload,
      };
    case types.deleteLider:
      return {
        ...state,
        deleteLiders: action.payload,
      };

    case types.addIdLider:
      return {
        ...state,
        addIdLiders: action.payload,
      };
    case types.detailLider:
      return {
        ...state,
        detailLiders: action.payload,
      };

    default:
      return state;
  }
};

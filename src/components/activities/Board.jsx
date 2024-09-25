import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import iconoUsuario from "../../img/directivo.png";
import "../../css/board.css";
import { MdTask } from "react-icons/md";
import {
  consultarActividadesMetaInicio,
  consultarActividadesMetas,
  actualizarActividadesIOrganizacion,
  consultarActividadesMetaOrganizacion,
  actualizarActividadesInicio,
  actualizarActividadesEjecucion,
  consultarActividadesMetaEjecucion,
  consultarActividadesMetaCierre,
  actualizarActividadesCierre,
  consultarTareasActividades,
  consultarTareasActividadesInicio,
  consultarTareasActividadesOrganizacion,
  consultarTareasActividadesEjecucion,
  consultarTareasActividadesCierre,
  actualizarTareasInicio,
  actualizarTareasOrganizacion,
  actualizarTareasEjecucion,
  actualizarTareasCierre,
  consultarPresupuestoActividad,
  actualizarEstadoActividad,
  actualizarEstadoMeta,
  consultarPresupuestoMeta,
} from "../../actions/apis";
import { useDispatch, useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { modalDetailTask, modalDeletelTask } from "../../actions/events";
import { ModalDetailTask } from "../modals/ModalDetailTask";
import { ModalEliminarTarea } from "../modals/ModalEliminarTarea";
import Swal from "sweetalert2";

const Board = (props) => {
  const formatCurrency = (number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 2,
    }).format(number);
  };
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    projectLeader,
    goal,
    activitiesGoal,
    idActivity,
    taskActivities,
    taskactivitiesInitials,
    taskactivitiesOrganization,
    taskactivitiesEjecution,
    taskactivitiesFinish,
    user,
    recursoActividad,
    presupuestoMeta
  } = useSelector((state) => state);

  const apisEjecut = async () => {
    await dispatch(
      consultarTareasActividades(
        props.idActividad
          ? props.idActividad
          : idActivity && idActivity.idActividad
      )
    );
    await dispatch(
      consultarTareasActividadesInicio(
        props.idActividad
          ? props.idActividad
          : idActivity && idActivity.idActividad
      )
    );
    await dispatch(
      consultarTareasActividadesOrganizacion(
        props.idActividad
          ? props.idActividad
          : idActivity && idActivity.idActividad
      )
    );
    await dispatch(
      consultarTareasActividadesEjecucion(
        props.idActividad
          ? props.idActividad
          : idActivity && idActivity.idActividad
      )
    );
    await dispatch(
      consultarTareasActividadesCierre(
        props.idActividad
          ? props.idActividad
          : idActivity && idActivity.idActividad
      )
    );
  };

  const [task, setTask] = useState(false);

  useEffect(() => {
    apisEjecut();
  }, [props.idActividad, recursoActividad]);
  /*useEffect(() => {
    apisEjecut();
  }, [props.idActividad]);*/

  

  useEffect(() => {
    const updatedColumns = {
      "column-1": {
        ...columns["column-1"],
        taskIds: taskactivitiesInitials || [],
        totalActividades: taskactivitiesInitials
          ? taskactivitiesInitials.length
          : 0,
      },
      "column-2": {
        ...columns["column-2"],
        taskIds: taskactivitiesOrganization || [],
        totalActividades: taskactivitiesOrganization
          ? taskactivitiesOrganization.length
          : 0,
      },
      "column-3": {
        ...columns["column-3"],
        taskIds: taskactivitiesEjecution || [],
        totalActividades: taskactivitiesEjecution
          ? taskactivitiesEjecution.length
          : 0,
      },
      "column-4": {
        ...columns["column-4"],
        taskIds: taskactivitiesFinish || [],
        totalActividades: taskactivitiesFinish
          ? taskactivitiesFinish.length
          : 0,
      },
    };
    setColumns(updatedColumns);
  }, [
    taskactivitiesInitials,
    taskactivitiesOrganization,
    taskactivitiesEjecution,
    taskactivitiesFinish,
  ]);

  const initialColumns = {
    "column-1": {
      id: "column-1",
      title: "Inicio",
      taskIds: taskactivitiesInitials || [],
      color: "red",
      totalActividades: taskactivitiesInitials
        ? taskactivitiesInitials.length
        : 0,
    },
    "column-2": {
      id: "column-2",
      title: "Organización",
      taskIds: taskactivitiesOrganization || [],
      color: "orange",
      totalActividades: taskactivitiesOrganization
        ? taskactivitiesOrganization.length
        : 0,
    },
    "column-3": {
      id: "column-3",
      title: "Ejecución",
      taskIds: taskactivitiesEjecution || [],
      color: "blue",
      totalActividades: taskactivitiesEjecution
        ? taskactivitiesEjecution.length
        : 0,
    },
    "column-4": {
      id: "column-4",
      title: "Cierre",
      taskIds: taskactivitiesFinish || [],
      color: "green",
      totalActividades: taskactivitiesFinish ? taskactivitiesFinish.length : 0,
    },
  };

  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    const startColumn = columns[source.droppableId];
    const endColumn = columns[destination.droppableId];

    if (!startColumn || !endColumn) {
      return;
    }

    const activityId = parseInt(draggableId.replace("task-", ""), 10);

    if (destination.droppableId !== source.droppableId) {
      const newColumns = { ...columns };

      const startTaskIds = Array.from(startColumn.taskIds);
      startTaskIds.splice(source.index, 1);
      newColumns[startColumn.id] = { ...startColumn, taskIds: startTaskIds };
      newColumns[startColumn.id].totalActividades -= 1; // Restar la actividad de la columna de origen

      const endTaskIds = Array.from(endColumn.taskIds);
      endTaskIds.splice(destination.index, 0, activityId);

      if (activityId && endColumn.title === "Inicio") {
        if (user?.liders[0]) {
          await dispatch(actualizarTareasInicio(activityId));
          await apisEjecut();
        } else {
          Swal.fire(
            "Error",
            "No tiene los permisos para realizar esta acción",
            "error"
          );
          await apisEjecut();
          setColumns(initialColumns); // Forzar la actualización del estado
          return;
        }
      }

      if (activityId && endColumn.title === "Organización") {
        if (user?.liders[0]) {
          await dispatch(actualizarTareasOrganizacion(activityId));
          await apisEjecut();
        } else {
          Swal.fire(
            "Error",
            "No tiene los permisos para realizar esta acción",
            "error"
          );
          await apisEjecut();
          setColumns(initialColumns); // Forzar la actualización del estado
          return;
        }
      }

      if (activityId && endColumn.title === "Ejecución") {
        if (user?.liders[0]) {
          await dispatch(actualizarTareasEjecucion(activityId));
          await apisEjecut();
        } else {
          Swal.fire(
            "Error",
            "No tiene los permisos para realizar esta acción",
            "error"
          );
          await apisEjecut();
          setColumns(initialColumns); // Forzar la actualización del estado
          return;
        }
      }

      if (activityId && endColumn.title === "Cierre") {
        if (user?.liders[0]) {
          await dispatch(actualizarTareasCierre(activityId));
          await apisEjecut();
        } else {
          Swal.fire(
            "Error",
            "No tiene los permisos para realizar esta acción",
            "error"
          );
          await apisEjecut();
          setColumns(initialColumns); // Forzar la actualización del estado
          return;
        }
      }

      let actividadEstado = {
        data: {
          activity: {
            idActividad: idActivity?.idActividad,
          },
        },
      };

      let metaEstado = {
        data: {
          goal: {
            idMeta: goal.id,
          },
        },
      };

      await dispatch(actualizarEstadoActividad(actividadEstado));
      await dispatch(actualizarEstadoMeta(metaEstado));
      await dispatch(consultarPresupuestoMeta(goal.id));
      await dispatch(consultarActividadesMetas(goal.id));
      setLoading(false);
      newColumns[endColumn.id] = { ...endColumn, taskIds: endTaskIds };
      newColumns[endColumn.id].totalActividades += 1; // Sumar la actividad a la columna de destino
      setColumns(newColumns);
    }
  };

  async function handleDeleteTask(tarea) {
    dispatch(modalDeletelTask(true));
    setTask(tarea);
  }

  async function handleDetailTask(tarea) {
    await dispatch(consultarPresupuestoActividad(idActivity?.idActividad));
    dispatch(modalDetailTask(true));
    setTask(tarea);
  }

  return (
    <>
      {loading ? (
        <div
          className="subtitle-home"
          style={{
            fontSize: 50,
            marginTop: "13rem",
            marginLeft: "25rem",
            width: "75%",
          }}
        >
          {" "}
          Cargando tareas ...
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="board" direction="horizontal">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="board"
              >
                {Object.keys(columns).map((columnId, index) => {
                  const column = columns[columnId];
                  const columnActivities = column.taskIds || [];

                  return (
                    <Droppable
                      key={column.id}
                      droppableId={column.id}
                      type="task"
                    >
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className={`column ${
                            snapshot.isDraggingOver ? "dragging-over" : ""
                          }`}
                        >
                          <h2>
                            {column.title} ({column.totalActividades})
                          </h2>
                          <div className="horizontal-line"></div>
                          <div
                            className="tasks-container"
                            style={{ maxHeight: "500px", overflowY: "auto" }}
                          >
                            {props.taskActivities &&
                              columnActivities?.map(
                                (activityId, activityIndex) => {
                                  const activity = props.taskActivities?.find(
                                    (act) => act.idTarea === activityId
                                  );

                                  if (!activity) {
                                    return null;
                                  }

                                  return (
                                    <Draggable
                                      key={activity.idTarea}
                                      draggableId={`task-${activity.idTarea}`}
                                      index={activityIndex}
                                    >
                                      {(provided, snapshot) => (
                                        <div
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          ref={provided.innerRef}
                                          className="task"
                                        >
                                          <div
                                            className="vertical-line"
                                            style={{
                                              backgroundColor: column.color,
                                            }}
                                          ></div>
                                          {user?.liders[0] ? (
                                            <div
                                              className="button-detail-task"
                                              style={{
                                                marginLeft: "11rem",
                                                marginTop: "-0.2rem",
                                                width: "8%",
                                              }}
                                              onClick={() =>
                                                handleDetailTask(activity)
                                              }
                                            >
                                              <FaEye size={25} />
                                            </div>
                                          ) : (
                                            <div
                                              className="button-detail-task"
                                              style={{
                                                marginLeft: "13rem",
                                                marginTop: "-0.5rem",
                                                width: "8%",
                                              }}
                                              onClick={() =>
                                                handleDetailTask(activity)
                                              }
                                            >
                                              <FaEye size={25} />
                                            </div>
                                          )}
                                          {user?.liders[0] && (
                                            <div
                                              className="button-detail-task"
                                              style={{
                                                marginLeft: "13.5rem",
                                                marginTop: "-1.5rem",
                                              }}
                                              onClick={() =>
                                                handleDeleteTask(activity)
                                              }
                                            >
                                              <MdDelete size={25} />
                                            </div>
                                          )}
                                          <div style={{ marginTop: "-1.5rem" }}>
                                            <MdTask />
                                          </div>

                                          <div
                                            style={{
                                              marginTop: "-1.5rem",
                                              marginLeft: "1.3rem",
                                              width: "60%",
                                            }}
                                          >
                                            {activity.nombre}
                                          </div>

                                          <div className="col">
                                            {formatCurrency(
                                              activity.presupuesto
                                            )}
                                          </div>
                                          <img
                                            src={iconoUsuario}
                                            style={{
                                              width: "25px",
                                              marginTop: "1.5rem",
                                            }}
                                            alt="user-icon"
                                          />
                                          <div
                                            className="col"
                                            style={{
                                              marginTop: "-1.5rem",
                                              marginLeft: "2rem",
                                            }}
                                          >
                                            {
                                              activity.Responsable_.Usuario_
                                                .nombre
                                            }
                                          </div>
                                        </div>
                                      )}
                                    </Draggable>
                                  );
                                }
                              )}
                          </div>
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  );
                })}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
      <ModalDetailTask task={task && task} />
      {task && <ModalEliminarTarea task={task && task} />}
    </>
  );
};

export default Board;

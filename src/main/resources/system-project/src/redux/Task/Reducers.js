import {
  ASSIGN_TASK_TO_USER_FAILURE,
  ASSIGN_TASK_TO_USER_REQUEST,
  ASSIGN_TASK_TO_USER_SUCCESS,
  CREATE_TASK_FAILURE,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  FETCH_TASKS_BY_ID_REQUEST,
  FETCH_TASKS_BY_ID_SUCCESS,
  FETCH_TASKS_FAILURE,
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_STATUS_SUCCESS,
} from "./ActionTypes";

const initialState = {
  tasks: [],
  isLoading: false,
  error: null,
  taskDetails: null,
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS_REQUEST:
    case CREATE_TASK_REQUEST:
    case UPDATE_TASK_REQUEST:
    case DELETE_TASK_REQUEST:
    case FETCH_TASKS_BY_ID_REQUEST:
    case ASSIGN_TASK_TO_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tasks: action.tasks,
      };

    case FETCH_TASKS_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        taskDetails: action.tasks,
        error: null,
      };
    case UPDATE_TASK_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        taskDetails:
          state.taskDetails && state.taskDetails.id === action.task.id
            ? action.task
            : state.taskDetails,
      };

    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tasks: [...state.tasks, action.tasks],
      };

    case ASSIGN_TASK_TO_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tasks: state.tasks.map((task) =>
          task.id === action.task.id ? action.task : task
        ),
      };

    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tasks: state.tasks.filter((task) => task.id !== action.taskId),
      };

    case FETCH_TASKS_FAILURE:
    case CREATE_TASK_FAILURE:
    case DELETE_TASK_FAILURE:
    case ASSIGN_TASK_TO_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
export default taskReducer;

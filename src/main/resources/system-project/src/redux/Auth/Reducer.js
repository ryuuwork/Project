import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionTypes";

const initialState = {
  isLoading: false,
  user: null,
  error: null,
  jwt: null,
  projectSize: 0,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jwt: action.payload.jwt,
        error: null,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        error: null,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;

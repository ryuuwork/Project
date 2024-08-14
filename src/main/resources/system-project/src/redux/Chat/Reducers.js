import {
  FETCH_CHAT_BY_PROJECT_SUCCESS,
  FETCH_CHAT_MESSAGES_FAILURE,
  FETCH_CHAT_MESSAGES_REQUEST,
  FETCH_CHAT_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAILURE,
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
  SEND_MESSAGE_FAILURE,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
} from "./ActionTypes";

const initialState = {
  messages: [],
  isLoading: false,
  error: null,
  chat: null,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MESSAGES_REQUEST:
    case SEND_MESSAGE_REQUEST:
    case FETCH_CHAT_MESSAGES_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_MESSAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        messages: action.messages,
      };
    case FETCH_CHAT_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.chat,
        isLoading: false,
      };
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        messages: [...state.messages, action.message],
      };

    case FETCH_CHAT_BY_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        chat: action.chat,
      };
    case FETCH_MESSAGES_FAILURE:
    case SEND_MESSAGE_FAILURE:
    case FETCH_CHAT_MESSAGES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
export default chatReducer;

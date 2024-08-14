import {
  CREATE_PAYMENT_FAILURE,
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
  GET_USER_SUBSCRIPTION_FAILURE,
  GET_USER_SUBSCRIPTION_REQUEST,
  GET_USER_SUBSCRIPTION_SUCCESS,
  UPGRADE_SUBSCRIPTION_FAILURE,
  UPGRADE_SUBSCRIPTION_REQUEST,
  UPGRADE_SUBSCRIPTION_SUCCESS,
} from "./ActionTypes";

const initialState = {
  userSubscription: null,
  isLoading: false,
  error: null,
};

const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_SUBSCRIPTION_REQUEST:
    case UPGRADE_SUBSCRIPTION_REQUEST:
    case CREATE_PAYMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_USER_SUBSCRIPTION_SUCCESS:
    case UPGRADE_SUBSCRIPTION_SUCCESS:
    case CREATE_PAYMENT_SUCCESS:
      return {
        ...state,
        userSubscription: action.payload,
        isLoading: false,
        error: null,
      };

    case GET_USER_SUBSCRIPTION_FAILURE:
    case UPGRADE_SUBSCRIPTION_FAILURE:
    case CREATE_PAYMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default subscriptionReducer;

import api from "../Auth/api";
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

export const getUserSubscription = () => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_SUBSCRIPTION_REQUEST });
    try {
      const response = await api.get("/api/v1/subscriptions/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      dispatch({ type: GET_USER_SUBSCRIPTION_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: GET_USER_SUBSCRIPTION_FAILURE,
        payload: error.response ? error.response.data : "NETWORK ERROR",
      });
    }
  };
};

export const upgradeSubscription = ({ planType }) => {
  return async (dispatch) => {
    dispatch({ type: UPGRADE_SUBSCRIPTION_REQUEST });
    try {
      const response = await api.post("/api/v1/subscriptions/upgrade/", null, {
        params: {
          planType: planType,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      console.log("upgradeSubscription -------", response.data);
      dispatch({ type: UPGRADE_SUBSCRIPTION_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: UPGRADE_SUBSCRIPTION_FAILURE,
        payload: error.response ? error.response.data : "NETWORK ERROR",
      });
    }
  };
};

export const createPayment = ({ planType }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_PAYMENT_REQUEST });
    try {
      const response = await api.post(`/api/v1/payments/${planType}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      dispatch({ type: CREATE_PAYMENT_SUCCESS, payload: response.data });
      console.log("payment Data: ", response.data);
      if (response.data.paymentURL) {
        window.location.href = response.data.paymentURL;
      }
    } catch (error) {
      dispatch({
        type: CREATE_PAYMENT_FAILURE,
        payload: error.response ? error.response.data : "NETWORK ERROR",
      });
      console.log(error);
    }
  };
};

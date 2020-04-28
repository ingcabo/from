import axios from "axios";
import {
  API_URL,
  LOCAL_STORAGE_KEY,
  SIGNED_IN,
  SIGNING_ERROR,
  SIGNING_IN,
  AUTHOERIZE_USER,
  REJECT_USER,
  parseJWT
} from "../utils";

export function authorizeUser() {
  //authorize user whether after signing in or after return in a vlid session
  const token = localStorage.getItem(LOCAL_STORAGE_KEY),
    now = Date.now();
  if (token) {
    const { exp } = parseJWT(token),
      expiration = new Date(exp * 1000).getTime();
    if (expiration > now) {
      //token still valid
      axios.defaults.headers["Authorization"] = token; //set ddefault Authorization header
      return {
        type: AUTHOERIZE_USER
      };
    } else {
      return {
        type: REJECT_USER,
        expired: true
      };
    }
  } else {
    return {
      type: REJECT_USER
    };
  }
}

export function logout() {
  //sign out
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  return {
    type: REJECT_USER,
    loggedOut: true
  };
}

export function signin(data) {
  return dispatch => {
    dispatch({
      type: SIGNING_IN
    });
    axios
      .post(`${API_URL}auth`, data)
      .then(resp => {
        const response = resp.data,
          token = response.jwt;
        localStorage.setItem(LOCAL_STORAGE_KEY, token); //store token in localStorage

        dispatch({
          type: SIGNED_IN,
          user: response.response
        });
      })
      .catch(err => {
        console.log(err.response);
        dispatch({
          type: SIGNING_ERROR
        });
      });
  };
}

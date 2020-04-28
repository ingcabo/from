import {
  AUTHOERIZE_USER,
  REJECT_USER,
  SIGNED_IN,
  SIGNING_ERROR,
  SIGNING_IN
} from "../utils";

function user(state = {}, action) {
  switch (action.type) {
    case AUTHOERIZE_USER: //authorize user after login or if user gets back if token still valid
      return {
        ...state,
        authorized: true
      };

    case REJECT_USER: // reject user either on logout or if the token expired
      return {
        authorized: false,
        loggedOut: action.loggedOut,
        expired: action.expired
      };

    case SIGNED_IN: // signin successfully
      return {
        signedIn: true,
        userObj: action.user,
        signinIn: false
      };

    case SIGNING_ERROR: // error from calling API
      return {
        ...state,
        signinIn: false,
        signinError: true
      };

    case SIGNING_IN: // loading indicator while calling API
      return {
        ...state,
        signinIn: true,
        signinError: false
      };

    default:
      return state;
  }
}

export default user;

import { combineReducers } from "redux";
import auth from "./auth";
import profiles from "./profiles";
import eventos from "./eventos";
import errors from "./errors";

export default combineReducers({
  auth,
  profiles,
  eventos,
  errors
});

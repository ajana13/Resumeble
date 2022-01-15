import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import resumeReducer from './resumeReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  resume: resumeReducer
});

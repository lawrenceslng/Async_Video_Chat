import { combineReducers } from "redux";
import Login from "./reducer-login";
// import Friends from "./reducer-friends";
// import Video from "./reducer-video";
import Navigation from "./reducer-navigation";
//brainstorm reducers
// reducer for webcam activation

const allReducers = combineReducers({
  Login,
  // Friends,
  // Video,
  Navigation
});

export default allReducers;

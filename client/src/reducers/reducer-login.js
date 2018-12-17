const initialState = {
  loggedIn: false,
  token: "",
  id: ""
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGGED_IN":
      return {
        ...state,
        loggedIn: action.payload.loggedIn,
        token: action.payload.token,
        id: action.payload.id,
      };
    case "NOT_LOGGED_IN":
      return {
        ...state,
        loggedIn:  action.payload.loggedIn,
        token: "",
        id: ""
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loggedIn: action.payload.loggedIn,
        token: action.payload.json.token,
        id: action.payload.json.id,
      };
    default:
      return state;
  }
}

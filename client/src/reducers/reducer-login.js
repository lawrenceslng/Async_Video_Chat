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
        loggedIn: true,
        token: action.payload.token,
        id: action.payload.id,
      };
    case "NOT_LOGGED_IN":
      return {
        ...state,
        loggedIn: false,
        token: "",
        id: ""
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loggedIn: true,
        token: action.payload.json.token,
        id: action.payload.json.id,
      };
    default:
      return state;
  }
}

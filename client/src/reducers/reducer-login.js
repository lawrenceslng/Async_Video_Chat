const initialState = {
  loggedIn: false,
  accountCreated: false,
  token: "",
  id: ""
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGGED_IN":
      return {
        ...state,
        loggedIn: true
      };
    case "NOT_LOGGED_IN":
      return {
        ...state,
        loggedIn: false
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

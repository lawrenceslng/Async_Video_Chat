const initialState = {
  token: "",
  id: ""
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGGED_IN":
      return {
        ...state,
        token: action.payload.token,
        id: action.payload.id,
      };
    case "NOT_LOGGED_IN":
      return {
        ...state,
        token: "",
        id: ""
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: action.payload.json.token,
        id: action.payload.json.id,
      };
    default:
      return state;
  }
}

const initialState = {
    friends: [{ id: 0, username: "l" }]
  };
  
  export default function friendReducer(state = initialState, action) {
    switch (action.type) {
      case "FRIENDS_FETCHED":
        return {
          ...state,
          friends: action.payload.friends
        };
      case "FRIENDS_FETCH_FAILURE":
        return {
          ...state,
          error: action.payload.error
        };
      default:
        return state;
    }
  }
  
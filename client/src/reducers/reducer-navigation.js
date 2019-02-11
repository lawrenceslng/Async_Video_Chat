const initialState = {
    navBar: false,
    record: false,
    yourThoughts: false,
    yourCommunity: false,
    settings: false,
    error: ''
};
  
export default function navigationReducer(state = initialState, action) {
    switch (action.type) {
        case "Your Thoughts":
            return {
                ...state,
                navBar: action.payload.navBar,
                record: action.payload.record,
                yourThoughts: action.payload.yourThoughts,
                yourCommunity:  action.payload.yourCommunity,
                settings: action.payload.settings  
            };
        case "Create a Thought":
            return {
                ...state,
                navBar: action.payload.navBar,
                record: action.payload.record,
                yourThoughts: action.payload.yourThoughts,
                yourCommunity:  action.payload.yourCommunity,
                settings: action.payload.settings  
            };
        case "Your Community":
            return {
                ...state,
                navBar: action.payload.navBar,
                record: action.payload.record,
                yourThoughts: action.payload.yourThoughts,
                yourCommunity:  action.payload.yourCommunity,
                settings: action.payload.settings  
            };
        case "Settings":
            return {
                ...state,
                navBar: action.payload.navBar,
                record: action.payload.record,
                yourThoughts: action.payload.yourThoughts,
                yourCommunity:  action.payload.yourCommunity,
                settings: action.payload.settings  
            };
        case "Failure":
            console.log(action.payload.error);
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state;
        }
};
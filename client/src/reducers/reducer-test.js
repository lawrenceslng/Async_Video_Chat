const initialState = {
    test: false
};

export default function testReducer (state = initialState, action) {
    switch (action.type) {
        case "OPEN_MODAL":
            return {
                ...state,
                test: action.payload.test
            }
        case "CLOSE_MODAL":
            return {
                ...state,
                test: action.payload.test
            }
        default:
            return state;
    }
    
}
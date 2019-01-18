export const openModal = () => {

    // action
        // made up of two parts 1. type 2. payload
    return {
        type: 'OPEN_MODAL', //what does the action do = title of action
        payload: {test: true} // any data you need to return
    }
};


export const closeModal = () => {

    // action
        // made up of two parts 1. type 2. payload
    return {
        type: 'CLOSE_MODAL', //what does the action do = title of action
        payload: {test: false} // any data you need to return
    }
};
export function navigateTo(location) {
    console.log(location);
    if(location == 'Your Thoughts')
    {
        return dispatch => {
            dispatch(fetchYourThoughts())
        }
    }
    else if(location == 'Create a Thought')
    {
        return dispatch => {
            dispatch(fetchCreateVideo())
        }
    }
    else if(location == 'Your Community')
    {
        return dispatch => {
            dispatch(fetchYourCommunity())
        }
    }
    else if(location == 'Settings')
    {
        return dispatch => {
            dispatch(fetchSettings())
        }
    }
    else{
        return dispatch => {
            dispatch(fetchFailure())
        }
    }
};
  
export const fetchYourThoughts = () => {
  return {
    type: "Your Thoughts",
    payload: {    
        navBar: true,
        record: false,
        yourThoughts: true,
        yourCommunity: false,
        settings: false}
  };
};

export const fetchCreateVideo = () => {
    return {
      type: "Create a Thought",
      payload: {        
        navBar: true,
        record: true,
        yourThoughts: false,
        yourCommunity: false,
        settings: false}
    };
};
  
export const fetchYourCommunity = () => {
    return {
      type: "Your Community",
      payload: {
        navBar: true,
        record: false,
        yourThoughts: false,
        yourCommunity: true,
        settings: false
      }
    };
};
  
export const fetchSettings = () => {
    return {
      type: "Settings",
      payload: {  
        navBar: true,
        record: false,
        yourThoughts: false,
        yourCommunity: false,
        settings: true}
    };
};
  
export const fetchFailure = () => {
    return {
        type: "Failure",
        payload: {
            error: "something not selected correctly"
        }
    }
}
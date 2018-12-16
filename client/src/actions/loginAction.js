export function checkLogin(token) {
  const settings = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token})
  };

  return dispatch => {
    return fetch("/check-login", settings)
    .then(res => {
      if(res.status === 403) {
        dispatch(fetchNotLoggedIn());
      }
      else {
        dispatch(fetchLoggedIn());
      }
    });
  };
}

export function login(token) {
  alert(token.username)
  const settings = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(token)
  };

  return dispatch => {
    return fetch("/login", settings)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          alert("RIGHT")
          dispatch(fetchLoginSuccess(json));
          return json;
        }
        else
          alert("FAIL")
      });
      // .catch(error => dispatch(fetchLoginFailure(error)));
  };
}

export const fetchLoggedIn = () => {
  return {
    type: "LOGGED_IN",
  };
};

export const fetchNotLoggedIn = () => {
  return {
    type: "NOT_LOGGED_IN",
  };
};

export const fetchLoginSuccess = (json) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: { json }
  };
};

export const fetchLoginFailure = (error) => {
  return {
    type: "LOGIN_FAILURE",
    payload: { error }
  };
};

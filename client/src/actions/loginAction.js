export function checkLogin(token, id) {
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ token })
  };

  return dispatch => {
    return fetch("/check-login", settings).then(res => {
      if (res.status === 403) {
        dispatch(fetchNotLoggedIn());
      } else {
        dispatch(fetchLoggedIn(token, id));
      }
    });
  };
}

export function login(token) {
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(token)
  };

  return dispatch => {
    return fetch("/login", settings)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          dispatch(fetchLoginSuccess(json));
          return json;
        }
      })
      .catch(error => dispatch(fetchLoginFailure(error)));
  };
}

export function logout() {
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };

  return dispatch => {
    return fetch("/logout", settings).then(dispatch(fetchNotLoggedIn()));
  };
}

export const fetchLoggedIn = (token, id) => {
  return {
    type: "LOGGED_IN",
    payload: { token, id }
  };
};

export const fetchNotLoggedIn = () => {
  return {
    type: "NOT_LOGGED_IN"
  };
};

export const fetchLoginSuccess = json => {
  return {
    type: "LOGIN_SUCCESS",
    payload: { json }
  };
};

export const fetchLoginFailure = error => {
  return {
    type: "LOGIN_FAILURE",
    payload: { error }
  };
};

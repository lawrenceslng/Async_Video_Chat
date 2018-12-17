export function checkLogin(token) {
  console.log(token);
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
        dispatch(fetchLoggedIn(token));
      }
    });
  };
};

export function login(username, password) {
  // console.log(username);
  // console.log(password);
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({username, password})
  };

  return dispatch => {
    return fetch("/login", settings)
      .then(res => res.json())
      .then(json => {
        // console.log(json);
        localStorage.setItem('token', json.token);
        localStorage.setItem('id',json.id);
        if (json.success) {
          dispatch(fetchLoginSuccess(json));
          return json;
        }
      })
      .catch(error => dispatch(fetchLoginFailure(error)));
  };
}

export function logout() {
  console.log("user is logging out");
  localStorage.removeItem('token');
  localStorage.removeItem('id');
  const settings = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };

  return dispatch => {
    return fetch("/logout", settings).then(dispatch(fetchNotLoggedIn()));
  };
}

export const fetchLoggedIn = (token) => {
  return {
    type: "LOGGED_IN",
    payload: {loggedIn: true, token}
  };
};

export const fetchNotLoggedIn = () => {
  return {
    type: "NOT_LOGGED_IN",
    payload: {loggedIn: false}
  };
};

export const fetchLoginSuccess = json => {
  return {
    type: "LOGIN_SUCCESS",
    payload: { loggedIn: true, json }
  };
};

export const fetchLoginFailure = error => {
  return {
    type: "LOGIN_FAILURE",
    payload: { error }
  };
};

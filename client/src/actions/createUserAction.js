export function checkEmail(email) {
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  };

  return dispatch => {
    return fetch("/check-email", settings)
      .then(res => res.json())
      .then(json => {
        return json;
      })
  };
}

export function checkUsername(username) {
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username })
  };

  return dispatch => {
    return fetch("/check-username", settings)
      .then(res => res.json())
      .then(json => {
        return json;
      })
  };
}

export function checkGroupName(groupName) {
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ groupName })
  };

  return dispatch => {
    return fetch("/check-group-name", settings)
      .then(res => res.json())
      .then(json => {
        return json;
      })
  };
}

export function createUser(user) {
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user })
  };

  return dispatch => {
    console.log(user);
    return fetch("/signup", settings).then(res => {
      if (res.status === 403) {
        dispatch(fetchNotLoggedIn());
      } else {
        dispatch(fetchLoggedIn(user));
      }
    });
  };
}

export const fetchNotLoggedIn = () => {
  return {
    type: "NOT_LOGGED_IN",
    payload: { loggedIn: false }
  };
};

export const fetchLoggedIn = user => {
  return {
    type: "LOGGED_IN",
    payload: { loggedIn: true, user }
  };
};

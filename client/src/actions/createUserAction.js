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
};

export const fetchNotLoggedIn = () => {
  return {
    type: "NOT_LOGGED_IN",
    payload: {loggedIn: false}
  };
};

export const fetchLoggedIn = (token) => {
  return {
    type: "LOGGED_IN",
    payload: {loggedIn: true, token}
  };
};

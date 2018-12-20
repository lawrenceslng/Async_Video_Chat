export function createUser(token) {
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ token })
  };

  return dispatch => {
    console.log(token);
    // return fetch("/check-login", settings).then(res => {
    //   if (res.status === 403) {
    //     dispatch(fetchNotLoggedIn());
    //   } else {
    //     dispatch(fetchLoggedIn(token));
    //   }
    // });
  };
};

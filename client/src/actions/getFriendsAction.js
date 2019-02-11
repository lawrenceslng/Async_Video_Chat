export function getFriends(token) {
    console.log(token);
    const settings = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    return dispatch => {
        fetch("/friends", settings)
        .then(res => res.json())
        .then(rj => {
          for (var i = 0; i < rj.length; i++) {
            rj[i].value = rj[i].id;
            rj[i].label = rj[i].username;
          }
          dispatch(fetchFriends({friends: rj}));
        })
        .catch(error => dispatch(fetchFriendsFailure(error)));
    }
}
  
export const fetchFriends = (friends) => {
    return {
      type: "FRIENDS_FETCHED",
      payload: {friends}
    };
  };
  
  export const fetchFriendsFailure = error => {
    return {
      type: "FRIENDS_FETCH_FAILURE",
      payload: { error }
    };
  };
  
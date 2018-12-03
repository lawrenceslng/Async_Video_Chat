import React from "react";

export const _xhr = (url, data, token, callback) => {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      callback(request.responseText);
    }
  };
  request.open("POST", url);
  request.setRequestHeader("x-access-token", token);

  var formData = new FormData();
  formData.append("video_file", data);

  request.send(formData);
};

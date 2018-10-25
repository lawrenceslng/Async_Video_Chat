import React from 'react'

export const _xhr = (url, data, callback) => {
console.log("start_xhr")
console.log(url)
    var request = new XMLHttpRequest();
    console.log(data);
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            callback(request.responseText);
        }
    };
    request.open('POST', url);
    var formData = new FormData();
    formData.append('file', data);
    request.send(formData);
}

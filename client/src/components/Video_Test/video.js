import React from 'react'

export const _xhr = (url, data, token, callback) => {
console.log("start_xhr")
console.log(url)
    var request = new XMLHttpRequest();
    console.log(data);
    // debugger;
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            callback(request.responseText);
        }
    };
    request.open('POST', url);
    request.setRequestHeader("x-access-token", token);
    var formData = new FormData();
    formData.append('video_file', data);
    // formData.append('users', data2);
    // request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // var name = "fname=Henry&lname=Ford";
    // for (var pair of formData.entries()) {
    //     console.log(pair[0]+ ', ' + pair[1]); 
    // }
    // debugger;
    // fetch(url, {
    //     method: 'POST',
    //     body: formData
    // })
    // .then(response => response.json())
    // .catch(error => console.error('Error:', error))
    // .then(response => console.log('Success:', JSON.stringify(response)));
    request.send(formData);
}

import React from 'react';
import AWS from 'aws-sdk';

const uuidv4 = require('uuid/v4');

export const _xhr = (url, data, token, vidName, callback) => {

    console.log("start_xhr");
    console.log(url);
    var request = new XMLHttpRequest();
    console.log(data);
    console.log("video upload to s3 starts here");
    addVideo(data, vidName);
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


//aws sdk add photo function

function addVideo(video, videoName) {
    //aws sdk code
    console.log("inside addVideo function");
    var albumBucketName = 'thought-parcel-2';
    var bucketRegion = 'us-west-2';
    var IdentityPoolId = 'us-west-2:64a72f45-1534-4423-9d16-2989c746c1e3';

    AWS.config.update({
        region: bucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: IdentityPoolId
        })
    });

    var s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: {Bucket: albumBucketName}
    });
    
    ////////////////////////////////
    // var files = document.getElementById('photoupload').files;
    // if (!files.length) {
    //   return alert('Please choose a file to upload first.');
    // }
    var file = video;
    // var fileName = file.name;
    // var albumPhotosKey = encodeURIComponent(albumName) + '//';
    // console.log("line 69: " + uuidv4());
    var videoKey = videoName + '.webm';
    console.log("before s3 upload");
    s3.upload({
      Key: videoKey,
      Body: file,
      ACL: 'public-read',
      ContentType: 'video/webm',
      ContentEncoding: 'utf-8'
    }, function(err, data) {
      if (err) {
        return alert('There was an error uploading your video: ', err.message);
      }
      alert('Successfully uploaded video.');
    //   viewAlbum(albumName);
    });
}
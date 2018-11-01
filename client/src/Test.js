// import React, { Component } from 'react';
// // import Header from './components/header';
// // import Footer from './components/footer';
// // import Carousel from './components/carousel';
// // import LoginForm from './components/loginForm';
// // import PWMatch from './components/accountCreate';
// // import AdminPanel from './components/adminPanel';
// // import recordJS from './components/record';
// import Record from './components/Video_Test/videoComp';
// import Friends from './components/User_Friends/Friends';
// // import Active_Thoughts from './components/Thought_Archives/active';
// import Archived_Thoughts from './components/Thought_Archives/archive';
// import './App.css';
//
// class Test extends Component {
//   // pass in initial states
//   constructor(){
//    super();
// //    this.state = {
//
// //     };
//   };
//
// //   componentDidMount(){
// //     // fetching DOM references
// //     var btnStartRecording = document.querySelector('#btn-start-recording');
// //     var btnStopRecording  = document.querySelector('#btn-stop-recording');
//
// //     var videoElement = document.querySelector('video');
//
// //     var progressBar = document.querySelector('#progress-bar');
// //     var percentage = document.querySelector('#percentage');
//
// //     var recorder;
// //   }
//
//
// //     // reusable helpers
//
// //     // this function submits recorded blob to nodejs server
// //     postFiles() {
// //         var blob = recorder.getBlob();
//
// //         // getting unique identifier for the file name
// //         var fileName = generateRandomString() + '.webm';
//
// //         var file = new File([blob], fileName, {
// //             type: 'video/webm'
// //         });
//
// //         videoElement.src = '';
// //         videoElement.poster = '/ajax-loader.gif';
//
// //         xhr('/uploadFile', file, function(responseText) {
// //             var fileURL = JSON.parse(responseText).fileURL;
//
// //             console.info('fileURL', fileURL);
// //             videoElement.src = fileURL;
// //             videoElement.play();
// //             videoElement.muted = false;
// //             videoElement.controls = true;
//
// //             document.querySelector('#footer-h2').innerHTML = '<a href="' + videoElement.src + '">' + videoElement.src + '</a>';
// //         });
//
// //         if(mediaStream) mediaStream.stop();
// //     }
//
// //     // XHR2/FormData
// //    xhr(url, data, callback) {
// //         var request = new XMLHttpRequest();
// //         request.onreadystatechange = function() {
// //             if (request.readyState == 4 && request.status == 200) {
// //                 callback(request.responseText);
// //             }
// //         };
//
// //         request.upload.onprogress = function(event) {
// //             progressBar.max = event.total;
// //             progressBar.value = event.loaded;
// //             progressBar.innerHTML = 'Upload Progress ' + Math.round(event.loaded / event.total * 100) + "%";
// //         };
//
// //         request.upload.onload = function() {
// //             percentage.style.display = 'none';
// //             progressBar.style.display = 'none';
// //         };
// //         request.open('POST', url);
//
// //         var formData = new FormData();
// //         formData.append('file', data);
// //         request.send(formData);
// //     }
//
// //     // generating random string
// //     generateRandomString() {
// //         if (window.crypto) {
// //             var a = window.crypto.getRandomValues(new Uint32Array(3)),
// //                 token = '';
// //             for (var i = 0, l = a.length; i < l; i++) token += a[i].toString(36);
// //             return token;
// //         } else {
// //             return (Math.random() * new Date().getTime()).toString(36).replace( /\./g , '');
// //         }
// //     }
//
// //     // reusable getUserMedia
// //     captureUserMedia(success_callback) {
// //         var session = {
// //             audio: true,
// //             video: true
// //         };
//
// //         navigator.getUserMedia(session, success_callback, function(error) {
// //             alert('Unable to capture your camera. Please check console logs.');
// //             console.error(error);
// //         });
// //     }
//
// //     // UI events handling
// //     btnStartRecording = (e) => {
// //         e.preventDefault();
// //         btnStartRecording.disabled = true;
// //         let mediaStream;
// //         captureUserMedia(function(stream) {
// //             mediaStream = stream;
//
// //             videoElement.src = window.URL.createObjectURL(stream);
// //             videoElement.play();
// //             videoElement.muted = true;
// //             videoElement.controls = false;
//
// //             recorder = RecordRTC(stream, {
// //                 type: 'video'
// //             });
//
// //             recorder.startRecording();
//
// //             // enable stop-recording button
// //             btnStopRecording.disabled = false;
// //         });
// //     };
//
//
// //     btnStopRecording = (e) => {
// //         e.preventDefault();
// //         btnStartRecording.disabled = false;
// //         btnStopRecording.disabled = true;
//
// //         recorder.stopRecording(postFiles);
// //     };
//
// //     componentDidMount(){
// //         startRecording.disabled = false;
// //     };
//
//
//   render() {
//     return(
//         // <div className="app">
//         // <h1>RecordRTC to Node.js</h1>
//         // <p>
//         //     <video></video>
//         // </p><hr />
//
//         // <div>
//         //     <label id="percentage">0%</label>
//         //     {/* <progress id="progress-bar" value=0></progress><br /> */}
//         // </div>
//
//         // <hr />
//
//         // <div>
//         //     <button id="btn btn-primary btn-start-recording" onClick={this.btnStartRecording}>Start Recording</button>
//         //     <button id="btn btn-danger btn-stop-recording" onClick={this.btnStopRecording} disabled="">Stop Recording</button>
//         // </div>
//         // <script src="/node_modules/recordrtc/RecordRTC.js"> </script>
//         // </div>
//         <Active_Thoughts />
//         // <Archived_Thoughts />
//         // <Record />
//         // <Friends />
//     );
//   }
// }
//
// export default Test;

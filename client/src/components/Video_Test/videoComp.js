import React, { Component } from 'react';
import RecordRTC from 'recordrtc';
import {_xhr} from './video'
import axios from "axios";

export default class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: null,
      url:'',
      videoRecorder:'',
      isRecording: false,
      isUploading: false,
      isPreview: false,
      isDone: false,
      pausing: false,
    }
}

// UI events handling
    btnStartRecording = (e) => {
    // debugger;
        let classThis = this;
        console.log(this.state.stream);
        console.log(this.state.isRecording);
        e.preventDefault();
        let session = {
            audio: true,
            video: true
        }; 
        navigator.mediaDevices.getUserMedia(session)
        .then(function(mediaStream) {
            var video = document.querySelector('video');
            if (typeof video.srcObject == "object") {
                video.srcObject = mediaStream;
              } else {
                video.src = URL.createObjectURL(mediaStream);
              }
            console.log('mediaStream Line 80 = ' + mediaStream);
            video.play();

                const videoRecorder = RecordRTC(mediaStream, {
                    type: 'video',
                    video: {
                        width: 640,
                        height: 480
                    },
                    canvas: {
                        width: 640,
                        height: 480
                    }
                })
                console.log(videoRecorder);
                videoRecorder.startRecording();
                classThis.setState({
                    stream: mediaStream,
                    videoRecorder: videoRecorder,
                    isRecording: true,
                });
                console.log(classThis.state.stream);
                console.log(videoRecorder);
                console.log(video.src);
                console.log(video.poster);
        })
        .catch(function(err) { console.log(err.name + ": " + err.message); });
    };

    btnStopRecording = (e) => {
        e.preventDefault();
        let classThis = this;
        console.log("clicked");
        classThis.state.videoRecorder.stopRecording(function() {
            // var recordedBlob = classThis.state.videoRecorder.blob; // blob property
        
            var recorderBlob = classThis.state.videoRecorder.getBlob(); // getBlob method
            // console.log(recordedBlob);
            console.log(recorderBlob);
            // console.log(classThis.state.stream)
            if(classThis.state.stream) classThis.state.stream.stop();
            var fileName = 'test_vid.webm';
                
            var file = new File([recorderBlob], fileName, {
                type: 'video/webm'
            });
            _xhr('http://localhost:3001/uploadFile', file, function(responseText) {
                var fileURL = JSON.parse(responseText).fileURL;

                console.info('fileURL', fileURL);
                var id = fileURL.substring(30);
                // debugger;
                // fetch(`http://localhost:3001/uploads/${id}`).then(res => re);
                console.log("after fetch");
                classThis.setState({
                    stream: null,
                    videoRecorder: '',
                    isRecording: false,
                    src: fileURL
                });
                // document.querySelector('video').src = fileURL;
                document.querySelector('video').play();
                document.querySelector('video').muted = false;
                document.querySelector('video').controls = true;

                // document.querySelector('#footer-h2').innerHTML = '<a href="' + videoElement.src + '">' + videoElement.src + '</a>';
            });
            console.log(document.querySelector('video'));
            console.log(classThis.state.stream);
        })
        
    };
    btnGetVideo = () => {
        var id = this.state.src;
        return fetch(id).then(this.setState({isRecording: false}));
    }
    render(){
        return (    
            <div>
            <div>
            <h1>RecordRTC to Node.js</h1>
            <p>
                <video width="500" height="281" controls>
                <source src={this.state.src} type='video/webm'/>
                </video>
            </p><hr />

            <hr />

            <div>
                <button id="btn-start-recording" onClick={this.btnStartRecording}>Start Recording</button>
                <button id="btn-stop-recording" onClick={this.btnStopRecording}>Stop Recording</button>
                <button id="btn-get-video" onClick={this.btnGetVideo}>Get Video</button>
            </div>
            </div>
            </div>
        )
    }
}
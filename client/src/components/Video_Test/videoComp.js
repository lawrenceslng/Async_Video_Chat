import React, { Component } from 'react';
import RecordRTC from 'recordrtc'
// import Video from './video'

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



//   uploadFile(){
//     this.setState({
//       pausing:  false,
//       isRecording: false,
//       isUploading:  1,
//       isPreview: false,
//     });

//     this.state.videoRecorder.getDataURL((data) => {

//       var uploadData = {
//         // fileName: id,
//         file: data,
//         isBase64: true,
//         streams: 'dynamic',
//         chunkSize: 'dynamic',
//       }

//       var uploadInstance = Video.insert(uploadData, false);

//       uploadInstance.on('progress', (progress, file) => {
//         this.setState({
//           isUploading:  progress,
//         });
//       });

//       uploadInstance.on('end', (error, fileObj) => {
//         if (error) {
//           console.log('Error during upload: ' + error.reason);
//         } else {
//           console.log(fileObj.meta._id, fileObj.meta.try)
//           this.setState({
//             id: fileObj._id,
//             isDone: true
//           });
//         }
//       });
//       uploadInstance.start()
//     })
//   }



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
            video.srcObject = mediaStream;

            video.onloadedmetadata = function(e) {
                // debugger;
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
                videoRecorder.startRecording();
                classThis.setState({
                    stream: mediaStream,
                    videoRecorder: videoRecorder,
                    isRecording: true,
                });
                console.log(classThis.state.stream);
                console.log(videoRecorder);
            };
        })
        .catch(function(err) { console.log(err.name + ": " + err.message); });
    };

    btnStopRecording = (e) => {
        e.preventDefault();
        let classThis = this;
        console.log("clicked");
        classThis.state.videoRecorder.stopRecording();
    // var video = document.querySelector('video');
    // video.srcObject = classThis.state.stream;
        console.log(classThis.state.stream)
        if(classThis.state.stream) classThis.state.stream.stop();
    // video.onloadedmetadata = function(e) {
    //     // debugger;
    //     video.play();

    //     console.log(classThis.state.stream);
    // };
    };
    render(){
        return (    
            <div>
            <div>
            <h1>RecordRTC to Node.js</h1>
            <p>
                <video></video> 
            </p><hr />

            <hr />

            <div>
                <button id="btn-start-recording" onClick={this.btnStartRecording}>Start Recording</button>
                <button id="btn-stop-recording" onClick={this.btnStopRecording}>Stop Recording</button>
            </div>
            </div>
            </div>
        )
    }
}

import React, { Component } from "react";
import RecordRTC from "recordrtc";
import ReactPlayer from "react-player";
import Select from "react-select";
import { _xhr } from "./XHR";
import "./CreateThought.css";


export default class CreateThought extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: null,
      url: "",
      videoRecorder: "",
      isRecording: false,
      isUploading: false,
      isPreview: false,
      isDone: false,
      pausing: false,
      btnStatus: "btn-start-recording",
      btnText: "Start Recording",
      counter: 0,
      friends: [{ id: 0, username: "l" }],
      selectedOption: [],
      isComplete: false
    };
  }
  tick() {
    this.setState(prevState => ({
      counter: prevState.counter + 1
    }));
  }
  // UI events handling
  //start a counter and have a recording animation during this
  btnStartRecording = e => {
    // debugger;
    let classThis = this;
    // console.log(this.state.stream);
    // console.log(this.state.isRecording);
    e.preventDefault();
    // let session = {
    //     audio: true,
    //     video: true
    // };
    // navigator.mediaDevices.getUserMedia(session)
    // .then(function(mediaStream) {
    var video = document.querySelector("video");
    // if (typeof video.srcObject == "object") {
    //     video.srcObject = mediaStream;
    //   } else {
    //     video.src = URL.createObjectURL(mediaStream);
    //   }
    // console.log('mediaStream Line 80 = ' + mediaStream);
    // video.play();

    const videoRecorder = RecordRTC(video.camera, {
      type: "video",
      video: {
        width: 640,
        height: 480
      },
      canvas: {
        width: 640,
        height: 480
      }
    });
    console.log(videoRecorder);
    videoRecorder.startRecording();
    this.interval = setInterval(() => classThis.tick(), 1000);

    classThis.setState({
      stream: video.camera,
      videoRecorder: videoRecorder,
      isRecording: true,
      btnStatus: "btn-stop-recording",
      btnText: "Stop Recording"
    });
    console.log(classThis.state.stream);
    console.log(videoRecorder);
    // console.log(video.src);
    console.log(video.poster);
    // })
    // .catch(function(err) { console.log(err.name + ": " + err.message); });
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  btnStopRecording = e => {
    e.preventDefault();
    //also MUST have recipients for videos else errors out
    // this.setState({ selectedOption: 'test' });
    // alert(`Option selected:`, this.state.selectedOption);
    console.log(this.state.selectedOption.length);
    var token = this.props.token();
    let users = [];
    for (var i = 0; i < this.state.selectedOption.length; i++) {
      console.log(this.state.selectedOption[i].id);
      users.push(this.state.selectedOption[i].id);
    }
    // debugger;
    let classThis = this;
    console.log("clicked");
    clearInterval(this.interval);
    classThis.state.videoRecorder.stopRecording(function() {
      // var recordedBlob = classThis.state.videoRecorder.blob; // blob property

      var recorderBlob = classThis.state.videoRecorder.getBlob(); // getBlob method
      // console.log(recordedBlob);
      console.log(recorderBlob);
      // console.log(classThis.state.stream)
      if (classThis.state.stream) classThis.state.stream.stop();
      var fileName = "test_vid.webm";

      var file = new File([recorderBlob], fileName, {
        type: "video/webm"
      });
      // debugger;
      console.log(users);
      // let users = classThis.state.selectedOption;
      console.log("line 86 file name before request: " + fileName);
      _xhr("/uploadFile", file, token, function(responseText) {
        var fileURL = JSON.parse(responseText).fileURL;
        console.info("fileURL", fileURL);
        var id = fileURL.substring(30);

        // let creator = token; //creator will get ID number from localStorage after issue of jsonwebtoken
        let title = document.querySelector('[id="title-input"]').value;
        console.log(title);
        let content = document.querySelector('[id="description-input"]').value;
        console.log(title);
        console.log(content);
        console.log("after fetch");

        classThis.setState({
          stream: null,
          videoRecorder: "",
          isRecording: false,
          isDone: true,
          src: fileURL,
          btnStatus: "btn-start-recording",
          btnText: "Start Recording"
        });

        return fetch("/uploadFile2", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ token, title, content, id, users })
        })
          .then(res => res.json())
          .then(rj => {
            console.log(rj);
            // debugger;
            if (rj.success) {
              //   this.setState({loggedIn: true});
              console.log("everything is a success");
              classThis.setState({
                isComplete: true
              });
            } else {
              //   this.setState({loggedIn: false});
              console.log("everything IS NOT a success");
            }
          });
      });
    });
  };

  getFriends = () => {
    var token = this.props.token();
    return fetch("/friends", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-access-token": token
      }
    })
      .then(res => res.json())
      .then(rj => {
        console.log(rj);
        for (var i = 0; i < rj.length; i++) {
          rj[i].value = rj[i].id;
          rj[i].label = rj[i].username;
        }
        this.setState({ friends: rj });
      });
  };
  componentDidMount() {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true
      })
      .then(function(camera) {
        document.querySelector("video").muted = true;
        document.querySelector("video").srcObject = camera;
        document.querySelector("video").camera = camera;
        document.querySelector("video").play();
      });
    this.getFriends();
  }

  render() {
    let recordCamera;
    let recordButton;

    if (this.state.src) {
      recordCamera = (
        <div>
          <ReactPlayer url={this.state.src} playing controls />
        </div>
      );
    } else {
      recordCamera = (
        <div>
          <video id="record-camera">
            <source src={this.state.src} type="video/webm" />
          </video>
        </div>
      );
    }
    if (this.state.btnStatus === "btn-start-recording") {
      recordButton = (
        <button id={this.state.btnStatus} onClick={this.btnStartRecording}>
          {this.state.btnText}
        </button>
      );
    } else {
      recordButton = (
        <button id={this.state.btnStatus} onClick={this.btnStopRecording}>
          {this.state.btnText}
        </button>
      );
    }
    if (this.state.friends.length === 0) {
      //debugger
    }

    return (
      <div>
        <div className="create-thought">
          <h1>Share your thoughts.</h1>

          <form id="input-form">
            <input id="title-input" placeholder="Add Title For Thought" />
            <br />
            <textarea id="description-input" type="text" placeholder="Add Description For Thought"></textarea>
            {this.state.friends.length > 0 && (
                <Select
                  id="select-input"
                  isMulti
                  options={this.state.friends}
                  value={this.state.selectedOption}
                  onChange={this.handleChange}
                  placeholder="Select friends to share the video. Otherwise, only you can see it."
                />
            )}
          </form>

          {recordCamera}
          {recordButton}
          <hr />
          {this.state.isDone && <button>Click to Go to Next Page</button>}
        </div>
      </div>
    );
  }
}

// {/* friend list with check boxes; need a getFriends function*/}
// <div id="friendSelect">
//   {/* this does not work  */}
//   {this.state.friends.length == 0 && <button>Add a Friend Yo</button>}
//
//   {/* <button id="btn-stop-recording" onClick={this.btnStopRecording}>Stop Recording</button>  */}
//   {this.state.isDone && <button>Click to Go to Next Page</button>}
//   {/* {this.state.friends.length > 0 && this.state.friends.map((x) => <Select id = {x.id} option = {x.username} value={x.username}/>)} */}
// </div>

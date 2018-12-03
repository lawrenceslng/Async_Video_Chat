import React, { Component } from "react";
import RecordRTC from "recordrtc";
import ReactPlayer from "react-player";
import { _xhr, _addVideo } from "./XHR";
const uuidv4 = require('uuid/v4');
export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnText: "Start Recording",
      isCompleted: false,
      isRecording: false,
      hideError: true,
      setIntervalId: -1,
      src: "",
      stream: null,
      videoRecorder: null
    };

    this.recordButton = React.createRef();

    this.btnStartRecording = this.btnStartRecording.bind(this);
    this.btnStopRecording = this.btnStopRecording.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true
      })
      .then(camera => {
        document.querySelector("video").muted = true;
        document.querySelector("video").srcObject = camera;
        document.querySelector("video").camera = camera;
        document.querySelector("video").play();
      })
      .then(() => {
        this.setState({
          stream: document.querySelector("video").camera,
          videoRecorder: RecordRTC(document.querySelector("video").camera, {
            type: "video",
            video: {
              width: 640,
              height: 480
            },
            canvas: {
              width: 640,
              height: 480
            }
          })
        });
      });
  }

  btnStartRecording = e => {
    e.preventDefault();

    var intervalId = setInterval(() => {
      this.switch = !this.switch;
      return this.switch
        ? (this.recordButton.current.style.backgroundColor = "red")
        : (this.recordButton.current.style.backgroundColor = "white");
    }, 500);

    this.setState({
      btnText: "Stop Recording",
      isRecording: true,
      setIntervalId: intervalId,
    }, () => {
        this.state.videoRecorder.startRecording();
      }
    );
  };

  btnStopRecording = (e, title, description, friends) => {
    e.preventDefault();

    clearInterval(this.state.setIntervalId);
    this.recordButton.current.style.backgroundColor = "white";

    var token = this.props.token();
    let users = [];

    for (var i = 0; i < friends; i++) {
      users.push(friends.id);
    }

    this.state.videoRecorder.stopRecording(url => {
      var recorderBlob = this.state.videoRecorder.getBlob();

      if (this.state.stream)
        this.state.stream.stop();

      var file = new File([recorderBlob], "test_vid.webm", {
        type: "video/webm"
      });
      let vidName = uuidv4();
      _addVideo(file, vidName, () => {
        // var fileURL = JSON.parse(responseText).fileURL;
        // var id = fileURL.substring(30);
        var id = vidName + '.webm';
        this.setState({
          btnText: "Start Recording",
          isDone: true,
          isRecording: false,
          setIntervalId: -1,
          src: 'https://s3-us-west-2.amazonaws.com/thought-parcel-2/'+id,
        });

        return fetch("/uploadFile2", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({token, title, description, id, users})
        })
          .then(res => res.json())
          .then(rj => {
            this.setState({isCompleted: rj.success});
          });
      });
    });
  };

  onClick = e => {
    var title = this.props.titleInput;
    var description = this.props.descriptionInput;
    var friends = this.props.selectedOption;

    if (!this.state.isCompleted) {
      if (this.state.isRecording) {
        this.btnStopRecording(e, title, description, friends);
      } else {
        if (title !== "" && description !== "" && friends.length !== 0) {
          this.setState({hideError: true});
          this.btnStartRecording(e);
        } else {
          this.setState({ hideError: false });
        }
      }
    } else alert("Already created a thought.");
  };

  render() {
    return (
      <div>
        {this.state.src ? (
          <ReactPlayer
            id="video-playback"
            url={this.state.src}
            width="100%"
            height="100%"
            playing
            controls
          />
        ) : (
          <video id="record-camera">
            <source src={this.state.src} type="video/webm" />
          </video>
        )}
        <button
          id="record-button"
          ref={this.recordButton}
          onClick={this.onClick}
        >
          {this.state.btnText}
        </button>
        <h5 className={this.state.hideError ? "hidden" : ""} id="error-text">
          Please fill out all entries before starting the recording.
        </h5>
      </div>
    );
  }
}

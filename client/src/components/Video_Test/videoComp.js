import React, { Component } from 'react';
import RecordRTC from 'recordrtc';
import {_xhr} from './video'
// import axios from "axios";
import ReactPlayer from 'react-player';
import Select from 'react-select';

const options = [
    { value: 'id1', label: 'lasdf' },
    { value: 'id2', label: 'asdfasdf' },
    { value: 'id3', label: 'qwerqwera' }
  ]
  
  const MyComponent = () => (
    <Select options={options} />
  )
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
            btnStatus: 'btn-start-recording',
            btnText: 'Start Recording',
            counter: 0,
            friends: [{id: 0, username: 'l'}],
            selectedOption : [],
            isComplete: false
        }
    }
    tick(){
            this.setState(prevState => ({
              counter: prevState.counter + 1
            }));

    }
// UI events handling
//start a counter and have a recording animation during this
    btnStartRecording = (e) => {
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
            var video = document.querySelector('video');
            // if (typeof video.srcObject == "object") {
            //     video.srcObject = mediaStream;
            //   } else {
            //     video.src = URL.createObjectURL(mediaStream);
            //   }
            // console.log('mediaStream Line 80 = ' + mediaStream);
            // video.play();

                const videoRecorder = RecordRTC(video.camera, {
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
                this.interval = setInterval(() => classThis.tick(), 1000);

                classThis.setState({
                    stream: video.camera,
                    videoRecorder: videoRecorder,
                    isRecording: true,
                    btnStatus: 'btn-stop-recording',
                    btnText: 'Stop Recording'
                });
                console.log(classThis.state.stream);
                console.log(videoRecorder);
                // console.log(video.src);
                console.log(video.poster);
        // })
        // .catch(function(err) { console.log(err.name + ": " + err.message); });
    };

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
      }

    btnStopRecording = (e) => {
        e.preventDefault();
        //also MUST have recipients for videos else errors out
        // this.setState({ selectedOption: 'test' });
        // alert(`Option selected:`, this.state.selectedOption);
        console.log(this.state.selectedOption.length);
        let users = [];
        for(var i = 0; i < this.state.selectedOption.length; i++)
        {
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
            if(classThis.state.stream) classThis.state.stream.stop();
            var fileName = 'test_vid.webm';
                
            var file = new File([recorderBlob], fileName, {
                type: 'video/webm'
            });
            // debugger;
            console.log(users);
            // let users = classThis.state.selectedOption;
            console.log('line 86 file name before request: ' + fileName);
            _xhr('http://localhost:3001/uploadFile', file, function(responseText) {
                var fileURL = JSON.parse(responseText).fileURL;
                console.info('fileURL', fileURL);
                var id = fileURL.substring(30);
                let creator = 1;
                let title = 'test1';
                let content ='no content';
                // debugger;
                // return fetch('http://localhost:3001/uploadFile2', {
                //     method: "POST", // *GET, POST, PUT, DELETE, etc.
                //     mode: "no-cors", // no-cors, cors, *same-origin
                //     headers: {
                //         'Accept': 'application/json',
                //         "Content-Type": "application/json; charset=utf-8",
                //         // "Content-Type": "application/x-www-form-urlencoded",
                //     },
                //     body: JSON.stringify(creator), // body data type must match "Content-Type" header
                // }).then((res) => {res.json();
                console.log(creator);
                console.log(title);
                console.log(content);
                // fetch('http://localhost:3001/uploadFile2/'+creator, {
                //     method: "POST", // *GET, POST, PUT, DELETE, etc.
                //     mode: "no-cors", // no-cors, cors, *same-origin
                //     headers: {
                //         'Accept': 'application/json',
                //         "Content-Type": "application/json; charset=utf-8",
                //         // "Content-Type": "application/x-www-form-urlencoded",
                //     },
                //     body: JSON.stringify({field: 'field1'}), // body data type must match "Content-Type" header
                // }).then((res) => res.json());
                // debugger;
                console.log("after fetch");
                classThis.setState({
                    stream: null,
                    videoRecorder: '',
                    isRecording: false,
                    isDone: true,
                    src: fileURL,
                    btnStatus: 'btn-start-recording',
                    btnText: 'Start Recording'
                });
                // fetch(`http://localhost:3001/uploads/${id}`).then(res => re);
            
                // document.querySelector('video').classList.add('autoplay');
                return fetch("http://localhost:3001/uploadFile2", {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({creator,title,content,id,users})
                  }).then(res => res.json()).then(rj => {
                    console.log(rj);
                    // debugger;
                    if(rj.success)
                    {
                    //   this.setState({loggedIn: true});
                        console.log("everything is a success");
                        classThis.setState({
                            isComplete: true
                        });
                    }
                    else{
                    //   this.setState({loggedIn: false});
                        console.log("everything IS NOT a success");
                    }
                  })
            });
            
        })
        
    };
    btnGetVideo = () => {
        console.log("get Video button clicked");
        var id = this.state.src;
        let classThis = this;
        return fetch(id).then(function(response){
            console.log('after fetch line 118');
            console.log(response);
            classThis.setState({
                src: response.url,
                isRecording: false});
            document.querySelector('video').play();
            document.querySelector('video').muted = false;
            document.querySelector('video').controls = true;
        });
    }
    renameProp = (
        oldProp,
        newProp,
    { [oldProp]: old, ...others }
    ) => ({
        [newProp]: old,
        ...others
    });

    getFriends = () => {
        return fetch('http://localhost:3001/friends', {headers : { 
     'Content-Type': 'application/json',
     'Accept': 'application/json'
    }}).then((res) => res.json()).then(rj => {
        console.log(rj);
        // if(rj.length == 0)
        // {
        //     this.setState({friends: null});
        // }
        // else
        // {
            for(var i = 0; i < rj.length; i++)
            {
            // var neww = this.renameProp('id','value',rj[i]);
            // var newww = this.renameProp('username','label',rj[i]);
                rj[i].value = rj[i].id;
                rj[i].label = rj[i].username;
            // console.log(neww);
            // console.log(newww);
            }
            this.setState({friends: rj});
        // }
   });
 }
    componentDidMount(){
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        }).then(function(camera) {
            document.querySelector('video').muted = true;
            document.querySelector('video').srcObject = camera;
            document.querySelector('video').camera = camera;
            document.querySelector('video').play();
        });
        this.getFriends();
    }
    render(){
        let vid;
        let button;
        let friend;
        let list;
        if(this.state.src)
        {
            vid = 
            <div>
                <ReactPlayer url={this.state.src} playing controls/>
            </div>
        }
        else{
            vid = 
            <div>
                {/* <ReactPlayer url={this.state.src} playing controls/> */}
                <video id="record" width="500" height="281">
                <source src={this.state.src} type='video/webm' />
                </video>
                
            </div>
        }
        if(this.state.btnStatus == 'btn-start-recording')
        {
            button = <button id={this.state.btnStatus} onClick={this.btnStartRecording}>{this.state.btnText}</button>
        }
        else
        {
            button = <button id={this.state.btnStatus} onClick={this.btnStopRecording}>{this.state.btnText}</button>
        }
        if(this.state.friends.length == 0)
        {
            //debugger
        }
        
        if(!this.state.isComplete)
        {
        return (  
              
            <div>
            <div>
                {/* {friend} */}
            <h1>RecordRTC to Node.js</h1>
            {vid}<hr />

            <hr />
            {/* friend list with check boxes; need a getFriends function*/}
            <div>
                {button}
                {/* this does not work  */}
                {this.state.friends.length == 0 && <button>Add a Friend Yo</button>}
                {this.state.friends.length > 0 && <div>If you do not select any friends the thought parcel will only be visible to you
                    <Select isMulti options={this.state.friends} value={this.state.selectedOption} onChange={this.handleChange} /></div>}
                {/* <button id="btn-stop-recording" onClick={this.btnStopRecording}>Stop Recording</button>  */}
                <button id="btn-get-video" onClick={this.btnGetVideo}>Get Video</button>
                <p>{this.state.counter}</p>
                {(this.state.isDone) && <button>Click to Go to Next Page</button>}
                {/* {this.state.friends.length > 0 && this.state.friends.map((x) => <Select id = {x.id} option = {x.username} value={x.username}/>)} */}
            </div>
            </div>
            </div>
            )
        }
        else
        {
            return (
                <div>
                    <h1>This post is complete</h1>
                </div>
            )
        }

    }
}

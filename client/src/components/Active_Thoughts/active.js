import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import RecordRTC from 'recordrtc';
import {_xhr} from '../Video_Test/video'
//this will retrieve all conversations related to this particular user
//hit up conversations, conversation_relation

const initState = {
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
    isComplete: false,
    conversationId: 0,
    thoughts: [],
    currentVidLoc: 0
};

export default class Active_Thoughts extends React.Component {
    constructor(){
        super();
        this.state = initState;
    };

    tick(){
        this.setState(prevState => ({
          counter: prevState.counter + 1
        }));
    };
    reset() {
        this.setState(initState);
    };
    //add button to archive conversation if you are the creator
    populate = (e) => {
        e.preventDefault();
        this.reset();
        let convId = e.target.getAttribute('data-conversation_id');
        let title = e.target.getAttribute('data-title');
        let content = e.target.getAttribute('data-content');
        let creator = e.target.getAttribute('data-creator');
        let filepath = e.target.getAttribute('data-filepath');
        console.log(filepath);
        fetch("http://localhost:3001/relevant_thoughts/"+convId).then(res => res.json()).then(RESJ => {
            // console.log('43: ' + RESJ[0].fs_path);
            if(RESJ.length == 0)
            {
                this.getVideo(filepath);
                this.setState({
                    modalId: convId,
                    title: title,
                    content: content,
                    creator: creator,
                    filepath: filepath,
                    originalFilepath: filepath,
                    src: 'http://localhost:3001/uploads/'+filepath,
                    conversationId: convId,
                    currentVidLoc: 0
                });
            }
            else{
                for(var i = 0; i < RESJ.length; i++)
            {
                console.log(RESJ[i].fs_path);
                this.setState(prevState => ({
                    thoughts: [...prevState.thoughts, RESJ[i].fs_path]
                  }));
                // this.state.thoughts.push(RESJ[i].fs_path);
            }
            this.getVideo(this.state.thoughts[this.state.thoughts.length-1]);
            this.setState({
                modalId: convId,
                title: title,
                content: content,
                creator: creator,
                filepath: this.state.thoughts[this.state.thoughts.length-1],
                originalFilepath: filepath,
                src: 'http://localhost:3001/uploads/'+this.state.thoughts[this.state.thoughts.length-1],
                conversationId: convId,
                currentVidLoc: this.state.thoughts.length-1
            });
            } 
        });
        // this.getVideo(filepath);
        // this.setState({
        //     modalId: convId,
        //     title: title,
        //     content: content,
        //     creator: creator,
        //     filepath: filepath,
        //     src: 'http://localhost:3001/uploads/'+filepath,
        //     conversationId: convId
        // });
        console.log('54: ' + filepath);
        console.log('55: ' + this.state.filepath);
    };

    archive = (e) => {
        e.preventDefault();
        let classThis = this;
        //get conversation id from HTML
        let convId = e.target.parentElement.parentElement.children[0].childNodes[0].innerHTML;
        console.log(this.state.conversationId);
        // debugger;
        console.log("LINE 43: " + convId);
        // go to server with conversation ID and hit up archive route
        return fetch("http://localhost:3001/archive/" + convId, 
            {method: 'POST',
            headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
            }})
        .then(res => res.json()).then(resultingJSON => {
            console.log(resultingJSON);
            console.log("after archive");
            classThis.componentDidMount();
        });
    };

    getVideo = (id) => {
        console.log("get Video function");
        //hit upload/:id where :id is filename
        var id = id;
        console.log(id);
        let classThis = this;
        return fetch(id).then(function(response){
            console.log('after fetch line 87');
            console.log(response);
            document.querySelector('video').play();
            document.querySelector('video').muted = false;
            document.querySelector('video').controls = true;
        });
    };
    reply = (e) => {
        e.preventDefault();
        // alert("this is a reply button");
        //I know the conversation ID, all I have to do is have a recordRTC session and on stop record, post this video
        this.setState({isRecording: true});
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        }).then(function(camera) {
            
            document.querySelector('video').muted = true;
            document.querySelector('video').srcObject = camera;
            document.querySelector('video').camera = camera;
            document.querySelector('video').play();
        });
        //have recordRTC replace modal body, modal footer replaced by record/stop record
    };
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

    btnStopRecording = (e) => {
            e.preventDefault();
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
                // console.log(users);
                // let users = classThis.state.selectedOption;
                console.log('line 86 file name before request: ' + fileName);
                _xhr('http://localhost:3001/uploadFile', file, function(responseText) {
                    var fileURL = JSON.parse(responseText).fileURL;
                    console.info('fileURL', fileURL);
                    var id = fileURL.substring(30);
                    let user_id = 1; //user_id will get ID number from localStorage after issue of jsonwebtoken
                    let content = "no content";
                    let conv_id = classThis.state.conversationId;
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
                    return fetch("http://localhost:3001/conversation_reply", {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({user_id,content,conv_id,id})
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

    //this.state.thoughts will store all filepaths of the thoughts in that conv_id, and next and prev will select which item is active
    previousVid = (e) => {
        e.preventDefault();
        console.log(this.state.currentVidLoc);
        if(this.state.currentVidLoc > 0){
            let newVidLoc = this.state.currentVidLoc - 1;
            this.getVideo(this.state.thoughts[newVidLoc]);
            this.setState({
                filepath: this.state.thoughts[newVidLoc],
                src: 'http://localhost:3001/uploads/'+this.state.thoughts[newVidLoc],
                currentVidLoc: newVidLoc
            });
        }
        else{
            this.getVideo(this.state.originalFilepath);
            this.setState({
                filepath: this.state.originalFilepath,
                src: 'http://localhost:3001/uploads/'+this.state.originalFilepath,
                currentVidLoc: -1
            });
        }
    };

    nextVid = (e) => {
        e.preventDefault();
        console.log(this.state.currentVidLoc);
        if(this.state.currentVidLoc < this.state.thoughts.length-1){
            let newVidLoc = this.state.currentVidLoc + 1;
            this.getVideo(this.state.thoughts[newVidLoc]);
            this.setState({
                filepath: this.state.thoughts[newVidLoc],
                src: 'http://localhost:3001/uploads/'+this.state.thoughts[newVidLoc],
                currentVidLoc: newVidLoc
            });
        }
        // else{
        //     this.getVideo(this.state.originalFilepath);
        //     this.setState({
        //         filepath: this.state.originalFilepath,
        //         src: 'http://localhost:3001/uploads/'+this.state.originalFilepath,
        //         currentVidLoc: -1
        //     });
        // }
    };
        //next up: able to see all videos related to a thought (need to search server for conv_reply as well)
    componentDidMount(){
        return fetch("http://localhost:3001/conversations_active").then(res => res.json()).then(resultingJSON => {
                console.log(resultingJSON);
                this.setState({conversations : resultingJSON})
            });
    };
    
 
    render(){
        let button;
        if(this.state.btnStatus == 'btn-start-recording')
        {
            button = <button id={this.state.btnStatus} onClick={this.btnStartRecording}>{this.state.btnText}</button>
        }
        else
        {
            button = <button id={this.state.btnStatus} onClick={this.btnStopRecording}>{this.state.btnText}</button>
        }
        return (
            <div>
                <h1>these are my active conversations</h1>
                <button id='2' onClick={this.populate}>Test</button>
                {(this.state.conversations) && this.state.conversations.map((x) => <div className='thoughtBox' id={x.id} key={x.id}data-toggle="modal" data-target="#myModal" onClick={this.populate} data-conversation_id={x.id} data-creator={x.user_one_id} data-title={x.title} data-content={x.content}data-filepath={x.fs_path}>Conversation-id={x.id}...creator={x.user_one_id}.......title={x.title}.......content={x.content}......filepath={x.fs_path}</div>)}
                {/* when user clicks on a button, opens up a modal where the last video message in that conversation resides and buttons that say exit/reply/close */}
                {/* <!-- The Modal --> */}
                    <div className="modal" id="myModal">
                        <div className="modal-dialog">
                          <div className="modal-content">

                            {/* <!-- Modal Header --> */}
                            <div className="modal-header">
                              <h4 className="modal-title">{this.state.modalId}</h4>
                              <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>

                            {/* <!-- Modal body --> */}
                            <div className="modal-body">
                                {this.state.filepath}
                                {(!this.state.isRecording) && <div>
                                <ReactPlayer url={this.state.src} playing controls/><button onClick={this.previousVid}>Prev</button><button onClick={this.nextVid}>Next</button></div>}
                                {(this.state.isRecording) && <div>
                                    <video id="record" width="500" height="281">
                                    <source src={this.state.src} type='video/webm' />
                                    </video>
                                    {button}
                                </div>}
                            </div>

                            {/* <!-- Modal footer --> */}
                            <div className="modal-footer">
                            {/* if localstorage matches with this.state.creator */}
                            {(this.state.creator == 1) && <button className="btn btn-danger" data-dismiss="modal" onClick={this.archive}>Archive</button>}    
                            <button type="button" className="btn btn-primary" onClick={this.reply}>Reply</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>

                          </div>
                        </div>
                    </div>
                </div>
        )
    };
}
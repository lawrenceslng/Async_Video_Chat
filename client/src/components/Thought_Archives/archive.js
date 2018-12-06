import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import RecordRTC from 'recordrtc';
import {_xhr, _addVideo} from '../CreateThought/XHR';
import parcelBox from '../Images/open-parcel-boxes.jpg';
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

export default class Archived_Thoughts extends React.Component {
    constructor(props){
        super(props);
        this.state = initState;
    };

    // tick(){
    //     this.setState(prevState => ({
    //       counter: prevState.counter + 1
    //     }));
    // };
    reset() {
        this.setState(initState);
    };

    populate = (e) => {
        e.preventDefault();
        this.reset();
        let convId;
        let title;
        let content;
        let creator;
        let filepath;
        if(e.target.getAttribute('data-conversation_id'))
        {
            convId = e.target.getAttribute('data-conversation_id');
            title = e.target.getAttribute('data-title');
            content = e.target.getAttribute('data-content');
            creator = e.target.getAttribute('data-creator');
            filepath = e.target.getAttribute('data-filepath');
        }
        else if(e.target.parentElement.getAttribute('data-conversation_id'))
        {
            convId = e.target.parentElement.getAttribute('data-conversation_id');
            title = e.target.parentElement.getAttribute('data-title');
            content = e.target.parentElement.getAttribute('data-content');
            creator = e.target.parentElement.getAttribute('data-creator');
            filepath = e.target.parentElement.getAttribute('data-filepath');
        }
        
        var token = this.props.token();
        console.log(filepath);
        fetch("/relevant_thoughts/"+convId,{
            headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "x-access-token": token
            }}).then(res => res.json()).then(RESJ => {
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
                    src: 'https://s3-us-west-2.amazonaws.com/thought-parcel-2/'+filepath,
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
                src: 'https://s3-us-west-2.amazonaws.com/thought-parcel-2/'+this.state.thoughts[this.state.thoughts.length-1],
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
    getVideo = (id) => {
        console.log("get Video function");
        //hit upload/:id where :id is filename
        var id = id;
        // console.log(id);
        let classThis = this;
        return fetch(id).then(function(response){
            console.log('after fetch line 118');
            console.log(response);
            document.querySelector('video').play();
            document.querySelector('video').muted = false;
            document.querySelector('video').controls = true;
        });
    };
    previousVid = (e) => {
        e.preventDefault();
        console.log(this.state.currentVidLoc);
        if(this.state.currentVidLoc > 0){
            let newVidLoc = this.state.currentVidLoc - 1;
            this.getVideo(this.state.thoughts[newVidLoc]);
            this.setState({
                filepath: this.state.thoughts[newVidLoc],
                src: 'https://s3-us-west-2.amazonaws.com/thought-parcel-2/'+this.state.thoughts[newVidLoc],
                currentVidLoc: newVidLoc
            });
        }
        else{
            this.getVideo(this.state.originalFilepath);
            this.setState({
                filepath: this.state.originalFilepath,
                src: 'https://s3-us-west-2.amazonaws.com/thought-parcel-2/'+this.state.originalFilepath,
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
                src: 'https://s3-us-west-2.amazonaws.com/thought-parcel-2/'+this.state.thoughts[newVidLoc],
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
    reply = (e) => {
        e.preventDefault();
        alert("this is a reply button");
    };
    componentDidMount(){

        return fetch("/conversations_archive",{headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "x-access-token": this.props.token()
           }}).then(res => res.json()).then(resultingJSON => {
            console.log(resultingJSON);
            this.setState({conversations : resultingJSON})});
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
            <div className='row' id="archiveDiv">
                <h1>Your Archived Thoughts</h1>
                {/* <button id='2' onClick={this.populate}>Test</button> */}
                {(this.state.conversations) && this.state.conversations.map((x) => <div className='thoughtBox row' id={x.id} key={x.id} data-toggle="modal" data-target="#myModal" onClick={this.populate} data-conversation_id={x.id} data-creator={x.user_one_id} data-title={x.title} data-content={x.content}data-filepath={x.fs_path}><img src={parcelBox}className='parcelBox col-4'/><span className='col-8' style={{fontSize:25}}>From: {x.username} <br/>Title: {x.title}</span></div>)}
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
                                <ReactPlayer url={this.state.src} playing controls/><button className="btn btn-primary btn-vid-nav" onClick={this.previousVid}>Previous Video</button><button className="btn btn-primary btn-vid-nav" onClick={this.nextVid}>Next Video</button></div>}
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

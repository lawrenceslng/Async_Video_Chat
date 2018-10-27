import React, { Component } from 'react';
import ReactPlayer from 'react-player';
//this will retrieve all conversations related to this particular user
//hit up conversations, conversation_relation
export default class Archived_Thoughts extends React.Component {
    constructor(){
        super();
        this.state = {
            
        };
    };
    populate = (e) => {
        e.preventDefault();
        let convId = e.target.getAttribute('data-conversation_id');
        let title = e.target.getAttribute('data-title');
        let content = e.target.getAttribute('data-content');
        let creator = e.target.getAttribute('data-creator');
        let filepath = e.target.getAttribute('data-filepath');
        console.log(filepath);
        // alert(v);
        this.getVideo(filepath);
        this.setState({
            modalId: convId,
            title: title,
            content: content,
            creator: creator,
            filepath: filepath,
            src: 'http://localhost:3001/uploads/'+filepath
        });
        console.log(filepath);
        console.log(this.state.filepath);
        
        // this.getVideo();
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
    reply = (e) => {
        e.preventDefault();
        alert("this is a reply button");
    }
    componentDidMount(){
        return fetch("http://localhost:3001/conversations_archive").then(res => res.json()).then(resultingJSON => {
            console.log(resultingJSON);
            this.setState({conversations : resultingJSON})});
    };
    render(){
        return (
            <div>
                <h1>These are archived conversations I am a part of.</h1>
                
            </div>
        )
    };
}
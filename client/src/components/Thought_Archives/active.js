import React, { Component } from 'react';
import ReactPlayer from 'react-player';
//this will retrieve all conversations related to this particular user
//hit up conversations, conversation_relation
export default class Active_Thoughts extends React.Component {
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
        return fetch("http://localhost:3001/conversations_active").then(res => res.json()).then(resultingJSON => {
            console.log(resultingJSON);
            this.setState({conversations : resultingJSON})});
    };
    render(){
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
                              <ReactPlayer url={this.state.src} playing controls/>
                            </div>

                            {/* <!-- Modal footer --> */}
                            <div className="modal-footer">
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
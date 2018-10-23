import React, { Component } from 'react';

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
        // alert(v);
        this.setState({
            modalId: convId,
            title: title,
            content: content,
            creator: creator,
            filepath: filepath
        })
    };
    componentDidMount(){
        return fetch("http://localhost:3001/conversations").then(res => res.json()).then(resultingJSON => {
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
                            </div>

                            {/* <!-- Modal footer --> */}
                            <div className="modal-footer">
                              <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>

                          </div>
                        </div>
                    </div>
                </div>
        )
    };
}
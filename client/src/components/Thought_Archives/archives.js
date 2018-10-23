import React, { Component } from 'react';

//this will retrieve all conversations related to this particular user
//hit up conversations, conversation_relation
export default class Thought_Archive extends React.Component {
    constructor(){
        super();
        this.state = {
            
        };
    };
    componentDidMount(){
        return fetch("http://localhost:3001/conversations").then(res => res.json()).then(resultingJSON => {
            console.log(resultingJSON);
            this.setState({conversations : resultingJSON})});
    };
    render(){
        return (
            <div>
                <h1>this is my thought archives</h1>
                {(this.state.conversations) && this.state.conversations.map((x) => <div id={x.id}>{x.id}{x.user_one_id}{x.title}{x.content}{x.fs_path}</div>)}
                
            </div>
        )
    };
}
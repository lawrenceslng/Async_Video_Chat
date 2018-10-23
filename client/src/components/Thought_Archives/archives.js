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
        return fetch("http://localhost:3001/conversations").then(res => res.json()).then(resultingJSON => this.setState({conversations : resultingJSON}));
    };
    render(){
        return (
            <div>
                <h1>this is my thought archives</h1>
                {(this.state.conversations) && <span>hello</span>}
            </div>
        )
    };
}
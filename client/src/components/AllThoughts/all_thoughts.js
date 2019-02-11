import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//this will retrieve all conversations related to this particular user
//hit up conversations, conversation_relation

class All_Thoughts extends Component {
    // I should only display months that actually have content
    componentDidMount(){

    }
    
    render(){
        return (
            <div className = 'row' id="conversationsDiv">
                <h1>All Thoughts</h1>
                <div>
                    month 1
                </div>
                <div>
                    month 2
                </div>
            </div>
        )
    }  
}

const mapStateToProps = state => ({
    loggedIn: state.Login.loggedIn,
    token: state.Login.token,
    id: state.Login.id
  });
  
const matchDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
};
  
export default connect(
    mapStateToProps,
    matchDispatchToProps)(All_Thoughts);

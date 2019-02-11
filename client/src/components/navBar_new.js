import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {navigateTo} from '../actions/navigationAction';

class NavBar extends Component {
    render() {
      return(
        <div className="row" id="navBarRow">
          <div id="allThoughtsNav" className="box-part text-center col-sm-3 show-thoughts" onClick={() =>{this.props.navigateTo("Your Thoughts")}}>
            <div className="show-thoughts">
            <img className="card-img-top" src="https://visualpharm.com/assets/224/Folder-595b40b85ba036ed117dd27b.svg" />
              <h4> All Thoughts </h4>
            </div>
          </div>

          <div id="createNewNav" className="box-part text-center col-sm-3 show-record" onClick={() =>     {this.props.navigateTo("Create a Thought")}}>
            <div className="show-record">
            <img className="card-img-top" src="https://visualpharm.com/assets/375/Create-595b40b75ba036ed117d7bbf.svg" />
              <h4> Create New </h4>
            </div>
          </div>

          <div id="yourCommunityNav" className="box-part text-center col-sm-3 show-friends" onClick={() =>    {this.props.navigateTo("Your Community")}}>
            <div className="show-friends">
            <img className="card-img-top" src="https://static.thenounproject.com/png/5040-200.png" />
              <h4> Your Community </h4>
            </div>
          </div>

          <div id="settingsNav" className="box-part text-center col-sm-3 show-settings" onClick={() =>{this.props.navigateTo("Settings")}}>
            <div className="show-settings">
            <img className="card-img-top" src="https://visualpharm.com/assets/168/Read%20Message-595b40b75ba036ed117d88f5.svg" />
              <h4> Settings </h4>
            </div>
          </div>
        </div>
      );
    }
}
 
const matchDispatchToProps = dispatch => {
    return bindActionCreators({ navigateTo }, dispatch);
}
   
export default connect(null, matchDispatchToProps)(NavBar);
  

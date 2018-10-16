import React, { Component } from 'react';


// onclick= (this.expand)
//outside of render:
// expand =(e) => {
//   e.target (targets the one they clicked on)
//   hide every other element of the class add a class to e.target to increase width and height
//   add div to top with nav
// }

class Friends extends Component {
  constructor(){
    super();
  }
  render(){
    return(
        <div className="FriendFinder">
            <div className="container">
     	    <div className="row">
                <div className="col-sm-6 ">
                {/* list of friends of user */}
                <span>Here are your current Friends: </span>
                </div>
                <div className="col-sm-6 ">
                {/* searchable form for friends */}
                <span>Here's gonna be your searchable field</span>
                <form></form>
                </div>
            </div>
        </div>
     	    
                
      
        </div>
      )
    
  }
}

export default Friends;
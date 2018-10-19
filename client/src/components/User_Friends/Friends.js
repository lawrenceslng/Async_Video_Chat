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
    this.state = {
        searchStr: '',
        friends: [{
            id: 0,
            name: ''
        }],
        results: [{}]
    }
  };
  handleInputChange = () => {
    this.setState({
      searchStr: this.search.value
    },
    () => this.getInfo())
    console.log('24: ' + this.state.searchStr);
    // this.getInfo();
  };
  getInfo = () => {
      console.log(this.state.searchStr);
      if(this.state.searchStr === '')
      {
          //nothing
          this.setState({results: {}});
          var textnode = document.createTextNode("");  
          document.querySelector('.list-of-matching-search').appendChild(textnode);
      }
      else
      {
        return fetch(`http://localhost:3001/friends/${this.state.searchStr}`,{method: 'GET'}).then((res) => res.json()).then(rj => {
            console.log(rj);
            this.setState({results: rj});
           
            //get length of rj, create a li item for each with an Add friends button
        })
      }   
  }

  addFriend = (e) => {
      e.preventDefault();
      //gets User ID from ID in button
      console.log(e.target.id);
      var id = e.target.id;
      //do POST fetch call to server
      fetch(`http://localhost:3001/friends/`+id,{method: 'POST'}).then((res) => res.json()).then(rj => {
          console.log(rj);
          this.getFriends();
      });
  }
  getFriends = () => {
       return fetch('http://localhost:3001/friends', {headers : { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
   }}).then((res) => res.json()).then(rj => {
       console.log(rj);
        this.setState({friends: rj});
  });
}
  componentDidMount(){
    return fetch('http://localhost:3001/friends', {headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }}).then((res) => res.json()).then(rj => {
           console.log(rj);
            this.setState({friends: rj});
            this.getInfo();
        })
  }
  render(){
    return(
        <div className="FriendFinder">
            <div className="container">
     	    <div className="row">
                <div className="col-sm-6 ">
                {/* list of friends of user */}
                <div>Here are your current Friends: </div>
                {this.state.friends.map((x) => <div id={x.id} key={x.id}>{x.username}</div>)}
                </div>
                <div className="col-sm-6 ">
                {/* searchable form for friends */}
                <span>Here's gonna be your searchable field</span>
                <form id='friend-search'>
                    <input type='text' name='username' ref={input => this.search = input} onChange={this.handleInputChange}></input>
                </form>
                {/* <p>{this.state.searchStr}</p> */}
                <div className='list-of-matching-search'>
                    {/* //use array.map */}
                    {this.state.results.length > 0 && this.state.results.map((x) => <div id={x.id} name={x.name} key={x.id}>{x.username}<button id={x.id} onClick={this.addFriend}>Add Friend</button></div>)}
                    
                </div>
                </div>
            </div>
        </div>
     	    
                
      
        </div>
      )
    
  }
}

export default Friends;
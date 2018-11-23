import React, { Component } from 'react';


// onclick= (this.expand)
//outside of render:
// expand =(e) => {
//   e.target (targets the one they clicked on)
//   hide every other element of the class add a class to e.target to increase width and height
//   add div to top with nav
// }

class Friends extends Component {
  constructor(props){
    super(props);
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
    var token = this.props.token();
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
        return fetch(`/friends/${this.state.searchStr}`,{method: 'GET',headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "x-access-token": token
           }}).then((res) => res.json()).then(rj => {
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
      var token = this.props.token();
      //do POST fetch call to server
      console.log('line 64: '+token);
      console.log('line 65: ' + JSON.stringify({token}));
      fetch(`/friends/`+id,{method: 'POST',  headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },body: JSON.stringify({token})}).then((res) => res.json()).then(rj => {
          console.log(rj);
          this.getFriends();
      });
  }
  getFriends = () => {
      var token = this.props.token();
      console.log(token);
       return fetch('/friends', {headers : {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    "x-access-token": token
   }}).then((res) => res.json()).then(rj => {
       console.log(rj);
        this.setState({friends: rj});
  });
}
  componentDidMount(){
    var token = this.props.token();
    return fetch('/friends', {headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "x-access-token": token
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
                <div><h1>Your Community</h1> </div>
                {this.state.friends.map((x) => <div id={x.id} key={x.id}>{x.username}</div>)}
                </div>
                <div className="col-sm-6 ">
                {/* searchable form for friends */}
                <span><h1>Search</h1></span>
                <form id='friend-search'>
                    <input type='text' name='username' ref={input => this.search = input} onChange={this.handleInputChange}></input>
                </form>
                {/* <p>{this.state.searchStr}</p> */}
                <div className='list-of-matching-search'>
                    {/* use array.map */}
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

import React, { Component } from "react";
import NavBar from './navBar';
import Record from './Video_Test/videoComp'
import Active_Thoughts from './Active_Thoughts/active'
import Friends from './User_Friends/Friends'

// -import record class from videocomp to adminPanel. videoComp.js should show up on click when we hit CreateNew in admin panel.

class AdminPanel extends Component {
  constructor(){
    super();


  this.state = {
    target: '',

    NavBar: false,

    showSomeOtherThing: false,

    record: false,

    activeThoughts: false,

    friends: false

    //h2 element and then render the relevant components, else if just render the 4 boxes-
  }
}
  expand = (event) => {
    event.preventDefault();
    if(event.target.classList.contains("box-part"))
    {
      event.target.classList.add("expand");
    }
    else
    {
      if(event.target.parentElement.classList.contains("box-part"))
      {
       event.target.parentElement.classList.add("expand");
      }
      else{
        if(event.target.parentElement.parentElement.classList.contains("box-part"))
        {
          event.target.parentElement.parentElement.classList.add("expand");
        }
      }
    }


    //keep in mind event.target is "<div className="title"><img className="card-img-top" src="https://visualpharm.com/assets/168/Read%20Message-595b40b75ba036ed117d88f5.svg" alt=" image"></div>"
    event.target.parentElement.parentElement.classList.add("expand");

    if (event.target.classList.contains('show-record')){
      this.setState ({record: true, activeThoughts: false, friends: false})
    }

    if (event.target.classList.contains('show-active-thoughts')){
      this.setState ({activeThoughts: true, record: false, friends: false})
    }

    if (event.target.classList.contains('show-friends')){
      this.setState ({friends: true, record: false, activeThoughts: false})
    }

    var elements = document.querySelectorAll('.title');
    for (var i=0; i<elements.length; i++){

      if (elements[i].parentElement.getAttribute('id') == event.target.parentElement.getAttribute('id')) {
        event.target.parentElement.children[0].classList.add("hidee");
        event.target.parentElement.children[1].classList.add("hidee");
      }else {
        elements[i].parentElement.classList.add("hidee");
      }
    }



    this.setState({NavBar : true, showSomeOtherThing: true});


    // alert('hi');

  }

  render(){
    return (
      <div className="box">
    <div className="container">

      {this.state.NavBar && <NavBar expand={this.expand} />}
      {this.state.record && <Record/>}
      {this.state.activeThoughts && <Active_Thoughts/>}
      {this.state.friends && <Friends/>}


{/*start box section*/}

          <div className="row">
            <div className="col-sm-6 ">
              <a href="#" />

              <div id="thoughtArchives" className="box-part text-center" onClick={this.expand}>
                <div className="title">
                  <img className="card-img-top" src="https://visualpharm.com/assets/224/Folder-595b40b85ba036ed117dd27b.svg" />

                </div>

                <div className="text">
                  <span>
                    <h2>Thought Archives</h2>
                  </span>
                </div>
              </div>
            </div>

            <div className="col-sm-6 ">
              <a href="#" />

              <div id="activeThoughts" className="box-part text-center show-active-thoughts" onClick={this.expand}>
                <div className="title show-active-thoughts">
                  <img className="card-img-top show-active-thoughts" src="https://visualpharm.com/assets/168/Read%20Message-595b40b75ba036ed117d88f5.svg" />
                </div>
                <div className="text">
                  <span>
                    <h2>Active Thoughts</h2>
                  </span>
                </div>
              </div>
            </div>

            <div className="col-sm-6 ">
              <a href="#" />
              <div id="createNew" className="box-part text-center show-record" onClick={this.expand}>
                <div className="title  show-record">
                  <img className="card-img-top show-record" src="https://visualpharm.com/assets/375/Create-595b40b75ba036ed117d7bbf.svg" />

                </div>
                <div className="text">
                  <span>
                    <h2>Create New</h2>
                  </span>
                </div>
              </div>
            </div>

            <div className="col-sm-6 ">
              <a href="#" />

              <div id="yourCommunity" className="box-part text-center show-friends" onClick={this.expand}>
                <div className="title show-friends">
                  <img className="card-img-top show-friends" src="https://static.thenounproject.com/png/5040-200.png" />

                </div>
                <div className="text">
                  <span>
                    <h2>Your Community</h2>
                  </span>
                </div>
              </div>
            </div>

          </div>


          </div>
          </div>
          )
          }
          }
// export expand;
export default AdminPanel;

import React, { Component } from "react";
import Nav from './nav';

class AdminPanel extends Component {
  constructor(){
    super();

  this.state = {
    target: '',
    navBar: false,
    showSomeOtherThing: false
    //h2 element and then render the relevant components, otherwise just render the 4 boxes
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

    var elements = document.querySelectorAll('.title');
    for (var i=0; i<elements.length; i++){

      if (elements[i].parentElement.getAttribute('id') == event.target.parentElement.getAttribute('id')) {
        event.target.parentElement.children[0].classList.add("hidee");
        event.target.parentElement.children[1].classList.add("hidee");
      }else {
        elements[i].parentElement.classList.add("hidee");
      }
    }

    this.setState({navBar : true});

    // alert('hi');

  }

  render(){
    return (
      <div className="box">
    <div className="container">
      {
        this.state.showSomeOtherThing && <h1>blah blah</h1>
      }

{/* navbar section */}

      { this.state.navBar &&

          <div>
            <div id="thoughtArchivesNav">
              <a href="#">
                <img className="card-img-top" src="https://visualpharm.com/assets/224/Folder-595b40b85ba036ed117dd27b.svg" />
              </a>
            </div>


            <div id="incomingRequestsNav">
              <a href="#">
                <img className="card-img-top" src="https://visualpharm.com/assets/168/Read%20Message-595b40b75ba036ed117d88f5.svg" />
              </a>
            </div>


            <div id="createNewNav">
              <a href="#">
                <img className="card-img-top" src="https://visualpharm.com/assets/375/Create-595b40b75ba036ed117d7bbf.svg" />
              </a>
            </div>


            <div id="yourCommunityNav" >
              <a href="#">
                <img className="card-img-top" src="https://static.thenounproject.com/png/5040-200.png" />
              </a>
            </div>
          </div>
          }
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

              <div id="incomingRequests" className="box-part text-center" onClick={this.expand}>
                <div className="title">
                  <img className="card-img-top" src="https://visualpharm.com/assets/168/Read%20Message-595b40b75ba036ed117d88f5.svg" />
                </div>
                <div className="text">
                  <span>
                    <h2>Incoming Requests</h2>
                  </span>
                </div>
              </div>
            </div>

            <div className="col-sm-6 ">
              <a href="#" />
              <div id="createNew" className="box-part text-center" onClick={this.expand}>
                <div className="title">
                  <img className="card-img-top" src="https://visualpharm.com/assets/375/Create-595b40b75ba036ed117d7bbf.svg" />

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

              <div id="yourCommunity" className="box-part text-center" onClick={this.expand}>
                <div className="title">
                  <img className="card-img-top" src="https://static.thenounproject.com/png/5040-200.png" />

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
export default AdminPanel;

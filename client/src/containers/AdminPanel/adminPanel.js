import React, { Component } from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import NavBar from '../../components/navBar_new';
// import Record from './Video_Test/videoComp'
// import Active_Thoughts from '../../components/Active_Thoughts/active_new'
// import Friends from './User_Friends/Friends'
import AllThoughts from "../../components/AllThoughts/all_thoughts";
import CreateThought from "../../components/CreateThought/CreateThought";
import YourCommunity from "../../components/YourCommunity/YourCommunity";

// import Test from '../../components/test';
import logo from '../../images/Thought-Parcel-logo.png';
import {navigateTo} from '../../actions/navigationAction';

// -import record class from videocomp to adminPanel. videoComp.js should show up on click when we hit CreateNew in admin panel.

class AdminPanel extends Component {


  // expand = (event) => {
  //   event.preventDefault();
  //   // debugger;
  //   var targ;
  //   if(event.target.classList.contains("box-part"))
  //   {
  //     targ = event.target;
  //     event.target.classList.add("expand");
  //   }
  //   else
  //   {
  //     if(event.target.parentElement.classList.contains("box-part"))
  //     {
  //       targ = event.target.parentElement;
  //      event.target.parentElement.classList.add("expand");
  //     }
  //     else{
  //       if(event.target.parentElement.parentElement.classList.contains("box-part"))
  //       {
  //         targ = event.target.parentElement.parentElement;
  //         event.target.parentElement.parentElement.classList.add("expand");
  //       }
  //       else{
  //         if(event.target.parentElement.parentElement.parentElement.classList.contains("box-part"))
  //         {

  //           targ = event.target.parentElement.parentElement.parentElement;

  //           event.target.parentElement.parentElement.parentElement.classList.add("expand");
  //         }
  //       }
  //     }
  //   }

  //   // debugger;
  //   //keep in mind event.target is "<div className="title"><img className="card-img-top" src="https://visualpharm.com/assets/168/Read%20Message-595b40b75ba036ed117d88f5.svg" alt=" image"></div>"
  //   // event.target.parentElement.parentElement.classList.add("expand");



  //   if (targ.classList.contains('show-record')){
  //     this.setState ({record: true, activeThoughts: false, friends: false, archiveThoughts: false})
  //   }

  //   else if (targ.classList.contains('show-active-thoughts')){
  //     this.setState ({activeThoughts: true, record: false, friends: false, archiveThoughts: false})
  //   }

  //   else if (targ.classList.contains('show-friends')){
  //     this.setState ({friends: true, record: false, activeThoughts: false, archiveThoughts: false})
  //   }

  //   else if (targ.classList.contains('show-archive-thoughts')){
  //     this.setState ({friends: false, record: false, activeThoughts: false, archiveThoughts: true})
  //   }


  //   var elements = document.querySelectorAll('.title');
  //   for (var i=0; i<elements.length; i++){

  //     if (elements[i].parentElement.getAttribute('id') === event.target.parentElement.getAttribute('id')) {
  //       event.target.parentElement.children[0].classList.add("hidee");
  //       event.target.parentElement.children[1].classList.add("hidee");
  //     }else {
  //       elements[i].parentElement.classList.add("hidee");
  //     }
  //   }



  //   this.setState({NavBar : true, showSomeOtherThing: true});


  //   // alert('hi');

  // }

  render(){
    const { navBar, record, yourThoughts, yourCommunity, settings } = this.props;
    if(navBar)
    {
      return (
        <div className="box">
          <div className="container">
            {NavBar && <NavBar />}
            {record && <CreateThought />} 
            {yourThoughts && <AllThoughts />}
            {yourCommunity && <YourCommunity />}
            {settings && <CreateThought />}
          </div>
        </div>
      )
    }
    else
    {
      return (
        <div className="box">
      <div className="container">
      {/*start box section*/}

    <div className = "logo">
    <img src={logo} alt="picture1" />
        </div>
          <div className="row-main">

            <div className="col-sm-6 show-thoughts">
              <a href="#" />

              <div id="Your Thoughts" className="box-part text-center show-archive-thoughts" onClick={() => this.props.navigateTo('Your Thoughts')}>

                <div classNam="title">
                  <img className="card-img-top" src="https://visualpharm.com/assets/224/Folder-595b40b85ba036ed117dd27b.svg" />

                </div>

                <div className="text">
                  <span>
                    <h2>All Thoughts</h2>
                  </span>
                </div>
              </div>
            </div>

            <div className="col-sm-6 show-record">
              <a href="#" />
              <div id="createNew" className="box-part text-center show-record" onClick={() => this.props.navigateTo('Create a Thought')}>
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

            <div className="col-sm-6 show-friends">
              <a href="#" />

              <div id="yourCommunity" className="box-part text-center show-friends" onClick={() => this.props.navigateTo('Your Community')}>
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

            <div className="col-sm-6 show-settings">
              <a href="#" />

              <div id="settings" className="box-part text-center show-settings" onClick={() => this.props.navigateTo('Settings')}>
                <div className="title show-settings">
                  <img className="card-img-top show-settings" src="https://static.thenounproject.com/png/5040-200.png" />

                </div>
                <div className="text">
                  <span>
                    <h2>Settings</h2>
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
          }

const mapStateToProps = state => ({
  navBar: state.Navigation.navBar,
  record: state.Navigation.record,
  yourThoughts: state.Navigation.yourThoughts,
  yourCommunity: state.Navigation.yourCommunity,
  settings: state.Navigation.settings,
  error: state.Navigation.error
});

const matchDispatchToProps = dispatch =>{
  return bindActionCreators({navigateTo}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(AdminPanel);



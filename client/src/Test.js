import React, { Component } from 'react';
// import Modal from 'react-awesome-modal';
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { openModal, closeModal } from './actions/testAction';
// // import Header from './components/header';
// // import Footer from './components/footer';
// // import Carousel from './components/carousel';
// // import LoginForm from './components/loginForm';
// // import PWMatch from './components/accountCreate';
// // import AdminPanel from './components/adminPanel';
// // import recordJS from './components/record';
// // import Record from './components/Video_Test/videoComp';
// // import Friends from './components/User_Friends/Friends';
// // import Active_Thoughts from './components/Active_Thoughts/active';
// import Archived_Thoughts from './components/Thought_Archives/archive';
// // import './App.css';

class Test extends Component {
  // pass in initial states
  constructor(){
    super();
  };






//     componentDidMount(){
//         startRecording.disabled = false;
//     };


  render() {
  const { test } = this.props;
  console.log(this.props.test);
    return(
        <div>

            <button onClick={this.props.openModal}>True</button>
            <button onClick={this.props.closeModal}>False</button>
        </div>
    );
  }
}

const mapStateToProps = state => ({
    test: state.Test.test
  });
  
const matchDispatchToProps = dispatch =>{
    return bindActionCreators({openModal, closeModal}, dispatch);
}
  
  
export default connect(mapStateToProps, matchDispatchToProps)(Test);
  


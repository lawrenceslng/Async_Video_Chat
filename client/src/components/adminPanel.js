import React, { Component } from "react";
import Nav from './nav';

class AdminPanel extends Component {
  state = {
    // Here's a list of the cards
    cards: {
      1: {
        show: true,
        text: "Thought Archives",
        src:
          "https://visualpharm.com/assets/224/Folder-595b40b85ba036ed117dd27b.svg"
      },
      2: {
        show: true,
        text: "Incoming Requests",
        src:
          "https://visualpharm.com/assets/168/Read%20Message-595b40b75ba036ed117d88f5.svg"
      },
      3: {
        show: true,
        text: "Create New",
        src:
          "https://visualpharm.com/assets/375/Create-595b40b75ba036ed117d7bbf.svg"
      },
      4: {
        show: true,
        text: "Your Community",
        src: "https://static.thenounproject.com/png/5040-200.png"
      }
    },
    showNav: false
  };
  click = id => {
    const cards = Object.create(this.state.cards);
    let showNav = false;
    for (let key in this.state.cards) {
      // Here we just toggle the show property!
      if (key !== id) {
        cards[key].show = !cards[key].show;
        showNav = !cards[key].show;
      }
    }
    this.setState({ cards, showNav });
  };

  render() {
    const { cards, showNav } = this.state;
    console.log(this.state);
    let currentCards = [];
    for (let key in cards) {
      currentCards.push(
        <Card
          key={key}
          id={key}
          text={cards[key].text}
          show={cards[key].show}
          src={cards[key].src}
          click={this.click}
        />
      );
    }
    return (
      <div class="container">
        {showNav ? <nav> Nav (Placeholder for nav!)</nav> : null}

        <div class="row">{currentCards}</div>
      </div>
    );
  }
}

export default AdminPanel;

function Card({ click, show, id, text, src }) {
  if (!show) return null;

  return (
    <div className="col-sm-6 ">
      <a href="#" />

      <div class="box-part text-center">
        <div class="title" onClick={e => click(id)}>
          <img class="card-img-top" src={src} alt=" image" />
        </div>
        <div className="text">
          <h2>{text}</h2>
        </div>
      </div>
    </div>
  );
}




//previous code


// // import $ from 'jquery';
//
// // onclick= (this.expand)
// //outside of render:
// // expand =(e) => {
// //   e.target (targets the one they clicked on)
// //   hide every other element of the class add a class to e.target to increase width and height
// //   add div to top with nav
// // }
//
// class AdminPanel extends Component {
//   constructor(){
//     super();
//   }
//
//   expand = (event) => {
//     event.preventDefault();
//
//     // $('.title').hide();
//
//     var elements = document.querySelectorAll('.title');
//     debugger;
//     for (var i=0; i<elements.length; i++){
//       elements[i].classList.add('hidee');
//       //hide everything except the one we clicked on
//         //if event.target != elements[i] then add a class of hidee
//       //add a class to event.target called expand
//
//       //make a css file and put in hidee and expand classes and put the css in
//       //import that css file at the top of this file
//     }
//
//     alert('hi');
//
//   }
//
//   render(){
//     return (
//       <div class="box">
//     <div class="container">
//      	<div class="row">
//
//       <div class="col-sm-6 ">
//        <a href="#"/>
//        <div class="box-part text-center">
//          <div class="title" onClick={this.expand}>
//            <img class="card-img-top" src="https://visualpharm.com/assets/224/Folder-595b40b85ba036ed117dd27b.svg" alt=" image"/>
//          </div>
//          <div class="text">
//               <span><h2>Thought Archives</h2></span>
//          </div>
//         </div>
//      </div>
//
// 				 <div class="col-sm-6 ">
// 					<a href="#"/>
// 					<div class="box-part text-center">
// 						<div class="title" onClick={this.expand}>
// 							<img class="card-img-top" src="https://visualpharm.com/assets/168/Read%20Message-595b40b75ba036ed117d88f5.svg" alt=" image"/>
// 						</div>
// 						<div class="text">
//                 <span><h2>Incoming Requests</h2></span>
// 						</div>
// 					 </div>
// 				</div>
//
//         <div class="col-sm-6 ">
//          <a href="#"/>
//          <div class="box-part text-center">
//            <div class="title" onClick={this.expand}>
//              <img class="card-img-top" src="https://visualpharm.com/assets/375/Create-595b40b75ba036ed117d7bbf.svg" alt=" image"/>
//            </div>
//            <div class="text">
//                <span><h2>Create New</h2></span>
//            </div>
//           </div>
//        </div>
//
//        <div class="col-sm-6 ">
//         <a href="#"/>
//         <div class="box-part text-center">
//           <div class="title" onClick={this.expand}>
//             <img class="card-img-top" src="https://static.thenounproject.com/png/5040-200.png" alt=" image"/>
//           </div>
//           <div class="text">
//                <span><h2>Your Community</h2></span>
//           </div>
//          </div>
//       </div>
//
// 		</div>
//     </div>
// </div>
// )
//   }
// }
//
// // const AdminPanel = () => (
// //
// // )
//
// // function ActionLink() {
// //   function handleClick(e) {
// //     e.preventDefault();
// //     console.log('The link was clicked.');
// //   }
// //
// //   return (
// //     <a href="#" onClick={handleClick}>
// //       prompt('hello');
// //     </a>
// //   );
// // }
//
//
// export default AdminPanel;

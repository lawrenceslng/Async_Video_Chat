import React, { Component } from 'react';


// onclick= (this.expand)
//outside of render:
// expand =(e) => {
//   e.target (targets the one they clicked on)
//   hide every other element of the class add a class to e.target to increase width and height
//   add div to top with nav
// }

class AdminPanel extends Component {
  constructor(){
    super();
  }

  expand = (event) => {
    event.preventDefault();


    var elements = document.querySelectorAll('.title');
    debugger;
    for (var i=0; i<elements.length; i++){
      elements[i].classList.add('hidee');
      //hide everything except the one we clicked on
        //if event.target != elements[i] then add a class of hidee
      //add a class to event.target called expand

      //make a css file and put in hidee and expand classes and put the css in
      //import that css file at the top of this file
    }

    alert('hi');

  }

  render(){
    return (
      <div class="box">
    <div class="container">
     	<div class="row">
      <div className="col-sm-6 ">
       <a href="#"/>

       <div class="box-part text-center">
         <div class="title" onClick={this.expand}>
           <img class="card-img-top" src="https://visualpharm.com/assets/224/Folder-595b40b85ba036ed117dd27b.svg" alt=" image"/>

         </div>
         <div className="text">
              <span><h2>Thought Archives</h2></span>
         </div>
        </div>
     </div>

				 <div className="col-sm-6 ">
					<a href="#"/>

					<div class="box-part text-center">
						<div class="title" onClick={this.expand}>
							<img class="card-img-top" src="https://visualpharm.com/assets/168/Read%20Message-595b40b75ba036ed117d88f5.svg" alt=" image"/>
						</div>
						<div className="text">
                <span><h2>Incoming Requests</h2></span>
						</div>
					 </div>
				</div>

        <div className="col-sm-6 ">
         <a href="#"/>
         <div class="box-part text-center">
           <div class="title" onClick={this.expand}>
             <img class="card-img-top" src="https://visualpharm.com/assets/375/Create-595b40b75ba036ed117d7bbf.svg" alt=" image"/>

           </div>
           <div className="text">
               <span><h2>Create New</h2></span>
           </div>
          </div>
       </div>

       <div className="col-sm-6 ">
        <a href="#"/>

        <div class="box-part text-center">
          <div class="title" onClick={this.expand}>
            <img class="card-img-top" src="https://static.thenounproject.com/png/5040-200.png" alt=" image"/>

          </div>
          <div className="text">
               <span><h2>Your Community</h2></span>
          </div>
         </div>
      </div>

		</div>
    </div>
</div>
)
  }
}

// const AdminPanel = () => (
//
// )

// function ActionLink() {
//   function handleClick(e) {
//     e.preventDefault();
//     console.log('The link was clicked.');
//   }
//
//   return (
//     <a href="#" onClick={handleClick}>
//       prompt('hello');
//     </a>
//   );
// }


export default AdminPanel;

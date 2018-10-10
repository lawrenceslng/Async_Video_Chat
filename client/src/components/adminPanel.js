import React from "react";

const AdminPanel = () => (
  <div className="box">
    <div className="container">
     	<div className="row">

      <div className="col-sm-6 ">
       <a href="#"/>
       <div className="box-part text-center">
         <div className="title">
           <img className="card-img-top" src="https://visualpharm.com/assets/224/Folder-595b40b85ba036ed117dd27b.svg" alt=" image"/>
         </div>
         <div className="text">
              <span><h2>Thought Archives</h2></span>
         </div>
        </div>
     </div>

				 <div className="col-sm-6 ">
					<a href="#"/>
					<div className="box-part text-center">
						<div className="title">
							<img className="card-img-top" src="https://visualpharm.com/assets/168/Read%20Message-595b40b75ba036ed117d88f5.svg" alt=" image"/>
						</div>
						<div className="text">
                <span><h2>Incoming Requests</h2></span>
						</div>
					 </div>
				</div>

        <div className="col-sm-6 ">
         <a href="#"/>
         <div className="box-part text-center">
           <div className="title">
             <img className="card-img-top" src="https://visualpharm.com/assets/375/Create-595b40b75ba036ed117d7bbf.svg" alt=" image"/>
           </div>
           <div className="text">
               <span><h2>Create New</h2></span>
           </div>
          </div>
       </div>

       <div className="col-sm-6 ">
        <a href="#"/>
        <div className="box-part text-center">
          <div className="title">
            <img className="card-img-top" src="https://static.thenounproject.com/png/5040-200.png" alt=" image"/>
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
export default AdminPanel;

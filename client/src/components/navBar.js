import React from "react";

const NavBar = () => (
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
);
export default NavBar;

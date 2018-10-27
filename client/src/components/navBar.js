import React from "react";

const NavBar = () => (

<div>

    <div id="thoughtArchivesNav" className="box-part text-center">
      <div className="show-archives">
        <img className="card-img-top" src="https://visualpharm.com/assets/224/Folder-595b40b85ba036ed117dd27b.svg" />
      </div>
    </div>


    <div id="activeThoughtsNav" className="box-part text-center">
      <div className="show-active-thoughts">
        <img className="card-img-top" src="https://visualpharm.com/assets/168/Read%20Message-595b40b75ba036ed117d88f5.svg" />
      </div>
    </div>


    <div id="createNewNav" className="box-part text-center">
      <div className="show-record">
        <img className="card-img-top" src="https://visualpharm.com/assets/375/Create-595b40b75ba036ed117d7bbf.svg" />
      </div>
    </div>


    <div id="yourCommunityNav" className="box-part text-center">
        <div className="show-friends">
        <img className="card-img-top" src="https://static.thenounproject.com/png/5040-200.png" />
      </div>
    </div>

</div>
);

export default NavBar;

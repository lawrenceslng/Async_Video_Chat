import React from "react";
import picture1 from './Images/bubbles2.jpeg'




const Carousel = () => (

    <div id="myCarousel" className="carousel slide" data-ride="carousel">
        {/* <!-- Indicators --> */}
          <ol className="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
          </ol>

          {/* <!-- Wrapper for slides --> */}
          <div className="carousel-inner">
            <div className="item active">
              <img src={picture1} alt="picture1" />
            </div>


          </div>

          {/* <!-- Left and right controls --> */}
          <a className="left carousel-control" href="#myCarousel" data-slide="prev">
            <span className="glyphicon glyphicon-chevron-left"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="right carousel-control" href="#myCarousel" data-slide="next">
            <span className="glyphicon glyphicon-chevron-right"></span>
            <span className="sr-only">Next</span>
          </a>
    </div>
)

export default Carousel;

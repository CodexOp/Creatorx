import React from "react";
import './landing.css';
import man from "../../image/holo.gif"
import {
  Link
} from "react-router-dom";


const Landing = () => {
    return(
      <div className="landing_outer">
        <div className="landing_inner">
          <div className="landing_inner_col1">
             <h2 className="main_heading">
             CREATORX IS A DECENTRALIESD PLATFORM FOR HELP SMALL CREATORS
             </h2>
             <div className="flex_button">
              
             <button className="main_button" >  <Link to="/home">LETS GO  </Link></button>
       
             </div>
           </div>
           <div className="landing_inner_col2">
         <img src={man} className="man"/>
           </div>
        </div>
      </div>
    )
}


export default Landing
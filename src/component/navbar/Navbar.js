import React, {useState} from 'react';
import './navbar.css';
import logo from "../../image/logo.png"
import { GiHamburgerMenu } from 'react-icons/gi';
import { ImCross } from 'react-icons/im';
import Identicon from 'react-identicons';
import {
    Link
  } from "react-router-dom";
  


const Navbar = (props) => {

const showUi = () =>{
    document.getElementById('ul').style.right='0';
    document.querySelector('.ham').style.display='none';
    document.querySelector('.cross').style.display='block';

}

const hideUi = () =>{
    document.getElementById('ul').style.right='-100%';
    document.querySelector('.ham').style.display='block';
    document.querySelector('.cross').style.display='none';

}

const showAvatar = () =>{
    if((props.Acc) != undefined){
    document.querySelector('#avatar').style.display='block';
    document.querySelector('#avatar_pc').style.display='block';

    }
}

showAvatar()


    return (
        <div className='navbar_outer'>
            <div className='navbar_inner'>
                <div className='logo_container'>
                  <a href="creatorx"><img src={logo} /> </a>
                  <a href="creatorx"><h2 className='logo_title'>CREATORX</h2></a>
                  
                </div>
                </div>
            <div className='navigation_list'>
                <div className='navigations'>
                    <ul id="ul">
                        <li className="li" to="/home"><Link to="/creatorx">Home</Link></li>
                        <li className="li" ><Link to="/home">Creators</Link></li>
                        <li className="li"><a href="mailto:tusharnagarop@gmail.com">ContactUs</a></li>
                        <li className="li"><a href="https://www.tusharnagar.tech">AboutMe</a></li>
                    </ul>               
                </div>    
                <div id='avatar_pc'>
                <Identicon className="main_avatar" string={props.Acc} />
                </div>
             
            </div>
            <div className='right_nav'>
            <div id='avatar'>
            <Identicon className="main_avatar" string={props.Acc} />
            </div>
            <GiHamburgerMenu  className='ham' size='25px'
                    onClick = {()=>
                      showUi()
                    }
                    />

             <ImCross  className='cross' size='20px'
                    onClick = {()=>
                      hideUi()
                    }
                    /> 
                   
            </div>
        </div>
        
    )
}

export default Navbar

import React, { Component } from "react";
import { Link } from "react-router-dom";

import { logoutUser } from "../../actions/authActions";
import store from "./../../store";

import "./Navbar.css";

class Navbar extends Component {

  logout() {
    store.dispatch(logoutUser());
  };
 

  render() {
    return (
      <div >
        <nav>      
            <ul id="test" class="navbar">
              <li id="test1"><Link to="/Dashboard"> <img id='logo' src= "Vaccure.png" alt="Vaccure" width = "130" height="64" ></img></Link></li>
              <li id="test2"><Link to="/"> <img id='logo' src= "Vaccure.png" alt="Vaccure1" width = "130" height="64" ></img></Link></li>
              <li id="test3"> <img id='logo' src= "Vaccure.png" alt="Vaccure1" width = "130" height="64" ></img></li>
              <li id='right2' onClick={this.logout} style={{display: "none"}}> <a><img src="Exit.png" width="30" height="30"></img></a></li>
              <li id='right1' style={{display: "none"}}><Link to="/Stats"> <img src="Stats.png" width="30" height="30"></img></Link></li>
              <li id='right'style={{display: "none"}}><Link to="/newAppointment" > <img src="Calendar.png" width="30" height="30"></img></Link></li>
              <li id="reg">
              <Link to="/register"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Register
              </Link>
              </li>
              <li id="login">
              <Link to="/login"
                className="btn btn-large btn-flat waves-effect white black-text"
              >
                Log In
              </Link>
              </li>
            </ul>
            
        </nav>
        
      </div>
    );
  }
}

export default Navbar;

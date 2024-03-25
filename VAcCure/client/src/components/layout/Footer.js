import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Footer.css";

class Footer extends Component {
 

  render() {
    return (
      <div >
        <footer class="left" id="foo">      
        <div>
             <div class="right" >
                <div class="col-sm-12 footer__links">
                   <a href="terms">Terms of Use</a> | <a href="privacy">Privacy Policy</a>
                </div>
                <div class="col-sm-12 footer__copyright">(c) VAcCure. All rights reserved
                </div>
             </div>
   
              <div>
                 Contact us: 2310323988
              </div>
              <div >
                 Email: info@vaccure.com
              </div>
        </div>

            <div id="gumernica">
            Powered by guMERNica
            </div>

        </footer>
        
      </div>
    );
  }
}

export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';

import './footer.css';

export default function Footer() {
    return (
        <div id="Footer">
            <div className="WraperContent pt-4 mt-4">
                <div className="container">
                    <div className="row">
        
                        <div className="col-md-12">
                            <hr />
                        </div>

                        <div className="col-6 col-sm-4 col-md-3 ">
                            <h3 className="pt-4 pb-4">Orders</h3>
                            <Link to="/login"> My Account</Link>
                            <a href="" className="d-block">Delivery</a>
                            <a href="" className="d-block">Return policy</a>
                        </div>

                        <div className="col-6 col-sm-4 col-md-3">
                            <h3 className="pt-4 pb-4">Help</h3>
                            <a href="" className="d-block">Customer service</a>
                            <a href="" className="d-block">Size guide</a>
                            <Link to="/Contacts">Contact us</Link>
                        </div>

                        <div className="col-6  col-sm-4 col-md-3 ">
                            <h3 className="pt-4 pb-4">About us</h3>
                            <Link to="/About">About us</Link>

                            <a href="" className="d-block">Customer service</a>
                            <a href="" className="d-block">Store locator</a>
                        </div>

                        <div className="col-6 col-sm-12 col-md-3 socialmedia pt-4 d-flex  justify-content-sm-center" id="socialmedia">

                            <li><a href="#"><i className="fab fa-tumblr" title="Tumblr"></i></a></li>
                            <li><a href="#"><i className="fab fa-twitter" title="Twitter"></i></a></li>
                            <li><a href="#"><i className="fab fa-youtube" title="Youtube"></i></a></li>
                            <li><a href="#"><i className="fab fa-facebook-f" title="Facebook"></i></a></li>

                        </div>

                        <div className="col-md-12">
                            <hr />
                        </div>

                        <div className="col-12 col-sm-12 col-md-12 pt-2 pb-2 ">
                            <h6 className="text-center">All rights reserved &reg;</h6>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
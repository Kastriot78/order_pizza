import React, { Component } from 'react';

import './home.css';

import Pizza from '../Pizza/pizza';
import Section from './section';

class Home extends Component {
    render() {
        return (
            <div id="Home">
                <div className="container-fluid">
                    <div className="row">
                        <div className="d-md-block col-sm-12 col-md-12 " id="foto1">
                        </div>
                    </div>
                </div>
                <hr />
                
                <Pizza />
                <hr />
                <div>
                    <h2 className="text-center p-5" id="new" style={{display:"block "}}>HOT PIZZA MEALS</h2>
                </div>

                <Section />

            </div>
        )
    }
}

export default Home;
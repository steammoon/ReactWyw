import React, { Component } from 'react';
import logonthq from '../../img/logo-new.png';
import headimg from '../../img/github-fill-blue.png';

export default class Homemenu extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    render() {
        return (
            <div className="container-fluid" id="Homemenu">
                <div className="row">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-1"><img className="homemenu-logo" src={logonthq} /></div>
                            <div className="col-md-1 homemenuul">业务</div>
                            <div className="col-md-1 homemenuul">报表</div>
                            <div className="col-md-1 homemenuul">娱乐</div>
                            <div className="col-md-1"></div>
                            <div className="col-md-1"></div>
                            <div className="col-md-1"></div>
                            <div className="col-md-1"></div>
                            <div className="col-md-1"></div>
                            <div className="col-md-1"></div>
                            <div className="col-md-1"></div>
                            <div className="col-md-1 homemenuul">
                                <button className="btn btn-default1 btn-block" type="button">
                                    <img className="ico" src={headimg}></img>huangw 
                                    <span class="caret"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
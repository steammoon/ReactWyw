import React, { Component } from 'react';
import HomeMenuBtn from './home-menu-btn';
import HomeMenuConf from './home-menu-config';
import {Link} from 'react-router-dom';
import ListBtnJson from '../../hw-list-btn.json';


//home导航条
export default class Homemenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curcode: null,
            locked: false
        }
    }

    menulistOpen1 = (data) => {
        let ifc = false;
        if(data.ifclick){
            ifc = true;
        }
        this.props.callbackMenu(data);
        this.setState({
            curcode: data.btncode,
            locked: ifc
        });
    }

    render() {
        return (
            <div className="container-fluid" id="Homemenu">
                <Link to="/Home"><div id="img-logo" alt="nthq"></div></Link>
                <div className="row">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-1 homemenuu0" id="btn0"></div>
                            {ListBtnJson.menumap.map((value, i) => <HomeMenuBtn callbackMenu1={this.menulistOpen1} code={value.code} value={value.value} key={i} curcode={this.state.curcode} locked={this.state.locked} />)}
                            {ListBtnJson.menumapnull.map((value, i) => <div key={i} className="col-md-1" >{value.value}</div>)}
                            <HomeMenuConf name={this.props.name} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
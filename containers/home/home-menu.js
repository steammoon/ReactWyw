import React, { Component } from 'react';
import HomeMenuBtn from './home-menu-btn';
import HomeMenuConf from './home-menu-config';
import {Link} from 'react-router-dom';


//home导航条
export default class Homemenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curcode: null,
            locked: false,
            menumap: [
                {
                    code: "btn1",
                    value: "培训"
                },
                {
                    code: "btn2",
                    value: "任务"
                },
                {
                    code: "btn3",
                    value: "应用"
                },
                {
                    code: "btn4",
                    value: "市场"
                },
                {
                    code: "btn5",
                    value: "数据"
                }
            ],
            menumapnull: [
                {
                    code: "btnnull1",
                    value: ""
                },
                {
                    code: "btnnull2",
                    value: ""
                },
                {
                    code: "btnnull3",
                    value: ""
                },
                {
                    code: "btnnull4",
                    value: ""
                }
            ]
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
                <Link to="/"><div id="img-logo" alt="nthq"></div></Link>
                <div className="row">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-1 homemenuu0" id="btn0"></div>
                            {this.state.menumap.map((value, i) => <HomeMenuBtn callbackMenu1={this.menulistOpen1} code={value.code} value={value.value} key={i} curcode={this.state.curcode} locked={this.state.locked} />)}
                            {this.state.menumapnull.map((value, i) => <div key={i} className="col-md-1" >{value.value}</div>)}
                            <HomeMenuConf />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
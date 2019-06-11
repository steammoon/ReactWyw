import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim'
import headimg from '../../img/github-fill-blue.png';

class HomeMenuConf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            confstyle: {
                left: '404px'
            },
            confmap: [
                {
                    code: "cof1",
                    value: "个人设置"
                },
                {
                    code: "cof2",
                    value: "积分查询"
                },
                {
                    code: "cof3",
                    value: "修改密码"
                },
                {
                    code: "cof4",
                    value: "注销"
                }
            ],
        }
    }

    confbtn(event) {
        let rt = document.getElementById("default1").offsetLeft + document.getElementById("default1").offsetWidth - document.getElementById("default2").offsetWidth -16 + "PX";
        this.setState({
            show : !this.state.show,
            confstyle: {
                left: rt
            }
        })
    }

    confbtn1(event) {
       
    }

    componentDidMount(){
    }

    render() {
        return (
            <div id="default1" className="col-md-2 df1">
                <button id="default2"  className="btn btn-default1" type="button" onClick={(event) => { this.confbtn(event) }}>
                    <img className="ico" src={headimg} alt="head_logo"></img> huangw
                                    <span className="caret"></span>
                </button>
                <QueueAnim className="demo-content"
                    key="demo"
                    type={['top']}
                    ease={['easeOutQuart', 'easeInOutQuart']}>
                    {this.state.show ? [
                        <div id="userconf" key="userconf" style={this.state.confstyle}>
                            <ul>
                                {this.state.confmap.map((value, i) => <li key={i} onClick={(event) => {this.confbtn1(event)}}>{value.value}</li>)}
                            </ul>
                        </div>
                    ] : null}
                </QueueAnim>
            </div>
        );
    }
}

export default HomeMenuConf
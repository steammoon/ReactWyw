import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';
import HomeMenuConfBtn from '../home/home-menu-cinfig-btn';
import headimg from '../../img/github-fill-blue.png';
import ListBtnJson from '../../hw-list-btn.json';

class HomeMenuConf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            confstyle: {
                left: '404px'
            }
        }
    }

    confbtn(event) {
        let rt = document.getElementById("default1").offsetLeft + document.getElementById("default1").offsetWidth - document.getElementById("default2").offsetWidth - 16 + "PX";
        this.setState({
            show: !this.state.show,
            confstyle: {
                left: rt
            }
        })
    }


    componentDidMount() {
    }

    render() {
        return (
            <div
                id="default1"
                className="col-md-2 df1">
                <button
                    id="default2"
                    className="btn btn-default1"
                    type="button"
                    onClick={(event) => { this.confbtn(event) }}>
                    <img
                        className="ico"
                        src={headimg}
                        alt="head_logo"></img> {this.props.name}
                    <span
                        className="caret"></span>
                </button>
                <QueueAnim
                    className="demo-content"
                    key="demo"
                    type={['top']}
                    ease={['easeOutQuart', 'easeInOutQuart']}>
                    {this.state.show ? [
                        <div
                            id="userconf"
                            key="userconf"
                            style={this.state.confstyle}>
                            <ul>
                                {ListBtnJson.confmap.map((value, i) =>
                                    <HomeMenuConfBtn
                                        key={i}
                                        i={i}
                                        innervalue={value.value}
                                        link={value.link}
                                        code={value.code} />)
                                }
                            </ul>
                        </div>
                    ] : null}
                </QueueAnim>
            </div>
        );
    }
}

export default HomeMenuConf
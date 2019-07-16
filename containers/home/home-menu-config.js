import React, { Component } from 'react';
import { Modal, Button, Input } from 'antd';
import QueueAnim from 'rc-queue-anim';
import HomeMenuConfBtn from '../home/home-menu-cinfig-btn';
import Notify from '../common/notification';
import http from '../../http';
import headimg from '../../img/github-fill-blue.png';
import ListBtnJson from '../../hw-list-btn.json';

const url = {
    "GET_PSW": http.grobal + "HWUser/getwsw"
}

class HomeMenuConf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            loading: false,
            confstyle: {
                left: '404px'
            },
            originstyle: {
                marginBottom: "20px",
            },
            newstyle: {
                marginBottom: "20px",
            },
            visible: false,
            visible1: false,
            visible2: false,
            confirmLoading: false,
            openconf: false,
        }
    }

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ 
            visible: false,
            visible1: false,
            visible2: false, 
        });
    };
    handleOk1 = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible1: false });
        }, 3000);
    };

    handleCancel1 = () => {
        this.setState({ visible1: false });
    };
    handleOk2 = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible2: false });
        }, 3000);
    };

    handleCancel2 = () => {
        this.setState({ visible2: false });
    };

    confbtn(event) {
        let rt = document.getElementById("default1").offsetLeft + document.getElementById("default1").offsetWidth - document.getElementById("default2").offsetWidth - 16 + "PX";
        this.setState({
            show: !this.state.show,
            confstyle: {
                left: rt
            }
        })
    }

    callbackconf = (data) => {
        if (data.type === "cof1") {
            //个人设置
            this.setState({
                visible: true
            })
        }
        else if (data.type === "cof2") {
            //积分查询
            this.setState({
                visible1: true
            })
        }
        else if (data.type === "cof3") {
            //修改密码
            this.setState({
                visible2: true
            })
        }

    }
    //检查原密码
    async checkorigin(event) {
        if (event.target.value !== "") {
            var data = {
                psw: event.target.value
            }
            const res = await http.post(url.GET_PSW, data);
            if (!res.data) {
                this.setState({
                    originstyle: {
                        marginBottom: "20px",
                        border: "1px solid red",
                        borderRadius: "4px"
                    }
                })
                Notify.openNotification("密码错误！", "请重新检查你的密码");
            }
            else {
                this.setState({
                    originstyle: {
                        marginBottom: "20px",
                        border: "1px solid green",
                        borderRadius: "4px"
                    }
                })
            }
        }
    }
    //检查新密码
    checknew(event) {
        if (this.refs.psw3._reactInternalFiber.child.firstEffect.alternate.memoizedProps.value !== "") {
            console.log(this.refs.psw3._reactInternalFiber.child.firstEffect.alternate.memoizedProps.value);
            console.log(this.refs.psw2._reactInternalFiber.child.firstEffect.alternate.memoizedProps.value);
            if(this.refs.psw3._reactInternalFiber.child.firstEffect.alternate.memoizedProps.value !== this.refs.psw2._reactInternalFiber.child.firstEffect.alternate.memoizedProps.value){
                this.setState({
                    newstyle: {
                        marginBottom: "20px",
                        border: "1px solid red",
                        borderRadius: "4px"
                    }
                })
                Notify.openNotification("新密码输入不一致！","请重新检查你的密码");
            }
            else{
                this.setState({
                    newstyle: {
                        marginBottom: "20px",
                        border: "1px solid green",
                        borderRadius: "4px"
                    }
                })
            }
        }
    }

    render() {
        const { visible, visible1, visible2, loading } = this.state;
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
                        alt="head_logo"></img>
                    <p className="loginname">{this.props.name}</p>
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
                                        code={value.code}
                                        callbackconf={this.callbackconf} />)
                                }
                            </ul>
                        </div>
                    ] : null}
                </QueueAnim>
                <Modal
                    title="个人设置"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            返回
                        </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            提交
                        </Button>,
                    ]}
                >
                    <p>{this.state.ModalContent}</p>
                </Modal>
                <Modal
                    title="积分查询"
                    visible={visible1}
                    onOk={this.handleOk1}
                    onCancel={this.handleCancel1}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            返回
                        </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            确认
                        </Button>,
                    ]}
                >
                    <p>{this.state.ModalContent}</p>
                </Modal>
                <Modal
                    title="修改密码"
                    visible={visible2}
                    onOk={this.handleOk2}
                    onCancel={this.handleCancel2}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            返回
                        </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            修改
                        </Button>,
                    ]}
                >
                    <div>
                        <Input.Password
                            ref="psw1"
                            style={this.state.originstyle}
                            onBlur={(event) => { this.checkorigin(event) }}
                            onChange={this.psw1}
                            placeholder="原密码"
                            password />
                        <Input.Password
                            ref="psw2"
                            style={{ marginBottom: "20px" }}
                            onChange={this.psw2}
                            placeholder="新密码"
                            password />
                        <Input.Password
                            ref="psw3"
                            style={this.state.newstyle}
                            onBlur={(event) => { this.checknew(event) }}
                            onChange={this.psw3}
                            placeholder="确认密码"
                            password />
                    </div>
                </Modal>
            </div>
        );
    }
}

export default HomeMenuConf
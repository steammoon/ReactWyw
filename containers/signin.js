import React, { Component } from 'react';
import SigninByAC from './signin/signinByAC';
import SigninByWX from './signin/signinByWX';
import { Button } from 'antd';
//import { Route, Switch, Redirect , Link } from 'react-router-dom';
import '../css/signin.css';
import Context1 from './context/context1';
import QueueAnim from 'rc-queue-anim';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            wxstyle:{
                display:'block'
            },
            btnstyle:{
                position:'fixed',
                bottom:'100px',
                border:'none',
                width:'400px',
                color:'white',
                backgroundColor:'rgb(133,144,166)'
            }
            ,
            btnname : '账号密码登陆'
        }
    }

    showCode(event) {
        this.setState({
            show: !this.state.show,
            btnname : this.state.show?'账号密码登陆':'企业微信登陆',
            wxstyle : {
                display : (this.state.wxstyle.display==='none')?'block':'none'
            },
            btnstyle:{
                position:'fixed',
                bottom:'100px',
                border:'none',
                width:'400px',
                color:'white',
                backgroundColor: (this.state.btnstyle.backgroundColor === 'rgb(133,144,166)')?'#696969':'rgb(133,144,166)'
            }
        });
    }

    render() {
        return (
            <div className="sigin-body" >
                <Context1 />
                <div id="sigin-window">
                    <div id="sign-content">
                        
                        <QueueAnim className="demo-content"
                            key="demo1"
                            type={['bottom']}
                            ease={['easeOutQuart', 'easeInOutQuart']}>
                            {this.state.show ? [
                                <div key='loginWX1'>
                                    <SigninByAC />
                                </div>
                            ] : null}
                        </QueueAnim>
                        <SigninByWX wxstyle={this.state.wxstyle} />
                        <Button type="primary" style={this.state.btnstyle} onClick={(event) => { this.showCode(event) }}>{this.state.btnname}</Button>
                    </div>
                    <div className="container">
                    </div>
                </div>
            </div>
        );
    }
}

export default Signin;

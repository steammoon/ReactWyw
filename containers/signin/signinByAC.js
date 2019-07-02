import React from 'react';
import { Input, Button } from 'antd';
import http from '../../http';
import { Redirect } from 'react-router-dom';
//import $ from 'jquery';

const url = {
    "GET_DATA": 'HWlogin/psw'
}

class SigninByAC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            InputName: '',
            InputPassword: '',
            btnstyle: {
                color: 'white',
                backgroundColor: '#4169E1',
                border: 'none',
                width: '100%',
            }
        }
    }


    async login(event) {
        //async  await  异步执行标签
        var data = {
            name: this.state.InputName,
            password: this.state.InputPassword
        }
        try {
            const res = await http.post(url.GET_DATA, data);
            if (res.data !== "" && typeof (res.data) !== "undefined") {
                //window.location.href = "/Home";
                console.log("Login success");
                //this.context.router.history.push({ pathname:'/Home',state:{name : res.data.name ,token:'HW001' } })
                this.setState({ redirect: true });
            }
            else {
                alert("用户名或密码不正确！");
                console.log("Login fail");
                event.preventDefault();
            }
        } catch (error) {
            alert("未知错误！");
            console.log("Login fail,unknown");
            event.preventDefault();
        }

    }

    btnenter1() {
        this.setState({
            btnstyle: {
                backgroundColor: (this.state.btnstyle.backgroundColor === "#4169E1") ? '#191970' : '#4169E1',
                width: '100%',
                border: 'none',
            }
        })
    }

    btnleave1() {
        this.setState({
            btnstyle: {
                backgroundColor: (this.state.btnstyle.backgroundColor === "#4169E1") ? '#191970' : '#4169E1',
                width: '100%',
                border: 'none',
            }
        })
    }

    handleInputName(event) {
        this.setState({
            InputName: event.target.value
        })
    }

    handleInputPassword(event) {
        this.setState({
            InputPassword: event.target.value
        })
    }


    render() {
        //通过 react-router-dom 的 redirect 进行登录跳转并传递 state
        if (this.state.redirect) {
            return <Redirect push to={{ pathname: '/Home', state: { name: this.state.InputName } }} />;
        }
        return (
            <div className="sigininaccount">
                <Input
                    value={this.state.InputName}
                    onChange={(event) => { this.handleInputName(event) }}
                    style={{ 'marginBottom': '50px' }}
                    placeholder="请输入用户名" />
                <Input
                    value={this.state.InputPassword}
                    onChange={(event) => { this.handleInputPassword(event) }}
                    type="password"
                    style={{ 'marginBottom': '50px' }}
                    placeholder="请输入密码" />
                <Button
                    onMouseEnter={this.btnenter1.bind(this)}
                    onMouseLeave={this.btnleave1.bind(this)}
                    onClick={(event) => { this.login(event) }}
                    style={this.state.btnstyle}
                    type="primary">
                    登陆
                    </Button>
            </div>
        );
    }

}


export default SigninByAC;
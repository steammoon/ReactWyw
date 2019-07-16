import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomeMenuConfBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: this.props.code,
            btnstyle: {
                color: 'black',
                width: '120px'
            }

        }
    }

    confbtn1(event) {
        this.setState({
            btnstyle: {
                color: (this.state.btnstyle.color === "black") ? "rgba(18, 150, 219, 1)" : "black"
            }
        })
        if (this.props.code === "cof4") {
            event.preventDefault();
            window.location.href = "/";
        }
        else {
            var data = {
                type: this.state.code
            }
            this.props.callbackconf(data);
        }
    }

    btnenter(event) {
        this.setState({
            btnstyle: {
                color: "rgba(18, 150, 219, 1)",
                width: '120px'
            }
        })
    }

    btnleave(event) {
        this.setState({
            btnstyle: {
                color: "black",
                width: '120px'
            }
        })
    }

    render() {
        return (
            <li
                key={this.props.i}
                value={this.props.code}
                onMouseEnter={(event) => { this.btnenter(event) }}
                onMouseLeave={(event) => { this.btnleave(event) }}
                onClick={(event) => { this.confbtn1(event) }} >
                <a style={this.state.btnstyle}> {this.props.innervalue}</a>
            </li>
        );
    }

}

export default HomeMenuConfBtn;
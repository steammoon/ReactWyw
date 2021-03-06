import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListBtnJson from '../../hw-list-btn.json';

class HomeMenuBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openlist: false,
            btncode: null,
            locked: false,
            btnstyle: {
                color: 'black',
                backgroundColor: 'white'
            }
        }
    }

    menulistOpen(event) {
        let data = {};
        if (!this.state.openlist || this.props.curcode !== event.currentTarget.id) {
            data = {
                openlist: true,
                btncode: event.currentTarget.id,
                locked: true,
                ifclick: true
            };
            this.setState({
                openlist: true,
                btncode: event.currentTarget.id,
                locked: true,
                btnstyle: {
                    color: 'rgba(18, 150, 219, 1)'
                    //,backgroundColor: 'rgba(35, 35, 35,1)'
                }
            });
        }
        else {
            data = {
                openlist: false,
                btncode: event.currentTarget.id,
                locked: false,
                ifclick: false
            };
            this.setState({
                openlist: false,
                btncode: event.currentTarget.id,
                locked: false,
                btnstyle: {
                    color: 'black'
                    //,backgroundColor: 'black'
                }
            });
        }
        this.props.callbackMenu1(data);
    }

    btnenter(event) {
        /* if (!this.props.locked) {
            let data = {};
            data = {
                openlist: true,
                btncode: event.currentTarget.id,
                locked: false
            };
            this.props.callbackMenu1(data);
        }
        this.setState({
            btnstyle: {
                color: 'rgba(18, 150, 219, 1)'
                //,backgroundColor: 'rgba(35, 35, 35,1)'
            }
        }); */
    }

    btnleave(event) {
        /* let data = {};
        if (!this.state.locked) {
            if (!this.props.locked) {
                data = {
                    openlist: false,
                    btncode: event.currentTarget.id,
                    locked: false
                };
                this.props.callbackMenu1(data);
            }
            this.setState({
                btnstyle: {
                    color: 'black'
                    //,backgroundColor: 'black'
                }
            });
        } */
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.curcode !== this.state.btncode) {
            if (this.state.locked && nextProps.locked) {
                this.setState({
                    openlist: false,
                    btncode: event.currentTarget.id,
                    locked: false,
                    btnstyle: {
                        color: 'black'
                        //,backgroundColor: 'black'
                    }
                });
            }
        }
    }

    render() {
        let defaultlink = "";
        ListBtnJson.defaultCode.map((value, i) => {
            if (value.code === this.props.code) {
                defaultlink = value.link;
            }
            return i.id;
        })

        return (
            <div
                style={this.state.btnstyle}
                className="col-md-1 homemenuul"
                id={this.props.code}
                onMouseEnter={(event) => { this.btnenter(event) }}
                onMouseLeave={(event) => { this.btnleave(event) }}
                onClick={(event) => { this.menulistOpen(event) }}>
                <Link
                    style={this.state.btnstyle}
                    to={"/Home/" + this.props.code + "/1/" + defaultlink}
                >
                    {this.props.value}
                </Link>
            </div>
        );
    }
}

export default HomeMenuBtn;
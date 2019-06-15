import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomeListBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid : this.props.uid,
            locked:true,
            listbtnstyle: {
                color: 'white',
                backgroundColor: 'black'
            }
        }
    }

    listOpen(event) {
        this.setState({
            locked:true,
            listbtnstyle: {
                color: 'black',
                backgroundColor: 'white'
            }
        })
        this.props.callbacklist(this.props.uid);
    }

    btnenter(event) {
        this.setState({
            listbtnstyle: {
                color: 'black',
                backgroundColor: 'white'
            }
        })
    }

    btnleave(event) {
        if (!this.state.locked) {
            this.setState({
                listbtnstyle: {
                    color: 'white',
                    backgroundColor: 'black'
                }
            })
        }
    }

    componentDidMount(nextProps){
        if(this.props.uid === this.props.pageuid){
            this.setState({
                listbtnstyle: {
                    color: 'black',
                    backgroundColor: 'white '
                }
            })
        }
        
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.curuid !== this.state.uid) {
            this.setState({
                locked:false,
                listbtnstyle: {
                    color: 'white',
                    backgroundColor: 'black'
                }
            })
        }
    }

    render() {
        return (
            <li>
                <Link
                    style={this.state.listbtnstyle}
                    to={"/Home/" + this.props.uid + "/" + this.props.link}
                    id={this.props.curcode + "-" + this.props.i}
                    onClick={(event) => { this.listOpen(event) }}
                    onMouseEnter={(event) => { this.btnenter(event) }}
                    onMouseLeave={(event) => { this.btnleave(event) }}
                >
                    {this.props.value}
                </Link>
            </li>
        );
    }

}

export default HomeListBtn
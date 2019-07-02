import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { Icon, Tooltip } from 'antd';

class EntryTreeTitle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            keycode: this.props.keycode,
            name: this.props.name,
            content: this.props.content,
            iconstyle1: {
                position: "relative",
                top: "5px",
                float: "right",
                marginRight: "20px"
            },
            iconstyle2: {
                position: "relative",
                top: "5px",
                float: "right",
                marginRight: "20px"
            },
            iconstyle3: {
                position: "relative",
                top: "5px",
                float: "right",
                marginRight: "20px"
            }
        }
    }

    entrytitle1 = () => {
        this.setState({
            iconstyle1: {
                position: "relative",
                top: "5px",
                float: "right",
                marginRight: "20px",
                color: "red"
            }
        })

    }

    leavetitle1 = () => {
        this.setState({
            iconstyle1: {
                position: "relative",
                top: "5px",
                float: "right",
                marginRight: "20px",
                color: "rgb(98,98,98)"
            }
        })
    }

    entrytitle2 = () => {
        this.setState({
            iconstyle2: {
                position: "relative",
                top: "5px",
                float: "right",
                marginRight: "20px",
                color: "red"
            }
        })

    }

    leavetitle2 = () => {
        this.setState({
            iconstyle2: {
                position: "relative",
                top: "5px",
                float: "right",
                marginRight: "20px",
                color: "rgb(98,98,98)"
            }
        })
    }

    entrytitle3 = () => {
        this.setState({
            iconstyle3: {
                position: "relative",
                top: "5px",
                float: "right",
                marginRight: "20px",
                color: "red"
            }
        })

    }

    leavetitle3 = () => {
        this.setState({
            iconstyle3: {
                position: "relative",
                top: "5px",
                float: "right",
                marginRight: "20px",
                color: "rgb(98,98,98)"
            }
        })
    }

    clickplus(event) {
        var data = {
            key: this.state.keycode,
            type: "new"
        }
        this.props.callbackopen(data);
        //阻止父元素click事件
        event.stopPropagation();
    }

    clickedit(event) {
        var data = {
            key: this.state.keycode,
            content : this.state.content,
            title: this.state.name,
            type: "edit"
        }
        this.props.callbackopen(data);
        //阻止父元素click事件
        event.stopPropagation();
    }

    clickdel(event) {
        var data = {
            key: this.state.keycode,
            content : this.state.content,
            title: this.state.name,
            type: "del"
        }
        this.props.callbackopen(data);
        //阻止父元素click事件
        event.stopPropagation();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            keycode: nextProps.keycode,
            name: nextProps.name,
            content: nextProps.content
        })
    }

    render() {
        return (
            <div style={{ display: 'inline-block', width: "1000px" }}>
                <div style={{ float: "left" }}>
                    {this.props.name}
                </div>
                <QueueAnim
                    key="demo"
                    type={['left']}
                    ease={['easeOutQuart', 'easeInOutQuart']}>
                    {this.state.show ? [
                        <div key="showentrytreebtn">
                             <Tooltip title="删除目录">
                                <Icon
                                    onClick={(event) => { this.clickdel(event) }}
                                    onMouseEnter={this.entrytitle3}
                                    onMouseLeave={this.leavetitle3}
                                    style={this.state.iconstyle3}
                                    type="delete" />
                            </Tooltip>
                            <Tooltip title="新增目录">
                                <Icon
                                    onClick={(event) => { this.clickplus(event) }}
                                    onMouseEnter={this.entrytitle1}
                                    onMouseLeave={this.leavetitle1}
                                    style={this.state.iconstyle1}
                                    type="plus" />
                            </Tooltip>
                            <Tooltip title="编辑目录">
                                <Icon
                                    onClick={(event) => { this.clickedit(event) }}
                                    onMouseEnter={this.entrytitle2}
                                    onMouseLeave={this.leavetitle2}
                                    style={this.state.iconstyle2}
                                    type="edit" />
                            </Tooltip>
                        </div>
                    ] : null}
                </QueueAnim>
            </div>
        )
    }
}

export default EntryTreeTitle
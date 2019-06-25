import React, { Component } from 'react';
//import HomeListChird from './home-list-chird';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';
import HomeListBtn from './home-list-btn';
import ListBtnJson from '../../hw-list-btn.json';

//home导航条
class HomeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            openlist: props.openlist,
            btncode: props.btncode,
            locked: props.locked,
            intcode: 0,
            intlink: "TrainContext",
            HomeListCmp: "",
            curuid: "",
            curcode: "",
            currentlist: []
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.openlist || nextProps.autolocked) {
            let currentItem = [];
            let code1;
            ListBtnJson.data.map((value, i) => {
                if (value.code === nextProps.btncode) {
                    currentItem = value.msg;
                    code1 = i - 1;
                }
                return i.id
            });
            this.setState({
                show: true,
                currentlist: currentItem,
                intcode: code1
            });
        }
        else {
            this.setState({
                show: false
            });
        }
    }

    callbacklist = (data) =>{
        this.setState({
            curuid : data
        })
    }

    render() {
        return (
            <div className="queue-demo">
                <QueueAnim className="demo-content"
                    key="demo"
                    type={['left']}
                    ease={['easeOutQuart', 'easeInOutQuart']}>
                    {this.state.show ? [
                        <div key='mobile-menu' id="mobile-menu" className="mobile-nav visible-xs visible-sm" >
                            <ul>{
                                this.state.currentlist.map((value, i) =>
                                    <HomeListBtn
                                    value={value.value}
                                    key={i}
                                    uid={value.uid}
                                    link={value.link}
                                    curcode={this.state.curcode}
                                    callbacklist={this.callbacklist}
                                    curuid={this.state.curuid}
                                    pageuid={this.props.uid}
                                    />)}
                            </ul>
                        </div>
                    ] : null}
                </QueueAnim>
            </div>
        );
    }
}

HomeList.propTypes = {
    openlist: PropTypes.bool,
    btncode: PropTypes.string,
    locked: PropTypes.bool
};

HomeList.defaultProps = {
    openlist: false,
    btncode: null,
    locked: false
};

export default HomeList;
import React, { Component } from 'react';
//import HomeListChird from './home-list-chird';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim'

//home导航条
class HomeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            openlist: props.openlist,
            btncode: props.btncode,
            locked: props.locked,
            HomeListCmp: "",
            listItem: [{
                code: "btn1",
                value: ["", "发任务", "接任务", "做计划", "奖励"]
            },
            {
                code: "btn2",
                value: ["", "定制", "学习", "考核", "历史"]
            },
            {
                code: "btn3",
                value: ["", "客户", "运力", "交易", "驾驶舱"]
            },
            {
                code: "btn4",
                value: ["", "发帖", "板块", "文章", "留言"]
            },
            ],
            currentlist: []
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.openlist) {
            let currentItem = [];
            this.state.listItem.map((value,i) => {
                if (value.code === nextProps.btncode) {
                    currentItem = value.value;
                }
                return i.id
            });
            this.setState({
                show: true,
                currentlist: currentItem
            });
        }
        else {
            this.setState({
                show: false
            });
        }
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
                            <ul>{this.state.currentlist.map((value, i) => <li key={i}><a href="#">{value}</a></li> )}</ul>
                        </div>
                    ] : null}
                </QueueAnim>
            </div>
        );
    }
}



// 检查对象类型！！
HomeList.propTypes = {
    openlist: PropTypes.bool,
    btncode: PropTypes.string,
    locked: PropTypes.bool
};

//默认值设置
HomeList.defaultProps = {
    openlist: false,
    btncode: null,
    locked: false
};

export default HomeList;
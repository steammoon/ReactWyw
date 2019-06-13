import React, { Component } from 'react';
//import HomeListChird from './home-list-chird';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';
import {Link} from 'react-router-dom';

//home导航条
class HomeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            openlist: props.openlist,
            btncode: props.btncode,
            locked: props.locked,
            intcode : 0,
            intlink :"TrainContext",
            HomeListCmp: "",
            listItem: [{
                code: "btn1",
                msg : [{
                    uid : "",
                    link: "",
                    value : ""
                },
                {
                    uid : "btn1-1",
                    link: "",
                    value : "定制"
                },{
                    uid : "btn1-2",
                    link: "TrainContext",
                    value : "学习"
                },{
                    uid : "btn1-3",
                    link: "",
                    value : "考核"
                },{
                    uid : "btn1-4",
                    link: "",
                    value : "历史"
                }]
            },
            {
                code: "btn2",
                msg : [{
                    uid : "",
                    link: "",
                    value : ""
                },
                {
                    uid : "btn2-1",
                    link: "",
                    value : "发布"
                },{
                    uid : "btn2-2",
                    link: "DetailSwitchDemo",
                    value : "领取"
                },{
                    uid : "btn2-3",
                    link: "",
                    value : "结算"
                }]
            },
            {
                code: "btn3",
                msg : [{
                    uid : "",
                    link: "",
                    value : ""
                },
                {
                    uid : "btn3-1",
                    link: "",
                    value : "分类"
                },{
                    uid : "btn3-2",
                    link: "",
                    value : "使用记录"
                }]
            },
            {
                code: "btn4",
                msg : [{
                    uid : "",
                    link: "",
                    value : ""
                },
                {
                    uid : "btn4-1",
                    link: "",
                    value : "全部"
                },{
                    uid : "btn4-2",
                    link: "",
                    value : "未购买"
                },{
                    uid : "btn4-3",
                    link: "",
                    value : "已购买"
                },{
                    uid : "btn4-4",
                    link: "",
                    value : "购买记录"
                }]
            },
            {
                code: "btn5",
                msg : [{
                    uid : "",
                    link: "",
                    value : ""
                },
                {
                    uid : "btn5-1",
                    link: "",
                    value : "客户图谱"
                },{
                    uid : "btn5-2",
                    link: "",
                    value : "运力地图"
                },{
                    uid : "btn5-3",
                    link: "",
                    value : "交易曲线"
                },{
                    uid : "btn5-4",
                    link: "",
                    value : "决策驾驶舱"
                }]
            },
            ],
            curcode:"",
            currentlist: []
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.openlist) {
            let currentItem = [];
            let code1 ;
            this.state.listItem.map((value,i) => {
                if (value.code === nextProps.btncode) {
                    currentItem = value.msg;
                    code1 = i-1;
                }
                return i.id
            });
            this.setState({
                show: true,
                currentlist: currentItem,
                intcode : code1
            });
        }
        else {
            this.setState({
                show: false
            });
        }
    }

    listOpen(event){
        //alert(this.state.listItem[this.state.intcode].link[2]);
        //alert(event.target.id);
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
                            <ul>{this.state.currentlist.map((value, i) => <li key={i}><Link to={"/Home/"+value.link} id={this.state.curcode+"-"+i} onClick={(event) => {this.listOpen(event)}}>{value.value}</Link></li> )}</ul>
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
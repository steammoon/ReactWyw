import React from 'react';
import { Button } from 'antd';
import QueueAnim from 'rc-queue-anim';
//import { Element, scrollScreen } from 'rc-scroll-anim';
import Gamer from '../game/gamer';
import Notify from '../../../common/notification';
import '../../../../css/extra.css';
import angel from '../../../../img/angel.png';
import chen from '../../../../img/chen.png';
import amiya from '../../../../img/amiya.png';

import sniper from '../../../../img/icon_profession_sniper_large.png';
import warrior from '../../../../img/icon_profession_warrior_large.png';
import caster from '../../../../img/icon_profession_caster_large.png';

import playimg from '../../../../img/angle-model.png';

class FlyBird extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            show1: false,
            showgamer1: false,
            showgamer2: false,
            showgamer3: false,
            start: false,
            gamer1style: {
                width: '400px',
                height: '400px',
                position: 'absolute',
                cursor: 'pointer',
                zIndex: '18'
            },
            gamer2style: {
                width: '400px',
                height: '400px',
                position: 'absolute',
                cursor: 'pointer',
                zIndex: '18'
            },
            gamer3style: {
                width: '400px',
                height: '400px',
                position: 'absolute',
                cursor: 'pointer',
                zIndex: '18'
            },
            player: {
                top: '100px',
                left: '200px',
            }
        }
    }

    componentWillMount(){
        console.log("555");
        document.addEventListener('gamekey',function(e){
            console.log("哈哈哈哈哈",e);
        })
        console.log("666");
    }

    componentDidMount() {
        Notify.openNotification("指令输入成功！", "你发现了一个隐藏游戏！");
    }


    flygamebegin = () => {
        this.setState({
            show: false,
            show1: true,
        })
        Notify.openNotification("选择角色", "选择一个角色开始游戏！");
    }

    Clickgamer1 = () => {
        this.setState({
            showgamer1: true,
            gamer1style: {
                top: '-100px',
                left: '-200px',
                width: '600px',
                height: '600px',
                cursor: 'pointer',
                position: 'absolute',
                zIndex: '22'
            },
            gamer2style: {
                display: 'none'
            },
            gamer3style: {
                display: 'none'
            }
        })
    }

    Click1 = () => {
        this.setState({
            showgamer1: false,
            gamer1style: {
                width: '400px',
                height: '400px',
                position: 'absolute',
                cursor: 'pointer',
                zIndex: '18'
            },
            gamer2style: {
                width: '400px',
                height: '400px',
                position: 'absolute',
                cursor: 'pointer',
                zIndex: '18'
            },
            gamer3style: {
                width: '400px',
                height: '400px',
                position: 'absolute',
                cursor: 'pointer',
                zIndex: '18'
            }
        })
    }

    Clickgamer2 = () => {
        this.setState({
            showgamer2: true,
            gamer1style: {
                display: 'none'
            },
            gamer2style: {
                top: '-100px',
                left: '-600px',
                width: '600px',
                height: '600px',
                cursor: 'pointer',
                position: 'absolute',
                zIndex: '22'
            },
            gamer3style: {
                display: 'none'
            }
        })
    }

    Click2 = () => {
        this.setState({
            showgamer2: false,
            gamer1style: {
                width: '400px',
                height: '400px',
                position: 'absolute',
                cursor: 'pointer',
                zIndex: '18'
            },
            gamer2style: {
                width: '400px',
                height: '400px',
                position: 'absolute',
                cursor: 'pointer',
                zIndex: '18'
            },
            gamer3style: {
                width: '400px',
                height: '400px',
                position: 'absolute',
                cursor: 'pointer',
                zIndex: '18'
            }
        })
    }

    Clickgamer3 = () => {
        this.setState({
            showgamer3: true,
            gamer1style: {
                display: 'none'
            },
            gamer2style: {
                display: 'none'
            },
            gamer3style: {
                top: '-100px',
                left: '-1000px',
                width: '600px',
                height: '600px',
                cursor: 'pointer',
                position: 'absolute',
                zIndex: '22'
            }
        })
    }

    Click3 = () => {
        this.setState({
            showgamer3: false,
            gamer1style: {
                width: '400px',
                height: '400px',
                position: 'absolute',
                cursor: 'pointer',
                zIndex: '18'
            },
            gamer2style: {
                width: '400px',
                height: '400px',
                position: 'absolute',
                cursor: 'pointer',
                zIndex: '18'
            },
            gamer3style: {
                width: '400px',
                height: '400px',
                position: 'absolute',
                cursor: 'pointer',
                zIndex: '18'
            }
        })
    }

    gamestart = () => {
        this.setState({
            show1: false,
            showgamer1: false,
            showgamer2: false,
            showgamer3: false,
            start: true,
        })
    }

    render() {
        return (
            <div className="game-body"  >
                <QueueAnim
                    key="demo"
                    type={['top']}
                    ease={['easeOutQuart', 'easeInOutQuart']}>
                    {this.state.show ? [
                        <div className="gamebtn" key="gamebtn">
                            <Button
                                style={{ width: "200px", height: "60px", fontSize: "16px", fontWeight: "700" }}
                                type="dashed"
                                onClick={this.flygamebegin}
                                ghost
                            >开始游戏
                            </Button>
                        </div>
                    ] : null}
                </QueueAnim>
                <QueueAnim
                    key="demo1"
                    type={['top']}
                    ease={['easeOutQuart', 'easeInOutQuart']}>
                    {this.state.show1 ? [
                        <div className="gamer-background" key="gamebtn1">
                            <div className="gamer-contain1">
                                <img className="gamer1" style={this.state.gamer1style} onClick={this.Clickgamer1} src={angel} alt="能天使" />
                                <QueueAnim
                                    key="gamer1"
                                    type={['left']}
                                    ease={['easeOutQuart', 'easeInOutQuart']}>
                                    {this.state.showgamer1 ? [
                                        <div key="gamer1" style={{ zIndex: "20", position: "fixed" }}>
                                            <div className="character-pc-detail" style={{ paddingLeft: "9%" }}>
                                                <div className="character-pc-name">
                                                    <h1 className="character-pc-name-c" style={{ color: "white", fontSize: "38px", fontWeight: "700" }}>能天使</h1>
                                                    <h2 className="character-pc-name-e" style={{ color: "white", fontSize: "34px", fontWeight: "500", lineHeight: "0px" }}>EXUSIA</h2>
                                                </div>
                                                <div className="character-pc-description" style={{ zIndex: "20", paddingTop: "20px" }}>
                                                    能天使，拉特兰公民。企鹅物流公司成员。从事秘密联络，武装押运等非公开活动，推测身份：信使。于合约期内任企鹅快递驻罗德岛联络人员，同时为罗德岛多项行动提供协助。
                                                </div>
                                                <a title="返回" onClick={this.Click1} className="character-pc-close" style={{ zIndex: "20", position: "relative", left: "55px", top: "-210px", fontWeight: "700", fontSize: "24px", borderColor: "white", textDecoration: "none", cursor: "pointer", color: "white" }}>✖</a>
                                            </div>

                                            <div className="character-pc-type-wrapper" style={{ paddingLeft: "1%", width: "400px", height: "100px", left: "50px", position: "relative", zIndex: "21" }}>
                                                <div className="character-pc-type character-pc-type-3" style={{ fontFamily: "Times New Roman", width: "430px", height: "100px", position: "relative", top: "-50px", lineHeight: "200px", textAlign: "center", fontWeight: "700", zIndex: "21", letterSpacing: "6px" }}>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sinper
                                                </div>
                                                <img src={sniper} style={{ width: "60px", height: "60px", position: "relative", top: "-80px", left: "336px", zIndex: "21" }} alt="狙击" />
                                                <Button type="primary" onClick={this.gamestart} style={{ width: "100px", height: "60px", position: "relative", top: "260px", left: "856px", zIndex: "22" }} ghost>开始游戏</Button>
                                            </div>


                                        </div>
                                    ] : null}
                                </QueueAnim>
                            </div>
                            <div className="gamer-contain2">
                                <img className="gamer2" style={this.state.gamer2style} onClick={this.Clickgamer2} src={chen} alt="陈" />
                                <QueueAnim
                                    key="gamer2"
                                    type={['left']}
                                    ease={['easeOutQuart', 'easeInOutQuart']}>
                                    {this.state.showgamer2 ? [
                                        <div key="gamer2" style={{ zIndex: "20", position: "relative", left: "-400px" }}>
                                            <div className="character-pc-detail" style={{ paddingLeft: "9%", width: "1000px", height: "400px", zIndex: "20", textAlign: "right", color: "white" }}>
                                                <div className="character-pc-name">
                                                    <h1 className="character-pc-name-c" style={{ color: "white", fontSize: "38px", fontWeight: "700" }}>陈</h1>
                                                    <h2 className="character-pc-name-e" style={{ color: "white", fontSize: "34px", fontWeight: "500", lineHeight: "0px" }}>CHEN</h2>
                                                </div>
                                                <div className="character-pc-description" style={{ zIndex: "20", paddingTop: "20px" }}>
                                                    陈，龙门近卫局督察组组长。在龙门近卫局服役期间，力主取缔龙门境内非法活动、有组织犯罪等，取得了明显的成效。现作为特别合作人员协助罗德岛行动，并为现场提供战术指挥支援。
                                                </div>
                                                <a title="返回" onClick={this.Click2} className="character-pc-close" style={{ zIndex: "20", position: "relative", left: "55px", top: "-210px", fontWeight: "700", fontSize: "24px", borderColor: "white", textDecoration: "none", cursor: "pointer", color: "white" }}>✖</a>
                                            </div>

                                            <div className="character-pc-type-wrapper" style={{ paddingLeft: "1%", width: "400px", height: "100px", left: "50px", position: "relative", zIndex: "21" }}>
                                                <div className="character-pc-type character-pc-type-3" style={{ width: "430px", height: "100px", position: "relative", top: "-50px", lineHeight: "200px", textAlign: "center", fontWeight: "700", zIndex: "21", letterSpacing: "6px" }}>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;warrior
                                                </div>
                                                <img src={warrior} style={{ width: "60px", height: "60px", position: "relative", top: "-80px", left: "336px", zIndex: "21" }} alt="狙击" />
                                                <Button type="primary" onClick={this.gamestart} style={{ width: "100px", height: "60px", position: "relative", top: "260px", left: "856px", zIndex: "22" }} ghost>开始游戏</Button>
                                            </div>
                                        </div>
                                    ] : null}
                                </QueueAnim>
                            </div>
                            <div className="gamer-contain3">
                                <img className="gamer3" style={this.state.gamer3style} onClick={this.Clickgamer3} src={amiya} alt="阿米娅" />
                                <QueueAnim
                                    key="gamer3"
                                    type={['left']}
                                    ease={['easeOutQuart', 'easeInOutQuart']}>
                                    {this.state.showgamer3 ? [
                                        <div key="gamer3" style={{ zIndex: "20", position: "relative", left: "-800px" }}>
                                            <div className="character-pc-detail" style={{ paddingLeft: "9%", width: "1000px", height: "400px", zIndex: "20", textAlign: "right", color: "white" }}>
                                                <div className="character-pc-name">
                                                    <h1 className="character-pc-name-c" style={{ color: "white", fontSize: "38px", fontWeight: "700" }}>阿米亚</h1>
                                                    <h2 className="character-pc-name-e" style={{ color: "white", fontSize: "34px", fontWeight: "500", lineHeight: "0px" }}>AMIYA</h2>
                                                </div>
                                                <div className="character-pc-description" style={{ zIndex: "20", paddingTop: "20px" }}>
                                                    阿米亚,罗德岛公开领导人
                                                </div>
                                                <a title="返回" onClick={this.Click3} className="character-pc-close" style={{ zIndex: "20", position: "relative", left: "55px", top: "-210px", fontWeight: "700", fontSize: "24px", borderColor: "white", textDecoration: "none", cursor: "pointer", color: "white" }}>✖</a>
                                            </div>

                                            <div className="character-pc-type-wrapper" style={{ paddingLeft: "1%", width: "400px", height: "100px", left: "50px", position: "relative", zIndex: "21" }}>
                                                <div className="character-pc-type character-pc-type-3" style={{ width: "430px", height: "100px", position: "relative", top: "-50px", lineHeight: "200px", textAlign: "center", fontWeight: "700", zIndex: "21", letterSpacing: "6px" }}>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;caster
                                                </div>
                                                <img src={caster} style={{ width: "60px", height: "60px", position: "relative", top: "-80px", left: "336px", zIndex: "21" }} alt="狙击" />
                                                <Button type="primary" onClick={this.gamestart} style={{ width: "100px", height: "60px", position: "relative", top: "260px", left: "856px", zIndex: "22" }} ghost>开始游戏</Button>
                                            </div>
                                        </div>
                                    ] : null}
                                </QueueAnim>
                            </div>
                        </div>
                    ] : null}
                </QueueAnim>

                <div className="fly-background" key="gamer3" >
                    <QueueAnim
                        key="gamer3"
                        type={['left']}
                        ease={['easeOutQuart', 'easeInOutQuart']}>
                        {this.state.start ? [
                            <div key="start" >
                                <img
                                    src={playimg}
                                    style={{ position:"absolute",height: "70px", width: "60px", left: this.state.player.left, top:this.state.player.top }}
                                    alt="player"
                                />
                                <Gamer key="gamer" />
                            </div>
                        ] : null}
                    </QueueAnim>
                </div>

            </div>
        )
    }

}

export default FlyBird
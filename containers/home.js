import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import HomeMenu from './home/home-menu';
import HomeList from './home/home-list';
import Context from './context/context';
import Carousel from './context/Carousel';
import TrainContext from './context/btn1/train-context';
import TrainUpload from './context/btn1/train-upload';
import TrainHistory from './context/btn1/train-history';
import TrainExam from './context/btn1/train-exam';
import TaskPublish from './context/btn2/task-publish';
import TaskGet from './context/btn2/task-get';
import TaskSettle from './context/btn2/task-settle';
import AppClass from './context/btn3/app-class';
import AppRecord from './context/btn3/app-record';
import Market from './context/btn4/market';
import MarketUnPurchased from './context/btn4/market-unpurchase';
import MarketPurchased from './context/btn4/market-purchased';
import MarketRecord from './context/btn4/market-record';
import Customer from './context/btn5/customer';
import Transport from './context/btn5/transport';
import Business from './context/btn5/business';
import Cockpit from './context/btn5/cockpit';
import Entry from './context/btn6/Entry';
import { Layout } from 'antd';
import { Route, Switch, Redirect } from 'react-router-dom';
import Notify from '../containers/common/notification';
import Blank from './context/blank';
import FlyBird from './context/extra/game/flybird';
import listener from './common/KeyListener';
import '../css/home.css'

const { Header, Footer, Content } = Layout;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "huangw",
            openlist: false,
            btncode: null,
            uid: null,
            locked: false,
            autolocked: false,
            keycode_now: "38",
            keycode_pre: "",
            IFlistener : false
        }
    }

    menulistOpen = (data) => {
        this.setState({
            openlist: data.openlist,
            btncode: data.btncode,
            locked: data.locked
        });
    };

    componentDidMount(nextProps) {
        let routepath = this.props.location.pathname;
        let pathlen = routepath.length;
        let routepath1 = routepath.substring(6, 10);
        let routepath2 = routepath.substring(6, 12);
        let param1 = false;
        let param2 = null;
        let param3 = null;
        let param4 = false;
        let param5 = false;
        if (pathlen > 13) {
            param1 = true;
            param2 = routepath1;
            param3 = routepath2;
            param4 = true;
            param5 = true;
        }
        this.setState({
            openlist: param1,
            btncode: param2,
            uid: param3,
            locked: param4,
            autolocked: param5
        })
        window.addEventListener("keydown", this.onKeyDown);
    }

    //输入指令 上上下下左左右右
    onKeyDown = (e) => {
        let res = listener.homelistener(this.props.location.pathname,e.keyCode,this.state.keycode_now,this.state.keycode_pre);
        if(res.type === "game"){
            this.setState({
                keycode_now: res.keycode_now,
                keycode_pre: res.keycode_pre,
                IFlistener: res.IFlistener
            })
            if(res.IFlistener === true){
                window.removeEventListener("keydown", this.onKeyDown);
                window.location.href = "/Home/extra/flybird";
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        let routepath = nextProps.location.pathname;
        let pathlen = routepath.length;
        let routepath1 = routepath.substring(6, 10);
        let routepath2 = routepath.substring(6, 12);
        let param1 = false;
        let param2 = null;
        let param3 = null;
        let param4 = false;
        let param5 = false;
        if (pathlen > 13) {
            param1 = true;
            param2 = routepath1;
            param3 = routepath2;
            param4 = true;
            param5 = true;
        }
        this.setState({
            openlist: param1,
            btncode: param2,
            uid: param3,
            locked: param4,
            autolocked: param5
        })
    }

    componentWillMount() {
        if (typeof this.props.location.state !== "undefined") {
            this.setState({
                name: this.props.location.state.name
            })
            Notify.openNotification("登陆成功", "欢迎回来," + this.props.location.state.name);
        }
    }

    render() {
        if (typeof this.state.name === "undefined" || this.state.name === null) {
            return <Redirect push to="/" />;
        }
        return (
            <div id="Home">
                <Layout>
                    <Header>
                        <HomeMenu
                            callbackMenu={this.menulistOpen}
                            name={this.state.name}
                        />
                    </Header>
                    <Layout>
                        <Content>
                            <HomeList
                                openlist={this.state.openlist}
                                btncode={this.state.btncode}
                                uid={this.state.uid}
                                locked={this.state.locked}
                                autolocked={this.state.autolocked}
                            />
                            <Switch>
                                <Route exact path="/Home" component={Carousel} />
                                {/*btn1 - 培训*/}
                                <Route path="/Home/btn1/1/TrainUpload" component={TrainUpload} />
                                <Route path="/Home/btn1/2/TrainContext" component={TrainContext} />
                                <Route path="/Home/btn1/3/TrainExam" component={TrainExam} />
                                <Route path="/Home/btn1/4/TrainHistory" component={TrainHistory} />
                                {/*btn2 - 任务*/}
                                <Route path="/Home/btn2/1/TaskPublish" component={TaskPublish} />
                                <Route path="/Home/btn2/2/TaskGet" component={TaskGet} />
                                <Route path="/Home/btn2/3/TaskSettle" component={TaskSettle} />
                                {/*btn3 - 应用*/}
                                <Route path="/Home/btn3/1/AppClass" component={AppClass} />
                                <Route path="/Home/btn3/2/AppRecord" component={AppRecord} />
                                {/*btn4 - 市场*/}
                                <Route path="/Home/btn4/1/Market" component={Market} />
                                <Route path="/Home/btn4/2/MarketUnPurchased" component={MarketUnPurchased} />
                                <Route path="/Home/btn4/3/MarketPurchased" component={MarketPurchased} />
                                <Route path="/Home/btn4/4/MarketRecord" component={MarketRecord} />
                                {/*btn5 - 数据*/}
                                <Route path="/Home/btn5/1/Customer" component={Customer} />
                                <Route path="/Home/btn5/2/Transport" component={Transport} />
                                <Route path="/Home/btn5/3/Business" component={Business} />
                                <Route path="/Home/btn5/4/Cockpit" component={Cockpit} />
                                {/*btn6 - 知识*/}
                                <Route path="/Home/btn6/1/Entry" component={Entry} />
                                {/*extra */}
                                <Route path="/Home/extra/flybird" component={FlyBird} />
                                <Route render={() => <Redirect to="/Home" />} />
                            </Switch>
                        </Content>
                    </Layout>
                    <Footer>
                        <Switch>
                            <Route exact path="/Home" component={Context} />
                            {/*btn1 - 培训*/}
                            <Route path="/Home/btn1/1/TrainUpload" component={Blank} />
                            <Route path="/Home/btn1/2/TrainContext" component={Blank} />
                            <Route path="/Home/btn1/3/TrainExam" component={Blank} />
                            <Route path="/Home/btn1/4/TrainHistory" component={Blank} />
                            {/*btn2 - 任务*/}
                            <Route path="/Home/btn2/1/TaskPublish" component={Blank} />
                            <Route path="/Home/btn2/2/TaskGet" component={Blank} />
                            <Route path="/Home/btn2/3/TaskSettle" component={Blank} />
                            {/*btn3 - 应用*/}
                            <Route path="/Home/btn3/1/AppClass" component={Blank} />
                            <Route path="/Home/btn3/2/AppRecord" component={Blank} />
                            {/*btn4 - 市场*/}
                            <Route path="/Home/btn4/1/Market" component={Blank} />
                            <Route path="/Home/btn4/2/MarketUnPurchased" component={Blank} />
                            <Route path="/Home/btn4/3/MarketPurchased" component={Blank} />
                            <Route path="/Home/btn4/4/MarketRecord" component={Blank} />
                            {/*btn5 - 数据*/}
                            <Route path="/Home/btn5/1/Customer" component={Blank} />
                            <Route path="/Home/btn5/2/Transport" component={Blank} />
                            <Route path="/Home/btn5/3/Business" component={Blank} />
                            <Route path="/Home/btn5/4/Cockpit" component={Blank} />
                            {/*btn6 - 知识*/}
                            <Route path="/Home/btn6/1/Entry" component={Blank} />
                            {/*extra */}
                            <Route path="/Home/extra/flybird" component={Blank} />
                            <Route render={() => <Redirect to="/Home" />} />
                        </Switch>
                    </Footer>
                </Layout>
            </div>

        );
    }
}


export default Home;

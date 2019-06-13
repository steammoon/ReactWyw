import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import HomeMenu from './home/home-menu';
import HomeList from './home/home-list';
import Context from './context/context';
import Carousel from './context/Carousel';
import PicDetailsDemo from './context/btn1/train-context';
import DetailSwitchDemo from './context/btn2/task-get';
import { Layout } from 'antd';
import { Route, Switch, Redirect } from 'react-router-dom';
import Blank from './context/blank'

const { Header, Footer, Sider, Content } = Layout;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openlist: false,
            btncode: null,
            locked: false
        }
    }

    menulistOpen = (data) => {
        this.setState({
            openlist: data.openlist,
            btncode: data.btncode,
            locked: data.locked
        });
    };

    componentDidUpdate(prevProps, prevState) {
    }

    render() {
        return (
            <div id="Home">
                <Layout>
                    <Header>
                        <HomeMenu
                            callbackMenu={this.menulistOpen}
                        />
                    </Header>
                    <Layout>
                        <Sider>
                            <HomeList
                                openlist={this.state.openlist}
                                btncode={this.state.btncode}
                                locked={this.state.locked}
                            />
                        </Sider>
                        <Content>
                            <Switch>
                                <Route exact path="/" component={Carousel} />
                                <Route path="/Home/TrainContext" component={PicDetailsDemo} />
                                <Route path="/Home/DetailSwitchDemo" component={DetailSwitchDemo} />
                                {/*路由不正确时，默认跳回home页面*/}
                                <Route render={() => <Redirect to="/" />} />
                            </Switch>
                        </Content>
                    </Layout>
                    <Footer>
                        <Switch>
                            <Route exact path="/" component={Context} />
                            <Route path="/Home/TrainContext" component={Blank} />
                            <Route path="/Home/DetailSwitchDemo" component={Blank} />
                            {/*路由不正确时，默认跳回home页面*/}
                            <Route render={() => <Redirect to="/" />} />
                        </Switch>
                    </Footer>
                </Layout>
            </div>

        );
    }
}


export default Home;

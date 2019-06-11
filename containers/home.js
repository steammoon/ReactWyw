import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import HomeMenu from './home/home-menu';
import HomeList from './home/home-list';
import Context from './context/context';
import Carousel from './context/Carousel';
import { Layout } from 'antd';

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
                            <Carousel />
                        </Content>
                    </Layout>
                    <Footer>
                        <Context />
                    </Footer>
                </Layout>
            </div>

        );
    }
}

export default Home;

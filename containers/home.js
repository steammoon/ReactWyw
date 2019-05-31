import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HomeMenu from './home/home-menu';

class Home extends Component {
    render() {
        return (
            <div id="Home">
                <HomeMenu />
                <div id="home-container">
                    {/*search,state可以自定义，获取方法：this.props.location.search，this.props.location.state*/}
                    <Link to={{ pathname: '/signin', search: '?name=homename', state: { mold: 'add' }, aa: 'dddd' }} className="home-link">
                        点击跳转到测试页面
                            </Link>
                </div>
            </div>

        );
    }
}

export default Home;

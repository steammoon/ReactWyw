import React, { Component } from 'react';

//home导航条
class HomeListChird extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div>
                <div id="mobile-menu" className="mobile-nav visible-xs visible-sm">
                    <ul>
                         <li><a href="#"></a></li>
                        <li><a href="#">首页</a></li>
                        <li><a href="#">Java</a></li>
                        <li><a href="#">SVN</a></li>
                        <li><a href="#">iOS</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default HomeListChird;
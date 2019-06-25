import React, { Component } from 'react';
import { Carousel } from 'antd';
import { Icon } from 'antd';
import '../../../css/train-history.css';

function onChange(a, b, c) {
    console.log(a, b, c);
}

class TrainHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="context-body">
                <Carousel afterChange={onChange}>
                    <div className="tab-cute">
                        <div>
                            < Icon type="chrome"/>
                        </div>
                    </div>
                    <div className="tab-cute">
                        <div>2</div>
                    </div>
                    <div className="tab-cute">
                        <div>3</div>
                    </div>
                    <div className="tab-cute">
                        <div>4</div>
                    </div>
                </Carousel>
            </div>
        );
    }
}

export default TrainHistory
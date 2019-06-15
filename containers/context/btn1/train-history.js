import React, { Component } from 'react';
import { Carousel } from 'antd';
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
                        <h3>1</h3>
                    </div>
                    <div className="tab-cute">
                        <h3>2</h3>
                    </div>
                    <div className="tab-cute">
                        <h3>3</h3>
                    </div>
                    <div className="tab-cute">
                        <h3>4</h3>
                    </div>
                </Carousel>
            </div>
        );
    }
}

export default TrainHistory
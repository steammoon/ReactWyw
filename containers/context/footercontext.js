import React, { Component } from 'react';
import { Statistic, Row } from 'antd';
import '../../css/footercontext.css';

const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

class FooterContext extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="footextra">
                <div className="CD">
                    <Row gutter={16}>
                        <Statistic title="Active Users" value={112893} />
                        <Countdown title="Million Seconds" value={deadline} format="HH:mm:ss:SSS" />
                    </Row>
                </div>
            </div>
        )
    }
}

export default FooterContext
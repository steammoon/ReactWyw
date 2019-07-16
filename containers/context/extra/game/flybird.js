import React from 'react';
import { Button } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { Element,scrollScreen } from 'rc-scroll-anim';
import Notify from '../../../common/notification';
import '../../../../css/extra.css';

const vars = { }

class FlyBird extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
        }
    }

    componentDidMount() {
        Notify.openNotification("疯狂的小鸟", "你发现了一个隐藏游戏！");
        scrollScreen.init(vars);
    }

    flygamebegin = () => {
        this.setState({
            show: false,
        })
    }

    render() {
        return (
            <div className="game-body">
                <QueueAnim
                    key="demo"
                    type={['top']}
                    ease={['easeOutQuart', 'easeInOutQuart']}>
                    {this.state.show ? [
                        <div className="gamebtn">
                            <Button
                                style={{ width: "200px", height: "60px" }}
                                type="dashed"
                                onClick={this.flygamebegin}
                            >开始游戏
                            </Button>
                        </div>
                    ] : null}
                </QueueAnim>
                <div className="fly-background">
                    <Element className="pack-page">
                        <div>demo</div>
                    </Element>
                </div>
            </div>
        )
    }

}

export default FlyBird
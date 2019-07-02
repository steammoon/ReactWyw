import React, { Component } from 'react';
import { Tabs, Steps, Icon } from 'antd';
import TrainUpload1 from './train-upload-1';
import TrainUpload2 from './train-upload-2';
import '../../../css/train-upload.css';

//const Dragger = Upload.Dragger;


const { Step } = Steps;
const { TabPane } = Tabs;

class TrainUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            status: 1,
        }
    }

    render() {
        return (
            <div className="context-body">
                <div className="step-tab">
                    <Steps current={this.state.status}>
                        <Step title="上传" description="上传你的培训文件" />
                        <Step title="内容" description="完善你的培训内容" />
                        <Step title="发布" description="发布新的培训！" />
                    </Steps>
                </div>
                <Tabs
                    tabBarStyle={{ width: "100%", marginTop: "20px" }}
                    defaultActiveKey="1">
                    <TabPane
                        tab={
                            <span>
                                <Icon type="upload" />
                                上传资料
                            </span>
                        }
                        key="1"
                    >
                        <TrainUpload1 />
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                                <Icon type="edit" />
                                培训内容
                            </span>
                        }
                        key="2"
                    >
                        <TrainUpload2 />
                    </TabPane>
                </Tabs>
            </div>
        );
    }

}

export default TrainUpload
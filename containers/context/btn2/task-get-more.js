import React, { Component } from 'react';
import { Modal, Button } from 'antd';

class TaskGetMore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            modal2Visible: false,
            title: null,
            describe: null,
            createdby: null,
            createdon: null
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.openmore !== this.props.openmore && newProps.openmore) {
            this.setState({
                visible: newProps.openmore,
                title: newProps.curitem.title,
                describe : newProps.curitem.describe,
                createdby : newProps.curitem.createdby,
                createdon : newProps.curitem.createdon
            })
        }

    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        var data = {
            openmore: false
        }
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({
                loading: false,
                visible: false
            });
        }, 3000);
        this.props.callbackstate(data);
    };

    handleCancel = () => {
        var data = {
            openmore: false
        }
        this.setState({
            visible: false
        });
        this.props.callbackstate(data);
    };


    render() {
        const { visible, loading } = this.state;
        return (
            <div>
                <Modal 
                    width="1000px"
                    bodyStyle={{}}
                    title={this.state.title}
                    centered
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button
                            key="back"
                            onClick={this.handleCancel}>
                            返回
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            loading={loading}
                            onClick={this.handleOk}>
                            领取
                        </Button>,
                    ]}
                >
                    <div>任务描述：<br></br><pre style={{fontFamily:"微软雅黑",height:"300px"}}>{this.state.describe}</pre></div>
                    <p>发布人：{this.state.createdby}</p>
                    <p>发布日期：{this.state.createdon}</p>
                </Modal>
            </div>
        )
    }
}

export default TaskGetMore
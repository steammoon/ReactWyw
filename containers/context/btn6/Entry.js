import React from 'react';
import { Icon, Input, Tooltip, Tag, Drawer, Button, Modal, notification } from 'antd';
import NewEntry from '../btn6/NewEntry';
import '../../../css/entry.css';

//提醒通知
const openNotification = (str) => {
    notification.open({
        message: str+'不能为空！！',
        description:
            '你需要完善资料来建立预览',
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
    });
};

class Entry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            visible1: false,
            getdata: false,
            prelist: {
                list: "",
                name: "",
                othername: "",
                engname: "",
                taglist: [],
            }
        }
    }

    //搜索框变动时，请求新的数据list
    async loadagain(event) {

    }

    hideModal = () => {
        this.setState({
            visible1: false,
        });
    };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    //创建词条,发送请求
    onCreated = () => {
        this.setState({
            visible: false,
        });
    }

    //回调函数获取 data & 在此函数内做校验
    checkEntry = (data) => {
        if (typeof data.name === "undefined") {
            openNotification("词条名");
        }
        else if(data.taglist === ""){
            openNotification("标签");
        }
        else if(typeof data.engname === "undefined"){
            openNotification("英文名");
        }
        else {
            this.setState({
                visible1: true,
                prelist: data
            });
        }

        console.log("3333", data)
    };

    //词条预览函数
    previewEntry = () => {
        this.setState({
            getdata: this.state.getdata ? false : true
        });
    }


    render() {
        return (
            <div className="context-body">
                <div className="search-tab">
                    <Icon
                        type="search"
                        style={{ position: 'absolute', top: '20px', left: '60px', height: '40px', width: '40px', color: 'rgb(225,226,227)' }} />
                    <Input
                        onChange={(event) => { this.loadagain(event) }}
                        style={{ position: 'absolute', top: '10px', left: '100px', height: '40px', border: '0', width: '600px', outline: 'medium' }}
                        placeholder="搜索词条" />
                    <Tag
                        color="#108ee9"
                        style={{ textAlign: 'center', position: 'absolute', top: '16px', right: '250px', height: '30px', width: '80px', lineHeight: '26px', color: 'white' }}>新建词条</Tag>
                    <Tooltip placement="topLeft" title="新建词条" arrowPointAtCenter>
                        <Icon
                            className="newentry"
                            type="plus"
                            onClick={this.showDrawer}
                            style={{ fontSize: '22PX', position: 'absolute', top: '15px', right: '200px', height: '40px', width: '40px', color: 'rgb(18,150,219)' }} />
                    </Tooltip>
                </div>
                <Drawer
                    title={
                        <div className="newentry-title">
                            <div className="newentry-title-1">
                                新建你的词条
                            </div>
                            <Tooltip
                                onClick={this.previewEntry}
                                placement="leftBottom"
                                title="生成当前词条的预览" >
                                <Tag color="blue" className="newentry-title-2">
                                    预览词条
                                </Tag>
                            </Tooltip>
                        </div>
                    }
                    width={1200}
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <NewEntry
                        checkEntry={this.checkEntry}
                        getdata={this.state.getdata}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e8e8e8',
                            padding: '10px 16px',
                            textAlign: 'right',
                            left: 0,
                            background: '#fff',
                            borderRadius: '0 0 4px 4px',
                        }}
                    >
                        <Button
                            style={{
                                marginRight: 8,
                            }}
                            onClick={this.onClose}
                        >
                            取消
                        </Button>
                        <Button onClick={this.onCreated} type="primary">
                            新增
                        </Button>
                    </div>
                    <Modal
                        title={this.state.prelist.name}
                        width="800px"
                        style={{ width: "800px", height: "600px" }}
                        visible={this.state.visible1}
                        onOk={this.hideModal}
                        onCancel={this.hideModal}
                        okText="确认"
                        cancelText="返回"
                    >
                        <p>{this.state.prelist.othername}</p>
                        <p>{this.state.prelist.engname}</p>
                        <p>{JSON.stringify(this.state.prelist.list)}</p>
                    </Modal>
                </Drawer>
                <div className="SearchEntry">
                    <div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Entry
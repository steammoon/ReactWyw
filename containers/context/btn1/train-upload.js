import React, { Component } from 'react';
import { Upload, Icon, message, Divider, Select, Input, Slider, Switch, Rate, Mentions, Button,InputNumber } from 'antd';
import '../../../css/train-upload.css';

const Dragger = Upload.Dragger;

const { Option } = Select;

function handleChange(value) {
    console.log(`selected ${value}`);
}

function onChange(checked) {
    console.log(`switch to ${checked}`);
}

const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }
};


//const { Option1 } = Mentions;

function onChange1(value) {
    console.log('Change:', value);
}

function onSelect1(option) {
    console.log('select', option);
}


class TrainUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
        }
    }

    handleDisabledChange = disabled => {
        this.setState({ disabled });
    };

    render() {
        const { disabled } = this.state;
        return (
            <div className="context-body">
                <div className="upload-body-1">
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="upload" style={{ color: '#08c' }} />
                        </p>
                        <p className="ant-upload-text">点击上传你的培训资料</p>
                        <p className="ant-upload-hint">
                            支持TXT、Word、EXCEL、PPT、主流视频格式
                    </p>
                    </Dragger>
                </div>
                <Divider orientation="left" style={{ position: 'absolute', top: '25%' }}>定制你的个性化培训</Divider>
                <div className="upload-body-2">
                    <table className="upload-table">
                    <tbody> 
                        <tr>
                            <td>培训名称：</td>
                            <td><Input placeholder="请输入培训名称" /></td>
                            <td></td>
                            <td>教材类型：</td>
                            <td><div>
                                <Select defaultValue="video" style={{ width: 120 }} onChange={handleChange}>
                                    <Option value="ppt">PPT</Option>
                                    <Option value="video">视频</Option>
                                    <Option value="word">Word</Option>
                                </Select>
                            </div></td>
                            <td></td>
                            <td>培训对象：</td>
                            <td><div>
                                <Select defaultValue="low" style={{ width: 120 }} onChange={handleChange}>
                                    <Option value="low">员工</Option>
                                    <Option value="middle">中层</Option>
                                    <Option value="high">高层</Option>
                                </Select>
                            </div></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>积分奖励：</td>
                            <td><InputNumber style={{ width: '100%' }} min={1} max={10} defaultValue={3} onChange={onChange} /></td>
                            <td></td>
                            <td>主题标签：</td>
                            <td><div>
                                <Select defaultValue="1" style={{ width: 120 }} onChange={handleChange}>
                                    <Option value="1">职场</Option>
                                    <Option value="2">沟通</Option>
                                    <Option value="3">化工</Option>
                                    <Option value="4">商务</Option>
                                    <Option value="5">财务</Option>
                                    <Option value="6">IT</Option>
                                    <Option value="7">逻辑</Option>
                                    <Option value="8">决策</Option>
                                </Select>
                            </div></td>
                            <td></td>
                            <td>评分：</td>
                            <td><Rate /></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>抄送对象：</td>
                            <td><Mentions
                                style={{ width: '100%', textAlign: 'left' }}
                                onChange={onChange1}
                                onSelect={onSelect1}
                                defaultValue="@全体员工"
                            >
                                <Option value="全体员工">全体员工</Option>
                                <Option value="业务部门">业务部门</Option>
                                <Option value="单证部">单证部</Option>
                                <Option value="财务部">财务部</Option>
                                <Option value="内审中心">内审中心</Option>
                                <Option value="物流管理中心">物流管理中心</Option>
                            </Mentions></td>
                            <td></td>
                            <td>是否关联任务：</td>
                            <td><Switch defaultChecked onChange={onChange} /></td>
                            <td></td>
                            <td>培训难度：</td>
                            <td><div>
                                <Slider defaultValue={30} disabled={disabled} />
                            </div></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>培训描述：</td>
                            <td colSpan='6'><Input placeholder="描述你的培训" /></td>
                            <td colSpan='2'><Button type="primary">发布</Button></td>
                        </tr>
                        </tbody> 
                    </table>
                </div>
            </div>
        );
    }

}

export default TrainUpload
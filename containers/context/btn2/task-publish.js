import React from 'react';
import { Steps, Input, Select, Icon, InputNumber, DatePicker, Checkbox, Button, Drawer, Tag, Tooltip, Switch, Mentions } from 'antd';
import ReactDOM from 'react-dom';
import http from '../../../http';
import '../../../css/task-publish.css';

const { Step } = Steps;
const { Option } = Select;
const { TextArea } = Input;

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Apple', 'Pear', 'Orange', 'Rice', 'IceCream'];
const defaultCheckedList = [];

const url = {
    "GET_DATA": http.grobal + 'HWTask/tag',
    "INSERT_DATA": http.grobal + 'HWTask/insert',
}

var taglist = "";
//获取taglist
function handleChange(value){
    console.log(`selected ${value}`);
    taglist = `${value}`;
}

//提交任务data
async function submitdata(data){
    await http.post(url.INSERT_DATA,data);
}

class TaskPublish extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contextstate: "空白",
            data: [],
            value: undefined,
            checkedList: defaultCheckedList,
            indeterminate: true,
            checkAll: false,
            visible: false,
            loading: false,
            iconLoading: false,
            status: 0
        };
    }

    async componentDidMount() {
        const res = await http.post(url.GET_DATA, null);
        const ld = [];
        res.data.map((item, i) => {
            ld.push({
                id: item.id,
                code: item.code,
                name: item.name,
                icon: item.icon,
                color: item.color
            })
            return i.id;
        })
        this.setState({
            data: ld
        })
    }

    changetitle = () => {
        if (ReactDOM.findDOMNode(this.refs['title']).value !== "") {
            this.setState({
                status: 1
            })
        }
    }

    handleSearch = value => {
        //fetch(value, data => this.setState({ data }));
    };

    handleChange = value => {
        this.setState({ value });
    };

    onChange = checkedList => {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
            checkAll: checkedList.length === plainOptions.length,
        });
    };

    onCheckAllChange = e => {
        this.setState({
            checkedList: e.target.checked ? plainOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
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

    drawercancel = () => {
        this.setState({
            visible: false,
        });
    }

    drawersubmit = () => {
        var ct = "空白";
        if (ReactDOM.findDOMNode(this.refs['TA']).value !== "") {
            ct = "已编辑";
            this.setState({
                status: 2
            })
        }
        else {
            this.setState({
                status: 1
            })
        }
        this.setState({
            visible: false,
            contextstate: ct
        });
    }

    enterLoading = () => {
        this.setState({ loading: true });
    };

    enterIconLoading = () => {
        this.setState({
            iconLoading: true,
            status : 4
        }); 
        var data = {
            title : (ReactDOM.findDOMNode(this.refs['title']) !== null)?ReactDOM.findDOMNode(this.refs['title']).value:null,
            title_color : (this.refs.title_color.props.defaultValue !== null)?this.refs.title_color.props.defaultValue:null,
            type : (this.refs.type.props.defaultValue !== null)?this.refs.type.props.defaultValue:null,
            describe : (ReactDOM.findDOMNode(this.refs['TA']) !== null)?ReactDOM.findDOMNode(this.refs['TA']).value:null,
            reward : (this.refs.reward.props.defaultValue !== null)?this.refs.reward.props.defaultValue:null,
            tagnote : taglist,
        };
        console.log(data);
        submitdata(data);
    };

    render() {
        const options = this.state.data.map((d,i) => <Option style={{ border: "none", backgroundColor: "white" }} key={d.id}><Tag ref={"tag"+i} code={d.id} key={d.id} color={d.color} style={{ border: "none" }}>{d.name}</Tag></Option>);
        return (
            <div className="context-body">
                <div className="step-tab">
                    <Steps current={this.state.status}>
                        <Step title="主题" description="填写你的任务标题" />
                        <Step title="内容" description="完善你的任务内容" />
                        <Step title="发布" description="发布新任务！" />
                    </Steps>
                </div>
                <div className="task-pub-body">
                    <div className="task-pub-table">
                        <table>
                            <tbody>
                                <tr>
                                    <td><div className="inptitle">标题</div></td>
                                    <td colSpan='5'>
                                        <Input
                                            ref="title"
                                            onChange={this.changetitle} />
                                    </td>
                                    <td><div className="inptitle">主题颜色</div></td>
                                    <td>
                                        <Select ref="title_color" defaultValue="black" style={{ width: 120 }}>
                                            <Option value="black"><Icon type="border" style={{ color: "black", backgroundColor: "black", border: "none", position: "relative", top: "-3px" }} /></Option>
                                            <Option value="red"><Icon type="border" style={{ color: "red", backgroundColor: "red", border: "none", position: "relative", top: "-3px" }} /></Option>
                                            <Option value="#D94600"><Icon type="border" style={{ color: "#D94600", backgroundColor: "#D94600", border: "none", position: "relative", top: "-3px" }} /></Option>
                                            <Option value="blue"><Icon type="border" style={{ color: "blue", backgroundColor: "blue", border: "none", position: "relative", top: "-3px" }} /></Option>
                                            <Option value="#9F35FF"><Icon type="border" style={{ color: "#9F35FF", backgroundColor: "#9F35FF", border: "none", position: "relative", top: "-3px" }} /></Option>
                                        </Select>
                                    </td>
                                </tr>
                                <tr>
                                    <td><div className="inptitle">标签</div></td>
                                    <td>
                                        <Select 
                                            ref="taglist"
                                            mode="tags" 
                                            style={{ width: '100%' }}
                                            tokenSeparators={[',']}
                                            onChange={handleChange}
                                        >
                                            {options}
                                        </Select>
                                    </td>
                                    <td><div className="inptitle">类型</div></td>
                                    <td>
                                        <Select ref="type" width="100%" style={{ width: "100%" }} defaultValue="1" >
                                            <Option value="1">普通任务</Option>
                                            <Option value="2">紧急任务</Option>
                                            <Option value="3">长期任务</Option>
                                            <Option value="4">每日任务</Option>
                                            <Option value="5">限定任务</Option>
                                        </Select>
                                    </td>
                                    <td><div className="inptitle">是否指定</div></td>
                                    <td><Switch defaultChecked /></td>
                                    <td><div className="inptitle">指定人</div></td>
                                    <td>
                                        <Mentions
                                            style={{ width: '70%', textAlign: 'left' }}
                                        >
                                            <Option value="huangw">黄炜</Option>
                                            <Option value="shaj">沙金</Option>
                                            <Option value="qianf">钱峰</Option>
                                        </Mentions>
                                    </td>
                                </tr>
                                <tr>
                                    <td><div className="inptitle">积分奖励</div></td>
                                    <td><InputNumber ref="reward" style={{ width: '100%' }} min={1} max={100} defaultValue={5} /></td>
                                    <td><div className="inptitle">有效期</div></td>
                                    <td><DatePicker /></td>
                                    <td><div className="inptitle">限制条件</div></td>
                                    <td colSpan='3'>
                                        <div>
                                            <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                                                <Checkbox
                                                    indeterminate={this.state.indeterminate}
                                                    onChange={this.onCheckAllChange}
                                                    checked={this.state.checkAll}
                                                >
                                                    全选
                                                </Checkbox>
                                            </div>
                                            <br />
                                            <CheckboxGroup
                                                options={plainOptions}
                                                value={this.state.checkedList}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><div className="inptitle">任务描述</div></td>
                                    <td>
                                        <div>
                                            <Button
                                                style={{ width: "200px" }}
                                                type="primary"
                                                onClick={this.showDrawer}>
                                                {this.state.contextstate}
                                            </Button>
                                            <Drawer
                                                title="编辑你的任务内容"
                                                width="1000px"
                                                placement="right"
                                                closable={false}
                                                onClose={this.onClose}
                                                visible={this.state.visible}
                                            >
                                                <div>
                                                    <TextArea
                                                        ref="TA"
                                                        autosize={{ minRows: 10, maxRows: 40 }}
                                                    />
                                                </div>
                                                <div style={{ position: 'absolute', bottom: '30px', right: '30px', width: '100px', height: '20px' }}>
                                                    <Button
                                                        type="primary"
                                                        onClick={this.drawercancel}
                                                        style={{ position: "absolute", bottom: "30px", right: "120px" }}>
                                                        取消
                                                    </Button>
                                                    <Button
                                                        type="primary"
                                                        onClick={this.drawersubmit}
                                                        style={{ position: "absolute", bottom: "30px", right: "20px" }}>
                                                        确定
                                                    </Button>
                                                </div>
                                            </Drawer>
                                        </div>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td colSpan='2' >
                                        <Tooltip title="发布新任务">
                                            <Button
                                                style={{ borderRadius: "12px", width: "100px" }}
                                                size="large"
                                                type="primary"
                                                icon="poweroff"
                                                loading={this.state.iconLoading}
                                                onClick={this.enterIconLoading} >
                                                发布
                                            </Button>
                                        </Tooltip>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default TaskPublish;
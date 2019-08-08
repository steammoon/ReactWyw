import React from 'react';
import { Drawer, Button, Tooltip, Input, Icon, DatePicker, Select, Modal } from 'antd';
import { LocaleProvider } from 'antd';
import EditableFormTable from './market-table';
import locale from 'antd/lib/locale-provider/zh_CN';
import '../../../css/market.css';
import moment from 'moment';
import 'moment/locale/zh-cn';
import http from '../../../http';
import Notification from '../../common/notification';
moment.locale('zh-cn');

const url = {
    "GET_DATA": http.grobal + 'price'
}
const { RangePicker } = DatePicker;
const { Option } = Select;

//引用iconfont图标
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1319738_pt6hi1u578.js',
});

class Market extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            visible1: false,
            data: [],
            count: 0,
            modeltitle: "",
            disabled: false,
            record: {
                key: 0,
                item_name: "",
                time_slot: "",
                area: "",
                source: "",
                price: "",
                memo: "",
                modifyby: "",
                modifyon: ""
            },
            type:""
        };
    }

    handleAdd = () => {
        if(this.state.count === 0){
            Notification.openNotification("不能新增","请先加载数据列表");
        }
        else{
            this.setState({
                modeltitle: "新增价格记录",
                disabled: false,
                record: {
                    key: this.state.count + 1,
                    item_name: "",
                    time_slot: "",
                    area: "",
                    source: "",
                    price: "",
                    memo: "",
                    modifyby: "",
                    modifyon: "",
                },
                visible1: true,
                type:"new"
            });
        }
        
    };

    handleOpen = (resdata) => {
        var title = "";
        var des = false;
        var typ = "";
        console.log("接收回调函数",resdata.record);
        if (resdata.type === "edit") {
            title = "修改价格记录";
            des = false;
            typ="edit";    
        }
        else {
            title = "删除价格记录(删除后无法还原)";
            des = true;
            typ="delete";
        }
        this.setState({
            visible1: true,
            modeltitle: title,
            disabled: des,
            record: resdata.record,
            type : typ,
        });
    };

    change1 = (e)=>{
        
    }

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

    handleOk = e => {
        if(this.state.type === "new"){
            const newData = {
                key: this.state.count+1,
                item_name: this.refs.pl1.state.value,
                time_slot: this.refs.pl2.state.value,
                area: this.refs.pl3.state.value,
                source: this.refs.pl4.state.value,
                price: this.refs.pl5.state.value,
                memo: this.refs.pl6.state.value,
                modifyby: this.refs.pl7.state.value,
                modifyon: this.refs.pl8.state.value
              };
            this.setState({
                visible1: false,
                data : [newData,...this.state.data],
                count : this.state.count +1
            });
        }
        else if(this.state.type === "edit") {
            //const newData = this.state.data.
            console.log(this.state.data);
            this.setState({
                visible1: false,
                data : this.state.data,
                count : this.state.count
            });
        }
        
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible1: false,
        });
    };

    async onselectlist() {
        const res = await http.get(url.GET_DATA, null);
        if (res.data !== "" && typeof (res.data) !== "undefined") {
            console.log(res.data);
            const datain = [];
            res.data.map((value, i) => {
                datain.push({
                    key: i.toString(),
                    item_name: value.item_name,
                    time_slot: value.time_slot,
                    area: value.area,
                    source: value.source,
                    price: value.price,
                    memo: value.memo,
                    modifyby: value.modifyby,
                    modifyon: value.modifyon,
                });
            })
            this.setState({
                visible: false,
                data: datain,
                count: datain.length
            });
        }

    }

    render() {
        return (
            <div className='context-body'>
                <Modal
                    destroyOnClose="true" 
                    width="1000px"
                    title={this.state.modeltitle}
                    visible={this.state.visible1}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <table className="newdata">
                        <tbody>
                            <tr>
                                <td><Input ref="pl1" disabled={this.state.disabled} onChange={this.change1} defaultValue={this.state.record.item_name} style={{ borderRadius: "0px" }} placeholder="品种" /></td>
                                <td><Input ref="pl2" disabled={this.state.disabled} onChange={this.change2} defaultValue={this.state.record.time_slot} style={{ borderRadius: "0px" }} placeholder="时间段" /></td>
                                <td><Input ref="pl3" disabled={this.state.disabled} onChange={this.change3} defaultValue={this.state.record.area} style={{ borderRadius: "0px" }} placeholder="区域" /></td>
                                <td><Input ref="pl4" disabled={this.state.disabled} onChange={this.change4} defaultValue={this.state.record.source} style={{ borderRadius: "0px" }} placeholder="来源" /></td>
                                <td><Input ref="pl5" disabled={this.state.disabled} onChange={this.change5} defaultValue={this.state.record.price} style={{ borderRadius: "0px" }} placeholder="价格" /></td>
                                <td><Input ref="pl6" disabled={this.state.disabled} onChange={this.change6} defaultValue={this.state.record.memo} style={{ borderRadius: "0px" }} placeholder="备注" /></td>
                                <td><Input ref="pl7" disabled={this.state.disabled} onChange={this.change7} defaultValue={this.state.record.modifyby} style={{ borderRadius: "0px" }} placeholder="修改人" /></td>
                                <td><Input ref="pl8" disabled={this.state.disabled} onChange={this.change8} defaultValue={this.state.record.modifyon} style={{ borderRadius: "0px" }} placeholder="修改日期" /></td>
                            </tr>
                        </tbody>
                    </table>
                </Modal>
                <div className="functionBar">
                    <Tooltip placement="top" title="新增价格">
                        <Button
                            style={{ position: "absolute", top: "10px", left: "50px" }}
                            type="primary"
                            onClick={this.handleAdd}>
                            新增
                        </Button>
                    </Tooltip>
                    <Tooltip placement="top" title="配置你的查询方案">
                        <Button
                            style={{ position: "absolute", top: "10px", right: "180px" }}
                            type="primary"
                            onClick={this.showDrawer}>
                            查询方案
                        </Button>
                    </Tooltip>
                </div>
                <div className="functionTable">
                    <EditableFormTable data={this.state.data} count={this.state.count} callbackopt={this.handleOpen} />
                </div>
                <Drawer
                    title="查询方案"
                    placement="top"
                    height="400px"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <div className="condition-bottom-body">
                        <table cellSpacing="20">
                            <tbody>
                                <tr>
                                    <td>
                                        <LocaleProvider locale={locale}>
                                            <RangePicker />
                                        </LocaleProvider>
                                    </td>
                                    <td>
                                        <Input
                                            placeholder="部门"
                                            suffix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        />
                                    </td>
                                    <td>
                                        <Input
                                            placeholder="品种"
                                            suffix={<IconFont type="icon-RectangleCopy" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        />
                                    </td>
                                    <td>
                                        <Select
                                            mode="multiple"
                                            style={{ width: '100%' }}
                                            placeholder="选择价格来源"
                                            defaultValue={['ICIS']}
                                            optionLabelProp="label">
                                            <Option value="ICIS" label="ICIS">ICIS</Option>
                                            <Option value="Platts" label="Platts">Platts</Option>
                                        </Select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Input
                                            placeholder="区域"
                                            suffix={<Icon type="bank" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        />
                                    </td>
                                    <td>
                                        <Input
                                            placeholder="创建人"
                                            suffix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        />
                                    </td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="condition-bottom-tab">
                        <Button
                            onClick={this.onClose}
                            style={{ marginRight: 8, position: "absolute", right: "100px" }}>
                            取消
                        </Button>
                        <Button
                            onClick={() => { this.onselectlist() }}
                            style={{ marginRight: 8, position: "absolute", right: "20px" }}
                            type="primary">
                            查询
                        </Button>
                    </div>

                </Drawer>
            </div>
        )
    }
}

export default Market;
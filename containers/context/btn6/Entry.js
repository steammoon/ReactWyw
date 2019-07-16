import React from 'react';
import { Icon, Input, Tooltip, Tag, Drawer, Button, Modal, notification, List, Card,Badge} from 'antd';
import NewEntry from '../btn6/NewEntry';
import EntryLikes from '../btn6/EntryLikes';
import Notify from '../../common/notification';
import '../../../css/entry.css';
import http from '../../../http';

const url = {
    "GET_DATA": http.grobal + 'HWTask/tag',
    "POST_ENTRY_DATA": http.grobal + 'HWEntry/insert',
    "POST_ENTRY_LIST": http.grobal + 'HWEntry/list',
    "POST_ENTRY_ENTRY": http.grobal + 'HWEntry/entry',
}

//提醒通知
const openNotification = (str) => {
    notification.open({
        message: str + '不能为空！！',
        description:
            '你需要完善资料来建立预览',
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
    });
};


function tagarr(list, str) {
    var listtag = [];
    list.map((item, i) => {
        str.split(",").map((item1, j) => {
            if (item.id === item1) {
                listtag.push({
                    id: item.id,
                    color: item.color,
                    name: item.name
                })
            }
            return j.id;
        })
        return i.id;
    })
    return listtag;
}

class Entry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visiblex: false,
            visible: false,
            visible1: false,
            visible2: false, //确认提交框
            getdata: false,
            tagdata: [],
            nowtag: [],
            prelist: {
                list: [],
                name: "",
                othername: "",
                engname: "",
                taglist: "101,102"
            },
            listData: [],
            clicklist: {
                list: [],
                name: "",
                othername: "",
                engname: "",
                likes: 0,
                visit: 0,
                taglist: []
            }
        }
    }

    async componentDidMount() {
        var postdata = {
            condition: null
        };
        const res = await http.post(url.GET_DATA, null);
        const res1 = await http.post(url.POST_ENTRY_LIST, postdata);
        const ld1 = [];
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
        res1.data.map((item, i) => {
            ld1.push({
                id: item.id,
                name: item.name,
                othername: item.othername,
                engname: item.engname,
                likes: item.likes,
                visit: item.visit,
                qrcode: item.qrcode,
                foward: item.foward,
                memo: item.memo,
                createdby: item.createdby,
                createdon: item.createdon,
                modifyby: item.modifyby,
                modifyon: item.modifyon,
                new: item.new,
                tag: item.tag
            })
            return i.id;
        })
        this.setState({
            tagdata: ld,
            listData: ld1
        })
    }

    //搜索框变动时，请求新的数据list
    async loadagain(event) {
        var data = {
            condition: event.target.value
        }
        const res = await http.post(url.POST_ENTRY_LIST, data);
        const ld = [];
        res.data.map((item, i) => {
            ld.push({
                id: item.id,
                name: item.name,
                othername: item.othername,
                engname: item.engname,
                likes: item.likes,
                visit: item.visit,
                qrcode: item.qrcode,
                foward: item.foward,
                memo: item.memo,
                createdby: item.createdby,
                createdon: item.createdon,
                modifyby: item.modifyby,
                modifyon: item.modifyon,
                new: item.new,
                tag: item.tag
            })
            return i.id;
        })
        this.setState({
            listData: ld
        })
    }

    hideModal = () => {
        this.setState({
            visible2: true,
        });
    };

    hideModal0 = () => {
        this.setState({
            visible1: false,
        });
    }

    hideModalx = () => {
        this.setState({
            visiblex: false,
        });
    }


    //点击词条详情获取EntryTree
    async clickmore(event, item) {
        var data = {
            entry: item.id
        }
        const res = await http.post(url.POST_ENTRY_ENTRY, data);
        console.log("成功获取TreeNode", item)
        this.setState({
            visiblex: true,
            clicklist: {
                list: res.data,
                name: item.name,
                othername: item.othername,
                engname: item.engname,
                likes: item.likes,
                visit: item.visit,
                taglist: item.tag,
            }

        })
    }

    //确认提交数据
    hideModal1 = async () => {
        var data = {
            list: JSON.stringify(this.state.prelist.list),
            name: this.state.prelist.name,
            othername: this.state.prelist.othername,
            engname: this.state.prelist.engname,
            taglist: this.state.prelist.taglist
        }
        const res = await http.post(url.POST_ENTRY_DATA, data);
        if (res.data !== null) {
            Notify.openNotification(this.state.prelist.name, "新增词条成功！！");
        }
        this.setState({
            visible1: false,
            visible2: false,
        });
    };

    hideModal2 = () => {
        this.setState({
            visible2: false,
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
        else if (data.taglist === "") {
            openNotification("标签");
        }
        else if (typeof data.engname === "undefined") {
            openNotification("英文名");
        }
        else {
            var nowtag1 = tagarr(this.state.tagdata, data.taglist);
            this.setState({
                visible1: true,
                prelist: data,
                nowtag: nowtag1
            });
            
        }
    };

    //词条预览函数
    previewEntry = () => {
        this.setState({
            getdata: this.state.getdata ? false : true
        });
    }

    render() {
        const taglist = this.state.nowtag.map((item, i) =>
            <Tag key={i} color={item.color}>{item.name}</Tag>
        )

        const taglist1 = this.state.clicklist.taglist.map((item, i) =>
            <Tag key={i} color={item.tagcolor}>{item.tagname}</Tag>
        )
        const loop = this.state.prelist.list.map((item, i) =>
            <div key={i}>
                <p>{item.content}</p>
                {item.chird.map((item1, j) =>
                    <div key={j}>
                        <p style={{ fontWeight: "700", fontSize: "24px" }}>{item1.title}</p>
                        <p style={{ textIndent: "2em" }}>{item1.content}</p>
                        {item1.chird.map((item2, k) =>
                            <div key={k}>
                                <p style={{ fontWeight: "700", fontSize: "20px", paddingLeft: "2em" }}>{item2.title}</p>
                                <p style={{ textIndent: "2em", paddingLeft: "3em" }}>{item2.content}</p>
                                {item2.chird.map((item3, m) =>
                                    <div key={m}>
                                        <p style={{ fontWeight: "700", fontSize: "15px", paddingLeft: "4em" }}>●&nbsp;{item3.title}</p>
                                        <p style={{ paddingLeft: "5em" }}>{item3.content}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
        const loop1 = this.state.clicklist.list.map((item, i) =>
            <div key={i}>
                <p>{item.content}</p>
                {item.chird.map((item1, j) =>
                    <div key={j}>
                        <p style={{ fontWeight: "700", fontSize: "24px" }}>{item1.title}</p>
                        <p style={{ textIndent: "2em" }}>{item1.content}</p>
                        {item1.chird.map((item2, k) =>
                            <div key={k}>
                                <p style={{ fontWeight: "700", fontSize: "20px", paddingLeft: "2em" }}>{item2.title}</p>
                                <p style={{ textIndent: "2em", paddingLeft: "3em" }}>{item2.content}</p>
                                {item2.chird.map((item3, m) =>
                                    <div key={m}>
                                        <p style={{ fontWeight: "700", fontSize: "15px", paddingLeft: "4em" }}>●&nbsp;{item3.title}</p>
                                        <p style={{ paddingLeft: "5em" }}>{item3.content}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
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
                        title={<div className="pretitlesum"><div className="pretitle1">{this.state.prelist.name}</div><div className="pretitle2">别名&nbsp;:&nbsp;{this.state.prelist.othername}</div><div className="pretitle3">英文名&nbsp;:&nbsp;{this.state.prelist.engname}</div><div className="pretitle4">{taglist}</div></div>}
                        width="800px"
                        style={{ width: "800px", height: "600px" }}
                        visible={this.state.visible1}
                        onOk={this.hideModal}
                        onCancel={this.hideModal0}
                        okText="确认"
                        cancelText="返回"
                    >
                        {loop}
                    </Modal>
                    <Modal
                        title="是否提交该词条？"
                        visible={this.state.visible2}
                        onOk={this.hideModal1}
                        onCancel={this.hideModal2}
                        okText="确认"
                        cancelText="取消"
                    >
                        <p style={{ color: "black", fontFamily: "微软雅黑", fontWeight: "600", fontSize: "16px" }}>创建一个新的词条&nbsp;<p style={{ color: "#108ee9" }}>{this.state.prelist.name}</p></p>
                    </Modal>
                </Drawer>
                <div className="SearchEntry">
                    <List
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 4,
                            lg: 4,
                            xl: 4,
                            xxl: 6,
                        }}
                        dataSource={this.state.listData}
                        renderItem={item => (
                            <List.Item>
                                <Badge
                                    style={{ float: "right" }}
                                    count={item.new}
                                    offset={[-30, 0]}
                                >
                                    <Card
                                        title={<div onClick={(event) => { this.clickmore(event, item) }} className="CardTitle">{item.name}</div>}
                                        headStyle={{ cursor:"pointer",color: "black", fontWeight: "500", fontFamily: "微软雅黑" }}
                                        style={{ marginBottom: "20px", marginRight: "30px", color: "black", borderRadius: "7px", backgroundColor: "rgb(255,255,255)", boxShadow: "0 5px 10px rgb(200,200,200)" }}>
                                        {item.tag.map((value, i) =>
                                            <Tag key={i} color={value.tagcolor}>{value.tagname}</Tag>
                                        )}
                                        <EntryLikes 
                                        entry={item.id}
                                        likes={item.likes}
                                        />
                                    </Card>
                                </Badge>
                            </List.Item>
                        )}
                    />
                    <Modal
                        title={<div className="pretitlesum"><div className="pretitle1">{this.state.clicklist.name}</div><div className="pretitle2">别名&nbsp;:&nbsp;{this.state.clicklist.othername}</div><div className="pretitle3">英文名&nbsp;:&nbsp;{this.state.clicklist.engname}</div><div className="pretitle4">{taglist1}</div></div>}
                        width="800px"
                        style={{ width: "800px", height: "600px" }}
                        visible={this.state.visiblex}
                        onOk={this.hideModalx}
                        onCancel={this.hideModalx}
                        okText="确认"
                        cancelText="返回"
                    >
                        {loop1}
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Entry
import React from 'react';
import { Modal, Button, Tree, Input, notification,Icon } from 'antd';
import EntryTreeTitle from '../btn6/EntryTreeTitle';
import ListBtnJson from '../../../hw-list-btn.json';

const { TreeNode, DirectoryTree } = Tree;
const { TextArea } = Input;

//提醒通知
const openNotification = () => {
    notification.open({
        message: '目录层级不能超过四层',
        description:
            '请重新调整你的文档结构',
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
    });
};

//删除当前的TreeNode的list处理
function dellist(key1, list) {
    var list1 = [];
    list.map((item, i) => {
        if (item.key !== key1) {
            list1.push({
                title: item.title,
                key: item.key,
                content: item.content,
                chird: dellist(key1, item.chird)
            })
        }
        return i.id;
    })
    return list1;
}

//修改当前TreeNode的list处理
function modifylist(key1, list, tit, con) {
    var list1 = [];
    list.map((item, i) => {
        if (item.key === key1) {
            list1.push({
                title: tit,
                key: item.key,
                content: con,
                chird: modifylist(key1, item.chird, tit, con)
            })

        }
        else {
            list1.push({
                title: item.title,
                key: item.key,
                content: item.content,
                chird: modifylist(key1, item.chird, tit, con)
            })
        }
        return i.id;
    })
    return list1;
}

//新增TreeNode的list处理
function addlist(key1, list, count) {
    var list1 = [];
    list.map((item, i) => {
        list1.push({
            title: item.title,
            key: item.key,
            content: item.content,
            chird: treenodeadd(item.key, key1, item.chird, item.chird.length)
        })
        //处理已有级别 自增序列
        if (item.key.substring(0, item.key.lastIndexOf("-")) === key1 && (count - 1) === parseInt(item.key.substring(item.key.lastIndexOf("-") + 1, item.key.length), 10)) {
            list1.push(
                {
                    title: "新增目录",
                    key: creatkey("same", item.key, i + 1),
                    content: "",
                    chird: []
                }
            )
        }
        return i.id;
    })
    return list1;
}

//字符串遍历
function patch(re, s) {
    var arr = s.split(re);
    return arr.length;
}

//处理新增级别 序列
function treenodeadd(key, key1, list, length) {
    if (list.length === 0 && key === key1) {
        if (patch("-",key)>=4) {
            openNotification();
            return []
        }
        else {
            var list1 = [];
            list1.push({
                title: "新增目录",
                key: creatkey("sub", key, 0),
                content: "",
                chird: []
            })
            return list1
        }
    }
    else {
        return addlist(key1, list, length)
    }
}
//处理key序列
function creatkey(type, key, index) {
    if (type === "same") {
        return key.substring(0, key.lastIndexOf("-")) + "-" + index;
    }
    else if (type === "sub") {
        return key + "-0"
    }
    else {
        return null;
    }
}


class NewEntryTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getdata2: false,
            visible: false,   //对话框显示
            visible1: false,   //确认框显示
            nowtitle: null,   //当前title
            nowcontent: null,  //当前content
            nowkey: null,     //当前key
            loading: false,
            textreainner: null,   //当前对话框的输入值
            texttitle: null,     //当前对话框title
            treelist: [
                {
                    title: "正文",
                    key: "0",
                    content: "",
                    chird: []
                }
            ]
        }
    }

    hideModal1 = () => {
        var oklist = dellist(this.state.nowkey, this.state.treelist);
        this.setState({
            visible1: false,
            treelist: oklist
        });
    };

    hideModal2 = () => {
        this.setState({
            visible1: false,
        });
    };

    textareachange = (e) => {
        this.setState({
            textreainner: e.target.value
        })
    }

    texttitlechange = (e) => {
        this.setState({
            texttitle: e.target.value
        })
    }


    onSelect = (keys, event) => {
        console.log(event, keys);
    };

    onExpand = (keys, event) => {
        //event.preventDefault();
    };


    handleOk = e => {
        var list = modifylist(this.state.nowkey, this.state.treelist, this.refs.modaltitle.state.value, this.state.textreainner);
        this.setState({
            visible: false,
            treelist: list,
            nowtitle: null,
            nowkey: null,
            nowcontent: null
        });
    };

    handleCancel = e => {
        //console.log(e);
        this.setState({
            visible: false,
            nowtitle: null,
            nowkey: null,
            nowcontent: null
        });
    };

    callbackopen = (data) => {
        if (data.type === "edit") {
            this.setState({
                getdata2: false,
                visible: true,
                nowtitle: data.title,
                nowcontent: data.content,
                nowkey: data.key,
                textreainner: data.content,
                texttitle: data.title
            });
        }
        else if (data.type === "new") {
            var list = addlist(data.key, this.state.treelist, this.state.treelist.length);
            this.setState({
                treelist: list
            })
        }
        else if (data.type === "del") {
            this.setState({
                visible1: true,
                nowkey: data.key
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        //demotree替换
        if (nextProps.showdemo && nextProps.showdemo !== this.props.showdemo) {
            this.setState({
                treelist: ListBtnJson.defaultlist
            })
        }
        //触发list回调
        if (nextProps.getdata1 !== this.state.getdata2) {
            this.setState({
                getdata2: this.state.getdata2 ? false : true
            })
            var data = {
                list: this.state.treelist
            };
            this.props.checkEntry1(data);
        }
    }

    render() {
        const { loading } = this.state;
        const loop = this.state.treelist.map((item) =>
            <TreeNode
                title={<EntryTreeTitle name={item.title} keycode={item.key} content={item.content} callbackopen={this.callbackopen} />}
                key={item.key}
                ref={item.key} >
                {item.chird.map((value) =>
                    <TreeNode
                        title={<EntryTreeTitle name={value.title} keycode={value.key} content={value.content} callbackopen={this.callbackopen} />}
                        key={value.key}
                        ref={value.key}>
                        {value.chird.map((value1) =>
                            <TreeNode
                                title={<EntryTreeTitle name={value1.title} keycode={value1.key} content={value1.content} callbackopen={this.callbackopen} />}
                                key={value1.key}
                                ref={value1.key} >
                                {value1.chird.map((value2) =>
                                    <TreeNode
                                        title={<EntryTreeTitle name={value2.title} keycode={value2.key} content={value2.content} callbackopen={this.callbackopen} />}
                                        key={value2.key}
                                        ref={value2.key} >
                                        {value2.chird.map((value3) =>
                                            <TreeNode
                                                title={<EntryTreeTitle name={value3.title} keycode={value3.key} content={value3.content} callbackopen={this.callbackopen} />}
                                                key={value3.key}
                                                ref={value3.key} >
                                            </TreeNode>
                                        )}
                                    </TreeNode>
                                )}
                            </TreeNode>
                        )}
                    </TreeNode>
                )}
            </TreeNode>
        );
        return (
            <div>
                <Modal
                    width="1000px"
                    title={
                        <Input
                            ref="modaltitle"
                            value={this.state.texttitle}
                            onChange={this.texttitlechange}
                            style={{ border: "none" }}
                            placeholder="输入目录标题..."
                            defaultValue={this.state.nowtitle}
                        />
                    }
                    visible={this.state.visible}
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
                            确定
                        </Button>,
                    ]}
                >
                    <TextArea
                        ref="modalarea"
                        value={this.state.textreainner}
                        onChange={this.textareachange}
                        placeholder="丰富你的词条内容...."
                        autosize={{ minRows: 5, maxRows: 13 }} />
                </Modal>

                <Modal
                    title="是否删除该目录以及子目录？"
                    visible={this.state.visible1}
                    onOk={this.hideModal1}
                    onCancel={this.hideModal2}
                    okText="确认"
                    cancelText="取消"
                >
                    <p style={{ color: "red", fontFamily: "微软雅黑", fontWeight: "600", fontSize: "16px" }}>删除后将清空数据!!</p>
                </Modal>

                <DirectoryTree
                    multiple
                    defaultExpandAll
                    onSelect={this.onSelect}
                    onExpand={this.onExpand}
                >
                    {loop}
                </DirectoryTree>
            </div>
        );
    }


}

export default NewEntryTree
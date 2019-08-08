import React from 'react';

import { Table, Input, InputNumber, Popconfirm, Form, Icon, Tooltip } from 'antd';
import '../../../css/market.css';

const data = [];
//for (let i = 0; i < 100; i++) {
//    data.push({
//        key: i.toString(),
//        item: '苯乙烯',
//        time_slot: '9:00',
//        area: 32,
//        source: 'ICIS',
//        price: 2000,
//        memo: "价格备注",
//        modifyby: "huangw",
//        modifyon: "2019-07-29",
//    });
//}
const EditableContext = React.createContext();

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };

    renderCell = ({ getFieldDecorator }) => {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator(dataIndex, {
                            rules: [
                                {
                                    required: true,
                                    message: `Please Input ${title}!`,
                                },
                            ],
                            initialValue: record[dataIndex],
                        })(this.getInput())}
                    </Form.Item>
                ) : (
                        children
                    )}
            </td>
        );
    };

    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data,
            count: 0,
            editingKey: ''
        };
        this.columns = [
            {
                title: '品种',
                dataIndex: 'item_name',
                width: '10%',
                editable: true,
                align: 'center'
            },
            {
                title: '时间段',
                dataIndex: 'time_slot',
                width: '10%',
                editable: true,
                align: 'center'
            },
            {
                title: '区域',
                dataIndex: 'area',
                width: '10%',
                editable: true,
                align: 'center'
            },
            {
                title: '来源',
                dataIndex: 'source',
                width: '10%',
                editable: true,
                align: 'center'
            },
            {
                title: '价格',
                dataIndex: 'price',
                width: '15%',
                editable: true,
                align: 'center'
            },
            {
                title: '修改人',
                dataIndex: 'modifyby',
                width: '10%',
                editable: true,
                align: 'center'
            },
            {
                title: '修改时间',
                dataIndex: 'modifyon',
                width: '10%',
                editable: true,
                align: 'center'
            },
            {
                title: '备注',
                dataIndex: 'memo',
                width: '15%',
                editable: true,
                align: 'center'
            },
            {
                title: '数据操作',
                align: 'center',
                dataIndex: 'operation',
                render: (text, record) => {
                    const { editingKey } = this.state;
                    const editable = this.isEditing(record);
                    return editable ? (
                        <span>
                            <EditableContext.Consumer>
                                {form => (
                                    <a
                                        //href="javascript:;"
                                        onClick={() => this.save(form, record.key)}
                                        style={{ marginRight: 8 }}
                                    >
                                        Save
                                    </a>
                                )}
                            </EditableContext.Consumer>
                            <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                                <a>Cancel</a>
                            </Popconfirm>
                        </span>
                    ) : (
                            <div>
                                <a disabled={editingKey !== ''} onClick={() => this.edit(record)}>
                                    <Tooltip placement="top" title="编辑">
                                        <Icon type="edit" />
                                    </Tooltip>
                                </a>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <a disabled={editingKey !== ''} onClick={() => this.del(record)}>
                                    <Tooltip placement="top" title="删除">
                                        <Icon type="delete" />
                                    </Tooltip>
                                </a>
                            </div>
                        );
                },
            },
        ];
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.setState({
            data: nextProps.data,
            count: nextProps.count
        })
    }

    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.setState({ data: newData, editingKey: '' });
            } else {
                newData.push(row);
                this.setState({ data: newData, editingKey: '' });
            }
        });
    }

    edit(key) {
        console.log("触发回调函数",key);
        //this.setState({ editingKey: key });
        //回调函数
        const resdata = {
            type: "edit",
            record: key
        }
        this.props.callbackopt(resdata);
    }

    del(key) {
        console.log("触发回调函数",key);
        //this.setState({ editingKey: key });
        //回调函数
        const resdata = {
            type: "delete",
            record: key
        }
        this.props.callbackopt(resdata);
    }



    render() {
        const components = {
            body: {
                cell: EditableCell,
            },
        };

        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        return (
            <EditableContext.Provider value={this.props.form}>
                <Table
                    components={components}
                    bordered
                    dataSource={this.state.data}
                    columns={columns}
                    rowClassName="editable-row"
                    pagination={{
                        defaultCurrent: 1,
                        pageSize: 10,
                        onChange: this.cancel,
                    }}
                />
            </EditableContext.Provider>
        );
    }
}

const EditableFormTable = Form.create()(EditableTable);

export default EditableFormTable
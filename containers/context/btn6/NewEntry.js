import React from 'react';
import http from '../../../http';
import { Input, Tag, Select, Tooltip,Switch } from 'antd';
import NewEntryTree from '../btn6/NewEntryTree';

const url = {
    "GET_DATA": http.grobal + 'HWTask/tag',
}

const { Option } = Select;

var tag_list = "";
//获取taglist
function handleChange(value) {
    //console.log(`selected ${value}`);
    tag_list = `${value}`;
}

class NewEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            showdemo: false,
            getdata1: false
        }
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

    handleChange = value => {
        this.setState({ value });
    };

    //显示demo tree
    showtreedemo = () => {
        this.setState({
            showdemo: true
        })
    }

    //触发list回调
    checkEntry1 = (data) => {
        var data1 = {
            list: data.list,
            name: this.refs.entry_name.state.value,
            othername: this.refs.entry_other_name.state.value,
            engname: this.refs.entry_eng_name.state.value,
            taglist: tag_list,
        }
        this.props.checkEntry(data1);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.getdata !== this.state.getdata1) {
            this.setState({
                getdata1: this.state.getdata1 ? false : true
            })
        }
    }

    render() {
        const options = this.state.data.map((d, i) => <Option style={{ border: "none", backgroundColor: "white" }} key={d.id}><Tag ref={"tag" + i} code={d.id} key={d.id} color={d.color} style={{ border: "none" }}>{d.name}</Tag></Option>);
        return (
            <div className="newentrybody">
                <table>
                    <tbody>
                        <tr>
                            <td width="160px"><div style={{ left: "0px" }} className="inptitle1">词条名</div></td>
                            <td width="220px"><Input ref="entry_name" placeholder="请输入词条名" /></td>
                            <td width="160px"><div className="inptitle">别名</div></td>
                            <td width="200px"><Input ref="entry_other_name" placeholder="请输入别名" /></td>
                            <td width="160px"><div className="inptitle">英文名</div></td>
                            <td width="200px"><Input ref="entry_eng_name" placeholder="英文名" /></td>
                        </tr>
                        <tr>
                            <td width="160px"><div className="inptitle1">标签</div></td>
                            <td width="220px">
                                <Select
                                    ref="entry_taglist"
                                    mode="tags"
                                    style={{ width: '100%' }}
                                    tokenSeparators={[',']}
                                    onChange={handleChange}
                                >
                                    {options}
                                </Select>
                            </td>
                            <td width="160px"><div className="inptitle">开启隐私</div></td>
                            <td width="200px"><Tooltip placement="top" title="允许外部应用关联词条" arrowPointAtCenter><Switch style={{marginLeft:"80px"}} /></Tooltip></td>
                            <td width="160px"><div className="inptitle">预留字段</div></td>
                            <td width="200px"><Input placeholder="预留字段" /></td>

                        </tr>
                        <tr>
                            <td width="1100px" colSpan="6">
                                <div style={{ width: '100%', display: 'inline-block' }} className="inptitle">词条目录(至多支持4级目录):
                                <Tooltip placement="topLeft" title="创建一个目录示例" arrowPointAtCenter>
                                        <div onClick={this.showtreedemo} className="tree-demo" >目录示例</div>
                                    </Tooltip>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="entry-tree-body">
                    <NewEntryTree
                        showdemo={this.state.showdemo}
                        checkEntry1={this.checkEntry1}
                        getdata1={this.state.getdata1}
                    />
                </div>

            </div>
        )
    }

}

export default NewEntry
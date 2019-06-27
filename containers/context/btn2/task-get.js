import React from 'react';
import http from '../../../http';
import { List, Card, Tag, Icon, Input, Spin, Tooltip, Badge } from 'antd';
import TaskGetMore from '../btn2/task-get-more';
import '../../../css/task-get.css';

const url = {
    "GET_DATA": http.grobal + 'HWTask/list',
    "GET_DATA_BY_CONDITION": http.grobal + 'HWTask/condition'
}

class TaskGet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openmore: false,
            listData: [],
            curitem: null
        };
    }

    async componentDidMount() {
        //获取列表数据
        const res = await http.post(url.GET_DATA, null);
        const ld = [];
        res.data.map((item, i) => {
            ld.push({
                title: item.title,
                color: item.title_color,
                describe: item.describe,
                reward: item.reward,
                status: item.status,
                createdby: item.createdby,
                createdon: item.createdon,
                new:item.new,
                tag: item.tag
            })
            return i.id;
        })
        this.setState({
            listData: ld
        })
    }

    async loadagain(event) {
        var data = {
            condition: event.target.value
        }
        const res = await http.post(url.GET_DATA_BY_CONDITION, data);
        const ld = [];
        res.data.map((item, i) => {
            ld.push({
                title: item.title,
                color: item.title_color,
                describe: item.describe,
                reward: item.reward,
                status: item.status,
                createdby: item.createdby,
                createdon: item.createdon,
                new:item.new,
                tag: item.tag
            })
            return i.id;
        })
        this.setState({
            listData: ld
        })
    }

    clickmore(event, item) {
        this.setState({
            openmore: true,
            curitem: item
        })
    }

    callbackstate = (data) => {
        this.setState({
            openmore: data.openmore
        })
    }

    render() {
        if (this.state.listData === null) {
            return (
                <Spin />
            );
        }
        return (
            <div className="context-body">
                <div className="search-tab">
                    <Icon
                        type="search"
                        style={{ position: 'absolute', top: '20px', left: '60px', height: '40px', width: '40px', color: 'rgb(225,226,227)' }} />
                    <Input
                        onChange={(event) => { this.loadagain(event) }}
                        style={{ position: 'absolute', top: '10px', left: '100px', height: '40px', border: '0', width: '600px', outline: 'medium' }}
                        placeholder="在任务中搜索" />
                </div>
                <TaskGetMore
                    openmore={this.state.openmore}
                    curitem={this.state.curitem}
                    callbackstate={this.callbackstate} />
                <div className="taskframe">
                    <List
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 4,
                            lg: 4,
                            xl: 4,
                            xxl: 4,
                        }}
                        dataSource={this.state.listData}
                        renderItem={item => (
                            <List.Item>
                                <Badge style={{float:"right"}} count={item.new}>
                                    <Card
                                        title={item.title}
                                        headStyle={{ color: item.color, fontWeight: "500", fontFamily: "微软雅黑" }}
                                        extra={<a onClick={(event) => { this.clickmore(event, item) }} href="#">More</a>}
                                        style={{ color: item.color, borderRadius: "7px", backgroundColor: "rgb(255,255,255)", boxShadow: "0 5px 10px rgb(200,200,200)" }}>
                                        {item.tag.map((value, i) =>
                                            <Tag key={i} color={value.tagcolor}>{value.tagname}</Tag>
                                        )}
                                        <Tooltip placement="topLeft" title="积分奖励" arrowPointAtCenter>
                                            <Tag color="geekblue" style={{ position: "relative", right: "-10px", float: "right" }}> {item.reward} </Tag>
                                        </Tooltip>
                                    </Card>
                                </Badge>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        )

    }
}

export default TaskGet;
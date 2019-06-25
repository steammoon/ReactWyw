import React from 'react';
import http from '../../../http';
import { List, Avatar, Icon } from 'antd';
import '../../../css/task-get.css';

const url = {
    "GET_DATA": 'http://localhost:3000/HWTask/list'
}

//const listData = [];

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);


class TaskGet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listData : []
        };
    }

    async componentDidMount(){
        //获取列表数据
        const res = await http.post(url.GET_DATA, null);
        const ld = [];
        res.data.map((item,i) =>{
            ld.push({
                    href: 'http://ant.design',
                    title: item.title,
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    description:
                        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
                    content:
                        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
                })
        
        })
        this.setState({
            listData : ld
        })
    }


    render() {
        return (
            <div className="context-body">
                <div className="context-body-frame">
                    <List
                        style={{height:'50px'}}
                        itemLayout="vertical"
                        size="small"
                        pagination={{
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: 3,
                        }}
                        dataSource={this.state.listData}
                        footer={
                            <div>
                                <b>任务列表</b>
                        </div>
                        }
                        renderItem={item => (
                            <List.Item
                                key={item.title}
                                actions={[
                                    <IconText type="star-o" text="156" />,
                                    <IconText type="like-o" text="156" />,
                                    <IconText type="message" text="2" />,
                                ]}
                                extra={
                                    <img
                                        width={272}
                                        alt="logo"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                    />
                                }
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={item.avatar} />}
                                    title={<a href={item.href}>{item.title}</a>}
                                    description={item.description}
                                />
                                {item.content}
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        )
    }
}

export default TaskGet;
import React from 'react';
import { Icon, Badge } from 'antd';
import http from '../../../http';

const url = {
    "POST_ENTRY_GETLIKES": http.grobal + 'HWEntry/getlikes',
    "POST_ENTRY_SETLIKES": http.grobal + 'HWEntry/setlikes',
}

class EntryLikes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entry: this.props.entry,
            likes: this.props.likes,
            likestyle: {
                position: "relative",
                top: "-16px",
                fontSize: '18px',
                float: "right",
                marginRight: "0px",
                cursor: "pointer"
            }
        }
    }

    enterlike = () => {
    }

    leavelike = () => {
    }

    async clicklike(event) {
        var data ={
            entry : this.state.entry
        }
        await http.post(url.POST_ENTRY_SETLIKES,data);
        const res = await http.post(url.POST_ENTRY_GETLIKES,data);
        this.setState({
            likes : res.data
        })
        event.stopPropagation();
    }

    badgec=()=>{
        event.stopPropagation();
    }

    render() {
        return (
            <Badge
                onClick={this.badgec}
                style={{ backgroundColor: "rgba(82,196,26,0.5)" }}
                offset={[5, -16]}
                count={this.state.likes}
                overflowCount={99} >
                <Icon
                    onClick={(event) => { this.clicklike(event) }}
                    onMouseEnter={this.enterlike}
                    onMouseLeave={this.leavelike}
                    style={this.state.likestyle}
                    type="like" />
            </Badge>
        )
    }
}


export default EntryLikes;
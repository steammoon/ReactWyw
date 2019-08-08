import React from 'react';
import wx from '../../libs/wx/wx';

class SigninByWX extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        wx.WwLogin();
    }


    render() {
        return (
            <div id='wx_reg' style={this.props.wxstyle} ></div>
        );
    }

}

export default SigninByWX;
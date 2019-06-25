import React from 'react';

class SigninByWX extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
       
    }


    render() {
        return (
            <div id='wx_reg' style={this.props.wxstyle} ></div>
        );
    }

}

export default SigninByWX;
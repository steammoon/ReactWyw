import React from 'react';


class Gamer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            gstyle: {
                width: '30px',
                height: '30px',
                position : 'absolute',
                top: '300px'
            }
        }
    }


    render(){
        return(
            <div className="gamer" style={this.state.gstyle}>
            </div>
        )
    }

}

export default Gamer
import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

class Test extends Component {
    constructor (props) {
        super(props)
    }

   render() {
       return (
           <div className="container">
           <div className="row">
           <div className="col-xs-1 col-xs-offset-11">
           <h1>Hello</h1>
           </div>
           </div>
           </div>
       );
   }
}
export default Test;
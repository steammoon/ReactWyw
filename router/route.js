// Router 配置
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import App from './../App';

import Test from './../containers/test';
import Home from './../containers/home';
import Signin from './../containers/signin';

const Root = () => (
   <div>
      <Switch>
         <Route
            path="/"
            render={props => (
               <App>
                  <Switch>
                     <Route path="/" exact component={Home} />
                     <Route path="/home" component={Home} />
                     <Route path="/test" component={Test} />
                     <Route path="/signin" component={Signin} />
                      {/*路由不正确时，默认跳回home页面*/}
                     <Route render={() => <Redirect to="/" />} />
                  </Switch>
               </App>
            )}
         />
      </Switch>
   </div>
);

export default Root;

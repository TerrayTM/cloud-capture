import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Home from './pages/Home/Home';
import Room from './pages/Room/Room';
import Donate from './pages/Donate/Donate';
import Contact from './pages/Contact/Contact';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Layout from './Layout';

class App extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/donate" component={Donate}/>
                    <Route path="/contact" component={Contact}/>
                    <Route path="/room/:id" exact component={Room}/>
                    <Route path="/" exact component={Home}/>
                    <Route path="/" component={ErrorPage}/>
                </Switch>
            </Layout>
        );
    }
}

export default withRouter(App);
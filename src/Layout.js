import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import NavigationBar from './components/navigation/NavigationBar/NavigationBar';
import SideBar from './components/navigation/SideBar/SideBar';
import Footer from './components/Footer/Footer';
import Dialog from './components/Dialog/Dialog';
import * as actions from './store/actions/actions';
import { generateCode } from './helper';
import { apiEndpoint } from './config';

class Layout extends Component {
    state = {
        sideBarVisible: false,
        joinVisible: false,
        code: '',
        loading: false,
        error: null,
        canCreate: true
    }

    componentDidUpdate(previousProps) {
        if (previousProps.location.pathname !== this.props.location.pathname && this.state.sideBarVisible) {
            this.setState({ sideBarVisible: false });
        }
    }

    componentWillUnmount() {
        this.props.freeFiles();
    }

    toggleSideBarHandler = () => {
        this.setState((previous) => {
            return {
                sideBarVisible: !previous.sideBarVisible
            };
        });
    }

    joinRoom = async () => {
        if (!this.state.code || this.state.code.length !== 6) {
            this.setState({ error: 'Invalid room code!' });
            return;
        }
        let count = 0;
        for (let i = 0; i < this.state.code.length; ++i) {
            if (isNaN(this.state.code.charAt(i))) {
                ++count;
            } else {
                count = 0;
            }
            if (count > 2) {
                this.setState({ error: 'Invalid room code!' });
                return;
            }
        }
        this.setState({ loading: true, error: null });
        try {
            const body = new FormData();
            body.append('id', this.state.code.toUpperCase());
            let response = await fetch(`${apiEndpoint}/services/room`, {
                method: 'post',
                body
            });
            response = await response.text();
            if (response === 'VALID') {
                const id = this.state.code;
                this.setState({ loading: false, error: null, code: '', joinVisible: false });
                this.props.history.push(`/room/${id}`);
            } else {
                this.setState({ loading: false, error: 'Invalid room code!' });
            }
        } catch (error) {
            this.setState({ loading: false, error: 'Server is offline, please try again later.' });
        }
    }

    newRoom = async () => {
        if (this.state.canCreate) {
            this.setState({ canCreate: false });
            const code = await generateCode();
            this.props.history.push(`/room/${code}`);
            setTimeout(() => {
                this.setState({ canCreate: true });
            }, 1000);
        }
    };

    render() {
        return (
            <Fragment>
                <NavigationBar sideMenuClick={this.toggleSideBarHandler} joinRoom={() => this.setState({ joinVisible: true })} newRoom={this.newRoom}/>
                <SideBar show={this.state.sideBarVisible} sideMenuClick={this.toggleSideBarHandler} close={this.toggleSideBarHandler} joinRoom={() => this.setState({ joinVisible: true, sideBarVisible: false })} newRoom={this.newRoom}/>
                <main>
                    <Dialog close={() => this.setState({ joinVisible: false, error: null, code: '' })} error={this.state.error} loading={this.state.loading} show={this.state.joinVisible} code={this.state.code} changeCode={(event) => this.setState({ code: event.target.value.toUpperCase() })} join={this.joinRoom}/>
                    {this.props.children}
                </main>
                <Footer/>
            </Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        freeFiles: () => dispatch(actions.freeFiles())
    };
};

export default withRouter(connect(null, mapDispatchToProps)(Layout));
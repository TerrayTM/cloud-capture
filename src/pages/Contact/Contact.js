import React, { Component, Fragment } from 'react';

import ContactArea from '../../components/ContactArea/ContactArea';
import Hero from '../../components/Hero/Hero';
import classes from './Contact.css';

class Contact extends Component {
    state = {
        loading: false,
        error: null,
        success: false
    }
    
    submitForm = async (data) => {
        this.setState({ loading: true, error: null, success: false });
        const content = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'API-Route': 'Message'
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                message: `[Cloud Capture]: ${data.message}`
            })
        };
        try {
            let response = await fetch('https://terrytm.com/api/wain.php', content);
            response = await response.json();
            if (!response.error) {
                this.setState({ success: true, loading: false });
            } else {
                this.setState({ error: response.message, loading: false });
            }
        } catch (error) {
            this.setState({ error, loading: false });
        }
    }

    render() {
        return (
            <Fragment>
                <Hero color="#36ACDB">
                    <h1 className={classes.Header}>Contact Us</h1>
                </Hero>
                <ContactArea close={() => this.setState({ success: false })} submit={this.submitForm} loading={this.state.loading} success={this.state.success} error={this.state.error} reset={() => this.setState({ error: null })}/>
            </Fragment>
        );
    } 
}

export default Contact;
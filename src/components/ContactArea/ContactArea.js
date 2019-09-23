import React from 'react';

import Form from '../Form/Form';
import classes from './ContactArea.css';
import ErrorHandler from '../ErrorHandler/ErrorHandler';
import Loader from '../userInterfaces/Loader/Loader';
import Success from '../../assets/images/Check.png';

const contactControls = [
    {
        type: 'input',
        name: 'name',
        label: 'Name:',
        elementConfiguration: {
            type: 'text',
            placeholder: 'Name'
        },
        validation: {
            required: true
        }
    },
    {
        type: 'input',
        name: 'email',
        label: 'Email:',
        elementConfiguration: {
            type: 'text',
            placeholder: 'Email'
        },
        validation: {
            required: true,
            email: true
        }
    },
    {
        type: 'textarea',
        name: 'message',
        label: 'Message:',
        elementConfiguration: {
            placeholder: 'Message'
        },
        validation: {
            required: true,
            maxLength: 4096
        }
    }
];

const contactArea = (props) => {
    let element = <Form controls={contactControls} submit={props.submit} submitLabel="Send Message"/>;
    if (props.success) {
        element = (
            <div className={classes.Success} onClick={props.close}>
                <img src={Success} alt="Success"/>
                <p>Thank you for your message! We will get back to you as soon as possible.</p>
            </div>
        );
    } else if (props.loading) {
        element = <div className={classes.LoaderHolder}><Loader/></div>;
    }
    return (
        <section className={classes.ContactArea}>
            <div>
                <h2>Contact</h2>
                {props.error ? <ErrorHandler error={<p>An error has occurred. Please try again later.</p>} resetError={props.reset}/> : null}
                {element}
            </div>
        </section>
    );
};

export default contactArea;
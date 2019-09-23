import React, { Fragment } from 'react';

import classes from './Dialog.css';
import Button from '../userInterfaces/Button/Button';
import Backdrop from '../userInterfaces/Backdrop/Backdrop';
import Loader from '../userInterfaces/Loader/Loader';

const dialog = (props) => {
    let element = (
        <Fragment>
            <span className={classes.Close} onClick={props.close}>&times;</span>
            <h2>Enter the room code:</h2>
            <input type="text" maxLength="6" placeholder="Code" value={props.code} onChange={props.changeCode}/>
            {props.error ? <p className={classes.Error}>{props.error}</p> : null}
            <Button width="100%" click={props.join}>Join Room!</Button>
        </Fragment>
    );
    if (props.loading) {
        element = <div className={classes.LoaderHolder}><Loader/><h4>Joining room...</h4></div>
    }
    return (
        <Fragment>
            <Backdrop show={props.show} click={props.loading ? null : props.close}/>
            <div className={[classes.Dialog, props.show ? classes.Show : null].join(' ')}>
                {element}
            </div>
        </Fragment>
    );
};

export default dialog;
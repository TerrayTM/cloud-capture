import React from 'react';

import classes from './ErrorHandler.css';

const errorHandler = (props) => (
    <div className={classes.ErrorHandler}>
        {props.error}
        {props.resetError ? <div onClick={props.resetError}>&times;</div> : null}
    </div>
);

export default errorHandler;

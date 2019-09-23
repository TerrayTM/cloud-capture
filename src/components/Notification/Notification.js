import React from 'react';

import classes from './Notification.css';

const notification = (props) => (
    <div className={[classes.Notification, props.show ? classes.Show : null, props.left ? classes.Left : null].join(' ')}>
        <p>{props.message}</p>
    </div>
);

export default notification;
import React from 'react';

import classes from './Cloud.css';

const cloud = (props) => (
    <div className={[classes.Cloud, props.delay ? classes.AnimationDelay : null].join(' ')} style={{ top: `${props.y}px`, left: `${props.x}px`, width: `${props.size}px`, height: `${props.size}px` }}></div>
);

export default cloud;
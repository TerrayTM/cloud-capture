import React from 'react';

import classes from './Button.css';

const button = (props) => (
    <button onClick={props.click} disabled={props.disabled} className={[classes.Button, props.sideBar ? classes.SideBar : null].join(' ')} style={{ margin: props.margin, width: props.width }}>{props.children}</button>
);

export default button;
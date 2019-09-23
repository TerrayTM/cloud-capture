import React from 'react';

import classes from './Backdrop.css';

const backdrop = (props) => (
    <div className={[props.show ? classes.Show : '', classes.Backdrop].join(' ')} onClick={props.click}></div>
);

export default backdrop;
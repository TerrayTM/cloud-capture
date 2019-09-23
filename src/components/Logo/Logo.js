import React from 'react';

import Logo from '../../assets/images/Logo.png';
import classes from './Logo.css';

const logo = () => (
    <div className={classes.Logo}>
        <img draggable={false} src={Logo} alt=""/>
        <h3>Cloud Capture</h3>
    </div>
);

export default logo;
import React from 'react';
import { Link }from 'react-router-dom';

import Button from '../userInterfaces/Button/Button';
import { generate } from '../../helper';
import classes from './HeroArea.css'

const heroArea = () => (
    <section className={classes.HeroArea}>
        <div>
            <h1>Cloud Capture</h1>
            <h2>Instantly transfer images and files<br className={classes.MobileOnly}/> from one device to another.</h2>
            <h2 className={classes.DesktopOnly}>Simple, free, and no registration required.</h2>
            <Link to={`/room/${generate()}`}><Button>Let's Get Started</Button></Link>
        </div>
    </section>
);

export default heroArea;
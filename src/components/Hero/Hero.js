import React from 'react';

import classes from './Hero.css'

const hero = (props) => (
    <section className={classes.Hero} style={{backgroundColor: props.color ? props.color : '', backgroundImage: props.image ? `url(${props.image})` : ''}}>
        <div>
            {props.children}
        </div>
    </section>
);

export default hero;
import React from 'react';

import classes from './TextArea.css';

const textArea = (props) => (
    <section className={classes.TextArea} style={{ backgroundColor: props.color }}>
        <div>
            <h2>{props.title}</h2>
            <p>{props.children}</p>
        </div>
    </section>
);

export default textArea;
import React from 'react';

import classes from './ErrorPage.css';

const errorPage = () => (
    <section className={classes.Error}>
        <div>
            <h1>404 Not Found</h1>
            <p>The page you are requesting does not exist.</p>
            <p>Please make sure your URL is correct.</p>
        </div>
    </section>
);

export default errorPage;
import React from 'react';

import classes from './Footer.css';

const footer = () => (
    <footer className={classes.Footer}>
        <div>
            <p>Made By Terry Zheng</p>
            <p>Copyright &copy; <a href="https://terrytm.com" target="_blank" rel="noopener noreferrer">Terry™</a> 2019</p>
        </div>
    </footer>
);

export default footer;
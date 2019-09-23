import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import Button from '../../userInterfaces/Button/Button';
import classes from './NavigationBar.css';
import Logo from '../../Logo/Logo';

const navigationBar = (props) => (
    <header className={classes.NavigationBar}>
        <Button click={props.sideMenuClick} sideBar>☰</Button>
        <Logo/>
        <nav className={classes.DesktopOnly}>
            <NavigationItems joinRoom={props.joinRoom} newRoom={props.newRoom}/>
        </nav>
    </header>
);

export default navigationBar;
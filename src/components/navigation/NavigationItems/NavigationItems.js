import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css'

import Home from '../../../assets/images/Home.png';
import Donate from '../../../assets/images/Donate.png';
import Contact from '../../../assets/images/Contact.png';

const navigationItems = (props) => (
    <ul className={[classes.NavigationItems, props.sideBar ? classes.SideBar : null].join(' ')}>
        <NavigationItem sideBar={props.sideBar} icon={Home} to="/" exact>Home</NavigationItem>
        <NavigationItem sideBar={props.sideBar} icon={Donate} to="/donate">Donate</NavigationItem>
        <NavigationItem sideBar={props.sideBar} icon={Contact} to="/contact">Contact</NavigationItem>
        <NavigationItem sideBar={props.sideBar} styleClass={props.sideBar ? null : classes.New} color="#525252" click={props.newRoom}>New Room</NavigationItem>
        <NavigationItem sideBar={props.sideBar} styleClass={props.sideBar ? null : classes.Join} color="#ec5252" click={props.joinRoom}>Join Room</NavigationItem>
    </ul>
);

export default navigationItems;
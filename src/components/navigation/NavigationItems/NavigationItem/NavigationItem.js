import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css'

const navigationItem = (props) => {
    let element = null;
    if (props.click) {
        element = (
            <li className={[classes.NavigationItem, classes.DivElement, props.sideBar ? classes.SideBar : null].join(' ')} onClick={props.click}>
                <div className={[classes.LinkElement, props.styleClass].join(' ')}>
                    {props.icon ? <img className={classes.Icon} src={props.icon} draggable={false} alt=""/> : <div className={classes.Icon} style={{ backgroundColor: props.color }}></div>}
                    <span>{props.children}</span>
                </div>
            </li>
        );
    } else {
        element = (
            <li className={[classes.NavigationItem, props.sideBar ? classes.SideBar : null, props.styleClass].join(' ')}>
                <NavLink className={classes.LinkElement} to={props.to} activeClassName={classes.active} exact={props.exact}>
                    {props.icon ? <img className={classes.Icon} src={props.icon} draggable={false} alt=""/> : <div className={classes.Icon} style={{ backgroundColor: props.color }}></div>}
                    <span>{props.children}</span>
                </NavLink>
            </li>
        );
    }
    return element;
};

export default navigationItem;
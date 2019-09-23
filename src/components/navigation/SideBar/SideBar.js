import React, { Fragment } from 'react';

import Backdrop from '../../userInterfaces/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideBar.css'
import Button from '../../userInterfaces/Button/Button';

const sideBar = (props) => (
    <Fragment>
        <Backdrop click={props.close} show={props.show}/>
        <div className={[props.show ? classes.Show : '', classes.SideBar].join(' ')}>
            <nav>
                <div>
                    <div className={classes.Head}>
                        <Button click={props.sideMenuClick} sideBar>☰</Button>
                    </div>
                    <NavigationItems sideBar joinRoom={props.joinRoom} newRoom={props.newRoom}/>
                </div>
                <div className={classes.Footer}>
                    <p>Copyright &copy; Terry™ 2019</p>
                </div>
            </nav>
        </div>
    </Fragment>
);

export default sideBar;
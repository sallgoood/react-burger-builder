import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Aux'

import styles from './SideDrawer.module.css'

const sideDrawer = (props) => {
    let attachedStyles = [styles.SideDrawer, styles.Close];
    if(props.shown) {
        attachedStyles = [styles.SideDrawer, styles.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.shown} clicked={props.closed}/>
            <div className={attachedStyles.join(' ')}>
                <div className={styles.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;
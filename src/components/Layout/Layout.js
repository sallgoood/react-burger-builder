import React from 'react'
import Aux from '../../hoc/Aux'
import styles from './Layout.css'

//Higher order component approach
const layout = (props) => (
    <Aux>
        <div>
            Toolbar, SideDrawer, Backdrop
        </div>

        <main className={styles.content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;
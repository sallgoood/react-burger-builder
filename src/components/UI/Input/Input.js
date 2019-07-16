import React from 'react'

import styles from './Input.module.css'

const input = (props) => {
    let inputElement = null;

    switch (props.elementType) {
        case('input'):
            inputElement = <input className={styles.InputElement}
                                  value={props.value}
                                  {...props.elementConfig}/>;
            break;
        case('textarea'):
            inputElement = <textarea className={styles.InputElement}
                                     value={props.value}
                                     {...props.elementConfig}/>;
            break;
        default:
            inputElement = <input className={styles.InputElement}
                                  value={props.value}
                                  {...props.elementConfig}/>
    }

    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;
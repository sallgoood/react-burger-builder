import React from 'react'

import styles from './Input.module.css'

const input = (props) => {
    let inputElement = null;

    const inputStyles = [styles.InputElement];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputStyles.push(styles.Invalid);
    }

    switch (props.elementType) {
        case('input'):
            inputElement = <input className={inputStyles.join(' ')}
                                  value={props.value}
                                  onChange={props.changed}
                                  {...props.elementConfig}/>;
            break;
        case('textarea'):
            inputElement = <textarea className={inputStyles.join(' ')}
                                     value={props.value}
                                     onChange={props.changed}
                                     {...props.elementConfig}/>;
            break;
        case('select'):
            inputElement = (
                <select className={inputStyles.join(' ')}
                        onChange={props.changed}
                        value={props.value} // for 2-way-binding this value should be set
                        {...props.elementConfig}>
                    {props.elementConfig.options.map(op => (
                        <option key={op.value} value={op.value}>{op.displayValue}</option>
                    ))}
                </select>);
            break;
        default:
            inputElement = <input className={inputStyles.join(' ')}
                                  onChange={props.changed}
                                  value={props.value}
                                  {...props.elementConfig}/>
    }

    return (
        <
            div
            className={styles.Input}>
            < label
                className={styles.Label}> {props.label}
            </label>
            {inputElement}
        </div>
    );
};

export default input;
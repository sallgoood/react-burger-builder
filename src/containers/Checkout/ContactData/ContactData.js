import React, {Component} from 'react'
import Button from '../../../components/UI/Button/Button'

import styles from './ContactData.module.css'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zipCode: ''
        }
    };


    render() {
        return (
            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form>
                    <input type="text" name="name" placeholder="Your name"/>
                    <input type="text" name="email" placeholder="Your email"/>
                    <input type="text" name="street" placeholder="Your street"/>
                    <input type="text" name="zipCode" placeholder="Your zipCode"/>
                    <Button btnType="Success">ORDER</Button>
                </form>
            </div>
        );
    }

}

export default ContactData;
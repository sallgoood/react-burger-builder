import React, {Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

import styles from './ContactData.module.css'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zipCode: ''
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault(); //to prevent to send the request and reload the page
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Liant',
                address: {
                    street: 'Street 01',
                    zipCode: '1582531',
                    country: 'Japan'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fatest'
        };

        const orderCommand = {
            data: order
        };

        axios.post('/orders/commands/create-order', orderCommand)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(err => this.setState({loading: false}));
    };


    render() {
        let form = (
            <form>
                <Input inputtype="input" type="text" name="name" placeholder="Your name"/>
                <Input inputtype="input" type="text" name="email" placeholder="Your email"/>
                <Input inputtype="input" type="text" name="street" placeholder="Your street"/>
                <Input inputtype="input" type="text" name="zipCode" placeholder="Your zipCode"/>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>);

        if (this.state.loading) {
            form = <Spinner/>
        }

        return (
            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }

}

export default ContactData;
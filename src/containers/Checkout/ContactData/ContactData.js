import React, {Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

import styles from './ContactData.module.css'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Zip Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault(); //to prevent to send the request and reload the page
        this.setState({loading: true});
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            ...formData
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

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormEl = {...updatedOrderForm[inputIdentifier]};

        updatedFormEl.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormEl;
        this.setState({orderForm: updatedOrderForm})
    };
    render() {
        const formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements.map(formEl => (
                    <Input elementType={formEl.config.elementType}
                           elementConfig={formEl.config.elementConfig}
                           value={formEl.config.value}
                           changed={(event) => this.inputChangeHandler(event, formEl.id)}/>
                ))}
                <Button btnType="Success">ORDER</Button>
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
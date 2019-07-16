import React, {Component} from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withHttpErrorHandler from '../../hoc/withErrorHandler/withHttpErrorHandler'

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        axios.get('/orders')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                console.log("fetchedOrders", fetchedOrders);
                this.setState({loading: false, orders: fetchedOrders})
            })
            .catch(err => {
                this.setState({loading: false})
            })
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order
                        key={order.data.id}
                        price={order.data.price}
                        ingredients={order.data.ingredients}/>
                ))}
            </div>
        );
    }
}

export default withHttpErrorHandler(Orders, axios);
import React, {Component} from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withHttpErrorHandler from '../../hoc/withErrorHandler/withHttpErrorHandler'
import {connect} from 'react-redux'
import * as actionTypes from '../../store/actions'

class BurgerBuilder extends Component {

    //legacy
    // constructor(props) {
    //     super(props);
    //     this.state = {}
    // }
    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        // axios.get('kitchen/query/ingredients')
        //     .then(response => {
        //         this.setState({ingredients: response.data});
        //     })
        //     .catch(err => {
        //         this.setState({
        //             error: true
        //         })
        //     });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(ingKey => ingredients[ingKey])
            .reduce((sum, el) => sum + el);
        return sum > 0;
    };

    // This syntax won't work correctly at least we try to use 'this' keyword in here, 'this' won't refer to the class
    // purchaseHandler() {
    //     this.setState({purchasing: true});
    // }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        this.props.history.push('checkout');
    };

    render() {
        const ingredientStockState = {
            ...this.props.ings
        };

        for (let ingKey in ingredientStockState) {
            ingredientStockState[ingKey] = ingredientStockState[ingKey] <= 0
        }
        // {salad: true, meat: false, ...}

        let orderSummary = null;

        let burger = this.state.error ?
            <p>Ingredients can't be loaded!</p>
            :
            <Spinner/>;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger
                        ingredients={this.props.ings}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={ingredientStockState}
                        purchasable={this.updatePurchaseState(this.props.ings)} //we want to execute this whenever this get rendered
                        ordered={this.purchaseHandler}
                        price={this.props.price}/>
                </Aux>);

            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}/>;
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}


const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({
            type: actionTypes.ADD_INGREDIENT,
            ingredientName: ingName
        }),
        onIngredientRemoved: (ingName) => dispatch({
            type: actionTypes.REMOVE_INGREDIENT,
            ingredientName: ingName
        })
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withHttpErrorHandler(BurgerBuilder, axios));

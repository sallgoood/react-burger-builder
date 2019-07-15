import React, {Component} from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withHttpErrorHandler from '../../hoc/withErrorHandler/withHttpErrorHandler'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    //legacy
    // constructor(props) {
    //     super(props);
    //     this.state = {}
    // }

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axios.get('kitchen/query/ingredients')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(err => {
                this.setState({
                    error: true
                })
            });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(ingKey => ingredients[ingKey])
            .reduce((sum, el) => sum + el);
        this.setState({purchasable: sum > 0})
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if (oldCount <= 0) return;

        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
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
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
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
            .then(response => this.setState({loading: false, purchasing: false}))
            .catch(err => this.setState({loading: false, purchasing: false}));
    };

    render() {
        const ingredientStockState = {
            ...this.state.ingredients
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

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger
                        ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={ingredientStockState}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice}/>
                </Aux>);

            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
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

export default withHttpErrorHandler(BurgerBuilder, axios);
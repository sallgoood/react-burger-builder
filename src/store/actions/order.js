import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (order, orderCommand) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        purchasedOrder: order
    }
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
};

export const purchaseBurger = (orderCommand) => {
    return dispatch => { // dispatch function from redux thunk middleware
        dispatch(purchaseBurgerStart());
        axios.post('/orders/commands/create-order', orderCommand)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data, orderCommand));
            })
            .catch(err =>
                dispatch(purchaseBurgerFail(err)));
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
};

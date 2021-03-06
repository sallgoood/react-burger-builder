import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import burgerBuilderReducer from './store/reducers/burgerBuilder'
import orderReducer from './store/reducers/order'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    burgerBuilderReducer: burgerBuilderReducer,
    orderReducer: orderReducer
});

const store = createStore(rootReducer, /* preloadedSta
te, */ composeEnhancers(
    applyMiddleware(thunk)
));

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Layout>
                        <Switch>
                            <Route path="/checkout" component={Checkout}/>
                            <Route path="/orders" component={Orders}/>
                            <Route path="/" component={BurgerBuilder}/>
                            <Checkout/>
                        </Switch>
                    </Layout>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;

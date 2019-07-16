import React from 'react'

import styles from './Order.module.css'

//FIXME price is not stored and cannot be seen
const order = (props) => {
    const ingredients = [];

    //Duplicated with code in Burger transformedIngredients
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount :props.ingredients[ingredientName]
        });
    }

    const ingredientsOutput = ingredients.map(ig => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ig.name}>{ig.name} ({ig.amount})</span>
    });

    return (
        <div className={styles.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price)}</strong></p>
        </div>
    );
};

export default order;
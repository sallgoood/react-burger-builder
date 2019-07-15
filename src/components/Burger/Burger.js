import React from 'react'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

import styles from './Burger.module.css'


const burger = (props) => {
    const transformedIngredients = Object.keys(props.ingredients)
        .map(ingKey => {
                return [...Array(props.ingredients[ingKey])]
                    .map((_, index) => {
                        return <BurgerIngredient key={ingKey + index} type={ingKey}/>
                    })});

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;
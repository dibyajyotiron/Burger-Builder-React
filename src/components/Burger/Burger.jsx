import React from "react";
import "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import Auxiliary from "./../../HOC/Auxiliary";

const Burger = props => {
	let transformedIngredients = Object.keys(props.ingredients)
		.map(igKey => {
			return [...Array(props.ingredients[igKey])].map((_, i) => {
				return <BurgerIngredient key={igKey + i} type={igKey} />;
			});
		})
		.reduce((acc, curr) => {
			return acc.concat(curr);
		}, []);

	transformedIngredients = transformedIngredients.length ? (
		transformedIngredients
	) : (
		<p>"Please add ingredients to continue!"</p>
	);

	return (
		<div className="Burger">
			<Auxiliary>
				<BurgerIngredient type="bread-top" />
				{transformedIngredients}
				<BurgerIngredient type="bread-bottom" />
			</Auxiliary>
		</div>
	);
};

export default Burger;

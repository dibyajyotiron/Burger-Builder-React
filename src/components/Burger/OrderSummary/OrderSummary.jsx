import React from "react";
import Auxiliary from "./../../../HOC/Auxiliary";
import Button from "./../../UI/Button/Button";
const OrderSummary = props => {
	const ingredientSummery = Object.keys(props.ingredients).map(el => (
		<li key={el}>
			<span style={{ textTransform: "capitalize" }}>{el}: </span>
			<strong>{props.ingredients[el]}</strong>
		</li>
	));
	return (
		<Auxiliary>
			<h3>Your Order</h3>
			<p>A delicious burger with the following ingredients:</p>
			<ul>{ingredientSummery}</ul>
			<p>Continue to checkout!</p>
			<p>
				Total Price: $
				<span style={{ fontWeight: "bold" }}>{props.price.toFixed(2)}</span>
			</p>
			<Button btnType="Danger" clicked={props.purchaseCancelled}>
				Cancel
			</Button>
			<button
				type="button"
				clicked={props.purchaseContinue}
				className="btn btn-outline-info"
			>
				Continue
			</button>
		</Auxiliary>
	);
};

export default OrderSummary;

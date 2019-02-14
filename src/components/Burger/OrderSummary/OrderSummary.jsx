import React, { Component } from "react";
import Button from "./../../UI/Button/Button";
import Auxiliary from "./../../../HOC/Auxiliary/Auxiliary";

class OrderSummary extends Component {
	// componentWillUpdate() {
	// 	console.log("Order Summary update");
	// }

	render() {
		const ingredientSummery = Object.keys(this.props.ingredients).map(el => (
			<li key={el}>
				<span style={{ textTransform: "capitalize" }}>{el}: </span>
				<strong>{this.props.ingredients[el]}</strong>
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
					<span style={{ fontWeight: "bold" }}>
						{this.props.price.toFixed(2)}
					</span>
				</p>
				<Button btnType="Danger" clicked={this.props.purchaseCancelled}>
					Cancel
				</Button>
				<Button
					btnType="Success"
					clicked={this.props.purchaseContinue}
					className="btn btn-outline-info"
				>
					Continue
				</Button>
			</Auxiliary>
		);
	}
}

export default OrderSummary;

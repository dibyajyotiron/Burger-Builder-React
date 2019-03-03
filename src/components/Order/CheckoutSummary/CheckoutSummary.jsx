import React from "react";
import Burger from "./../../Burger/Burger";
import Button from "./../../UI/Button/Button";
import "./CheckoutSummary.css";

const CheckoutSummary = props => {
	return (
		<div className="CheckoutSummary">
			<h1>Let's check your delicious burger out!</h1>
			<div style={{ width: "100%", margin: "auto" }}>
				<Burger ingredients={props.ingredients} />
			</div>
			<Button clicked={props.checkoutCancelled} btnType="Danger">
				Cancel
			</Button>
			<Button clicked={props.checkoutContinued} btnType="Success">
				Continue
			</Button>
		</div>
	);
};

export default CheckoutSummary;

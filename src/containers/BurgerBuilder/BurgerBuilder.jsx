import React, { Component } from "react";
import Auxiliary from "./../../HOC/Auxiliary";
import Burger from "./../../components/Burger/Burger";
import BuildControls from "./../../components/Burger/BuildControls/BuildControls";
import Modal from "./../../components/UI/Modal/Modal";
import OrderSummary from "./../../components/Burger/OrderSummary/OrderSummary";
const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
};

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			meat: 0,
			salad: 0,
			bacon: 0,
			cheese: 0,
		},
		totalPrice: 4,
		purchaseable: false,
		purchasing: false,
	};

	updatePurchaseState(ingredients) {
		// const sum = Object.keys(ingredients)
		// 	.map(el => {
		// 		return [...Array(ingredients[el])].map(el2 => el);
		// 	})
		// 	.flat().length;
		const sum = Object.values(ingredients).reduce((acc, curr) => acc + curr, 0);
		this.setState({ purchaseable: sum > 0 });
	}

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	addIngredientHandler = type => {
		const count = this.state.ingredients[type];
		const updatedCount = count + 1;
		const updatedIngredients = {
			...this.state.ingredients,
		};
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
		this.updatePurchaseState(updatedIngredients);
	};
	removeIngredientHandler = type => {
		const count = this.state.ingredients[type];
		const updatedCount = count > 0 ? count - 1 : count;
		const price = this.state.totalPrice - INGREDIENT_PRICES[type];
		const updatedIngredients = {
			...this.state.ingredients,
		};
		updatedIngredients[type] = updatedCount;
		this.setState({ ingredients: updatedIngredients, totalPrice: price });
		this.updatePurchaseState(updatedIngredients);
	};
	purchaseCancel = () => {
		this.setState({ purchasing: false });
	};
	purchaseContinueHandler = () => {
		alert("Continue");
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients,
		};
		for (let i in disabledInfo) {
			disabledInfo[i] = disabledInfo[i] <= 0;
		}
		return (
			<Auxiliary>
				<Modal modalClosed={this.purchaseCancel} show={this.state.purchasing}>
					<OrderSummary
						price={this.state.totalPrice}
						purchaseCancelled={this.purchaseCancel}
						purchaseContinue={this.purchaseContinueHandler}
						ingredients={this.state.ingredients}
					/>
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					purchasing={this.purchaseHandler}
					purchaseable={this.state.purchaseable}
					price={this.state.totalPrice}
					disabled={disabledInfo}
					addIngredient={this.addIngredientHandler}
					removeIngredient={this.removeIngredientHandler}
				/>
			</Auxiliary>
		);
	}
}

export default BurgerBuilder;

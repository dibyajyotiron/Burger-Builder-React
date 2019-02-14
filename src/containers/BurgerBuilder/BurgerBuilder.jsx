import React, { Component } from "react";
import Auxiliary from "./../../HOC/Auxiliary/Auxiliary";
import Burger from "./../../components/Burger/Burger";
import BuildControls from "./../../components/Burger/BuildControls/BuildControls";
import Modal from "./../../components/UI/Modal/Modal";
import OrderSummary from "./../../components/Burger/OrderSummary/OrderSummary";

import axios from "../../axios-orders";
import Spinner from "./../../components/UI/Spinner/Spinner";
import withErrorHandler from "./../../HOC/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
};

class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 4,
		purchaseable: false,
		purchasing: false,
		loading: false,
		error: false,
	};

	componentDidMount = async () => {
		try {
			const response = await axios.get(
				"https://burger-builder-react-5f49e.firebaseio.com/ingredients.json",
			);
			this.setState({ ingredients: response.data });
			console.log(response);
		} catch (error) {
			this.setState({ error: true });
		}
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
	purchaseContinueHandler = async () => {
		// alert("Continue");
		try {
			this.setState({ loading: true });
			const orderBody = {
				ingredients: this.state.ingredients,
				price: this.state.totalPrice,
				customer: {
					name: "Dibyajyoti Ghosal",
					address: {
						street: "Test Street",
						zipCode: "560078",
						country: "India",
					},
					email: "dibya@jyoti.com",
				},
				deliveryMethod: "fastest",
			};
			const response = await axios.post("/orders.json", orderBody);
			console.log(response);
			this.setState({ loading: false, purchasing: false });
		} catch (ex) {
			console.log(ex);
			this.setState({ loading: false, purchasing: false });
		}
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients,
		};
		for (let i in disabledInfo) {
			disabledInfo[i] = disabledInfo[i] <= 0;
		}

		let orderSummary = null;

		let burger = this.state.error ? (
			<p style={{ textAlign: "center" }}>Ingredients can not be loaded!</p>
		) : (
			<Spinner />
		);

		if (this.state.ingredients) {
			burger = (
				<Auxiliary>
					( <Burger ingredients={this.state.ingredients} />
					<BuildControls
						purchasing={this.purchaseHandler}
						purchaseable={this.state.purchaseable}
						price={this.state.totalPrice}
						disabled={disabledInfo}
						addIngredient={this.addIngredientHandler}
						removeIngredient={this.removeIngredientHandler}
					/>
					)
				</Auxiliary>
			);
			orderSummary = (
				<OrderSummary
					price={this.state.totalPrice}
					purchaseCancelled={this.purchaseCancel}
					purchaseContinue={this.purchaseContinueHandler}
					ingredients={this.state.ingredients}
				/>
			);
		}
		if (this.state.loading) {
			orderSummary = <Spinner />;
		}
		return (
			<Auxiliary>
				<Modal modalClosed={this.purchaseCancel} show={this.state.purchasing}>
					{orderSummary}
				</Modal>
				{burger}
			</Auxiliary>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);

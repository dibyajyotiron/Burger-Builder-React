import React, { Component } from "react";
import Button from "./../../../components/UI/Button/Button";
import "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "./../../../components/UI/Spinner/Spinner";
class ContactData extends Component {
	state = {
		name: "",
		email: "",
		address: {
			street: "",
			postalCode: "",
		},
		loading: false,
	};

	orderHandler = async event => {
		event.preventDefault();
		try {
			this.setState({ loading: true });
			const orderBody = {
				ingredients: this.props.ingredients,
				price: this.props.price,
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
			console.log(orderBody);
			await axios.post("/orders.json", orderBody);
			this.setState({ loading: false });
			this.props.history.push("/");
		} catch (ex) {
			console.log(ex);
			this.setState({ loading: false });
		}
	};

	render() {
		let form = (
			<form action="">
				<input
					className="Input"
					type="text"
					name="name"
					placeholder="Your name"
				/>
				<input
					className="Input"
					type="email"
					name="email"
					placeholder="Your email"
				/>
				<input
					className="Input"
					type="text"
					name="street"
					placeholder="Your street"
				/>
				<input
					className="Input"
					type="number"
					name="postal"
					placeholder="Your postal code"
				/>
				<Button clicked={this.orderHandler} btnType="Success">
					Place Order
				</Button>
			</form>
		);
		if (this.state.loading) form = <Spinner />;
		return (
			<div className="ContactData">
				<h4>Enter your contact information: </h4>
				{form}
			</div>
		);
	}
}

export default ContactData;

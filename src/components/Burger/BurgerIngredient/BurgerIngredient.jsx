/* eslint-disable default-case */
import React, { Component } from "react";
import "./BurgerIngredient.css";
// import Auxiliary from "./../../../HOC/Auxiliary";
import PropTypes from "prop-types";
class BurgerIngredient extends Component {
	render() {
		let ingredient = null;

		switch (this.props.type) {
			case "bread-bottom":
				ingredient = <div className="bread-bottom" />;
				break;
			case "bread-top":
				ingredient = (
					<div className="bread-top">
						<div className="seeds" />
						<div className="seeds2" />
					</div>
				);
				break;
			case "meat":
				ingredient = <div className="meat" />;
				break;
			case "salad":
				ingredient = <div className="salad" />;
				break;
			case "bacon":
				ingredient = <div className="bacon" />;
				break;
			case "cheese":
				ingredient = <div className="cheese" />;
				break;
			default:
				ingredient = null;
		}

		return ingredient;
	}
}

BurgerIngredient.prototypes = {
	type: PropTypes.string.isRequired,
};

export default BurgerIngredient;

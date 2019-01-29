import React from "react";
import "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
	{
		label: "Salad",
		type: "salad",
	},
	{
		label: "Bacon",
		type: "bacon",
	},
	{
		label: "Cheese",
		type: "cheese",
	},
	{
		label: "Meat",
		type: "meat",
	},
];

const BuildControls = props => {
	return (
		<div className="BuildControls">
			<p>
				Current Price:<strong> {props.price.toFixed(2)}</strong>
			</p>
			{controls.map(ctrl => (
				<BuildControl
					disabled={props.disabled[ctrl.type]}
					addIngredient={() => props.addIngredient(ctrl.type)}
					removeIngredient={() => props.removeIngredient(ctrl.type)}
					key={ctrl.label}
					label={ctrl.label}
				/>
			))}

			<button
				onClick={props.purchasing}
				className="OrderButton"
				disabled={!props.purchaseable}
			>
				Order now
			</button>
		</div>
	);
};

export default BuildControls;

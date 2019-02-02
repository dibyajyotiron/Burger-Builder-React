import React from "react";
import Logo from "../../Logo/Logo";
import NavItems from "../NavigationItems/NavigationItems";
import "./SideDrawer.css";
import Backdrop from "./../../UI/Backdrop/Backdrop";
import Auxiliary from "./../../../HOC/Auxiliary";
const SideDrawer = props => {
	let attachedClasses = ["SideDrawer", "Close"];
	if (props.open) attachedClasses = ["SideDrawer", "Open"];

	return (
		<Auxiliary>
			<Backdrop show={props.open} clicked={props.closed} />
			<div className={attachedClasses.join(" ")}>
				<Logo height="10%" />
				<nav>
					<NavItems />
				</nav>
			</div>
		</Auxiliary>
	);
};

export default SideDrawer;

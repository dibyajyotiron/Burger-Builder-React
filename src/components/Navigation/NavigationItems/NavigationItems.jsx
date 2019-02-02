import React from "react";
import "./NavigationItems.css";
import NavItem from "./NavigationItem/NavigationItem";
const NavItems = props => {
	return (
		<ul className="NavItems">
			<NavItem link="/" active>
				Burger Builder
			</NavItem>
			<NavItem link="/checkout">Checkout</NavItem>
		</ul>
	);
};

export default NavItems;

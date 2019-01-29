import React from "react";
import Auxiliary from "./../../HOC/Auxiliary";
import "./Layout.css";
const Layout = props => {
	return (
		<Auxiliary>
			<div>Toolbar, SideDrawer, BackDrop</div>
			<main className={"Content"}>{props.children}</main>
		</Auxiliary>
	);
};

export default Layout;

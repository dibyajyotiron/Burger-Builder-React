import React from "react";
import "./Toolbar.css";
import Logo from "./../../Logo/Logo";
import NavItems from "./../NavigationItems/NavigationItems";
import DrawerToggle from "./../SideDrawer/DrawerToggle/DrawerToggle";
const Toolbar = props => {
	return (
		<header className="Toolbar">
			<DrawerToggle clicked={props.drawerToggleClicked} />
			<Logo height="80%" />
			<nav className="DesktopOnly">
				<NavItems />
			</nav>
		</header>
	);
};

export default Toolbar;

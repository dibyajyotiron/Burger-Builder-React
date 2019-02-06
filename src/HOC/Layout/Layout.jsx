import React, { Component } from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import "./Layout.css";
import Toolbar from "./../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "./../../components/Navigation/SideDrawer/SideDrawer";
class Layout extends Component {
	state = {
		show: false,
	};

	sideDrawerClosedHandler = () => {
		this.setState({ show: false });
	};

	sideDrawerToggleHandler = () => {
		this.setState(prevState => {
			return { show: !prevState.show };
		});
	};

	render() {
		return (
			<Auxiliary>
				<Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
				<SideDrawer
					open={this.state.show}
					closed={this.sideDrawerClosedHandler}
				/>
				BackDrop
				<main className={"Content"}>{this.props.children}</main>
			</Auxiliary>
		);
	}
}

export default Layout;

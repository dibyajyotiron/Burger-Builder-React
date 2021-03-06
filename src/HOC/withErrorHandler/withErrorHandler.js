import React, { Component } from "react";
import Modal from "./../../components/UI/Modal/Modal";
import Auxiliary from "./../Auxiliary/Auxiliary";

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			error: null,
		};
		componentWillMount() {
			axios.interceptors.request.use(req => {
				this.reqInterceptor = this.setState({ error: null });
				return req;
			});
			this.resInterceptor = axios.interceptors.response.use(
				res => res,
				error => {
					this.setState({ error });
				},
			);
		}
		componentWillUnmount() {
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.response.eject(this.resInterceptor);
		}

		errorConfirmedHandler = () => {
			this.setState({ error: null });
		};

		render() {
			return (
				<Auxiliary>
					{console.log(this.state.error)}
					<Modal
						modalClosed={this.errorConfirmedHandler}
						show={this.state.error}
					>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</Auxiliary>
			);
		}
	};
};

export default withErrorHandler;

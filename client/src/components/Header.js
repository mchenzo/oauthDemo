import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component{
	renderContent() {
		switch(this.props.auth) {
			case null: return;
			case false: return (<li><a href = "/auth/google">SIGN IN WITH GOOGLE</a></li>);
			default: return <li><a href = "/api/logout">LOGOUT</a></li>;
		}
	}

	render() {
		console.log(`header props: ${this.props.auth}`);
		return (
			<nav>
				<div className = "nav-wrapper">

					<Link 	
						to = {this.props.auth  ? '/surveys' : '/'} 
						className = "left brand-logo"
						style = {{ marginLeft: '15px' }}
					>
						LOGO
					</Link>

					<ul className = "right">
						{this.renderContent()}
					</ul>

				</div>
			</nav>
		)
	}
}

//connects state from store to props, components can access state
function mapStateToProps({ auth }) {
	return { auth: auth };
}


export default connect(mapStateToProps)(Header);
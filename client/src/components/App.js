import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
//take all defined actions and assign them to object actions
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';

const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>


//BrowserRouter can only have 1 child element
class App extends Component {
	//wire up action creator via connect helper from react-redux
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<div className = "container">
				<BrowserRouter>
					<div>
						<Header />
						<Route exact path = "/" component = { Landing }></Route>
						<Route exact path = "/surveys" component = { Dashboard }></Route>
						<Route path = "/surveys/new" component = { SurveyNew }></Route>
					</div>
				</BrowserRouter>
			</div>
		);
	}
};

//connect action creators to App, actions passed to App as props, reference w this.props
export default connect(null, actions)(App);
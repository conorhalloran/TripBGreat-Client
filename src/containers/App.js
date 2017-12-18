import React, { Component } from 'react'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import logo from '../images/tripBGreat2.png'
import '../stylesheets/App.css'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import AuthRoute from '../components/AuthRoute'
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem
} from 'reactstrap'
import FontAwesome from 'react-fontawesome'

// PAGES
import TripsIndexPage from './TripsIndexPage'
import TripsNewPage from './TripsNewPage'
import TripsEditPage from './TripsEditPage'
import TripsShowPage from './TripsShowPage'
import DaysShowPage from './DaysShowPage'
import SignInPage from './SignInPage'
import SignUpPage from './SignUpPage'
import HomePage from './HomePage'

// APP
class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			user: {},
			isOpen: false,
			dropdownOpen: false
		}
		this.signIn = this.signIn.bind(this)
		this.signOut = this.signOut.bind(this)
		this.toggle = this.toggle.bind(this)
	}
	componentDidMount() {
		this.signIn()
	}

	//FUNCTIONS
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen,
			dropdownOpen: !this.state.dropdownOpen
		})
	}
	signIn() {
		const jwt = localStorage.getItem('jwt')
		if (jwt) {
			const payload = jwtDecode(jwt)
			this.setState({ user: payload })
		}
	}

	isSignedIn() {
		return !!this.state.user.id
	}

	signOut(event) {
		event.preventDefault()
		localStorage.clear()
		this.setState({ user: {} })
	}

	_navUserSignedIn() {
		return (
			<Collapse isOpen={this.state.isOpen} navbar>
				<Nav className="ml-auto" navbar>
					<NavItem>
						<Link className="nav-link" to="/">
							Home
						</Link>
					</NavItem>
					<NavItem>
						<Link className="nav-link" to="/trips">
							Trips
						</Link>
					</NavItem>
					<NavItem>
						<Link className="nav-link" to="/trips/new">
							Create Trip
						</Link>
					</NavItem>
					{/* <NavItem>
						<Link className="nav-link" to="#">
							My Account
						</Link>
					</NavItem> */}
					<NavItem>
						<Link className="nav-link" to="/" onClick={this.signOut}>
							Sign out
						</Link>
					</NavItem>
				</Nav>
			</Collapse>
		)
	}

	_navNoUser() {
		return (
			<Collapse isOpen={this.state.isOpen} navbar>
				<Nav className="ml-auto" navbar>
					<NavItem>
						<Link className="nav-link" to="/">
							Home
						</Link>
					</NavItem>
					<NavItem>
						<Link className="nav-link" to="/trips">
							Trips
						</Link>
					</NavItem>
					<NavItem>
						<Link className="nav-link" to="/sign_in">
							Sign In
						</Link>
					</NavItem>
					<NavItem>
						<Link className="nav-link" to="/sign_up">
							Sign Up
						</Link>
					</NavItem>
				</Nav>
			</Collapse>
		)
	}

	_renderNavBar() {
		return (
			<Navbar dark fixed expand="sm" className="navBarHeader">
				<NavbarToggler onClick={this.toggle} />
				<NavbarBrand href="/">
					<img className="logo" src={logo} alt="" />
				</NavbarBrand>
				{this.isSignedIn() ? this._navUserSignedIn() : this._navNoUser()}
			</Navbar>
		)
	}
	_renderFooter() {
		return (
			<div className="footer">
				<div className="footer-social-icons">
					<p className="brand">©TripBGreat</p>
					<ul className="social-icons">
						<li>
							<a href="" className="social-icon">
								<FontAwesome name="facebook" />
							</a>
						</li>
						<li>
							<a href="" className="social-icon">
								<FontAwesome name="twitter" />
							</a>
						</li>
						<li>
							<a href="" className="social-icon">
								<iFontAwesome name="rss" />
							</a>
						</li>
						<li>
							<a href="" className="social-icon">
								<FontAwesome name="youtube" />
							</a>
						</li>
						<li>
							<a href="" className="social-icon">
								<FontAwesome name="linkedin" />
							</a>
						</li>
						<li>
							<a href="" className="social-icon">
								<FontAwesome name="google-plus" />
							</a>
						</li>
					</ul>
				</div>
			</div>
		)
	}

	render() {
		return (
			<Router>
				<div className="App">
					{this._renderNavBar()}
					<div className="Main">
						<Switch>
							<AuthRoute
								isAuthenticated={this.isSignedIn()}
								path="/trips/new"
								component={TripsNewPage}
							/>
							<AuthRoute
								isAuthenticated={this.isSignedIn()}
								path="/trips/:id/edit"
								component={TripsEditPage}
								user={this.state.user}
							/>
							<AuthRoute
								isAuthenticated={this.isSignedIn()}
								exact
								path="/trips/:id"
								component={TripsShowPage}
								user={this.state.user}
							/>
							<AuthRoute
								isAuthenticated={this.isSignedIn()}
								path="/trips/:tripId/days/:id"
								component={DaysShowPage}
								user={this.state.user}
							/>

							<Route path="/trips" component={TripsIndexPage} />
							<Route
								path="/sign_in"
								render={props => (
									<SignInPage {...props} onSignIn={this.signIn} />
								)}
							/>
							<Route
								path="/sign_up"
								render={props => (
									<SignUpPage {...props} onSignUp={this.signIn} />
								)}
							/>
							<Route path="/" component={HomePage} />
						</Switch>
					</div>
					{this._renderFooter()}
				</div>
			</Router>
		)
	}
}

export default App

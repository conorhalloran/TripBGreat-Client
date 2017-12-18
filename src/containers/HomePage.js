import React, { Component } from 'react'
import SignInForm from '../components/SignInForm'
import { Token } from '../lib/tripRequests'
import { Container, Row, Col } from 'reactstrap'
import jwtDecode from 'jwt-decode'

class HomePage extends Component {
	constructor(props) {
		super(props)
		this.signInUser = this.signInUser.bind(this)

		this.state = {
			user: {}
		}
	}

	componentDidMount() {
		this.signIn()
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

	async signInUser(params) {
		const { onSignIn = () => {} } = this.props
		const data = await Token.create(params)
		if (!data.error) {
			const { jwt } = data
			localStorage.setItem('jwt', jwt)
			onSignIn()
			this.props.history.push('/trips')
		}
	}

	render() {
		return (
			<div className="HomePage">
				<Container>
					{this.isSignedIn() ? (
						<Row>
							<Col>
								<div className="content">
									<h2>Trip Planning Made Easy</h2>
									<p>
										TripBGreat was designed with you in mind. Create an Account
										to Start Creating Trips. You can invite your friends to join
										you on trips. Each trip be organized by Days and Activites.
										Gone are the days of frustrating trip coordination. Will
										TripBGreat, your Good trips will be Great!
									</p>
								</div>
							</Col>
						</Row>
					) : (
						<Row>
							<Col>
								<div className="content">
									<h2>Trip Planning Made Ease</h2>
									<p>
										TripBGreat was designed with you in mind. Create an Account
										to Start Creating Trips. You can invite your friends to join
										you on trips. Each trip be organized by Days and Activites.
										Gone are the days of frustrating trip coordination. Will
										TripBGreat, your Good trips will be Great!
									</p>
								</div>
							</Col>

							<Col>
								<div className="content">
									<SignInForm onSubmit={this.signInUser} />
								</div>
							</Col>
						</Row>
					)}
				</Container>
			</div>
		)
	}
}

export default HomePage

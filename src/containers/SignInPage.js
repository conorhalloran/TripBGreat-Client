import React, { Component } from 'react'
import SignInForm from '../components/SignInForm'
import { Token } from '../lib/tripRequests'
import { Container, Row, Col } from 'reactstrap'

class SignInPage extends Component {
	constructor(props) {
		super(props)
		this.signInUser = this.signInUser.bind(this)
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
			<Container className="SignInPage">
				<div className="content">
					<Row>
						<Col>
							<h2>Sign In</h2>
						</Col>
					</Row>
					<Row>
						<SignInForm onSubmit={this.signInUser} />
					</Row>
				</div>
			</Container>
		)
	}
}

export default SignInPage

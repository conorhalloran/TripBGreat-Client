import React, { Component } from 'react'
import { User } from '../lib/tripRequests'
import SignUpForm from '../components/SignUpForm'
import { Container, Row } from 'reactstrap'

class SignUpPage extends Component {
	constructor(props) {
		super(props)

		this.signUpUser = this.signUpUser.bind(this)
	}

	async signUpUser(params) {
		const { onSignUp = () => {} } = this.props
		const data = await User.create(params)
		if (!data.error) {
			const { jwt } = data
			localStorage.setItem('jwt', jwt)
			onSignUp()
			this.props.history.push('/trips')
		}
	}

	render() {
		return (
			<Container className="SignUpPage">
				<div className="content">
					<Row>
						<h1>Sign Up</h1>
					</Row>
					<Row>
						<SignUpForm onSubmit={this.signUpUser} />
					</Row>
				</div>
			</Container>
		)
	}
}

export default SignUpPage

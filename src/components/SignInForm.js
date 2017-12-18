import React from 'react'
import { Button, Col, Form, FormGroup, Label, Input } from 'reactstrap'

const SignInForm = props => {
	const { onSubmit = () => {} } = props

	const handleSubmit = event => {
		event.preventDefault()
		const { currentTarget } = event
		const formData = new FormData(currentTarget)
		onSubmit({
			email: formData.get('email'),
			password: formData.get('password')
		})
	}

	return (
		<Col>
			<Form onSubmit={handleSubmit}>
				<FormGroup>
					<Label htmlFor="email">Email</Label>
					<Input type="email" id="email" name="email" />
				</FormGroup>

				<FormGroup>
					<Label htmlFor="password">Password</Label> <br />
					<Input type="password" id="password" name="password" />
				</FormGroup>
				<Button className="btn btn-info">Sign In</Button>
			</Form>
		</Col>
	)
}

export default SignInForm

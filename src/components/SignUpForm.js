import React from 'react'
import { Button, Col, Form, FormGroup, Label, Input } from 'reactstrap'

const SignUpForm = props => {
	const { onSubmit = () => {} } = props

	const handleSubmit = event => {
		event.preventDefault()
		const { currentTarget } = event
		const formData = new FormData(currentTarget)
		onSubmit({
			first_name: formData.get('first_name'),
			last_name: formData.get('last_name'),
			email: formData.get('email'),
			password: formData.get('password'),
			password_confirmation: formData.get('password_confirmation')
		})
	}

	return (
		<Col>
			<Form onSubmit={handleSubmit}>
				<FormGroup>
					<Label for="first_name">First Name</Label>
					<Input type="first_name" id="first_name" name="first_name" />
				</FormGroup>

				<FormGroup>
					<Label for="last_name">Last Name</Label>
					<Input type="last_name" id="last_name" name="last_name" />
				</FormGroup>

				<FormGroup>
					<Label for="email">Email</Label>
					<Input type="email" id="email" name="email" />
				</FormGroup>

				<FormGroup>
					<Label for="password">Password</Label>
					<Input type="password" id="password" name="password" />
				</FormGroup>

				<FormGroup>
					<Label for="password_confirmation">Password Confirmation</Label>
					<Input
						type="password"
						id="password_confirmation"
						name="password_confirmation"
					/>
				</FormGroup>
				<Button>Sign Up</Button>
			</Form>
		</Col>
	)
}

export default SignUpForm

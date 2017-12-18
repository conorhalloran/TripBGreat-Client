import React from 'react'
import LocationSearch from '../components/LocationSearch'
// import { SingleDayPicker } from 'react-dates'
import {
	Button,
	Container,
	Row,
	Col,
	Form,
	FormGroup,
	Label,
	Input
} from 'reactstrap'

const INITIAL_STATE = {
	title: '',
	description: '',
	startLocation: '',
	startLongitude: null,
	startLatitude: null,
	endLocation: '',
	endLongitude: null,
	endLatitude: null
}

class DayForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = INITIAL_STATE
	}

	startHandlePlacesChanged = place => {
		const { geometry: { location } } = place
		const latitude = location.lat()
		const longitude = location.lng()
		const tripLocation = place.formatted_address
		console.log('changed', tripLocation)
		this.setState({
			startLatitude: latitude,
			startLongitude: longitude,
			startLocation: tripLocation.toString()
		})
	}
	endHandlePlacesChanged = place => {
		const { geometry: { location } } = place
		const latitude = location.lat()
		const longitude = location.lng()
		const tripLocation = place.formatted_address
		this.setState({
			endLatitude: latitude,
			endLongitude: longitude,
			endLocation: tripLocation.toString()
		})
	}

	handleSubmit = event => {
		event.preventDefault()
		const { currentTarget } = event
		const formData = new FormData(currentTarget)
		this.props
			.createDay({
				title: formData.get('title'),
				description: formData.get('description'),
				start_location: this.state.startLocation,
				start_latitude: this.state.startLatitude,
				start_longitude: this.state.startLongitude,
				end_location: this.state.endLocation,
				end_latitude: this.state.endLatitude,
				end_longitude: this.state.endLongitude
			})
			.then(() => {
				this.setState(INITIAL_STATE)
			})
	}

	handleInputChange(e, field) {
		e.preventDefault()
		let newState = {}
		newState[field] = e.target.value
		this.setState(newState)
	}

	render() {
		const { title, description, startLocation, endLocation } = this.state
		return (
			<Container>
				<Row>
					<Col>
						<Form className="TripForm" onSubmit={this.handleSubmit}>
							<FormGroup>
								<Label for="title">Title: </Label>
								<Input
									id="title"
									name="title"
									onChange={e => this.handleInputChange(e, 'title')}
									value={title}
								/>
							</FormGroup>
							<FormGroup>
								<Label for="description">Description:</Label>
								<Input
									type="textarea"
									id="description"
									name="description"
									onChange={e => this.handleInputChange(e, 'description')}
									value={description}
								/>
							</FormGroup>
							<FormGroup>
								<Label for="startLocation">Start Location</Label>
								<LocationSearch
									onPlacesChanged={this.startHandlePlacesChanged}
									value={startLocation}
								/>
							</FormGroup>
							<FormGroup>
								<Label for="endLocation">End Location</Label>
								<LocationSearch
									onPlacesChanged={this.endHandlePlacesChanged}
									value={endLocation}
								/>
							</FormGroup>
							<Button className="btn btn-info">Create Day</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default DayForm

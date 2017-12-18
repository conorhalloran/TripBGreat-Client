import React from 'react'
import { DateRangePicker } from 'react-dates'
import LocationSearch from '../components/LocationSearch'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

class TripForm extends React.Component {
	constructor(props) {
		super(props)

		// INITIAL STATE
		this.state = {
			title: '',
			description: '',
			startDate: null,
			endDate: null,
			location: '',
			duration: 0,
			focusedInput: null,
			tripLocation: null,
			longitude: null,
			latitude: null
		}
	}

	handlePlacesChanged = place => {
		const { geometry: { location } } = place
		const latitude = location.lat()
		const longitude = location.lng()
		const tripLocation = place.formatted_address
		this.setState({
			latitude: latitude,
			longitude: longitude,
			tripLocation: tripLocation.toString()
		})
	}

	handleSubmit = event => {
		event.preventDefault()
		const { currentTarget } = event
		const formData = new FormData(currentTarget)
		this.props.onSubmit({
			title: formData.get('title'),
			description: formData.get('description'),
			start_date: formData.get('startDate'),
			end_date: formData.get('endDate'),
			location: this.state.tripLocation,
			latitude: this.state.latitude,
			longitude: this.state.longitude
		})
	}

	render() {
		const { title = '', description = '', location = '' } = this.props
		return (
			<div>
				<Form className="TripForm" onSubmit={this.handleSubmit}>
					<FormGroup>
						<Label for="title">Title: </Label>
						<Input id="title" name="title" defaultValue={title} />
					</FormGroup>
					<FormGroup>
						<Label for="description">Description: </Label>
						<Input
							type="textarea"
							id="description"
							name="description"
							defaultValue={description}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="dates">Trip Dates: </Label>
						<DateRangePicker
							displayFormat={'DD-MM-YYYY'}
							startDate={this.state.startDate}
							endDate={this.state.endDate}
							onDatesChange={({ startDate, endDate }) => {
								this.setState({ startDate, endDate })
							}}
							focusedInput={this.state.focusedInput}
							onFocusChange={focusedInput => this.setState({ focusedInput })}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="location">Location</Label>
						<LocationSearch
							onPlacesChanged={this.handlePlacesChanged}
							defaultValue={location}
						/>
					</FormGroup>
					<Button className="btn btn-info">Create Trip</Button>
				</Form>
			</div>
		)
	}
}

export default TripForm

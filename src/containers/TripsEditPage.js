import React, { Component } from 'react'
import { Trip } from '../lib/tripRequests'
import TripForm from './TripForm'

class TripsEditPage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			trip: {}
		}

		this.updateTrip = this.updateTrip.bind(this)
	}

	async componentDidMount() {
		const { params } = this.props.match
		const trip = await Trip.get(params.id)
		this.setState({ trip })
	}

	async updateTrip(trip) {
		const data = await Trip.update(trip, this.state.trip.id)
		data.errors
			? this.props.history.push('/trips')
			: this.props.history.push(`/trips/${data.id}`)
	}

	render() {
		return (
			<div className="content">
				<h1>Edit Trip</h1>
				<TripForm
					key={this.state.trip.id}
					{...this.state.trip}
					onSubmit={this.updateTrip}
				/>
			</div>
		)
	}
}

export default TripsEditPage

import React, { Component } from 'react'
import { Trip, Day } from '../lib/tripRequests'

import TripDetails from './TripDetails'

class TripsShowPage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			trip: {},
			startLocation: null,
			startLongitude: null,
			startLatitude: null,
			endLocation: null,
			endLongitude: null,
			endLatitude: null
		}

		this.updateAASM = this.updateAASM.bind(this)
		this.createDay = this.createDay.bind(this)
		this.deleteDay = this.deleteDay.bind(this)
	}

	async componentDidMount() {
		const { params } = this.props.match
		const data = await Trip.get(params.id)
		this.setState({ trip: data })
	}

	async updateAASM(trip) {
		const params = { aasm_state: 'publish' }
		const data = await Trip.update(params, this.state.trip.id)
		this.setState({ trip: data })
	}

	async createDay(day) {
		const data = await Day.create(day, this.state.trip.id)
		data.errors
			? this.props.history.push(`/trips`)
			: this.setState({ trip: data })
	}

	async deleteDay(day_id) {
		const data = await Day.destroy(day_id)
		this.setState({ trip: data })
	}

	render() {
		const { user = {} } = this.props
		return (
			<div className="TripsShowPage">
				<TripDetails
					current_user={user}
					user={this.state.trip.user}
					trip={this.state.trip}
					updateAASM={this.updateAASM}
					deleteDay={this.deleteDay}
					createDay={this.createDay}
					{...this.props}
				/>
			</div>
		)
	}
}

export default TripsShowPage

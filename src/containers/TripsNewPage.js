import React, { Component } from 'react'
import { Trip } from '../lib/tripRequests'
import TripForm from './TripForm'
import { Container, Row, Col } from 'reactstrap'

class TripsNewPage extends Component {
	constructor(props) {
		super(props)
		this.createTrip = this.createTrip.bind(this)
	}

	async createTrip(trip) {
		const data = await Trip.create(trip)
		this.props.history.push(`/trips/${data.id}`)
	}

	render() {
		return (
			<Container>
				<Row>
					<Col>
						<div className="content">
							<h1>New Trip</h1>
							<TripForm onSubmit={this.createTrip} />
						</div>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default TripsNewPage

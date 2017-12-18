import React, { Component } from 'react'
import TripSummary from '../components/TripSummary'
import { Container, Row } from 'reactstrap'

class TripsList extends Component {
	render() {
		return (
			<Container fluid>
				<div className="content">
					<h1>Trips</h1>
				</div>

				<Row className="TripsList">
					{this.props.trips.map(trip => (
						<TripSummary
							key={trip.id}
							trip={trip}
							user={this.props.user}
							{...this.props}
						/>
					))}
				</Row>
			</Container>
		)
	}
}

export default TripsList

import React, { Component } from 'react'
import MapGeneral from '../components/MapGeneral'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'

class DayDetails extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { user = {}, day = {}, current_user } = this.props
		const {
			id,
			title,
			description,
			start_location,
			end_location,
			start_longitude,
			start_latitude,
			end_longitude,
			end_latitude,
			trip = {}
		} = this.props.day
		return (
			<Container>
				<Row className="DayDetails">
					<Col>
						<h1>Day Details</h1>
					</Col>
				</Row>
				<Row>
					<Col sm="5">
						<h2>{title}</h2>
						<p>{description}</p>
						<p>Start Location: {start_location}</p>
						<p>End Location: {end_location}</p>
						<Link to={`/trips/${trip.id}`} className="btn btn-info">
							Back to Trip
						</Link>
					</Col>
					<Col sm="7">
						{start_latitude &&
							start_longitude && <MapGeneral day={this.props.day} />}
					</Col>
				</Row>
			</Container>
		)
	}
}

export default DayDetails

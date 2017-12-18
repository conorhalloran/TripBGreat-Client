import React from 'react'
import { Link } from 'react-router-dom'
import { Col } from 'reactstrap'

function TripSummary(props) {
	const {
		id,
		title,
		location,
		start_date,
		user = {},
		aasm_state,
		duration
	} = props.trip

	return (
		<Col xs="6" sm="4" md="3" className="TripSummary">
			<Link to={`trips/${id}`}>
				<span id="triplinks">
					<strong>{title}</strong>
				</span>
			</Link>
			<p>
				By: {user.first_name} {user.last_name}
				<br />
				Location: {location}
				<br />
				Status: {aasm_state}
				<br />
				Start Date : {start_date}
				<br />
				Duration : {duration} Days
			</p>
		</Col>
	)
}

export default TripSummary

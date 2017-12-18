import React, { Component } from 'react'
import { Day } from '../lib/tripRequests'
import DayDetails from './DayDetails'

class DaysShowPage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			day: {}
		}
	}

	async componentDidMount() {
		const { params } = this.props.match
		const data = await Day.get(params.id)
		this.setState({ day: data })
	}

	render() {
		const { user = {} } = this.props
		return (
			<div className="content">
				<DayDetails
					current_user={user}
					user={this.state.day.user}
					day={this.state.day}
					{...this.props}
				/>
			</div>
		)
	}
}

export default DaysShowPage

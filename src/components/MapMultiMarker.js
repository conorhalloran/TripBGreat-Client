import React from 'react'
import { compose, withProps, withStateHandlers } from 'recompose'
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
	InfoWindow
} from 'react-google-maps'
import { Container, Row } from 'reactstrap'

const MyMapComponent = compose(
	withProps({
		googleMapURL:
			'https://maps.googleapis.com/maps/api/js?key=AIzaSyBlu8Q6t2H35YrdXo8j7233c4p1sAZjuU0&v=3.exp&libraries=geometry,drawing,places',
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div style={{ height: `400px` }} />,
		mapElement: <div style={{ height: `100%` }} />
	}),
	withStateHandlers(
		() => ({
			isOpen: false,
			currentMarker: 0
		}),
		{
			updateMarkerState: ({ currentMarker }) => dayId => ({
				currentMarker: dayId
			})
		}
	),
	withScriptjs,
	withGoogleMap
)(props => (
	<GoogleMap
		defaultZoom={8}
		defaultCenter={{ lat: props.lat, lng: props.long }}
	>
		{props.isMarkerShown &&
			props.days.map((day, index) => {
				return (
					<Marker
						key={day.id}
						position={{ lat: day.end_latitude, lng: day.end_longitude }}
						onClick={() => {
							props.updateMarkerState(day.id)
						}}
					>
						{props.currentMarker === day.id && (
							<InfoWindow
								onCloseClick={() => {
									props.updateMarkerState(0)
								}}
							>
								<Container>
									<Row>
										<p>Day #{index + 1}</p>
									</Row>
									<Row>
										<p>{day.title}</p>
									</Row>
								</Container>
							</InfoWindow>
						)}
					</Marker>
				)
			})}
	</GoogleMap>
))

class MapMultiMarker extends React.PureComponent {
	state = {
		isMarkerShown: false
	}

	componentDidMount() {
		this.delayedShowMarker()
	}

	delayedShowMarker = () => {
		setTimeout(() => {
			this.setState({ isMarkerShown: true })
		}, 2000)
	}

	handleMarkerClick = () => {
		this.setState({ isMarkerShown: false })
		this.delayedShowMarker()
	}

	render() {
		console.log('lat', this.props.lat)
		console.log('long', this.props.long)
		console.log('days', this.props.days)
		return (
			<MyMapComponent
				lat={this.props.trip.latitude}
				long={this.props.trip.longitude}
				days={this.props.days}
				isMarkerShown={true}
				onMarkerClick={this.handleMarkerClick}
			/>
		)
	}
}
export default MapMultiMarker

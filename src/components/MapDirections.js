import React from 'react'
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	DirectionsRenderer
} from 'react-google-maps'

const { compose, withProps, lifecycle } = require('recompose')
const googleApiKey = process.env.REACT_APP_GOOGLE_API

const MyMapComponent = compose(
	withProps({
		googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&v=3.exp&libraries=geometry,drawing,places`,
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div style={{ height: `400px` }} />,
		mapElement: <div style={{ height: `100%` }} />
	}),
	withScriptjs,
	withGoogleMap,
	lifecycle({
		componentDidMount() {
			const DirectionsService = new google.maps.DirectionsService()
			DirectionsService.route(
				{
					origin: new google.maps.LatLng(startLat, startLong),
					destination: new google.maps.LatLng(endLat, endLong),
					travelMode: google.maps.TravelMode.DRIVING
				},
				(result, status) => {
					if (status === google.maps.DirectionsStatus.OK) {
						this.setState({
							directions: result
						})
					} else {
						console.error(`error fetching directions ${result}`)
					}
				}
			)
		}
	})
)(props => (
	<GoogleMap
		defaultZoom={8}
		defaultCenter={{ lat: props.startLat, lng: props.startLong }}
	>
		{props.directions && <DirectionsRenderer directions={props.directions} />}
	</GoogleMap>
))

class MapDirections extends React.PureComponent {
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
		console.log('lat', this.props.startLat)
		console.log('long', this.props.startLong)
		console.log('endLat', this.props.endLat)
		console.log('endLong', this.props.endLong)
		return (
			<MyMapComponent
				startLat={this.props.startLat}
				startLong={this.props.startLong}
				endLat={this.props.endLat}
				endLong={this.props.endLong}
				isMarkerShown={this.state.isMarkerShown}
				onMarkerClick={this.handleMarkerClick}
			/>
		)
	}
}
export default MapDirections

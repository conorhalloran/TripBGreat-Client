const baseUrl = process.env.REACT_APP_BASE_URL
// const baseUrl = 'http://localhost:3000'

const Routes = {
	baseUrl,
	trips: {
		update(id) {
			;`${baseUrl}/trips/${id}`
		}
	}
}

export default Routes

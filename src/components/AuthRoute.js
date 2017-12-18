import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const AuthRoute = props => {
	const { component: Component, isAuthenticated = false, user = {}, ...restProps } = props
	console.log(isAuthenticated)
	return (
		<Route
			{...restProps}
			render={props => {
				if (isAuthenticated) {
					return <Component {...props} user={user} />
				} else {
					return <Redirect to={{ pathname: '/sign_in' }} />
				}
			}}
		/>
	)
}

export default AuthRoute

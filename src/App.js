import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import NavBar from './components/layout/NavBar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alert from './components/layout/Alert'
import Profile from './components/layout/Profile'
import CreateProfile from './components/profile-forms/CreateProfile'
import EditProfile from './components/profile-forms/EditProfile'
import AddService from './components/profile-forms/AddService'
import Footer from './components/layout/Footer'
import PublicProfile from './components/layout/PublicProfile'
import ProfileSearch from './components/layout/ProfileSearch'
import 'bootstrap/dist/css/bootstrap.min.css'

// Redux
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'

require('dotenv').config()

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <Route exact path='/' component={Landing} />
          <Alert />
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/create-my-profile' component={CreateProfile} />
            <Route exact path='/edit-my-profile' component={EditProfile} />
            <Route exact path='/add-a-service' component={AddService} />
            <Route path='/profile/:handle' component={PublicProfile} />
            <Route path='/search/:searchTerm' component={ProfileSearch} />
          </Switch>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App

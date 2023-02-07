import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing  from './components/layout/Landing';
import Register from './components/auth/Register';
import Login  from './components/auth/Login';
import Alert  from './components/layout/Alert';
import Dashboard  from './components/dashboard/Dashboard';
import ProfileForm from './components/profile-form/ProfileForm';
import AddExperience from './components/profile-form/AddExperience';
import AddEducation from './components/profile-form/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import PrivateRoute  from './components/routing/PrivateRoute';
import './App.css';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';


if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  },[]);

  return (
    <Provider store={store}>
      <Router>
          <Navbar />
          <Alert />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="profiles" element={<Profiles />} />
            <Route path="profile/:id" element={<Profile />} />
            <Route
            path="dashboard"
            element={<PrivateRoute component={Dashboard} />}
            />
            <Route
            path="create-profile"
            element={<PrivateRoute component={ProfileForm} />}
            />
            <Route
            path="edit-profile"
            element={<PrivateRoute component={ProfileForm} />}
            />
            <Route
            path="add-experience"
            element={<PrivateRoute component={AddExperience} />}
            />
            <Route
            path="add-education"
            element={<PrivateRoute component={AddEducation} />}
            />
          </Routes>
      </Router>
    </Provider>
  );
};

export default App;

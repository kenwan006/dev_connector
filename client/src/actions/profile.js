import axios from "axios";
import { setAlert } from "./alert";

import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, GET_PROFILES, GET_REPOS, NO_REPOS, UPDATE_PROFILE,  ACCOUNT_DELETED} from "./types";

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({ 
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status:err.response.status }
        });
    }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
    dispatch({ type: CLEAR_PROFILE });
  
    try {
      const res = await axios.get('/api/profile');
  
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status}
      });
    }
  };
  
  // Get profile by ID
  export const getProfileById = (userId) => async (dispatch) => {
    try {
      const res = await axios.get(`/api/profile/user/${userId}`);
  
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  
  // Get Github repos
  export const getGithubRepos = (username) => async (dispatch) => {
    try {
      const res = await axios.get(`/api/profile/github/${username}`);
  
      dispatch({
        type: GET_REPOS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: NO_REPOS
      });
    }
  };

// Create or update profile
export const createProfile =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const res = await axios.post('/api/profile', formData);

      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });

      dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

      if (!edit) {
        navigate('/dashboard');
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

  // Add Experience
  export const addExperience =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const res = await axios.put('/api/profile/experience', formData);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });

      dispatch(setAlert('Experience Added', 'success'));
      return res.data;
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

    // Add Education
    export const addEducation =
    (formData, navigate, edit = false) =>
    async (dispatch) => {
      try {
        const res = await axios.put('/api/profile/education', formData);
  
        dispatch({
          type: UPDATE_PROFILE,
          payload: res.data
        });
  
        dispatch(setAlert('Education Added', 'success'));
        return res.data;
      } catch (err) {
        const errors = err.response.data.errors;
  
        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
  
        dispatch({
          type: PROFILE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
      }
    };
  
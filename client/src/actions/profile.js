import axios from 'axios';
import { setAlert } from './alert';

import { GET_PROFILE, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE } from './types';

// Get current user profile
export const getCurrentProfile = () => async dispatch => {
  dispatch({ type: GET_PROFILE });
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_PROFILE_FAILURE,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/profile', formData, config);
    dispatch({ type: GET_PROFILE });
    dispatch({ type: GET_PROFILE_SUCCESS, payload: res.data });
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'));
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: GET_PROFILE_FAILURE,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

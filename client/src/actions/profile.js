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

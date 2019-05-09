import axios from 'axios';
import { setAlert } from './alert';
import {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  USER_LOADED,
  USER_LOADED_FAILURE,
  USER_LOADED_SUCCESS
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load user
export const loadUser = () => async dispatch => {
  dispatch({ type: USER_LOADED });

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('http://localhost:5000/api/auth');
    dispatch({
      type: USER_LOADED_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({ type: USER_LOADED_FAILURE });
  }
};

// Register user
export const register = ({ name, email, password }) => async dispatch => {
  dispatch({ type: REGISTER });

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users/register', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: REGISTER_FAILURE });
  }
};

// Login user
export const login = (email, password) => async dispatch => {
  dispatch({ type: LOGIN });

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth/login', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: LOGIN_FAILURE });
  }
};

// Logout / Clear profile
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};

import {
  SET_USER,
  LOADING_UI,
  SET_TOKEN,
  CLEAR_ERRORS,
  SET_ERRORS,
} from '../types'
import axios from 'axios'

export const signupUser = (dispatch) => (newUserData, history) => {
  dispatch({ type: LOADING_UI })
  axios
    .post('/signup', newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token)
      dispatch(getUserData())
      dispatch({ type: CLEAR_ERRORS })
      history.push('/')
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      })
    })
}

export const logoutUser = (dispatch) => () => {
  console.log('Hello')
  dispatch({ type: SET_TOKEN, payload: null })
}
export const getUserData = () => (dispatch) => {
  axios
    .get('/user')
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      })
    })
    .catch((err) => {
      console.error(err)
    })
}

export const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`
  localStorage.setItem('FBIdToken', FBIdToken)
  axios.defaults.headers.common['Authorization'] = FBIdToken
}

export const setUser = (dispatch) => (user) => {
  dispatch({ type: SET_USER, payload: user })
}
export const setToken = (dispatch) => (token) => {
  dispatch({ type: SET_TOKEN, payload: token })
}

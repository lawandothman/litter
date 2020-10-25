import { SET_USER, SET_TOKEN } from '../types'

export const logoutUser = (dispatch) => () => {
  dispatch({ type: SET_TOKEN, payload: null })
}

export const setUser = (dispatch) => (user) => {
  dispatch({ type: SET_USER, payload: user })
}

export const setToken = (dispatch) => (token) => {
  dispatch({ type: SET_TOKEN, payload: token })
}

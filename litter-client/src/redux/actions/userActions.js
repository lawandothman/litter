import { SET_USER, SET_TOKEN, MARK_NOTIFICATIONS_READ } from '../types'

export const logoutUser = (dispatch) => () => {
  dispatch({ type: SET_TOKEN, payload: null })
}

export const setUser = (dispatch) => (user) => {
  dispatch({ type: SET_USER, payload: user })
}

export const setToken = (dispatch) => (token) => {
  dispatch({ type: SET_TOKEN, payload: token })
}

export const setNotificationsRead = (dispatch) => {
  dispatch({ type: MARK_NOTIFICATIONS_READ })
}

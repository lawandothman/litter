import { SET_USER, SET_TOKEN } from '../types'

const initialState = {
  credentials: {},
  likes: [],
  notifications: [],
  token: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload,
      }
    case SET_TOKEN:
      console.log(`setting token ${action.payload}`)
      return {
        ...state,
        token: action.payload,
      }
    default:
      return initialState
  }
}

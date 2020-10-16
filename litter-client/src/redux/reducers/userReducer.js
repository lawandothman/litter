import { SET_USER, SET_TOKEN, LOADING_USER } from '../types'

const initialState = {
  credentials: {},
  loading: false,
  likes: [],
  notifications: [],
  token: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        loading: false,
        ...action.payload,
      }
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      }
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      }
    default:
      return state
  }
}

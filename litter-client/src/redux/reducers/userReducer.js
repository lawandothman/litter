import {
  SET_USER,
  SET_TOKEN,
  LIKE_LITTER,
  UNLIKE_LITTER,
  MARK_NOTIFICATIONS_READ,
} from '../types'

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
      return {
        ...state,
        token: action.payload,
      }
    case LIKE_LITTER:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            litterId: action.payload.litterId,
          },
        ],
      }
    case UNLIKE_LITTER:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.litterId !== action.payload.litterId
        ),
      }
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach((not) => (not.read = true))
      return {
        ...state,
      }
    default:
      return state
  }
}

import {
  SET_USER,
  SET_TOKEN,
  LOADING_USER,
  LIKE_LITTER,
  UNLIKE_LITTER,
} from '../types'

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
    default:
      return state
  }
}

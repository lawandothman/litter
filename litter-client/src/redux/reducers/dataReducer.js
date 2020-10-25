import {
  SET_LITTERS,
  LIKE_LITTER,
  UNLIKE_LITTER,
  DELETE_LITTER,
  SET_LITTER,
  SUBMIT_COMMENT,
} from '../types'

const initialState = {
  litters: [],
  litter: {},
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LITTERS: {
      return {
        ...state,
        litters: action.payload,
        loading: false,
      }
    }
    case SET_LITTER: {
      return {
        ...state,
        litter: action.payload,
      }
    }
    case LIKE_LITTER:
    case UNLIKE_LITTER: {
      const index = state.litters.findIndex(
        (litter) => litter.litterId === action.payload.litterId
      )
      state.litters[index].likeCount = action.payload.likeCount
      if (state.litter.litterId === action.payload.litterId) {
        state.litter.likeCount = action.payload.likeCount
      }
      return {
        ...state,
        litters: [...state.litters],
        litter: {
          ...state.litter,
        },
      }
    }
    case SUBMIT_COMMENT: {
      const index = state.litters.findIndex(
        (litter) => litter.litterId === action.payload.litterId
      )
      return {
        ...state,
        litter: {
          ...state.litter,
          comments: [action.payload, ...state.litter.comments],
          commentCount: state.litter.commentCount + 1,
        },
        litters: state.litters.map((litter, littersArrIndex) =>
          littersArrIndex === index
            ? { ...litter, commentCount: litter.commentCount + 1 }
            : litter
        ),
      }
    }
    case DELETE_LITTER: {
      const index = state.litters.findIndex(
        (litter) => litter.litterId === action.payload
      )
      state.litters.splice(index, 1)
      return {
        ...state,
      }
    }
    default:
      return state
  }
}

import {
  GET_EVENT,
  GET_EVENTS,
  ADD_EVENT,
  CLEAR_EVENTS,
  CLEAR_EVENT,
  DELETE_EVENT,
  EVENT_LOADING
} from "../actions/types";

const initialState = {
  event: null,
  events: [],
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        events: [action.payload, ...state.events]
      };
    case EVENT_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case GET_EVENTS:
      return {
        ...state,
        events: action.payload,
        isLoading: false
      };
    case GET_EVENT:
      return {
        ...state,
        event: action.payload,
        isLoading: false
      };
    case CLEAR_EVENTS:
      return {
        ...state,
        events: null,
        event: null,
        isLoading: false
      };
    case CLEAR_EVENT:
      return {
        ...state,

        event: null
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload)
      };
    default:
      return state;
  }
}

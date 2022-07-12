import {
  SEARCH_SKILLS_REQUEST,
  SEARCH_SKILLS_FAILURE,
  SEARCH_SKILLS_SUCCESS,
  CHANGE_SEARCH_FIELD,
  SEARCH_SKILLS_CANCELLED,
} from '../actions/actionTypes';

const initialState = {
  items: [],
  loading: false,
  error: null,
  search: '',
};

export default function skillsReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_SKILLS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SEARCH_SKILLS_FAILURE:
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        error,
      };
    case SEARCH_SKILLS_SUCCESS:
      const { items } = action.payload;
      return {
        ...state,
        items,
        loading: false,
        error: null,
      };
    case SEARCH_SKILLS_CANCELLED:
      console.log('SEARCH_SKILLS_CANCELLED_search ', state.search);
      return { ...initialState };
    case CHANGE_SEARCH_FIELD:
      const { search } = action.payload;
      console.log('search_field: ', search);
      return {
        ...state,
        search,
      };
    default:
      return state;
  }
}

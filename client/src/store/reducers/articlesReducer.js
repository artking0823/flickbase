import {
  GET_ARTICLES,
  GET_ARTICLE,
  CLEAR_CURRENT_ARTICLE,
  ADD_ARTICLE,
  GET_ADMIN_ARTICLES,
  UPDATE_ARTICLE_STATUS
} from "../types";

export default function articlesReducer(state = {}, action) {
  switch (action.type) {
    case GET_ARTICLES:
      return { ...state, articles: action.payload };
    case GET_ARTICLE:
      return { ...state, current: action.payload };
    case GET_ADMIN_ARTICLES:
      return { ...state, adminArticles: action.payload };
    case UPDATE_ARTICLE_STATUS:
      return {
        ...state,
        adminArticles: {
          ...state.adminArticles,
          docs: action.payload
        }
      };
    case CLEAR_CURRENT_ARTICLE:
      return { ...state, current: "" };
    case ADD_ARTICLE:
      return { ...state, lastAdded: action.payload, success: true };
    default:
      return state;
  }
}

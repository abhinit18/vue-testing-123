import apiUrls from '../config/apiUrls'
import caller from '../config/caller'
export const state = () => (initialState())

function initialState () {
  return {
  }
}



export const actions = {
  contentSearch ({redirect, commit}, {q, page, size, type, authToken, langCode, childId}) {
        return caller.get(apiUrls.contentSearch (type, q, page, size,childId), authToken, langCode)
  },
  getSimilarContent ({redirect, commit}, {requestObj, authToken, langCode, loader}) {
    return caller.get(apiUrls.similarContentUrl (requestObj, loader), authToken, langCode)
  },
  contentAutoComplete ({redirect, commit}, {q, page, size, authToken, langCode, childId}) {
    return caller.get(apiUrls.contentAutoComplete (q, page, size, childId), authToken, langCode)
  },
  buddiesAutoComplete ({redirect, commit}, {q, page, size, authToken, langCode}) {
  return caller.get(apiUrls.fetchMybuddySearchedConnections (page, size, q), authToken, langCode)
  }
  }

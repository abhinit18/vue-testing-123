import apiUrls from '../config/apiUrls'
import caller from '../config/caller'

export const state = () => (initialState())

function initialState () {
  return {
    bookmarks: {},
    filterData:false
  }
}

export const getters = {
  getByContentId: (state) => (contentId) => {
    if (state.bookmarks[contentId]) {
      return state.bookmarks[contentId]
    }

    return []
  }
}

export const mutations = {
  FETCH_BOOKMARKS: function (state, { contentId, bookmarks }) {
    state.bookmarks = { ...state.bookmarks, [contentId]: bookmarks }
  },
  ADD_BOOKMARK: function (state, bookmarkContent) {
    if (!state.bookmarks[bookmarkContent.contentId]) {
      state.bookmarks[bookmarkContent.contentId] = []
    }

    state.bookmarks[bookmarkContent.contentId].push(bookmarkContent.bookmark)
  },
  DELETE_BOOKMARK: function (state, {contentId, bookmarkId}) {
    let bookmarks = state.bookmarks
    var index = null

    for (var i = 0; i < Array.isArray(bookmarks[contentId]) && bookmarks[contentId].length; i++) {
      var bookmark = bookmarks[contentId][i]
      if (bookmark.bookmarkId == bookmarkId) {
        index = i
      }
    }

    if (index != 'null') {
      var contentBookmark = bookmarks[contentId]
      if (Array.isArray(contentBookmark) && contentBookmark.length > 0) {
        contentBookmark.splice(index, 1);
      }
    }
  },
  RESET_STATE(state)
  {
    let newState = initialState();
    state = Object.assign(state, newState);
  }
}

export const actions = {
  getBookmarks ({redirect, commit}, {contentId, lang, authToken, langCode}) {
    caller.get(apiUrls.getBookmarks(contentId), authToken, langCode).then((response) => {
      if (response && response.status === 200 && response.data) {
        const responseData = response.data
        commit('FETCH_BOOKMARKS', { contentId: responseData.contentId,  bookmarks: responseData.bookmarks })
      }
    })
  },
  addBookmark ({redirect, commit}, {authToken, bookmarkContent, langCode}) {
    caller.post(apiUrls.addBookmark, authToken, langCode, bookmarkContent).then((response) => {
      if (response && response.status === 200 && response.data) {
        const responseData = response.data
        commit('ADD_BOOKMARK', { contentId: bookmarkContent.contentId,  bookmark: responseData.bookmark })
      }
    })
  },
  deleteBookmark ({redirect, commit}, {authToken, contentId, bookmarkId, langCode}) {
    caller.post(apiUrls.deleteBookmark, authToken, langCode, {bookmarkId}).then((response) => {
      if (response && response.status === 200 && response.data) {
        const responseData = response.data
        if (response.data.status == "SUCCESS") {
          commit('DELETE_BOOKMARK', { contentId, bookmarkId })
        }
      }
    })
  }
}

import apiUrls from '../config/apiUrls'
import caller from '../config/caller'
export const state = () => (initialState())

function initialState () {
  return {
    currentContentId: "",
    showContentPopOver: false,
    filterData: false,
    myBookmarks:[]
  }
}

export const mutations = {
  DISPLAY_CONTENT: function (state, {contentId, showContentPopOver}) {
    if (!showContentPopOver) {
      state.showContentPopOver = false
      return
    }

    state.currentContentId = contentId
    state.showContentPopOver = showContentPopOver
  },
  SET_CONTENT_ID: function (state, {contentId}) {
    state.currentContentId = contentId
  },
  MY_BOOKMARKS: function(state, response) {
      state.myBookmarks = response? response : []
  },
  SHOW_FILTERED_NEWDATA(state) {
    state.myBookmarks.sort(function(a,b){
    return new Date(b.bookmarkTimestamp).getTime() - new Date(a.bookmarkTimestamp).getTime()
  });
  },
  SHOW_FILTERED_OLDDATA(state) {
    state.myBookmarks.sort(function(a,b){
    return new Date(a.bookmarkTimestamp).getTime() - new Date(b.bookmarkTimestamp).getTime()
  });
  },
  DELETE_BOOKMARK_MY_CONTENT: function(state, {contentId}) {
      let newBookmarks = []
      let oldBookmarks = state.myBookmarks
      for(let i = 0;i<oldBookmarks.length;i++) {
        if(oldBookmarks[i].contentId !== contentId) {
          newBookmarks.push(oldBookmarks[i])
        }
      }
  },
  RESET_STATE (state)
  {
    let newState = initialState();
    state = Object.assign(state, newState);
  }
}

export const actions = {
  openContent ({redirect, commit}, contentId) {
    commit('DISPLAY_CONTENT', { showContentPopOver: true })
    commit('SET_CONTENT_ID', { contentId: contentId })
  },
  closeContent ({redirect, commit}) {
    commit('DISPLAY_CONTENT', { showContentPopOver: false })
  },
  getBookmarkedContent ({redirect, commit}, {authToken, langCode, page, size, type, loader}) {
    caller.get(apiUrls.getBookmarkedData(page, size, type, loader), authToken, langCode).then((response) => {

      if (response && response.status === 200 && response.data) {
        commit('MY_BOOKMARKS', response.data.content)
      }
    }).catch((error) => {
      })
  },
  deleteContentBookmarks({redirect, commit}, {authToken, contentId,type, langCode}) {
    return new Promise((resolve, reject) => {
      caller.delete(apiUrls.deleteBookmarks(), authToken, langCode, {data:{contentId,type}}).then((response) => {
        if (response && response.status === 200) {
          commit('DELETE_BOOKMARK_MY_CONTENT', {contentId})
          resolve(response)
        }
      })
      .catch((error) => {
        reject(error)
      })
    })
  },
  toggleDataNewFilter ({redirect, commit}) {
    commit('SHOW_FILTERED_NEWDATA')
  },
  toggleDataOldFilter ({redirect, commit}) {
    commit('SHOW_FILTERED_OLDDATA')
  }
}

import apiUrls from '../config/apiUrls'
import caller from '../config/caller'

export const state = () => (initialState())

function initialState () {
  return {
    likedContent: []
  }
}

export const getters = {
  getByContentId: (state) => (contentId) => {
    if (state.likedContent[contentId]) {
      return state.likedContent[contentId]
    }

    return []
  }
}

export const mutations = {
  FETCH_LIKED_CONTENT: function (state, responseData) {
    state.likedContent = responseData? responseData : []
  },
  DELETE_LIKED_CONTENT: function (state, {contentId}) {
      let newLiked = []
      let oldLiked = state.likedContent
      for(let i = 0;i<oldLiked.length;i++) {
        if(oldLiked[i].contentId !== contentId) {
          newLiked.push(oldLiked[i])
        }
      }
      state.likedContent = newLiked
  }
  // ADD_BOOKMARK: function (state, bookmarkContent) {
  //   if (!state.likedContent[bookmarkContent.contentId]) {
  //     state.likedContent[bookmarkContent.contentId] = []
  //   }
  //
  //   state.likedContent[bookmarkContent.contentId].push(bookmarkContent.bookmark)
  // },
  // DELETE_BOOKMARK: function (state, {contentId, bookmarkId}) {
  //   let contentList = state.likedContent
  //   var index = null
  //
  //   for (var i = 0; i < Array.isArray(contentList[contentId]) && contentlist[contentId].length; i++) {
  //     var bookmark = contentList[contentId][i]
  //     if (bookmark.bookmarkId == bookmarkId) {
  //       index = i
  //     }
  //   }
  //
  //   if (index != 'null') {
  //     var contentBookmark = bookmarks[contentId]
  //     if (Array.isArray(contentBookmark) && contentBookmark.length > 0) {
  //       contentBookmark.splice(index, 1);
  //     }
  //   }
  // }
  ,
  RESET_STATE(state)
  {
    let newState = initialState();
    state = Object.assign(state, newState);
  }
}

export const actions = {
  getLikedContents ({redirect, commit}, {contentId, lang, authToken,childId, langCode, type}) {
    return new Promise ((resolve, reject) => {
      caller.post(apiUrls.getLikedContents(childId), authToken, langCode, {type}).then((response) => {
        if (response && response.status === 200 && response.data) {
          let responseData = response.data.content
          commit('FETCH_LIKED_CONTENT', responseData)
        }
        resolve (response)
      }, (error) => {
        reject (error)
      })
    })
  },
  deleteLikedContent ({redirect, commit}, {authToken, contentId, type, langCode}) {
    return new Promise((resolve, reject) => {
      caller.post(apiUrls.dislike, authToken, langCode, { contentId, contentType: type }).then((response) => {
        if (response && response.status === 200) {
          commit('DELETE_LIKED_CONTENT', {contentId})
          resolve(response)
        }
      }).catch((error) => {
        reject(error)
      })
    })
  }
  // addBookmark ({redirect, commit}, {authToken, bookmarkContent, langCode}) {
  //   caller.post(apiUrls.addBookmark, authToken, langCode, bookmarkContent).then((response) => {
  //     if (response && response.status === 200 && response.data) {
  //       const responseData = response.data
  //       commit('ADD_BOOKMARK', { contentId: bookmarkContent.contentId,  bookmark: responseData.bookmark })
  //     }
  //   })
  // },
  // deleteBookmark ({redirect, commit}, {authToken, contentId, bookmarkId, langCode}) {
  //   caller.post(apiUrls.deleteBookmark, authToken, langCode, {bookmarkId}).then((response) => {
  //     if (response && response.status === 200 && response.data) {
  //       const responseData = response.data
  //       if (response.data.status == "SUCCESS") {
  //         commit('DELETE_BOOKMARK', { contentId, bookmarkId })
  //       }
  //     }
  //   })
  // }
}

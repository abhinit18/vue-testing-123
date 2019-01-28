import apiUrls from '../config/apiUrls'
import caller from '../config/caller'
export const state = () => (initialState())

function initialState () {
  return {
    fetchednotes: [],
    filterData:false,
    userTagList: {},
    userSavedNoteTags: [],
    sort: []
  }
}

export const mutations = {
  SORT: function(state,{response}) {
    state.sort = response || [];
  },
  MY_LISTED_NOTES: function(state,{response}){
    state.fetchednotes = response.notes || [];
  },
  SHOW_FILTERED_NEWDATA: function(state){
      state.fetchednotes.sort(function(a,b){
      return new Date(a.updated).getTime() - new Date(b.updated).getTime()
    });
  },
  SHOW_FILTERED_OLDDATA: function(state){
    state.fetchednotes.sort(function(a,b){
    return new Date(b.updated).getTime() - new Date(a.updated).getTime()
    });
  },
  SUBJECT_TAG_LIST: function(state,{response}){
    state.userTagList = response;
  },
  CREATE_NOTE: function(state,{response, contentDetails}){
      if(!state.fetchednotes) {
        state.fetchednotes = []
      }
      state.fetchednotes.unshift({ ...response, contentDetails});
  },
  EDIT_NOTE: function(state, {response}) {
    let noteArray = state.fetchednotes
    let newNoteArray = []

    // search for note id
    for (let i=0;i<noteArray.length;i++) {

      if( noteArray[i].noteId.toString() === response.noteId ) {
        newNoteArray.push(response)
      }
      else
      {
        newNoteArray.push(noteArray[i])
      }
    }

    state.fetchednotes = newNoteArray
  },
  DELETE_NOTE: function(state, {noteId}) {
      let noteArray = state.fetchednotes
      let newNoteArray = []

      // search for note id
      for (let i=0;i<noteArray.length;i++) {
        if( noteArray[i].noteId.toString() !== noteId ) {
            newNoteArray.push(noteArray[i])
        }
      }
      state.fetchednotes = newNoteArray
  },
  USER_SAVED_NOTE_TAGS: function(state, {response}) {
      state.userSavedNoteTags = response.tags;
  },
  USER_SAVED_NOTE_BY_TAGS: function(state, {response}) {
    if(response.notes) {
      state.fetchednotes = response.notes;
    }else {
      state.fetchednotes = []
    }

  },
  RESET_STATE (state)
  {
    let newState = initialState();
    state = Object.assign(state, newState);
  }
}
export const actions = {
  fetchSavedList ({redirect, commit},{authToken, page, size, langCode, platform, loader}) {
    return new Promise((resolve, reject) => {caller.get(apiUrls.fetchSavedNotes(page, size, loader), authToken, langCode, undefined, undefined, platform).then((response) => {
      if (response && response.status === 200 && response.data) {
        commit('MY_LISTED_NOTES', {response: response.data})
        resolve()
      }
    }).catch((error) => {
        reject(error)
      })})
  },
  fetchUserSubjectTags ({commit}, {authToken, tagParams, langCode}) {
    caller.get(apiUrls.usersSubjectTags(tagParams), authToken, langCode).then((response) => {
      if (response && response.status === 200 && response.data) {
        commit('SUBJECT_TAG_LIST', {response: response.data})
      }
    }).catch((error) => {
      })
  },
  fetchUserSavedNoteTags ({commit}, {authToken, langCode}) {
    caller.get(apiUrls.fetchSavedNoteTags, authToken, langCode).then((response) => {
      if (response && response.status === 200 && response.data) {
        commit('USER_SAVED_NOTE_TAGS', {response: response.data})
      }
    }).catch((error) => {
      })
  },
  fetchDataByTags ({commit}, {authToken, queryTaggedData, langCode, sort, size=1000}) {
    let payload = {
      size: size
    }
    if (queryTaggedData) {
      payload["tag"] =  queryTaggedData
    }
    if (sort) {
      payload["sort"] =  sort
    }
    caller.post(apiUrls.filterNotesByTags(), authToken, langCode, payload).then((response) => {
      if (response && response.status === 200 && response.data) {
        commit('USER_SAVED_NOTE_BY_TAGS', {response: response.data})
        commit('USER_SAVED_NOTE_TAGS',{response: response.data.userTags})
        commit('SORT',{response: response.data.sort})
      }
    }).catch((error) => {
      })
  },
  createNote ({redirect,commit},{authToken, payload, langCode, contentDetails}) {
    return new Promise((resolve, reject) => {
      caller.post(apiUrls.createNote, authToken, langCode, payload).then((response) => {
        if (response && response.status === 200) {
          commit('CREATE_NOTE', {response: response.data.note, contentDetails})
          if(response.data.userTotalPoints && response.data.userTotalCoins ){
            let points = response.data.userTotalPoints;
            let coins = response.data.userTotalCoins;
            commit('UPDATE_POINTS', {points, coins}, {root: true})
          }
          resolve(response)
        }
      })
      .catch((error) => {
        reject(error)
      })
    })
  },
  editNote ({redirect,commit},{authToken, payload, langCode}) {
    return new Promise((resolve, reject) => {
      caller.put(apiUrls.createNote, authToken, langCode, payload).then((response) => {
        if (response && response.status === 200) {
          commit('EDIT_NOTE', {response: response.data.note})
          // commit('SHOW_NOTE_POPUP')
          resolve(response)
        }
      })
      .catch((error) => {
        reject(error)
      })
    })
  },
  toggleDataFilterByNewDate ({redirect, commit}) {
    commit('SHOW_FILTERED_NEWDATA')
  },
  toggleDataFilterByOldDate ({redirect, commit}) {
    commit('SHOW_FILTERED_OLDDATA')
  },
  deleteNote ({redirect, commit},{authToken, payload, langCode}) {
    return new Promise((resolve, reject) => {
      caller.post(apiUrls.deleteNote, authToken, langCode, payload).then(response => {
      if (response && response.data.status === 'SUCCESS') {
        commit('DELETE_NOTE', {noteId: payload.noteId})

      }
      resolve(response)
    }).catch((error) => {
        reject(error)
      })
    })
  }
}

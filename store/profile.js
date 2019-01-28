import apiUrls from '../config/apiUrls'
import caller from '../config/caller'

export const state = () => (initialState())

function initialState () {
  return {
    profiledata: {},
    hobbies: {},
    subjects: {}
  }
}

export const getters = {
  userPrivacy: (state) => () => {

  }
}

export const mutations = {
  FETCH_PROFILE: function (state, { userId, response }) {
    let old_profile = state.profiledata
    let newObj = {}
    newObj[userId] = response
    let new_profile = Object.assign({}, old_profile, newObj)
    state.profiledata = new_profile
  },
  FETCH_HOBBIES: function (state, { hobbies, userId }) {
    let old_hobbies = state.hobbies
    let newObj = {}
    newObj[userId] = hobbies
    let new_hobbies = Object.assign({}, old_hobbies, newObj)
    state.hobbies = new_hobbies
  },
  FETCH_SUBJECTS: function (state, { subjects, userId }) {
    let old_subjects = state.subjects
    let newObj = {}
    newObj[userId] = subjects
    let new_subjects = Object.assign({}, old_subjects, newObj)
    state.subjects = new_subjects
  },
  RESET_STATE (state)
  {
    let newState = initialState();
    state = Object.assign(state, newState);
  }
}

export const actions = {
  fetchProfileSetting ({redirect, commit}, { authToken, langCode, userId}) {
    return caller.get(apiUrls.getProfileSetting(userId), authToken, langCode)
  },
  fetchBuddies ({redirect, commit}, { authToken, langCode, userId}) {
    return caller.get(apiUrls.getProfileBuddies(userId), authToken, langCode)
  },
  fetchUserProfile ({redirect, commit}, { authToken, langCode, userId}) {
    return caller.get(apiUrls.getUserProfile(userId), authToken, langCode)
  },
  getSignedUrl ({redirect, commit}, { authToken, langCode, name}) {
    return caller.get(apiUrls.urlToGetSignedUrl(langCode, name), authToken, langCode)
  },
  uploadToS3 ({redirect, commit}, { file, s3Url}) {
    return caller.putS3(s3Url, file, file.type)
  },
  // tabChange ({redirect, commit, dispatch}, {key}) {
  //   commit('SET_TAB_ACTIVE', key)
  // },
  updateProfile ({redirect, commit}, { authToken, langCode, payload}) {
    return new Promise((resolve, reject) => {
    caller.post(apiUrls.updateProfile, authToken, langCode, payload).then((response) => {
      if(response.data.status === 'SUCCESS') {
        commit('SET_CHANGED_PROFILE_DATA', { initialData: payload }, { root: true })
      }
      resolve(response)
    })
  })
  },
  updateProfilePic ({redirect, commit}, { authToken, langCode, payload, context, isRemoval, isExisting}) {
    return new Promise ((resolve, reject) => {
      let apiUrl = (isRemoval || isExisting) ? apiUrls.updateProfilePic(payload.url) : apiUrls.updateProfilePic()
      caller.post(apiUrl, authToken, langCode, payload).then((response) => {
        if(response.data.userTotalPoints && response.data.userTotalCoins ) {
          let points = response.data.userTotalPoints;
          let coins = response.data.userTotalCoins;
          commit('UPDATE_POINTS', {points, coins}, {root: true})
        }
        resolve(response)
        if (isRemoval) {
          commit('SET_PIC', {pic : ''}, {root: true})
          //context.$toast.success(context.$t('profile.picremovalsuccess'))
        } else if (isExisting) {
          commit('SET_PIC', {pic : payload.url}, {root: true})
          //context.$toast.success(context.$t('profile.picuploadWoApprovalsuccess'))
        } else {
          context.$toast.success(context.$t('profile.picuploadsuccess'))
        }
      })
    })
  },
  getLastPics ({redirect, commit}, { authToken, langCode, payload, context}) {
    return caller.get(apiUrls.getLastPics, authToken, langCode)
  },
  fetchUserExpiry ({redirect, commit}, { authToken, langCode}) {
    return caller.get(apiUrls.getUserExpiry, authToken, langCode)
  }
}

import apiUrls from '../config/apiUrls'
import caller from '../config/caller'

export const state = () => ({
})

export const actions = {
    savePrivacySettings ({redirect, commit}, {payload, authToken, langCode}) {
      return new Promise((resolve, reject) => {
        caller.post(apiUrls.updatePrivacy, authToken, langCode, payload).then((response) => {
        if (response && response.status === 200) {
            commit('CHANGE_PRIVACY', {payload}, {root: true})
        }
        resolve(response)
        })
      })
  },
    addChildren ({redirect, commit}, {payload, authToken,childrenList, langCode}) {
      return new Promise((resolve, reject) => {
        caller.post(apiUrls.addMultipleChild, authToken, langCode, payload).then((response) => {
        if (response && response.status === 200) {
            commit('ADD_CHILDREN', {childrenList}, {root: true})
        }
        resolve(response)
        })
      })
    },
    removeChildren ({redirect, commit}, {payload, authToken,childrenList, langCode}) {
      return new Promise((resolve, reject) => {
        caller.post(apiUrls.removeMultipleChild, authToken, langCode, payload).then((response) => {
        if (response && response.status === 200) {
            //commit('ADD_CHILDREN', {childrenList}, {root: true})
        }
        resolve(response)
        })
      })
  },
    upGrade ({redirect, commit}, {authToken, langCode, grades}) {
      return new Promise((resolve, reject) => {
        caller.post(apiUrls.gradeChange, authToken, langCode, {grades}).then((response) => {
        if (response && response.data.status === 'SUCCESS') {
            // commit('CHANGE_PRIVACY', {payload}, {root: true})
        }
        resolve(response)
        })
      })
  },
    accountDeactivation ({redirect, commit}, {authToken, langCode}) {
      return new Promise((resolve, reject) => {
        caller.post(apiUrls.userDeactivation, authToken, langCode).then((response) => {
        if (response && response.data.status === 'SUCCESS') {
            // commit('CHANGE_PRIVACY', {payload}, {root: true})
        }
        resolve(response)
        })
      })
  }
}

import apiUrls from '../config/apiUrls'
import caller from '../config/caller'
export const state = () => (initialState())

function initialState () {
  return {
  }
}

export const mutations = {
}

export const actions = {
    scoreboard ({ redirect, commit }, { payload, authToken, langCode }) {
        return new Promise((resolve, reject) => {
            caller.get(apiUrls.getScoreBoard(payload), authToken, langCode).then((response) => {
                if (response && response.data && response.data.status === 'SUCCESS') {
                    resolve(response.data)
                }
            }).catch((error) => {
                reject(error)
            })
        })
    },
    scoreboardSubjects ({ redirect, commit }, { payload, authToken, langCode }) {
        return new Promise((resolve, reject) => {
            caller.get(apiUrls.getScoreBoardSubjects(payload), authToken, langCode).then((response) => {
                if (response && response.data && response.data.status === 'SUCCESS') {
                    resolve(response.data)
                }
            }).catch((error) => {
                reject(error)
            })
        })
    },
    userAchievements ({ redirect, commit }, { payload, authToken, langCode }) {
        return new Promise((resolve, reject) => {
            console.log(payload)
            caller.get(apiUrls.getAchievements(payload), authToken, langCode).then((response) => {
                if (response && response.data && response.data.status === 'SUCCESS') {
                    resolve(response.data)
                }
            }).catch((error) => {
                reject(error)
            })
        })
    },
    scoreBoardUserCoins ({ redirect, commit }, { payload, authToken, langCode }) {
        return new Promise((resolve, reject) => {
            caller.get(apiUrls.getScoreBoardUserCoins(payload), authToken, langCode).then((response) => {
                if (response && response.data && response.data.status === 'SUCCESS') {
                    resolve(response.data)
                }
            }).catch((error) => {
                reject(error)
            })
        })
    },
    scoreBoardLastThreeTenure ({ redirect, commit }, { payload, authToken, langCode }) {
        return new Promise((resolve, reject) => {
            caller.get(apiUrls.getScoreBoardLastThreeTenure(payload), authToken, langCode).then((response) => {
                if (response && response.data && response.data.status === 'SUCCESS') {
                    resolve(response.data)
                }
            }).catch((error) => {
                reject(error)
            })
        })
    }
}





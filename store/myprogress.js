import apiUrls from '../config/apiUrls'
import caller from '../config/caller'

export const state = () => ({
})

export const mutations = {
}

export const actions = {
    lrsGetTotalTimeSpent({ redirect, commit }, { payload, authToken, langCode }) {
        return new Promise((resolve, reject) => {
            caller.get(apiUrls.lrsGetTotalTimeSpentURL(payload), authToken, langCode).then((response) => {
                if (response && response.data && response.data.status === 'SUCCESS') {
                    resolve(response.data)
                }
            }).catch((error) => {
                reject(error)
            })
        })
    },
    lrsGetTotalPointsAndCoins({ redirect, commit }, { payload, authToken, langCode }) {
        return new Promise((resolve, reject) => {
            caller.get(apiUrls.lrsGetTotalPointsAndCoinsURL(payload), authToken, langCode).then((response) => {
                if (response && response.data && response.data.status === 'SUCCESS') {
                    resolve(response.data)
                }
            }).catch((error) => {
                reject(error)
            })
        })
    },
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
    lrsGetTotalTimeSpentInPercentage({ redirect, commit }, { payload, authToken, langCode }) {
        return new Promise((resolve, reject) => {
            caller.get(apiUrls.lrsGetTotalTimeSpentInPercentage(payload), authToken, langCode).then((response) => {
                if (response && response.data && response.data.status === 'SUCCESS') {
                    resolve(response.data)
                }
            }).catch((error) => {
                reject(error)
            })
        })
    },
    getDataForAssessmentGraph({ redirect, commit }, { payload, authToken, langCode }) {
        return new Promise((resolve, reject) => {
            caller.get(apiUrls.getDataForAssessmentGraph(payload), authToken, langCode).then((response) => {
                if (response && response.data && response.data.status === 'SUCCESS') {
                    resolve(response.data)
                }
            }).catch((error) => {
                reject(error)
            })
        })
    },
    getDataForAssessmentGraphAll({ redirect, commit }, { payload, authToken, langCode }) {
        return new Promise((resolve, reject) => {
            caller.get(apiUrls.getDataForAssessmentGraphAll(payload), authToken, langCode).then((response) => {
                if (response && response.data && response.data.status === 'SUCCESS') {
                    resolve(response.data)
                }
            }).catch((error) => {
                reject(error)
            })
        })
    },
    lrsGetTotalPointsAndCoinsInPercentage({ redirect, commit }, { payload, authToken, langCode }) {
        return new Promise((resolve, reject) => {
            caller.get(apiUrls.lrsGetTotalPointsAndCoinsInPercentage(payload), authToken, langCode).then((response) => {
                if (response && response.data && response.data.status === 'SUCCESS') {
                    resolve(response.data)
                }
            }).catch((error) => {
                reject(error)
            })
        })
    }
}

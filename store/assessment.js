import apiUrls from '../config/apiUrls'
import caller from '../config/caller'

export const state = () => (initialState())

function initialState() {
  return {
  }
}


export const mutations = {
  RESET_STATE(state) {
    let newState = initialState();
    state = Object.assign(state, newState);
  }
}

export const actions = {
  startTest({ redirect, commit }, { authToken, payload, langCode }) {
    return new Promise((resolve, reject) => {
      caller.post(apiUrls.startTest, authToken, langCode, payload).then((response) => {
        resolve(response)
      }, error => {
        reject(error)
      })
    })
  },
  resumeTest({ redirect, commit }, { authToken, payload, langCode }) {
    return new Promise((resolve, reject) => {
      caller.put(apiUrls.resumeTest(payload.testId), authToken, langCode).then((response) => {
        resolve(response)
      }, error => {
        reject(error)
      })
    })
  },
  getQuestion({ redirect, commit }, { authToken, testId, langCode }) {
    return new Promise((resolve, reject) => {
      caller.get(apiUrls.getQuestion(testId), authToken, langCode).then((response) => {
        resolve(response)
      }, error => {
        reject(error)
      })
    })
  },
  verifyQuestion({ redirect, commit }, { authToken, payload, langCode }) {
    return new Promise((resolve, reject) => {
      caller.post(apiUrls.verifyQuestion, authToken, langCode, payload).then((response) => {
        resolve(response)
      }, error => {
        reject(error)
      })
    })
  },
  skipQuestion({ redirect, commit }, { authToken, testId, questionId, type, langCode }) {
    return new Promise((resolve, reject) => {
      caller.post(apiUrls.skipQuestion(testId, questionId, type), authToken, langCode).then((response) => {
        resolve(response)
      }, error => {
        reject(error)
      })
    })
  },
  getInstruction({ redirect, commit }, { authToken, payload, langCode }) {
    return new Promise((resolve, reject) => {
      caller.put(apiUrls.getInstruction, authToken, langCode, payload).then((response) => {
        resolve(response)
      }, error => {
        reject(error)
      })
    })
  },
  getAssessmentReview({ redirect, commit }, { authToken, testId, langCode }) {
    return new Promise((resolve, reject) => {
      caller.get(apiUrls.reviewAssessment(testId), authToken, langCode).then((response) => {
        resolve(response)
      }, error => {
        reject(error)
      })
    })
  },
  revise({ redirect, commit }, { authToken, payload, langCode }) {
    return new Promise((resolve, reject) => {
      caller.post(apiUrls.reviseQuestion, authToken, langCode, payload).then((response) => {
        resolve(response)
      }, error => {
        reject(error)
      })
    })
  },
}

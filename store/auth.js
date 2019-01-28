import apiUrls from '../config/apiUrls'
import config from '../config/index'
import axios from '../plugins/axios'
import { setToken, unsetToken, setUserName, setPassword } from '~/utils/auth'
import caller from '../config/caller'

export const state = () => (initialState())

function initialState () {
  return {
    user: {},
    subscriptionPlan: [],
    mySubscriptionPlan: {},
    credential: {},
    userSubscriptionPlan: {},
    languages: [],
    firstTokenInfo: {},
    otpTimer:false
  }
}


export const mutations = {
  SET_USER: function (state, user, flag) {
    state.user = user
  },
  SET_OTP_TIMER: function (state, flag) {
    state.otpTimer = flag
  },
  SET_FIRST_TOKEN: function (state, data) {
    state.firstTokenInfo.firstToken = data.token
    state.firstTokenInfo.userId = data.userId
  },
  SUBSCRIPTION: function (state, response) {
    state.subscriptionPlan = response
  },
  MYSUBSCRIPTION: function (state, response) {
    state.mySubscriptionPlan = response
  },
  MYSELECTEDSUBSCRIPTION: function (state, response) {
    state.userSubscriptionPlan = response
  },
  PORTAL_LANGUAGES: function (state, response) {
    state.languages = response
  },
  SAVEDCREDENTIAL: function (state, {principal,password,userId}) {
    state.credential.username = principal
    state.credential.password = password
    state.credential.userId = userId
  },
  RESET_STATE (state)
  {
    let newState = initialState();
    state = Object.assign(state, newState);
  }
}
export const actions = {
  login({ redirect, commit }, { email, password, remember, context, langCode }) {
    //context.$toast.show(context.$t('login.logging_in'))
    return new Promise((resolve, reject) => {
      caller.postWithoutAuth(apiUrls.loginApi, langCode, { principal: email, password }).then((response) => {
        if (response.data.firstLogin && response.data.status === 'SUCCESS') {
          // response.data.initialToken = response.data.token
          // commit('SET_USER', response.data)
          // commit('SET_INITIAL_DATA', { initialData : response.data }, {root: true})
          // setToken(response.data, false)
          commit('SET_FIRST_TOKEN', response.data)
          commit('parentStore/RESET_STATE', {}, {root: true})
          // context.$toast.success('Successfully logged in')
          // context.$router.replace({ path: "/changePassword" })
          //  context.$router.replace({ path: "/" })
          resolve(response)
        }
        else {
          if (response.data.roles[0]==='STUDENT' || response.data.roles[0]==='TEACHER') {
            commit('SET_USER', response.data)
            commit('SET_INITIAL_DATA', { initialData: response.data }, { root: true })

            setToken(response.data, true)
            if (response.data.language && !response.data.isTourUser) {
              commit('locale/SET_LANG', response.data.language.code, {root: true})
            }
            //context.$toast.success(context.$t('login.login_success'))
            if(remember) {
              setUserName(email)
              setPassword(password)
            } else {
              setUserName('')
              setPassword('')
            }
            caller.get(apiUrls.getUserGrades(), response.data.token).then((responseGrade) => {
              if (responseGrade && responseGrade.status === 200 && responseGrade.data && responseGrade.data.gradeCurriculum) {
                commit('SET_USER_GRADES', { userGrades : responseGrade.data.gradeCurriculum }, {root: true})
              }
            })
            //context.$router.replace({ path: "/" })
            resolve(response)

          }else if (response.data.roles[0]==='PARENT') {
            //context.$toast.success(context.$t('login.login_success'))
            commit('SET_USER', response.data)
            commit('SET_INITIAL_DATA', { initialData: response.data }, { root: true })
            setToken(response.data, true)
            if (response.data.language && !response.data.isTourUser) {
              commit('locale/SET_LANG', response.data.language.code, {root: true})
            }
            if(remember) {
              setUserName(email)
              setPassword(password)
            } else {
              setUserName('')
              setPassword('')
            }
            resolve(response)
          } else {
            context.$toast.error(context.$t('login.role_error'))
            context.$router.replace({ path: "/login" })
          }
        }
        commit('SET_INVALID_TOKEN', { invalidToken : false }, {root: true})
      }, (error) => {
        reject(error)
      })
        .catch((error) => {
        })
    })
  },
  bulkLogin({ redirect, commit }, { email, password, remember, context, langCode }) {
    //context.$toast.show(context.$t('login.logging_in'))
    return new Promise((resolve, reject) => {
      caller.postWithoutAuth(apiUrls.bulkLoginApi, langCode, { principal: email, password }).then((response) => {
        resolve(response)
      },(error) => {
        reject(error)
      }).catch((error) => {
        })
    })
  },
  logout ({ commit, dispatch, rootState }, {userId,deviceId, context, langCode}) {
    return new Promise((resolve, reject) => {
    caller.postWithoutAuth(apiUrls.logout(userId,deviceId), langCode).then((response) => {
    unsetToken()
    commit('SET_USER', {})
    commit('SET_INITIAL_DATA', {initialData: {}}, { root: true })
    window.clearInterval(rootState.locale.intervalId);
    window.clearInterval(rootState.locale.sessionTimeOutIntervalId);
    window.localStorage.removeItem('tour')
    commit('locale/STOP_POLLING', {}, {root: true})

    // resetting state
    commit('bookmark/RESET_STATE', {}, {root: true})
    commit('common/RESET_STATE', {}, {root: true})
    commit('content/RESET_STATE', {}, {root: true})
    commit('header/RESET_STATE', {}, {root: true})
    commit('liked/RESET_STATE', {}, {root: true})
    commit('locale/RESET_STATE', {}, {root: true})
    commit('newBuddyRequest/RESET_STATE', {}, {root: true})
    commit('note/RESET_STATE', {}, {root: true})
    commit('postContent/RESET_STATE', {}, {root: true})
    commit('profile/RESET_STATE', {}, {root: true})
    commit('register/RESET_STATE', {}, {root: true})
    commit('sidebarBuddyContent/RESET_STATE', {}, {root: true})
    commit('sidebarHomeContent/RESET_STATE', {}, {root: true})
    commit('sidebarregister/RESET_STATE', {}, {root: true})
    commit('sidebarStudyContent/RESET_STATE', {}, {root: true})
    commit('study/RESET_STATE', {}, {root: true})
    commit('RESET_STATE', {}, {root: true})
    commit('auth/RESET_STATE', {}, {root: true})



    //context.$router.replace({ path: '/login' })
    //context.$toast.show(context.$t('login.logout_success'))
    resolve(response)
    }).catch((error) => {
    })
  })
  },
  phoneVerify({ commit }, { principal, langCode }) {
    return new Promise((resolve, reject) => {
    caller.postWithoutAuth(apiUrls.phoneVerification, langCode, { principal }).then((response) => {
      resolve(response)
      commit('SET_OTP_TIMER', true)
    }).catch((error) => {
    })
  })
  },
  principalVerify({ commit }, { principal, langCode }) {
    return new Promise((resolve, reject) => {
    caller.getWithoutAuth(apiUrls.principalVerification(principal), langCode).then((response) => {
      resolve(response)
    }).catch((error) => {
    })
  })
  },
  activateUserDecativatedAccount({ commit }, { email, password, langCode }) {

    return new Promise((resolve, reject) => {
    caller.postWithoutAuth(apiUrls.userActivation, langCode, { principal: email, password }).then((response) => {

      //context.$toast.show('Mobile Number successfully registered')
      resolve(response);
      // commit('SET_USER', null)

    }).catch((error) => {
    })
  })
  },
  otpVerify({ commit }, { principal, otp, langCode }) {

    return new Promise((resolve, reject) => {
    caller.postWithoutAuth(apiUrls.otpVerification, langCode, { principal, otp }).then((response) => {
      //context.$toast.show('Mobile Number successfully registered')
      resolve(response);
      if(response.data.status === 'SUCCESS'){
        commit('SET_OTP_TIMER', false)
      }
    }).catch((error) => {
    })
  })
  },
  otpForgotPasswordVerification({ commit }, { principal,taskType, otp, langCode }) {
    return new Promise((resolve, reject) => {
    caller.postWithoutAuth(apiUrls.otpVerification, langCode,  { principal, taskType, otp }).then((response) => {
      // context.$toast.show('Mobile Number successfully registered')
      resolve(response);
      // commit('SET_USER', null)

    }).catch((error) => {
    })
  })
  },
  otpConfirmation({ commit }, { principal,authToken,taskType, langCode, otp }) {
    return new Promise((resolve, reject) => {
    caller.post(apiUrls.otpVerification, authToken, langCode, { principal,taskType, otp }).then((response) => {
      // context.$toast.show('Mobile Number successfully registered')
      resolve(response);
      // commit('SET_USER', null)

    }).catch((error) => {
    })
  })
  },
 subscription({ commit }, {country, promocode, selectedUser, langCode}) {
    return new Promise((resolve, reject) => {
    caller.getWithoutAuth(apiUrls.getSubscriptionPlan({lang: langCode, country, promocode, selectedUser}), langCode).then((response) => {
      //commit('SUBSCRIPTION', response.data.SubscriptionMaster)
      resolve(response)
    }).catch((error) => {
    })
  })
  },
  checkPromo({ commit }, {langCode, country, promocode, selectedUser}) {
    return new Promise((resolve, reject) => {
    caller.getWithoutAuth(apiUrls.getSubscriptionPlan({lang: langCode, country, promocode, selectedUser}), langCode).then((response) => {
      resolve(response)
    }).catch((error) => {
    })
  })
  },
  mySubscription({ commit }, {authToken, langCode,childId,parentIn}) {
    return new Promise((resolve, reject) => {
    caller.get(apiUrls.getMySubscription(childId,parentIn), authToken, langCode).then((response) => {
      // context.$toast.show('Mobile Number successfully registered')
      commit('MYSUBSCRIPTION', response.data)
      resolve(response)
    }).catch((error) => {
    })
  })
  },
  userCredential({ commit }, {principal,password,userId}) {
    commit('SAVEDCREDENTIAL', {principal,password,userId})
  },
  setOtpTimer({commit}, {flag}){
    commit('SET_OTP_TIMER', flag)
  },
  viewUserPlans({ commit }, {langCode, payloadData}) {

    return new Promise((resolve, reject) => {
    caller.postWithoutAuth(apiUrls.getUserPlans,langCode,payloadData).then((response) => {
      // context.$toast.show('Mobile Number successfully registered')
      commit('MYSELECTEDSUBSCRIPTION', response.data)
      resolve(response)
    }).catch((error) => {
    })
  })
  },
  getPromoCodeValidation({ commit },{promocode,email,phone}) {
    return new Promise((resolve, reject) => {
    caller.getWithoutAuth(apiUrls.validatePromoCode(promocode,email,phone)).then((response) => {
      resolve(response)

    }).catch((error) => {
    })
  })
  },
  validateReferralCode({ commit },{referralCode}) {
    return new Promise((resolve, reject) => {
    caller.getWithoutAuth(apiUrls.validateReferralCode(referralCode)).then((response) => {
      resolve(response)
    }).catch((error) => {
    })
  })
  },
  getLanguagesService({ commit }) {
    return new Promise((resolve, reject) => {
    caller.getWithoutAuth(apiUrls.languages()).then((response) => {
      // context.$toast.show('Mobile Number successfully registered')
      commit('PORTAL_LANGUAGES', response.data)
      resolve(response)
    }).catch((error) => {
    })
  })
  },
  finalUpdateBio({ commit },{authToken, langCode, finalBioPayload}) {

    return new Promise((resolve, reject) => {
    caller.post(apiUrls.updateBio(),authToken,langCode, finalBioPayload).then((response) => {
      // context.$toast.show('Mobile Number successfully registered')
      commit('SET_INITIAL_BIODATA', { initialData: finalBioPayload }, { root: true })
      resolve(response)
    }).catch((error) => {
    })
  })
  },
  getUserProfileThemes({ commit },{authToken, langCode}) {

    return new Promise((resolve, reject) => {
    caller.get(apiUrls.getThemes(),authToken).then((response) => {
      // context.$toast.show('Mobile Number successfully registered')

      resolve(response)
    }).catch((error) => {
    })
  })
  },
  initiatePayment({ commit }, {langCode, paymentPayload}) {
    return new Promise((resolve, reject) => {
    caller.postWithoutAuth(apiUrls.initiateUserPayment,langCode, paymentPayload).then((response) => {
      // context.$toast.show('Mobile Number successfully registered')
      // commit('SUBSCRIPTION', response.data.SubscriptionMaster)
      resolve(response)

    }).catch((error) => {
    })
  })
  },
  themeSelection({ commit }, {authToken, langCode, id, theme}) {
    let payload = id
    return new Promise((resolve, reject) => {
    caller.post(apiUrls.updateTheme, authToken, langCode, {id}).then((response) => {
      // context.$toast.show('Mobile Number successfully registered')
      // commit('SUBSCRIPTION', response.data.SubscriptionMaster)
      commit('SET_PROFILE_THEME', { initialData: theme }, { root: true })
      resolve(response)

    }).catch((error) => {
    })
  })
  },
  userProfileUpdate({ commit }, {authToken, langCode,payloadObj}) {
    return new Promise((resolve, reject) => {
    caller.post(apiUrls.userProfileUpdateurl, authToken, langCode, payloadObj).then((response) => {
      // context.$toast.show('Mobile Number successfully registered')
      // commit('SUBSCRIPTION', response.data.SubscriptionMaster)

      if(response.data.status === 'SUCCESS') {
        if(payloadObj.phone) {
          commit('SET_CHANGED_PHONE', { initialData: payloadObj.phone }, { root: true })
        }
        if(payloadObj.email) {
          commit('SET_CHANGED_EMAIL', { initialData: payloadObj.email }, { root: true })
        }
        if(payloadObj.alternatePhone) {
          commit('SET_CHANGED_ALTPHONE', { initialData: payloadObj.alternatePhone }, { root: true })
        }
      }



      resolve(response)

    }).catch((error) => {
    })
  })
  },
  paymentConfirmation({ commit }, {langCode, authToken,  payloadConfirmData, childId}) {
    return new Promise((resolve, reject) => {
    caller.postWithoutAuth(apiUrls.initiateUserPaymentConfirmation,langCode, payloadConfirmData).then((response) => {
      // context.$toast.show('Mobile Number successfully registered')
      // commit('SUBSCRIPTION', response.data.SubscriptionMaster)
      if(authToken){
        caller.get(apiUrls.getUserGrades(childId), authToken, langCode).then((responseGrade) => {
          if (responseGrade && responseGrade.status === 200 && responseGrade.data && responseGrade.data.gradeCurriculum) {
            commit('SET_USER_GRADES', { userGrades : responseGrade.data.gradeCurriculum }, {root: true})
          }
        })

        caller.get(apiUrls.userDetails, authToken, langCode).then((responseInitial) => {
          if (responseInitial && responseInitial.status === 200 && responseInitial.data) {
            commit('SET_INITIAL_DATA', { initialData : responseInitial.data }, {root : true})
            }
        })
      }
      resolve(response)

    }).catch((error) => {
    })
  })
  },
  userSignUp({ commit }, { payloadData, langCode }) {
    return new Promise((resolve, reject) => {
    caller.postWithoutAuth(apiUrls.signUp, langCode, payloadData).then((response) => {

      if(response.data && (response.data.status === 'SUCCESS')){
        setToken(response.data, true)
        commit('SET_USER', response.data)
        commit('SET_INITIAL_DATA', { initialData: response.data }, { root: true })


      }
      resolve(response)

      // context.$router.replace({ path: '/' })
    }).catch((error) => {
      reject(error)
    })
  })
  },
  userTour({ commit }, { payloadData, langCode }) {
      return new Promise((resolve, reject) => {
      caller.postWithoutAuth(apiUrls.takeTour, langCode, payloadData).then((response) => {
        resolve(response)

        // context.$router.replace({ path: '/' })
      }).catch((error) => {
        reject(error)
      })
    })
    },
  parentSignUp({ commit }, { payloadData, langCode }) {
    return new Promise((resolve, reject) => {
    caller.postWithoutAuth(apiUrls.ParentsignUp, langCode, payloadData).then((response) => {
      if(response.data && (response.status === 200)){
        setToken(response.data, true)
        commit('SET_USER', response.data)
        commit('SET_INITIAL_DATA', { initialData: response.data }, { root: true })
        commit('parentStore/RESET_STATE', {}, {root: true})
      }
      resolve(response)
      // context.$router.replace({ path: '/' })
    }).catch((error) => {
      reject(error)
    })
  })
  },
  changeOrForgotPassword({ redirect, commit }, { principal, newPassword, taskType, otp, authToken, langCode }) {
    return new Promise((resolve, reject) => {
      caller.post(apiUrls.changeOrForgotPassword, authToken, langCode, {
        principal: principal,
        newPassword: newPassword,
        taskType: taskType,
        otp: otp
      }).then((response) => {
        if (response && response.status === 200) {


          resolve(response)
        }
      }).catch((error) => {
          reject(error)
        })
    })
  },
  ForgotPassword({ redirect, commit }, { principal, newPassword, taskType, otp, langCode}) {
    return new Promise((resolve, reject) => {
      caller.postWithoutAuth(apiUrls.ForgotPassword, langCode, {
        principal: principal,
        newPassword: newPassword,
        taskType: taskType,
        otp: otp
      }).then((response) => {
        if (response && response.status === 200) {

          resolve(response)
        }
      }).catch((error) => {
          reject(error)
        })
    })
  },
  onboardingProfileImage ({redirect, commit},{authToken, langCode, imgData}) {
    return new Promise((resolve, reject) => {
      caller.postfile(apiUrls.onboardingProfilePic, authToken, langCode, imgData).then((response) => {
      if (response && response.status === 200 && response.data) {
        // commit('FETCH_COUNTRIES', {response: response.data})
        // commit('SET_INITIAL_PIC', { initialData: response.data }, { root: true })
        resolve(response)
      }
    }).catch((error) => {

        reject(error)
      })
    })
  },
  sendOTP({ redirect, commit }, { principal, taskType, authToken, langCode }) {
    return new Promise((resolve, reject) => {
    caller.post(apiUrls.sendOTP, authToken, langCode, {
      principal: principal,
      taskType: taskType
    })
      .then((response) => {

        resolve(response)
        commit('SET_OTP_TIMER', true)
      })
      .catch((error) => {
      })
    })
  },
  sendTour({ redirect, commit }, { data }) {
    commit('SET_TOUR', {data})
  },
  sendForgotPasswordOTP({ redirect, commit }, { principal, taskType, langCode}) {
    return new Promise((resolve, reject) => {
    caller.postWithoutAuth(apiUrls.sendOTP, langCode, {
      principal: principal,
      taskType: taskType
    })
      .then((response) => {

        resolve(response)
        commit('SET_OTP_TIMER', true)
      })
      .catch((error) => {
      })
    })
  },
  getPlanPriceSummary({ commit }, {authToken, langCode, reqObject}) {
    return new Promise((resolve, reject) => {
    caller.get(apiUrls.getPlanPriceSummary(reqObject), authToken, langCode).then((response) => {
      // context.$toast.show('Mobile Number successfully registered')
      // commit('MYSUBSCRIPTION', response.data)
      resolve(response)
    }).catch((error) => {
    })
  })
  },
  getPaymentInvoice({ commit }, {authToken, invoiceId, langCode}) {
    return new Promise((resolve, reject) => {
    caller.getWithoutAuthArrayBuffer(apiUrls.getPaymentInvoice(invoiceId), langCode).then((response) => {
      resolve(response)
    }).catch((error) => {
    })
  })
  },
  getPaymentInvoiceDetails({ commit }, {authToken, invoiceId, langCode}) {
    return new Promise((resolve, reject) => {
    caller.get(apiUrls.getPaymentInvoiceDetails(invoiceId), authToken, langCode).then((response) => {
      resolve(response)
    }).catch((error) => {
    })
  })
  },
  getUserPaymentParam({ commit }, {authToken, transactionId, userId, langCode}) {
    return new Promise((resolve, reject) => {
    caller.get(apiUrls.getUserPaymentParam(transactionId,userId), authToken, langCode).then((response) => {
      resolve(response)
    }).catch((error) => {
    })
  })
  },
  activateFreePlan({ commit }, {authToken, langCode, reqObjectt}) {
    return new Promise((resolve, reject) => {
    caller.get(apiUrls.activateFreePlan(reqObjectt), authToken, langCode).then((response) => {
      resolve(response)
    }).catch((error) => {
    })
  })
  }
}

export const getters = {
  isLoggedIn: (state) => () => {
    return state.user && state.user.token
  },
  isAuthenticated(state) {
    return !!state.user
  },
  loggedUser(state) {
    return state.user
  },
  authToken() {
    return state.user ? state.user.token : null
  },
  otpTimer() {
    return state.otpTimer
  }
}

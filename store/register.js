import apiUrls from '../config/apiUrls'
import caller from '../config/caller'
export const state = () => (initialState())

function initialState () {
  return {
    userRegistrationData: {
      showPromoCodeResults:false
    },
    registrationUserData:{},
    countryList:[],
    cityList:[],
    schoolList:[],
    selectedStudentList: [],
    roles: [
      "STUDENT","PARENT","TEACHER"
    ],
    grades: [],
    otpTimer:false
  }
}

export const mutations = {
  SHOW_SELECTED_USER_DATA: function(state,userType){
    state.userRegistrationData.userType = userType;
  },
  SET_OTP_TIMER: function (state, flag) {
    state.otpTimer = flag
  },
  SHOW_SELECTED_USER_PLAN: function(state,planId){
    state.userRegistrationData.userPlan = planId;
},
  SHOW_SELECTED_USER_PROMOCODE: function(state,promocodeData){
    state.userRegistrationData.promocodeData = promocodeData;
    if(promocodeData.promoId){
    state.userRegistrationData.showPromoCodeResults = true;
    }
    else{
      state.userRegistrationData.showPromoCodeResults = false;
    }
},
COUNTRY_LIST: function(state,{response}){
  state.countryList = response.countries;
},
CITY_LIST: function(state,{response}){

  state.cityList = response;
},
SCHOOL_LIST: function(state,{response}){

  state.schoolList = response;
},
PARENT_WARD_LIST: function(state,{parentsWardList}){
  let studentList = state.selectedStudentList
  let updatedChildList = parentsWardList
  let newSelectedChildren = Object.assign([],studentList,parentsWardList)
  state.selectedStudentList = newSelectedChildren;
},
PARENT_REMOVED_WARD_LIST: function(state,{parentsWardList}){
  let studentList = state.selectedStudentList
  let updatedChildObj = parentsWardList
  let newSelectedChildren = studentList.filter(data => {
    return data !== parentsWardList
  })
  state.selectedStudentList = newSelectedChildren
},
FETCH_REGISTRATION_DATA: function(state,{selectedUserType}){
  state.registrationUserData.userSelectionType = selectedUserType;
},
FETCH_ENTERED_PROMOCODE_DATA: function(state,{selectedUserType}){
  state.registrationUserData.userSelectionType = selectedUserType;
},
USER_GRADES: function(state, {response}) {
  state.grades = response.grades;
},
RESET_STATE (state)
{
  let newState = initialState();
  state = Object.assign(state, newState);
}
}

export const actions = {
  fetchSelecteduser ({redirect, commit}, {selectedUserType}) {
    return new Promise((resolve, reject) => {
      commit('FETCH_REGISTRATION_DATA', { selectedUserType })
      resolve(selectedUserType)
  })
  },
  fetchPromocodeSelected ({redirect, commit}, {selectedUserType}) {
    return new Promise((resolve, reject) => {
      commit('FETCH_ENTERED_PROMOCODE_DATA', { selectedUserType })
      resolve(selectedUserType)
  })
  },
  fetchCountries ({commit},{langCode}) {
    return new Promise ((resolve, reject) => {
    caller.getWithoutAuth(apiUrls.getCountries(), langCode).then((response) => {
      if (response && response.status === 200 && response.data) {
        commit('COUNTRY_LIST', {response: response.data})
      }
      resolve(response)
    }).catch((error) => {
      })
    })
  },
  fetchCities ({commit},{langCode}) {
    caller.getWithoutAuth(apiUrls.getCities(), langCode).then((response) => {
      if (response && response.status === 200 && response.data) {
        commit('CITY_LIST', {response: response.data.cities})
      }
    }).catch((error) => {
      })
  },
  fetchSchools ({commit},{langCode,city,country}) {
    return new Promise ((resolve, reject) => {
    caller.getWithoutAuth(apiUrls.getSchools(city,country), langCode).then((response) => {
      if (response && response.status === 200 && response.data) {
        commit('SCHOOL_LIST', {response: response.data.schools})
        resolve(response)
      }
    }).catch((error) => {
      })
      })
  },
  fetchGrades ({commit},{langCode}) {
    return new Promise ((resolve, reject) => {
    caller.getWithoutAuth(apiUrls.grades, langCode).then((response) => {
      if (response && response.status === 200 && response.data) {
        commit('USER_GRADES', {response: response.data})
        resolve(response)
      }
    }).catch((error) => {
      })
    })
  },
  fetchParentsWard ({commit},{langCode,query}) {
    return new Promise ((resolve, reject) => {
    caller.getWithoutAuth(apiUrls.ParentsWard(query), langCode).then((response) => {
      if (response && response.status === 200 && response.data) {

        resolve(response)
      }
    }).catch((error) => {
      })
    })
  },
  sendChildOtp({ commit }, { childId,langCode }) {

    return new Promise((resolve, reject) => {
    caller.postWithoutAuth(apiUrls.sendChildOtp, langCode, {childId}).then((response) => {
      //context.$toast.show('Mobile Number successfully registered')
      resolve(response);
      // commit('SET_USER', null)
      commit('SET_OTP_TIMER', true);
    }).catch((error) => {
    })
  })
  },
  verifyChildOtp({ commit }, { childId,otp,langCode }) {

    return new Promise((resolve, reject) => {
    caller.postWithoutAuth(apiUrls.verifyChildOtp, langCode, {childId,otp}).then((response) => {
      //context.$toast.show('Mobile Number successfully registered')
      resolve(response);
      // commit('SET_USER', null)

    }).catch((error) => {
    })
  })
  },
  parentsWardList({ commit }, { parentsWardList }) {
    commit('PARENT_WARD_LIST',{parentsWardList})
  },
  removeTempChild({ commit }, { parentsWardList }) {
    commit('PARENT_REMOVED_WARD_LIST',{parentsWardList})
  },
  fetchPromocodeDetails ({commit},{promocode, payloadData}) {

    return new Promise((resolve, reject) => { caller.getWithoutAuth(apiUrls.getPromoCodeInfo(promocode)).then((response) => {
          commit('SHOW_SELECTED_USER_PROMOCODE',response.data)
          if (response && response.status === 200 && response.data) {
            resolve(response.data)
            // commit('USER_GRADES', {response: response.data})
            // if(response.data.code === 'INVALID_COUPON_CODE'){
            //   this.$toast.error('This Coupon Code is Invalid')
            //   return;
            // }
            // if(response.data.code === 'COUPON_CODE_EXPIRED'){
            //   this.$toast.error('This Coupon Code is Expired')
            //   return;
            // }
            // if((payloadData.email || payloadData.phone) && (response.data.principal !== 'All')){
            //   if((payloadData.email !== response.data.principal) || (payloadData.phone !== response.data.principal)){
            //     this.$toast.error('Your coupon code is invalid')
            //     return;
            //   }
            // }
            // else{
            //     this.$toast.success('Your coupon code is applied successfully');
            // }
          }
        }).catch((error) => {
          })
    })

  },
  redirectByUser ({redirect, commit},{userType, context}) {
    commit('SHOW_SELECTED_USER_DATA',userType)
      context.$router.replace({ path: '/plan' })
  },
  redirectToUserForm ({redirect, commit},{planId}) {
    commit('SHOW_SELECTED_USER_PLAN',planId)
  },
  setOtpTimer({commit}, {flag}){
    commit('SET_OTP_TIMER', flag)
  },
}

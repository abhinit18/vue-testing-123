import apiUrls from '../config/apiUrls'
import caller from '../config/caller'
export const state = () => (initialState())

function initialState () {
  return {
    countryList:[],
    cityList:[],
    schoolList:[],
    grades: [],
    postReportReasons: [
      {
        key:0,
        name:"This post is abusive",
        value:"common.postReason1"
      },
      {
          key:1,
          name:"This post hurts religious sentiments",
          value:"common.postReason2"
      },
      {
        key:2,
        name:"I am being bullied",
        value:"common.postReason3"
      },
      {
        key:3,
        name:"This is spam",
        value:"common.postReason4"
      },
      {
        key:4,
        name:"This is indecent",
        value:"common.postReason5"
      },
      {
        key:5,
        name:"Other",
        value:"common.postReason6"
      }
    ],
    userJobTitle: [
      {
        key:0,
        name:"Student",
        value:"common.jobTitle1"
      },
      {
          key:1,
          name:"Teacher",
          value:"common.jobTitle2"
      },
      {
        key:2,
        name:"Parent",
        value:"common.jobTitle3"
      },
      {
        key:3,
        name:"Professional",
        value:"common.jobTitle4"
      }
    ],
    userhearAboutTitle: [
      {
        key:0,
        name:"Newsletter",
        value:"common.hearAboutTitle1"
      },
      {
          key:1,
          name:"EMail",
          value:"common.hearAboutTitle2"
      },
      {
        key:2,
        name:"Message",
        value:"common.hearAboutTitle3"
      },
      {
        key:3,
        name:"Social Network",
        value:"common.hearAboutTitle4"
      },
      {
        key:4,
        name:"Newspaper",
        value:"common.hearAboutTitle5"
      },
      {
        key:5,
        name:"Friend",
        value:"common.hearAboutTitle6"
      }
    ],
    profileReportReasons: [
      {
        key:0,
        name:"This profile is fake",
        value:"common.profileReason1"
      },
      {
        key:1,
        name:"this profile is plagiarized",
        value:"common.profileReason2"
      },
      {
        key:2,
        name:"This profile is of another user",
        value:"common.profileReason3"
      },
      {
        key:3,
         name:"This profile is indecent/abusive(in description)",
        value:"common.profileReason4"
      },
      {
        key:4,
        name:"Other",
        value:"common.profileReason5"
      }
    ],
    maxLengthBio: 200
  }
}

export const getters = {
  getBioMaxLength: (state) => () => {
    return state.maxLengthBio
  }
}


export const mutations = {
  FETCH_COUNTRIES: function(state,{response}){
    state.countries = response.countries || [];
  },
  RESET_STATE(state)
  {
    let newState = initialState();
    state = Object.assign(state, newState);
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
  FETCH_REGISTRATION_DATA: function(state,{selectedUserType}){
    state.registrationUserData.userSelectionType = selectedUserType;
  },
  FETCH_ENTERED_PROMOCODE_DATA: function(state,{selectedUserType}){
    state.registrationUserData.userSelectionType = selectedUserType;
  },
  USER_GRADES: function(state, {response}) {
    state.grades = response.grades;
  }
}
export const actions = {
  fetchStaticPage ({commit },{name, langCode}) {
    return new Promise ((resolve, reject) => {
      caller.getWithoutAuth(apiUrls.getStaticPagesList(name), langCode).then((response) => {
        resolve (response)
      }, error => {
        reject (error)
      })
    })
  },
  fetchInvoice ({commit },{ id, langCode}) {
    return new Promise ((resolve, reject) => {
      caller.getWithoutAuthArrayBuffer(apiUrls.getInvoice(id), langCode).then((response) => {
        resolve (response)
      }, error => {
        reject (error)
      })
    })
  },
  fetchCountries ({commit },{ authToken, langCode}) {
    caller.get(apiUrls.getCountries(), authToken, langCode).then((response) => {
      if (response && response.status === 200 && response.data) {
        commit('COUNTRY_LIST', {response: response.data})
      }
    }).catch((error) => {
      })
  },
  fetchCities ({commit}, {authToken, langCode}) {
    caller.get(apiUrls.getCities(), authToken, langCode).then((response) => {
      if (response && response.status === 200 && response.data) {
        commit('CITY_LIST', {response: response.data.cities})
      }
    }).catch((error) => {
      })
  },
  fetchSchools ({commit}, {authToken, langCode, city, country}) {
    return new Promise ((resolve, reject) => {
    caller.get(apiUrls.getSchools(city, country), authToken, langCode).then((response) => {
      if (response && response.status === 200 && response.data) {
        commit('SCHOOL_LIST', {response: response.data.schools})
        resolve(response)
      }
    }).catch((error) => {
      })
      })
  },
  fetchGrades ({commit}, {authToken, langCode}) {
    return new Promise ((resolve, reject) => {
    caller.get(apiUrls.grades, authToken, langCode).then((response) => {
      if (response && response.status === 200 && response.data) {
        commit('USER_GRADES', {response: response.data})
        resolve(response)
      }
    }).catch((error) => {
      })
    })
  },
  inviteFriend ({redirect, commit},{authToken, langCode, friendEmailData}) {
    return new Promise((resolve, reject) => {caller.post(apiUrls.inviteFriend, authToken, langCode, friendEmailData).then((response) => {
      if (response && response.status === 200 && response.data) {
        // commit('FETCH_COUNTRIES', {response: response.data})
        resolve(response)
      }
    }).catch((error) => {
      })
    })
  },
  userFeedback ({redirect, commit},{authToken, langCode, payload}) {
    return new Promise((resolve, reject) => {caller.post(apiUrls.feedback, authToken, langCode, payload).then((response) => {
      if (response && response.status === 200 && response.data) {
        // commit('FETCH_COUNTRIES', {response: response.data})
        resolve(response)
      }
    }).catch((error) => {
        reject(error)
      })
    })
  },
  ReportAbuse ({redirect, commit},{authToken, langCode, payload}) {
    return new Promise((resolve, reject) => {caller.post(apiUrls.userReportAbuse, authToken, langCode, payload).then((response) => {
      if (response && response.status === 200 && response.data) {
        // commit('FETCH_COUNTRIES', {response: response.data})
        resolve(response)
      }
    }).catch((error) => {
        reject(error)
      })
    })
  },
  RequestDemo ({redirect, commit},{langCode, payloadData}) {

    return new Promise((resolve, reject) => {caller.postWithoutAuth(apiUrls.demoRequest,langCode, payloadData).then((response) => {
      if (response && response.status === 200 && response.data) {
        // commit('FETCH_COUNTRIES', {response: response.data})
        resolve(response)
      }
    }).catch((error) => {
        reject(error)
      })
    })
  }
}

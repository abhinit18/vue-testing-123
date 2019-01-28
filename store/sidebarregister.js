export const state = () => (initialState())

function initialState () {
  return [
    {
      key: 1,
      name: "subscription_plan",
      active: false,
      link: "/plan",
      icon: "&#xE41D"
    },
    {
      key: 2,
      name: "basic_details",
      active: false,
      link: "#",
      icon: "&#xE14F"
    }
  ]
}

export const mutations = {
  SET_REGISTER_ACTIVE: function (state, {key,userType,plan}) {
    // if(plan){
    //   if(userType === 'STUDENT'){
    //     state[1].link = '/studentregister';
    //   }else{
    //     state[1].link = '/teacherregister';
    //   }
    // }
    state.forEach(item => {
      if (item.key == key) {
        item.active = true
      } else {
        item.active = false
      }
    })
  },
  RESET_STATE (state)
  {
    let newState = initialState();
    state = Object.assign(state, newState);
  }
}

export const actions = {
  navChange ({redirect, commit}, {key,userType}) {
    commit('SET_REGISTER_ACTIVE', {key,userType})
  }
}

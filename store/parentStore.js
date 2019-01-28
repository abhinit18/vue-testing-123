import apiUrls from '../config/apiUrls'
import caller from '../config/caller'
export const state = () => (initialState())

function initialState () {
  return {
    selectedStudentList: []
  }
}

export const mutations = {
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
RESET_STATE (state)
{
  let newState = initialState();
  state = Object.assign(state, newState);
}
}

export const actions = {
  parentsWardList({ commit }, { parentsWardList }) {
    commit('PARENT_WARD_LIST',{parentsWardList})
  },
  emptyList({ commit }) {
    commit('RESET_STATE')
  },
  removeTempChild({ commit }, { parentsWardList }) {
    commit('PARENT_REMOVED_WARD_LIST',{parentsWardList})
  }
}

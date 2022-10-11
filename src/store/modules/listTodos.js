import { checkStorage, saveToStorage } from '../../utils/localStorage'

const state = () => {
  return {
    list: [],
    fetching: false
  }
}

const mutations = {
  GET_TODOS_SUCCESS(state, payload) {
    state.list = payload
  },
  ADD_TODO(state, payload) {
    state.list.push(payload)
  },
  DELETE_TODO(state, index) {
    state.list = state.list.filter(item => {
      return item.index !== index
    })
    
    state.list = state.list.map((item) => {
      if (item.index > index) {
        item.index = item.index - 1
      }
      return item
    })
  },
  EDIT_TODO(state, payload) {
    state.list = state.list.map(item => {
      return item.index === payload.index? payload: item
    })
  },
  COMPLETE_TODO(state, index) {
    state.list = state.list.map(item => {
      if (item.index === index) {
        item.completed = true
      }
      return item
    })
  },
  SAVE_PICTURE(state, { picture, index }) {
    state.list = state.list.map(item => {
      if (item.index === index) {
        item.picture = picture
      }
      return item
    })
  }
}

const actions = {
  async getTodos({ commit }) {
    const data = checkStorage() || []
    commit('GET_TODOS_SUCCESS', data)
  },
  createToDo({ state, commit }, payload) {
    commit('ADD_TODO', { index: state.list.length, ...payload})
    saveToStorage(state.list)
  },
  deleteTodo({ state, commit }, index) {
    commit('DELETE_TODO', index)
    saveToStorage(state.list)
  },
  editToDo({ state, commit }, payload) {
    commit('EDIT_TODO', payload)
    saveToStorage(state.list)
  },
  completeTodo({ state, commit }, index) {
    commit('COMPLETE_TODO', index)
    saveToStorage(state.list)
  },
  savePictureInTodo({ state, commit }, {picture, index}) {
    commit('SAVE_PICTURE', { picture, index })
    saveToStorage(state.list)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

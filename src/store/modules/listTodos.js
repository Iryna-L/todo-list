import http from '../../utils/http'

const state = () => {
  return {
    list: [],
    fetching: false
  }
}

const mutations = {
  GET_TODOS_REQUEST(state) {
    state.fetching = true
  },

  GET_TODOS_SUCCESS(state, payload) {
    state.list = payload.slice(0, 10)
    state.fetching = false
  },

  GET_TODOS_FAILURE(state) {
    state.list = []
    state.fetching = false
  }
}

const actions = {
  async getTodos({ commit }) {
    commit('GET_TODOS_REQUEST')

    try {
      const { data } = await http.get('/todos')

      commit('GET_TODOS_SUCCESS', data)
    } catch (e) {
      commit('GET_TODOS_FAILURE')
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

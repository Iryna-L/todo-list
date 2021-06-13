import Vuex from 'vuex'
import listTodos from './modules/listTodos'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    listTodos
  }
})

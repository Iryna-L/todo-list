// store/index.js (Vue 3 + Vuex 4)
import { createStore } from 'vuex'
import listTodos from './modules/listTodos'

export default createStore({
  modules: {
    listTodos,
  },
})


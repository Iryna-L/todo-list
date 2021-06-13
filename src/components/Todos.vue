<template>
  <div class="todos">
    <h1>TO DO LIST</h1>
    <div v-show="fetching">
      <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
    </div>
    
    <div v-show="!fetching">
      
      <div  class="todos">
        <div v-for="todo in list" :key="todo.id">
          <TodoItem :todo="todo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TodoItem from './TodoItem.vue'
// import CreateModal from './CreateModal.vue'
// import EditModal from './EditModal.vue'

export default {
  name: 'Todos',
  data () {
    return {
      editableUser: {}
    }
  },
  components: {
    TodoItem,
  //   CreateModal,
  //   EditModal
  },

  computed: {
    ...mapState('listTodos', ['list', 'fetching'])
  },
  methods: {
    ...mapActions('listTodos', ['getTodos']),

    handleEditCurrentUser (user) {
      this.editableUser = user
    }
  },
  created () {
    this.getTodos()
  }
}
</script>

<style lang="scss" scoped>
.todos {
  max-width: 1200px;
  margin: 0 auto;
}
@media(max-width: 800px) {

}
</style>

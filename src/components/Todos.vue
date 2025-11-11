<template>
  <div class="todos">
    <h1>TO DO LIST</h1>
    <div>
      <create-todo
        :showModal="showCreateModal"
        @close="showCreateModal = false"
        @create="submitCreateTodo"
      />
      <edit-todo
        :showModal="showEditModal"
        @close="showEditModal = false"
        @edit="submitEditTodo"
        :currentTodo="editableTodo"
      />

      <div v-show="list.length" class="todos">
        <button @click="showCreateModal = true" class="md-raised md-primary">Create</button>
        <div class="todos-item" v-for="todo in list" :key="todo.id">
          <todo-item
            @deleted="submitDeleteTodo"
            @edit="handleEditOpen"
            @savedPic="handleSavedPic"
            @deletedPic="handleDeleteddPic"
            :todo="todo"
          />
        </div>
      </div>
      <div v-show="!list.length">
        <md-empty-state
          md-icon="devices_other"
          md-label="Create your first todo"
          md-description=""
        >
          <button @click="showCreateModal = true" class="md-primary md-raised">Create first todo</button>
        </md-empty-state>
      </div>
    </div>

    <md-dialog-alert
      :md-active.sync="showNotify"
      :md-title="notifyMessage"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import TodoItem from "./TodoItem.vue";
import CreateTodo from "./CreateTodo.vue";
import EditTodo from "./EditTodo.vue";

export default {
  name: "Todos",
  data() {
    return {
      showCreateModal: false,
      showEditModal: false,
      showNotify: false,
      notifyMessage: '',
      editableTodo: {},
    };
  },
  components: {
    TodoItem,
    CreateTodo,
    EditTodo,
  },

  computed: {
    ...mapState("listTodos", ["list", "fetching"]),
  },
  methods: {
    ...mapActions("listTodos", ["getTodos", "createToDo", "editToDo"]),

    handleEditOpen(todo) {
      this.editableTodo = todo;
      this.showEditModal = true;
    },
    submitCreateTodo(payload) {
      this.createToDo(payload);
      this.showCreateModal = false;
      this.showNotify = true;
      this.notifyMessage = "Succesfully created."
    },
    submitEditTodo(payload) {
      this.editToDo(payload);
      this.showEditModal = false;
      this.showNotify = true;
      this.notifyMessage = "Succesfully edited."
    },
    submitDeleteTodo() {
      this.showNotify = true;
      this.notifyMessage = "Succesfully deleted."
    },
    handleSavedPic() {
      this.showNotify = true;
      this.notifyMessage = "Picture is saved"
    },
    handleDeleteddPic() {
      this.showNotify = true;
      this.notifyMessage = "Picture is cleared"
    }
  },
  created() {
    this.getTodos();
  },
};
</script>

<style lang="scss" scoped>
.todos {
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 60px;
  &-item {
    margin-bottom: 16px;
  }
}
</style>

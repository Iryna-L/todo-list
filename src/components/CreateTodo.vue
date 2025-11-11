<template>
  <div>
    <md-dialog :md-active.sync="showModal" md-fullscreen>
      <md-dialog-title>Create new todo</md-dialog-title>
      <div class="create-todo">
        <md-field>
        <label>Title of Todo</label>
        <md-input v-model="newTodo.title" required></md-input>
        <span class="md-error">This is required</span>
      </md-field>

      <md-field>
        <label>Description of Todo</label>
        <md-textarea v-model="newTodo.description" maxlength="500"></md-textarea>
        <span class="md-helper-text">Maxium - 500 symbols</span>
        <span class="md-error">Limit of symbols is 500.</span>
      </md-field>
      </div>
      <md-dialog-actions>
        <button class="md-primary" @click="$emit('close')">Close</button>
        <button @click="submitCreating" class="md-raised md-primary">Create</button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: 'CreateTodo',
  data () {
    return {
      newTodo: {
        title: '',
        description: ''
      }
    }
  },
  props: {
    showModal: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    submitCreating() {
      this.$emit('create', { completed: false, ...this.newTodo })
      this.resetValues()
    },
    resetValues() {
      this.newTodo = {
        title: '',
        description: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.md-dialog-container {
  max-width: 768px;
  padding: 25px
}
.md-dialog .md-dialog-container {
  max-width: 768px;
}
.create-todo {
  padding: 25px;
  width: 700px;
}
</style>

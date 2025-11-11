<template>
  <div>
    <md-dialog :md-active.sync="showModal" md-fullscreen>
      <md-dialog-title>Edit todo</md-dialog-title>
      <div class="create-todo">
        <md-field>
        <label>Title of Todo</label>
        <md-input v-model="todo.title" required></md-input>
        <span class="md-error">This is required</span>
      </md-field>

      <md-field>
        <label>Description of Todo</label>
        <md-textarea v-model="todo.description" maxlength="500"></md-textarea>
        <span class="md-helper-text">Maxium - 500 symbols</span>
        <span class="md-error">Limit of symbols is 500.</span>
      </md-field>
      </div>
      <md-dialog-actions>
        <button class="md-primary" @click="$emit('close')">Close</button>
        <button @click="submitEditing" class="md-raised md-primary">Edit</button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: 'CreateTodo',
  data () {
    return {
      todo: {
        title: '',
        description: ''
      }
    }
  },
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    currentTodo: {
      type: Object,
      required: true
    }
  },
  methods: {
    submitEditing() {
      this.$emit('edit', { ...this.todo })
    }
  },
  watch: {
    showModal(value) {
      if(value) {
        this.todo = { ...this.currentTodo}
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

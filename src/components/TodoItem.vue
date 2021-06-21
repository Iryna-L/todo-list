<template>
  <div>
    <div class="todo">
     
        <div class="flex">
          <div>
            <div class="md-title">TO DO: {{ todo.title }}</div>
            <div><pre>Description: {{ todo.description }}</pre></div>
          </div>
          <md-checkbox
              v-if="!todo.completed"
              v-model="completed"
              @change="completeTask"
              class="md-primary"
              >Mark as completed</md-checkbox>
              <span v-if="todo.completed" class="material-icons-outlined">
                done_outline
              </span>
          
            
        </div>

        <div class="flex">
          
        <md-button class="md-primary" @click="toggleCanvas">
            
            <span  class="material-icons">
              format_paint
            </span>
        </md-button>
         
          <div>
            <md-button @click="handleDeleteTodo" class="md-accent">
              <span class="material-icons-outlined"> delete </span>
            </md-button>

            <md-button @click="$emit('edit', todo)" class="md-primary">
              <span class="material-icons-outlined"> edit_note </span></md-button>
          </div>
          
        </div>
        
      <div>
        <canv-el v-if="showCanvas" :todo="todo" @changePicture="changePicture" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import canvEl from "./CanvasElement.vue";

export default {
  name: "TodoItem",
  data() {
    return {
      showCanvas: false,
      completed: false,
    };
  },
  components: {
    canvEl,
  },
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.completed = this.todo.completed;
  },
 
  methods: {
    ...mapActions("listTodos", ["completeTodo", "deleteTodo", "savePictureInTodo"]),

    handleDeleteTodo() {
      this.$emit("deleted");
      this.deleteTodo(this.todo.index);
    },
    toggleCanvas() {
      this.showCanvas = !this.showCanvas;
    },
    completeTask() {
      this.completeTodo(this.todo.index);
    },
    changePicture(val) {
      this.savePictureInTodo({picture: val.pic, index: this.todo.index})
      
      if (val.type === "save") {
        this.$emit('savedPic')
      } else {
        this.$emit("deletedPic")
      }
      
    }
  },
};
</script>

<style lang="scss" scoped>
.todo {
  margin-bottom: 20px;
  padding: 25px;
  max-width: 740px;
  margin: 0 auto;
  box-shadow: 0 1px 4px rgb(0 0 0 / 15%);
  transition: box-shadow .2s;
  border: .1rem solid transparent;
  text-align: left;
  &:hover {
    box-shadow: 0 10px 20px rgb(0 0 0 / 10%);
  }
}
.canvas-wrapper {
  border: 1px solid grey;
  width: 100%;
  min-height: 500px;
  height: 100%;
  @media (max-width: 740px) {
    min-height: 300px;
  }
  @media (min-width: 740px) and (max-width: 1024px) {
    min-height: 400px;
  }
}
.flex {
  display: flex;
  align-items: top;
  justify-content: space-between;
}
</style>

<template>
  <div>
    <md-card class="todo">
      <md-card-header>
        <div class="md-title">TO DO: {{ todo.title }}</div>
      </md-card-header>
      <md-content id="a">
        <md-toolbar md-elevation="0" class="flex">
          <div class="flex">
            <input type="color" v-model="color" />
            <md-button
              class="md-primary"
              :class="{ 'md-raised': pencilActivated }"
              @click="togglePencilActivated"
              >pencil</md-button
            >
            <md-button
              class="md-primary"
              :class="{ 'md-raised': drawRectActivated }"
              @click="toggleDrawRect"
              >Draw Rectangle</md-button
            >
          </div>

          <div>
            <md-button @click="savePicture" class="md-raised md-primary"
              >Save picture</md-button
            >
            <md-button @click="clearPicture" class="md-raised md-accent"
              >Clear Picture</md-button
            >
          </div>
        </md-toolbar>
        <canvas
          @mouseup="savePictureForResizing"
          class="canvas-wrapper"
          :id="`canvas${todo.id}`"
        ></canvas>
      </md-content>
    </md-card>
    <md-dialog-alert :md-active.sync="saved" md-title="Picture is saved!" />
    <md-dialog-alert :md-active.sync="deleted" md-title="Picture is deleted!" />
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  data() {
    return {
      vueCanvas: null,
      deleted: false,
      saved: false,
      draw: false,
      pencilActivated: false,
      drawRectActivated: false,
      color: "#000000",
      lastPicture: "",
      currentImg: null,
      canvEl: null,
    };
  },
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.initCanvas();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  watch: {
    color: {
      handler(value) {
        this.vueCanvas.fillStyle = value;
      },
    },
  },

  methods: {
    initCanvas() {
      // get saved picture, painted before and saved in local storage
      this.lastPicture = localStorage.getItem(`canvas${this.todo.id}`);

      this.canvEl = document.getElementById(`canvas${this.todo.id}`);
      let ctx = this.canvEl.getContext("2d");
      this.vueCanvas = ctx;

      this.vueCanvas.canvas.width = this.canvEl.clientWidth;
      this.vueCanvas.canvas.height = this.canvEl.clientHeight;

      window.addEventListener("resize", this.handleResize);

      if (this.lastPicture) {
        let img = new Image();
        img.src = this.lastPicture;
        img.onload = () => {
          this.vueCanvas.drawImage(img, 0, 0);
        };
      }
    },
    handleResize() {
      let img = new Image();
      img.src = this.currentImg;

      this.vueCanvas.canvas.width = this.canvEl.clientWidth;
      this.vueCanvas.canvas.height = this.canvEl.clientHeight;
      this.vueCanvas.drawImage(img, 0, 0);
    },
    savePicture() {
      localStorage.setItem(
        `canvas${this.todo.id}`,
        this.canvEl.toDataURL("image/png")
      );
      this.saved = true;
    },
    savePictureForResizing() {
      this.currentImg = this.canvEl.toDataURL("image/png");
    },
    togglePencilActivated() {
      this.pencilActivated = !this.pencilActivated;
      this.drawRectActivated = false;
      this.canvEl.onmousedown = () => {
        this.draw = true;
      };
      this.canvEl.onmouseup = () => {
        this.draw = false;
      };
      this.canvEl.onmousemove = (event) => {
        this.drawByPencil(event);
      };
    },
    drawByPencil(event) {
      if (!this.draw || !this.pencilActivated) {
        return;
      }
      this.vueCanvas.fillStyle = this.color;
      let x = event.offsetX;
      let y = event.offsetY;
      this.vueCanvas.fillRect(x - 2, y - 2, 10, 10);
    },
    toggleDrawRect() {
      this.drawRectActivated = !this.drawRectActivated;
      this.pencilActivated = false;

      if (this.drawRectActivated) {
        this.drawRect();
      }
    },
    drawRect() {
      this.vueCanvas.fillStyle = this.color;
      this.vueCanvas.lineWidth = 5;
      let startX = 0;
      let startY = 0;
      this.canvEl.onmousedown = (event) => {
        this.draw = true;
        startX = event.offsetX;
        startY = event.offsetY;
      };

      this.canvEl.onmousemove = (event) => {
        if (!this.draw) return;

        let currentX = Math.min(event.offsetX, startX),
          currentY = Math.min(event.offsetY, startY),
          width = Math.abs(event.offsetX - startX),
          height = Math.abs(event.offsetY - startY);
        this.vueCanvas.fillRect(currentX, currentY, width, height);
      };

      this.canvEl.onmouseup = () => {
        this.draw = false;
        this.vueCanvas.save();
      };
    },
    clearPicture() {
      this.vueCanvas.clearRect(0, 0, this.canvEl.width, this.canvEl.height);
      this.savePictureForResizing();
      localStorage.removeItem(`canvas${this.todo.id}`);
      this.deleted = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.todo {
  margin-bottom: 20px;
  padding: 25px;
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
  align-items: center;
  justify-content: space-between;
}
</style>

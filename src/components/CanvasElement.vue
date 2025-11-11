<template>
  <div>
    <div id="a">
      <md-toolbar md-elevation="0" class="flex">
        <div class="flex">
          <input type="color" v-model="color" />
          <button
            class="md-primary"
            :class="{ 'md-raised': pencilActivated }"
            @click="togglePencilActivated"
            >pencil</button
          >
          <button
            class="md-primary"
            :class="{ 'md-raised': drawRectActivated }"
            @click="toggleDrawRect"
            >Draw Rectangle</button
          >
        </div>

        <div>
          <button @click="savePicture" class="md-raised md-primary"
            >Save picture</button
          >
          <button @click="clearPicture" class="md-raised md-accent"
            >Clear Picture</button
          >
        </div>
      </md-toolbar>
      <canvas
        @mouseup="savePictureForResizing"
        class="canvas-wrapper"
        :id="`canvas${todo.index}`"
      ></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: "CanvasElement",
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
      this.lastPicture = this.todo.picture;

      this.canvEl = document.getElementById(`canvas${this.todo.index}`);
      let ctx = this.canvEl.getContext("2d");
      this.vueCanvas = ctx;
      this.savePictureForResizing()
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
      this.$emit("changePicture", { pic: this.canvEl.toDataURL("image/png"), type: "save"})
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
      this.$emit("changePicture", { pic: this.canvEl.toDataURL("image/png"), type: "remove"})
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
  border: 1px solid #e7e7e7;
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

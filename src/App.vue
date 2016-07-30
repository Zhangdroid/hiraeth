<template>
  <div id="app">
    <div class="toolbar">
      <span class="icon camera--icon" @click="changeCamera"></span>
    </div>
    <video :src="videoSrc" autoplay class="video" v-el:video></video>
    <div class="toolbox__bottom" v-el:toolbox :class="{'toolbox__bottom--preview': state === 'preview'}">
      <button v-show="state === 'shoot'" class="shoot--button" @click="shoot"></button>
    </div>
    <image class="thumbnail" :src="imageSrc" :class="{'preview': state === 'preview'}" v-el:thumbnail @click="preview"></image>
    <div v-show="state === 'preview'">
      <span v-show="files.length" class="icon delete--icon" @click="delete"></span>
      <span class="icon close--icon" @click="close"></span>
      <span v-show="current !== files.length - 1"class="icon next--icon" @click="next"></span>
      <span v-show="current !== 0"class="icon prev--icon" @click="prev"></span>
    </div>
  </div>
</template>

<script lang="babel">
import { getCameraVideoSrc } from './services/camera'
import { saveFile, getFile, deleteFile, getAllFiles } from './services/file'
export default {
  async ready () {
    this.videoSrc = await getCameraVideoSrc()
    this.files = await getAllFiles()
  },
  data () {
    return {
      state: 'shoot',
      front: false,
      videoSrc: '',
      files: [],
      current: 0
    }
  },
  methods: {
    shoot () {
      const canvas = document.createElement('canvas')
      canvas.width = this.$els.video.videoWidth
      canvas.height = this.$els.video.videoHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(this.$els.video, 0, 0)
      canvas.toBlob(blob => {
        saveFile(blob).then(path => {
          this.files.unshift({
            fullPath: path
          })
          this.current = 0
        }).catch(err => {
          console.log(err)
        })
      }, 'image/jpeg')
    },
    async preview () {
      this.state = 'preview'
      this.files = await getAllFiles()
    },
    next () {
      if (this.files[this.current].fullPath) {
        this.current = this.current < this.files.length - 1 ? this.current + 1 : 0
      }
    },
    prev () {
      if (this.files[this.current].fullPath) {
        this.current = this.current >= 1 ? this.current - 1 : this.files.length - 1
      }
    },
    async delete () {
      console.log(this.files, this.current)
      if (this.files[this.current].fullPath) {
        await deleteFile(this.files[this.current].fullPath)
        this.files.$remove(this.files[this.current])
      }
    },
    close () {
      this.state = 'shoot'
    },
    async changeCamera () {
      this.front = !this.front
      this.videoSrc = await getCameraVideoSrc({ front: this.front })
    }
  },
  asyncComputed: {
    async imageSrc () {
      if (this.files.length) {
        return await getFile(this.files[this.current].fullPath)
      }
    }
  }
}
</script>

<style>
body {
  margin: 0;
  width: 100%;
  height: 100%;
}
.video {
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100vh;
  object-fit: cover;
}
.toolbox__bottom {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  width: 100%;
  height: 16vh;
  background-color: rgba(255, 255, 255, .6);
  backdrop-filter: blur(25px);
  transition: height .3s ease;
}
.toolbox__bottom--preview {
  height: 100%;
}
.shoot--button {
  width: 8vh;
  height: 8vh;
  background-color: rgba(255, 0, 0, .6);
  border: none;
  border-radius: 50%;
  outline: none;
}
.toolbar {
  position: fixed;
  top: 0;
  padding: 20px;
}
.icon {
  display: inline-block;
  width: 8vw;
  height: 8vw;
  background-size: cover;
  background-position: center;
  opacity: .8;
}
.camera--icon {
  background-image: url("./assets/icons/change_camera.svg");
}
.delete--icon {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 5vh;
  background-image: url("./assets/icons/remove.svg");
}
.close--icon {
  position: fixed;
  top: 5vw;
  left: 5vw;
  background-image: url("./assets/icons/close.svg");
}
.next--icon, .prev--icon {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
}
.next--icon {
  left: 3vw;
  background-image: url("./assets/icons/arrows_right.svg");
}
.prev--icon {
  right: 3vw;
  background-image: url("./assets/icons/arrows_left.svg");
}
.thumbnail {
  position: fixed;
  left: 5vw;
  bottom: 8vw;
  width: 10vw;
  transition: all .3s ease;
}
.preview {
  left: 20vw;
  width: 60vw;
  bottom: 20vh;
}
</style>

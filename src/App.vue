<template>
  <div id="app">
    <video :src="videoSrc" autoplay class="video" v-el:video></video>
    <div class="toolbox__bottom">
      <button class="shoot--button" @click="shoot"></button>
    </div>
  </div>
</template>

<script lang="babel">
import { getCameraVideoSrc } from './services/camera'
import { saveFile, getFile, getAllFiles } from './services/file'
export default {
  async ready () {
    this.videoSrc = await getCameraVideoSrc()
  },
  data () {
    return {
      videoSrc: ''
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
        saveFile(blob).then(e => {
          console.log(e)
        }).catch(err => {
          console.log(err)
        })
      }, 'image/jpeg')
    },
    getAllImages () {
      getAllFiles().then(files => {
        files.forEach(file => {
          getFile(file.fullPath).then(result => {
            console.log(result)
          }).catch(err => {
            console.log(err)
          })
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  components: {
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
  bottom: 0;
  width: 100%;
  height: 16vh;
  background-color: rgba(255, 255, 255, .6);
  backdrop-filter: blur(25px);
}
.shoot--button {
  position: fixed;
  bottom: 25px;
  left: 50%;
  z-index: 9999;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  background-color: rgba(255, 0, 0, .6);
  border: none;
  border-radius: 50%;
  outline: none;
}
</style>

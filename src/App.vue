<template>
  <div id="app">
    <video :src="videoSrc" autoplay class="video" v-el:video></video>
  </div>
</template>

<script>
export default {
  async ready () {
    await this.getCameraIDs()
    this.getVideo()
  },
  data () {
    return {
      cameraIds: [],
      currentCamera: 1,
      videoSrc: ''
    }
  },
  methods: {
    getCameraIDs () {
      MediaStreamTrack.getSources((sources) => {
        sources.forEach(source => {
          console.log(source)
          if (source.kind === 'video') {
            this.cameraIds.push(source.id)
          }
        })
      })
    },
    getVideo () {
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
      navigator.getUserMedia({
        video: {
          optional: [{sourceId: this.cameraIds[this.currentCamera]}]
        }
      }, localMediaStream => {
        this.videoSrc = window.URL.createObjectURL(localMediaStream)
      }, err => {
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
</style>

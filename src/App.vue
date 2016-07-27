<template>
  <div id="app">
    <video :src="videoSrc" autoplay class="video" v-el:video></video>
  </div>
</template>

<script lang="babel">
import { getCameraVideoSrc } from './services/camera'
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

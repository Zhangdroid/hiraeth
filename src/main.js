import 'webrtc-adapter'
import AsyncComputed from 'vue-async-computed'
import Vue from 'vue'
import App from './App'

Vue.use(AsyncComputed)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})

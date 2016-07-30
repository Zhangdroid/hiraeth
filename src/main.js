import 'webrtc-adapter'
import AsyncComputed from 'vue-async-computed'
import Vue from 'vue'
import App from './App'

Vue.use(AsyncComputed)

/* eslint-disable no-new */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./sw.js')
    .then(function () { console.log('Service Worker Registered') })
}

new Vue({
  el: 'body',
  components: { App }
})

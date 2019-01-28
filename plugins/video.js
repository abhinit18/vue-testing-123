require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

import Vue from 'vue'
const VueVideoPlayer = require('vue-video-player/ssr')
const VueVideoPlayerHls = require('videojs-contrib-hls/dist/videojs-contrib-hls.js')
Vue.use(VueVideoPlayer)

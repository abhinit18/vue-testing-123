<template>
  <div class="sharedCon postItem" v-if="content && content.body && content.body.length>0" @click="goToContent">
    <div class="thumb">
      <img :src="content.body[0].thumbnail" class="tempContentSize">
      <span :class="getIcon()">
      </span>
    </div>
    <div class="shareInfo">
        <h4>{{content.body[0].title}}</h4>
        <div class="info">{{content.body[0].description}}</div> 
    </div>
  </div>
  </template>

  <script>
  export default {
    props: ['content'],
    mounted() {
    },
    methods: {
      getIcon() {
        let type = this.content.type
                if (type === 'ARTICLE') {
                    return 'articleicon'
                } else if (type === 'EPUB') {
                    return 'texticon'
                } else {
                    return 'audioicon'
                }
            },
      goToContent () {
        this.$router.push(this.$store.getters['locale/getFinalUrl'](`/contentView/${this.content.contentId}`))
      }
    }
  }
  </script>

  <style>
    .tempContentSize {
      height: 20px;
      width: 20px;
    }
  </style>
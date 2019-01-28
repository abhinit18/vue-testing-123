<template>
  <div @contextmenu.prevent="()=>{return false}" class="WrapperSubscribe" :class="$store.getters['locale/getLangClass']()">
    <div class="loader" v-if="loading"></div>
    <nuxt/>

 </div>
</template>

<script>
import { eventHub } from '~/plugins/eventhub'
export default {
  data () {
    return {
      loading : false
    }
  },
  beforeDestroy () {
            eventHub.$off('before-request')
            eventHub.$off('after-response')
            eventHub.$off('response-error')
            eventHub.$off('response-error-logging')
        },
  mounted () {
    this.$i18n.locale = this.$store.state.locale.selectedLocale
    eventHub.$on('after-response', () => {
      this.loading = false
    });
    eventHub.$on('response-error', () => {
      this.loading = false
    });
    eventHub.$on('before-request', () => {
      this.loading = true
    });
    eventHub.$on('response-error-logging', (error) => {
      if(error.response.data && error.response.data.message) {
        this.$toast.error(error.response.data.message)
      } else {
        this.$toast.error(error.response.data.code)
      }
    });
  }
}
</script>

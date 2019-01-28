<template>
  <div @contextmenu.prevent="()=>{return false}" v-bind:class="[$store.getters['locale/getLangClass'](), {primaryClassBody: $store.getters['checkPrimaryType'](),homePage:$store.getters['checkPrimaryType']()}]">
    <app-header/>
    <div class="loader" v-if="loading"></div>
      <div class="content-wrapper">
      <div class="contentwrapperInner">
        <nuxt/>
      </div>
    </div>
    <app-footer/>
  </div>
</template>
<script>
import Header from '~/components/header'
import Footer from '~/components/footer'
import { eventHub } from '~/plugins/eventhub'
export default {
  data() {
    return{
      congo: false,
      loading: false
    }
  },
  beforeDestroy: function () {
        eventHub.$off('before-request')
        eventHub.$off('after-response')
        eventHub.$off('response-error')
        eventHub.$off('response-error-logging')
  },
  mounted() {
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
      if (this.$store.getters['auth/isLoggedIn']()) {
          this.$store.dispatch('locale/start', {
          context: this
        })
      }
      let vm = this
      if (this.$store.getters['auth/isLoggedIn']()) {
        window.onclick = function(event) {
          vm.$store.dispatch('locale/resetSessionTimeoutTime')
        }
      }
  },
  components: {
    'app-header': Header,
    'app-footer': Footer
  }
}
</script>

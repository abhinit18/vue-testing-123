<template>
  <div @contextmenu.prevent="()=>{return false}" :class="$store.getters['locale/getLangClass']()">
    <app-header/>
    <div class="loader" v-if="loading"></div>
      <div class="content-wrapper">
      <div class="contentwrapperInner">
        <nuxt/>
      </div>
    </div>
    <app-footer/>
    <!--script src="//localhost:8290/divolte.js" defer async></script-->
  </div>
</template>
<script>
import beforeLoginHeader from '~/components/beforeloginheader'
import Footer from '~/components/footer'
import { eventHub } from '~/plugins/eventhub'
export default {
  components: {
    'app-header': beforeLoginHeader,
    'app-footer': Footer
  },
  data () {
    return {
      loading: false
    }
  },
  beforeDestroy: function () {
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

      if(error.response.data.code == 'INVALID_SESSION'){
      let selectedLocale = this.$store.state.locale.selectedLocale;
      this.$store.dispatch('auth/logout', {
        deviceId: 'WEB',
        userId: this.$store.state.auth.userId,
        context: this,
        langCode: this.$store.state.locale.selectedLocale
      }).then((response) => {
        window.location = `/${selectedLocale}/login`;
      })
      }


    });
  }
}
</script>

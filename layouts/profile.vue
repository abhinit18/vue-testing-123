<template>
  <div @contextmenu.prevent="()=>{return false}" v-bind:class="[$store.getters['locale/getLangClass'](), {primaryClassBody: $store.getters['checkPrimaryType']()}]">
    <app-header/>
    <div class="loader" v-if="loading"></div>
       <nuxt/>
    <app-footer/>
  </div>
</template>
<script>
import sidebarProfile from '~/components/sidebarProfile'
import Header from '~/components/header'
import Footer from '~/components/footer'
import { eventHub } from '~/plugins/eventhub'
export default {
  beforeDestroy () {
            this.$root.$off('openAddPopupEmit')
            this.$root.$off('closeAddPopupEmit')
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

    this.$root.$on('openAddPopupEmit', ({note}) => {
      if(this.openAddPopup === true) {
      this.$toast.error('Existing Popup is already opened, please close it first to perform further action.')
      }else {
        this.openAddPopup = true
        this.note = note
      }
    }),
    this.$root.$on('closeAddPopupEmit', ({note}) => {
      this.openAddPopup = false
    })
    //this.$store.dispatch('study/getBookmarkedContent', {authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale})
  },
  components: {
    'app-header': Header,
    'app-footer': Footer,
    sidebarProfile
  },
  data () {
    return {
      openAddPopup: false,
      note: undefined,
      loading: false
    }
  }
}
</script>

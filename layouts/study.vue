<template>
  <div @contextmenu.prevent="()=>{return false}" v-bind:class="[$store.getters['locale/getLangClass'](), {primaryClassBody: $store.getters['checkPrimaryType']()}]">
    <app-header/>
    <div class="loader" v-if="loading"></div>
      <div class="content-wrapper">
      <div class="contentwrapperInner">
      <div class="bodyCon clearfix">
         <section class="container">
            <div class="pagebox clearfix">
               <div class="pageboxOver"></div>
               <sidebarUserStudy></sidebarUserStudy>
                 <div class="contentSec">
                    <div class="scrollSec" >

                     <nuxt/>
                    </div>
                   <addNotePopup v-if="openAddPopup" :note="note"></addNotePopup>
               </div>
               </div>
          </section>
               </div>
      </div>
    </div>
    <app-footer/>
  </div>
</template>
<script>
import sidebarUserStudy from '~/components/sidebarUserStudy'
import Header from '~/components/header'
import Footer from '~/components/footer'
import addNotePopup from '~/components/noteComponents/addNotePopUp'
import { eventHub } from '~/plugins/eventhub'
export default {
  beforeDestroy () {
            eventHub.$off('before-request')
            eventHub.$off('after-response')
            eventHub.$off('response-error')
            eventHub.$off('response-error-logging')
            this.$root.$off('openAddPopupEmit')
            this.$root.$off('closeAddPopupEmit')
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
    sidebarUserStudy,addNotePopup
  },
  data () {
    return {
      openAddPopup: false,
      note: undefined,
      loading: false,
      subtitle: this.$t('study.my_subjects')
    }
  }
}
</script>
<style>
.pos-rel{position:relative;}.full-width{float: left;width:100%;}

</style>

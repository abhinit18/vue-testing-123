<template>
  <div @contextmenu.prevent="()=>{return false}" :class="$store.getters['locale/getLangClass']()">
    <!-- <app-header/> -->
    <br>
    <div class="loader" v-if="loading"></div>
      <div class="content-wrapper">
      <div class="contentwrapperInner">
      <div class="bodyCon clearfix">
         <section class="container">
            <div class="pagebox clearfix">
               <div class="pageboxOver"></div>
               <sidebarRegister></sidebarRegister>
                 <div class="contentSec">
                    <div class="scrollSec">
                     <nuxt/>


               </div>



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
import sidebarRegister from '~/components/sidebarregister'
import Header from '~/components/header'
import Footer from '~/components/footer'
import { eventHub } from '~/plugins/eventhub'
export default {
  data () {
    return {
      loading: false
    }
  },
  components: {
    'app-header': Header,
    'app-footer': Footer,
    sidebarRegister
  },
  beforeDestroy () {
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
    this.$store.dispatch('register/fetchCountries', {langCode: this.$store.state.locale.selectedLocale})
    this.$store.dispatch('register/fetchGrades', {langCode: this.$store.state.locale.selectedLocale})
  }
}
</script>

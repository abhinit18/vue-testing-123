<template>
  <div @contextmenu.prevent="()=>{return false}" :class="$store.getters['locale/getLangClass']()">
  <div class="loader" v-if="loading"></div>
    <nuxt/>
    <app-header/>
      <div class="content-wrapper">
      <div class="contentwrapperInner">
      <div class="bodyCon clearfix">
         <section class="container">
            <div class="pagebox clearfix">
               <div class="pageboxOver"></div>
               <sidebarUserStudy></sidebarUserStudy>
                 <div class="contentSec">
                    <div class="scrollSec">


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
import sidebarUserStudy from '~/components/sidebarUserStudy'
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
    sidebarUserStudy
  },
  head: {
    bodyAttrs: {
      class: 'modal-open'
    }
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
  },
  beforeDestroy: function () {
        eventHub.$off('before-request')
        eventHub.$off('after-response')
        eventHub.$off('response-error')
        eventHub.$off('response-error-logging')
  },
}
</script>
<style>
.pos-rel{position:relative;}.full-width{float: left;width:100%;}
@keyframes popUpScale {
  0% {
   opacity: 0;
   top: 20vh;
  }

  100% {
    opacity: 1;
    top: 20px
  }
}

.studyPopUpPage{
  /*animation: popUpScale 0.5s;*/
}

.studyPopUpPageOuter{ position: fixed; overflow: auto; width: 100%; height: 100vh; z-index: 999; background: #fff}
 .studyPopUpPageOuter .studyPopUpPage{ margin: 0; position: absolute; margin-bottom: 0;

    left: 0;
    right: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
    top: 0!important;
    border-radius: 0;

  }


</style>

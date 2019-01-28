<template>
  <div @contextmenu.prevent="()=>{return false}" class="container errorpage" :class="$store.getters['locale/getLangClass']()">
    <div class="placeholderSec">
      <div class="placeHoldConMid zoomIn">
          <div class="placeHolderImg">
            <img src="~assets/images/placeholder/plcHold_error.png">
          </div>
          <h2  class="placeholderHeading">Error</h2>
          <p v-if="error.statusCode === 404" class="placeHoldTxt">Page not found</p>
          <p v-else class="placeHoldTxt">Something went wrong.</p>
      </div>
    </div>
    <nuxt-link to="/" class="btn btn-primary">Go Back</nuxt-link>
    <!-- <div class="loadersss"> </div> -->
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'blog', // you can set a custom layout for the error page,
  mounted () {
    this.$i18n.locale = this.$store.state.locale.selectedLocale
    if (this.$store.getters['auth/isLoggedIn']()) {
          this.$store.dispatch('locale/start', {
          context: this
        })
      }
      let vm = this
      if ( this.$store.getters['auth/isLoggedIn']()) {
        window.onclick = function(event) {
          vm.$store.dispatch('locale/resetSessionTimeoutTime')
        }
      }
  }
}
</script>

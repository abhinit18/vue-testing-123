<template>
  <div @contextmenu.prevent="()=>{return false}" :class="$store.getters['locale/getLangClass']()">
     <nuxt/>
  </div>
</template>
<script>
export default {
  head () {
    return {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
      ]
    }
  },
  mounted () {
    this.$i18n.locale = this.$store.state.locale.selectedLocale
  }
}
</script>

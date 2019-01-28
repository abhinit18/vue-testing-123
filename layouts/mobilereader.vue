<template>
  <div @contextmenu.prevent="()=>{return false}">
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
  }
}
</script>

<style>
body {
    min-width: 100px;
}
</style>

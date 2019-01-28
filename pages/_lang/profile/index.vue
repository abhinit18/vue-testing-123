<template>
</template>
<script>
export default {
middleware: 'authenticated',
mounted() {
    this.$router.push(this.$store.getters['locale/getFinalUrl'](`/profile/`+this.$store.getters['getUserId']()))
}
}
</script>

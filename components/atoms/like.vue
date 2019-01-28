<template>
    <button class="btn btn-link btnLike" v-bind:class="{active: content.liked}" @click="toggleLiked">
                  <i class="ricons rlikeIcons"></i>
             </button>
</template>

<script>
export default {
    props: ['content', 'subTopicId'],
    methods: {
        toggleLiked(e) {
        e.preventDefault();

        let contentType = this.content.type;
        let contentId = this.content.contentId;
        let like = this.content.liked
  
        this.$store.dispatch('content/toggleContentLiked', {
          authToken: this.$store.state.auth.user.token,
          contentType,
          langCode: this.$store.state.locale.selectedLocale,
          contentId,
          subTopicId: this.subTopicId,
          like,
          isIndependentContentView: false
        });
      },
    }
}
</script>
<template>
    <button class="btn btn-link btnBookmark" :class="{active: content.bookmarked}" @click="bookmarkContent(content.contentId, content.bookmarked)">

                      <i class="ricons bookmarkIcons" v-bind:class="{bookmarked:content.bookmarked}" ></i>

                </button>
</template>

<script>
export default {
  props: ["content", "subTopicId"],
  methods: {
    bookmarkContent(data, dataBookmarked) {
      let subTopicId = this.getSubTopicId()
      if (dataBookmarked) {
        this.$store
          .dispatch("content/deleteContentBookmarks", {
            authToken: this.$store.state.auth.user.token,
            subTopicId,
            langCode: this.$store.state.locale.selectedLocale,
            contentId: data,
            isIndependentContentView: false,
            type: this.content.type
          })
          .then(response => {
            // this.showDeleteBookmarkPopup = false;
            // this.$toast.success('Bookmark deleted succesfully');
          });
      } else {
        this.$store
          .dispatch("content/contentBookmarking", {
            authToken: this.$store.state.auth.user.token,
            subTopicId,
            contentId: data,
            type: this.content.type,
            langCode: this.$store.state.locale.selectedLocale,
            isIndependentContentView: false
          })
          .then(response => {});
      }
    },
    getSubTopicId() {
      let currentRoute = this.$router.currentRoute.fullPath;
      let currentRouteSplit = currentRoute.split("/");
      let subTopicRaw = currentRouteSplit[currentRouteSplit.length - 1];
      return subTopicRaw.split("-")[1];
    }
  }
};
</script>

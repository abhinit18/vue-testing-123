<template>
<div class="commentList">
  <commentRow :parentComment="parentComment" :type="type" :mypost="mypost" v-if="comments" v-for="comment in comments && comments.length>0?comments.concat().sort((a,b) => b.created - a.created): []" :comment="comment" :key="comment.commentId"/>
</div>
</template>
<script>
import commentRow from '~/components/view/post/commentRow'
export default {
  props: ['comments', 'mypost', 'type', 'parentComment'],
  components: {commentRow},
  name: 'commentlist'
}
</script>

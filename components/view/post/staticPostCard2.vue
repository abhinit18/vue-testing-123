<template>
<div>
 <div class="postItem firstCardsItem cardItem_2" :style="{backgroundColor: post.color}" @click="cardNavigation">
              <!-- <div class="bubble bubble_2">Want to be my <br> Contact?</div> -->
              <img class="img dog_1" :src="post.image">
              <div class="text">
                  <h3 class="findHeading"> {{post.title}}  </h3>
                  {{post.postData}}
            </div>
          </div>
  </div>
</template>
<script>
export default{
  methods: {
    cardNavigation() {
      this.$router.push(this.$store.getters['locale/getFinalUrl'](`/findBuddy`))
    }
  },
  props: ['post']
}
</script>

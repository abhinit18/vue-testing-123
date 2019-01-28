<template>
<div>
 <div class="postItem firstCardsItem cardItem_3" :style="{backgroundColor: post.color}" @click="cardNavigation">
      <!-- <div class="bubble bubble_3"><span class="iconCoins"></span>Coins</div> -->
      <img class="img dog_2" :src="post.image">
	      <div class="text">
	          <h3 class="findHeading">  {{post.title}} </h3>
            {{post.postData}}
	    </div>
  </div>
 </div>
</template>
<script>
export default{
  methods: {
    cardNavigation() {
      this.$router.push(this.$store.getters['locale/getFinalUrl'](`/refer`))
    }
  },
  props: ['post']
}
</script>

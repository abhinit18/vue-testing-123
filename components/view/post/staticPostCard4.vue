<template>
<div>


<div class="postItem firstCardsItem  cardItem_4" :style="{backgroundColor: post.color}" @click="cardNavigation">
       <img class="img dog_3" :src="post.image">
          <div class="text">
              <h3 class="findHeading"> {{post.title}} </h3>
          {{post.postData}}
        </div>
   </div>
 </div>
</template>
<script>
export default{
  methods: {
    cardNavigation() {
      this.$router.push(this.$store.getters['locale/getFinalUrl'](`/help`))
    }
  },
  props: ['post']
}
</script>

<template>
<div>
<div class="postItem firstCardsItem" :style="{backgroundColor: post.color}">

               <img class="img" :src="post.image">
              <div class="text">
              <h3 class="findHeading">{{post.title}} </h3>
              {{post.postData}}
              </div>
          </div>

</div>
</template>

<script>
    export default {
        props: ['post']
    }
</script>

<template>
  <div class="placeholderSec">
                  <div class="placeHoldConMid zoomIn">
                      <div class="placeHolderImg">
                        <img src="~assets/images/placeholder/plcHold_noUnfinishedItem.png">
                      </div>
                      <h2 class="placeholderHeading">{{$t('blankPlaceholder.unfinished')}}</h2>
                      <p class="placeHoldTxt">{{$t('blankPlaceholder.unfinishedtext')}} <a @click="exploreStudy">{{$t('blankPlaceholder.explore')}}</a></p>
                  </div>
              </div>
</template>

<script>
export default {
    methods : {
        exploreStudy() {
        this.$router.push(this.$store.getters['locale/getFinalUrl'](`/study`))
        }
    }
}
</script>
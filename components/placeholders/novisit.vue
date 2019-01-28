<template>
<div class="placeholderSec">
                  <div class="placeHoldConMid zoomIn">
                      <div class="placeHolderImg">
                        <img src="~assets/images/placeholder/plcHold_noRecentVisit.png">
                      </div>
                      <h2 class="placeholderHeading">{{$t('blankPlaceholder.visited')}}</h2>
                      <p class="placeHoldTxt">{{$t('blankPlaceholder.visitedText')}} <a @click="exploreStudy">{{$t('blankPlaceholder.findBuddyBtn')}}</a></p>

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

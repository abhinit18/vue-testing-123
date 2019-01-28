<template>
<div class="placeholderSec" >
  <!-- v-if="!this.$store.state.study.myBookmarks || this.$store.state.study.myBookmarks.length === 0" -->
    <div class="placeHoldConMid zoomIn">
        <div class="placeHolderImg">
          <img src="~assets/images/placeholder/plcHold_noBookmarks.png">
        </div>
        <h2 class="placeholderHeading">{{$t('blankPlaceholder.bookmarkHead')}}</h2>
        <p class="placeHoldTxt">{{$t('blankPlaceholder.bookmarkHeadText')}}</p>
    </div>
</div>
</template>

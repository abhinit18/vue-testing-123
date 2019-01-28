<template>
<div class="placeholderSec">
                        	<div class="placeHoldConMid zoomIn">
                        	    <div class="placeHolderImg">
                        	      <img src="~assets/images/placeholder/plcHold_no_new_request.png">
                        	      <!-- <img src="~assets/images/placeholder/Buddy_blocked_buddies.png"> -->
                        	    </div>
                        	    <h2 class="placeholderHeading">{{$store.getters['isTeacherOrParent']()? $t('blankPlaceholder.blockBuddy_teacher') : $t('blankPlaceholder.blockBuddy')}}</h2>
                        	    <!-- <p class="placeHoldTxt">{{$t('blankPlaceholder.searchThem')}}</p> -->
                        	</div>
</div>
</template>

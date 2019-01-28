<template>
<div class="placeholderSec">
                         <div class="placeHoldConMid zoomIn">
                             <div class="placeHolderImg">
                               <img src="~assets/images/placeholder/plcHold_no_new_request.png">
                             </div>
                             <h2 class="placeholderHeading">{{$t('blankPlaceholder.newRequest')}}</h2>
                             <p class="placeHoldTxt">{{$store.getters['isTeacherOrParent']()? $t('blankPlaceholder.newRequestText_teacher') : $t('blankPlaceholder.newRequestText')}} <a @click="findBuddy">{{$t('blankPlaceholder.findBuddyBtn')}}</a></p>
                         </div>
</div>
</template>

<script>
export default {
    props: ['findBuddy']
}
</script>
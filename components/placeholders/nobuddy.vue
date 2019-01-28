<template>
    <div class="placeholderSec">
        <div class="placeHoldConMid zoomIn">
            <div class="placeHolderImg">
                <img src="~assets/images/placeholder/plcHold_empty.png">
            </div>
            <h2 class="placeholderHeading">{{$store.getters['isTeacher']()? $t('blankPlaceholder.myBuddy_teacher') : $t('blankPlaceholder.myBuddy')}}</h2>
            <p v-if="!nolabel" class="placeHoldTxt">{{$t('blankPlaceholder.searchThem')}}</p>
        </div>
    </div>
</template>

<script> 
export default {
    props: ['nolabel']
}
</script>
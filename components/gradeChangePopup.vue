<template>
<div class="redeemBuySellFormSec renewMsgPopup">
    <!-- v-on-click-outside="closeExpiryPopup" -->
		       <div class="buySellFormBox" >
		          <a class="pclose pcloseTop closeBtn_noBg" @click="closeGradePopup"><span><i class="material-icons">&#xE5CD;</i></span>{{$t('settings.close')}}</a>
                  <p>{{$t('register.need_grade_change')}}</p>
                    <button class="btn btn-primary submitBtn" @click="goToGrade">{{$t('register.change_Grade')}}</button>
                  <!-- <div class="productInfoTop">
		             <img :src="gift.gift" class="productImg">
		          </div> -->
		          <!-- <p>{{gift.message}}</p> -->

		       </div>
		    </div>
</template>

<script>
 export default {
     props: [],
     methods: {
         closeGradePopup () {
             this.$root.$emit('closeGradeChangePopup', {})
         },
         goToGrade () {
             this.$root.$emit('closeGradeChangePopup', {})
             this.$router.push(this.$store.getters['locale/getFinalUrl']('/setting'))
         }
     },
 }
</script>

<style>
/*.redeemBuySellFormSec {
    position: fixed !important;
    z-index: 999999;
}*/
.redeemBuySellFormSec .buySellFormBox{ text-align: center;
    position: relative; min-height: 10px;  font-size: 16px;
}

</style>

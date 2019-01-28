<template>
<div class="redeemBuySellFormSec renewMsgPopup">
    <!-- v-on-click-outside="closeExpiryPopup" -->
		       <div class="buySellFormBox" >
		          <a class="pclose pcloseTop closeBtn_noBg" @click="closeExpiryPopup"><span><i class="material-icons">&#xE5CD;</i></span>{{$t('settings.close')}}</a>
                  <p v-if="$store.state.initialData.expiryDays === 0">{{$t('register.subscription_expires1_tomorrow')}} {{$t('common.today')}} {{$t('register.subscription_expires2_short')}}</p>
                  <p v-else-if="$store.state.initialData.expiryDays === 1">{{$t('register.subscription_expires1_tomorrow')}} {{$t('common.tomorrow')}} {{$t('register.subscription_expires2_short')}}</p>
                  <p v-else>{{$t('register.subscription_expires1')}} {{$store.state.initialData.expiryDays}} {{$t('register.subscription_expires2')}}</p>
                    <button class="btn btn-primary submitBtn" @click="goToSubscription">{{$t('common.upgrade')}}</button>
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
         closeExpiryPopup () {
             this.$root.$emit('closeExpiryPopup', {})
         },
         goToSubscription () {
             this.$root.$emit('closeExpiryPopup', {})
             this.$router.push(this.$store.getters['locale/getFinalUrl']('/mySubscription'))
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
<template>
<div class="redeemBuySellFormSec">
		       <div class="buySellFormBox" v-on-click-outside="closeGiftPopup">
		          <a class="pclose pcloseTop" @click="closeGiftPopup"><span><i class="material-icons">&#xE5CD;</i></span>{{$t('settings.close')}}</a>
                  <p>{{gift.userName}} {{$t('redeem.has_send_gift')}}</p>
                  <div class="productInfoTop">
		             <img :src="gift.gift" class="productImg">
		          </div>
		          <p>{{gift.message}}</p>
		           
		       </div>
		    </div> 
</template>

<script>
 export default {
     props: ['giftNotification'],
     methods: {
         closeGiftPopup () {
             this.$root.$emit('hideGift', {})
         }
     },
     data () {
         return {
             gift: {}
         }
     },
     mounted () {
         let redemptionId = this.giftNotification.notificationData.giftId
         this.$store.dispatch('redemption/viewGift', {giftId: redemptionId, authToken:this.$store.state.auth.user.token,  langCode: this.$store.state.locale.selectedLocale}).then(response => {
                this.gift = response.data.gift
            })
     }
 }
</script>

<style>
.redeemBuySellFormSec {
    position: fixed !important;
    z-index: 999999;
}
.redeemBuySellFormSec .buySellFormBox{ text-align: center;
    position: relative; min-height: 10px;  font-size: 16px; 
}

</style>
<template>
	<div>
		 <div class="redeemPgSec">




		      <div class="redeemContainer">
			   <a class="pclose pcloseTop" @click="closePopup"><span><i class="material-icons">&#xE5CD;</i></span>{{$t('settings.close')}}</a>
			   <!-- <button class="btnBacktoPrePage"><i class="material-icons">&#xE314;</i></button> -->
			  
	                <div class="coinBalance">
	                	{{$t('redeem.balance')}}  <span class="coinsNum">{{$store.getters['getUserCoins']()}}</span><!-- <span class="iconCoins"></span> -->

					 <div class="coin pull-right">
						  <div class="tails"></div>
						  <div class="heads"></div>
						</div>


	                </div>
					<h4 class="smallHeading">{{$t('redeem.redeem_coins')}}</h4>
				   <div class="redeemCategory clearfix">
				      <ul class="redeemCatBox">
				        <li class="stickersBox" @click="goToDetail('STICKERS')">
				           <div class="boxCatImg">
				              <img src="~assets/images/StickerIcon.png">
				            </div>
				        	{{$t('redeem.stickers')}}
				        </li>
				        <li class="giftsBox" @click="goToDetail('GIFTS')">
				           <div class="boxCatImg">
				              <img src="~assets/images/GiftIcon.png">
				            </div>
				        	{{$t('redeem.gifts')}}
				        </li>
				        <li class="boostBox" @click="goToDetail('BOOSTERS')">
				            <div class="boxCatImg">
				               <img src="~assets/images/icon_2.png">
				            </div>
				        	{{$t('redeem.boostme')}}
				        </li>
				      </ul>
				   </div>
			   </div>

               
				
				<!-- redeem boost sec starts-->
				  <!-- <div class="redeemBoostSec">

				  </div> -->
				  
				<!-- redeem boost sec ends-->

 
				<!-- subscrption -->
				
 
		    </div>
         
		    <!-- <div class="redeemBuySellFormSec">
		       <div class="buySellFormBox">
		          <div class="productInfoTop">
		            <img src="~assets/images/gift_1.png" class="productImg">
		            <h4 class="productName">CAKE - 200 Coins</h4>
		          </div>
		          <p>Who do you want to send this gift ?</p>
		          <div class="formGroup">
		            <i class="material-icons formIcons">&#xE8B6;</i>
		            <div class="selectedInfo">
		                <a class="closeSelectedBtn"><i class="material-icons">&#xE5CD;</i></a>
		            	 <div class="leftImg">
                         	 <img src="~assets/images/img_filter.png">
                         </div>
                         <div class="listName">
                         	Makhametkali
                         </div>
		            </div>
		            <input type="text" class="formControl">
		            <ul class="dropShow">
                       <li>
                         <div class="leftImg">
                         	 <img src="~assets/images/img_filter.png">
                         </div>
                         <div class="listName">
                         	Makhametkali
                         </div>
                       </li>
                       <li>
                         <div class="leftImg">
                         	 <img src="~assets/images/img_filter.png">
                         </div>
                         <div class="listName">
                         	Merzhan Ashmeen
                         </div>
                       </li>
                       <li>
                         <div class="leftImg">
                         	 <img src="~assets/images/img_filter.png">
                         </div>
                         <div class="listName">
                         	Makhametkali
                         </div>
                       </li>
                       <li>
                         <div class="leftImg">
                         	 <img src="~assets/images/img_filter.png">
                         </div>
                         <div class="listName">
                         	Makhametkali
                         </div>
                       </li>
                       <li>
                         <div class="leftImg">
                         	 <img src="~assets/images/img_filter.png">
                         </div>
                         <div class="listName">
                         	Makhametkali
                         </div>
                       </li>
                       <li>
                         <div class="leftImg">
                         	 <img src="~assets/images/img_filter.png">
                         </div>
                         <div class="listName">
                         	Makhametkali
                         </div>
                       </li>
		            </ul>
		          </div>
		          <div class="formGroup">
		            <i class="material-icons formIcons">&#xE0BE;</i>
                    <textarea class="formControl"></textarea>
		          </div>
		          <button class="btn btn-primary btn-block sendBtn">Send</button>
		       </div>
		       <div class="buySellFormBox messageBox">
		          <div class="masCotImg">
		            <img src="~assets/images/icon_1.png">
		          </div>
		          <div class="sucessIcon"><i class="material-icons">&#xE5CA;</i></div>
		          <p class="sucessTxt">Your gift has been sent !</p>
		          <button class="btn btn-block sendBtn reverse">SEND MORE GIFTS </button>
		       </div>
		    </div> -->
 </div>
	
</template>

<script>
export default {
	head () {
			return {
			title: this.$t('redeem.redeem')
			}
		},
    middleware: 'authenticated',
		mounted () {
			this.$store.dispatch('header/navChange', {key: 1, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, context: this})
		},
    methods: {
        goToDetail (detailParam) {
            this.$router.push(this.$store.getters['locale/getFinalUrl'](`/redeem/${detailParam}`))
        },
        closePopup () {
            this.$router.push(this.$store.getters['locale/getFinalUrl'](`/`))
        }
    }
}
</script>

<style type="text/css">

</style>


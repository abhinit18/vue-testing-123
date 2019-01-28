<template>
    <div>
    <div class="redeemPgSec">
        <div class="redeemProdListing" v-if="getType && getType!=='BOOSTERS'">
                    <div class="redeemContainer">
                       <button class="btnBacktoPrePage" @click="goBack"><i class="material-icons">&#xE5CB;</i></button>
						<div class="buySellHeadingSec">
						    <h3 class="buySellHeading">{{$t('redeem.buy')}} {{getType==='STICKERS'? $t('redeem.stickers'): $t('redeem.gifts')}}</h3>
						    <div class="coinBalance">
			                	{{$t('redeem.balance')}} <span class="coinsNum">{{$store.getters['getUserCoins']()}}</span>

                                <div class="coin pull-right" v-if="!sendingGift">
                                  <div class="tails"></div>
                                  <div class="heads"></div>
                                </div>

			                </div>
                            <p v-if="getType==='GIFTS'">{{$store.getters['isTeacher']()? $t('teacher.send_gifts_to_friends') : $t('redeem.send_gifts_to_friends')}}</p>
                            <p v-else>&nbsp;</p>
		                </div>
						<div class="itemListsSec clearfix">
						   <ul class="itemLists" :class="{giftList : getType==='GIFTS'}">
						      <li v-for="redemption in redemptions" :key="redemption.redemptionId">
                                  <i class="material-icons purchegedIcon" v-if="redemption.used">&#xE86C;</i>
						        <div class="productImg">
						           <img :src="redemption.imageUrl">
						        </div>
                                <p class="productName" v-if="!redemption.isAlreadyBought">{{redemption.coins}} {{$t('scoreboard.coins')}}</p>
						        <div class="hoverContent" v-if="!redemption.isAlreadyBought">
						          <button class="btn planBuyBtn"  @click="getType==='STICKERS'? buy(redemption.redemptionId) : sendingGiftMethod(redemption)">{{$t('redeem.buy')}}</button>
						        </div>
						      </li>
						   </ul>
						</div>
					</div>
				</div>



                 <!-- <div class="redeemProdListing" >
				     <div class="redeemContainer">
				       <button class="btnBacktoPrePage" @click="goBack"><i class="material-icons">&#xE5CB;</i></button>
						<div class="buySellHeadingSec">
						    <h3 class="buySellHeading">Send Gifts</h3>
						    <div class="coinBalance">
			                	Balance <span class="coinsNum">4000</span><span class="iconCoins"></span>
			                </div>
			                <p>200 Coins Each | Send gifts to your buddies</p>
		                </div>
						<div class="itemListsSec clearfix">
						   <ul class="itemLists giftList">
						      <li>
						         <div class="productImg">
						           <img src="~assets/images/gift_1.png">
						          </div>
						           <p class="productName">Cake</p>
						        <div class="hoverContent">
						          <button class="btn planBuyBtn">Buy</button>
						        </div>
						      </li>
						      <li>
						         <div class="productImg">
						           <img src="~assets/images/gift_2.png">
						          </div>
						           <p class="productName">Flower pot</p>
						        <div class="hoverContent">
						          <button class="btn planBuyBtn">Buy</button>
						        </div>
						      </li>
						      <li>
						         <div class="productImg">
						           <img src="~assets/images/gift_1.png">
						          </div>
						           <p class="productName">Bouquet</p>
						        <div class="hoverContent">
						          <button class="btn planBuyBtn">Buy</button>
						        </div>
						      </li>
						      <li>
						         <div class="productImg">
						           <img src="~assets/images/gift_2.png">
						          </div>
						           <p class="productName">Balloon</p>
						        <div class="hoverContent">
						          <button class="btn planBuyBtn">Buy</button>
						        </div>
						      </li>
						   </ul>
						</div>
					</div>
				</div>   -->


                <div class="redeemProdDetailsSec" v-if="getType &&  getType==='BOOSTERS'">
				      <div class="redeemContainer">
				        <button class="btnBacktoPrePage" @click="goBack"><i class="material-icons">&#xE5CB;</i></button>
						<div class="buySellHeadingSec">
						    <div class="coinBalance">
			                	{{$t('redeem.balance')}} <span class="coinsNum">{{$store.getters['getUserCoins']()}}</span>

                                <div class="coin pull-right">
                                  <div class="tails"></div>
                                  <div class="heads"></div>
                                </div>
			                </div>
						    <h3 class="buySellHeading">{{$t('redeem.boosters')}} </h3>

		                </div>
		                <div class="redeemProdDetails clearfix">
		                   <div class="slectedItomSec">
		                       <ul class="slectedItomList">
		                         <li v-for="boost in boosters.filter(data => data.used)">
		                            <a class="closeSelectedBtn" @click="remove(boost.redemptionId)"><i class="material-icons">&#xE5CD;</i></a>
		                         	<div class="selectedproduct">
                                       <img :src="boost.imageUrl">
                                   </div>
		                         </li>
		                       </ul>

		                    </div>
                           <div class="redeemProdDetailsLeft">
                               <div class="imgMascot">
                                 <img :src="hover? previewUrl : mascotUrl">
                               </div>
                           </div>
                           <!-- <div class="redeemProdDetailsLeft">
                               <div class="bubbleThanks">Thank You</div>
                               <div class="imgMascot">
                                 <img src="~assets/images/icon_1.png">
                               </div>
                           </div> -->
                           <div class="redeemProdDetailsRight">
                              <ul class="boostTabs">
                              	<li @click="changeTab(tab.code)" :class="{active: tab.code===selectedBoostTab}" v-for="tab in boosterTabs">
                                    <span class="boostIcons" :class="tab.class"></span>{{$t(tab.name)}}
                                </li>
                              </ul>
                              <div class="boostTabContent">
	                              <ul class="boostTabContentList">
	                                 <li v-for="redemption in redemptions" @click="use(redemption.redemptionId, redemption.isAlreadyBought)" @mouseenter="mouseOver(redemption.redemptionId)" @mouseleave="mouseLeave">
                                         <div class="">
                                         <i class="material-icons purchegedIcon" v-if="redemption.used">&#xE86C;</i>
	                                 	<div class="productImg">
							               <img :src="redemption.imageUrl">
							             </div>
								           <p class="productName" v-if="!redemption.isAlreadyBought">{{redemption.coins}} {{$t('scoreboard.coins')}}</p>
								        <div class="hoverContent" v-if="!redemption.isAlreadyBought" @click="buy(redemption.redemptionId)">
								          <button class="btn planBuyBtn" >{{$t('redeem.buy')}}</button>
								        </div>
                                        </div>
	                                 </li>
	                              </ul>
                              </div>
                           </div>
				        </div>
				       </div>
		            </div>
    </div>

     <div class="redeemBuySellFormSec" v-if="sendingGift">
		       <div class="buySellFormBox" v-on-click-outside="closeGiftPopup" v-if="!giftSendSuccess">
		          <div class="productInfoTop">
		            <img :src="selectedGift.imageUrl" class="productImg">
		            <h4 class="productName">{{selectedGift.coins}} {{$t('scoreboard.coins')}}</h4>
		          </div>
		          <p>{{$t('redeem.whom_to_send')}}</p>
		          <div class="formGroup">
		            <i class="material-icons formIcons">&#xE8B6;</i>
		            <div class="selectedInfo" v-if="selectedBuddyForGift.firstName">
		                <a class="closeSelectedBtn" @click="clearSelectedBuddy"><i class="material-icons">&#xE5CD;</i></a>
		            	 <div class="leftImg">
                         	 <img v-if="selectedBuddyForGift.userPic" :src="selectedBuddyForGift.userPic">
                           <div v-else class="picPlaceHolder">{{selectedBuddyForGift.firstName.charAt(0)}}</div>
                         </div>
                         <div class="listName">
                         	{{selectedBuddyForGift.firstName}}
                         </div>
		            </div>
		            <input type="text" class="formControl" @input="getAutoCompleteBuddies" v-model="searchParameter">
		            <ul class="dropShow" v-if="autoCompleteBuddies.length>0">
                       <li v-for="autoComplete in autoCompleteBuddies" @click="selectBuddyForGift(autoComplete)">
                         <div class="leftImg">
                         	 <img v-if="autoComplete.userPic" :src="autoComplete.userPic">
                           <div v-else class="picPlaceHolder">{{autoComplete.firstName.charAt(0)}}</div>
                         </div>
                         <div class="listName">
                         	{{autoComplete.firstName}}
                         </div>
                       </li>
		            </ul>
		          </div>
		          <div class="formGroup">
		            <i class="material-icons formIcons">&#xE0BE;</i>
                    <textarea class="formControl" v-model="message"></textarea>
		          </div>
		          <button class="btn btn-primary btn-block sendBtn" @click="sendGift">{{$t('redeem.send')}}</button>
		       </div>
		       <div class="buySellFormBox messageBox" v-if="giftSendSuccess" v-on-click-outside="closeGiftPopup">
		          <div class="masCotImg">
		            <img :src="$store.getters['getUserMascot']()">
		          </div>
		          <div class="sucessIcon"><i class="material-icons">&#xE5CA;</i></div>
		          <p class="sucessTxt">{{$t('redeem.gift_send_successfully')}}</p>
		          <button class="btn btn-block sendBtn reverse" @click="closeGiftPopup">{{$t('redeem.send_more_gifts')}} </button>
		       </div>
		    </div>


    </div>
</template>
<script>
export default {
        middleware: 'authenticated',
        mounted () {
            this.$store.dispatch('header/navChange', {key: 1, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, context: this})
            this.fetchData()
            this.fetchBoosters ()
        },
    data () {
        return {
            sendingGift: false,
            selectedGift: {},
            autoCompleteBuddies: [],
            selectedBuddyForGift: {},
            searchParameter: '',
            message: '',
            giftSendSuccess: false,
            boosters: [],
            redemptions: [],
            hover: false,
            selectedBoostTab: 'SUNGLASSES', // SUNGLASSES, CAPS,  FOOD
            boosterTabs: [{
                name: 'redeem.sunglasses',
                code: 'SUNGLASSES',
                class: 'glassTab'
            },
            {
                name: 'redeem.caps',
                code: 'CAPS',
                class: 'capsTab'
            },
            {
                name: 'redeem.food',
                code: 'FOOD',
                class: 'foodTab'
            }],
            mascotUrl: this.$store.getters['getUserMascot'](),
            previewUrl: ''
        }
    },
    methods: {
        goBack () {
            this.$router.back()
        },
        fetchData () {
            let payload = {type: this.getType, authToken:this.$store.state.auth.user.token,  langCode: this.$store.state.locale.selectedLocale}
            if (this.getType==='BOOSTERS') {
                payload['subType']=this.selectedBoostTab
            }
            this.$store.dispatch('redemption/viewRedemptions', payload).then(response => {
                this.redemptions = response.data.redemptions
            })
        },
        fetchBoosters () {
            let payload = {type: this.getType, authToken:this.$store.state.auth.user.token,  langCode: this.$store.state.locale.selectedLocale}
            this.$store.dispatch('redemption/viewRedemptions', payload).then(response => {
                this.boosters = response.data.redemptions
            })
        },
        mouseOver (redemptionId) {
            if (this.selectedBoostTab !== 'FOOD') {
                let payload = {id: redemptionId, authToken:this.$store.state.auth.user.token,  langCode: this.$store.state.locale.selectedLocale}
                this.$store.dispatch('redemption/previewMascot', payload).then(response => {
                    this.previewUrl = response.data.imageUrl
                    this.hover = true
                })
            }
        },
        mouseLeave () {
            this.hover = false
        },
        changeTab (code) {
            this.selectedBoostTab = code
            this.fetchData()
        },
        buy (redemptionId, toAddress, message) {
            let payload = {id: redemptionId}
            if (this.getType==='GIFTS') {
                payload['to']=toAddress
                payload['message']=message
            }
            this.$store.dispatch('redemption/buy', {authToken:this.$store.state.auth.user.token,  langCode: this.$store.state.locale.selectedLocale, payload}).then(response => {
                if (response.data.status !== 'ERROR') {
                    //this.$toast.success(this.$t('redeem.successfully_redeemed'))
                    this.$store.dispatch('updateCoins', {coins: response.data.coins})
                    this.fetchData()
                } else {
                    this.$toast.error(response.data.message)
                }
            }, error => {
            })
        },
        sendGift () {
            if (this.validateBeforeGiftSending()) {
                let payload = {id: this.selectedGift.redemptionId}
                payload['to'] = this.selectedBuddyForGift.userId
                payload['message'] = this.message
            this.$store.dispatch('redemption/buy', {authToken:this.$store.state.auth.user.token,  langCode: this.$store.state.locale.selectedLocale, payload}).then(response => {
                if (response.data.status !== 'ERROR'){
                    //this.$toast.success(this.$t('redeem.gift_successfully_send'))
                    this.searchParameter = ''
                    this.selectedBuddyForGift = {}
                    this.$store.dispatch('updateCoins', {coins: response.data.coins})
                    this.giftSendSuccess = true
                } else {
                    this.$toast.error(response.data.message)
                }
            }, error => {
            })
            }
        },
        validateBeforeGiftSending () {
            if (!this.selectedBuddyForGift.userId) {
                this.$toast.show(this.$t(this.$store.getters['isTeacher']()? 'teacher.buddy_select_warning': 'redeem.buddy_select_warning'))
                return false
            }
            return true
        },
        sendingGiftMethod (gift) {
        this.$store.dispatch('search/buddiesAutoComplete', {q: ' ', page: 0, size: 5,authToken:this.$store.state.auth.user.token,  langCode: this.$store.state.locale.selectedLocale}).then(response => {
            //this.autoCompleteBuddies = response.data.connections? response.data.connections : []
            if(response.data.connections && response.data.connections.length > 0){
              this.sendingGift = true
              this.selectedGift = gift
            }else{
              this.$toast.show(this.$t(this.$store.getters['isTeacher']()? 'teacher.no_buddy_warning_gift': 'redeem.no_buddy_warning_gift'))
            }
        })
            //this.sendingGift = true
            //this.selectedGift = gift
        },
        closeGiftPopup () {
            this.sendingGift = false
            this.selectedGift = {}
            this.message = ''
            this.selectedBuddyForGift = {}
            this.giftSendSuccess = false
        },
        getAutoCompleteBuddies(event) {
            this.autoCompleteBuddies = [];
            this.$store.dispatch('search/buddiesAutoComplete', {q: event.target.value, page: 0, size: 5,authToken:this.$store.state.auth.user.token,  langCode: this.$store.state.locale.selectedLocale}).then(response => {
                // this.autoCompleteBuddies = response.data.connections? response.data.connections : []
                if(response.data.connections && response.data.connections.length>0){
                  for(let i=0;i<response.data.connections.length;i++){
                    if(!response.data.connections[i].isBlocked){
                      console.log("pushed ",i);
                      this.autoCompleteBuddies.push(response.data.connections[i])
                    }
                  }
                }
            })
        },
        selectBuddyForGift (selectedBuddy) {
            this.autoCompleteBuddies = []
            this.selectedBuddyForGift = selectedBuddy
            this.searchParameter = ''
        },
        clearSelectedBuddy () {
            this.selectedBuddyForGift = {}
        },
        use (redemptionId, bought) {
            if (bought && this.selectedBoostTab!=='FOOD') {
                let payload = {id: redemptionId}
                this.$store.dispatch('redemption/use', {authToken:this.$store.state.auth.user.token,  langCode: this.$store.state.locale.selectedLocale, payload}).then(response => {
                    if (response.data.status !== 'ERROR') {
                        this.mascotUrl = response.data.imageUrl
                        this.$store.dispatch('updateMascot', {url: response.data.imageUrl})
                        this.fetchData()
                        this.fetchBoosters()
                    } else {
                        this.$toast.error(response.data.message)
                    }
                }, error => {
            })
            }
        },
        remove (redemptionId) {
                let payload = {id: redemptionId}
                this.$store.dispatch('redemption/remove', {authToken:this.$store.state.auth.user.token,  langCode: this.$store.state.locale.selectedLocale, payload}).then(response => {
                    if (response.data.status !== 'ERROR') {
                        this.mascotUrl = response.data.imageUrl
                        this.$store.dispatch('updateMascot', {url: response.data.imageUrl})
                        this.fetchData()
                        this.fetchBoosters()
                    } else {
                        this.$toast.error(response.data.message)
                    }
                }, error => {
            })
        }
    },
    computed: {
        getType () {
            let fullPath = this.$router.currentRoute.path
            let fullPathSplit  = fullPath.split('/')
            return fullPathSplit[fullPathSplit.length-1]
        }
    }
}
</script>
<style>
.hoverItemBuy{
    z-index:9999999 !important;
}
</style>

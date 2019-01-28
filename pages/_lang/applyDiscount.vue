<template>
   <div>
      <div class="stataticPageOuter">
         <div class="conMidSec">
            <div class="stataticPageInner">
               <!-- <a class="pclose" @click="back"><span><i class="material-icons">&#xE5CD;</i></span></a><h2 class="smallHeading">Hmmm... Seems like you have successfully done your payment</h2><p class="innerTxt">Let's get back to platform to explore more</p><div class="full-width"><button class="btn btn-primary" @click="backToDashboard">Continue</button></div> -->
               <a class="pclose" @click="back">
                  <span>
                     <i class="material-icons">&#xE5CD;</i>
                  </span>
               </a>
               <!-- payment errror summary sec-->
               <div class="payAmountSec">
                  <button class="btnBacktoPrePage">
                     <i class="material-icons">chevron_left</i>
                  </button>
                  <h4 class="smallHeading">Payable Amount</h4>
                  <p class="errorRow" style="display: none;">
                     <i class="material-icons errIcon">warning</i>Payment Error ! Please Try Again
                  </p>
                  <div class="payAmountBox">
                     <div class="payDetailRowSec">
                        <div class="payDetailRow">
                           <div class="">                       Subscription Details                       </div>
                           <div class="oldPrice">                       Rs 21,789                       </div>
                        </div>
                        <div class="payDetailRow heighLightTxt">
                           <div class="heighLightTxt">                       Silver Plan                     </div>
                           <div class="heighLightTxt">                      Rs 21,789                     </div>
                        </div>
                     </div>
                     <div class="payDetailRowSec disCountSec">
                        <div class="payDetailRow">
                           <ul class="list-inline">
                            <li>Discount Code</li>
                            <li>
                              <div class="trailInfo">
                                <i class="material-icons">info_outline</i>
                                <div class="infoContent">
                                  <h6>Discount Code</h6>
                                  {{$t('register.discountTooltip')}}
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div class="payDetailRow" style="display: none;">
                           <div class="heighLightTxt">Applied                           
                              <button type="button" class="btn btn-link appliedCloseBtn">
                                 <span class="appliedCloseIcon"></span>
                              </button>
                           </div>
                           <div class="heighLightTxt">- Rs 2,000</div>
                        </div>
                        <div class="payDetailRow">
                          <div class="">
                             <input type="text" placeholder="Enter Code" class="codeInput">

                         </div>
                          <div class="heighLightTxt">
                            <button type="button" class="btn btn-link applyBtn">Apply</button>
                          </div>
                       </div>
                     </div>
                     <div class="payDetailRowSec totalPaySec">
                        <div class="payDetailRow">
                           <div>Total Payable Amount</div>
                           <div class="heighLightTxt">Rs 21,789</div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="btns subscNextBtnSec clearfix"><button class="btn nextBtnNew" v-on:click="dummyPaymentRequest">Make Payment</button></div>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
export default {
   layout: 'default',
  data() {
        return {
        chatPop: true
        }
    },
    methods: {
        back () {
            this.$router.back()
        },
        backToDashboard() {
            this.$router.push(this.$store.getters['locale/getFinalUrl'](`/`))
        },
        dummyPaymentRequest() {
         let paymentPayload = {};
           if(this.myNewSelectedPlan.cost){
             this.paymentButtonLoading = false
             paymentPayload.amount = this.myNewSelectedPlan.cost, //Mandatory
             paymentPayload.bankName = "HDFC Bank", //Mandatory
             paymentPayload.userId = this.$store.getters['isParent']()?this.$store.state.currentSelectedChild.id:this.$store.state.initialData.userId, //Mandatory
             paymentPayload.subscriptionId = this.myNewSelectedPlan.subscriptionId, //Mandatory
             paymentPayload.paymentMethod = "CREDIT_CARD", //Mandatory CREDIT_CARD,DEBIT_CARD, NET_BANKING
             paymentPayload.paymentCurrency = this.myNewSelectedPlan.currency, //Mandatory
             paymentPayload.promoCode = "",
             paymentPayload.discountCodeId = "1",
             paymentPayload.cardNumber = "XXXX-YYYY-ZZZZ-3612",
             paymentPayload.cardExpiryDate = "09/2021",
             paymentPayload.paymentGatewayName = "PayU",
             paymentPayload.discount = 300
             window.location = `http://13.126.163.24:8000/v1/public/startPayment?subscriptionId=${this.myNewSelectedPlan.subscriptionId}&userId=${this.$store.state.initialData.userId}&payeeUserId=${this.$store.state.initialData.userId}&promoCode=&discountCodeId=&email=${this.$store.state.initialData.email}&phone=${this.$store.state.initialData.phone}`
           }else{
             this.$toast.error(this.$t('common.selectNewPlan'))
           }

       }
    }
}
</script>

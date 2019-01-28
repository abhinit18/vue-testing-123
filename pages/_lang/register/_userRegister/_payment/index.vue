<template>
<div>
  <!-- <div v-if="showDiscountPage === false"class="regFormElements regForm" style="width: 100%">
    <div class="inputRow">
      <div class="formControlOuter text-center">
        <h3>{{$t('comment.paymentAgree')}}</h3>
      </div>
      <div class="inputRow text-center">
        <customloader loaderClass="btn btn-primary" :loaderClick="showDiscountPageFn" :loaderDisabled="saveButtonLoading" loaderText="comment.proceed"></customloader>
      </div>
    </div>
  </div> -->

  <!-- <div v-else> -->
  <div>
      <div class="stataticPageOuter">
         <div class="conMidSec">
            <div class="stataticPageInner">
               <!-- <a class="pclose" @click="back"><span><i class="material-icons">&#xE5CD;</i></span></a><h2 class="smallHeading">Hmmm... Seems like you have successfully done your payment</h2><p class="innerTxt">Let's get back to platform to explore more</p><div class="full-width"><button class="btn btn-primary" @click="backToDashboard">Continue</button></div> -->
               <a class="pclose" @click="backToSubscriptionPage">
                  <span>
                     <i class="material-icons">&#xE5CD;</i>
                  </span>
               </a>
               <!-- payment errror summary sec-->
               <div class="payAmountSec">
                  <!-- <button class="btnBacktoPrePage">
                     <i class="material-icons">chevron_left</i>
                  </button> -->
                  <h4 class="smallHeading">{{$t('payment.payable_amount')}}</h4>
                  <p class="errorRow" style="display: none;">
                     <i class="material-icons errIcon">warning</i>{{$t('payment.payment_error')}}
                  </p>
                  <div class="payAmountBox">
                     <div class="payDetailRowSec">
                        <div class="payDetailRow">
                           <div class="">                     {{$t('payment.subscription_details')}}                         </div>
                           <div class="oldPrice">                        {{getSelectedPlan.cost}}{{getSelectedPlan.currency}}                       </div>
                        </div>
                        <div class="payDetailRow heighLightTxt">
                           <div class="heighLightTxt">                       {{getSelectedPlan.name}}                     </div>
                           <div class="heighLightTxt">                       {{getSelectedPlan.cost-(getSelectedPlan.cost*((getSelectedPlan.discount? getSelectedPlan.discount: 0)/100)) | floatDecimal}}{{getSelectedPlan.currency}}                     </div>
                        </div>
                     </div>
                     <div class="payDetailRowSec disCountSec">
                        <div class="payDetailRow">
                           <ul class="list-inline">
                            <li>{{$t('payment.discount_code')}}</li>
                            <li>
                              <div class="trailInfo">
                                <i class="material-icons">info_outline</i>
                                <div class="infoContent">
                                  <h6>{{$t('payment.discount_code')}}</h6>
                                  {{$t('register.discountTooltip')}}
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div v-if="discountApplied === true" class="payDetailRow">
                           <div class="heighLightTxt">{{$t('payment.applied')}}                           
                              <button type="button" v-on:click="removeDiscount" class="btn btn-link appliedCloseBtn">
                                 <span class="appliedCloseIcon"></span>
                              </button>
                           </div>
                           <div class="heighLightTxt">-  {{totalDiscount | floatDecimal}}{{getSelectedPlan.currency}}</div>
                        </div>
                        <div v-else class="payDetailRow">
                          <div class="">
                             <input type="text" ref="discountCode" :placeholder="$t('payment.enter_code')" class="codeInput">

                         </div>
                          <div class="heighLightTxt">
                            <button type="button" v-on:click="applyDiscount" class="btn btn-link applyBtn">{{$t('payment.apply')}}</button>
                          </div>
                       </div>
                       <div v-if="invalidDiscountCode === true" class="payDetailRow">
                          <p class="errorRow">{{$t('payment.invalid_code')}}</p>
                       </div>
                     </div>
                     <div class="payDetailRowSec totalPaySec">
                        <div class="payDetailRow">
                           <div>{{$t('payment.total_payable_amount')}}</div>
                           <div class="heighLightTxt"> {{getSelectedPlan.cost-totalDiscount-(getSelectedPlan.cost*((getSelectedPlan.discount? getSelectedPlan.discount: 0)/100)) | floatDecimal}}{{getSelectedPlan.currency}}</div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    <div class="btns subscNextBtnSec clearfix"><button class="btn nextBtnNew" v-on:click="dummyPaymentRequest">{{$t('payment.make_payment')}}</button></div>
   </div>
  </div>
</template>

<script>
export default{
  head () {
      return {
        title: this.$t('index.register')
      }
    },
  mounted() {
    // let dataParamObj = this.$router.currentRoute.path
    let currentRoute = this.$router.currentRoute.path
    let currentRouteSplit = currentRoute.split('&')
    // console.log(currentRouteSplit);
    let newParams = []
    for(let i=0;i<currentRouteSplit.length;i++) {
      let splitParam = currentRouteSplit[i].split('=')
      newParams.push(splitParam[1])
    }
    // console.log(newParams);
    // console.log(dataParamObj.split('/')[1]);
    // let userRouterPath = dataParamObj.split('/')[1]
    // this.$root.$emit('showLangCodeActive', {dataParamObj})
    // let currentRoute = this.$router.currentRoute.path
    // let currentRouteSplit = currentRoute.split('/')
    // let userPaymentInfo = currentRouteSplit[currentRouteSplit.length - 1]
    // let userPaymentInfoSplit = userPaymentInfo.split('-')
    // console.log(userPaymentInfoSplit);
    this.getSelectedPlan = {};
    if(newParams[0] === 'byParent') {
      this.getSelectedPlan.byParent = true
      this.getSelectedPlan.cost = newParams[2]
      this.getSelectedPlan.id = newParams[1]
      this.getSelectedPlan.currency = decodeURI(newParams[3])
      this.getSelectedPlan.userId = newParams[4]
      this.getSelectedPlan.promo = newParams[5]
      this.getSelectedPlan.name = newParams[6].replace(/%20/g, " ")
      this.getSelectedPlan.discount = newParams[7]
      this.getSelectedPlan.email = newParams[8]
      this.getSelectedPlan.phone = newParams[9]
      localStorage.setItem('isParent', true);
    }else{
      this.getSelectedPlan.byParent = false
      this.getSelectedPlan.cost = newParams[1]
      this.getSelectedPlan.id = newParams[0]
      this.getSelectedPlan.currency = decodeURI(newParams[2])
      this.getSelectedPlan.userId = newParams[3]
      this.getSelectedPlan.promo = newParams[4]
      this.getSelectedPlan.name = newParams[5].replace(/%20/g, " ");
      this.getSelectedPlan.discount = newParams[6]
      this.getSelectedPlan.email = newParams[7]
      this.getSelectedPlan.phone = newParams[8]
    }
    localStorage.setItem('source', 'registerSubscription');
    localStorage.setItem('userId', this.getSelectedPlan.userId);

  },
  data() {
    return {
      getSelectedPlan: {},
      saveButtonLoading: false,
      showDiscountPage: true,
      totalDiscount: 0,
      discountApplied: false,
      invalidDiscountCode: false
    }
  },
  layout: 'login',
  methods: {
    // dummyPaymentRequest() {
    //   this.saveButtonLoading = true
    //   let paymentPayload = {};
    //   console.log(this.getSelectedPlan);
    //     paymentPayload.amount = this.getSelectedPlan.cost, //Mandatory
    //     paymentPayload.bankName = "HDFC Bank", //Mandatory
    //     paymentPayload.userId = this.getSelectedPlan.userId, //Mandatory
    //     paymentPayload.subscriptionId = this.getSelectedPlan.id, //Mandatory
    //     paymentPayload.paymentMethod = "CREDIT_CARD", //Mandatory CREDIT_CARD,DEBIT_CARD, NET_BANKING
    //     paymentPayload.paymentCurrency = this.getSelectedPlan.currency, //Mandatory
    //     paymentPayload.promoCode = this.getSelectedPlan.promo,
    //     paymentPayload.discountCodeId = "1",
    //     paymentPayload.cardNumber = "XXXX-YYYY-ZZZZ-3612",
    //     paymentPayload.cardExpiryDate = "09/2021",
    //     paymentPayload.paymentGatewayName = "PayU",
    //     paymentPayload.discount = 300

    //   this.$store.dispatch('auth/initiatePayment', {
    //     langCode: this.$store.state.locale.selectedLocale,
    //     paymentPayload
    //   }).then(resp => {
    //     if (resp.data.status === 'ERROR') {
    //       this.saveButtonLoading = false
    //     } else {
    //       let dataObj = {}
    //       dataObj.context = this
    //       dataObj.btnActionName = 'payment'
    //       let dataParam =  dataObj
    //       let payloadConfirmData = {}
    //       payloadConfirmData.paymentId = resp.data.paymentId,
    //         payloadConfirmData.paymentTransactionId = "Returned from payment gateway",
    //         payloadConfirmData.paymentComplete = true,
    //         payloadConfirmData.orderId = resp.data.orderId
    //       this.$store.dispatch('auth/paymentConfirmation', {
    //         authToken: this.$store.state.auth.user.token,
    //         langCode: this.$store.state.locale.selectedLocale,
    //         payloadConfirmData
    //       }).then(response => {
    //         if(response.data.status === 'SUCCESS') {
    //           if(this.getSelectedPlan.byParent) {
    //             this.saveButtonLoading = false
    //             this.$store.dispatch(`setting/accountDeactivation`, {
    //             authToken: this.$store.state.auth.user.token,
    //             langCode: this.$store.state.locale.selectedLocale
    //             }).then((response) => {
    //               if (response.data.status === 'SUCCESS') {
    //                 let userId = this.$store.state.initialData.userId
    //                 this.$store.dispatch('auth/logout', {
    //                   deviceId: 'WEB',
    //                   userId: userId,
    //                   context: this,
    //                   langCode: this.$store.state.locale.selectedLocale
    //                 }).then(response => {
                        
    //                   this.$router.push(this.$store.getters['locale/getFinalUrl']('/ParentReg'))
    //                 })
    //               }

    //             }, (error) => {
    //               vm.$toast.error(error)
    //             })
    //           }else{
    //           this.$root.$emit('showActivationActionPopup', {dataParam})
    //           this.saveButtonLoading = false
    //           }
    //         }
    //       })
    //     }
    //   })
    // },
    dummyPaymentRequest() {
      let paymentPayload = {};
        if(this.getSelectedPlan.cost){
          // this.paymentButtonLoading = false
          // paymentPayload.amount = this.myNewSelectedPlan.cost, //Mandatory
          // paymentPayload.bankName = "HDFC Bank", //Mandatory
          // paymentPayload.userId = this.$store.getters['isParent']()?this.$store.state.currentSelectedChild.childObj.id:this.$store.state.initialData.userId, //Mandatory
          // paymentPayload.subscriptionId = this.myNewSelectedPlan.subscriptionId, //Mandatory
          // paymentPayload.paymentMethod = "CREDIT_CARD", //Mandatory CREDIT_CARD,DEBIT_CARD, NET_BANKING
          // paymentPayload.paymentCurrency = this.myNewSelectedPlan.currency, //Mandatory
          // paymentPayload.promoCode = "",
          // paymentPayload.discountCodeId = "1",
          // paymentPayload.cardNumber = "XXXX-YYYY-ZZZZ-3612",
          // paymentPayload.cardExpiryDate = "09/2021",
          // paymentPayload.paymentGatewayName = "PayU",
          // paymentPayload.discount = 300
          window.location = process.env.baseUrl+`v1/public/startPayment?subscriptionId=${this.getSelectedPlan.id}&userId=${this.getSelectedPlan.userId}&payeeUserId=${this.getSelectedPlan.userId}&promoCode=&discountCodeId=${this.discountCodeValue}&email=${this.getSelectedPlan.emailId}&phone=${this.getSelectedPlan.phone}&lang=${this.$store.state.locale.selectedLocale}`
        }else{
          this.$toast.error(this.$t('common.selectNewPlan'))
        }

    },
    showDiscountPageFn(){
      this.showDiscountPage = true;
    },
    backToSubscriptionPage(){
      // this.showDiscountPage = false;
      window.location = this.$store.getters['locale/getFinalUrl']('/login');
    },
    applyDiscount(){
      if(this.$refs.discountCode.value){
        var reqObject = {};
        reqObject.subscriptionId = this.getSelectedPlan.id;
        reqObject.userId = this.getSelectedPlan.userId;
        reqObject.payeeUserId = this.getSelectedPlan.userId;
        reqObject.promoCode = this.getSelectedPlan.promo;
        reqObject.discountCodeId = this.$refs.discountCode.value;
        reqObject.email = this.getSelectedPlan.email;
        reqObject.phone = this.getSelectedPlan.phone;
        // console.log("reqObject ",reqObject);
        // alert("1");
        this.$store.dispatch('auth/getPlanPriceSummary', {authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale ,reqObject:reqObject}).then(response => {
          if(response.data.discountCodeResponse.code === 'INVALID_DISCOUNT_CODE' || response.data.discountCodeResponse.code === 'INVALID_OR_EXPIRED_PROMO_CODE' ){
            // alert("invalid");
            this.invalidDiscountCode = true;
          }
          else{
            this.invalidDiscountCode = false;
            this.discountApplied = true;
            // console.log("finalDiscountOnDiscountCode ",response.data.finalDiscountOnDiscountCode);
            this.totalDiscount = response.data.finalDiscountOnDiscountCode;
            this.discountCodeValue = response.data.discountCodeResponse.code;
            // console.log("discountCodeValue ",this.discountCodeValue);
            // alert("yo");
          }
        }, (error) => {
          // alert("NNNo");
        })
      }
      else{
        this.invalidDiscountCode = true;
      }
    },
    removeDiscount(){
      // alert("removed");
      this.discountApplied = false;
      this.totalDiscount = 0;
    }
  },
  filters: {
      floatDecimal: function(value) {
        return parseFloat(value).toFixed(2);
      }
    },
}
</script>

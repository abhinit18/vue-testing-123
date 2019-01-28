<template>
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
                  <p class="errorRow">
                     <i class="material-icons errIcon">warning</i>{{$t('payment.payment_error')}}
                  </p>
                  <div class="payAmountBox">
                     <div class="payDetailRowSec">
                        <div class="payDetailRow">
                           <div class="">                       {{$t('payment.subscription_details')}}                       </div>
                           <div class="oldPrice">                        {{priceSummary.totalPlanCost}}{{priceSummary.currency}}                       </div>
                        </div>
                        <div class="payDetailRow heighLightTxt">
                           <div class="heighLightTxt">                       {{priceSummary.planName}}                     </div>
                           <div class="heighLightTxt">                       {{priceSummary.totalPlanCost - priceSummary.planDiscount | floatDecimal}}{{priceSummary.currency}}                     </div>
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
                           <div class="heighLightTxt">-  {{this.discountDetails.value | floatDecimal}}{{priceSummary.currency}}</div>
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
                           <div class="heighLightTxt"> {{this.priceSummary.finalPlanCost | floatDecimal}}{{priceSummary.currency}}</div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    <div class="btns subscNextBtnSec clearfix"><button class="btn nextBtnNew" v-on:click="dummyPaymentRequest">{{$t('payment.make_payment')}}</button></div>
   </div>
</template>

<script>
// import { Carousel, Slide } from 'vue-carousel'

export default{
  head () {
      return {
      title: this.$t('index.my_subscription')
      }
    },
  data() {
    return {
      transactionId: '',
      myNewSelectedPlan: {},
      priceSummary: {},
      discountDetails: {},
      promoDetails: {},
      userId: '',
      discountApplied: false,
      discountCodeValue: '',
      invalidDiscountCode: false,
      promoCodeValue: ''
    }
  },
  // middleware: 'authenticated',
  // layout: 'default',
  // middleware: 'anonymous',
  layout: 'blank',
  mounted: function () {
    this.init()
  },
  methods: {
    init(){
      var url_string = window.location.href;
      var url = new URL(url_string);
      var transactionId = url.searchParams.get("transactionId");
      console.log(transactionId);
      this.transactionId = transactionId;
      this.userId = localStorage.getItem("userId");
      this.$store.dispatch('auth/getUserPaymentParam', {authToken: '',transactionId:transactionId, userId: this.userId, langCode: this.$store.state.locale.selectedLocale}).then(response => {
        // console.log("data ",response.data);
        this.myNewSelectedPlan = response.data;
        this.priceSummary = response.data.planPriceSummaryResponse;
        this.discountDetails = response.data.planPriceSummaryResponse.discountCodeResponse;
        this.promoDetails = response.data.planPriceSummaryResponse.promoCodeResponse;
        // console.log("myNewSelectedPlan ",this.myNewSelectedPlan);
        // console.log("plan price summary ",this.priceSummary);
        // console.log("Discount summary ",this.discountDetails);
        // console.log("Promo summary ",this.promoDetails);
        // this.invoiceDetails = response.data;
        // this.registerSubscription = localStorage.getItem('source');
        // localStorage.setItem('source','');
        if(this.discountDetails.code){
        this.$refs.discountCode.value = this.discountDetails.code;
        this.discountCodeValue = this.discountDetails.code;
        this.discountApplied = true;
        }
        if(this.promoDetails.code){
          this.promoCodeValue = this.promoDetails.code;
        }
      })
    },
    backToSubscriptionPage () {
      // this.$router.back()
      this.$router.push(this.$store.getters['locale/getFinalUrl']('/mySubscription'))
    },
    dummyPaymentRequest() {
      // alert("1");
      let paymentPayload = {};
        if(this.priceSummary.finalPlanCost){
          // alert("2");
          this.userId = localStorage.getItem("userId");
          window.location = process.env.baseUrl+`v1/public/startPayment?subscriptionId=${this.myNewSelectedPlan.subscriptionId}&userId=${this.userId}&payeeUserId=${this.userId}&promoCode=${this.promoCodeValue}&discountCodeId=${this.discountCodeValue}&email=${this.myNewSelectedPlan.email}&phone=${this.myNewSelectedPlan.phone}&lang=${this.$store.state.locale.selectedLocale}`
        }else{
          this.$toast.error(this.$t('common.selectNewPlan'))
        }

    },
    applyDiscount(){
      if(this.$refs.discountCode.value){
        var reqObject = {};
        reqObject.subscriptionId = this.myNewSelectedPlan.subscriptionId;
        reqObject.userId = this.userId;
        reqObject.payeeUserId = this.userId;
        reqObject.promoCode = "";
        reqObject.discountCodeId = this.$refs.discountCode.value;
        reqObject.email = this.myNewSelectedPlan.email;
        reqObject.phone = this.myNewSelectedPlan.phone;
        console.log("reqObject ",reqObject);
        // alert("1");
        this.$store.dispatch('auth/getPlanPriceSummary', {authToken: '', langCode: this.$store.state.locale.selectedLocale ,reqObject:reqObject}).then(response => {
          if(response.data.discountCodeResponse.code === 'INVALID_DISCOUNT_CODE' || response.data.discountCodeResponse.code === 'INVALID_OR_EXPIRED_PROMO_CODE'){
            // alert("invalid");
            this.invalidDiscountCode = true;
          }
          else{
            this.invalidDiscountCode = false;
            this.discountApplied = true;
            // console.log("finalDiscountOnDiscountCode ",response.data.finalDiscountOnDiscountCode);
            this.totalDiscount = response.data.finalDiscountOnDiscountCode;
            // this.finalcost = this.myNewSelectedPlan.cost-this.totalDiscount-(this.myNewSelectedPlan.cost*((this.myNewSelectedPlan.discount? this.myNewSelectedPlan.discount: 0)/100));
            // console.log("F cost" ,this.finalcost);
            this.discountCodeValue = response.data.discountCodeResponse.code;
            this.discountDetails.value = response.data.finalDiscountOnDiscountCode;
            // console.log("discountCodeValue ",this.discountCodeValue);
            // this.priceSummary.finalPlanCost = this.priceSummary.finalPlanCost - this.discountDetails.value;
            this.priceSummary.finalPlanCost = response.data.finalPlanCost;
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
      this.discountCodeValue = '';
      this.priceSummary.finalPlanCost = this.priceSummary.finalPlanCost + this.discountDetails.value;
    }
  },
  components: {
    // Carousel, Slide
  },
  filters: {
      floatDecimal: function(value) {
        return parseFloat(value).toFixed(2);
      }
    },
}
</script>
<style>
.otherPlans .carousel-3d-slide{ background: none; box-shadow: none; }
.planSelect{z-index: -1;}
/*.radio input:checked + div{ background: #e54d8c!important;color:#fff;}*/
.radio{margin: 0px;}
.radio input{visibility:hidden;}
.pos-rel-btn{position: relative;float: left;width: 100%;}
.mg-top-35{margin-top:35px;}
.full-width{
  float:left;width:100%;
}
</style>
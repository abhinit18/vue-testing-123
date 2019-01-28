<template>
  <div v-if="showDiscountPage === false" class="registerStepsPages">


  <div class="registerStepsPagesInner">
  <div class="registerStepsPagesInner2">
  <div class="registerStepsPagesInner3">

    <div class="cardSec plansOuterContainer subsrbPlanOuter clearfix">




      <div class="cloud csmall csmallani"></div>
      <div class="cloud csbig csbigani"></div>
      <div class="cloud csmall cleft"></div>
      <div class="cloud csbig cleft cleft2"></div>
      <div class="loginimg5"></div>
      <div class="loginimg6"></div>

<div class="mainPlansListingOuterMain">
<div class="mainPlansListing">


      <!-- <carousel :navigationEnabled=true :paginationEnabled=false :scrollPerPage=true :perPage=3 v-if="startCarouselLoading">
        <slide v-for="(plan, index) in subscriptionPlans" :key="plan.subscriptionId"> -->
<div class="mainPlansListing">

  <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
          <div class="swiper-slide" :class="{active: plan.subscriptionId===selectedSubscriptionId}" @click="selectNewPlan(plan)" v-for="(plan, index) in mySubscribedPlans" :key="plan.subscriptionId">
          <div class="subsrbPlan plan_1" v-bind:class="{plan_1: plan.durationTypeString === 'M', plan_2: plan.durationTypeString === 'W', plan_3: plan.durationTypeString === 'D'}"  @click="changePlan(plan.subscriptionId)">
            <div class="planHead">
              <div class="mostPopularSec">{{plan.name}} </div>
              <h3 class="planDays">{{plan.duration}}
                <span class="daysTxt" v-if="plan.durationTypeString === 'M'">{{plan.duration === 1? $t('register.month') : $t('register.months')}}</span>
                <span class="daysTxt" v-if="plan.durationTypeString === 'W'">{{plan.duration === 1? $t('register.week') : $t('register.weeks')}}</span>
                <span class="daysTxt" v-if="plan.durationTypeString === 'D'">{{plan.duration === 1? $t('register.day') : $t('register.days')}}</span>
                {{$t('register.plan')}}
              </h3>
              <div class="planOfferSec">
                <!-- <div class="popularPlan">
                  {{plan.name}}
                </div> -->
                <h2 class="planPrice" >{{plan.cost-(plan.cost*((plan.discount? plan.discount: 0)/100)) | floatDecimal}}<span class="planCurrecncy">{{plan.currency}}</span></h2>
               <div class="planOldPrice" v-if="plan.discount">{{plan.cost}}{{plan.currency}} </div>

              </div>
              <div  class="planOffer">{{plan.discountMessage}}</div>

            </div>
            <ul class="planInfo">
              <li v-for="description in plan.descriptions">{{description}}</li>
            </ul>
            <div class="planSelectBtn">
              <div class="pos-rel-btn">
                <label class="radio">
               <input type="radio"  :value="plan.subscriptionId" v-model="selectedSubscriptionId" name="plan" class="customCheck">
               <div class="planSelect">
                 <span v-if="selectedSubscriptionId === plan.subscriptionId"><span class="checkedIcon"></span> {{$t('register.selected')}}</span>
                 <span v-else>{{$t('register.select')}}</span>
               </div>
             </label>
              </div>
            </div>
          </div>
        </div>
        </div>




      </div>


<!--
   <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(plan, index) in mySubscribedPlans" :key="plan.subscriptionId">
          <div class="subsrbPlan plan_1" v-bind:class="{plan_1: plan.durationTypeString === 'M', plan_2: plan.durationTypeString === 'W', plan_3: plan.durationTypeString === 'D'}">
            <div class="planHead">
              <h3 class="planDays">{{plan.duration}}
                <span class="daysTxt" v-if="plan.durationTypeString === 'M'">{{$t('register.months')}}</span>
                <span class="daysTxt" v-if="plan.durationTypeString === 'W'">{{$t('register.weeks')}}</span>
                <span class="daysTxt" v-if="plan.durationTypeString === 'D'">{{$t('register.days')}}</span>
              </h3>
              <h2 class="planPrice">{{plan.cost}} <span class="planCurrecncy">{{plan.currency}}</span></h2>
              <p class="planSavedTxt">{{plan.discountMessage}}</p>
              <div class="popularPlan">
                {{plan.name}}
              </div>
            </div>
            <ul class="planInfo">
              <li v-for="description in plan.descriptions">{{description}}</li>
            </ul>
            <div class="planSelectBtn">
              <div class="pos-rel-btn">
                <label class="radio">
               <input type="radio"  :value="plan.subscriptionId" v-model="selectedSubscriptionId" name="plan" class="customCheck">
               <div class="planSelect">

                 <span v-if="selectedSubscriptionId === plan.subscriptionId"><span class="checkedIcon"></span> {{$t('register.selected')}}</span>
                 <span v-else>{{$t('register.select')}}</span>
               </div>
             </label>
              </div>
            </div>
          </div>
        </div>
        </div>




      </div>
-->
         <div class="swiper-button-prev" slot="button-prev"><i class="material-icons">&#xE314;</i></div>
        <div class="swiper-button-next" slot="button-next"><i class="material-icons">&#xE315;</i></div>

    </div>
      <!--   </slide>
      </carousel> -->


    </div>
  </div>




  </div>
  </div>
  </div>
    <div class="btns subscNextBtnSec clearfix">
        <customloader loaderClass="btn nextBtnNew" :loaderClick="goToPayment" :loaderDisabled="paymentButtonLoading" loaderText="register.pay"></customloader>

      </div>
  </div>
  </div>


  <div v-else>
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
                           <div class="">                       {{$t('payment.subscription_details')}}                       </div>
                           <div class="oldPrice">                        {{myNewSelectedPlan.cost}}{{myNewSelectedPlan.currency}}                       </div>
                        </div>
                        <div class="payDetailRow heighLightTxt">
                           <div class="heighLightTxt">                       {{myNewSelectedPlan.name}}                     </div>
                           <div class="heighLightTxt">                       {{myNewSelectedPlan.cost-(myNewSelectedPlan.cost*((myNewSelectedPlan.discount? myNewSelectedPlan.discount: 0)/100)) | floatDecimal}}{{myNewSelectedPlan.currency}}                     </div>
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
                           <div class="heighLightTxt">- {{totalDiscount | floatDecimal}}{{myNewSelectedPlan.currency}}</div>
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
                           <div class="heighLightTxt"> {{myNewSelectedPlan.cost-totalDiscount-(myNewSelectedPlan.cost*((myNewSelectedPlan.discount? myNewSelectedPlan.discount: 0)/100)) | floatDecimal}}{{myNewSelectedPlan.currency}}</div>
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
//import { Carousel, Slide } from 'vue-carousel'

export default{
  components: {
   // Carousel, Slide
  },
  data() {
    return {
      mySubscribedPlans: [],
      myselectedPlan: {},
      myNewSelectedPlan:{},
      swiperOption: {
         slidesPerView: 3,
          spaceBetween: 10,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
       },
      selectedSubscriptionId: '',
      paymentButtonLoading: false,
      showDiscountPage: false,
      discountApplied: false,
      totalDiscount: 0,
      // finalCost: 0,
      discountCodeValue: '',
      invalidDiscountCode: false
    }
  },
  middleware: 'anonymous',
  layout: 'login',
  mounted() {
    let payloadData = {
      principal:this.$store.state.auth.credential.username,
      password:this.$store.state.auth.credential.password
    }
    // this.$store.dispatch('header/navChange', {key: 1, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, context: this})
    if(payloadData.principal && payloadData.password) {
      this.$store.dispatch('auth/viewUserPlans', {langCode: this.$store.state.locale.selectedLocale, payloadData}).then(response => {
        console.log(response);
        this.mySubscribedPlans = response.data.SubscriptionMaster? response.data.SubscriptionMaster : []
        //this.selectedSubscriptionId = this.mySubscribedPlans[0] ? this.mySubscribedPlans[0].subscriptionId : ''
        // this.myselectedPlan = response.data.currentPlan
        let plans = response.data.SubscriptionMaster
        for(let i =0; i<plans.length;i++) {
          if(plans[i].isDefault) {
            this.selectedSubscriptionId = plans[i].subscriptionId
          }
        }
      })
    }else{
      this.$router.push(this.$store.getters['locale/getFinalUrl']('/error'))
    }

  },
  filters: {
      floatDecimal: function(value) {
        return parseFloat(value).toFixed(2);
      }
    },
  methods: {
    changePlan(subscriptionId) {
      this.selectedSubscriptionId = subscriptionId
    },
    onPageChange (){
    },
    selectNewPlan(value) {
      this.myNewSelectedPlan = value
    },
    makePayment() {
      this.paymentButtonLoading = true
      let paymentPlan = this.mySubscribedPlans.filter(data => {
        return this.selectedSubscriptionId === data.subscriptionId
      })

      let paymentPayload = {};
        paymentPayload.amount = paymentPlan[0].cost, //Mandatory
        paymentPayload.bankName = "HDFC Bank", //Mandatory
        paymentPayload.userId = this.$store.state.auth.credential.userId, //Mandatory
        paymentPayload.subscriptionId = paymentPlan[0].subscriptionId, //Mandatory
        paymentPayload.paymentMethod = "CREDIT_CARD", //Mandatory CREDIT_CARD,DEBIT_CARD, NET_BANKING
        paymentPayload.paymentCurrency = "$", //Mandatory
        paymentPayload.promoCode = "",
        paymentPayload.discountCodeId = "1",
        paymentPayload.cardNumber = "XXXX-YYYY-ZZZZ-3612",
        paymentPayload.cardExpiryDate = "09/2021",
        paymentPayload.paymentGatewayName = "PayU",
        paymentPayload.discount = 300
      this.$store.dispatch('auth/initiatePayment', {
        langCode: this.$store.state.locale.selectedLocale,
        paymentPayload
      }).then(resp => {
        this.paymentButtonLoading = false
        if (resp.data.status === 'ERROR') {

        } else {
          let payloadConfirmData = {}
            payloadConfirmData.paymentId = resp.data.paymentId,
            payloadConfirmData.paymentTransactionId = "Returned from payment gateway",
            payloadConfirmData.paymentComplete = true,
            payloadConfirmData.orderId = resp.data.orderId
            this.$store.dispatch('auth/paymentConfirmation', {
            langCode: this.$store.state.locale.selectedLocale,
            payloadConfirmData
          }).then(response => {
            if(response.data.status === 'SUCCESS') {
                //this.$toast.success(this.$t('toastMsg.subscriptionPaymentDone'))
                this.$router.push(this.$store.getters['locale/getFinalUrl']('/login'))
                // this.$store.dispatch('auth/mySubscription', {authToken: this.$store.state.auth.user.token}).then(response => {
                // this.mySubscribedPlans = response.data.SubscriptionMaster
                // this.myselectedPlan = response.data.currentPlan
              // })
            }else{
              //this.$toast.success(response.data.code)
            }
          })
        }
      }, error => {
        this.paymentButtonLoading = false
      })
    },
    dummyPaymentRequest() {
      let paymentPayload = {};
        if(this.myNewSelectedPlan.cost){
          localStorage.setItem('source','pendingSubscription');
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
          window.location = process.env.baseUrl+`v1/public/startPayment?subscriptionId=${this.myNewSelectedPlan.subscriptionId}&userId=${localStorage.getItem('userId')}&payeeUserId=${localStorage.getItem('userId')}&promoCode=&discountCodeId=${this.discountCodeValue}&email=${localStorage.getItem('userName')}&phone=${localStorage.getItem('phone')}&lang=${this.$store.state.locale.selectedLocale}`
        }else{
          this.$toast.error(this.$t('common.selectNewPlan'))
        }

    },
    goToPayment(){
      // this.$router.push(this.$store.getters['locale/getFinalUrl']('/applyDiscount'))
      // console.log("myNewselectedPlan ",this.myNewSelectedPlan);
      if(!this.selectedSubscriptionId) {
        this.$toast.error(this.$t('common.selectNewPlan'))
      }else{
        this.showDiscountPage = true;
      }

    },
    backToSubscriptionPage(){
      this.showDiscountPage = false;
    },
    applyDiscount(){
      if(this.$refs.discountCode.value){
        var reqObject = {};
        reqObject.subscriptionId = this.myNewSelectedPlan.subscriptionId;
        reqObject.userId = localStorage.getItem('userId');
        reqObject.payeeUserId = localStorage.getItem('userId');
        reqObject.promoCode = "";
        reqObject.discountCodeId = this.$refs.discountCode.value;
        reqObject.email = localStorage.getItem('userName');
        reqObject.phone = '';
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
            console.log("finalDiscountOnDiscountCode ",response.data.finalDiscountOnDiscountCode);
            this.totalDiscount = response.data.finalDiscountOnDiscountCode;
            this.discountCodeValue = response.data.discountCodeResponse.code;
            console.log("discountCodeValue ",this.discountCodeValue);
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
  }

}
</script>

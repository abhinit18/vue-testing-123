<template>
  <div v-if="showDiscountPage === false" class="clearfix subsPrePlanSecPageOuter">
<a class="pclose" @click="back" ><span><i class="material-icons">&#xE5CD;</i></span></a>


 <div class="subsPrePlanSecPage">

<!-- subscrption -->
        <div class="subsPrePlanSec clearfix">
          <h3 class="smallHeading">{{$t('mySubscription.subscription')}}</h3>
          <div class="subsPrePlanBox" v-if="myselectedPlan && myselectedPlan.daysInExpiry >=0 ">
             <div class="planHeadSec clearfix">
                <span class="expiredate" v-if="myselectedPlan.daysInExpiry === 0">{{$t('mySubscription.expires_in_short')}} {{$t('common.today')}}</span>
                <span class="expiredate" v-else-if="myselectedPlan.daysInExpiry === 1">{{$t('mySubscription.expires_in_short')}} {{$t('common.tomorrow')}}</span>
                <span class="expiredate" v-else>{{$t('mySubscription.expires_in')}} {{myselectedPlan.daysInExpiry}} {{$t('mySubscription.days')}}</span>
                <div class="leftinfo">
                  <p class="prePlanTxt">{{$t('mySubscription.present_plan')}}</p>
                  <p class="prePlanName">{{myselectedPlan.name}}</p>
                </div>

             </div>
             <div class="subsPrePlanBody clearfix">
                <div class="planExpInfo clearfix">
                   <div class="leftExpInfo">
                     <p class="labelTxt">
                        {{$t('mySubscription.date_of_expiry')}}
                     </p>
                     <p class="dateAndPlanTxt">
                       <!-- / HH:mm -->
                       {{new Date(myselectedPlan.endDate)| moment("MMM, Do YYYY")}}
                     </p>
                   </div>
                   <div class="rightPriceInfo">
                      <p class="labelTxt">
                        {{$t('mySubscription.price')}}
                     </p>
                     <p class="dateAndPlanTxt">
                       {{myselectedPlan.cost}}
                     </p>
                   </div>
                </div>
                <div class="subPlnfeatureSec">
                  <h4 class="featureHeading">{{$t('mySubscription.features')}}</h4>
                  <ul class="planFeatrueList">
                    <li v-for="description in myselectedPlan.descriptions">{{description}}</li>
                  </ul>
                </div>
             </div>




<!--  <div class="subsrbPlan plan_2">
         <div class="planHead">
            <h3 class="planDays">
              {{myselectedPlan.duration}}
              <span class="daysTxt" v-if="myselectedPlan.durationTypeString === 'D'">Days</span>
              <span class="daysTxt" v-if="myselectedPlan.durationTypeString === 'M'">Month</span>
              <span class="daysTxt" v-if="myselectedPlan.durationTypeString === 'W'">Week</span>
            </h3>
            <h2 class="planPrice">{{myselectedPlan.cost}} </h2>
            <p class="planSavedTxt">{{myselectedPlan.name}}</p>
            <div class="popularPlan">
               most popular
            </div>
         </div>
         <ul class="planInfo">
            <li v-for="description in myselectedPlan.descriptions">{{description}}</li>
         </ul>
         <div class="planSelectBtn">
            Select
         </div>
      </div> -->





          </div>



<div v-if="mySubscribedPlans.length>0 && myselectedPlan && myselectedPlan.name">
  <div class="otherPlans">
      <swiper2 :mySubscribedPlans="mySubscribedPlans" :sildeNum="2"></swiper2>
      <!-- <div class="full-width text-center">
          <button class="btn btn-primary" @click="dummyPaymentRequest">{{$t('common.proceed')}}</button>
      </div> -->
  </div>
</div>
  <div class="otherPlans otherPlansFull" v-else>
    <swiper3 :mySubscribedPlans="mySubscribedPlans" :sildeNum="3"></swiper3>
      <!-- <div class="full-width text-center">
          <button class="btn btn-primary" @click="dummyPaymentRequest">{{$t('common.proceed')}}</button>
      </div> -->
  </div>






  </div>
</div>

 <div v-if="selectedSubscriptionId === myNewSelectedPlan.subscriptionId" class="btns subscNextBtnSec clearfix">
        <customloader loaderClass="btn nextBtnNew" :loaderClick="goToPayment" :loaderDisabled="paymentButtonLoading" loaderText="common.proceed"></customloader>
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
                            <!-- <div>
                              <p class="parentStuName"></p>
                           </div>  -->
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
// import { Carousel, Slide } from 'vue-carousel'
import swiper2 from "~/components/planSwiper2silde";
import swiper3 from "~/components/planSwiper3silde";
export default{
  head () {
			return {
			title: this.$t('index.my_subscription')
			}
		},
  data() {
    return {
      mySubscribedPlans: [],
      myselectedPlan: {},
      myNewSelectedPlan:{},
      swiperOption: {
         slidesPerView: 2,
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
  middleware: 'authenticated',
  layout: 'default',
  mounted() {
    if(this.$store.state.currentSelectedChild&&this.$store.state.currentSelectedChild.expiryDays <= 0) {
          this.$root.$emit('childExpiryPopUp', {
          byParent: this.$store.state.currentSelectedChild.expiryDays,
          bySubs: this.$router.currentRoute.path
      })
      }
      this.$root.$on('userSelectedPlan', ({plan}) => {
        this.selectNewPlan(plan)
        this.changePlan(plan.subscriptionId)
      })
    this.$store.dispatch('header/navChange', {key: 1, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, context: this})
    if(!this.$store.getters['isParent']()) {
      this.$store.dispatch('auth/mySubscription', {authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale}).then(response => {
      this.mySubscribedPlans = response.data.SubscriptionMaster? response.data.SubscriptionMaster : []
      //this.selectedSubscriptionId = this.mySubscribedPlans[0] ? this.mySubscribedPlans[0].subscriptionId : ''
      this.myselectedPlan = response.data.currentPlan
    })
    }else {
      this.$store.dispatch('auth/mySubscription', {authToken: this.$store.state.auth.user.token,childId:this.$store.state.currentSelectedChild.id,parentIn:true, langCode: this.$store.state.locale.selectedLocale}).then(response => {
      this.mySubscribedPlans = response.data.SubscriptionMaster? response.data.SubscriptionMaster : []
      //this.selectedSubscriptionId = this.mySubscribedPlans[0] ? this.mySubscribedPlans[0].subscriptionId : ''
      this.myselectedPlan = response.data.currentPlan
    })
    }
    this.$store.dispatch('snowPlowPageView',{pageName: "MY_SUBSCRIPTION"});
  },
  methods: {
    changePlan (subscriptionId) {
        this.selectedSubscriptionId = subscriptionId
      },
    back () {
      // this.$router.back()
      if(this.$store.state.currentSelectedChild&&this.$store.state.currentSelectedChild.expiryDays <= 0) {
        this.$router.push(this.$store.getters['locale/getFinalUrl']('/'))
          this.$root.$emit('childExpiryPopUp', {
          byParent: this.$store.state.currentSelectedChild.expiryDays,
          bySubs: '/'
      })
      }else{
        this.$router.push(this.$store.getters['locale/getFinalUrl']('/'))
      }

    },
    onPageChange (){
    },
    myPlans() {

    },
    selectNewPlan(value) {
      console.log(value);
      this.myNewSelectedPlan = value
      // console.log("myNewSelectedPlan ",this.myNewSelectedPlan);
    },
    dummyPaymentRequest() {
      // debugger
      // console.log("typeof", typeof this.myNewSelectedPlan.cost )
      // alert("this.myNewSelectedPlan.cost "+this.myNewSelectedPlan.cost);
      let paymentPayload = {};
        if(this.myNewSelectedPlan.cost){
          if(this.myNewSelectedPlan.cost === 0){
              let reqObjectt = {};
              reqObjectt.subscriptionId = this.myNewSelectedPlan.subscriptionId
              reqObjectt.userId = this.$store.getters['isParent']()?this.$store.state.currentSelectedChild.id:this.$store.state.initialData.userId
              reqObjectt.payeeUserId = this.$store.getters['isParent']()?this.$store.state.currentSelectedChild.id:this.$store.state.initialData.userId
              reqObjectt.promoCode = ""
              reqObjectt.discountCodeId = this.discountCodeValue
              reqObjectt.email = this.$store.state.initialData.email
              reqObjectt.phone = this.$store.state.initialData.phone
              this.$store.dispatch('auth/activateFreePlan', {authToken: '',reqObjectt:reqObjectt, langCode: this.selectedLang}).then(response => {
                // console.log("data ",response.data);
                this.$router.push(this.$store.getters['locale/getFinalUrl']('/'))
              })
          }
          else{
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
            window.location = process.env.baseUrl+`v1/public/startPayment?subscriptionId=${this.myNewSelectedPlan.subscriptionId}&userId=${paymentPayload.userId}&payeeUserId=${paymentPayload.userId}&promoCode=&discountCodeId=${this.discountCodeValue}&email=${this.$store.state.initialData.email}&phone=${this.$store.state.initialData.phone}&lang=${this.$store.state.locale.selectedLocale}`
          // this.$store.dispatch('auth/initiatePayment', {
          //   langCode: this.$store.state.locale.selectedLocale,
          //   paymentPayload
          // }).then(resp => {
          //   if (resp.data.status === 'ERROR') {

          //   } else {
          //     let payloadConfirmData = {}
          //       payloadConfirmData.paymentId = resp.data.paymentId,
          //       payloadConfirmData.paymentTransactionId = "Returned from payment gateway",
          //       payloadConfirmData.paymentComplete = true,
          //       payloadConfirmData.orderId = resp.data.orderId
          //       this.$store.dispatch('auth/paymentConfirmation', {
          //       authToken: this.$store.state.auth.user.token,
          //       langCode: this.$store.state.locale.selectedLocale,
          //       childId:this.$store.state.currentSelectedChild.childObj.id,
          //       payloadConfirmData
          //     }).then(response => {
          //       if(response.data.status === 'SUCCESS') {
          //           this.$toast.success(this.$t('toastMsg.subscriptionPaymentDone'))
          //           // this.$store.dispatch('auth/mySubscription', {authToken: this.$store.state.auth.user.token}).then(response => {
          //           // this.mySubscribedPlans = response.data.SubscriptionMaster
          //           // this.myselectedPlan = response.data.currentPlan
          //         // })
          //         if(this.$store.getters['isParent']()) {
          //           this.$store.dispatch('auth/mySubscription', {authToken: this.$store.state.auth.user.token,childId:this.$store.state.currentSelectedChild.childObj.id,parentIn:true, langCode: this.$store.state.locale.selectedLocale}).then(response => {
          //           this.mySubscribedPlans = response.data.SubscriptionMaster? response.data.SubscriptionMaster : []
          //           //this.selectedSubscriptionId = this.mySubscribedPlans[0] ? this.mySubscribedPlans[0].subscriptionId : ''
          //           this.myselectedPlan = response.data.currentPlan
          //           this.paymentButtonLoading = false
          //         })
          //         }
          //         else{
          //           this.$store.dispatch('auth/mySubscription', {authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale}).then(response => {
          //           this.mySubscribedPlans = response.data.SubscriptionMaster? response.data.SubscriptionMaster : []
          //           //this.selectedSubscriptionId = this.mySubscribedPlans[0] ? this.mySubscribedPlans[0].subscriptionId : ''
          //           this.myselectedPlan = response.data.currentPlan
          //           this.paymentButtonLoading = false
          //         })
          //         }

          //       }else{
          //         this.$toast.success(response.data.code)
          //         this.paymentButtonLoading = false
          //       }
          //     })
          //   }
          // })
          }
        }else{
          this.$toast.error(this.$t('common.selectNewPlan'))
        }

    },
    goToPayment(){
      // this.$router.push(this.$store.getters['locale/getFinalUrl']('/applyDiscount'))
      if(this.myNewSelectedPlan.subscriptionId) {
        this.showDiscountPage = true;
      }else{
        this.$toast.error(this.$t('common.selectNewPlan'))
      }
    },
    backToSubscriptionPage(){
      this.showDiscountPage = false;
    },
    applyDiscount(){
      if(this.$refs.discountCode.value){
        var reqObject = {};
        reqObject.subscriptionId = this.myNewSelectedPlan.subscriptionId;
        reqObject.userId = this.$store.state.initialData.userId;
        reqObject.payeeUserId = this.$store.state.initialData.userId;
        reqObject.promoCode = "";
        reqObject.discountCodeId = this.$refs.discountCode.value;
        reqObject.email = this.$store.state.initialData.email;
        reqObject.phone = this.$store.state.initialData.phone;
        console.log("reqObject ",reqObject);
        // alert("1");
        this.$store.dispatch('auth/getPlanPriceSummary', {authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale ,reqObject:reqObject}).then(response => {
          if(response.data.discountCodeResponse.code === 'INVALID_DISCOUNT_CODE' || response.data.discountCodeResponse.code === 'INVALID_OR_EXPIRED_PROMO_CODE'){
            // alert("invalid");
            this.invalidDiscountCode = true;
          }
          else{
            this.invalidDiscountCode = false;
            this.discountApplied = true;
            console.log("finalDiscountOnDiscountCode ",response.data.finalDiscountOnDiscountCode);
            this.totalDiscount = response.data.finalDiscountOnDiscountCode;
            // this.finalcost = this.myNewSelectedPlan.cost-this.totalDiscount-(this.myNewSelectedPlan.cost*((this.myNewSelectedPlan.discount? this.myNewSelectedPlan.discount: 0)/100));
            // console.log("F cost" ,this.finalcost);
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
  },
  components: {
    swiper2,swiper3
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
.otherPlans .swiper-slide { width: 300px; display: inline-block}
</style>

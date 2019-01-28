<template>
<div style="display: block" >
        {{slideNum}}
   <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">





          <!-- <carousel :navigationEnabled=true :paginationEnabled=false :scrollPerPage=true :perPage=2 >
          <div class="swiper-slide" v-bind:class="{plan_1: plans.durationTypeString === 'M', plan_2: plans.durationTypeString === 'W', plan_3: plans.durationTypeString === 'D'}" v-for="(plans, index) in mySubscribedPlans" :key="plans.subscriptionId">-->


          <div class="swiper-slide" @click="selectNewPlan(plans)" v-for="(plans, index) in mySubscribedPlans" :key="plans.subscriptionId">
          <div class="subsrbPlan plan_1 mg-top-35 text-center" @click="changePlan(plans.subscriptionId)" v-bind:class="{plan_1: plans.durationTypeString === 'M', plan_2: plans.durationTypeString === 'W', plan_3: plans.durationTypeString === 'D'}">
            <div class="planHead">
                <!-- <p class="prePlanName"></p> -->
                <div class="mostPopularSec">{{plans.name}} </div>
               <h3 class="planDays">{{plans.duration}}
                 <span class="daysTxt" v-if="plans.durationTypeString === 'M'">{{plans.duration === 1? $t('register.month') : $t('register.months')}}</span>
                 <span class="daysTxt" v-if="plans.durationTypeString === 'W'">{{plans.duration === 1? $t('register.week') : $t('register.weeks')}}</span>
                 <span class="daysTxt" v-if="plans.durationTypeString === 'D'">{{plans.duration === 1? $t('register.day') : $t('register.days')}}</span>
                 {{$t('register.plan')}}
               </h3>
               <div class="planOfferSec">
               <h2 class="planPrice">{{plans.cost-(plans.cost*((plans.discount? plans.discount: 0)/100)) | floatDecimal}} <span class="planCurrecncy">{{plans.currency}}</span></h2>
                   <div class="planOldPrice" v-if="plans.discount">{{plans.cost}}{{plans.currency}}</div>
                   <!-- <p class="planSavedTxt">{{plans.discountMessage}}</p>
                   <div class="popularPlan">
                       {{plans.name}}
                   </div> -->
               </div>

               <div  class="planOffer">{{plans.discountMessage}}</div>



            </div>
           <!--  <ul class="planInfo">
               <li></li>
            </ul>
 -->

            <div class="subPlnfeatureSec">
              <!-- <h4 class="featureHeading">{{$t('mySubscription.features')}}</h4> -->
              <ul class="planInfo">
                <li v-for="description in plans.descriptions">{{description}}</li>
              </ul>
            </div>


             <div class="planSelectBtn">
              <div class="pos-rel-btn">
                <label class="radio">
               <input type="radio"  :value="plans.subscriptionId" v-model="selectedSubscriptionId" name="plan" class="customCheck">
               <div class="planSelect">
                 <span v-if="selectedSubscriptionId === plans.subscriptionId"><span class="checkedIcon"></span> {{$t('register.selected')}}</span>
                 <span v-else>{{$t('register.select')}}</span>
               </div>
             </label>
              </div>
            </div>
          </div>
        </div>




       </div>

     </div>
        <div class="swiper-button-prev" slot="button-prev"><i class="material-icons">&#xE314;</i></div>
        <div class="swiper-button-next" slot="button-next"><i class="material-icons">&#xE315;</i></div>

</div>
</template>

<script>
 export default {
     props: ['mySubscribedPlans', 'slideNum'],
     mounted () {
        
     },
    data() {
      return {
        page: {},
        afterRead: true,
        selectedSubscriptionId: '',
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
       }
      }
    },
    methods: {
        selectNewPlan(plan){
          this.$root.$emit('userSelectedPlan', {
                plan
            })     
        },
        changePlan (subscriptionId) {
        this.selectedSubscriptionId = subscriptionId
      }
    },
    filters: {
      floatDecimal: function(value) {
        return parseFloat(value).toFixed(2);
      }
    }
 }
</script>
<style>
.termsScroll table{ max-width: 100%!important}
.termsScroll div{ max-width: 100%!important}
/* .showTermsPopUp .modal-content { 
    max-height: 400px;
    overflow: auto;} */
    .termsScrollOuter {
    height: 220px;
    overflow-y: auto;
    padding: 0 30px 0 0;
}

    .termsScrollOuter  .termsScroll{ height: auto; overflow: visible; }

</style>
<template>
  <div class="conMidSec">

      <div class="subjectsRow clearfix">

	                <!-- <h2 class="slectPlanHeading">Hey Sara</h2> -->

	                <div class="planBoxsec clearfix">

                    <div class="row">

                      <div class="col-sm-4" v-for="plan in this.$store.state.auth.subscriptionPlan">
                          <a href="#" class="planBox">
                             <div class="planBox_upper">
                                  <div class="planPriceTag" v-if="plan.description === 'Top Selling'">Highest Selling</div>
                                <h3 class="planTime">{{plan.duration}} {{durationType(plan.durationTypeString)}}</h3>
                                <h3 class="planPrice"><sup>₹</sup>{{plan.cost}}</h3>
                             </div>
                             <div class="pos-rel-btn">
                               <label class="radio">
                                 <input type="radio" :value="plan" name="plan" v-model="selectedPlan.package" class="customCheck">
                                 <div class="planSelect">
                                  {{$t('buddy.select')}}
                                 </div>
                               </label>
                             </div>
                         </a>

                      </div>
                    </div>




	                </div>
	                <h2 class="planIncludeHeading">{{$t('buddy.plan_includes')}}</h2>
	                <div class="planIncludeSec clearfix">
	                     <div class="planIncldListingSec">
			                   <ul class="planIncldListing">
			                     <li><i class="planCheckIcon"></i> World class education brand resources</li>
			                     <li><i class="planCheckIcon"></i> Multi language support</li>
			                     <li><i class="planCheckIcon"></i> Study tracking tools</li>
			                   </ul>
			                   <ul class="planIncldListing">
			                     <li><i class="planCheckIcon"></i> Social media syncing</li>
			                     <li><i class="planCheckIcon"></i> Sharing posts and notes</li>
			                     <li><i class="planCheckIcon"></i> Making buddies</li>
			                   </ul>
			                   <ul class="planIncldListing">
			                     <li><i class="planCheckIcon"></i> Fun Games</li>
			                     <li><i class="planCheckIcon"></i> Personalisation</li>
			                   </ul>
			               </div>
	                   <div class="btnSec">
	                      <button class="btn add_notesBtn btnBig" @click="userRegistrationForm"> {{$t('buddy.get_started')}} </button>
	                    </div>
	                </div>



                   </div>
  </div>
</template>
<script>
export default {
    middleware: 'authenticated',
  data () {
    return {
      selectedPlan:{}
    }
  },
  mounted() {
    this.$store.dispatch('auth/subscription', {langCode: this.$store.state.locale.selectedLocale})
    this.$store.dispatch('sidebarregister/navChange',{key:1, plan:this.selectedPlan.package, userType:this.$store.state.register.userRegistrationData.userType})
  },
  layout: 'register',
  methods: {
    userRegistrationForm() {
      if(this.selectedPlan.package){
        let registrationUserType = this.$store.state.register.userRegistrationData.userType
        this.$store.dispatch('register/redirectToUserForm', {planId:this.selectedPlan.package})
        if(registrationUserType === 'STUDENT') {
          this.$router.push(this.$store.getters['locale/getFinalUrl'](`/studentRegister`))
        }else{
          this.$router.push(this.$store.getters['locale/getFinalUrl'](`/teacherRegister`))
        }
      }else{
        this.$toast.error(this.$t('toastMsg.planNeeded'))
      }

    },
    durationType (durationType) {
      if(durationType === 'W') {
        return 'Week'
      } else if (durationType === 'D') {
        return 'Day'
      } else if (durationType === 'M') {
        return 'Month'
      }
    }
  }
}
</script>

<style>
.temp_size {max-width: 99px;}
.pos-rel-btn{position: relative;float: left;width: 100%;}
.planSelect{z-index: -1;}
.radio input:checked + div{ background: #e54d8c!important;color:#fff;}
.radio{margin: 0px;}
.radio input{visibility:hidden;}
.planBox_upper {
    padding: 46px 0 0;
}
/*.customCheck{position: absolute;top:0px;left:0px;height:60px;visibility: hidden;width:100%;z-index: 99999;}*/
</style>

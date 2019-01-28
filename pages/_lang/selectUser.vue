<template>
  <div class="pageboxSubscribeOuter">
  <div class="contentSec pageboxSubscribe">
      <div class="scrollSec ">
        <div class="conMidSec">
         <div class="subjectsRow clearfix">
           <div class="subscribe_sec">
              <a href="#" class="logo"> Brand Logo </a>
              <h2 class="brandName">Brand Name</h2>
              <p class="regesterTxt">{{$t('register.register_learning')}}</p>
              <h3 class="subscribeAs">{{$t('register.subscribe_as')}}</h3>
              <div class="actionBtnsec clearfix">
                 <button class="btn btnStdnt btnLg" @click="selectStudent('STUDENT')"> {{$t('register.student')}} </button>
                 <button class="btn add_notesBtn btnLg btnTecher" @click="selectTeacher('TEACHER')"> {{$t('register.teacher')}} </button>
             </div>
             <div class="subsSignInSec">
               <a href="/login" class="subsSignIn">{{$t('register.sign_in')}}</a> |  <a href="#" class="subsSignIn">{{$t('register.free_trial')}}</a>
               <div class="trailInfo">
                 <i class="material-icons">info_outline</i>
                   <div class="infoContent">
                     {{$t('register.access_free_trial')}}
                     <br>
                     <a href="#" class="knowMore">{{$t('register.know_more')}}</a>
                   </div>
               </div>
             </div>
           </div>
             </div>
           </div>
  </div>
</div>
</div>

</template>
<script>
export default{
  layout:'registerUser',
  methods:{
    selectStudent(data) {
      this.$store.dispatch('register/redirectByUser',{userType:data, context:this})
    },
    selectTeacher(data) {
      this.$store.dispatch('register/redirectByUser',{userType:data, context:this})
    }
  }
}
</script>

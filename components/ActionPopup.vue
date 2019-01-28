<template>
  <div class="deletePostPop blockReportPostPop">
   <div class="deletePostPopInner">
     <a class="pclose" @click="hidePopup" ><span><i class="material-icons">&#xE5CD;</i></span></a>
      <div class="full-width" v-if="(dataParam.btnActionName !== 'block')&&(dataParam.btnActionName !== 'postReport' && dataParam.btnActionName !== 'profileReport')">
        <div class="buddy-img">
          <!-- <img :src="dataParam.dataObj.userPic?dataParam.dataObj.userPic:'/_nuxt/img/user_image.615fd56.png'" class="img "> -->
          <buddyProfileimg :profileImg="dataParam.dataObj"></buddyProfileimg>
        </div>
        <div class="text">
          <h4>{{$t('buddy.action_prompt')}} <span v-if="dataParam.btnActionName === 'accept'">{{$t('buddy.accept_request')}}</span>
            <span v-if="dataParam.btnActionName === 'decline'" >{{$t('buddy.decline_request')}}</span>
            <span v-if="dataParam.btnActionName === 'unfriend'">{{$t('buddy.unfriend_request')}}</span>
            <span v-if="dataParam.btnActionName  === 'cancel'">{{$t('buddy.cancel_user_request')}}</span>
            <span v-if="dataParam.btnActionName=== 'send'" >{{$t('buddy.send_request')}}</span>
            <span v-if="dataParam.btnActionName === 'unblock'">{{$t('buddy.unblock_request')}}</span>
            <span v-if="dataParam.btnActionName === 'reminder'">{{$t('buddy.send_reminder_request')}}</span>
             &nbsp;<strong>{{dataParam.dataObj.firstName}} {{dataParam.dataObj.lastName}} </strong> ?</h4>
        </div>
        <div class="btns">
           <customloader loaderClass="btn btn-primary" :loaderClick="finalBtnAction" :loaderDisabled="customButtonLoading" :loaderText="getButtonTitle()"></customloader>
           <!-- <button class="btn btn-primary" @click="finalBtnAction(dataParam)">
             <span v-if="dataParam.btnActionName === 'accept'">{{$t('buddy.accept')}}</span>
             <span v-if="dataParam.btnActionName === 'decline'">{{$t('buddy.decline')}}</span>
             <span v-if="dataParam.btnActionName === 'unfriend'">{{$store.getters['isTeacher']()? $t('teacher.remove') : $t('buddy.remove')}}</span>
             <span v-if="dataParam.btnActionName === 'cancel'">{{$t('buddy.cancel_request')}}</span>
             <span v-if="dataParam.btnActionName === 'send'">{{$store.getters['isTeacher']()? $t('buddy.add_contact') : $t('buddy.add_buddy') }}</span>
             <span v-if="dataParam.btnActionName === 'unblock'">{{$store.getters['isTeacher']()? $t('teacher.unblock') : $t('buddy.unblock')}}</span>
             <span v-if="dataParam.btnActionName === 'reminder'">{{$t('buddy.reminder')}}</span>
           </button> -->
          <button class="btn btn-bordered" @click="hidePopup">{{$t('note.cancel')}}</button>
        </div>
      </div>



      <!--Sep-->
        <div class="full-width" v-if="dataParam.btnActionName === 'block'">
          <div class="buddy-img">
            <buddyProfileimg :profileImg="dataParam.dataObj"></buddyProfileimg>
          </div>
          <div class="text">
        <h4>{{$t('buddy.block_prompt')}} <strong>{{dataParam.dataObj.firstName}} {{dataParam.dataObj.lastName}} </strong> ?</h4>

        <ul class="blockBullets">
          <li><i class="material-icons">&#xE5CD;</i> {{$t('buddy.action_bullet1')}}</li>
          <li><i class="material-icons">&#xE5CD;</i> {{$t('buddy.action_bullet2')}}</li>
          <li><i class="material-icons">&#xE5CD;</i> {{$t('buddy.action_bullet3')}}</li>
          <li><i class="material-icons">&#xE5CD;</i> {{$t('buddy.action_bullet4')}}</li>
        </ul>
      </div>
        <div class="btns">

          <button class="btn btn-bordered" @click="hidePopup">{{$t('note.cancel')}}</button>
           <!-- <button class="btn btn-primary" @click="finalBtnAction(dataParam)">{{$store.getters['isTeacher']()? $t('teacher.block') : $t('buddy.block')}}</button> -->
          <customloader loaderClass="btn btn-primary" :loaderClick="finalBtnAction" :loaderDisabled="customButtonLoading" :loaderText="$store.getters['isTeacher']()? 'teacher.block' : 'buddy.block'"></customloader>
        </div>
      </div>
      <div class="full-width" v-if="dataParam.btnActionName === 'postReport' || dataParam.btnActionName === 'profileReport'">
        <div class="buddy-img">
          <!-- {{dataParam}} -->
        </div>
        <div class="text">
      <h4>{{$t('buddy.report_abuse_prompt')}} ?</h4>

       <ul class="blockBullets">
        <li v-if="dataParam.btnActionName === 'postReport'" v-for="reason in this.$store.state.common.postReportReasons"><label class="control control--checkbox">
          <input type="radio"  name="reason" v-model="reportReason" :value="reason.name">
          <div class="control__indicator"></div>{{$t(reason.value)}}</label>
        </li>
        <li v-if="dataParam.btnActionName === 'profileReport'" v-for="reason in this.$store.state.common.profileReportReasons"><label class="control control--checkbox">
          <input type="radio"  name="reason" v-model="reportReason" :value="reason.name">
          <div class="control__indicator"></div>{{$t(reason.value)}}</label>
        </li>
        <li v-if="reportReason === 'Other'">
          <div class="control_indicator">
            <textarea v-model="customReason" class="form-control"></textarea>
          </div>
        </li>
      </ul>
    </div>
      <div class="btns">
        <button class="btn btn-bordered" @click="hidePopup">{{$t('note.cancel')}}</button>
        <customloader loaderClass="btn btn-primary" :loaderClick="finalReportAction" :loaderDisabled="customButtonLoading" loaderText="buddy.report_abuse"></customloader>
        <!-- <button class="btn btn-primary" @click="finalReportAction(dataParam,reportReason)">
          <span>{{$t('buddy.report_abuse')}}</span>
        </button> -->
      </div>
    </div>
   </div>


</div>
</template>
<script>
import buddyProfileimg from '~/components/view/buddyProfileimg'
export default{
    data() {
      return {
        reportReason: '',
        customReason: '',
        customButtonLoading: false
      }
    },
    components: {buddyProfileimg},
    props: ['dataParam','pageStatus'],
    methods: {
      getButtonTitle() {
             if (this.dataParam.btnActionName === 'accept') {
               return 'buddy.accept'
             } else if (this.dataParam.btnActionName === 'decline') {
               return 'buddy.decline'
             } else if (this.dataParam.btnActionName === 'unfriend') {
               return this.$store.getters['isTeacher']()|| this.$store.getters['isParent']()? 'teacher.remove' : 'buddy.remove'
             } else if (this.dataParam.btnActionName === 'cancel') {
               return 'buddy.cancel_request'
             } else if (this.dataParam.btnActionName === 'send') {
               return this.$store.getters['isTeacher']() || this.$store.getters['isParent']()?'buddy.add_contact' : 'buddy.add_buddy'
             } else if (this.dataParam.btnActionName === 'unblock') {
               return this.$store.getters['isTeacher']()|| this.$store.getters['isParent']()? 'teacher.unblock' : 'buddy.unblock'
             } else if (this.dataParam.btnActionName === 'reminder') {
               return 'buddy.reminder'
             }
      },
      finalBtnAction() {
        let value = this.dataParam
        this.customButtonLoading = true
        if(value.btnActionName === 'cancel') {
        this.$store.dispatch('newBuddyRequest/cancelBuddyRequest',{authToken:this.$store.state.auth.user.token, connectionId: value.dataObj.userId, pageStatus:value.pageStatus, langCode: this.$store.state.locale.selectedLocale}).then(response =>{
          this.customButtonLoading = false
          this.$root.$emit('hideActionPopup', {})
          if(response.data.status === 'SUCCESS') {
            let dataUser = value.dataObj.userId
            this.$root.$emit('buddyActionByUser',{dataUser})
            this.$root.$emit('actionToast', 'toastMsg.cancelBuddySuccess')

            // let vm = this
            // vm.$toast.success(vm.$t('toastMsg.cancelBuddySuccess'));
          }
        }, error => {
          this.customButtonLoading = false
        })

        }
        if(value.btnActionName === 'reminder') {
        this.$store.dispatch('newBuddyRequest/sendBuddyReminder',{authToken:this.$store.state.auth.user.token, connectionId: value.dataObj.userId, pageStatus:value.pageStatus, langCode: this.$store.state.locale.selectedLocale}).then(response =>{
          this.customButtonLoading = false
          this.$root.$emit('hideActionPopup', {})
          if(response.data.status === 'SUCCESS') {
            let dataUser = value.dataObj.userId
            this.$root.$emit('buddyActionByUser',{dataUser})
            this.$root.$emit('actionToast', 'toastMsg.buddyReminderSuccess')
            // let vm = this
            // vm.$toast.success(vm.$t('toastMsg.cancelBuddySuccess'));
          }
        }, error => {
          this.customButtonLoading = false
        })

        }
        if(value.btnActionName === 'send') {
          this.$store.dispatch('newBuddyRequest/sendBuddyRequest', {authToken: this.$store.state.auth.user.token,connectionId: value.dataObj.userId, pageStatus:value.pageStatus, langCode: this.$store.state.locale.selectedLocale}).then(response =>{
            this.customButtonLoading = false
            this.$root.$emit('hideActionPopup', {})
            if(response.data.status === 'SUCCESS') {
              let dataUser = value.dataObj.userId
              this.$root.$emit('buddyActionByUser',{dataUser})
              this.$root.$emit('actionToast', 'toastMsg.addBuddySuccess')
            }
          }, error => {
            this.customButtonLoading = false
          })
        }
        if(value.btnActionName === 'decline') {
          this.$store.dispatch('newBuddyRequest/declineBuddyRequest', {authToken: this.$store.state.auth.user.token,connectionId: value.dataObj.userId, pageStatus:value.pageStatus, langCode: this.$store.state.locale.selectedLocale}).then(response =>{
            this.customButtonLoading = false
            this.$root.$emit('hideActionPopup', {})
            if(response.data.status === 'SUCCESS') {
              // this.$toast.success(this.$t('toastMsg.declineBuddySuccess'));
              let dataUser = value.dataObj.userId
              this.$root.$emit('buddyActionByUser',{dataUser})
              this.$root.$emit('actionToast', (this.$store.getters['isTeacher']() || this.$store.getters['isParent']()? 'teacher.declineBuddySuccess' : 'toastMsg.declineBuddySuccess'))

            }
          }, error => {
            this.customButtonLoading = false
          })
        }
        if(value.btnActionName === 'unfriend') {
          this.$store.dispatch('newBuddyRequest/unfriendMyBuddy',{authToken:this.$store.state.auth.user.token, connectionId: value.dataObj.userId, pageStatus:value.pageStatus, langCode: this.$store.state.locale.selectedLocale}).then(response =>{
            this.customButtonLoading = false
            this.$root.$emit('hideActionPopup', {})
            if(response.data.status === 'SUCCESS') {
              // this.$toast.success(this.$t('toastMsg.unfriendBuddySuccess'));
              let dataUser = value.dataObj.userId
              this.$root.$emit('buddyActionByUser',{dataUser})
              this.$root.$emit('actionToast', (this.$store.getters['isTeacher']() || this.$store.getters['isParent']()? 'teacher.unfriendBuddySuccess' : 'toastMsg.unfriendBuddySuccess'))
            }
          }, error => {
            this.customButtonLoading = false
          })
        }
        if(value.btnActionName === 'accept') {
          this.$store.dispatch('newBuddyRequest/approveBuddyRequest', {authToken: this.$store.state.auth.user.token,connectionId: value.dataObj.userId, pageStatus:value.pageStatus, langCode: this.$store.state.locale.selectedLocale}).then(response =>{
            this.customButtonLoading = false
            this.$root.$emit('hideActionPopup', {})
            if(response.data.status === 'SUCCESS') {
              // this.$toast.success(this.$t('toastMsg.acceptBuddySuccess'));
              let data = value.dataObj.firstName + ' ' + value.dataObj.lastName
              let dataUser = value.dataObj.userId
              this.$root.$emit('buddyActionByUser',{dataUser})
              this.$root.$emit('showAddedBuddySuccess', {data})
              this.$root.$emit('actionToast', (this.$store.getters['isTeacher']()|| this.$store.getters['isParent']()? 'teacher.acceptBuddySuccess' : 'toastMsg.acceptBuddySuccess'))

            }
          }, error => {
            this.customButtonLoading = false
          })
        }
        if(value.btnActionName === 'block') {
          this.$store.dispatch('newBuddyRequest/blockBuddy',{authToken:this.$store.state.auth.user.token, connectionId: value.dataObj.userId, langCode: this.$store.state.locale.selectedLocale, pageStatus: value.pagestatus})
          .then((response) => {
            this.customButtonLoading = false
            this.$root.$emit('hideActionPopup', {})
            this.$root.$emit('buddyActionByUser',{})
            this.$root.$emit('actionToast', (this.$store.getters['isTeacher']() || this.$store.getters['isParent']()? 'teacher.block_success' : 'buddy.block_success'))
          },(error) => {
            this.customButtonLoading = false
            // this.$toast.error(this.$t('post.delete_error'), error)
          })
        }
        if(value.btnActionName === 'unblock') {
          let pageUserStatus = ''
          if(value.pageStatus) {
            pageUserStatus = value.pageStatus
          }else{
            pageUserStatus = value.pagestatus
          }
          this.$store.dispatch('newBuddyRequest/unblockBuddy',{authToken:this.$store.state.auth.user.token, connectionId: value.dataObj.userId, langCode: this.$store.state.locale.selectedLocale,pageStatus:pageUserStatus})
          .then((response) => {
            this.customButtonLoading = false
            this.$root.$emit('hideActionPopup', {})
            this.$root.$emit('buddyActionByUser',{})
            this.$root.$emit('actionToast', this.$store.getters['isTeacher']() || this.$store.getters['isParent']()? 'teacher.unblock_success' : 'buddy.unblock_success')
          },(error) => {
              this.customButtonLoading = false
            // this.$toast.error(this.$t('post.delete_error'), error)
          })
        }
      },

      finalReportAction() {
        let data = this.dataParam
        let reason = this.reportReason
        let abuseObjectType = ''
        let userObjId = ''
        let customReasonData = ''
        let reportedByUser = ''
        if(this.reportReason === 'Other') {
          customReasonData = this.customReason
        }else {
          customReasonData = this.reportReason
        }
        if(data.btnActionName === 'profileReport') {
          abuseObjectType = 'Profile'
          userObjId = data.dataObj.userId
          reportedByUser = data.dataObj.userId
        }else {
          abuseObjectType = 'Post'
          userObjId = data.dataObj.postId
          reportedByUser = data.dataObj.userid
        }
        let vm = this
        let payload = {
          abuseObject : abuseObjectType,
          objectId: userObjId,
          abuseReporter: {
            reportedBy : this.$store.state.initialData.firstName+' '+this.$store.state.initialData.lastName,
            userId:reportedByUser,
            abuseType : customReasonData
          }
        }
        if(customReasonData === '') {
          this.$toast.error(this.$t('buddy.report_reason'))
        }else{
          this.customButtonLoading = true
          this.$store.dispatch('common/ReportAbuse',{authToken:this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale,  payload: payload})
          .then((response) => {
            this.customButtonLoading = false
            this.$root.$emit('hideActionPopup', {})
            //this.$toast.success(vm.$store.getters['isTeacher']()? vm.$t('teacher.report_success') : vm.$t('buddy.report_success'))
          },(error) => {
            this.customButtonLoading = false
            // this.$toast.error(this.$t('post.delete_error'), error)
          })
        }

      },
      hidePopup() {
        this.$root.$emit('hideActionPopup', {})
      }
    }
  }

</script>

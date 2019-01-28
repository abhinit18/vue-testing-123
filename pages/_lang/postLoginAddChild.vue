<template>
   <div>
      <div class="registerStepsPages parentAddChildPageAfterLogin">
         <div class="registerStepsPagesInner">
            <div class="registerStepsPagesInner2">
               <div class="parentLoginForm">
                     <!-- <div class="geometryBgLeft"></div>
                     <div class="geometryBgRight"></div> -->
                     <div class="loginimg5"></div>
                     <div class="loginimg6"></div>

                           <!-- <a class="pclose" @click="closePopup"><span><i class="material-icons">&#xE5CD;</i></span>{{$t('settings.close')}}</a>
						    v-on-click-outside="clickOutsideAutoComplete"
						    -->
                           <div class="parentLoginFormInner">
	                             <h2 class="subscHeading">{{$t('parentLog.addChild')}}</h2>
	                             <p class="formInstrcTxt">
	                             {{$t('parentLog.underHdText1')}}<br> {{$t('parentLog.underHdText2')}}</p>
	                              <div class="megaSearch">
		                              <div class="searchBox" style="z-index:9;">
		                                 <input type="text"  class="form-control " :placeholder="$t('search.subject_Wardname')" v-model="query">
		                                 <button class="btn btn-primary" @click="changeSearchBar">{{$t('search.search')}}</button>
		                              </div>
	                             </div>
	                             <div class="parentStuCardSec">
		                             <div class="parentStuCard" v-if="this.responseData !== ''">
		                                <div class="parentStuHeadSec">
		                                   <button type="button" @click="hideResult" class="btn btn-link closeBtn">
		                                   <i class="material-icons">close</i></button>
		                                   <p class="parentStuName">{{responseData.userName}}</p>
		                                </div>
		                                <div class="parntStuCardInner">
		                                   <p class="parentStuInfoTxt">{{$t('register.grade')}} : {{responseData.grade[0]}}</p>
		                                   <p class="parentStuInfoTxt">{{$t('settings.school')}} :  {{responseData.school}}</p>
		                                   <p class="parentStuInfoTxt">{{$t('settings.city')}} :  {{responseData.city}}</p>
		                                   <p class="parentStuInfoTxt">{{$t('register.phone')}}  :  {{responseData.phone}}</p>
		                                   <p class="parentStuInfoTxt">{{responseData.email}}</p>
		                                </div>
		                                  <div class="btmActionBtnSec">
		                                     <button type="button" class="btn btn-primary btmActionBtn" @click="StudentAdd">ADD</button>
		                                  </div>
		                             </div>
		                             <div class="parentStuCard" v-for="student in this.$store.state.parentStore.selectedStudentList">
		                                <div class="parentStuHeadSec">
		                                   <button type="button" @click="removeTempStudent(student)" class="btn btn-link closeBtn">
		                                   <i class="material-icons">close</i></button>
		                                   <p class="parentStuName">{{student.userName}}</p>
		                                </div>
		                                <div class="parntStuCardInner">
		                                   <p class="parentStuInfoTxt">{{$t('register.grade')}} : {{student.grade[0]}}</p>
		                                   <p class="parentStuInfoTxt">{{$t('settings.school')}} :  {{student.school}}</p>
		                                   <p class="parentStuInfoTxt">{{$t('settings.city')}} :  {{student.city}}</p>
		                                   <p class="parentStuInfoTxt">{{$t('register.phone')}}  :  {{student.phone}}</p>
		                                   <p class="parentStuInfoTxt">{{student.email}}</p>
		                                </div>
		                                <div class="btmActionBtnSec">
		                                   <button type="button" class="btn btn-primary btmActionBtn btnAdded">
		                                     <i class="material-icons doneRounIcon">check_circle</i>{{$t('parentLog.added')}}
		                                   </button>
		                                </div>
		                             </div>
		                              <div class="parentStuCard" v-if="studentByParentRegister">
		                                <div class="parentStuHeadSec">
		                                   <button type="button" @click="studentByParentRegister = false" class="btn btn-link closeBtn">
		                                   <i class="material-icons" >close</i></button>
		                                   <p class="parentStuName">{{$t('parentLog.noResult')}}</p>
		                                </div>
		                                <div class="parntStuCardInner">
		                                   <p class="resultStatusTxt">
		                                   	{{$t('parentLog.noResultTxt1')}} <span class="heightlightTxt">{{query}}</span> <br>
		                                   	{{$t('parentLog.noResultTxt2')}}
		                                   </p>

		                                </div>
		                                <div class="btmActionBtnSec">
		                                    <button type="button" @click="subscribeChild(true,3)" class="btn btn-primary btmActionBtn">
		                                     {{$t('parentLog.sub')}}
		                                   </button>
		                                </div>
		                             </div>



		                           </div>
                           </div>
                           <!-- <div class="megaSearch">
                              <h3 class="smallHeading">{{$t('search.search')}}</h3>
                              <div class="searchBox" v-on-click-outside="clickOutsideAutoComplete">
                                 <i class="material-icons">&#xE8B6;</i>
                                 <input type="text"  class="form-control " :placeholder="$t('search.subject_Wardname')" v-model="query">
                                 <i class="material-icons closeit" v-if="query" @click="clearSearchBar">&#xE5CD;</i>
                                 <button class="btn btn-primary" @click="changeSearchBar">{{$t('search.search')}}</button>
                              </div>
                           </div> -->

                           <!-- <div class="otpModel" v-if="otpForm">
                              <div class="deletePostPop blockReportPostPop">
                                 <div class="deletePostPopInner">
                                    <div class="full-width">
                                       <div class="text">
                                          <div class="full-width">
                                             <div class="inputRow">
                                                <label>{{$t('register.enter_otp')}}   <span class="req">*</span></label>
                                                <div class="formControlOuter">
                                                   <input type="text"  class="formControl">
                                                </div>
                                                <br>
                                                <div class="formControlOuter clearfix">
                                                   <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 padding0">
                                                      <a class="btn btn-link" >{{$t('register.resend_otp')}}</a>
                                                   </div>
                                                   <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 padding0">
                                                      <customloader loaderClass="btn btn-primary btn-block" :loaderClick="verifyOtpForMobileNumer" :loaderDisabled="verifyOtpButtonLoading" loaderText="register.verify_otp"></customloader>
                                                       <button class="btn btn-primary btn-block" @click="verifyOtpForMobileNumer">{{$t('register.verify_otp')}}</button> -->
                                                   <!-- </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>  -->
                           <!-- <div class="otpModel" v-if="studentByParentRegister">
                              <div class="deletePostPop blockReportPostPop">
                                 <div class="deletePostPopInner">
                                    <div class="full-width">
                                       <div class="text">
                                          <h4 class="text-center">
                                             Do you want to register the student ?
                                          </h4>
                                          <div class="full-width">
                                             <div class="inputRow text-center">
                                                Do you have promocode ?
                                                <div class="formControlOuter">
                                                   <div class="proCodeInput">
                                                      <span class="verifiedIco" v-if="appliedPromo"></span>
                                                      <input type="text"  class="formControl">
                                                      <button class="btn btn-default" >{{$t('common.apply')}}</button>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                          <div class="full-width">
                                             <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <button class="btn btn-primary" @click="studentByParentRegister = false">cancel</button>
                                                <button class="btn btn-primary" >Yes</button>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div> -->


               </div>
               <div class="btns subscNextBtnSec clearfix" v-if="$store.state.parentStore.selectedStudentList.length > 0">
                    <button class="btn nextBtnNew" @click="openConfirmPopUp()">{{$t('register.next')}}</button>
                </div>
            </div>
         </div>
      </div>
      <div class="abcOverlay" v-if="registerByParent">
          <div class="parentStuCardSec abcOverlayInner">
           <!-- verification popup box-->
		                              <div class="parentStuCard" v-if="selectedPopup === 1">
		                                <div class="parentStuHeadSec">
		                                   <button type="button" @click="closeStudentMobileVerification()" class="btn btn-link closeBtn">
		                                   <i class="material-icons">close</i></button>
		                                   <p class="parentStuName">{{$t('parentLog.verification')}}</p>
		                                </div>
		                                <div class="parntStuCardInner">
		                                   <p class="resultStatusPopTxt">
		                                   	{{$t('parentLog.popTxt1')}}<br> {{$t('parentLog.popTxt2')}}
		                                   </p>
		                                   <div class="regFormElements">
		                                     <div class="form-group">
		                                       <input type="text" class="formControl" @keypress="isNumber" maxlength="4" v-model="otpInput" placeholder="xxxx">
		                                     </div>
		                                   </div>
		                                </div>
		                                <div class="btmActionBtnSec text-right">
		                                	<countDown v-if="$store.state.register.otpTimer == true"></countDown>
		                                    <button v-else type="button" @click="sendOtpToStudentMobileNumer(true)" class="btn btn-link btmActionBtn">
		                                     {{$t('register.resend_otp')}}
		                                   </button>
		                                    <button type="button" @click="verifyOtpForMobileNumer" class="btn btn-primary btmActionBtn">
		                                     {{$t('register.verify_otp')}}
		                                   </button>
		                                </div>
		                             </div>
		                             <!-- congratulation popup box -->
		                             <div class="congratesBox" style="position:relative;" v-if="selectedPopup === 2">
                                   <button type="button" @click="closeVerifiedPopup" class="btn btn-link congo-btn closeBtn">
		                                   <i class="material-icons">close</i></button>
		                               <div class="congrateBoxContnt">
			                                <div class="congrateTxtSec">
			                                  <i class="material-icons doneRounIcon">check_circle</i> {{$t('parentLog.congrats')}}
			                                </div>
		                                  <p class="text-center">{{$t('parentLog.verified')}}</p>
		                                </div>
		                             </div>
                                 <div class="congratesBox" style="position:relative;" v-if="selectedPopup === 3">
                                   <button type="button" @click="registerByParent = false" class="btn btn-link congo-btn closeBtn">
		                                   <i class="material-icons">close</i></button>
		                               <div class="congrateBoxContnt">
			                                <div class="congrateTxtSec">
			                                  {{$t('parentLog.noResult')}}
			                                </div>
			                                <p v-if="isItTour === true" class="text-center">{{$t('parentLog.noChildTour')}}</p>
		                                  <p v-else class="text-center">{{$t('parentLog.noChild')}}</p>
		                                  <div class="text-center">
		                                  	<button type="button" @click="goToRegister" class="btn btn-primary btmActionBtn">
		                                   {{$t('parentLog.sub')}}</button>
		                                	</div>
		                                </div>
		                             </div>
                                 <div class="congratesBox" style="position:relative;" v-if="selectedPopup === 4">
                                   <button type="button" @click="registerByParent = false" class="btn btn-link congo-btn closeBtn">
		                                   <i class="material-icons">close</i></button>
                                       <div class="congrateBoxContnt">
                                        <div class="congrateTxtSec">
                                          {{$t('parentLog.confirmPrompt')}}
                                        </div>
                                        <p class="text-center">{{$t('parentLog.confirmPromptText')}}</p>
                                      </div>
                                      <div class="btmActionBtnSec text-right">
                                          <button type="button" @click="registerByParent = false" class="btn btn-link btmActionBtn">
                                          {{$t('common.cancel')}}
                                        </button>
                                          <button type="button" @click="goTo()" class="btn btn-primary btmActionBtn">
                                          {{$t('onboarding.done')}}
                                        </button>
                                      </div>
		                             </div>
		                             <!-- promo code popup box -->
		                             <!-- <div class="parentStuCard" v-if="selectedPopup === 3">
		                                <div class="parentStuHeadSec">
		                                   <i class="material-icons icon_info">error_outline</i>
		                                   <p class="parentStuName">Promo Code</p>
		                                </div>
		                                <div class="parntStuCardInner">
		                                   <p class="resultStatusPopTxt">
		                                   	Got Promocode ?
		                                   </p>
		                                   <div class="regFormElements">
		                                     <div class="form-group">
		                                       <input type="text" class="formControl" :placeholder="$t('register.enter_promo_code')" @input="changePromoCode">
		                                     </div>
		                                   </div>
		                                </div>
		                                <div class="btmActionBtnSec text-right">
		                                    <button type="button" @click="gotoStudentRegister" class="btn btn-link btmActionBtn">
		                                     SKIP
		                                   </button>
		                                    <button type="button" @click="applyPromocode" class="btn btn-primary btmActionBtn">
		                                     Apply
		                                   </button>
		                                </div>
		                             </div> -->
		                </div>
      </div>
   </div>
</template>
<script>
    import countDown from '~/components/countDown'
   export default {
    //   middleware: 'anonymous',
   	mounted () {
   		// this.fetchResults()
	   },
   	head () {
   		return {
   		title: this.$t('search.search')
   		}
   	},
   	layout: 'default',
   	components: {countDown},
   	data() {
   		return {
   			autoCompletePageSize: 3,
   			query: '',
			otpInput: '',
			selectedPopup: '',
   			enteredPromocode: '',
   			selectedType: 'ALL',
            data: [],
            autoComplete: [],
			otpForm: false,
			registerByParent: false,
   			studentByParentRegister: false,
   			verifyOtpButtonLoading: false,
   			payloadDataObj: {},
   			responseData: '',
			maxAllowedCharacters: 2000,
            saveButtonLoading: false,
            verifyOtpButtonLoading: false,
            promoWithPrincipalValid: false,
            emailValid: false,
            phoneValid: false,
            emailId: '',
            phone: '',
            otpInput: '',
            isItTour: false

   		}
	},
	mounted() {
		if(this.$store.state.currentSelectedChild&&this.$store.state.currentSelectedChild.expiryDays <= 0) {
          this.$root.$emit('childExpiryPopUp', {
          byParent: this.$store.state.currentSelectedChild.expiryDays,
          bySubs: this.$router.currentRoute.path
      })
      }
      if(window.localStorage.getItem('isItTour') === 'true'){
      	// alert("yo");
      	this.isItTour = true;
      	// localStorage.removeItem('isItTour');
      	window.localStorage.setItem('isItTour',false);
      }
	},
   	methods: {
   		clickOutsideAutoComplete () {
   			if (this.autoComplete.length>0) {

   			}
       },
       closeStudentMobileVerification(){
        this.otpInput = ''
        this.registerByParent = false
       },
       closeVerifiedPopup() {
        this.selectedPopup = 1
        this.registerByParent = false
       },
   		closePopup() {
   			this.$router.push(this.$store.getters['locale/getFinalUrl'](`/`))
   		},
   		changeTab(code, force) {
   			if (this.selectedType!==code) {
   				this.selectedType = code

   			} else if (force) {

   			}
		},
		subscribeChild(data,value) {
			this.registerByParent = true
			this.selectedPopup = value
    },
    hideResult() {
      this.responseData = ''
    },
    openConfirmPopUp() {
      this.registerByParent = true
      this.selectedPopup = 4
    },
   		changeSearchBar () {
   			if (this.query.length>=3) {
           var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (this.query === "") {
            this.$toast.error(this.$t('toastMsg.emailPhone_validation'))

            return false;
          } else if (isNaN(this.query)) {

            if (!(this.query.match(mailformat))) {
              this.$toast.error(this.$t('toastMsg.email_validation'))
              return false;
            } else {
              this.fetchAutoComplete ()
            }
          } else {
            if (this.query.length != 10) {
              this.$toast.error(this.$t('toastMsg.phone_validation'))
              return false;
            } else {
              this.fetchAutoComplete ()
            }
          }

   			}
       },
       removeTempStudent(data) {
        this.$store.dispatch('parentStore/removeTempChild', {parentsWardList: data})
       },
        fetchAutoComplete() {
          let query = this.query
          this.$store.dispatch('register/fetchParentsWard', {
            langCode: this.$store.state.locale.selectedLocale,
            query
          }).then(response => {
            if(response.data.status === 'SUCCESS') {
              let tempExistChildObjData = this.$store.state.initialData.children.map(data =>{
                return data.id
              })
              if(tempExistChildObjData.indexOf(response.data.userId) !== -1){
                this.$toast.error('This child is already added to your account')
              }else{
                this.responseData = response.data
                this.studentByParentRegister = false
              }
              this.query = ''
            }else {
            if(response.data.code === 'NO_USERS_EXIST_WITH_GIVEN_PHONE_NUMBER' || 'NO_USERS_EXIST_WITH_GIVEN_EMAIL_ADDRESS') {
              this.studentByParentRegister = true
            }if(!response.data.message) {
              this.$toast.error(response.data.code);
            }else{
              this.$toast.error(response.data.message);
            }

            }
          })
   		},
   		isNumber: function(evt) {
   			evt = (evt) ? evt : window.event;
   			var charCode = (evt.which) ? evt.which : evt.keyCode;
   			if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
   				evt.preventDefault()
   			} else {
   				return true;
   			}
   		},
   		clearSearchBar () {
   			this.query = ''
   		},
   		StudentAdd() {
   			this.sendOtpToStudentMobileNumer()
   		},
   		sendOtpToStudentMobileNumer(value) {
   			let childId = this.responseData.userId
   			this.otpForm = true
   			this.$store.dispatch('register/sendChildOtp', {
   				langCode: this.$store.state.locale.selectedLocale,
   				childId
   			}).then(response => {
   				if(response.data.httpStatus === 200) {
             if(!value) {
              this.subscribeChild(true,1)
             }
             //this.$toast.success(this.$t('toastMsg.otp_success'))
   				}
   			})
   		},
   		verifyOtpForMobileNumer() {
         if(this.otpInput){
            this.verifyOtpButtonLoading = true
            let childId = this.responseData.userId
            this.$store.dispatch('register/verifyChildOtp', {
              langCode: this.$store.state.locale.selectedLocale,
              otp: this.otpInput,
              childId
            }).then(response => {
              if(response.data.status === 'SUCCESS') {
                this.subscribeChild(true,2)
                if(this.autoComplete.indexOf(this.responseData.userId) === -1){
                  this.autoComplete.push(this.responseData)
                }
                this.$store.dispatch('parentStore/parentsWardList', {
                  parentsWardList: this.autoComplete
                })
                this.verifyOtpButtonLoading = false
                this.otpForm = false
                this.responseData = ''
                this.otpInput = ''
                this.query = ''
                //this.$toast.success(this.$t('toastMsg.otp_validated'))
              }else {
                this.$toast.error(response.data.message)
                this.verifyOtpButtonLoading = false
              }
            })
         }else{
            this.$toast.error('Please enter OTP')
         }

   		},
		//    ================== methods for parent registration ============== //
      goTo() {
        //  to toggle button name according to plan whether free or paymentId
        if(this.$store.state.parentStore.selectedStudentList.length === 0) {
          this.$toast.error('Please search and select the student.')
        }else{
          let payload = []
          let tempChildList = this.$store.state.parentStore.selectedStudentList
          for(let i = 0;i< tempChildList.length;i++){
              let userid = tempChildList[i].userId
              payload.push(userid)
          }
          this.$store.dispatch('setting/addChildren', {
              langCode: this.$store.state.locale.selectedLocale,
              payload,
              authToken: this.$store.state.auth.user.token,
              childrenList: this.childrenArray
          }).then(response => {
              if(response.data.status === 'SUCCESS') {
                  // alert('student added')
                  // this.showAddChildPopUp = false
                  this.logout()
              }else {
                if(response.data.message){
                  this.$toast.error(response.data.message)
                }else{
                  this.$toast.error(response.data.code)
                }


              }
          })
          }
      },
      logout() {
        // exit zopim
        $zopim(function() {
          $zopim.livechat.hideAll();
          $zopim.livechat.clearAll();
        });
        let userId = this.$store.state.initialData.userId
        this.$store.dispatch('auth/logout', {
          deviceId: 'WEB',
          userId: userId,
          context: this,
          langCode: this.$store.state.locale.selectedLocale
        }).then((response) => {
          this.$store.dispatch('parentStore/emptyList')
          if(window.localStorage.getItem('tour')){
          	// this.isItTour = true;
            this.$router.push(this.$store.getters['locale/getFinalUrl']('/marketing'))
          }else{
            this.$router.push(this.$store.getters['locale/getFinalUrl']('/login'))
          }

          //location.reload()
        })
      },
      sendOtpToMobileNumer() {
        // else if (!this.getCountryCode) {
        //   this.$toast.error(this.$t('toastMsg.countrycode_validation'))
        // }

        if (!this.phoneValid) {
          this.$toast.error(this.$t('toastMsg.phone_validation'))
        }else if ((this.emailId === '')|| (this.phone === '')) {
          this.$toast.error(this.$t('toastMsg.emailPhone_validation'))
        }
         else if (!this.emailValid && this.emailId !== '') {
          this.$toast.error(this.$t('toastMsg.email_validation'))
        }  else {
          this.$store.dispatch('auth/phoneVerify', {
            principal: this.phone,
            langCode: this.$store.state.locale.selectedLocale
          }).then(response => {
            if (response.data.status === 'SUCCESS') {
              this.$toast.success(this.$t('toastMsg.otp_success'))
              if (this.tab2View === 1) {
                this.tab2View = 2
              }
            } else {
              this.$toast.error(this.$t('toastMsg.otp_fail'))
            }
          })
        }
      },
      goToRegister(){
      	// alert("1");
      	$zopim(function() {
          $zopim.livechat.hideAll();
          $zopim.livechat.clearAll();
        });
        let userId = this.$store.state.initialData.userId
        this.$store.dispatch('auth/logout', {
          deviceId: 'WEB',
          userId: userId,
          context: this,
          langCode: this.$store.state.locale.selectedLocale
        }).then((response) => {
            this.$router.push(this.$store.getters['locale/getFinalUrl']('/register'))
          })
        }
      // selectedDate() {
      //   let difference = Math.floor((new Date().getTime() - new Date(this.dob).getTime()) / 31557600000);
      //   if (difference < 13) {
      //     this.showParentsId = true;
      //   } else {
      //     this.showParentsId = false;
      //   }
      // },
	}

   }
</script>
<style>
   .studyPopUpPage {
   top: 20px;
   position: fixed;
   }
   .onlyOneLink {
   width: 100%
   }
   .whenOnlyLeft {
   text-align: left!important;
   }
   .whenOnlyLeft .material-icons {
   float: left!important;
   margin: 0 0 0 -30px!important;
   }
   .video_thumbnail {
   max-height: 133px
   }
   #columns {
   column-width: 320px;
   column-gap: 15px;
   width: 90%;
   max-width: 1100px;
   margin: 50px auto;
   }
   div#columns figure {
   background: #fefefe;
   border: 2px solid #fcfcfc;
   box-shadow: 0 1px 2px rgba(34, 25, 25, 0.4);
   margin: 0 2px 15px;
   padding: 1px;
   padding-bottom: 10px;
   transition: opacity .4s ease-in-out;
   display: inline-block;
   column-break-inside: avoid;
   }
   div#columns figure img {
   width: 100%; height: auto;
   border-bottom: 1px solid #ccc;
   padding-bottom: 15px;
   margin-bottom: 5px;
   }
   div#columns figure figcaption {
   font-size: .9rem;
   color: #444;
   line-height: 1.5;
   }
   div#columns small {
   font-size: 1rem;
   float: right;
   text-transform: uppercase;
   color: #aaa;
   }
   div#columns small a {
   color: #666;
   text-decoration: none;
   transition: .4s color;
   }
   div#columns:hover figure:not(:hover) {
   opacity: 0.4;
   }
   .padding10{padding: 0 10px 0 10px;}
   @media screen and (max-width: 750px) {
   #columns { column-gap: 0px; }
   #columns figure { width: 100%; }
   }
   .rotateArrow {
    transform: rotate(180deg);
  }

  .customDate input {
    border-color: transparent;
  }

  .planSelect {
    z-index: -1;
  }

  .radio {
    margin: 0px;
  }

  .radio input {
    visibility: hidden;
  }

  .pos-rel-btn {
    position: relative;
    float: left;
    width: 100%;
  }

  .padding0 {
    padding: 0px;
  }

  .termsScroll {
    height: 220px;
    overflow-y: auto; padding:0 30px 0 0
  }
  .congo-btn{position:absolute;top:2px;right:10px;}
  .filterListOpt{
  	box-shadow: 0 0 6px lightgray;position: absolute;width: 100%;z-index: 9;background: #fff;
  }
  .filterListOpt li{padding: 5px;}
  .filterListOpt li:hover{
  	background: lightgray;
  }

</style>

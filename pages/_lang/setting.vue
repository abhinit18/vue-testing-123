<template>
	<div class="settingPageSec">

		<a class="pclose" @click="closePopup"><span><i class="material-icons">&#xE5CD;</i></span>{{$t('settings.close')}}</a>

		<div class="settingSec">

			<h4 class="smallHeading">{{$t('settings.settings')}}</h4>
			<div class="settingSecInner">
				<div class="settingTab">
					<h5 @click="toggleGeneralSettings" class="headingBordered"><span class="headingTitle"> {{$t('settings.general_settings')}}</span> </h5>
					<div class="tabCon">

						<!-- <h6>{{this.$store.state.initialData.email}}</h6> -->
						<ul class="gsetting">

						<li v-if="$store.getters['isNotTeacherParent']()">
							<div class="clearfix">
								<label>Grade</label></span>
								<div class="value">{{$store.state.initialData.grades[0].name}}</div>
							</div>
						</li>

							<li>
								<div class="clearfix">
									<span v-if="$store.state.initialData.email"><a @click="changeUserEmail"  class="edit">
										<span v-if="!changeEmail">{{$t('note.edit')}}</span>
										<span v-if="changeEmail">{{$t('note.close')}}</span>
									</a> <label>{{$t('settings.email')}}</label>
									</span>
									<span v-if="!$store.state.initialData.email"><a @click="addUserEmail"   class="edit">
										<span v-if="!changeEmail">{{$t('note.add')}}</span>
										<span v-if="changeEmail">{{$t('note.close')}}</span>
									</a> <label>{{$t('settings.email')}}</label></span>
									<div class="value">{{$store.state.initialData.email}}</div>
								</div>
								<div class="editFieledsBox clearfix" v-if="changeEmail">
									<!-- <p >We have sent you an OTP. </p> -->
									<div class="sendOtpRow clearfix" v-if="emailOtpBtn">
										<countDown v-if="$store.state.auth.otpTimer == true"></countDown>
										<button v-else class="btn btn-primary btn-small" @click="otpToUser">{{$t('register.resend_otp')}}</button>
									</div>
									<div class="form-group" v-if="verifyEmailOtp">
										<label>{{$t('register.enter_otp')}}</label>
										<input type="text" @keypress="isNumber" maxlength="4" v-model="changeEmailOtpVerification" class="form-control">
										<button class="btn verifyBtn" @click="verifySentOtp">{{$t('register.verify_otp')}}</button>
									</div>

									<div class="form-group" v-if="changeEmailIdFormShow">
										<label>{{$t('settings.enter_new_emailid')}}</label>
										<input type="text" class="form-control" v-model="changeCurrentEmail" placeholder="example@gmail.com">
									</div>
									<div class="saveBtns clearfix" v-if="changeEmailIdFormShow">
										<button class="btn btn-primary pull-right" @click="changePrincipal('email')">{{$t('common.save')}}</button>
									</div>
								</div>
							</li>

							<!-- <li><a class="edit">{{$t('note.edit')}}</a> <label>{{$t('settings.city')}}</label>
								<div class="value">Almaty, Kazakhstan</div>
							</li> -->

							<li>
								<a @click="sendPasswordOTP" class="edit">
										<span v-if="!changePasswordText">{{$t('note.edit')}}</span>
										<span v-if="changePasswordText">{{$t('note.close')}}</span>
									</a>
									<label>{{$t('settings.password')}}</label>
								<div class="value">*******</div>


								<div class="editFieledsBox clearfix" v-if="changePasswordText">
									<!-- <p>We will send you an OTP to reset your password. This will be sent to your Email ID & Phone. </p> -->
									<div class="sendOtpRow clearfix" v-if="passwordOtp">
										<countDown v-if="$store.state.auth.otpTimer == true"></countDown>
										<button v-else class="btn btn-primary btn-small" @click="otpToUserForPassword">{{$t('register.resend_otp')}}</button>
									</div>
									<div class="sendOtpRow clearfix" v-if="verifyPasswordOtp">
										<!-- <button class="btn btn-primary btn-small" @click="enterVerifyPasswordOtp">Enter OTP</button> -->
										<label>{{$t('settings.enter_otp')}}</label>
										<div class="form-group">
											<input type="text" maxlength="4" @keypress="isNumber" v-model="otpNumber" class="form-control">
											<button class="btn verifyBtn" @click="verifySentPhoneOtp('password')">{{$t('common.verify')}}</button>
										</div>
									</div>


									<div class="form-group" v-if="passwordSetting">
										<label>{{$t('settings.new_password')}}</label>
										<div class="form-control-outer" >
											<!-- v-if="!showPassInput" -->
											<input type="password" minlength="6" v-model="password" class="form-control">
											<!-- <span class="showPass" @click="showPassInput = true"><i class="material-icons" style="display:;">remove_red_eye</i><i class="material-icons" style="display:none;">visibility_off</i></span> -->
										</div>
										<!-- <div class="form-control-outer" v-if="showPassInput">
											<input type="text" minlength="6" v-model="password" class="form-control">
											<span class="showPass" @click="showPassInput = false"><i class="material-icons" style="display:;">visibility_off</i><i class="material-icons" style="display:none;">visibility_off</i></span>
										</div> -->
									</div>
									<div class="form-group" v-if="passwordSetting">
										<label>{{$t('settings.confirm_password')}}</label>

										<div class="form-control-outer" v-if="!showCPassInput">
											<input type="password" minlength="6" v-model="cpassword" class="form-control">
											<span class="showPass" @click="showCPassInput=true"><i class="material-icons" style="display:;">remove_red_eye</i><i class="material-icons" style="display:none;">visibility_off</i></span>
										</div>
										<div class="form-control-outer" v-if="showCPassInput">
											<input type="text" minlength="6" v-model="cpassword" class="form-control">
											<span class="showPass" @click="showCPassInput=false"><i class="material-icons" style="display:;">visibility_off</i><i class="material-icons" style="display:none;">visibility_off</i></span>
										</div>
									</div>
									<div class="saveBtns clearfix" v-if="passwordSetting">
										<button class="btn btn-primary pull-right" @click="changePassword">{{$t('common.save')}}</button>
									</div>
								</div>
							</li>
							<li>
								<a class="edit" @click="changeUserPhoneNumber">
									<span v-if="!changePhone">{{$t('note.edit')}}</span>
									<span v-if="changePhone">{{$t('note.close')}}</span>
								</a> <label>{{$t('settings.phone')}}</label>
								<div class="value">{{selectedCountryCodeIndex}} {{this.$store.state.initialData.phone}}</div>
							</li>
							<li>
								<div class="editFieledsBox clearfix" v-if="changePhone">
									<!-- <p v-if="!altPh">We have sent you an OTP. </p> -->
									<div class="sendOtpRow clearfix" v-if="changeUserPhone">
										<countDown v-if="$store.state.auth.otpTimer == true"></countDown>
										<button v-else class="btn btn-primary btn-small" @click="otpToUserPhone">{{$t('register.resend_otp')}}</button>
									</div>
									<div class="form-group" v-if="verifyUserPhoneNumberChangeOtp">
										<label>{{$t('settings.enter_otp')}}</label>
										<input type="text" v-model="otpforPhoneNumber" maxlength="4" @keypress="isNumber" class="form-control">
										<button class="btn verifyBtn" @click="verifySentPhoneOtp('phone')">{{$t('common.verify')}}</button>
									</div>

									<div class="form-group" v-if="changeUserCurrentPhone">
										<label>{{$t('settings.enter_phone')}}</label>
										<input type="text" class="form-control" maxlength="10" @keypress="isNumber" v-model="changeCurrentPhone" placeholder="0000000000">
									</div>
									<div class="saveBtns clearfix" v-if="changeUserCurrentPhone">
										<button class="btn btn-primary pull-right"  @click="changePrincipal('phone')">{{$t('common.save')}}</button>
									</div>
								</div>
							</li>
							<li>
								<a class="edit" @click="changeAltPhone = !changeAltPhone">
									<span v-if="!this.$store.state.initialData.alternateContact && this.$store.state.initialData.phone">
											{{$t('note.add')}}
										</span>
									<span v-if="this.$store.state.initialData.alternateContact && this.$store.state.initialData.phone">
											{{$t('note.edit')}}
										</span>
								</a> <label>{{$t('settings.alternate_phone')}}</label>
								<div class="value">&nbsp;
									<span v-if="!this.$store.state.initialData.alternateContact || !finalAltPhone">NA</span>
									<span v-if="this.$store.state.initialData.alternateContact && finalAltPhone">{{selectedCountryCodeIndex}} <!-- {{this.$store.state.initialData.alternateContact}}</span> -->
									{{finalAltPhone}}</span>
								</div>
							</li>

							<li>
								<div class="editFieledsBox clearfix" v-if="changeAltPhone">
										<div class="form-group">
											<label>{{$t('settings.enter_phone')}}</label>
											<input type="text" class="form-control" maxlength="10" @keypress="isNumber" v-model="changeCurrentAltPhone" placeholder="0000000000">
										</div>
										<div class="saveBtns clearfix">
											<button class="btn btn-primary pull-left"  @click="changeAltPhone = false">{{$t('note.cancel')}}</button>
											<button class="btn btn-primary pull-right"  @click="changePrincipal('altphone')">{{$t('common.save')}}</button>
										</div>
								</div>
							</li>

						</ul>

					</div>
				</div>

				<div class="settingTab active">
					<h5 @click="togglePrivacySettings" class="headingBordered"><span class="headingTitle">{{$t('settings.privacy_settings')}} </span></h5>


					<div class="tabCon">
						<ul>
							<li>
								<label>{{$t('settings.deactivate')}}</label>
								<div class="clearfix">
									<div class="pull-right settingSwich">
										<span class="value">{{deactivate? $t('settings.yes'): $t('settings.no') }}</span>
										<label class="switch">
									  <input type="checkbox" @change="deactivationWarning" v-model="deactivate">
									  <span class="slider round"></span>
									</label>
									</div>
									<p class="subhead">{{$t('settings.profile_deactivate')}}</p>
									<p>{{$t('settings.people_Dplatform')}}</p>
								</div>
							</li>
							<li v-if="!$store.getters['isTeacher']() && $store.getters['isGradeChangeAllowed']()">
								<label>{{$t('settings.upgradeGrade')}}</label>
								<div class="clearfix">
									<div class="inputRow">
										<div class="select">
											<span class="icons select__arrow"></span>
											<select v-model="grade" @click="gradeSelection">
															<option :value="grade.gradeId" v-for="grade in $store.state.userGrades">{{grade.name}}</option>
											</select>
										</div>
									</div>
									<br>
									<div class="full-width">
										<button class="btn btn-primary btn-small" @click="gradeChange">{{$t('settings.updateGrade')}}</button>
									</div>

								</div>
							</li>
							<li v-if="$store.getters['isTeacher']()">
								<label>{{$t('settings.upgradeGrade')}}</label>

								<div class="clearfix">
									<div class="inputRow">
										<div class="select">
											<span class="icons select__arrow"></span>
											<select v-model="grade" @change="gradeSelection">
															<option :value="grade.gradeId" v-for="grade in $store.state.register.grades">{{grade.name}}</option>
												</select>
										</div>
									</div>
									<ul class="gradeChecks">
										<li v-for="grade in teacherGrade">
											<label class="hov-check">
													 <span class="hov-close" @click="removeTeacherGrade(grade)"><span class="material-icons">close</span></span>
	                         <input type="checkbox" :value="grade">
	                         <span>{{getGradeName(grade)}}</span>
	                       </label>
										</li>
									</ul>
									<div class="full-width">
										<button class="btn btn-primary btn-small" @click="gradeChange">{{$t('settings.updateGrade')}}</button>
									</div>

								</div>
							</li>




							<li>
								<label>{{$t('settings.discoverability')}}</label>
								<div class="clearfix">
									<div class="pull-right settingSwich">
										<span class="value">{{discoverable? $t('settings.yes'): $t('settings.no') }}</span>
										<label class="switch">
									  <input type="checkbox"  v-model="discoverable">
									  <span class="slider round"></span>
									</label>
									</div>
									<p class="subhead">{{$t('settings.profile_discoverable')}}</p>
									<p>{{$t('settings.people_platform')}}</p>
								</div>
							</li>

							<li>
								<label>{{$t('settings.profile_content_visibility')}}</label>
								<div class="clearfix">


									<div class="clearfix extraOpt">

										<p class="subhead">{{$store.getters['isTeacher']()? $t('teacher.select_profile_visibility') : $t('settings.select_profile_visibility')}}</p>
										<p>{{$store.getters['isTeacher']()? $t('teacher.buddies_posts') : $t('settings.buddies_posts')}}</p>
										<div class="extraOptCheck">


											<table class="table">
												<tr>
													<th>{{$t('common.profile')}}</th>
													<th width="100">{{$store.getters['isTeacher']()? $t('teacher.buddies') : $t('settings.buddies')}}</th>
													<th width="100">{{$store.getters['isTeacher']()? $t('teacher.non_buddies') : $t('settings.non_buddies')}}</th>

												</tr>




												<tr>
													<td>{{$t('index.wall_posts')}}</td>
													<td><label class="control control--checkbox"><input type="checkbox"  v-model="privacy_buddy.wallPosts"><div class="control__indicator" ></div></label></td>
													<td><label class="control control--checkbox"><input type="checkbox"  :disabled="!privacy_non_buddy.posts" v-model="privacy_non_buddy.wallPosts"><div class="control__indicator" ></div></label></td>
												</tr>





												<tr>
													<td>{{$t('settings.posts')}}</td>
													<td> <label class="control control--checkbox"><input type="checkbox" :checked="privacy_buddy.posts" disabled=""><div class="control__indicator" ></div></label></td>
													<td> <label class="control control--checkbox"><input type="checkbox" v-model="privacy_non_buddy.posts" @change="uncheckData" ><div class="control__indicator"></div></label></td>
												</tr>
												<tr v-if="!$store.getters['isParent']()">
													<td>{{$t('settings.favourites')}}</td>
													<td> <label class="control control--checkbox"><input type="checkbox" v-model="privacy_buddy.favourites" ><div class="control__indicator"></div></label></td>
													<td> <label class="control control--checkbox"><input type="checkbox" v-model="privacy_non_buddy.favourites" ><div class="control__indicator"></div></label></td>
												</tr>
												<tr>
													<td>{{$store.getters['isTeacher']()? $t('teacher.buddy') : $t('settings.buddy')}}</td>
													<td> <label class="control control--checkbox"><input type="checkbox" v-model="privacy_buddy.buddies" ><div class="control__indicator"></div></label></td>
													<td> <label class="control control--checkbox"><input type="checkbox" v-model="privacy_non_buddy.buddies" ><div class="control__indicator"></div></label></td>
												</tr>
												<tr v-if="!$store.getters['isParent']()">
													<td>{{$t('settings.scoreboard')}}</td>
													<td> <label class="control control--checkbox"><input type="checkbox" v-model="privacy_buddy.scoreBoard"><div class="control__indicator"></div></label></td>
													<td> <label class="control control--checkbox"><input type="checkbox" v-model="privacy_non_buddy.scoreBoard" ><div class="control__indicator"></div></label></td>
												</tr>
											</table>
										</div>



										<div class="saveBtns">
											<button class="btn btn-primary" @click="savePrivacySettings">{{$t('settings.save_changes')}}</button>
											<button class="btn btn-default btnCancSett" @click="cancel">{{$t('settings.cancel')}}</button>
										</div>



									</div>
								</div>
							</li>

						</ul>
					</div>
				</div>


				<div class="notePopUpBoxDelete" v-if="showDeactivatePopup">
				  <div class="deletePostPop">
				        <div class="deletePostPopInner">
				            <!-- <h3><i class="material-icons">&#xE872;</i> Delete Post</h3> -->
				            <p>{{$t('settings.deactivation_confirmation')}}</p>
				            <div class="btns">
				                <a class="btn btn-bordered" @click="savePrivacySettings()">{{$t('settings.yes')}}</a>
				              <a class="btn btn-primary" @click="hideDeactivatePopup">{{$t('settings.no')}}</a>
				            </div>
				        </div>
				    </div>
				</div>
				<div class="notePopUpBoxDelete" v-if="showGradeChangePopup">
				  <div class="deletePostPop">
				        <div class="deletePostPopInner">
				            <!-- <h3><i class="material-icons">&#xE872;</i> Delete Post</h3> -->
				            <p> {{$t('settings.gradechange_confirmation')}}</p>
										<span style="color:red;font-size:12px;">* {{$store.getters['isTeacher']? $t('settings.gradechange_confirmation_note_teacher') : $t('settings.gradechange_confirmation_note')}}</span>
				            <div class="btns">
				                <a  class="btn btn-bordered" @click="saveGradeChangeConfirmation()">{{$t('settings.yes')}}</a>
				              <a class="btn btn-primary" @click="showGradeChangePopup = false">{{$t('settings.no')}}</a>
				            </div>
				        </div>
				    </div>
				</div>

			</div>

		</div>
	</div>
</template>

<script>
	import countDown from '~/components/countDown'
	export default {
		head () {
			return {
			title: this.$t('common.setting')
			}
		},
		//layout: 'popupview',
		middleware: 'authenticated',
		components: {countDown},
		data() {
			let initialData = this.$store.state.initialData.privacy
			let initialDataPrivacyBuddy = Object.assign({}, {
				privacyType: 'BUDDY',
				type: 'BUDDY'
			}, initialData.privacy ? initialData.privacy.filter(privacy => privacy.type === 'BUDDY')[0] : {})
			let initialDataPrivacyNonBuddy = Object.assign({}, {
				privacyType: 'NON_BUDDY',
				type: 'NON_BUDDY'
			}, initialData.privacy ? initialData.privacy.filter(privacy => privacy.type === 'NON_BUDDY')[0] : {})
			return {
				passwordToggle: true,
				principal: null,
				password: '',
				otpNumber: '',
				isChildOtp: '',
				childrenArray: [],
				changeCurrentEmail: '',
				changeCurrentPhone: '',
				query: '',
				responseData: '',
				changeCurrentAltPhone: '',
				changeEmailOtpVerification: '',
				general_settings_display: false,
				showGradeChangePopup: false,
				privacy_display: false,
				showDeactivatePopup: false,
				changeUserPhone: false,
				changeUserCurrentPhone: false,
				changeAltPhone: false,
				changeEmail: false,
				changePhone: false,
				changePasswordText: false,
				showPassInput: false,
				showCPassInput: false,
				verifyUserPhoneNumberChangeOtp: false,
				passwordOtp: false,
				teacherGrade: [],
				finalSelectedChangedGrade: [],
				grade: (this.$store.state.initialData.roles[0] !== 'PARENT')?this.$store.state.initialData.grades[0].gradeId:[],
				verifyPasswordOtp: false,
				passwordSetting: false,
				altPh: false,
				otpform: true,
				textName: false,
				verifyEmailOtp: false,
				showAddChildPopUp: false,
				changeEmailIdFormShow: false,
				emailOtpBtn: false,
				enterVerifyCode: false,
				changeCurrentPrincipal: '',
				selectedCountryCodeIndex: '',
				otpforPhoneNumber: '',
				cpassword: '',
				discoverable: initialData.discoverable,
				deactivate: initialData.deactivate,
				privacy_buddy: initialDataPrivacyBuddy,
				privacy_non_buddy: initialDataPrivacyNonBuddy,
				finalAltPhone: ''
			}
		},
		mounted() {
			// this.finalAltPhone = this.$store.state.initialData.alternateContact;
			let webHostname = window.location.hostname
      let webUrl = webHostname.split('.').reverse()
      let webDomain = webUrl[0]
      if(webDomain === 'kz') {
        this.selectedCountryCodeIndex = "+7"
      }else if(webDomain === 'ru') {
        this.selectedCountryCodeIndex = 2
      }else {
        this.selectedCountryCodeIndex = "+7"
      }

	if(this.$store.state.currentSelectedChild&&this.$store.state.currentSelectedChild.expiryDays <= 0) {
          this.$root.$emit('childExpiryPopUp', {
          byParent: this.$store.state.currentSelectedChild.expiryDays,
          bySubs: this.$router.currentRoute.path
      })
    }

	  	if(!this.$store.getters['isParent']()) {

			this.$store.dispatch('register/fetchGrades', {
				langCode: this.$store.state.locale.selectedLocale
			})
			let teacherSelectedGrades = this.$store.state.userGrades.map(grade => {
				return grade.gradeId
			})
			this.teacherGrade = teacherSelectedGrades
			if (this.$store.state.initialData.alternateContact) {
				this.textName = true
			}
		  }
			this.$store.dispatch('snowPlowPageView',{pageName: "MORE_SETTINGS"});
		},
		methods: {
			getGradeName (grade) {
				let gradeNameArray = this.$store.state.register.grades.filter(temp => (temp.gradeId === grade))
				if (gradeNameArray && gradeNameArray.length > 0) {
					return gradeNameArray[0].name
				} else {
					return ''
				}
			},
			closePopup() {
				this.$router.push(this.$store.getters['locale/getFinalUrl'](`/`))
			},
			changeSearchBar () {
				if (this.query.length>=3) {
					this.fetchAutoComplete ()
				}
			},
			clearSearchBar() {
				this.query = ''
			},
			fetchAutoComplete() {
				let query = this.query
				this.$store.dispatch('register/fetchParentsWard', {
				langCode: this.$store.state.locale.selectedLocale,
				query
				}).then(response => {
				if(response.data.status === 'SUCCESS') {
								this.responseData = response.data
				}else {
								this.query = ''
					this.$toast.error(response.data.code);
				}
				})
			},
			childOtp() {
				let childId = this.responseData.userId
				this.otpForm = true
				this.$store.dispatch('register/sendChildOtp', {
					langCode: this.$store.state.locale.selectedLocale,
					childId
				}).then(response => {
					if(response.data.httpStatus === 200) {
						alert('otp has been sent to users')
						this.otpform = false
					}
				})
			},
			validateChildOtp() {
				console.log(this.responseData.id)
				this.$store.dispatch('register/verifyChildOtp', {
					langCode: this.$store.state.locale.selectedLocale,
					otp: this.isChildOtp,
					childId: this.responseData.userId
				}).then(response => {
					if(response.data.httpStatus === 200) {
						alert('student verified')
						if(this.childrenArray.indexOf(this.responseData) === -1){
							this.childrenArray.push(this.responseData)
						}
						this.otpform = true
						this.responseData = ''
						this.query = ''
						this.isChildOtp = ''
					}else {
						alert('Something went wrong.')

					}
				})
			},
			removeChild(data) {
				let payload = [data]
				this.$store.dispatch('setting/removeChildren', {
					langCode: this.$store.state.locale.selectedLocale,
					payload,
					authToken: this.$store.state.auth.user.token,
					childrenList: this.childrenArray
				}).then(response => {
					if(response.data.httpStatus === 200) {
						//this.$toast.success('child removed successfully')
					}else {


					}
				})
			},
			addChild(data) {
				let payload = []
				for(let i = 0;i< data.length;i++){
					let userid = data[i].userId
					payload.push(userid)
				}
				this.$store.dispatch('setting/addChildren', {
					langCode: this.$store.state.locale.selectedLocale,
					payload,
					authToken: this.$store.state.auth.user.token,
					childrenList: this.childrenArray
				}).then(response => {
					if(response.data.httpStatus === 200) {
						alert('student added')
						this.showAddChildPopUp = false
					}else {
						alert('Something went wrong.')

					}
				})
			},
			uncheckData() {
				console.log(this.privacy_non_buddy.posts);
				if(this.privacy_non_buddy.posts) {
					this.privacy_non_buddy.wallPosts = true
				}else {
					this.privacy_non_buddy.wallPosts = false
				}
			},
			hideDeactivatePopup() {
				this.showDeactivatePopup = false
				this.deactivate = false
			},
			addUserEmail() {
				// this.changeEmailIdFormShow = true
				// this.changeEmail = true
				if (this.changeEmail == false) {
					this.$store.dispatch('auth/sendOTP', {
					principal: this.$store.state.initialData.phone,
					taskType: 'CHANGE_EMAIL',
					authToken: this.$store.state.auth.user.token,
					langCode: this.$store.state.locale.selectedLocale
				}).then(response => {
					if (response.data.status === 'SUCCESS') {
						this.changeEmail = !this.changeEmail
						this.emailOtpBtn = true
						this.verifyEmailOtp = true
						this.changeEmailIdFormShow = false
						//this.$toast.success(this.$t('toastMsg.otp_success'))
					}
				})
				} else {
					this.changeEmail = !this.changeEmail
				}
			},
			toggleGeneralSettings() {
				this.general_settings_display = !this.general_settings_display
			},
			changeUserEmail() {
				if (this.changeEmail == false) {
					this.$store.dispatch('auth/sendOTP', {
					principal: this.$store.state.initialData.email,
					taskType: 'CHANGE_EMAIL',
					authToken: this.$store.state.auth.user.token,
					langCode: this.$store.state.locale.selectedLocale
				}).then(response => {
					if (response.data.status === 'SUCCESS') {
						this.changeEmail = !this.changeEmail
						this.emailOtpBtn = true
						this.verifyEmailOtp = true
						this.changeEmailIdFormShow = false
						//this.$toast.success(this.$t('toastMsg.otp_success'))
					}
				})
				} else {
					this.changeEmail = !this.changeEmail
				}
			},
			removeTeacherGrade(value) {
				this.teacherGrade.splice(this.teacherGrade.indexOf(value), 1)
				this.finalSelectedChangedGrade = this.teacherGrade
			},
			gradeSelection(event) {
				if ((this.grade) && (this.$store.state.initialData.roles[0] === 'STUDENT')) {
					this.finalSelectedChangedGrade = []
					this.finalSelectedChangedGrade.push(this.grade)
				} else {
					let grade = event.target.value
					if (this.teacherGrade.indexOf(grade) === -1) {
						this.teacherGrade.push(grade)
					}
					this.finalSelectedChangedGrade = this.teacherGrade
				}
			},
			saveGradeChangeConfirmation() {
				if(this.finalSelectedChangedGrade.length>0) {
				this.$store.dispatch(`setting/upGrade`, {
					authToken: this.$store.state.auth.user.token,
					langCode: this.$store.state.locale.selectedLocale,
					grades: this.finalSelectedChangedGrade
				}).then((response) => {
					if (response.data.status === 'SUCCESS') {
						setTimeout(() => {
							let userId = this.$store.state.initialData.userId
							this.$store.dispatch('auth/logout', {
								deviceId: 'WEB',
								userId: userId,
								context: this,
          						langCode: this.$store.state.locale.selectedLocale
							}).then(response => {
								this.$router.push(this.$store.getters['locale/getFinalUrl']('/login'))
							})
						}, 1000)

					} else {
						if(response.data.message) {
							this.$toast.error(response.data.message)
						}else {
							this.$toast.error(response.data.code)
						}
					}
					this.showGradeChangePopup = false
				}, (error) => {
					if(error.message){
						this.$toast.error(error.message)
					}else {
						this.$toast.error(error.code)
					}

				})
			}
			},
			gradeChange() {
				this.showGradeChangePopup = true
			},
			deactivateAccount() {
				this.$store.dispatch(`setting/accountDeactivation`, {
					authToken: this.$store.state.auth.user.token,
					langCode: this.$store.state.locale.selectedLocale
				}).then((response) => {
					if (response.data.status === 'SUCCESS') {
						let userId = this.$store.state.initialData.userId
						this.$store.dispatch('auth/logout', {
							deviceId: 'WEB',
							userId: userId,
							context: this,
          					langCode: this.$store.state.locale.selectedLocale
						}).then(response => {
							this.$router.push(this.$store.getters['locale/getFinalUrl']('/login'))
						})
					}

				}, (error) => {
					vm.$toast.error(error)
				})
			},

			altPhoneChange() {
				this.changePhone = !this.changePhone
				this.altPh = true
			},
			changeUserPhoneNumber() {
				if (!this.changePhone) {
					this.$store.dispatch('auth/sendOTP', {
					principal: this.$store.state.initialData.phone?this.$store.state.initialData.phone:this.$store.state.initialData.email,
					taskType: 'CHANGE_PHONE',
					authToken: this.$store.state.auth.user.token,
					langCode: this.$store.state.locale.selectedLocale
				}).then(response => {
					if (response.data.status === 'SUCCESS') {
						//this.$toast.success(this.$t('toastMsg.otp_success'))
						this.verifyUserPhoneNumberChangeOtp = true
						this.changeUserPhone = true
						this.changeUserCurrentPhone = false
						this.changePhone = !this.changePhone
					}
				})
				} else {
					this.changePhone = !this.changePhone
				}
			},
			PhoneChange() {
				this.changePhone = !this.changePhone
			},
			togglePrivacySettings() {
				this.privacy_display = !this.privacy_display
			},
			cancel() {
				let initialData = this.$store.state.initialData.privacy
				this.discoverable = initialData.discoverable
				let initialDataPrivacyBuddy = Object.assign({}, initialData.privacy.filter(privacy => privacy.type === 'BUDDY')[0])
				let initialDataPrivacyNonBuddy = Object.assign({}, initialData.privacy.filter(privacy => privacy.type === 'NON_BUDDY')[0])
				this.privacy_buddy = initialDataPrivacyBuddy
				this.privacy_non_buddy = initialDataPrivacyNonBuddy
				this.togglePrivacySettings()
				this.$router.push(this.$store.getters['locale/getFinalUrl']('/'))
			},
			deactivationWarning() {
				if(this.deactivate === true) {
					this.showDeactivatePopup = true
				}
			},
			savePrivacySettings() {
				let privacy = []
				privacy.push(this.privacy_buddy)
				privacy.push(this.privacy_non_buddy)

				for (var i = 0; i < privacy.length; i++) {
					// delete this.registerPayload['relation']
					delete privacy[i]['privacyType']
				}
				let payload = {
					discoverable: this.discoverable,
					privacy: privacy
				}
				let vm = this
				this.$store.dispatch(`setting/savePrivacySettings`, {
					payload,
					authToken: this.$store.state.auth.user.token,
					langCode: this.$store.state.locale.selectedLocale
				}).then((response) => {
					if ((response.data.status === 'SUCCESS') && this.deactivate) {
						this.deactivateAccount()
					}
					if(!this.$store.getters['isParent']()) {
						if ((response.data.status === 'SUCCESS') && (this.grade !== this.$store.state.initialData.grades[0].gradeId)) {
							this.gradeChange()
						}
					}
					if (response.data.status === 'SUCCESS') {
						//vm.$toast.success(this.$t('toastMsg.settingsSaved'))
					}
				}, (error) => {
					vm.$toast.error(error)
				})
			},
			changePasswordToggle() {
				this.passwordToggle = !this.passwordToggle
			},
			sendPasswordOTP: function() {
				if (this.changePasswordText === false) {
					this.$store.dispatch('auth/sendOTP', {
					principal: this.$store.state.initialData.phone,
					taskType: "CHANGE_PASSWORD",
					authToken: this.$store.state.auth.user.token,
					langCode: this.$store.state.locale.selectedLocale
				}).then(response => {
					this.changePasswordText = !this.changePasswordText
					this.passwordOtp = true
					this.verifyPasswordOtp = true
					this.passwordSetting = false
					//this.$toast.success(this.$t('toastMsg.otp_success'))
				})
				} else {
					this.passwordOtp = !this.passwordOtp
					this.changePasswordText = !this.changePasswordText
					this.verifyPasswordOtp = !this.verifyPasswordOtp
				}
				// this.otpToUserForPassword()
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
			otpToUserForPassword() {
				this.$store.dispatch('auth/sendOTP', {
					principal: this.$store.state.initialData.phone,
					taskType: "CHANGE_PASSWORD",
					authToken: this.$store.state.auth.user.token,
					langCode: this.$store.state.locale.selectedLocale
				}).then(response => {
					//this.$toast.success(this.$t('toastMsg.otp_success'))
				})
				this.verifyPasswordOtp = true
				this.passwordOtp = true
			},
			enterVerifyPasswordOtp() {
				this.enterVerifyCode = true
				this.verifyPasswordOtp = false
			},
			otpToUser() {
				let optPrincipal = ''
				if(this.$store.state.initialData.email) {
					optPrincipal = this.$store.state.initialData.email
				}else {
					optPrincipal = this.$store.state.initialData.phone
				}
				this.$store.dispatch('auth/sendOTP', {
					principal: optPrincipal,
					taskType: 'CHANGE_EMAIL',
					authToken: this.$store.state.auth.user.token,
					langCode: this.$store.state.locale.selectedLocale
				}).then(response => {
					if (response.data.status === 'SUCCESS') {
						this.verifyEmailOtp = true
						this.emailOtpBtn = true
						//this.$toast.success(this.$t('toastMsg.otp_success'))
					}
				})
			},
			otpToUserPhone() {
				this.$store.dispatch('auth/sendOTP', {
					principal: this.$store.state.initialData.phone,
					taskType: 'CHANGE_PHONE',
					authToken: this.$store.state.auth.user.token,
					langCode: this.$store.state.locale.selectedLocale
				}).then(response => {
					if (response.data.status === 'SUCCESS') {
						//this.$toast.success(this.$t('toastMsg.otp_success'))

					}
				})
				this.changeUserPhone = true
				this.verifyUserPhoneNumberChangeOtp = true
			},
			otpToUserAltPhone() {
				this.$store.dispatch('auth/sendOTP', {
					principal: this.$store.state.initialData.alternateContact,
					taskType: 'CHANGE_ALTERNATE_PHONE',
					authToken: this.$store.state.auth.user.token,
					langCode: this.$store.state.locale.selectedLocale
				}).then(response => {

					if (response.status === 'SUCCESS') {
						//this.$toast.success(this.$t('toastMsg.otp_success'))
					}
				})
			},
			verifySentOtp() {
				if((this.changeEmailOtpVerification === '')||(this.changeEmailOtpVerification === undefined)){
					this.$toast.error(this.$t('toastMsg.otp_required'))
				}else{
					let optPrincipal = ''
					if(this.$store.state.initialData.email) {
						optPrincipal = this.$store.state.initialData.email
					}else {
						optPrincipal = this.$store.state.initialData.phone
					}
					this.$store.dispatch('auth/otpConfirmation', {
					principal: optPrincipal,
					taskType: 'CHANGE_EMAIL',
					authToken: this.$store.state.auth.user.token,
					langCode: this.$store.state.locale.selectedLocale,
					otp: this.changeEmailOtpVerification
				}).then(response => {
					if (response.data.status === 'SUCCESS') {
						this.verifyEmailOtp = false
						this.emailOtpBtn = false
						this.changeEmailIdFormShow = true
						this.changeEmailOtpVerification = ''
						//this.$toast.success(this.$t('toastMsg.otp_validated'))
					}else{
						if(response.data.message) {
							this.changeEmailOtpVerification = ''
							this.$toast.error(response.data.message)
						}else {
							this.changeEmailOtpVerification = ''
							this.$toast.error(response.data.code)
						}

					}
				})
			}
			},
			verifySentPhoneOtp(value) {
				let taskTypeValue = ''
				let enteredPasswordOtp = ''
				if (value === 'password') {
					enteredPasswordOtp = this.otpNumber
					if(this.otpNumber === '') {
						this.$toast.error(this.$t('toastMsg.otp_required'))
						this.verifyPasswordOtp = true
						this.passwordSetting = false
					} else {
						taskTypeValue = 'CHANGE_PASSWORD'
						// this.passwordSetting = true

					}
				} else if(value === 'phone') {
					if(this.otpforPhoneNumber === '') {
						this.$toast.error(this.$t('toastMsg.otp_required'))
						this.changeUserCurrentPhone = false
					} else {
						taskTypeValue = 'CHANGE_PHONE'
						enteredPasswordOtp = this.otpforPhoneNumber
					}
				}
					if (this.otpforPhoneNumber !== '' || this.otpNumber !== '') {
						this.$store.dispatch('auth/otpConfirmation', {
						principal: this.$store.state.initialData.phone?this.$store.state.initialData.phone:this.$store.state.initialData.email,
						taskType: taskTypeValue,
						authToken: this.$store.state.auth.user.token,
						langCode: this.$store.state.locale.selectedLocale,
						otp: enteredPasswordOtp
					}).then(response => {
						if (response.data.status === 'SUCCESS') {
							if(response.data.status === 'SUCCESS' && value === 'password') {
								this.passwordSetting = true
								this.enterVerifyCode = false
								this.passwordOtp = false
								this.verifyPasswordOtp = false
							}else if(response.data.status === 'SUCCESS' && value === 'phone') {
								this.changeUserCurrentPhone = true
								this.changeUserPhone = false
								this.verifyUserPhoneNumberChangeOtp = false
							}
								//this.$toast.success(this.$t('toastMsg.otp_validated'))


						} else {
							if(response.data.message) {
								this.$toast.error(response.data.message)
								this.otpforPhoneNumber = ''
								this.otpNumber = ''
							}else {
								this.otpforPhoneNumber = ''
								this.otpNumber = ''
								// this.$toast.error(response.data.code)
								this.$toast.error(this.$t(response.data.message))
							}

						}
					})
					}
			},
			changePrincipal(value) {

				let payloadObj = {}
				if (value === 'phone') {
					let validations = false
					if((this.changeCurrentPhone === '')||(this.changeCurrentPhone === undefined)){
						this.$toast.error(this.$t('toastMsg.phone_required'))
					}else if(this.changeCurrentPhone !== ''){

						let principal = this.changeCurrentPhone
						validations = this.$store.getters['validatePhone'](principal)
						if(!validations) {
							this.$toast.error(this.$t('toastMsg.phone_validation'))
						}

					}if(validations){
						payloadObj.phone = this.changeCurrentPhone
						payloadObj.taskType = 'CHANGE_PHONE'
						this.$store.dispatch('auth/userProfileUpdate', {
						payloadObj,
						authToken: this.$store.state.auth.user.token,
						langCode: this.$store.state.locale.selectedLocale
					}).then(response => {

						if (response.data.status === 'SUCCESS') {
							//this.$toast.success(this.$t('toastMsg.phone_change_success'))
							this.changePhone = false;
							this.changeUserCurrentPhone = false
							this.changeCurrentPhone = ''
						}else{
							if(response.data.message) {
								this.$toast.error(response.data.message)
							}else {
								this.$toast.error(response.data.code)
							}
						}
					})
				}
				}
				if (value === 'altphone') {
					/*let validations = false
					if((this.changeCurrentAltPhone === '')||(this.changeCurrentAltPhone === undefined)){
						this.$toast.error(this.$t('toastMsg.altPhone_required'))
					}
					else if(this.changeCurrentAltPhone !== ''){
						let principal = this.changeCurrentAltPhone
						validations = this.$store.getters['validatePhone'](principal)
						if(!validations) {
							this.$toast.error(this.$t('toastMsg.phone_validation'))
						}
					}*/
					// if(validations){
					payloadObj.alternatePhone = this.changeCurrentAltPhone
					payloadObj.taskType = 'CHANGE_ALTERNATE_PHONE'
					this.$store.dispatch('auth/userProfileUpdate', {
						payloadObj,
						authToken: this.$store.state.auth.user.token,
						langCode: this.$store.state.locale.selectedLocale
					}).then(response => {

						if (response.data.status === 'SUCCESS') {
							//this.$toast.success(this.$t('toastMsg.alt_phone_change_success'))
							this.changeAltPhone = false;
							this.finalAltPhone = this.changeCurrentAltPhone;
							this.changeCurrentAltPhone = ''
						}else{
							if(response.data.message) {
								this.$toast.error(response.data.message)
							}else {
								this.$toast.error(response.data.code)
							}
						}
					})
				// }
				}
				if (value === 'email') {
					let validations = false
					if((this.changeCurrentEmail === '')||(this.changeCurrentEmail === undefined)){
						this.$toast.error(this.$t('toastMsg.emailId_required'))
					}
					else if(this.changeCurrentEmail !== '') {
						let principal = this.changeCurrentEmail
						validations = this.$store.getters['validateEmail'](principal)
						if(!validations) {
							this.$toast.error(this.$t('toastMsg.email_validation'))
						}
					}
					if(validations){
					payloadObj.email = this.changeCurrentEmail
					payloadObj.taskType = 'CHANGE_EMAIL'
					this.$store.dispatch('auth/userProfileUpdate', {
						payloadObj,
						authToken: this.$store.state.auth.user.token,
						langCode: this.$store.state.locale.selectedLocale
					}).then(response => {

						if (response.data.status === 'SUCCESS') {
							//this.$toast.success(this.$t('toastMsg.email_change_success'))
							this.changeEmail = false;
							this.changeEmailIdFormShow = false;
							this.changeCurrentEmail = ''
						}else{
							if(response.data.message) {
								this.$toast.error(response.data.message)
							}else {
								this.$toast.error(response.data.code)
							}
						}
					})
				}
				}

			},
			changePassword() {
				if (!this.password || this.password === '') {
					this.$toast.error(this.$t('toastMsg.password_required'))
					return
				}else if(this.password !== this.cpassword){
					this.$toast.error(this.$t('toastMsg.password_mismatch'))
				}
				// else if(this.password.length < 6 || this.cpassword.length < 6){
				// 	this.$toast.error(this.$t('toastMsg.password_minlength') +" "+this.$store.getters['getMinPasswordLength']()+" "+ this.$t('toastMsg.password_minlengthCharacter'))
				// }
				else {
					this.$store.dispatch('auth/changeOrForgotPassword', {
							principal: this.$store.state.initialData.phone,
							newPassword: this.password,
							taskType: "CHANGE_PASSWORD",
							otp: this.otpNumber,
							authToken: this.$store.state.auth.user.token,
							langCode: this.$store.state.locale.selectedLocale
						})
						.then((response) => {
							if (response.data.status === "ERROR") {
								if(response.data.message) {
									this.$toast.error(response.data.message)
								}else {
									this.$toast.error(response.data.code)
								}
							} else {
								this.passwordToggle = true
								this.passwordSetting = false
								this.changePasswordText = false
								this.password = ''
								this.cpassword = ''
								this.otpNumber = ''
								//this.$toast.success(this.$t('toastMsg.password_change_success'))
							}
						}, (error) => {
							console.log(this.$t('toastMsg.password_fail'));
						})
				}
			}
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

	input[type="number"]::-webkit-inner-spin-button,
	input[type="number"]::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.hov-check {
		position: relative;
	}

	.hov-close {
		position: absolute;
		top: 3px;
		left: 3px;
	}

	.hov-close {
		display: none;
	}

	.hov-check:hover .hov-close {
		display: block;
	}
	.full-width{
		float:left;width:100%;
	}
	.child-thumb li{width:20% !important;}
	.settingPageSec .settingTab {
    width: 460px;
    margin: 73px auto;
    float: none;
}
</style>

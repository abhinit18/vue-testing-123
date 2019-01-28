<template>
   <div>
      <div class="registerStepsPages">
         <ul class="scubscrpSteps">
			<li v-for="tab in registrationTabs" v-bind:class="{active: (tab.index===selectedTab)}" @click="changeTab(tab.index)">
				<span class="stepNum"> {{tab.index}} </span> {{$t(tab.name)}}
			</li>
		</ul>
         <div class="registerStepsPagesInner" v-if="selectedTab === 1">
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
	                             <h2 class="subscHeading">{{$t('parentLog.parentSub')}}</h2>
	                             <p class="formInstrcTxt">
	                             {{$t('parentLog.underHdText1')}}<br> {{$t('parentLog.underHdText2')}}</p>
	                              <div class="megaSearch">
		                              <div class="searchBox">
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
		                                     <button type="button" class="btn btn-primary btmActionBtn" @click="StudentAdd">{{$t('parentLog.verifyChild')}}</button>
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
		                                   <button type="button" @click="removeSubscriptionTile" class="btn btn-link closeBtn">
		                                   <i class="material-icons">close</i></button>
		                                   <p class="parentStuName">{{$t('parentLog.noResult')}}</p>
		                                </div>
		                                <div class="parntStuCardInner">
		                                   <p class="resultStatusTxt">
		                                   	{{$t('parentLog.noResultTxt1')}} <span v-if="validPrinciple">{{$t('parentLog.noEmail')}}</span><span v-else>{{$t('parentLog.noPhone')}}</span> <span class="heightlightTxt"> {{query}}</span> <br>
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
                  <button class="btn nextBtnNew" @click="goTo(2)">{{$t('register.next')}}</button>
                </div>
            </div>
         </div>

			<div class="registerStepsPagesInner" v-if="selectedTab === 2 || selectedTab === 3">
			<div class="registerStepsPagesInner2">
			<div class="registerStepsPagesInner3">


			<!--   <div class="cloud csmall csmallani"></div>
			<div class="cloud csbig csbigani"></div>
			<div class="cloud csmall cleft"></div>
			<div class="cloud csbig cleft cleft2"></div>
			<div class="loginimg"></div>
			<div class="loginimg2"></div>
			<div class="loginimg3"></div>
			<div class="loginimg4"></div> -->

				<!--   </slide>
				</carousel> -->



				<div class="regFormElements regForm">




				<div class="regFormBox">
					<div class="regFormBoxInner">
					<div v-if="selectedTab === 2">

						<div class="loginimgShadow"></div>

				<div class="loginimg7"></div>
				<div class="loginimg8"></div>


						<!-- Email And Phone -->
						<!-- <h2>{{$t('register.email_phone')}}</h2> -->


						<div class="text" v-if="tab2View===1">
						<!-- <p>{{$t('register.emailVerifyText')}}</p> -->
						</div>
						<div class="inputRow" v-if="tab2View===1">
						<h2 class="parntRegHeading">{{$t('register.parent_signup')}}</h2>
						<label>{{$t('register.email')}}  <span class="req"></span></label>
						<div class="formControlOuter">
							<span class="verifiedIco" v-if="emailValid"></span>
							<input type="email" placeholder="example@email.com" @change="verifyPrincipal('email')" v-model="emailId" class="formControl">
						</div>
						</div>
						<div class="inputRow" v-if="tab2View===1">
						<label>{{$t('register.phone')}} </label>

						<div class="contrySelect">
							<span class="verifiedIco" v-if="phoneValid"></span>
							<div class="selectCtry">
							<select v-model="selectedCountryCodeIndex" disabled>
									<option v-for="(countryCode,index) in $store.state.register.countryList" :value="countryCode.countryId">{{countryCode.code}}</option>
							</select>
							</div>
							<div class="contryCode" style="left:85px;">{{getCountryCode}}</div>
							<input type="text" :placeholder="$t('register.enter_phone_no')" @keypress="isNumber" @paste="onPaste" @input="verifyPrincipal('phone')" v-model="phone" maxlength="10" class="formControl">
						</div>
						</div>
						<p v-if="tab2View===2" class="otpSentTxt">{{emailOrPhone}}</p>
						<div class="optInput">
						<!-- :disabled="emailValid || phoneValid" -->
						<button class="btn btn-primary btn-block" :disabled="!otpBtnDisable()"  @click="sendOtpToMobileNumer" v-if="tab2View===1">{{$t('register.submit')}}</button>
						<div class="inputRow" v-if="tab2View===2">
							<label>{{$t('register.enter_otp')}}   <span class="req">*</span></label>
							<div class="formControlOuter">
							<input type="text" @keypress="isNumber" maxlength="4" v-model="otpInput" placeholder="xxxx" class="formControl">
							</div>
							<br>
							<div class="formControlOuter clearfix">
							<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 padding0">
								<countDown v-if="$store.state.auth.otpTimer == true"></countDown>
								<a class="btn btn-link" v-else @click="sendOtpToMobileNumer">{{$t('register.resend_otp')}}</a>
							</div>
							<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 padding0">
								<customloader loaderClass="btn btn-primary btn-block" :loaderClick="verifyOtpForParentMobileNumer" :loaderDisabled="verifyOtpButtonLoading" loaderText="register.verify_otp"></customloader>
								<!-- <button class="btn btn-primary btn-block" @click="verifyOtpForMobileNumer">{{$t('register.verify_otp')}}</button> -->
							</div>
							</div>
						</div>
						</div>


					</div>

					<div  v-if="selectedTab===3">


				<div class="loginimg9"></div>
				<div class="loginimg10"></div>
				<div class="loginimg11"></div>
				<div class="loginimg12"></div>
				<div class="loginimg13"></div>
				<div class="loginimg14"></div>

						<!-- Registration -->
						<!-- <h2>{{$t('register.registration')}}</h2> -->
						<div class="registerFormBox">
						<h2 class="parntRegHeading">{{$t('register.parent_signup')}}</h2>
						<!-- <div class="promocodePop inputRow">
						<div class="minner">
						<h6>{{$t('register.got_referral_code')}}?
						<div class="trailInfo"><i class="material-icons">info_outline</i>
							<div class="infoContent">
							<h6>{{$t('register.referral_code')}}</h6>
							{{$t('register.referralTooltip')}}
							</div>
						</div>
						</h6>
						<div class="regFormElements">
						<div class="formControlOuter">
							<div class="proCodeInput">
							<span class="verifiedIco" v-if="appliedReferral"></span>
							<input type="text" @change="changeReferralCode" v-model="enteredReferralcode" :placeholder="$t('register.add_referCode')" class="formControl">
							<!-- <input type="text" :placeholder="$t('register.enter_referral_code')" @input="changeReferralCode" class="formControl">
							<button class="btn btn-default" @click="applyReferralcode">{{$t('common.apply')}}</button> -->

							<!--</div>
						</div>
						</div>
						</div>
					</div> -->
						<div class="inputRow">
						<label v-if="arrivedRole === 'STUDENT'">{{$t('register.sFirst_name')}}  <span class="req">*</span></label>
						<label v-if="arrivedRole !== 'STUDENT'">{{$t('register.first_name')}}  <span class="req">*</span></label>
						<input type="text" placeholder="" maxlength="250" v-model="firstName" class="formControl">
						</div>
						<div class="inputRow">
						<label v-if="arrivedRole === 'STUDENT'">{{$t('register.sLast_name')}}  <span class="req">*</span></label>
						<label v-if="arrivedRole !== 'STUDENT'">{{$t('register.last_name')}}  <span class="req">*</span></label>
						<input type="text" placeholder="" maxlength="250" v-model="lastName" class="formControl">
						</div>
						<div class="inputRow">
						<label class="finline">{{$t('register.gender')}}  <span class="req">*</span></label>
						<div class="radioCustom"><label>
								<input type="radio" name="sex" v-model="gender" value="Male"><span></span> {{$t('register.male')}} </label></div>
						<div class="radioCustom"><label>
								<input type="radio" name="sex" v-model="gender" value="Female"><span></span> {{$t('register.female')}} </label></div>
						<div class="radioCustom"><label>
								<input type="radio" name="sex" v-model="gender" value="Others"><span></span> {{$t('register.others')}} </label></div>
						</div>
						<div class="inputRow">
						<label>{{$t('register.country')}} <span class="req">*</span></label>
						<div class="select">
							<!-- <span class="icons select__arrow"></span> -->
							<select v-model="selectedCountry" disabled>
								<option v-for="country in $store.state.register.countryList" :value="country.countryId">{{country.name}}</option>
							</select>
						</div>
						</div>
            <div class="inputRow">
              <label>{{$t('register.city')}} <span class="req">*</span></label>
              <div class="select">
                <!-- <span class="icons select__arrow"></span> -->
                <select v-model="selectedCity">
                    <option v-for="city in $store.state.register.cityList"  :value="city.cityId">{{city.name}}</option>
                </select>
              </div>
            </div>
            <div class="inputRow">
              <label>{{$t('common.preffered_language')}} <span class="req">*</span></label>
              <div class="select">
                <!-- <span class="icons select__arrow"></span> -->
                <select v-model="selectedLanguage">
                    <option v-for="language in this.$store.state.auth.languages.languages"  :value="language.code">{{language.name}}</option>
                </select>
              </div>
            </div>
						<div class="inputRow">
						<label>{{$t('register.set_password')}} <span class="req">*</span></label>
						<div class="passInput">
							<input type="password" @keypress="isValidPassword" minlength="6" @change="matchPassword" placeholder="* * * * * * * * * * *" v-model="password" v-show="!showPassword" class="formControl formLetterSpace">
							<input type="text" @keypress="isValidPassword" minlength="6" @change="matchPassword" placeholder="* * * * * * * * * * *" v-model="password" v-show="showPassword" class="formControl formLetterSpace">
							<!-- <span class="viewPass" @click="showPassword = !showPassword">
									<i class="material-icons" v-show="!showPassword">remove_red_eye</i>
									<i class="material-icons" v-show="showPassword">visibility_off</i>
							</span> -->
						</div>
						</div>
						<div class="inputRow">
						<label>{{$t('register.repeat_password')}} <span class="req">*</span></label>
						<div class="passInput">
							<input type="password" @keypress="isValidPassword" minlength="6" @change="matchPassword" v-model="Cpassword" v-show="!showCPassword" placeholder="* * * * * * * * * * *" class="formControl formLetterSpace">
							<input type="text" @keypress="isValidPassword" minlength="6" @change="matchPassword" v-model="Cpassword" v-show="showCPassword" placeholder="* * * * * * * * * * *" class="formControl formLetterSpace">
							<span class="viewPass" @click="showCPassword = !showCPassword">
									<i class="material-icons" v-show="!showCPassword">remove_red_eye</i>
									<i class="material-icons" v-show="showCPassword">visibility_off</i>
							</span>
						</div>
						</div>
						<div class="inputRow">
						<label class="control control--checkbox terms">
									{{$t('register.i_agree')}} <a>{{$t('register.terms_conditions')}}</a>
									<input :checked="termsNCondition" type="checkbox" @change="openTermsPopup">
									<div class="control__indicator"></div>
								</label>
						</div>
						<div class="btns clearfix">
						<!-- <button class="btn btn-border pull-left" @click="clickBack">{{$t('register.back')}}</button> -->
						<div class="btns clearfix">
							<customloader v-if="registerBtnName" loaderClass="btn btn-primary pull-right" :loaderClick="submitUser" :loaderDisabled="saveButtonLoading" loaderText="register.paidNext"></customloader>
							<customloader v-if="!registerBtnName" loaderClass="btn btn-primary pull-right" :loaderClick="submitUser" :loaderDisabled="saveButtonLoading" loaderText="register.freeNext"></customloader>
						</div>
						<!-- <button class="btn btn-primary pull-right" @click="submitUser">{{$t('register.next')}}</button> -->
						</div>
					</div>
					</div>
					</div>
				</div>






				<tnc-popup :agreeTerms="agreeTerms" :close="closeTncPopup" v-if="showTerms"/>

				<div class="footer">
					<footer><span v-html="$t('common.footer')"></span></footer>
				</div>
				</div>
			</div>
			<!-- <div class="btns subscNextBtnSec clearfix" v-if="selectedTab==1">
					<button class="btn nextBtnNew" @click="goTo(2)">{{$t('register.next')}}</button>
				</div> -->
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
		                                    <button type="button" v-else @click="sendOtpToStudentMobileNumer(true)" class="btn btn-link btmActionBtn">
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
		                             <!-- promo code popup box -->
		                             <div class="parentStuCard" v-if="selectedPopup === 3">
		                                <div class="parentStuHeadSec">
		                                <button type="button" @click="registerByParent = false" class="btn btn-link closeBtn">
		                                   <i class="material-icons">close</i></button>
                                      <div class="trailInfo" style="float:right;">

                                        <i class="material-icons">info_outline</i>
                                      <div class="infoContent">
                                        <h6>{{$t('register.promo_code')}}</h6>
                                        {{$t('register.discountTooltip')}}
                                      </div>
                                    </div>
                                      <p class="parentStuName">Promo Code</p>

		                                   <!-- <i class="material-icons icon_info">error_outline</i> -->

		                                </div>
		                                <div class="parntStuCardInner">
		                                   <p class="resultStatusPopTxt">
		                                   	{{$t('parentLog.gotCode')}}
		                                   </p>
		                                   <div class="regFormElements">
		                                     <div class="form-group">
		                                       <input type="text" class="formControl" :placeholder="$t('register.enter_promo_code')" @input="changePromoCode">
		                                     </div>
		                                   </div>
		                                </div>
		                                <div class="btmActionBtnSec text-right">
		                                    <button type="button" @click="gotoStudentRegister" class="btn btn-link btmActionBtn">
		                                     {{$t('parentLog.skip')}}
		                                   </button>
		                                    <button type="button" @click="applyPromocode" class="btn btn-primary btmActionBtn">
		                                     {{$t('parentLog.apply')}}
		                                   </button>
		                                </div>
		                             </div>
		                </div>
      </div>
   </div>
</template>
<script>
   import languageSelectBox from '~/components/languageSelectBox'
   import contentBox from '~/components/contentBox'
   import tncPopup from '~/components/tncPopup'
   import countDown from '~/components/countDown'
   export default {
      middleware: 'anonymous',
   	mounted () {
   		// this.fetchResults()
	   },
	   components: {tncPopup, countDown},
   	head () {
   		return {
   		title: this.$t('search.search')
   		}
   	},
   	layout: 'login',
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
			selectedTab: 1,
			otpForm: false,
			registerByParent: false,
      studentByParentRegister: false,
      verifyOtpButtonLoading: false,
      appliedPromo: false,
			registrationTabs: [
			{
				index: 1,
				name: 'register.add_child'
			},
			{
				index: 2,
				name: 'register.phone_email'
			},
			{
				index: 3,
				name: 'register.registration'
			}
			],
   			payloadDataObj: {},
   			responseData: '',
			  maxAllowedCharacters: 2000,
        saveButtonLoading: false,
        verifyOtpButtonLoading: false,
        selectedTab: 1,
        schoolFilter: '',
        tab2View: 1,
        promoWithPrincipalValid: false,
        emailValid: false,
        phoneValid: false,
        showTerms: false,
        dummyTerms: false,
        showCPassword: false,
        showPassword: false,
        arrivedPromo: '',
        arrivedRole: '',
        roleType: 0,
        selectedLanguage: '',
        appliedReferral: false,
        schoolListoff: false,
        registerBtnName: false,
        validPrinciple: false,
        enteredReferralcode: '',
        emailId: '',
        phone: '',
        selectedCountryCodeIndex: '',
        firstName: '',
        lastName: '',
        gender: '',
        parentsLastName: '',
        registrationOwner: '',
        registrationType: '',
        otpInput: '',
        password: '',
        Cpassword: '',
        selectedCity: '',
        selectedCountry: '',
        selectedSchool: '',
        selectedRelation: '',
        selectedGrade: '',
        saveUserGrades: [],
        termsNCondition: false,
        emailOrPhone: ''

   		}
	},
	mounted() {
    if(localStorage.getItem('childObj')){
      let childArray = JSON.parse(localStorage.getItem('childObj'))
      this.$store.dispatch('parentStore/parentsWardList', {
        parentsWardList: childArray
      })
      setTimeout(() => {
          localStorage.removeItem('childObj')
        }, 400)
    }
		let dataParamObj = this.$router.currentRoute.path
      this.$root.$emit('showLangCodeActive', {
        dataParamObj
      })
      let webHostname = window.location.hostname
      let webUrl = webHostname.split('.').reverse()
      let webDomain = webUrl[0]
      if(this.$store.state.parentStore.selectedStudentList.length === 0) {
        this.$router.push(this.$store.getters['locale/getFinalUrl'](`/parentReg`))
      }
      this.startCarouselLoading = true
      this.$store.dispatch('register/fetchCities', {
        langCode: this.$store.state.locale.selectedLocale
      })
      this.$store.dispatch('register/fetchSchools', {
        langCode: this.$store.state.locale.selectedLocale,

      })
      this.$store.dispatch("auth/getLanguagesService")
      this.$store.dispatch('register/fetchGrades', {
        langCode: this.$store.state.locale.selectedLocale
      })
      this.$store.dispatch('register/fetchCountries', {
        langCode: this.$store.state.locale.selectedLocale
      }).then(resp =>{
        let filteredResult = resp.data.countries.filter(result=>{
          return result.code === webDomain.toUpperCase()
        })
        if (filteredResult.length!==0) {
          this.selectedCountryCodeIndex = filteredResult[0].countryId
        } else {
          this.selectedCountryCodeIndex = resp.data.countries.filter(result=>{
            return result.code === 'KZ'
          })[0].countryId
        }
        this.selectedCountry = this.selectedCountryCodeIndex
      })

      // Get user type and promo code
      let currentRoute = this.$router.currentRoute.path
      let currentRouteSplit = currentRoute.split('/')
      let userPromoInfo = currentRouteSplit[currentRouteSplit.length - 1]
      let userPromoInfoSplit = userPromoInfo.split('-')
      let selectedUser = userPromoInfoSplit[0]
      let promoCode = userPromoInfoSplit[1]
      this.arrivedPromo = promoCode
      this.arrivedRole = 'PARENT'


      if (this.arrivedRole === 'PARENT') {
        this.roleType = 0
        this.registrationOwner = 'PARENT'
        this.registrationType = 'STUDENT'
      } else if (this.arrivedRole === 'STUDENT') {
        this.registrationOwner = 'SELF'
        this.registrationType = 'STUDENT'
        this.roleType = 1
      } else {
        this.registrationOwner = 'SELF'
        this.registrationType = 'TEACHER'
        this.roleType = 2
      }
	},

   	methods: {
   		clickOutsideAutoComplete () {
   			if (this.autoComplete.length>0) {

   			}
       },
       closeStudentMobileVerification(){
        this.registerByParent = false
        this.otpInput = ''
       },
       removeSubscriptionTile() {
          this.studentByParentRegister = false
          this.query = ''
       },
       hideResult() {
        this.responseData = ''
      },
       closeVerifiedPopup() {
        this.selectedPopup = 1
        this.registerByParent = false
       },
   		closePopup() {
   			this.$router.push(this.$store.getters['locale/getFinalUrl'](`/register`))
   		},
   		changeTab(code, force) {
   			if (this.selectedType!==code) {
   				this.selectedType = code

   			} else if (force) {

   			}
		},
		subscribeChild(data,value) {
			localStorage.setItem('isParent', true);
			this.registerByParent = true
			this.selectedPopup = value
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
              this.validPrinciple = true
              this.fetchAutoComplete ()
            }
          } else {
            if (this.query.length != 10) {
              this.$toast.error(this.$t('toastMsg.phone_validation'))
              return false;
            } else {
              this.validPrinciple = false
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
        this.responseData = response.data
        this.studentByParentRegister = false
				this.query = ''
            }else {
			if(response.data.code === 'NO_USERS_EXIST_WITH_GIVEN_PHONE_NUMBER' || 'NO_USERS_EXIST_WITH_GIVEN_EMAIL_ADDRESS') {
				this.studentByParentRegister = true
			}       if(response.data.message) {
                this.$toast.error(response.data.message);
              }else{
                this.$toast.error(response.data.code);
              }

            }
          })
   		},
   		changePromoCode (event) {
          this.enteredPromocode = event.target.value
          this.appliedPromo = false
   		},
   		gotoStudentRegister() {
         let tempWardData = {
           principal: this.query,
           inputType: this.validPrinciple
         }
         localStorage.setItem('tempWard',JSON.stringify(tempWardData));
   			if(this.appliedPromo) {
   				this.$router.push({path: this.$store.getters['locale/getFinalUrl'](`/register/byParent-STUDENT-${this.enteredPromocode}`),  query: this.$route.query} )
   			}else{
   				this.$router.push({path: this.$store.getters['locale/getFinalUrl'](`/register/byParent-STUDENT-`),  query: this.$route.query} )
   			}
   		},
   		applyPromocode() {
          if (this.enteredPromocode) {
            this.$store.dispatch('auth/checkPromo', {
              langCode: this.$store.state.locale.selectedLocale,
              promocode: this.enteredPromocode,
              selectedUser: 'STUDENT'
            }).then(response => {
              if (response.data.status === 'ERROR') {
                if(response.data.message) {
                  this.$toast.error(response.data.message)
                }else {
                  this.$toast.error(response.data.code)
                }
                this.appliedPromo = false
              } else {
                this.gotoStudentRegister()
                this.appliedPromo = true
              }
            })
          } else {
            this.$toast.error(this.$t('toastMsg.promocodeRequired'))
          }
        },
   		/*isNumber: function(evt) {
   			evt = (evt) ? evt : window.event;
   			var charCode = (evt.which) ? evt.which : evt.keyCode;
   			if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
   				evt.preventDefault()
   			} else {
   				return true;
   			}
   		},*/
   		isNumber: function(evt) {
	        evt = (evt) ? evt : window.event;
	        var charCode = (evt.which) ? evt.which : evt.keyCode;
	        // if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
	        if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
	          evt.preventDefault()
	        }
	        // else {
	          return true;
	        // }
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
   				if(response.data.status === 'SUCCESS') {
             if(!value) {
              this.subscribeChild(true,1)
             }
             //this.$toast.success(this.$t('toastMsg.otp_success'))
   				}
   			})
   		},
   		verifyOtpForMobileNumer() {
         if(this.otpInput) {
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
                  this.autoComplete = this.removeDuplicatesfromArrayOfObj(this.autoComplete);
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
          this.$toast.error('OTP is required')
         }
   		},
   		removeDuplicatesfromArrayOfObj(arr){
                // console.log("arr ",arr);
                var obj = {};

                for ( var i=0, len=arr.length; i < len; i++ )
                    obj[arr[i]['id']] = arr[i];

                arr = new Array();
                for ( var key in obj )
                    arr.push(obj[key]);
                // console.log("unique_array ",unique_array);
                return arr
            },
		//    ================== methods for parent registration ============== //
		 changePlan(subscriptionId) {
        this.selectedSubscriptionId = subscriptionId
      },
      checkForRefferalCode() {
        if (this.selectedTab === 2) {
          if (this.$route.query.referralCode && !this.appliedReferral) {
            this.changeReferralCode({
              myvalue: this.$route.query.referralCode
            })
          }
        }
      },
      checkBlankForDataShow() {
        if(this.schoolFilter === '') {
          this.schoolFilter = ' '
          this.schoolListoff = true
        }else{
          this.schoolListoff = false
        }
      },
      selectSchoolByCity() {
        if(this.selectedCity) {
          this.disableSchoolInput = false
          this.$store.dispatch('register/fetchSchools', {
            langCode: this.$store.state.locale.selectedLocale,
            city:this.selectedCity,
            country: this.selectedCountry
          })
          if((this.schoolFilter)&&(this.$store.state.register.schoolList.indexOf(this.schoolFilter) === -1)) {
            this.disableSchoolInput = true
            this.schoolFilter = ''
            this.selectedSchool = ''
          }
        }else {
          this.disableSchoolInput = true
        }
      },
      usersTagInput() {
        this.selectedSchool = ''
        this.schoolListoff = true
      },
      onBlurTaggedChipsShow() {

        // this.$store.dispatch('register/fetchSchools', {langCode: this.$store.state.locale.selectedLocale}).then(response => {
          // let taggedDataList = this.$store.state.note.userTagList.tags;
          if(this.$store.state.register.schoolList.indexOf(this.schoolFilter) === -1){
            this.selectedSchool = this.schoolFilter;
          }
      },
      changeTab(tabIndex) {
        //validations for different tabs

        //if tab is less than the selected tab, then no need to validate
        if (tabIndex < this.selectedTab) {
          this.selectedTab = tabIndex
        }
      },
      goTo(tabIndex) {
        //  to toggle button name according to plan whether free or paymentId
        if(this.$store.state.parentStore.selectedStudentList.length !== 0) {
          this.selectedTab = tabIndex
        }else{
          this.$toast.error('Please search and select student')
        }
      },
      gradeChange(value) {
        if (this.saveUserGrades.indexOf(value) === -1) {
          this.saveUserGrades.push(value)
        } else {
          this.saveUserGrades.splice(this.saveUserGrades.indexOf(value), 1)
        }
      },
      sendOtpToMobileNumer() {
        // else if (!this.getCountryCode) {
        //   this.$toast.error(this.$t('toastMsg.countrycode_validation'))
        // }

        if (this.phone === ''&& this.emailId === '') {
          this.$toast.error(this.$t('toastMsg.userPrincipalNeeded'))
          return false
        }  else {
          this.$store.dispatch('auth/phoneVerify', {
            principal: this.phone?this.phone:this.emailId,
            langCode: this.$store.state.locale.selectedLocale
          }).then(response => {
            if (response.data.status === 'SUCCESS') {
              //this.$toast.success(this.$t('toastMsg.otp_success'))
              if (this.tab2View === 1) {
                this.tab2View = 2
                this.emailOrPhone = this.phone?this.$t('index.otp_sent_phone'):this.$t('index.otp_sent_mail')
              }
            } else {
              this.$toast.error(this.$t('toastMsg.otp_fail'))
            }
          })
        }
      },
      otpBtnDisable() {
        if(this.emailValid && this.phoneValid){
          return true
        }else if(this.emailValid && this.emailId && !this.phoneValid && this.phone) {
          return false
        }else if(this.emailValid && this.emailId && !this.phone) {
          return true
        }else if(!this.emailId && this.phoneValid  && this.phone) {
          return true
        }else if(!this.emailValid && this.emailId && this.phoneValid  && this.phone) {
          return false
        }else{
          return false
        }
      },
      verifyPrincipal(value) {
        let principal = ''
        let validations = false
        if (value === 'email') {
          principal = this.emailId
          validations = this.$store.getters['validateEmail'](principal)
          if (!validations) {
            this.$toast.error(this.$t('toastMsg.email_validation'))
            this.emailValid = false
          }
        } else {
          principal = this.phone
          if (principal.length !== 10) {
            this.phoneValid = false
          } else {
            validations = this.$store.getters['validatePhone'](principal)
            if (!validations) {
              this.$toast.error(this.$t('toastMsg.phone_validation'))
              this.phoneValid = false
            }
          }
        }
        if (validations) {
          this.$store.dispatch('auth/principalVerify', {
            principal: principal
          }).then(response => {
            if (response.data.status === 'SUCCESS') {
              if (response.data.isExist === false) {
                if (value === 'email') {
                  this.emailValid = true
                }
                if (value === 'phone') {
                  this.phoneValid = true
                }

              } else {
                if (value === 'email') {
                  this.$toast.error(this.$t('toastMsg.email_preexists'))
                  this.emailValid = false
                } else {
                  this.$toast.error(this.$t('toastMsg.phone_preexists'))
                  this.phoneValid = false
                }
              }
            } else {
              this.allowUsertoSendOtp = true;
              this.$toast.error('Something went wrong')
            }
          })
        }
      },
      matchPassword() {
        if (this.password !== '' && this.Cpassword !== '' && this.password !== this.Cpassword) {
          this.$toast.error(this.$t('toastMsg.password_mismatch'))
        }
      },
      validatePromoWithPrincipal() {
        this.$store.dispatch('auth/getPromoCodeValidation', {
          promocode: this.arrivedPromo,
          email: this.emailId,
          phone: this.phone
        }).then(resp => {
          if (resp.data.status === 'SUCCESS') {
            this.promoWithPrincipalValid = true
          } else {
            this.$toast.error(resp.data.code);
            this.promoWithPrincipalValid = false
          }
        })
      },
      showParentFields() {
        return this.roleType === 0 || this.roleType === 1
      },
      submitUser() {

        let payloadData = {}

        if (this.validateForm()) {
          //Now set the form
          this.saveButtonLoading = true
          payloadData['firstName'] = this.firstName
          payloadData['lastName'] = this.lastName
          payloadData['password'] = this.password
          payloadData['country'] = this.selectedCountry
          payloadData['city'] = this.selectedCity
          payloadData['language'] = this.selectedLanguage
          payloadData['phone'] = this.phone
          payloadData['email'] = this.emailId
          payloadData['children'] = this.$store.state.parentStore.selectedStudentList.map(data =>{return data.userId})
          if (this.appliedReferral) {
            payloadData['referralCode'] = this.enteredReferralcode
          }

          //call the service
          this.$store.dispatch('auth/parentSignUp', {
            payloadData,
            langCode: this.$store.state.locale.selectedLocale
          }).then(responseData => {
            console.log(responseData);
            if (responseData.status === 200) {
              if(responseData.data.roles[0] === 'PARENT' && responseData.data.children) {
                let defaultChild = responseData.data.children
                this.$store.dispatch('updateChildId', {childObj: defaultChild})
                this.$store.dispatch('locale/setlanguage', {
                    context: this,
                    locale: this.selectedLanguage,
                    locales: this.$store.state.locale.locales
                })
              }
              localStorage.removeItem('childObj')
              this.$router.push(this.$store.getters['locale/getFinalUrl'](`/`))
            } else {
              if(responseData.data.message) {
              this.$toast.error(responseData.data.message);
              }else {
              this.$toast.error(responseData.data.code);
              }
            }
            this.saveButtonLoading = false
          }, error => {
            this.saveButtonLoading = false
          })
        }

      },
      closeTncPopup() {
        this.showTerms = false
      },
      validateForm() {
        let validate = true
        if (!this.termsNCondition) {
          this.$toast.error(this.$t('toastMsg.termsNConditionNotAgreed'))
          return false
        } else if ((this.firstName === '') || (this.firstName === undefined)) {
          this.$toast.error(this.$t('toastMsg.first_name_required'))
          return false
        } else if (this.firstName.trim().length<2 ) {
          this.$toast.error(this.$t('toastMsg.min_2_characters') + this.$t('register.first_name'))
          return false
        } else if ((this.lastName === '') || (this.lastName === undefined)) {
          this.$toast.error(this.$t('toastMsg.last_name_required'))
          return false
        } else if (this.lastName.trim().length<2 ) {
          this.$toast.error(this.$t('toastMsg.min_2_characters') + this.$t('register.last_name'))
          return false
        } else if ((this.gender === '') || (this.gender === undefined)) {
          this.$toast.error(this.$t('toastMsg.gender_required'))
          return false
        } else if ((this.selectedCountry === '') || (this.selectedCountry === undefined)) {
          this.$toast.error(this.$t('toastMsg.country_required'))
          return false
        }else if ((this.selectedLanguage === '') || (this.selectedLanguage === undefined)) {
          this.$toast.error(this.$t('onboarding.langMandatory'))
          return false
        }else if ((this.selectedCity === '') || (this.selectedCity === undefined)) {
          this.$toast.error(this.$t('toastMsg.city_required'))
          return false
        } else if ((this.password === '') || (this.password === undefined)) {
          this.$toast.error(this.$t('toastMsg.password_required'))
          return false
        }
        // else if ((this.password.length < this.$store.getters['getMinPasswordLength']()) || (this.Cpassword.length < this.$store.getters['getMinPasswordLength']())) {
        //   this.$toast.error(this.$t('toastMsg.password_minlength') +" "+this.$store.getters['getMinPasswordLength']()+" "+ this.$t('toastMsg.password_minlengthCharacter'))
        //   return false
        // }
        else if (this.password !== this.Cpassword) {
          this.$toast.error(this.$t('toastMsg.password_mismatch'))
          return false
        } else {
          return true
        }
      },
      verifyOtpForParentMobileNumer() {
        this.verifyOtpButtonLoading = true
        if ((this.otpInput === '') || (this.otpInput === undefined)) {
          this.$toast.error(this.$t('toastMsg.otp_validation'))
          this.verifyOtpButtonLoading = false
        } else {
          this.$store.dispatch('auth/otpVerify', {
            principal: this.phone?this.phone:this.emailId,
            otp: this.otpInput,
            langCode: this.$store.state.locale.selectedLocale
          }).then(response => {
            if (response.data.status === 'SUCCESS') {
              //this.$toast.success(this.$t('toastMsg.otp_validated'))
              this.selectedTab = 3
              // this.checkForRefferalCode()
              this.tab2View = 1
            } else {
              this.$toast.error(this.$t(response.data.message))
            }
            this.verifyOtpButtonLoading = false
          }, error => {
            this.verifyOtpButtonLoading = false
          })
        }
      },
      // selectedDate() {
      //   let difference = Math.floor((new Date().getTime() - new Date(this.dob).getTime()) / 31557600000);
      //   if (difference < 13) {
      //     this.showParentsId = true;
      //   } else {
      //     this.showParentsId = false;
      //   }
      // },
     /* isNumber: function(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
          evt.preventDefault()
        } else {
          return true;
        }
      },*/
      openTermsPopup() {
        if (this.termsNCondition) {
          this.termsNCondition = false
        } else {
          this.showTerms = true
        }
      },
      agreeTerms() {
        this.termsNCondition = true
        this.showTerms = false
      },
      changeReferralCode(event) {
        this.enteredReferralcode = event.myvalue ? event.myvalue : event.target.value
        this.appliedReferral = false

        if (this.enteredReferralcode) {
        this.$store.dispatch('auth/validateReferralCode', {
          referralCode: this.enteredReferralcode
        }).then(response => {
          if (response.data.status === 'ERROR') {
            this.$toast.error(response.data.code)
            this.appliedReferral = false
          } else if (response.data.status === 'SUCCESS') {
            if (response.data.isValid) {
              this.appliedReferral = true
            } else {
              this.$toast.error(this.$t('toastMsg.referralCodeInvalid'))
              this.appliedReferral = false
            }
          }
        })
        }

        // else {
        //   this.$toast.error(this.$t('toastMsg.referralcodeRequired'))
        // }
      },
      selectedUserSchool(data) {
        this.schoolListoff = false
        this.selectedSchool = data
        this.schoolFilter = data.name
      },
      isValidPassword: function(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        // if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        if (charCode == 32) {
          evt.preventDefault()
        }
        // else {
          return true;
        // }
      },
      onPaste: function(evt) {
        // console.log('on paste', evt)
        // return false;
        evt.preventDefault();
      }
	},
	computed: {
      getSelectedPlan() {
        if (this.subscriptionPlans.length > 0) {
          return this.subscriptionPlans.filter((plan) => (this.selectedSubscriptionId === plan.subscriptionId))[0]
        } else {
          return {}
        }
      },
      getCountryCode() {
        let listedCountryResult = this.$store.state.register.countryList.filter(countryResult =>{
          return countryResult.countryId === this.selectedCountry
        })
        return listedCountryResult.length !== 0? listedCountryResult[0].dialCode : {}
      },
      filterInputSearchSchoolData() {
        return this.$store.state.register.schoolList.filter(school => {
          return school.name.toLowerCase().indexOf(this.schoolFilter.toLowerCase()) !== -1
      })
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
.parntRegHeading{    margin: 0 0 22px;
    font-size: 24px;
    font-weight: 400;
    text-align: center;}
</style>

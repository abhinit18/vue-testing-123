<template>
	<div class=" ">
		<div class="scrollSec">


			<div class="editProfileouterSec">
			<a class="pclose" @click="closePopup"><span>&times;</span> {{$t('settings.close')}}</a>
			<div class="profileContainer">
				<h3 class="smallHeading">{{$t('profile.editProfile')}}</h3>

						<div class="editProfileImgSecMidPage clearfix">


                           <!--  <div class="editProfileImgSec" >
						  <div class="imgEditsec">
							<img src="~assets/images/innocentBoy.png">
							<div class="zoomSlider">
								<span class="slideBar"></span>
								<span class="slideHandle"></span>
							</div>
							<ul class="imgFilterSec">
								<li>
									<img src="~assets/images/img_filter.png"> Bright
								</li>
								<li>
									<img src="~assets/images/img_filter.png"> BW
								</li>
								<li>
									<img src="~assets/images/img_filter.png"> Contrast
								</li>
								<li>
									<img src="~assets/images/img_filter.png"> Darken
								</li>
							</ul>
						</div>
						</div> -->

						<!-- <imageCropper field="img"
		        @crop-success="cropSuccess"
		        @crop-upload-success="cropUploadSuccess"
		        @crop-upload-fail="cropUploadFail"
		        v-model="show"
						langType="en"
						:noSquare="true"
						:width="570"
						:height="400"
						url="/upload"
						:params="params"
						:headers="headers"
						img-format="png"
						:myImage="pic"/> -->
						<!-- <a class="btn" @click="toggleShow">set avatar</a>
	<my-upload field="img"
        @crop-success="cropSuccess"
        @crop-upload-success="cropUploadSuccess"
        @crop-upload-fail="cropUploadFail"
        v-model="show"
		langType="en"
		:noSquare="true"
		:width="300"
		:height="300"
		url="/upload"
		:params="params"
		:headers="headers"
		img-format="png"></my-upload> -->
	<!-- <img :src="imgDataUrl"> -->
					<div class="clearfix">
						<div class="boardContent">

									 <div class="boardPgUploadBtn" v-if="!imgSrc" @click="togglePictureChangePopup">
											<!-- <input type="file" accept="image/*" @change="imageUrl" class="inputFile"> -->
											<span class="uploadBtnIcon">
												<i class="material-icons">add_circle</i>
												{{$t('onboarding.upload')}}
											</span>
									 </div>
									 <!-- <div class="uploadAnotherPicSec" v-if="pic">
											<div class="picArea">
												<img :src="pic">
											</div>
											<div class="uoloadAnotherBtn">
												<input type="file" accept="image/*" @change="imageUrl" class="inputFile">
												<span class="uplodIcon"><i class="material-icons">add_circle</i>{{$t('onboarding.add_another')}}</span>
											</div>
											<p class="likeTxt">{{$t('onboarding.dont_like')}}</p>
									 </div> -->
									 <div v-if="imgSrc!==''">
									 	<div class="editProfileImgSec" >
						  					<div class="imgEditsec">
										<vue-cropper
											ref="cropper"
											:aspectRatio="1"
											:guides="true"
											:view-mode="2"
											drag-mode="crop"
											:auto-crop-area="1"
											:min-container-width="250"
											:min-container-height="180"
											:background="true"
											:rotatable="true"
											:src="imgSrc"
											alt="Source Image"
											:img-style="{ width: '400px', 'height': '300px' }"
											:cropmove="cropImage">
                    					</vue-cropper>
										<div class="uploadAnotherPicSec">
										<div class="uoloadAnotherBtn centUploadBtn" @click="togglePictureChangePopup">
												<!-- <input type="file" accept="image/*" @change="imageUrl" class="inputFile"> -->
												<span class="uplodIcon"><i class="material-icons">add_circle</i>{{$t('onboarding.add_another')}}</span>
											</div>
										<!-- <p class="likeTxt">{{$t('onboarding.dont_like')}}</p> -->
										</div>
                					</div>
									 </div>
									</div>
									 <div class="btnSec text-center">
										<customloader v-if="!noPicture" loaderClass="btn btn-primary btnCancel" :loaderClick="removeProfilePic" :loaderDisabled="removePicButtonLoading" loaderText="onboarding.remove_pic"></customloader>
										<customloader loaderClass="btn btn-primary" :loaderClick="saveProfilePic" :loaderDisabled="savePicButtonLoading" loaderText="onboarding.save"></customloader>
									</div>

						</div>
					</div>
					<div class="profileEditContent">
						<!-- <div class="uploadSec clearfix">
							<button class="btn btn-primary pull-right" @click="saveProfilePic">Save Changes</button>
							<div class="edtUploadBtn">
								 <input type="file" id="file-1">
									<label for="file-1"> </label>
								<div @click="togglePictureChangePopup"><span  class="uploadIcon"></span> Replace Picture</div>
							</div>
						</div> -->
						<h3 class="headingBordered"><span class="headingTitle">{{$t('common.about')}} </span></h3>
						<div class="regFormElements profileFormSec">
							<div class="inputRow">
								<label>{{$t('register.first_name')}}</label>
								<div class="select">
									<!-- <span class="icons select__arrow"></span> -->
									<input v-model="firstName" style="height:40px;" type="text" class="formControl">
								</div>
								<!-- <div class="custSelect">
										<span>5 (five)</span>
										<i class="icons arrow"><i class="material-icons">&#xE313;</i></i>
									</div> -->
							</div>
							<div class="inputRow">
								<label>{{$t('register.last_name')}}</label>
								<div class="select">
									<!-- <span class="icons select__arrow"></span> -->
									<input v-model="lastName" style="height:40px;" type="text" class="formControl">
								</div>
								<!-- <div class="custSelect">
										<span>5 (five)</span>
										<i class="icons arrow"><i class="material-icons">&#xE313;</i></i>
									</div> -->
							</div>
							<div class="inputRow">
								<label>{{$t('register.country')}}</label>
								<div class="select">
									<!-- <span class="icons select__arrow"></span> -->
									<select v-model="countryId">
												<option :value="country" v-for="country in $store.state.common.countryList">{{country.name}}</option>
												</select>
								</div>
								<!-- <div class="custSelect">
										<span>5 (five)</span>
										<i class="icons arrow"><i class="material-icons">&#xE313;</i></i>
									</div> -->
							</div>
							<div class="inputRow">
								<label>{{$t('settings.city')}}</label>
								<div class="select">
									<!-- <span class="icons select__arrow"></span> -->
									<select v-model="cityId" @change="selectSchoolByCity">
												<option :value="city"  v-for="city in $store.state.common.cityList">{{city.name}}</option>
												</select>
								</div>
							</div>
							<div class="inputRow" v-if="!$store.getters['isParent']()">
								<label>{{$t('settings.school')}}</label>
								<!-- <div class="select">
									 <span class="icons select__arrow"></span>
									<select v-model="schoolId">
												<option :value="school.schoolId" v-for="school in $store.state.common.schoolList">{{school.name}}</option>
												</select>
								</div> -->

								<div class="select">

	               <!--  <input class="formControl" style="height:40px;" @click="checkBlankForDataShow" @keyup="usersTagInput" maxlength="50" @blur="onBlurTaggedChipsShow" v-model="schoolId">
	                <ul class="filterListOpt" v-if="schoolId && schoolListoff">
	                 <li v-for="listedSchool in filterInputSearchSchoolData" @click="selectedUserSchool(listedSchool)">
	                   {{listedSchool.name}}
	                 </li>
	                </ul> -->
	                    <!-- :disabled="disableSchoolInput"  -->
	                    <select v-model="schoolId">
	                      <option v-for="school in $store.state.common.schoolList" :value="school.schoolId">{{school.name}}</option>
	                    </select>
	                    <!-- <select v-model="selectedSchool">
	                      <option v-for="school in $store.state.register.schoolList" :value="school.schoolId">{{school.name}}</option>
	                    </select> -->
	              </div>
							</div>
							<div class="inputRow">
								<label>{{$t('common.preffered_language')}}</label>
								<div class="select">
									<!-- <span class="icons select__arrow"></span> -->
									<select v-model="lang">
												<option :value="language.code" v-for="language in this.$store.state.auth.languages.languages">{{language.nativeName}}</option>
									</select>
								</div>
							</div>
							<div class="inputRow">
								<label><span class="bioIcon"></span>{{$t('common.bio')}}</label>
								<textarea id="bio" class="formControl" v-model="bio"  @input="changeBio"></textarea>
								<span>{{bio.length}}/{{maxAboutMe}}</span>
							</div>
						</div>
						<div v-if="fullResponse.subjects && !$store.getters['isParent']()">
						<h3 class="headingBordered"><span class="headingTitle">{{$t('settings.favourites')}} - {{$t('settings.subjects_small')}}  </span></h3>
						<div class="subjectsList clearfix">
							<ul>
								<li :class="{active: subject.isSelected}" v-for="subject in fullResponse.subjects" @click="markSubjectSelected(subject)">
									<span class="subImg">
				    			<img :src="subject.imageUrl" class="temp_size">
				    			<span class="checkIconGreen" v-if="subject.isSelected"></span>
									</span>
									{{subject.name}}
								</li>
							</ul>
						</div>
						</div>
						<div>
						<h3 class="headingBordered" v-if="!$store.getters['isParent']()"><span class="headingTitle">{{$t('settings.favourites')}} - {{$t('settings.hobbies_small')}} </span></h3>
						<div class="subjectsList clearfix" v-if="!$store.getters['isParent']()">
							<ul>
								<li class="{active: hobby.isSelected}" v-for="hobby in fullResponse.hobbies" @click="markHobbySelected(hobby)">
									<span class="subImg">
				    			<img :src="hobby.imageUrl" class="temp_size">
				    			<span class="checkIconGreen" v-if="hobby.isSelected"></span>
									</span>
									{{hobby.hobbyName}}
								</li>
							</ul>
						</div>
						<!-- <div class="btns clearfix"><button class="btn btn-primary pull-right" @click="saveData" :disabled="saveButtonLoading">{{$t('settings.save_changes')}}</button></div> -->
						<div class="btns clearfix"><customloader loaderClass="btn btn-primary pull-right" :loaderClick="saveData" :loaderDisabled="saveButtonLoading" loaderText="settings.save_changes"></customloader></div>
					</div>

					<upload-image-popup v-if="uploadImageOpen" :closePopup="togglePictureChangePopup" />




		</div></div>

				</div>


			</div>
		</div>
		</div>
	</div>
</template>

<script>
	import uploadImagePopup from '~/components/uploadImagePopup'
	import apiUrls from '../../config/apiUrls'
	import caller from '../../config/caller'
	export default {
		head () {
			return {
			title: this.$t('profile.editProfile')
			}
		},
		beforeDestroy () {
            this.$root.$off('onImageUpload')
        },
		computed: {
			getUserId() {
				let userId = this.$store.getters['getUserId']()
				return userId
			}
		},
		components: {
			uploadImagePopup
		},
		middleware: 'authenticated',
		data() {
			return {
				uploadImageOpen: false,
				fetchedUserSelectedImage: '',
				firstName: '',
				lastName: '',
				dataPayload: {},
				lang: '',
				show: true,
				schoolListoff: false,
				disableSchoolInput: false,
				schoolFilter: '',
				imgSrc: '',
        		cropImg: '',
				maxAboutMe: this.$store.getters['common/getBioMaxLength'](),
				saveButtonLoading: false,
				savePicButtonLoading: false,
				removePicButtonLoading: false,
				isExisting: false,
				isCropped: false,
				existingUrl: '',
				noPicture: true,
				selectedSchool: ''
			}
		},
		mounted() {
			this.$store.dispatch('header/navChange', {key: 1, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, context: this})
			this.$store.dispatch("auth/getLanguagesService")
			this.$store.dispatch('common/fetchSchools', {
				langCode: this.$store.state.locale.selectedLocale,
				city:this.cityId.cityId,
				country: this.countryId.countryId
			})
			if(this.$store.state.currentSelectedChild&&this.$store.state.currentSelectedChild.expiryDays <= 0) {
				this.$root.$emit('childExpiryPopUp', {
				byParent: this.$store.state.currentSelectedChild.expiryDays,
				bySubs: this.$router.currentRoute.path
			})
			}
			this.$store.dispatch('snowPlowPageView',{pageName: "MORE_PROFILE_SETTINGS"});

			if (this.pic) {
				this.noPicture = false
				let vm = this
				var xhr = new XMLHttpRequest();
				xhr.onload = function() {
					var reader = new FileReader();
					reader.onloadend = function() {
						let base64 = reader.result
						vm.imgSrc = base64;
						vm.cropImg = base64
					}
					reader.readAsDataURL(xhr.response);
				};
				xhr.open('GET', this.pic+'?_=' + new Date().getTime());
				xhr.responseType = 'blob';
				xhr.send();
			}

			this.$root.$on('onImageUpload', ({image, url, isExisting}) => {
				if (image) {
					this.imgSrc = image
					this.cropImg = image
					if (this.$refs.cropper) {
						this.$refs.cropper.replace(image);
					}
					this.existingUrl = ''
				} else if (url) {
					let vm = this
					var xhr = new XMLHttpRequest();
					xhr.onload = function() {
						var reader = new FileReader();
						reader.onloadend = function() {
							let base64 = reader.result
							vm.imgSrc = base64;
							vm.cropImg = base64
							if (vm.$refs.cropper) {
								vm.$refs.cropper.replace(base64);
							}
						}
						reader.readAsDataURL(xhr.response);
					};
					this.existingUrl = url
				xhr.open('GET', url+'?_=' + new Date().getTime());
				xhr.responseType = 'blob';
				xhr.send();
				}

				this.isCropped = false
				this.isExisting = isExisting? true : false
			})
			this.firstName =  this.$store.state.initialData.firstName
			this.lastName =  this.$store.state.initialData.lastName
		},
		fetch({store,params}) {
			// calculate how much data has to be fetched
			let promiseArray = []
			promiseArray.push(store.dispatch('common/fetchCountries', {
				authToken: store.state.auth.user.token,
				langCode: store.state.locale.selectedLocale
			}))
			promiseArray.push(store.dispatch('common/fetchCities', {
				authToken: store.state.auth.user.token,
				langCode: store.state.locale.selectedLocale
			}))
			// console.log(this.cityId);
			// console.log(this.country);
			// promiseArray.push(store.dispatch('common/fetchSchools', {
			// 	authToken: store.state.auth.user.token,
			// 	langCode: store.state.locale.selectedLocale,
			// 	city:this.cityId,
			// 	country: this.countryId
			// }))
			promiseArray.push(store.dispatch('common/fetchGrades', {
				authToken: store.state.auth.user.token,
				langCode: store.state.locale.selectedLocale
			}))
			return Promise.all(promiseArray)
		},
		asyncData({
			params,
			store
		}) {

			return caller.get(apiUrls.getProfileSetting(), store.state.auth.user.token, store.state.locale.selectedLocale).then((res) => {
				return {
					schoolId: res.data.school? res.data.school.schoolId: '',
					fullResponse: res.data,
					bio: res.data.bio,
					countryId: res.data.country,
					pic: res.data.pic,
					grade:res.data.grade,
					cityId: res.data.city,
					lang: res.data.language? res.data.language.code : ''
				}
			})
		},
		methods: {
			toDataUrl(url, callback) {
				var xhr = new XMLHttpRequest();
				xhr.onload = function() {
					var reader = new FileReader();
					reader.onloadend = function() {
						callback(reader.result);
					}
					reader.readAsDataURL(xhr.response);
				};
				xhr.open('GET', url);
				xhr.responseType = 'blob';
				xhr.send();
        	},
        	cropImage () {
				// get image data for post processing, e.g. upload or setting image src
				this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
				this.isCropped = true
        	},
			changeValues(event) {
				this[event.target.id] = event.target.value
			},
			imageUrl(event) {
			// Reference to the DOM input element
							var input = event.target;
							// Ensure that you have a file before attempting to read it
							if (input.files && input.files[0]) {
									// create a new FileReader to read this image and convert to base64 format
									var reader = new FileReader();
									// Define a callback function to run, when FileReader finishes its job
									reader.onload = (e) => {
											// Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
											// Read image as base64 and set to imageData
											this.pic = e.target.result;
											this.imgSrc = e.target.result
											this.cropImg = e.target.result
											if (this.$refs.cropper)
											{
												this.$refs.cropper.replace(e.target.result);
											}
									}
									// Start the reader job - read file as a data url (base64 format)
									reader.readAsDataURL(input.files[0]);
									this.dataPayload.updateProfilePic = input.files[0]
									// console.log(input.files[0]);
							}

			},
			checkBlankForDataShow() {
        if(this.schoolId === '') {
          this.schoolId = ' '
          this.schoolListoff = true
        }else{
          this.schoolListoff = false
        }
      },
      selectSchoolByCity() {
        if(this.cityId) {
          this.disableSchoolInput = false
          this.$store.dispatch('common/fetchSchools', {
            langCode: this.$store.state.locale.selectedLocale,
            city:this.cityId.cityId,
            country: this.countryId.countryId
          })
          if((this.schoolId)&&(this.$store.state.common.schoolList.indexOf(this.schoolId) === -1)) {
            this.disableSchoolInput = true
            this.schoolId = ''
            // this.selectedSchool = ''
          }
        }else {
          this.disableSchoolInput = true
        }
      },
			markHobbySelected(hobby) {
				let hobbies = this.fullResponse.hobbies
				let new_hobbies = []
				for (let i = 0; i < hobbies.length; i++) {
					if (hobbies[i].hobbyId === hobby.hobbyId) {
						let selectedNumber = hobbies[i].isSelected === 1 ? 0 : 1
						let newHobby = Object.assign({}, hobbies[i], {
							isSelected: selectedNumber
						})
						new_hobbies.push(newHobby)
					} else {
						new_hobbies.push(hobbies[i])
					}
				}
				this.fullResponse.hobbies = new_hobbies
			},
			markSubjectSelected(subject) {
				let subjects = this.fullResponse.subjects
				let new_subjects = []
				for (let i = 0; i < subjects.length; i++) {
					if (subjects[i].id === subject.id) {
						let selectedNumber = subjects[i].isSelected === 1 ? 0 : 1
						let newSubject = Object.assign({}, subjects[i], {
							isSelected: selectedNumber
						})
						new_subjects.push(newSubject)
					} else {
						new_subjects.push(subjects[i])
					}
				}
				this.fullResponse.subjects = new_subjects
			},
			saveData() {
				this.saveButtonLoading = true
				if (this.firstName === '' || this.firstName === undefined) {
					this.$toast.error(this.$t('toastMsg.first_name_required'))
					this.saveButtonLoading = false
					return
				} else if (this.firstName.trim().length<2 ) {
					this.$toast.error(this.$t('toastMsg.min_2_characters') + this.$t('register.first_name'))
					this.saveButtonLoading = false
					return
				} else if (this.lastName === '' || this.lastName === undefined) {
					this.$toast.error(this.$t('toastMsg.last_name_required'))
					this.saveButtonLoading = false
					return
				} else if (this.lastName.trim().length<2 ) {
					this.$toast.error(this.$t('toastMsg.min_2_characters') + this.$t('register.last_name'))
					this.saveButtonLoading = false
					return
				} else if (!this.$store.getters['isParent']()&&this.$store.state.common.schoolList.filter(school => {return school.schoolId === this.schoolId}).length === 0) {
					console.log("this.schoolId ",this.schoolId);
					this.$toast.error(this.$t('toastMsg.dropDownSchoolName'))
					this.saveButtonLoading = false
					return
				} else {
					let payload = {
						hobbies: this.fullResponse.hobbies.filter(hobby => hobby.isSelected),
						subjects: this.fullResponse.subjects? this.fullResponse.subjects.filter(subject => subject.isSelected) : [],
						bio: this.bio,
						city: this.cityId,
						country: this.countryId,
						firstName: this.firstName,
						lastName: this.lastName,
						school: this.$store.state.common.schoolList.filter(school => (school.schoolId === this.schoolId))[0],
						// school: this.schoolId,
						lang: this.lang
					}
					if(!this.$store.getters['isParent']()) {
						// payload['schoolId'] = this.$store.state.common.schoolList.filter(school => (school.name === this.schoolId))[0].schoolId
						payload['schoolId'] = this.schoolId;
					}
					this.$store.dispatch('profile/updateProfile', {
						authToken: this.$store.state.auth.user.token,
						langCode: this.$store.state.locale.selectedLocale,
						payload
					}).then(response => {
						this.saveButtonLoading = false
						if(response.data.status === 'SUCCESS') {
							//this.$toast.success(this.$t('toastMsg.profileUpdated'))
							if (this.lang) {
									this.$store.dispatch('locale/setlanguage', {
											context: this,
											locale: this.lang,
											locales: this.$store.state.locale.locales
									})
									if (this.i18n) {
											this.i18n.locale = this.lang
									}
							}
						}
					}, error => {
						this.saveButtonLoading = false
					})
				}
			},
			saveProfileChanges() {
				this.$store.dispatch('profile/getSignedUrl', {
					authToken: this.$store.state.auth.user.token,
					langCode: this.$store.state.locale.selectedLocale,
					name: 'profile'
				}).then( (response => {
					this.$store.dispatch('profile/uploadToS3', {
					file: this.dataPayload.updateProfilePic,
					s3Url: response.data.url
				})
					}))
			},
			togglePictureChangePopup() {
				this.uploadImageOpen = !this.uploadImageOpen
			},
			closePopup() {
				let userId = this.$store.state.initialData.userId
				this.$router.push(this.$store.getters['locale/getFinalUrl'](`/profile/${userId}`))
			},
			toggleShow() {
				this.show = !this.show;
			},
			saveProfilePic (file) {
				let dataURL = this.cropImg
				if (this.cropImg) {
					this.savePicButtonLoading = true
					var blobBin = atob(dataURL.split(',')[1]);
					var array = [];
					for(var i = 0; i < blobBin.length; i++) {
						array.push(blobBin.charCodeAt(i));
					}
					var fileToBeUploaded=new Blob([new Uint8Array(array)], {type: 'image/png'});
					if(fileToBeUploaded.size > 1000000) {
						this.savePicButtonLoading = false
						this.$toast.error(this.$t('toastMsg.imgError'))
					} else {
						let payload = {}
						if (!this.isCropped && this.isExisting) {
							payload['url'] = this.existingUrl
						} else {
							payload = new FormData()
							payload.append ('file', fileToBeUploaded)
						}
						this.$store.dispatch('profile/updateProfilePic', {
							authToken: this.$store.state.auth.user.token,
							langCode: this.$store.state.locale.selectedLocale,
							payload,
							context: this,
							isExisting: (!this.isCropped && this.isExisting)
						}).then((response) => {
							this.savePicButtonLoading = false
							if (this.$refs.cropper) {
								this.$refs.cropper.replace(this.cropImg);
							}
							this.pic = this.cropImg
							this.imgSrc = this.cropImg
							if (!this.isCropped && this.isExisting) {
								this.noPicture = false
							}
						}, error => {
							this.savePicButtonLoading = false
						})
					}
				}
			},
			removeProfilePic () {
				this.removePicButtonLoading = true
				let payload = {}
				payload["url"] = ""
				this.$store.dispatch('profile/updateProfilePic', {
					authToken: this.$store.state.auth.user.token,
					langCode: this.$store.state.locale.selectedLocale,
					payload,
					context: this,
					isRemoval: true
				}).then(response => {
					this.removePicButtonLoading = false
					this.noPicture = true
					this.imgSrc =  ''
					this.cropImg = ''
				}, error => {
					this.removePicButtonLoading = false
				})
			},
			changeBio (event) {
				let newValue = event.target.value
				if(newValue.length>this.maxAboutMe) {
					newValue = newValue.substr(0,this.maxAboutMe)
				}
				this.bio = newValue
			},
			usersTagInput() {
				this.selectedSchool = ''
				this.schoolListoff = true
			},
			onBlurTaggedChipsShow() {

				// this.$store.dispatch('register/fetchSchools', {langCode: this.$store.state.locale.selectedLocale}).then(response => {
					// let taggedDataList = this.$store.state.note.userTagList.tags;
					if(this.$store.state.common.schoolList.indexOf(this.schoolId) === -1){
						this.selectedSchool = this.schoolId;
					}
			},
			selectedUserSchool(data) {
				this.schoolListoff = false
				this.selectedSchool = data
				this.schoolId = data.name
			}

		},
		computed: {
			filterInputSearchSchoolData() {
				return this.$store.state.common.schoolList.filter(school => {
					return school.name.toLowerCase().indexOf(this.schoolId.toLowerCase()) !== -1
			})
			}
		}
	}
</script>
<style>
/* .filterListOpt{
	box-shadow: 0 0 6px lightgray;position: absolute;width: 100%;z-index: 9;background: #fff;
}
.filterListOpt li{padding: 5px;}
.filterListOpt li:hover{
	background: lightgray;
} */
.uploadAnotherPicSec .uoloadAnotherBtn.centUploadBtn{float:none;margin:0 auto;}
</style>

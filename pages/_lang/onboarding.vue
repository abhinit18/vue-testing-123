<template>
  <div>

  <!--  <div class="boardPopOvelay">
   </div> -->
  <div class="boardContent boardingVideoPg" :class="{videoplay: isPlaying}" v-if="stepNo===0">
   <!--  <div class="embed-responsive embed-responsive-4by3">
       <video  class="embed-responsive-item" controls>
         <source src="~assets/images/video/Summer_Place_Flyby.webm" type="video/webm">
         Your browser does not support the video tag.
       </video>
     </div> -->



<!-- <video width="100%" height="400" poster="assets/img/myVideo.jpg" controls="controls" preload="none">
     <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
  </video> -->


<!-- <iframe width="100%" height="360" style="height: calc(100vh - 100px)" src="https://www.youtube.com/embed/-aIYWsTk2F8?vq=hd" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe> -->
      <div class="full-width">
          <div class="video-player-box videoPlayerBox" @play="onPlayerPlay($event)" @pause="onPlayerPause($event)" @ended="onPlayerEnded($event)" v-video-player:myVideoPlayer="playerOptions">
      </div>
    </div>

        <div class="boardingBottomInfo">
		    <div class="conMidSec">
		       <div class="vidBottomInfoInner clearfix">

		       <div class="rightSteps">
             <a  class="btn whiteBgBtn" @click="toStep1" style="margin-right:10px;">{{$t('register.skip')}}</a>
             <a class="btn whiteBgBtn" @click="playVideo($event)">{{$t('onboarding.lets_go')}}</a>
           </div>
			       <div class="maskotLms">
			         <img src="~assets/images/MascotLms.png">

			       </div>
			       <div class="infoTxt">
		             <h2 class="infoHeading">{{$t('onboarding.onboarding_message')}}, {{$store.state.initialData.firstName}} !</h2>
		             <p>{{$t('onboarding.onboarding_message_description')}}</p>

		           </div>

		     </div>

		    </div>
		  </div>
  </div>



 <div class="boardContent" v-if="stepNo===1">
        <div class="boardPgUploadBtn"  v-if="imgSrc===''">
           <input type="file" accept="image/*" @change="imageUrl" class="inputFile">
           <span class="uploadBtnIcon">
           	<i class="material-icons">add_circle</i>
           	{{$t('onboarding.upload')}}
           </span>
        </div>
        <p class="picConstraintFont">{{$t('profile.pictureConstraint')}}</p>
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
										<div class="uoloadAnotherBtn">
												 <input type="file" accept="image/*" @change="imageUrl" class="inputFile">
												<span class="uplodIcon"><i class="material-icons">add_circle</i>{{$t('onboarding.add_another')}}</span>
											</div>
										<p class="likeTxt"></p>
										</div>
                					</div>
									 </div>
									</div>
        <br>
        <div class="btnSec text-center" style="position:absolute;" v-if="fetchedUserSelectedImage">
          <button type="button" class="btn btn-primary btnCancel" @click="removeImage">{{$t('onboarding.cancel')}}</button>
          <!-- <button type="button" class="btn btn-primary" @click="saveImg">{{$t('onboarding.save')}}</button> -->
          <customloader loaderClass="btn btn-primary" :loaderClick="saveImg" :loaderDisabled="saveButtonLoading" loaderText="onboarding.save"></customloader>
         </div>


        <div class="boardingBottomInfo addProfile">
		    <div class="conMidSec">

		       <div class="vidBottomInfoInner clearfix">

		       <div class="rightSteps" >
		         <p class="stepCount">{{$t('onboarding.step')}} 1/3</p>
		         <a  class="btn whiteBgBtn" @click="backToFirstFold" style="margin-right:10px;">{{$t('register.back')}}</a>
		         <a  class="btn whiteBgBtn" @click="toStep2">{{$t('onboarding.continue')}}</a>
		         </div>
			       <div class="maskotLms">
			         <img src="~assets/images/MascotLms.png">
			       </div>
			       <div class="infoTxt">
		             <h2 class="infoHeading">{{$t('onboarding.add_pic')}}</h2>
		             <p>{{$t('onboarding.add_pic_msg')}}</p>
               </div>

		     </div>

		    </div>
		  </div>
 </div>
<div class="boardContent boardingForm" v-if="stepNo===2">
        <div class="formBoarding regFormElements">

           <div class="inputRow">
                 <div class="custSelect">
                    <span @click="selectLanguage">
                      <span v-if="!allLanguages">{{$t('onboarding.prefered')}}</span>
                      <span v-if="allLanguages">{{allLanguages.nativeName}}</span>
                      <i class="icons arrow"><i class="material-icons">&#xE313;</i></i>
                    </span>
                    <div class="drop" v-if="showLanguage">
                       <ul>
                          <li @click="selectedLanguage(language)" v-for="language in this.$store.state.auth.languages.languages">{{language.nativeName}}</li>
                          <!-- <li>Kazakh</li>
                          <li>Russian</li> -->
                       </ul>
                    </div>
                 </div>
                 <div class="required">*
                   </div>
              </div>
              <div class="inputRow textarea">
                 <!-- <span class="textLimit">280</span> -->
                <textarea class="formControl" @input="changeAboutMe" v-model="aboutMe" :placeholder="$t('onboarding.about_me_placeholder')"></textarea>
                <span>{{aboutMe.length}}/{{maxAboutMe}}</span>
              </div>
        </div>
        <div class="boardingBottomInfo selfIntro">
			    <div class="conMidSec">

			       <div class="vidBottomInfoInner clearfix">

			       <div class="rightSteps">
			         <p class="stepCount">{{$t('onboarding.step')}} 2/3</p>
			         <a  class="btn whiteBgBtn" @click="backToStep1" style="margin-right:10px;">{{$t('register.back')}}</a>
			         <!-- <a  class="btn whiteBgBtn" @click="toStep3">{{$t('onboarding.continue')}}</a> -->
               <customloader loaderClass="btn whiteBgBtn" :loaderClick="toStep3" :loaderDisabled="saveButtonLangPreferLoading" loaderText="onboarding.continue"></customloader>

			         </div>
				       <div class="maskotLms">
				         <img src="~assets/images/MascotLms.png">
				       </div>
				       <div class="infoTxt">
			             <h2 class="infoHeading">{{$t('onboarding.introduce')}}</h2>
			             <p>{{$t('onboarding.introduction_msg')}}.</p>
			           </div>

			     </div>

			    </div>
			  </div>
</div>



<div class="boardContent" v-if="stepNo===3">
    <div class="boardPgPickThemeSec">
			 <div class="boardPgPickTheme" v-bind:style="{backgroundColor:chosenThemeColor}">
			    <div class="conMidSec">
				    <div class="boardPic">
				      <img src="~assets/images/boardThemePic.png">
				    </div>
			   </div>
			 </div>
			 <div class="boardThemeOptSec text-center">
			    <div class="conMidSec">
			        <button type="button" @click="updateTheme(theme)" v-for="theme in allThemes" v-bind:style="{background:theme.color}" :class="[{themeOptBtn: true, active: chosenThemeColor === theme.color}]">
			        	<i class="material-icons selctedTheme">&#xE91D;</i>
			        </button>
			         <!-- <button type="button" class="themeOptBtn opt2">
			        	<i class="material-icons selctedTheme">&#xE91D;</i>
			        </button>
			         <button type="button" class="themeOptBtn opt3">
			        	<i class="material-icons selctedTheme">&#xE91D;</i>
			        </button>
			         <button type="button" class="themeOptBtn opt4">
			        	<i class="material-icons selctedTheme">&#xE91D;</i>
			        </button>
			         <button type="button" class="themeOptBtn opt5">
			        	<i class="material-icons selctedTheme">&#xE91D;</i> -->
			        </button>
			    </div>
			 </div>


	 </div>
	  <div class="boardingBottomInfo pickTheme" >
			    <div class="conMidSec">
			       <div class="vidBottomInfoInner clearfix">

			       <div class="rightSteps" >
               <a class="btn whiteBgBtn" style="margin-right:10px;" @click="backToStep2">{{$t('register.back')}} </a>
               <a class="btn whiteBgBtn" @click="allSetupDone">{{$t('onboarding.done')}} <i class="material-icons">thumb_up</i></a>
             </div>
				       <div class="maskotLms">
				         <img src="~assets/images/MascotLms.png">
				       </div>
				       <div class="infoTxt">
                 <h2 class="infoHeading">{{$t('onboarding.almost_there')}}</h2>
                 <p>{{$t('onboarding.select_theme')}}</p>
			           </div>

			     </div>

			    </div>
            </div>
 </div>


<!-- <div class="boardingPg"> -->
 <!--  <div class="boardingPgFormSec">
     <div class="conMidSec">
        <div class="boardPgUploadBtn">
           <input type="file" class="inputFile">
           <span class="uploadBtnIcon">
           	<i class="material-icons">add_circle</i>
           	Upload Photo
           </span>
        </div>

        <div class="formBoarding regFormElements">
           <div class="inputRow">
                 <div class="custSelect">
                    <span>Select your preferred language</span>
                    <i class="icons arrow"><i class="material-icons">&#xE313;</i></i>
                    <div class="drop" style="display:none;">
                       <ul>
                          <li>India</li>
                           <li>England</li>
                       </ul>
                    </div>
                 </div>
              </div>
              <div class="inputRow textarea">
                 <span class="textLimit">280</span>
                <textarea class="formControl" placeholder="Write about yourself here…"></textarea>
              </div>
        </div>
     </div>
  </div> -->
  <!-- <div class="boardingBottomInfo">
    <div class="conMidSec">
       <div class="vidBottomInfoInner clearfix">

       <div class="rightSteps"><a href="#" class="btn whiteBgBtn">Let’s Go</a></div>
	       <div class="maskotLms">
	         <img src="~assets/images/MascotLms.png">
	       </div>
	       <div class="infoTxt">
             <h2 class="infoHeading">We’re glad you’re here, Masymkhan !</h2>
             <p>You can know all about us by watching this video.</p>
           </div>

     </div>

    </div>
  </div> -->
 <!--  <div class="btnSec clearfix">
       	  <button type="button" class="btn btn-primary">Cancel</button>
       	  <button type="button" class="btn btn-primary">Save Changes</button>
  </div> -->
 <!--  <div class="boardingBottomInfo addProfile">
    <div class="conMidSec">

       <div class="vidBottomInfoInner clearfix">

       <div class="rightSteps">
         <p class="stepCount">step 1/3</p>
         <a href="#" class="btn whiteBgBtn">Continue</a>
         </div>
	       <div class="maskotLms">
	         <img src="~assets/images/MascotLms.png">
	       </div>
	       <div class="infoTxt">
             <h2 class="infoHeading">Add Profile Picture</h2>
             <p>Upload you favourite selfie here, so that your friends can see it too!</p>
           </div>

     </div>

    </div>
  </div> -->

 <!--  <div class="boardingBottomInfo selfIntro">
    <div class="conMidSec">

       <div class="vidBottomInfoInner clearfix">

       <div class="rightSteps">
         <p class="stepCount">step 2/3</p>
         <a href="#" class="btn whiteBgBtn">Continue</a>
         </div>
	       <div class="maskotLms">
	         <img src="~assets/images/MascotLms.png">
	       </div>
	       <div class="infoTxt">
             <h2 class="infoHeading">Introduce Yourself</h2>
             <p>Tell your friends about who your are and what kind of stuff you’re into.</p>
           </div>

     </div>

    </div>
  </div> -->

<!-- </div> -->




  </div>
</template>

<script>
export default {
  head () {
      return {
        title: this.$t('index.onboarding')
      }
    },
  middleware: 'authenticated',
  layout: 'login',
  data() {
    return {
      maxAboutMe: this.$store.getters['common/getBioMaxLength'](),
      dataPayload: {},
      showLanguage: false,
      saveButtonLoading: false,
      saveButtonLangPreferLoading: false,
      allLanguages: '',
      allThemes: [],
      chosenThemeColor: '',
      fetchedUserSelectedImage: '',
      aboutMe: '',
      stepNo: 0,
      background: '#ffa4ba',
      overrideBackground: {background:''},
      playerOptions: {
          // videojs options
          muted: false,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: "video/mp4",
            src: 'https://kplms-content.s3.ap-south-1.amazonaws.com/kplms-content/en-content/onboarding%20video1513677127108'
          }],
          poster: "",
          autoplay: false
        },
      isPlaying: false,
      imgSrc: '',
      cropImg: ''
    }
  },
  methods: {
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
                    this.fetchedUserSelectedImage = e.target.result;
                    this.imgSrc = e.target.result
                    this.cropImg = e.target.result
                    if (this.$refs.cropper) {
                      this.$refs.cropper.replace(e.target.result)
                    }
                }
                // Start the reader job - read file as a data url (base64 format)
                reader.readAsDataURL(input.files[0]);
                this.dataPayload.updateProfilePic = input.files[0]
            }

    },
    playVideo() {
      this.myVideoPlayer.play()
    },
    removeImage () {
      this.imgSrc = ''
      this.cropImg = ''
      if (this.$refs.cropper) {
          this.$refs.cropper.replace('')
      }
    },
    toDataUrl(url, callback) {
				var xhr = new XMLHttpRequest();
				xhr.onload = function() {
					var reader = new FileReader();
					reader.onloadend = function() {
						callback(reader.result);
					}
					reader.readAsDataURL(xhr.response);
				};
				xhr.open('GET', url+'?_=' + new Date().getTime());
				xhr.responseType = 'blob';
				xhr.send();
        	},
        	cropImage () {
				// get image data for post processing, e.g. upload or setting image src
				this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
        	},
    backToStep1() {
      this.stepNo = 1
    },
    backToStep2() {
      this.stepNo = 2;
    },
    backToFirstFold() {
      this.stepNo = 0;
    },
    changeAboutMe (event) {
      let newValue = event.target.value
      if(newValue.length>this.maxAboutMe) {
        newValue = newValue.substr(0,this.maxAboutMe)
      }
      this.aboutMe = newValue
    },
    selectLanguage() {
      this.showLanguage = !this.showLanguage
    },
    selectedLanguage(data) {

      this.showLanguage = false
      this.allLanguages = data
    },
    saveImg() {
      this.saveButtonLoading = true
      if(this.cropImg!=='') {
        let dataURL = this.cropImg
				var blobBin = atob(dataURL.split(',')[1]);
				var array = [];
				for(var i = 0; i < blobBin.length; i++) {
					array.push(blobBin.charCodeAt(i));
				}
			var fileToBeUploaded=new Blob([new Uint8Array(array)], {type: 'image/png'});
      if(fileToBeUploaded.size > 1000000) {
        this.$toast.error(this.$t('toastMsg.imgError'))
        this.saveButtonLoading = false
      }else {
        let imgData = new FormData()
        imgData.append ('file',fileToBeUploaded)
        let authToken = this.$store.state.auth.user.token
        let langCode = this.$store.state.locale.selectedLocale
        this.$store.dispatch("auth/onboardingProfileImage", { authToken, langCode, imgData }).then(res => {
            if(res.data.status === 'SUCCESS') {
              this.$toast.success(this.$t('toastMsg.imgSuccess'));
            }
						if (this.$refs.cropper) {
							this.$refs.cropper.replace(this.cropImg);
						}
						this.pic = this.cropImg
						this.imgSrc = this.cropImg
            this.saveButtonLoading = false
        }, error => {
          this.saveButtonLoading = false
        });

      }
      }
    },
    skipStep2() {
      this.stepNo = 2
      this.fetchedUserSelectedImage = ''
    },
    toStep1() {
      this.stepNo = 1
    },
    toStep2() {
      this.$store.dispatch("auth/getLanguagesService").then(response => {
        if(response.data.status !== 'ERROR') {
          this.stepNo = 2
        }
      })
      // console.log(this.dataPayload.preference.language);

    },
    allSetupDone() {
      if (this.allLanguages.code) {
          this.$store.dispatch('locale/setlanguage', {
              context: this,
              locale: this.allLanguages.code,
              locales: this.$store.state.locale.locales
          })
          this.$router.push(this.$store.getters['locale/getFinalUrl'](`/`));
      }
      setTimeout(() => {
        let done =  true
        this.$root.$emit('openOnboardingPopupEmit',{done})
      }, 1000)

    },
    toStep3() {
      this.saveButtonLangPreferLoading = true
      if((this.allLanguages === ''|| this.allLanguages === undefined)) {
        this.$toast.error(this.$t('onboarding.langMandatory'))
        this.saveButtonLangPreferLoading = false
        return false
      }
      // if((this.aboutMe === ''|| this.aboutMe === undefined)) {
      //   this.$toast.error(this.$t('onboarding.aboutMandatory'))
      //   return false
      // }
      else{
        let authToken = this.$store.state.auth.user.token
        let langCode = this.$store.state.locale.selectedLocale
        let finalBioPayload = {
          bio:this.aboutMe,
          id:this.allLanguages.languageId
        }

        // this.dataPayload.preference.bio = this.aboutMe
        // this.dataPayload.preference.id = this.allLanguages.languageId
        this.$store.dispatch("auth/finalUpdateBio",{authToken, langCode, finalBioPayload}).then(response =>{

          if(response.data.status === 'SUCCESS') {
            this.$store.dispatch("auth/getUserProfileThemes",{authToken, langCode}).then(response => {
              if(response.data.status === 'SUCCESS') {
                this.allThemes = response.data.themes
                if (response.data.themes.length!==0) {
                  this.chosenThemeColor = response.data.themes[0].color
                }
                this.saveButtonLangPreferLoading = false
              }
            })
            this.stepNo = 3
          }
        }, error => {
          this.saveButtonLangPreferLoading = false
        })

      }



    },
    updateTheme(data) {

      this.chosenThemeColor = data.color
      let authToken = this.$store.state.auth.user.token
      let langCode = this.$store.state.locale.selectedLocale
      this.$store.dispatch("auth/themeSelection",{authToken, langCode, id:data.themeId,theme:data}).then(response => {

        if(response.data.status === 'SUCCESS'){

        }
      })
      // this.$router.replace({ path: '/' })
    },
    showCongo() {
      this.stepNo = 4
    },
    onPlayerPlay(player) {
      this.isPlaying=true
    },
    onPlayerPause(player) {
      this.isPlaying=false
    },
    onPlayerEnded(player) {
      this.isPlaying=false
    }
  },
  mounted() {
    let dataParamObj = this.$router.currentRoute.path
    this.$root.$emit('showLangCodeActive', {dataParamObj})
  }
}

</script>

<style>
.boardContent.boardingVideoPg{ padding: 0}
.boardContent .required,
.boardContent .custSelect{ display: inline-block; vertical-align: top}
.boardContent .required{  color: red; padding: 0 0 0 10px}
.picConstraintFont {font-size: 12px; text-align: center; padding: 7px 0; margin: 0;}
</style>

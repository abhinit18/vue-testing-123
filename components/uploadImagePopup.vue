<template>
<div class="SettingOverlay">
	   <div class="uploadPicPopup" v-on-click-outside="closePopup">
	     <div class="topHeading">
	       <i class="material-icons">perm_identity</i> {{$t('profile.replacePicture')}}
	     </div>
	     <div class="contentCenter">
				 	<!-- <input type="file" id="file-1" @change="onImageUpload"> -->
	         <div class="uplodBtnGreen">
	             <label> <input type="file" @change="onImageUpload"> <span class="uploadIcon"></span> {{$t('profile.uploadPicture')}} </label>
            </div>
            <p class="picSizeTxt">{{$t('profile.pictureConstraint')}}</p>
						<div v-if="pics.length>0">
            <div class="orDivider">
              <span class="orIcon">{{$t('common.or')}}</span>
            </div>
            <p>{{$t('profile.selectFromBelow')}}</p>
						</div>
	     </div>
	     <div class="profileSelectPicSec" v-if="pics.length>0">
		      <ul class="profileSelectPic">
	              <li v-for="pic in pics">
                    <div class="imgBox">
                      <div class="imgOverlay">
                        <button class="btn btn-primary btnApply" @click="onApply(pic)">{{$t('common.apply')}}</button>
                      </div>
	                  <img :src="pic">
	                </div>
	              </li>
	          </ul>
	       </div>
	   </div>
	</div>
    </template>
	<script>
	export default {
		mounted () {
			this.$store.dispatch('profile/getLastPics', {
					authToken: this.$store.state.auth.user.token,
					langCode: this.$store.state.locale.selectedLocale
				}).then(response => {
					this.pics = response.data.userPics? response.data.userPics : []
				})
		},
		props: ['closePopup'],
		methods: {
			onImageUpload (e) {
				let files = e.target.files || e.dataTransfer.files
					let fr = new FileReader();
					let that = this
			fr.onload = function(e) {
								that.$root.$emit('onImageUpload' , {image: fr.result, isExisting: false})
								that.closePopup()
			}
			fr.readAsDataURL(files[0]);
			},
			onApply (selectedUrl) {
				this.$root.$emit('onImageUpload' , {url: selectedUrl, isExisting: true})
				this.closePopup()
			}
		},
		data () {
			return {
				pics: []
			}
		}
	}
	</script>

	<style>
	.uplodBtnGreen{ position: relative}
	.uplodBtnGreen label{ width: 100%; position: relative; color:#212121;font-weight:normal;}
	.uplodBtnGreen input[type=file]{    position: absolute;
    width: 400px;
    height: 50px;
    left: 0;
    top: 0;
    opacity: 0; }
	</style>
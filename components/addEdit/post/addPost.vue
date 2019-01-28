<template>
<div class="postPopUpSec fade in" id="scrollTop">
  <div class="postShareTextBox clearfix" role="document">
  <!-- <div class="sharePopUp clearfix">
     <div class="topHeading">
         <i class="material-icons">share</i> Share
       </div>
       <div class="contentArea">
        <p class="sharetxt">Select from the pictures below</p>
         <button class="btn btn-primary btn-block shareBtn"> <i class="material-icons">lightbulb_outline</i> Share as Post</button>
         <div class="orDivider">
              <span class="orIcon">OR</span>
          </div>
          <ul class="socialIcons">
             <li><a href="#"><span class="icons"></span></a></li>
             <li><a href="#"><span class="icons icon_2"></span></a></li>
             <li><a href="#"><span class="icons icon_3"></span></a></li>
             <li><a href="#"><span class="icons icon_4"></span></a></li>
             <li><a href="#"><span class="icons icon_5"></span></a></li>
          </ul>
      </div>
 </div> -->
    <div class="modal-content">
         <!--button type="button" @click="close"><i class="material-icons">&#xE5CD;</i></button-->
      <div class="modal-body" v-bind:style="{backgroundColor:  chosenBgColor}">

        <profilepicBox/>
        <!-- <img :src="this.$store.state.initialData.profilePic===''? 'img/images/user_image.png': this.$store.state.initialData.profilePic" class="img"> -->
        <div class="statusText">



          <div class="postLoc"> <span v-if="this.address.formattedAddress">-At {{this.address.formattedAddress}} <button class="btn locBtnClose" @click="clearAddedPlaceField()"><i class="material-icons">close</i></button> </span> </div>


        <div class="textType">
          <div class="buddyAdded" v-for="nm in taggedUserName">{{nm.name}}
              <span aria-hidden="true" class="cursor" @click="removeTag(nm.id)">×</span>
          </div>
        </div>



          <div class="textarea-container"   id="app" ref="app">
            <textarea ref="thoughtinput" v-model="postData" v-on:input="postDataChange"  v-on:keyup="textAreaAdjust" autofocus="true" :placeholder="$t('post.start_typing')"></textarea>
              <!--  <textarea class="form-control" :placeholder="$t('post.add_comment_type_here')" value="" v-model="commentText" style="overflow:hidden"></textarea> -->
               <div class="textarea-size" v-html="postDataDiv" id="appa" ref="appa"></div>
             </div>




             <div class="addedImagesSection" v-if="tempPicUrl.length !== 0">

                <div class="aimg" v-for="(pic,index) in tempPicUrl">
                    <img :src="pic.url">
                    <span class="aclose" @click="removeTempPic(index)">x</span>
                </div>

             </div>


        </div>


        <!-- <div class="postItem active">
          <div class="media">
            <div class="media-left">
              <a>
                <img src="http://tourwizard.net/blog/wp-content/uploads/2016/06/Eric_Morrison.jpg" width="47" height="47" alt="...">
              </a>
            </div>
            <div class="media-body">
              <h4 class="media-heading">Neeraj yadav</h4>
          <p class="datime">Fri Oct 20 2017 12:48:23 GMT+0530 (IST)</p>
          <div class="info">This curriculum is designed in accordance with the Stadance with the State. This curriculum is designed in accoriculum is designed in with the State. This curriculum is designed in is des his curriculum is designed in accordance with..
          </div>
        </div>
      </div>
    </div> -->

    <contentShareBox :content="sharedContent || sharedPost || (post && post.SharedContentResponse)" v-if="sharedContent || (post && post.SharedContentResponse) ||(sharedPost && !sharedPost.postId)"/>
    <postRow :post="sharedPost || post.sharedPostResponse || (post && post.SharedContentResponse)" v-else-if="sharedPost|| (post && post.SharedContentResponse) || (post && post.postShareId)" :share="true"/>
          <!-- :perLine="6" :native="false" :skin="6" :emoji-size="20" :include="['people']" set="facebook"  -->
        <div class="emoj" v-if="emojBox" v-on-click-outside="openEmojBox">
            <picker :showCategories="false" :include="['people']" :backgroundImageFn="((set, sheetSize) => '/img/emoji_16.png')" :custom="customEmojis" @click="addEmoji" :emojiSize="16" :sheetSize="16"></picker>
        </div>

        <div class="emoj" v-if="picData">

          <ul class="list-inline">
            <li v-for="pic in tempPicUrl">
              <img :src="pic.url" class="img-thumbnail set-dimension" alt="selected pic"/>
            </li>
            <li>
              <div class="boardPgUploadBtn cstm-upld-style" >
              <input type="file" accept="image/*" @change="imageUrl" class="inputFile">
              <span class="uploadBtnIcon">
                <i class="material-icons">add_circle</i>
                {{$t('onboarding.upload')}}
              </span>
              </div>
            </li>
          </ul>

        </div>
      </div>
      <div class="modal-footer">


        <div class="postThemeSec" v-on-click-outside="openFeedColor" v-if="feedColorTab">

          <div v-swiper:mySwiper="swiperOption" v-if="feedColorTab">
             <div class="swiper-wrapper">
                <div class="swiper-slide" @click="changeFeedColor(color)" v-for="color in textColor" v-bind:class="{active: chosenColor === color.color || color.isdefault }"><button class="btn btnTheme" v-bind:style="{backgroundColor: color.feedColor}">Aa</button></div>
                <!-- <div class="swiper-slide"><button class="btn btnTheme active" >Aa</button></div> -->
               </div>
          </div>
          <button class="btn btn-link tbutton-prev" v-if="feedColorTab"><i class="material-icons">chevron_left</i></button>
          <button class="btn btn-link tbutton-next" v-if="feedColorTab"><i class="material-icons">chevron_right</i></button>

        </div>

<!-- <span @click="openPicBox" class="emojiIco"><i class="material-icons">&#xE24E;</i></span> -->
         <div class="statusBtns">
            <div class="postBtnsOptions">
              <span @click="openEmojBox" v-bind:class="{active: emojBox}" class="emojiIco"><i class="material-icons">&#xE24E;</i></span>
              <div class="locbtnBlock">
              <button class="btn btn-link" v-bind:class="{active: searchLocation}" @click="locationDrpDown"><i class="material-icons">location_on</i></button>
               <div class="feedAddLocDrop" v-on-click-outside="locationDrpDown" v-if="searchLocation">
                 <div class="addLocTopSec">
                    <p class="addLocText">{{$t('parentLog.location')}}</p>
                      <div class="regFormElements locSrchBox">
                        <div class="formControlOuter">
                          <vue-google-autocomplete
                            ref="address"
                            id="map"
                            classname="formControl"

                            placeholder="Please type your address"
                            v-on:placechanged="getAddressData"
                            country=""
                        >
                        </vue-google-autocomplete>
                        <!-- <input type="text" class="formControl" placeholder="At JMD Megapolis, Sohna road"> -->
                        <!-- <button type="submit" class="btn btn-default btnSrch" >
                          <i class="material-icons">search</i>
                        </button> -->
                        <button type="button" class="btn btn-link locSrchClsBtn" @click="clearPlaceField"><i class="material-icons">cancel</i></button>
                        </div>
                      </div>
                 </div>

              </div>
              </div>


              <div class="btn btn-link btnUpload" v-if="($store.getters['isParent']() || $store.getters['isTeacher']())&& !sharedPost && !sharedContent"><input type="file" accept="image/*" @change="imageUrl"> <i class="material-icons">add_photo_alternate</i></div>
              <!-- <button class="btn btn-link"><i class="selectColorBtn"></i></button>               -->

              <div class="locbtnBlock">
              <button class="btn btn-link" v-bind:class="{active: tagOn}" @click="toggleTagOn"><i class="material-icons">perm_identity</i></button>
               <div class="feedAddLocDrop" v-on-click-outside="toggleTagOn"  style="padding:0px;"  v-if='tagOn'>
                 <div class="addLocTopSec">
                    <p class="addLocText">{{$t('parentLog.tagFrnd')}}</p>
                      <div class="regFormElements locSrchBox">
                        <div class="formControlOuter">


                       <input class="formControl" v-if="tagOn" v-model="tagData" @input="getUserList" :placeholder="$store.getters['isTeacher']? $t('teacher.tagging_description') : $t('post.tagging_description')">

                        </div>
                      </div>
                 </div>
                 <div class="feedAddLocDropInner">
                   <!-- tagData !== '' &&  -->
                   <tagSuggestions v-if="showTagList" @selected="handleSelectedIds" :taggedUsers="taggedUserName"/>
                 </div>
              </div>
              </div>
              <!-- <button class="btn btn-link btnUpload active"><input type="file"> <i class="material-icons">add_photo_alternate</i></button> -->
              <button class="btn btn-link" v-bind:class="{active: feedColorTab}" @click="openFeedColor"><i class="selectColorBtn"></i></button>

           </div>
          <div class="addFriendSearch">

            <!-- <input v-if="tagOn" v-model="tagData" @input="getUserList" class="form-control" :placeholder="$store.getters['isTeacher']? $t('teacher.tagging_description') : $t('post.tagging_description')"> -->
          </div>
          <!-- <span class="{active: tagOn}" ><i class="material-icons">&#xE7FE;</i></span> -->

          <customloader loaderClass="btn btn-primary submitBtn pull-right" :loaderClick="savePost" :loaderDisabled="postButtonLoading" :loaderText="(post && post.postData)? $t('index.saveEditedPost'): $t('post.post')"></customloader>
        </div>
      </div>
    </div>
  </div>




<!--
  <div class="postShareTextBox clearfix">
    <div class="modal-content sharePostItem">
      <div class="modal-body ">
        <div class="statusText">
        <div class="textType">
          <div class="buddyAdded" v-for="nm in taggedUserName">{{nm.name}}
              <span aria-hidden="true" class="cursor" @click="removeTag(nm.id)">×</span>
          </div>
          <div class="buddyAdded">buddyName
              <span aria-hidden="true" class="cursor" @click="removeTag(nm.id)">×</span>
          </div>
          <div class="buddyAdded">buddyName2
              <span aria-hidden="true" class="cursor" @click="removeTag(nm.id)">×</span>
          </div>
          <div class="buddyAdded">buddy
              <span aria-hidden="true" class="cursor" @click="removeTag(nm.id)">×</span>
          </div>
          <div class="buddyAdded">buddy
              <span aria-hidden="true" class="cursor" @click="removeTag(nm.id)">×</span>
          </div>

        </div>

        <textarea :placeholder="$t('post.start_typing')" v-model="postData"></textarea>

          <div class="sharedCon"><div class="thumb"><img src="http://via.placeholder.com/200x150"><span class="audioicon"></span></div><div class="shareInfo"><h4>Resource Title</h4><div class="info">This curriculum is designed in accordance with the Stadance with the State. This curriculum is designed in accoriculum is designed in  with the State. This curriculum is designed in   is des his curriculum is designed in accordance with..</div> </div></div>

        </div>
        <div class="emoj" v-if="emojBox">
        <picker :showCategories="false" :include="['people']" :backgroundImageFn="((set, sheetSize) => '/img/emoji_16.png')" :custom="customEmojis" @click="addEmoji" :emojiSize="16" :sheetSize="16"></picker>
        </div>
      </div>
      <div class="modal-footer">
         <div class="statusBtns">
          <div class="addFriendSearch">
          <tagSuggestions v-if="tagData !== '' " @selected="handleSelectedIds" :taggedUsers="taggedUserName"/>
            <input v-if="tagOn" v-model="tagData" @input="getUserList" class="form-control" :placeholder="$t('post.tagging_description')">
          </div>
          <span class="{active: tagOn}" @click="toggleTagOn"><i class="material-icons">&#xE7FE;</i></span>
          <span @click="openEmojBox"><i class="material-icons">&#xE24E;</i></span>
          <button class="btn btn-link submitBtn" @click="savePost"><i class="btnText">{{(post && post.postData)? $t('index.edit'): $t('post.post')}}</i> <i class="material-icons">&#xE163;</i></button>
        </div>
      </div>
    </div>
  </div>



  <div class="postShareTextBox clearfix">
    <div class="modal-content sharePostItem">
      <div class="modal-body ">
        <div class="statusText">
        <div class="textType">
          <div class="buddyAdded" v-for="nm in taggedUserName">{{nm.name}}
              <span aria-hidden="true" class="cursor" @click="removeTag(nm.id)">×</span>
          </div>
          <div class="buddyAdded">buddyName
              <span aria-hidden="true" class="cursor" @click="removeTag(nm.id)">×</span>
          </div>
          <div class="buddyAdded">buddyName2
              <span aria-hidden="true" class="cursor" @click="removeTag(nm.id)">×</span>
          </div>
          <div class="buddyAdded">buddy
              <span aria-hidden="true" class="cursor" @click="removeTag(nm.id)">×</span>
          </div>
          <div class="buddyAdded">buddy
              <span aria-hidden="true" class="cursor" @click="removeTag(nm.id)">×</span>
          </div>

        </div>

        <textarea :placeholder="$t('post.start_typing')" v-model="postData"></textarea>




          <div class="postItem active"><div class="media"><div class="media-left"><a href="#"><img src="http://tourwizard.net/blog/wp-content/uploads/2016/06/Eric_Morrison.jpg" width="47" height="47" alt="..."></a></div><div class="media-body"><h4 class="media-heading">Neeraj yadav</h4><p class="datime">Fri Oct 20 2017 12:48:23 GMT+0530 (IST)</p><div class="info">This curriculum is designed in accordance with the Stadance with the State. This curriculum is designed in accoriculum is designed in with the State. This curriculum is designed in is des his curriculum is designed in accordance with..

            </div></div></div></div>



        </div>
        <div class="emoj" v-if="emojBox">
        <picker :showCategories="false" :include="['people']" :backgroundImageFn="((set, sheetSize) => '/img/emoji_16.png')" :custom="customEmojis" @click="addEmoji" :emojiSize="16" :sheetSize="16"></picker>
        </div>
      </div>
      <div class="modal-footer">
         <div class="statusBtns">
          <div class="addFriendSearch">
          <tagSuggestions v-if="tagData !== '' " @selected="handleSelectedIds" :taggedUsers="taggedUserName"/>
            <input v-if="tagOn" v-model="tagData" @input="getUserList" class="form-control" :placeholder="$t('post.tagging_description')">
          </div>
          <span class="{active: tagOn}" @click="toggleTagOn"><i class="material-icons">&#xE7FE;</i></span>
          <span @click="openEmojBox"><i class="material-icons">&#xE24E;</i></span>
          <button class="btn btn-link submitBtn" @click="savePost"><i class="btnText">{{(post && post.postData)? $t('index.edit'): $t('post.post')}}</i> <i class="material-icons">&#xE163;</i></button>
        </div>
      </div>
    </div>
  </div>
-->

</div>
</template>

<script>
import tagSuggestions from '~/components/view/tagSuggestions'
import postRowSub from '~/components/view/post/postRowSub'
import contentShareBox from '~/components/view/post/contentShareBox'
import profilepicBox from '~/components/profilepicBox'
import {Carousel, Slide } from 'vue-carousel'

export default {
  data () {
    return {
      postData: this.post? this.post.postData : '',
      postDataDiv: this.post ? this.post.postData : '',
      tagData: '',
      address: this.post&&this.post.location?{formattedAddress:this.post.location.name,latitude:this.post.location.latitude,longitude:this.post.location.longitude}: '',
      chosenBgColor: this.post&&this.post.color?this.post.color:'',
      chosenColor: '',
      taggedUserIds: [],
      textColor: [],
      taggedUserName: [],
      tempPicUrl: this.post&&this.post.images?this.post.images.map(data =>{let tempData = {url:data,file:''}; return tempData}):[],
      tagOn: false,
      emojBox: false,
      searchLocation: false,
      feedColorTab: false,
      picData: false,
      customEmojis: [],
      postButtonLoading: false,
      swiperOption: {
        allowTouchMove: false,
        simulateTouch:false,
        slidesPerView: 15,
         spaceBetween: 10,
         navigation: {
           nextEl: '.tbutton-next',
           prevEl: '.tbutton-prev'
         },
         breakpoints: {
          1024: {
                 slidesPerView: 12
           }

         }
      }
      }
  },
  components: {
    tagSuggestions, postRowSub, contentShareBox, profilepicBox,Carousel,Slide
  },
  mounted () {

    this.$refs.thoughtinput.focus()
    if(this.post && this.post.taggedUser){
      for(let val of this.post.taggedUser){
          this.taggedUserName.push({
              "id": val,
              "name": this.$store.getters["postContent/getUserInfo"](val).username
          })
      }
    }
    this.getUserList()
    this.$store.dispatch('postContent/getPostColor', {authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale}).then(response =>{
      this.textColor = response.data.colors
      // this.chosenColor = response.data.colors.filter(value => {
      //   return value.isDefault
      // })[0].feedColor
    })
    // let payload = {type: 'STICKERS', authToken:this.$store.state.auth.user.token,  langCode: this.$store.state.locale.selectedLocale}
    //         this.$store.dispatch('redemption/viewRedemptions', payload).then(response => {
    //             let stickers = response.data.redemptions
    //             let emojis = []
    //             for (let i=0;i<stickers.length;i++) {
    //               let emojiObject = {
    //                 name: stickers[i].redemptionId+'a',
    //                 short_names: [('sticker'+stickers[i].redemptionId)],
    //                 text: '',
    //                 emoticons: [],
    //                 keywords: [('sticker'+stickers[i].redemptionId)],
    //                 imageUrl: stickers[i].imageUrl
    //               }
    //               emojis.push(emojiObject)
    //             }
    //             this.customEmojis = emojis
    //         })
    this.$root.$on('autoScrollPost', ({done}) => {
        if(done){
          $('#scrollTop').scrollTo(0,0);
          alert('hello people')
        }
      })
  },
  methods: {
    postDataChange () {
      this.postDataDiv = this.postData + "\n"
    },
    getAddressData: function (addressData, placeResultData, id) {
      this.address = addressData;
      this.address.formattedAddress = placeResultData.formatted_address
      this.searchLocation = false

    },
    clearPlaceField() {
      this.$refs.address.clear()
    },
    clearAddedPlaceField() {
      this.address = ''
    },
    openFeedColor() {
    this.feedColorTab = !this.feedColorTab
    },
    locationDrpDown(){
      this.searchLocation = !this.searchLocation
    },
    changeFeedColor(data) {
      this.chosenColor = data.feedColor
      this.chosenBgColor = data.feedColor
    },
    removeTempPic(pic){
      this.tempPicUrl.splice(pic,1);
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
                    // this.fetchedUserSelectedImage = e.target.result;
                    // this.imgSrc = e.target.result
                    // this.cropImg = e.target.result
                    if(this.tempPicUrl.indexOf(e.target.result) === -1){
                      if(this.tempPicUrl.length < 5) {
                        this.tempPicUrl.push({url:e.target.result,file:input.files[0]})
                      }else{
                        this.$toast.error(this.$t('toastMsg.postImageError'))
                      }
                    }
                    if (this.$refs.cropper) {
                      this.$refs.cropper.replace(e.target.result)
                    }
                }
                // Start the reader job - read file as a data url (base64 format)
                reader.readAsDataURL(input.files[0]);
                // this.dataPayload.updateProfilePic = input.files[0]

            }

    },
    openPicBox() {
      this.picData = !this.picData
    },
    savePost () {
      let payloadForm = new FormData()
      let shared = false
      this.postData = this.postData.trim()
      if (!this.postData && !this.address.formattedAddress && this.tempPicUrl.length === 0) {
        this.$toast.error(this.$t('toastMsg.postEmpty'))
      } else {
        this.postButtonLoading = true
        for(let obj of this.taggedUserName){
            this.taggedUserIds.push(obj.id);
        }
        let payloadData = {}
        if (this.sharedPost && this.sharedPost.postId) {
          payloadData = {
            postShareId: this.sharedPost.postId,
            shareType: "USERPOST",
            shareData: this.postData,
            taggedUser: this.taggedUserIds
          }
        } else if (this.sharedContent || (this.sharedPost && !this.sharedPost.postId)) {
          let contentId = this.sharedContent? this.sharedContent.contentId: this.sharedPost.contentId
          let type = this.sharedContent? this.sharedContent.type: this.sharedPost.type
          payloadData = {
            contentId: contentId,
            shareType: "CONTENT",
            contentType: type,
            shareData: this.postData,
            taggedUser: this.taggedUserIds
          }
        } else {

            payloadData = {
              postData: this.postData,
              taggedUser: this.taggedUserIds
            }
            if(this.tempPicUrl.length !== 0) {
              let images = []
              for(let i = 0;i<this.tempPicUrl.length;i++){
                if(this.tempPicUrl[i].file !== "") {
                    payloadForm.append('files',this.tempPicUrl[i].file)
                }else{
                  images.push(this.tempPicUrl[i].url)
                }

                payloadData['images'] = images
              }
            }
        }
        if (this.userId) {
          payloadData['userId'] = this.userId
        }
        if(this.address) {
          payloadData['location'] = {name:this.address.formattedAddress,latitude:this.address.latitude,longitude:this.address.longitude}
        }
        if(this.chosenColor) {
          payloadData['color'] = this.chosenColor
        }
        // && this.post.postData
        let addEditShareDecider = this.post? 'editPost': 'addPost'
        if (this.sharedPost || this.sharedContent) {
          addEditShareDecider = 'sharePost'
           shared = true
        }
        let payload = shared?payloadData:payloadForm
        let postId = this.post? this.post.postId : undefined
        if(postId) {
        payloadData['postId'] = postId
        }
        payloadForm.append('post',JSON.stringify(payloadData))
        this.$store.dispatch(`postContent/${addEditShareDecider}`, {isProfile: this.isProfile, postId: postId, authToken: this.$store.state.auth.user.token, payload, langCode: this.$store.state.locale.selectedLocale}).then((response) => {
          this.postButtonLoading = false
          //this.$toast.success((this.post && this.post.postData)? this.$t('post.edit_success'): this.$t('post.add_success'))
          this.postData = ''
          this.taggedUserName = []
          this.$root.$emit('post-added', {})
          this.close()
        }, (error) => {
          this.postButtonLoading = false
          this.$toast.error(this.post && this.post.postData? this.$t('post.edit_error'): this.$t('post.add_error'), error)
        })
      }
    },
    toggleTagOn(){
      this.tagOn = !this.tagOn
    },
    getUserList () {
        // This fun generate list on type ahead tag name.
        let postId = this.post? this.post.postId : undefined
        let tagUser = "tagUsersList";
        let payload = this.tagData
        this.$store.dispatch(`postContent/${tagUser}`, {authToken: this.$store.state.auth.user.token, payload, langCode: this.$store.state.locale.selectedLocale}).then((response) => {})
    },
    handleSelectedIds(obj) {
      // this.taggedUserName.push({"id": obj.id, "name": obj.name});
      this.taggedUserName = obj
      this.tagData = '';
      // this.tagOn  = false
    },
    removeTag(id){
        for(let i = 0; i< this.taggedUserName.length; i++){
            if(this.taggedUserName[i].id === id){
                this.taggedUserName.splice(i, 1);
            }
        }
    },
    openEmojBox(){
        this.emojBox = !this.emojBox;
    },
    textAreaAdjust(el) {
     let aa = this.$refs.appa.offsetHeight
     this.$refs.app.style.height = aa+'px';
    },
    addEmoji(e){
        this.postData = (this.postData?this.postData:'')+' '+e.native;
        this.emojBox = false;
    },
    userIsThere(user){
        for(let i=0;i<this.taggedUserName.length;i++){
            if(this.taggedUserName[i].id === user.userId){
              return false;
            }
        }
        return true;
      }
  },
  computed: {
    showTagList () {
      // ?$store.state.postContent.userList.filter(user => {return userIsThere(user)}) :[]
      return (this.$store.state.postContent.userList )
    }
  },
  props: ['close', 'post', 'sharedPost', 'sharedContent', 'userId', 'isProfile']
}
</script>

<style>
    .cursor{
       cursor: pointer;
    }

    .emoji-mart-scroll {
      border-bottom: 0;
      margin-bottom: 6px;
    }

    .emoji-mart-scroll + .emoji-mart-bar {
      display: none;
    }
    .emoji-mart{
        width: 253px;
        position: absolute;
        left: 65%;
        bottom: 0%;
    }
    .emoji-mart .emoji-mart-scroll{max-height: 114px;}



  .textarea-container{ position: relative;  transition: all 0.5s; }
  .cmtBox .textBody{ transition: all 0.2s }


  .textarea-container textarea, .textarea-container .textarea-size {
  min-height: 27px;
  font-family: sans-serif;
  font-size: 14px;
  box-sizing: border-box;
  padding: 4px;
  border: 0;
  overflow: hidden;
 width: 100%;

}

.textarea-container textarea {
  height: 100%;
  position: absolute;
  resize:none;
   width: 100%;
}

.textarea-container .textarea-size {
  visibility: hidden;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
.cstm-upld-style{
  width:75px;height:75px;margin:0 !important;top:33px;
}
.set-dimension{width:75px;height:75px;}
.cmtBox .textBody{ overflow: hidden; }
</style>

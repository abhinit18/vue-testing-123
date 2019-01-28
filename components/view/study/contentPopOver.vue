<template>
  <div>
    <div class="studyPopUpPageNew studyPopUpPageNewVideos" :class="{articalSecDivBody: content.type == 'ARTICLE', notePopOpen: noteModal, sharePopOpen: shareOn, sharePopOpen2: sharePrompt}">
      <!-- :post = "" :sharedPost=""-->
      <div :class="{articalSecDivBodyInner: content.type == 'ARTICLE'}" >
      <a class="pclose" @click="closePopup"><span><i class="material-icons">&#xE5CD;</i></span> {{$t('settings.close')}}</a>
      <h3 class="contentTitle">
        <button class="btnBacktoPrePage" @click="closePopup"><i class="material-icons">&#xE314;</i></button> {{$store.getters["content/contentTitle"](content.contentId)}}
        <span class="mainTitleRsource">{{$store.getters["content/subTopicById"](getTopicId, getSubTopicId).name}}</span> {{content.body.find((obj) => {return obj.lang == $store.state.locale.selectedLocale ? true : false })['title']}}
      </h3>

      <!-- content wrapper -->
      <!-- <div class="fullScreen" id="fullScreen" v-bind:class="{ fullscreenmode: $store.state.content.isFullscreenActive }"> -->
      <div class="fullScreen" id="fullScreen" >

         <div class="modal in fade modal-full noteModal" style="display:block;z-index:9999;" v-if='noteModal'>
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <!-- <div class="modal-header">
           <a class="pclose" @click="closePopup"><span><i class="material-icons">&#xE5CD;</i></span> {{$t('settings.close')}}</a>
            <h4 class="modal-title" id="myModalLabel">All Notes</h4>
          </div> -->
          <div class="modal-body clearfix">
            <div class="conMidSec">
              <div class="welcomeTxt clearfix" v-if="!$store.state.note.fetchednotes || notesPresent === 0">
                <h2 class="heading">{{$t('index.hey')}} {{$store.state.initialData.firstName}}</h2>
                <p>
                  {{$t('study.start_adding_notes')}}
                </p>
                <!-- <button class="btn add_notesBtn" @click="toggleShowAddPopup"><i class="material-icons addNote_iocn">note_add</i>{{$t('study.add_notes')}}</button> -->
                <button class="btn add_notesBtn" @click="toggleShowAddPopup">{{$t('study.add_notes')}}</button>
              </div>
              <div class="full-width" v-else-if="$store.state.note.fetchednotes || $store.state.note.fetchednotes.length !== 0">
                <noteLists :actionButtons='false' :contentId='content.contentId'>
                  </noteLists/>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="modal-backdrop fade in" @click="noteModal = false"></div>
    </div>


        <!--  Share PopUp-->
        <div class="shrePopupBox" v-if="shareOn">
          <div class="shrePopupBoxPop">

            <div class=" sharePostItem">

              <a class="pclose" @click="shareOnPlatform"><span><i class="material-icons">&#xE5CD;</i></span></a>
              <addPost v-if="shareOn" :close="shareOnPlatform" :sharedContent="content" />

              <!-- <div class="modal-body ">
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



             -->
            </div>
          </div>
        </div>
        <div class="shrePopupBox" v-if="sharePrompt" @click="sharePrompt = false">
          <div class="shrePopupBoxPop">
            <div class="sharePopUp clearfix">
                <div class="topHeading">
                    <i class="material-icons">share</i> {{$t('index.share')}}
                  </div>
                  <div class="contentArea">
                   <p class="sharetxt">{{$t('profile.selectFromBelow')}}</p>
                         <social-sharing url="http://35.154.14.106:4000/marketing"
                         title="Refer a friend"
                         :description="content.body[0].description"
                         :quote="content.body[0].description"
                         inline-template>
                          <ul class="socialIcons text-center">
                            <!-- :media="this.$store.state.initialData.profilePic" -->
                            <!-- quote="Welcome to vue js, Knowledge Partners" -->
                           <li>
                             <network network="email">
                               <i class="iconsImg icon_6"></i>
                             </network>
                          </li>
                           <li>
                             <network network="facebook">
                               <!-- <img :src="this.$store.state.initialData.profilePic" style="width:30px;"/> -->
                               <span class="iconsImg icon_3"></span>
                             </network>
                           </li>
                           <li>
                             <network network="vk">
                               <span class="iconsImg"></span>
                             </network>
                           </li>
                         </ul>
                        </social-sharing>
                    <div class="orDivider">
                         <span class="orIcon">{{$t('common.or')}}</span>
                     </div>
                     <button class="btn btn-primary btn-block shareBtn" @click="checkSharingAction('no')"> <i class="material-icons">lightbulb_outline</i>{{$t('post.share_as_post')}}</button>

                       <!--
                        <li></li>
                        <li><a href="#"><span class="icons icon_2"></span></a></li>
                        <li></li>
                        <li><a href="#"><span class="icons icon_4"></span></a></li>
                        <li><a href="#"><span class="icons icon_5"></span></a></li> -->

                 </div>
            </div>

            <!-- <div class="clearfix">
              <button type="button" class="btn btn-primary" >No</button>
              <button type="button" class="btn btn-default" @click="checkSharingAction('yes')">Yes</button>
            </div> -->
          </div>
        </div>

  <div :class="{articalSecDiv: content.type == 'ARTICLE'}">
  <div :class="{articalSecDivinner: content.type == 'ARTICLE'}">

        <contentWrapper  v-bind:content="content" v-bind:ratingsPopup="$store.state.content.ratingsDialog" :isIndependentContentView="isIndependentContentView"></contentWrapper>
        <div class="contentMetaInfo cleafix" v-if="content.type !== 'EPUB'">
          <div class="innerCon">

            <div v-if='content.type == "EPUB"' class="count"><span>{{camelize}}</span> {{pageNo}}</div>

            <button class="btn btn-link btnLike" v-if="!$store.getters['isParent']()" v-bind:class="{active: contentLiked}" @click="toggleLiked">
                  <i class="ricons rlikeIcons"></i>

                  <div class="tooltip top">
                    <div class="tooltip-arrow"></div>
                    <div class="tooltip-inner">
                      {{$t('index.like')}}
                    </div>
                  </div>

             </button>

            <button class="btn btn-link btnBookmark aa" v-if="!$store.getters['isParent']()" :class="{active: content.bookmarked}"  @click="bookmarkContent(content.contentId, content.bookmarked)">

                      <i class="ricons bookmarkIcons" v-bind:class="{bookmarked:content.bookmarked}"></i>
                  <div class="tooltip top">
                    <div class="tooltip-arrow"></div>
                    <div class="tooltip-inner">
                                          {{$t('index.bookmark')}}
                    </div>
                  </div>
                </button>

            <button class="btn btn-link" v-if="content.type == 'EPUB'" v-bind:class="{active: downloaded}" @click="saveEbook">
                  <i class="ricons downIcons"></i>
                  <div class="tooltip top">
                    <div class="tooltip-arrow"></div>
                    <div class="tooltip-inner">
                                                                {{$t('common.save')}}
                    </div>
                  </div>
                </button>

            <button class="btn btn-link btnShare" @click="toggleSharing">
                  <i class="ricons shareIcons"></i>
                  <div class="tooltip top">
                    <div class="tooltip-arrow"></div>
                    <div class="tooltip-inner">
                                                                {{$t('index.share')}}
                    </div>
                  </div>
                </button>
            <!--  <button class="btn btn-link btnBookmark" :class="{active: content.bookmarked}">
                    <span style="color:#fff;"></span>
                      <i class="material-icons ico" v-bind:class="{bookmarked:content.bookmarked}" @click="bookmarkContent(content.contentId)"></i>
                      <span style="display:block;">Bookmark<span v-if="content.bookmarked">ed</span></span>
                </button> -->


            <!-- <button class="btn btn-link btnLike" v-bind:class="{active: content.liked}" @click="toggleLiked">
                  <i class="ico"></i>
                  <span style="display:block;" v-if="!content.liked">Like</span>
                  <span style="display:block;" v-else >Liked</span>
             </button> -->

            <!-- <button class="btn btn-link btnShare" @click="toggleSharing">
                  <i class="material-icons">&#xE80D;</i>
                     <span style="display:block;">Share</span>
                </button> -->
            <!-- @click="toggleFullscreen" -->

            <!--  <button class="btn btn-link btn-inline textFullScreenBtnOuter" @click="toggleFullscreen">
                <div class="textFullScreenBtn">
                  <i class="material-icons fullico" @click="full_screen">fullscreen</i>
                  <i class="material-icons fullicoexit" @click="full_screen_exit">fullscreen_exit</i>
                </div>
              </button> -->


            <button v-if="showFullscreen" class="btn btn-link btn-inline textFullScreenBtnOuter" @click="full_screen" ref="fullScreenBtn">
                <div class="textFullScreenBtn">
                  <i class="material-icons fullico">fullscreen</i>
                  <i class="material-icons fullicoexit">fullscreen_exit</i>

                  <div class="tooltip top fullico">
                    <div class="tooltip-arrow"></div>
                    <div class="tooltip-inner">
                                                                                      {{$t('index.fullscreen')}}
                    </div>
                  </div>


                  <div class="tooltip top fullicoexit">
                    <div class="tooltip-arrow"></div>
                    <div class="tooltip-inner">
                                                                                                            {{$t('index.fullscreen_exit')}}
                    </div>
                  </div>

                </div>



              </button>


            <!-- <button class="btn btn-primary btn-lg pull-right" @click="toggleShowAddPopup"><i class="material-icons addNote_iocn">note_add</i></button> -->

            <button class="btn btn-link btn-addnote pull-right" @click="toggleShowAddPopup"><i class="ricons addnoteIcons"></i>
               <div class="tooltip top">
                    <div class="tooltip-arrow"></div>
                    <div class="tooltip-inner">
                                                                                                            {{$t('study.add_note')}}
                    </div>
                  </div>
            </button>


            <a v-if="notesPresent > 0" @click="noteModal = !noteModal" class="savedNotes pull-right btn-link btn">{{notesPresent}} {{$t('study.notes')}}</a>
            <!--notesPopFull-->
            <addNotePopUp :content="content" v-if="this.showAddPopup" />

          </div>
        </div>

        <div class="btnCompOuter clearfix" v-if='content.type === "ARTICLE"'>
          <button class="btn btn_border" v-if="!content.completed" @click="markCompleted" ><i class="material-icons done_icon">done</i>{{$t('study.complete')}}</button>
          <button class="btn btn_border completedVideo" v-else>{{$t('study.completed')}}</button>
        </div>


      </div>
    </div>
      </div>
    </div>



      <div v-if='content.type !== "ARTICLE" && content.type !== "EPUB"' class="recomend_complete clearFix">
        <div class="innerCon">
          <div class="recomend_complete_txt">
            <!-- <span class="likeSmall_icon"></span>
              <span class="hightLight_txt">{{content.likeCount}}</span> found helpful -->
          </div>
          <!-- <div class="recomend_complete_txt" v-if="content.completed">
              <span class="check_icon"></span>
              <span class="hightLight_txt">{{content.points}}</span> Points Earned
            </div>
            <div class="recomend_complete_txt" v-else>
              Earn <span class="hightLight_txt">{{content.points}}</span> Points
            </div> -->
          <button class="btn btn_border" v-if="!content.completed" @click="markCompleted" :disabled="content.type == 'VIDEO' || (content.type == 'EPUB' && !epubCompletionReached)"><i class="material-icons done_icon">done</i>{{$t('study.complete')}}</button>
          <button class="btn btn_border completedVideo" v-else>{{$t('study.completed')}}</button>
        </div>

        <div class="subDesc">
          <h5>{{$t('study.description')}}</h5>
          <p>
            {{content.body[0].description}}
          </p>
        </div>

      </div>

      <div class="studyPopUpInner" v-if='content.type != "ARTICLE"'>
        <div class="pcontainer">
          <h3 class="popHeading">{{$t('study.similar_concepts')}}</h3>
          <div class="resFilter">
            <label class="control control--checkbox" v-for="type in $store.state.content.types">
               <input type="radio" :checked="selectedCheck===type.name" @change="toggleCheck(type.name)">
                <span>{{$t(type.code)}}</span>
            </label>
         </div>
        </div>
        <div class="resourcesListRecmonded resourcesList" v-if="recommended && recommended.length>0">
          <div class="pcontainer">
            <div class="resourcesListInner">
              <content-box :isSearch="true" :content="content" :cornerElement="index" v-for="(content, index) in recommended" :key="content.contentId" />
            </div>
          </div>
        </div>
        <noResource v-else/>
      </div>
    </div>
  </div>
</template>

<script>
import addNotePopUp from "~/components/noteComponents/addNotePopUp";
import noResource from "~/components/placeholders/noResource";
import addPost from "~/components/addEdit/post/addPost";
import contentWrapper from "~/components/view/study/contentWrapper";
import contentBox from "~/components/contentBox";
import noteLists from "~/components/noteComponents/viewNoteList";
import { lrsPost } from "../../../utils/lrs";
import axiosService from "../../../config/caller";

export default {
  mounted() {

    // Autobookmark on open juzz epub.
    // if (this.content.type == "EPUB") {
    //   this.bookmarkContent(this.content.contentId);
    // }
    /* this.$store.dispatch("note/fetchSavedList", {
      authToken: this.$store.state.auth.user.token,
      langCode: this.$store.state.locale.selectedLocale,
      loader: false
    }); */
    this.contentLiked = this.content.liked;
    this.$store.dispatch("content/hideRatingDialog");
    const elem = this.$refs.fullScreenBtn;
    const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

    if(!((this.content.type == 'EPUB' && window.navigator.userAgent.indexOf("Edge") > -1) || (isIE11))){
      //elem.click();
    } else {
      this.showFullscreen = false
    }

    this.$root.$on("closeAddPopupEmit", () => {
      this.showAddPopup = false;
    }),
      /* this.$store.dispatch("study/getBookmarkedContent", {
        authToken: this.$store.state.auth.user.token,
        langCode: this.$store.state.locale.selectedLocale,
        loader: false
      }); */

    this.$root.$on("epubCompletionReached", () => {
      this.epubCompletionReached = true;
    });

    this.downloaded = this.content.downloaded;
    this.fetchData();

    this.$root.$on("purgeDownload", res => {
      this.toggleDownloaded();
    });

    this.$root.$on("pageMetadata", res => {
      this.currentPage = res.currentPage;
      this.totalPages = res.totalPages;
      this.pageName = res.pageName;
      let subTopicId = this.content.subTopicId;
      if(res.cfid)
      this.$store
        .dispatch("content/mutateEpubState", {
          authToken: this.$store.state.auth.user.token,
          subTopicId,
          contentId: this.content.contentId,
          cfid: res.cfid,
          langCode: this.$store.state.locale.selectedLocale,
          isIndependentContentView: this.isIndependentContentView
        })
        .then(response => {});
    });
  },
  beforeDestroy() {
    this.$root.$off('pageMetadata')
    this.$root.$off('purgeDownload')
    this.$root.$off('epubCompletionReached')
    this.$root.$off('closeAddPopupEmit')
  },
  data() {
    return {
      showAddPopup: false,
      shareOn: false,
      shareOut: false,
      sharePrompt: false,
      downloaded: false,
      contentLiked: false,
      recommended: [],
      currentPage: "0",
      totalPages: "0",
      noteModal: false,
      addparam: "Add",
      epubCompletionReached: false,
      selectedCheck: 'ALL',
      fullscreen: false,
      showFullscreen: true,
      pageName: ''
    };
  },
  props: ["content"],
  components: {
    contentWrapper,
    addNotePopUp,
    addPost,
    contentBox,
    noteLists,
    noResource
  },
  methods: {
    addNotesToggle() {
      this.noteModal = false
      setTimeout(function() {
				this.$root.$emit("openAddPopupEmit", {});
			}, 300);

    },
    shareOnPlatform() {
      this.shareOn = false
    },
    fetchData(loader) {
      let requestObj = {
        id: this.content.contentId,
        type: this.selectedCheck,
        level: 'CONTENT'
      }
      if(this.$store.getters['getCurrentChildId']()){
        requestObj.childId = this.$store.getters['getCurrentChildId']()
      }

       this.$store
        .dispatch("search/getSimilarContent", {
          requestObj,
          authToken: this.$store.state.auth.user.token,
          langCode: this.$store.state.locale.selectedLocale,
          loader: loader? true : false
        })
        .then(response => {
          if (response && response.data && response.data.content)
          {
            this.recommended = response.data.content
          }
          else {
            this.recommended = []
          }
        });
    },
    saveEbook() {
      if (this.downloaded) return;
      let contentId = this.content.contentId;
      this.$vlf.getItem(contentId).then(res => {
        if (res == null) {
          axiosService
            .get(this.content.body[0]["value"], false, "en", "*/*", true)
            .then(resApi => {
              this.$vlf
                .setItem(contentId, resApi.data)
                .then(res => {
                  //this.$toast.success(this.$t("ereader.fileDownloadedSuccess"))
                  this.toggleDownloaded();
                  this.saveActivity()
                })
                .catch(err => {
                    this.$toast.error(this.$t("ereader.fileDownloadedFailed"))
                });
            });
        } else {
          //this.$toast.success(this.$t("ereader.fileDownloadedAlready"))
        }
      });
    },
    saveActivity(){
          let verb = "downloaded";
          let object = "epub";
          let contentType = this.$store.state.locale.selectedLocale;
          let authToken = this.$store.state.auth.user.token;
          let contentId = this.content.contentId;
          let objectDetails = {
            id: contentId
          };

          lrsPost(
            authToken,
            {
              verb,
              object,
              objectDetails
            },
            contentType
          ).then(response => {
                if (response && response.data && response.data.httpStatus == 200) {
        if(response.data.points && response.data.coins ){
          let points = response.data.points;
          let coins = response.data.coins;
          this.$store.dispatch('updateCoinsPoints', {points, coins})
        }
      }
          });
    },
    full_screen() {
      this.fullscreen = !this.fullscreen

      this.$root.$emit("handleFullscreen", {});

      let verb = "fullscreen";
          let object = this.content.type;
          let contentType = this.$store.state.locale.selectedLocale;
          let authToken = this.$store.state.auth.user.token;
          let contentId = this.content.contentId;
          let objectDetails = {
            id: contentId
          };

          lrsPost(
            authToken,
            {
              verb,
              object,
              objectDetails
            },
            contentType
          ).then(response => {
                if (response && response.data && response.data.httpStatus == 200) {
        if(response.data.points && response.data.coins ){
          let points = response.data.points;
          let coins = response.data.coins;
          this.$store.dispatch('updateCoinsPoints', {points, coins})
        }
      }
          });

      var isInFullScreen =
        (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement &&
          document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement &&
          document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

      var docElm = document.getElementById("fullScreen");
      if (!isInFullScreen) {
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen();
        } else if (docElm.msRequestFullscreen) {
          docElm.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
      // this.$store.dispatch("content/toggleContentFullscreen");
    },
    toggleFullscreen() {
      //this.$store.dispatch("content/toggleContentFullscreen");
    },
    closePopup() {
      this.$router.back();
    },
    toggleShowAddPopup() {
      this.noteModal = false
      this.showAddPopup = !this.showAddPopup;
    },
    checkSharingAction(value) {
      if(value === 'no') {
        this.shareOn = !this.shareOn
        this.sharePrompt = false
      }else{
        this.shareOut = !this.shareOut
        this.sharePrompt = false
      }
    },
    toggleSharing() {
      this.sharePrompt = !this.sharePrompt;
    },
    // TODO if it can be made DRI
    bookmarkContent(data,dataBookmarked) {
      let subTopicId = this.content.subTopicId;
      if(dataBookmarked) {
        this.$store.dispatch('content/deleteContentBookmarks',{
          authToken: this.$store.state.auth.user.token,
          langCode: this.$store.state.locale.selectedLocale,
          contentId:data,
          subTopicId,
          type:this.content.type,
          isIndependentContentView: this.isIndependentContentView
        }).then(response => {
          // this.showDeleteBookmarkPopup = false;
          // this.$toast.success('Bookmark deleted succesfully');
      })
      }else{
        this.$store
          .dispatch("content/contentBookmarking", {
            authToken: this.$store.state.auth.user.token,
            subTopicId,
            contentId: data,
            type: this.content.type,
            langCode: this.$store.state.locale.selectedLocale,
            isIndependentContentView: this.isIndependentContentView
          })
          .then(response => {});
      }
    },
      // TODO if it can be made DRI
     toggleLiked(e) {
      e.preventDefault();

      this.contentLiked = !this.contentLiked;
      let contentType = this.content.type;
      let contentId = this.content.contentId;
      let subTopicId = this.content.subTopicId;
      let langCode = this.$store.state.locale.selectedLocale;
      let authToken = this.$store.state.auth.user.token;
      let like = this.content.liked;

      this.$store.dispatch("content/toggleContentLiked", {
        authToken,
        contentType,
        langCode,
        subTopicId,
        contentId,
        like,
        isIndependentContentView: this.isIndependentContentView
      });
    },
    toggleDownloaded(e) {
      this.downloaded = !this.downloaded;
      let contentType = this.content.type;
      let contentId = this.content.contentId;
      let subTopicId = this.content.subTopicId;
      let langCode = this.$store.state.locale.selectedLocale;
      let authToken = this.$store.state.auth.user.token;
      let downloaded = this.content.downloaded;

      this.$store.dispatch("content/toggleContentDownloaded", {
        authToken,
        contentType,
        langCode,
        subTopicId,
        contentId,
        downloaded,
        isIndependentContentView: this.isIndependentContentView
      });
    },
    markCompleted(e) {
      e.preventDefault();
      if (this.content.type == "VIDEO") {
        return;
      }
      let contentType = this.content.type;
      let contentId = this.content.contentId;
      let subTopicId = this.content.subTopicId;
      let langCode = this.$store.state.locale.selectedLocale;
      let authToken = this.$store.state.auth.user.token;
      let topicId = this.content.topicId;
      let subjectId = this.content.subjectId;

      this.$store
        .dispatch("content/markContentComplete", {
          authToken,
          langCode,
          contentType,
          subTopicId,
          contentId,
          topicId,
          subjectId,
          isIndependentContentView: this.isIndependentContentView
        })
        .then(() => {});
    },
    toggleCheck (value) {
      this.selectedCheck = value
      this.fetchData(true)
    },
  },
  computed: {
    pageNo(){
      let split = this.currentPage.split('-');
      if(split.length > 0 && split[0] == split[1] )
        split = split[0];
      else split = this.currentPage;
      return split + ' / ' + this.totalPages
    },
    camelize() {
  return this.pageName.toLowerCase().replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return letter.toUpperCase();
  }).replace(/\s+/g, ' ');
},
    notesPresent() {
      let c = this.$store.state.note.fetchednotes.filter(
        res => res.contentId == this.content.contentId
      );
      return c.length;
    },
    isFullscreenActive() {
      return this.$store.state.content.isFullscreenActive;
    },
    isIndependentContentView() {
      let currentRoute = this.$router.currentRoute.path;
      let currentRouteSplit = currentRoute.split("/");
      if (currentRouteSplit[currentRouteSplit.length - 2] === "contentView") {
        return true;
      } else {
        return false;
      }
    },
    getContentId() {
      let currentRoute = this.$router.currentRoute.path;
      let currentRouteSplit = currentRoute.split("/");
      return currentRouteSplit.splice(currentRouteSplit.length - 1, 1)[0];
    },
    getTopicId() {
      let currentRoute = this.$router.currentRoute.path;
      let currentRouteSplit = currentRoute.split("/");
      let subTopicRaw = currentRouteSplit[currentRouteSplit.length - 2];
      return subTopicRaw.split("-")[0];
    },
    getSubTopicId() {
      let currentRoute = this.$router.currentRoute.path;
      let currentRouteSplit = currentRoute.split("/");
      let subTopicRaw = currentRouteSplit[currentRouteSplit.length - 2];
      return subTopicRaw.split("-")[1];
    },
    getSubjectId() {
      let currentRoute = this.$router.currentRoute.path;
      let currentRouteSplit = currentRoute.split("/");
      return currentRouteSplit[currentRouteSplit.length - 3];
    }
  }
};
</script>


<style>
.displayNone {
  display: none;
}

.bookmarked {
  color: #e1be0c;
}

#fullScreen:-webkit-full-screen {
}

#fullScreen:-moz-full-screen {
}

#fullScreen:-ms-fullscreen {
}

#fullScreen:fullscreen {
}

#fullScreen:-webkit-full-screen {
  width: 100%;
  height: 100vh;
  max-width: 100%;
}

#fullScreen:-moz-full-screen {
  width: 100%;
  height: 100vh;
  max-width: 100%;
}

#fullScreen:-ms-fullscreen {
  width: 100%;
  height: 100vh;
  max-width: 100%;
}

#fullScreen:fullscreen {
  width: 100%;
  height: 100vh;
  max-width: 100%;
}

#fullScreen:-webkit-full-screen .videoPlayerBox {
  height: calc(100vh - 50px);
}

#fullScreen:-moz-full-screen .videoPlayerBox {
  height: calc(100vh - 50px);
}

#fullScreen:-ms-fullscreen .videoPlayerBox {
  height: calc(100vh - 50px);
}

#fullScreen:fullscreen .videoPlayerBox {
  height: calc(100vh - 50px);
}

#fullScreen:-webkit-full-screen .textFullScreenBtn .fullicoexit {
  display: block;
}

#fullScreen:-moz-full-screen .textFullScreenBtn .fullicoexit {
  display: block;
}

#fullScreen:-ms-fullscreen .textFullScreenBtn .fullicoexit {
  display: block;
}

#fullScreen:fullscreen .textFullScreenBtn .fullicoexit {
  display: block;
}

#fullScreen:-webkit-full-screen .textFullScreenBtn .fullico {
  display: none;
}

#fullScreen:-moz-full-screen .textFullScreenBtn .fullico {
  display: none;
}

#fullScreen:-ms-fullscreen .textFullScreenBtn .fullico {
  display: none;
}

#fullScreen:fullscreen .textFullScreenBtn .fullico {
  display: none;
}

#fullScreen:-webkit-full-screen .eReaderHolder {
  height: calc(100vh - 110px);
}

#fullScreen:-moz-full-screen .eReaderHolder {
  height: calc(100vh - 110px);
}

#fullScreen:-ms-fullscreen .eReaderHolder {
  height: calc(100vh - 110px);
}

#fullScreen:fullscreen .eReaderHolder {
  height: calc(100vh - 110px);
}

/*backdrop pseudo element is used to style element behing the full screen element.*/

:fullscreen::backdrop {
  background-color: black;
}

:-webkit-full-screen::-webkit-backdrop {
  background-color: black;
}

:-moz-full-screen::-moz-backdrop {
  background-color: black;
}

:-ms-fullscreen::-ms-backdrop {
  background-color: black;
  /* dark blue */
}
</style>

<template>
    <div class="contentSec rightSideBuddyList">
        <div class="scrollSec">

            <div class="conMidSec buddySec">
              <ol class="breadcrumb">
                      <li><a href="#">{{$store.getters['isTeacherOrParent']()? $t('teacher.buddies') : $t('index.buddies')}}</a></li>
                      <li class="active">{{title}}</li>
                    </ol>
                <h3 class="smallHeading">{{$store.getters['isTeacher']() || $store.getters['isParent']()? $t('teacher.find_buddy') : $t('buddy.find_buddy')}}</h3>
                <div class="full-width">


                        <!-- <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 padd-0">
                          <input class="form-control customInput" @input="searchBuddies" v-model="searchUser" :placeholder="$t('buddy.search_name')">
                          <span class="material-icons pos-set">search</span>
                        </div>
 -->
                        <div class="srchBox">
                         <i class="material-icons srchIcon">search</i>
                         <!--  <input type="text" class="form-control" @input="searchBuddies" v-model="searchUser" :placeholder="$t('search.search')"> -->

                          <input class="form-control customInput" @input="searchBuddies" v-model="searchUser" :placeholder="$t('buddy.search_name')">

                        </div>

                        <div class="buddyFilterRight findBuddyFiter">

                          <button class="pull-right btn btn-link" @click="openFilter">{{$t('buddy.filter')}}  <i class="material-icons">filter_list</i> <span class="fillerApplied" v-if="filterBubble"></span></button>
                          <div class="dropShow filterOpt addBuddyFilterOpt" v-if="viewFilterBlock" v-on-click-outside="openFilter">
                               <div class="filterLinkSec clearfix">
                                {{$t('buddy.filter')}}

                                  <!-- <button type="button" class="btn btn-link btnFilter active">Subjects</button>
                                  <button type="button" class="btn btn-link btnFilter">Topics</button> @click="clearAllTagChips"-->
                                  <button type="button" class="btn btn-link btnFilter clearAll" @click="clearAllFilter">    {{$t('note.clear_all')}}</button>
                               </div>
                               <h5 class="innerPad"> {{$t('buddy.grade')}} </h5>
                               <ul class="filterListOpt gradeList innerPad">
                                  <li v-for="listedGrades in gradeList">
                                      <label class="control control--checkbox">
                                        <!-- {{listedGrades.name}} -->
                                        <!-- :checked="savedNoteTagschips.indexOf(listedtag.tagName)!==-1" @change="filteredData(listedtag)"-->
                                        <input type="checkbox"  :checked="gradeParam.indexOf(listedGrades.gradeId)!==-1" :value="listedGrades.gradeId" @change="addGradeFilter(listedGrades)"><div class="control__indicator">{{listedGrades.gradeId}}</div>
                                      </label>

                                  </li>
                                  <!-- <li class="text-center"><a href="#" class="btn btn-default full-width" @click="nextPage">+ more</a></li> -->
                                </ul>
                                <div class="innerPad">
                               <ul class="filterListOpt">
                              <li>
                              <h5> {{$t('register.city')}}</h5>
                               <select class="form-control" v-model="selectedCity" @change="selectSchoolByCity">
                                   <option v-for="city in $store.state.register.cityList"  :value="city.cityId">{{city.name}}</option>
                               </select>
                               </li>
                               <li>
                               <h5 v-if="selectedCity != ''"> {{$t('register.school_name')}}</h5>
                               <select class="form-control schoolLists" multiple v-model="selectedSchool" v-if="selectedCity != ''">
                                 <option v-for="school in $store.state.register.schoolList" :value="school.schoolId">{{school.name}}</option>
                               </select>
                               </li>

                                  <!-- <li class="text-center"><a href="#" class="btn btn-default full-width" @click="nextPage">+ more</a></li> -->
                                </ul>
                                </div>

                                <div class="applyBtnFilter">
                                <button type="button" class="btn btn-primary filterApplyBtn" @click="applyBuddySearchFilter"> {{$t("parentLog.apply")}} </button>
                              </div>


                            </div>
                        </div>

                    <!-- <div class="full-width recom" v-if="this.$store.state.newBuddyRequest.fetchSearchedConnection.connections"><h6>{{$t('buddy.recommended')}}</h6></div> -->
                </div>
                  <div class="full-width ">
                  <ul class="buddylistinline">
                      <li class="buddycustom-box mg-btm" v-for="buddy in this.$store.state.newBuddyRequest.fetchSearchedConnection.connections">
                        <div class="full-width">
                            <!-- v-for="buddy in this.$store.state.newBuddyRequest.connections" -->

                              <div class="buddy-img-box">
                                  <!-- <img src="~assets/images/user_image.png" class="img buddyImg">
                                  <div class="ubadge gold goldTag"></div> -->
                                  <!--
                                  <div class="ubadge silver">SILVER</div>
                                  <div class="ubadge bronze">BRONZE</div>
                                  -->
                                  <buddyProfileimg :profileImg="buddy"></buddyProfileimg>
                              </div>

                            <div class="info">
                              <div class="buddyName" @click="gotoBuddyProfile(buddy)">
                                <div v-if="buddy.firstName !== '' || buddy.lastName !== ''">
                                    {{buddy.firstName}} {{buddy.lastName}}
                                </div>
                                <div v-else-if="buddy.firstName === '' && buddy.lastName === ''">
                                    -
                                </div>
                              </div>

                                <!-- <ul class="list-inline grade-list">
                                    <li>Grade 1{{buddy.grade}}</li>
                                    <li>|</li>
                                    <li>{{buddy.points}}2 Points</li>
                                </ul> -->

                                 <ul>
                                  <li v-if="buddy.grades">{{$t('index.grade')}} <span>{{$store.getters['getGradeCsv'](buddy.grades)}}</span> </li>
                                   <li v-if="buddy.schoolProto && buddy.schoolProto.name">{{$t('index.school')}} <span>{{buddy.schoolProto.name}}</span> </li>
                                   <!-- <li>Common <span>Buddies  {{buddy.commonBuddy}} </span> </li> -->
                                </ul>


                          <!--   <div class="full-width grade-list mg-top-15">
                                {{buddy.commonBuddy}}22 Common Buddies
                            </div> -->
                             <div class="acsnBtn useracsnBtn">
                            <div class="full-width mg-top-15" v-if="buddy.friendStatus === 'NONE'">
                                <button class="btn addBuddyBtn" :disabled="buddy.isBlocked || buddy.isBlocker" @click="btnAction(buddy,'send',pageStatus)">
                                  <span v-if="$store.getters['isTeacher']()|| $store.getters['isParent']()">{{$t('buddy.add_contact')}}</span>
                                  <span v-if="!$store.getters['isTeacher']()&& !$store.getters['isParent']()">{{$t('buddy.add_buddy')}}</span>
                                </button>
                            </div>
                            <div class="full-width mg-top-15 pos-rel" v-if="buddy.friendStatus === 'FRIEND' || buddy.friendStatus === 'ACTIVE'">
                                <btnDropdown :buddy="buddy" :pagestatus="pageStatus"></btnDropdown>
                            </div>
                            <div class="full-width mg-top-15" v-else-if="buddy.friendStatus === 'REQUEST_RECEIVED'">
                              <button class="btn accpt-buddy-btn" :disabled="buddy.isBlocked || buddy.isBlocker" @click="btnAction(buddy,'accept',pageStatus)">{{$t('buddy.accept')}}</button>
                              <button class="btn decline-buddy-btn" :disabled="buddy.isBlocked || buddy.isBlocker" @click="btnAction(buddy,'decline',pageStatus)">{{$t('buddy.decline')}}</button>
                            </div>
                            <div class="full-width mg-top-15" v-else-if="buddy.friendStatus === 'REQUEST_SENT'">
                                <button class="btn cancelBuddyBtn" :disabled="buddy.isBlocked || buddy.isBlocker" @click="btnAction(buddy,'cancel',pageStatus)">{{$t('buddy.cancel_request')}}</button>
                            </div>
                          </div>
                          </div>
                          <!-- <profilePopOver :buddy="buddy" class="popHover"></profilePopOver> -->
                        </div>
                      </li>
                      <li v-if="!$store.state.newBuddyRequest.fetchSearchedConnection.connections">
                        <nobuddy />
                      </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import btnDropdown from '~/components/view/buddyCardsBtn'
import nobuddy from '~/components/placeholders/nobuddy'
import profilePopOver from '~/components/view/profilePopOver'
import buddyProfileimg from '~/components/view/buddyProfileimg'
export default {
  head () {
			return {
        title: this.title
			}
		},
    middleware: 'authenticated',
    data() {
      return {
        searchUser:'',
        viewFilterBlock:false,
        filterBubble:false,
        currentPage:1,
        recordsPerPage:10,
        schoolList:[],
        schoolFilter: '',
        gradeList:[],
        selectedCity: '',
        selectedCountry: '',
        selectedSchool: [],
        gradeParam: [],
        schoolParam: [],
        actionDataObj: {},
        pageStatus: 'find',
        			title: this.$t(this.$store.getters['isTeacher']() || this.$store.getters['isParent']()? 'teacher.find_buddy': 'buddy.find_buddy')
      }
    },
    components: {btnDropdown,buddyProfileimg, profilePopOver, nobuddy},
    mounted () {
      this.$store.dispatch('newBuddyRequest/fetchSearchedConnections',{authToken:this.$store.state.auth.user.token, searchParam: this.searchUser,gradeParam: this.gradeParam,schoolParam:this.schoolParam, pageStatus:this.pageStatus, langCode: this.$store.state.locale.selectedLocale})
      this.$store.dispatch('header/navChange', {key: 3, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, context: this})
      this.$store.dispatch('sidebarBuddyContent/navChange',4)
      this.$store.dispatch('snowPlowPageView',{pageName: "BUDDIES_ADD_BUDDY"});

    },
    layout: 'buddyContent',
    methods: {
      searchBuddies (value) {
        this.$store.dispatch('newBuddyRequest/fetchSearchedConnections',{authToken:this.$store.state.auth.user.token, searchParam: this.searchUser,gradeParam: this.gradeParam,schoolParam:this.schoolParam, pageStatus:this.pageStatus, langCode: this.$store.state.locale.selectedLocale})
      },
      addSchoolFilter(data) {
        if(this.schoolParam.indexOf(data.schoolId) === -1){
          this.schoolParam.push(data.schoolId);
        }else{
          let temp = this.schoolParam.filter( item => {
            return ( item !== data.schoolId)
          })
          this.schoolParam = temp
        }
        if(this.schoolParam.length !== 0 || this.gradeParam.length !== 0) {
          this.filterBubble = true
        }else {
          this.filterBubble = false
        }

      },
      applyBuddySearchFilter() {
        this.$store.dispatch('newBuddyRequest/fetchSearchedConnections',{authToken:this.$store.state.auth.user.token, searchParam: this.searchUser,gradeParam: this.gradeParam,schoolParam:this.selectedSchool, pageStatus:this.pageStatus, langCode: this.$store.state.locale.selectedLocale})
        this.schoolFilter = ''
        this.viewFilterBlock = false
      },
      gotoBuddyProfile(data) {

        let user = data.userId;
        this.$router.push(this.$store.getters['locale/getFinalUrl'](`/profile/${user}`))
      },
      addGradeFilter(data) {

        let gradeParam = [];
        if(this.gradeParam.indexOf(data.gradeId) === -1){
          this.gradeParam.push(data.gradeId);
        }else{
          let temp = this.gradeParam.filter( item => {
            return (item !== data.gradeId)})
            this.gradeParam =  temp
        }
        if(this.schoolParam.length !== 0 || this.gradeParam.length !== 0) {
          this.filterBubble = true
        }else {
          this.filterBubble = false
        }
        // this.$store.dispatch('newBuddyRequest/fetchSearchedConnections',{authToken:this.$store.state.auth.user.token, searchParam: this.searchUser,gradeParam: this.gradeParam,schoolParam:this.schoolParam, pageStatus:this.pageStatus, langCode: this.$store.state.locale.selectedLocale})
      },
      cancelBuddyRequest (value) {
        this.$store.dispatch('newBuddyRequest/cancelBuddyRequest',{authToken:this.$store.state.auth.user.token, connectionId: value.userId, pageStatus:this.pageStatus, langCode: this.$store.state.locale.selectedLocale})
      },
      acceptBuddy(data) {
          this.$store.dispatch('newBuddyRequest/approveBuddyRequest', {authToken: this.$store.state.auth.user.token,connectionId: data.userId, pageStatus:this.pageStatus, langCode: this.$store.state.locale.selectedLocale})
      },

      selectSchoolByCity() {
        this.selectedSchool = [];
        console.log("selectedSchool ", this.selectedSchool);
        if(this.selectedCity) {
          this.disableSchoolInput = false
          this.$store.dispatch('register/fetchSchools', {
            langCode: this.$store.state.locale.selectedLocale,
            city:this.selectedCity,
            country: this.selectedCountry
          })
          if((this.schoolFilter)&&(this.$store.state.register.schoolList.indexOf(this.schoolFilter) === -1)) {
            // alert("1");
            this.disableSchoolInput = true
            this.schoolFilter = ''
            this.selectedSchool = []
          }
        }else {
          this.disableSchoolInput = true
        }
      },
      openFilter() {
        this.viewFilterBlock = !this.viewFilterBlock;
        this.$store.dispatch('register/fetchGrades',{langCode: this.$store.state.locale.selectedLocale}).then(response => {
          this.gradeList = response.data.grades;
        })

        this.$store.dispatch('register/fetchCities',{langCode: this.$store.state.locale.selectedLocale}).then(response => {
          //this.cityList = response.data.cities;
        })
/*
        this.$store.dispatch('register/fetchSchools',{langCode: this.$store.state.locale.selectedLocale}).then(response => {
          this.schoolList = response.data.schools;
        })
  */
        this.schoolFilter = ''
      },
      clearAllFilter() {
        this.schoolParam = []
        this.gradeParam = []
        this.filterBubble = false
        this.$store.dispatch('newBuddyRequest/fetchSearchedConnections',{authToken:this.$store.state.auth.user.token, searchParam: this.searchUser,gradeParam: this.gradeParam,schoolParam:this.schoolParam, pageStatus:this.pageStatus, langCode: this.$store.state.locale.selectedLocale})
        this.schoolFilter = ''
        this.selectedSchool=[]
        this.selectedCity=''
      },
      declineBuddy(data) {
        this.$store.dispatch('newBuddyRequest/approveBuddyRequest', {authToken: this.$store.state.auth.user.token,connectionId: data.userId, pageStatus:this.pageStatus, langCode: this.$store.state.locale.selectedLocale})
        // .then((response) => {
        //   this.$toast.success( this.$t('post.delete_success'))
        //   this.postData = ''
        //   this.close()
        // }, (error) => {
        //   // this.$toast.error(this.$t('post.delete_error'), error)
        // })
      },
      sendRequestToBuddy(data) {
        this.$store.dispatch('newBuddyRequest/sendBuddyRequest', {authToken: this.$store.state.auth.user.token,connectionId: data.userId, pageStatus:this.pageStatus, langCode: this.$store.state.locale.selectedLocale})
      },
      nextPage()
      {
          if (this.current_page < numPages()) {
              this.current_page++;
              changePage(this.current_page);
          }
      },
      changePage(page)
      {
          // let btn_next = document.getElementById("btn_next");
          // let btn_prev = document.getElementById("btn_prev");
          // let listing_table = document.getElementById("listingTable");
          // let page_span = document.getElementById("page");
            let numpages = Math.ceil(this.$store.state.note.userSavedNoteTags.length / this.recordsPerPage);
          // Validate page
          if (page < 1) page = 1;
          if (page > numPages) page = numPages;

          listing_table.innerHTML = "";

          for (var i = (page-1) * this.recordsPerPage; i < (page * this.recordsPerPage) && i < this.$store.state.note.userSavedNoteTags.concat().length; i++) {
              listing_table.innerHTML += objJson[i].adName + "<br>";
          }
          // page_span.innerHTML = page + "/" + numPages();
          //
          // if (page == 1) {
          //     btn_prev.style.visibility = "hidden";
          // } else {
          //     btn_prev.style.visibility = "visible";
          // }
          //
          // if (page == numPages()) {
          //     btn_next.style.visibility = "hidden";
          // } else {
          //     btn_next.style.visibility = "visible";
          // }
      },
      btnAction(data,name,pageStatus) {
        this.actionDataObj.dataObj = data
        this.actionDataObj.btnActionName = name
        this.actionDataObj.pageStatus = pageStatus
        let dataParam = this.actionDataObj
        this.$root.$emit('showActionPopup', {dataParam})
      }
    },
    computed: {
      filterInputSearchData() {
        return this.schoolList.filter(schools => {
          // console.log(schools);
          return schools.name.toLowerCase().indexOf(this.schoolFilter.toLowerCase()) !== -1
      })
      }
    }
}

</script>
<style>/*
.padd-0{
  padding:0px;
}
.mg-btm{
  margin-bottom: 15px;
}
.addBuddyBtn{
  font-size:12px;margin-right:3px;width:100%;min-height: 20px;border-radius: 0px;background-color: #e54d8c;color:#fff;
}
.Line-3-Copy {
  width: 112px;
  height: 1px;
  border: solid 1px #efefef;
  margin:0 auto;
}
.cancelBuddyBtn{
  font-size:12px;margin-right:3px;width:100%;min-height: 20px;background-color: #fff;border-color:#e54d8c;color:#e54d8c;border-bottom-left-radius: 4px;
    border-top-left-radius: 0px;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 0px;
}

.full-width{float:left;width:100%;}
.customInput{max-width:300px;height:40px;border-color:#ffe45f;border-radius:4px;padding-right:40px;}
.pos-set{position: absolute;top:8px;right:10px;color:#e9b53d;}
.buddycustom-box{max-width: 180px;padding-left:0px !important;padding-right:0px !important;margin-right:25px;text-align: center;min-height:220px;padding-top:24px;border:1px solid #dfdfdf;float: left;width: 100%;background: #fff;border-bottom-left-radius: 6px;border-bottom-right-radius: 6px;}
.buddy-img-box{
  position: relative;
    width: 62px;margin: 0 auto;
}
.buddyImg{
  width:62px;
}
.goldTag{
    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiP…AwLCAtMTk0LjI1MDAwMCkgIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=) no-repeat 10% 0;
    display: inline-block;
    width: 52px;
    line-height: 20px;
    height: 42px;
    color: #fff;
    font-size: 14px;
    background-size: 52px;
    position: absolute;
    padding: 19px 0 0;
    z-index: 2;
    top: 48px;
    left: 5px;
}
.buddyName {
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: #2b2b2b;
  margin-top: 15px;
}

.grade-list{font-family: Roboto;font-size: 12px;text-align: center;color: #737373;}
.mg-top-30{margin-top:30px;}
.mg-top-15{margin-top:15px;}
.accpt-buddy-btn{font-size:12px;padding:6px 23.6px;min-height: 20px;border-radius: 0px;background-color: #e54d8c;color:#fff;}
.decline-buddy-btn{
  // max-width: 77px;
  font-size:12px;
  padding:6px 23.6px;
  min-height: 20px;
  color:#e54d8c;
  border-radius: 0px;
  background-color: #fff;

}
.recom h6{color:gray;}
.rightSideBuddyList{max-height: calc(100vh - 10px)}
.rightSideBuddyList .btn-link i{font-size:32px;color:gray;}*/
/*.dropShow.filterOpt:after, .dropShow.filterOpt:before{left:89.5%;}
.full-width{width:100%;float:left;border-radius:0px;}
.popHover{
    position: absolute !important;
    top: 25px;
    width: 428px;
    padding: 15px;
    box-shadow: 0 0 6px lightgrey;
    background: #fff;
    right: -20%;
    z-index: 999;
    transform: scale(0);
    transition:all 1s;
}
.buddycustom-box:hover .popHover{
 transform: scale(1);
}*/
</style>

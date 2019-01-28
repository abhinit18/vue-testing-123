<template>
  <div class="full-width">
    <div class="quickInfoBuddy" style="display:block;">
        <div class="clearfix">
            <div class="img text-center" @click="toProfile(buddy)">
                <buddyProfileimg :profileImg="buddy"></buddyProfileimg>
            </div>
            <div class="infos userInfo">
                <ul>
                    <li>
                        <h5>
                          <span v-if="buddy.firstName !== '' || buddy.lastName !== ''">
                              {{buddy.firstName}} {{buddy.lastName}}
                          </span>
                          <span v-else-if="buddy.firstName === '' && buddy.lastName === ''">
                              -
                          </span>
                        </h5>
                        <!-- <p>Fundamentals of shapes, sizes and figures</p> -->
                    </li>
                    <li>
                        <h5>
                          <span class="infoTxt">{{buddy.schoolProto.name}}</span>
                        </h5>
                        <!-- <p>Fundamentals of shapes, sizes and figures</p> -->
                    </li>
                    <li>
                      <h5>
                        <span class="infoTxt">{{$t('buddy.grade')}}
                           <span v-for="grade in buddy.grades">{{grade.name}}</span>
                        </span>
                      </h5>
                    </li>
                    <li>
                      <h5><span class="infoTxt">School {{buddy.schoolProto.name}}</span></h5>
                    </li>
                    <li style="border-color:transparent;">
                      <div class="">
                            <div class="full-width mg-top-15" v-if="buddy.friendStatus === 'NONE'">
                                <button class="btn addBuddyBtn" @click="btnAction(buddy,'send',pageStatus)">{{ $store.getters['isTeacher']() ? $t('teacher.add_buddy') : $t('buddy.add_buddy')}}</button>
                            </div>
                            <!-- <div class="full-width mg-top-15 pos-rel" v-if="buddy.friendStatus === 'FRIEND' || buddy.friendStatus === 'ACTIVE'">
                                <btnDropdown :buddy="buddy" :pagestatus="pageStatus"></btnDropdown>
                            </div> -->
                            <div class="full-width mg-top-15" v-else-if="buddy.friendStatus === 'REQUEST_RECEIVED'">
                              <button class="btn accpt-buddy-btn" @click="btnAction(buddy,'accept',pageStatus)">{{$t('buddy.accept')}}</button>
                              <button class="btn decline-buddy-btn" @click="btnAction(buddy,'decline',pageStatus)">{{$t('buddy.decline')}}</button>
                            </div>
                            <div class="full-width mg-top-15" v-else-if="buddy.friendStatus === 'REQUEST_SENT'">
                                <button class="btn cancelBuddyBtn" @click="btnAction(buddy,'cancel',pageStatus)">{{$store.getters['isTeacher']() ? $t('teacher.cancel_request') : $t('buddy.cancel_request')}}</button>
                            </div>
                            <div class="full-width mg-top-15">
                              <div class="acsnBtn" v-if="buddy.friendStatus === 'FRIEND' || buddy.friendStatus === 'ACTIVE'">
                                <button @click="dropdown" class="btn btn-link dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                  <i class="material-icons">&#xE5D3;</i>

                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenu1" v-if="showMenu">
                                  <li class="action-dropdown-li" @click="btnAction(buddy, 'unfriend',pageStatus)"><a>
                                    <!-- <i class="material-icons icon-pos">clear</i> --> {{$store.getters['isTeacher']()? $t('teacher.remove') : $t('buddy.remove')}}</a></li>
                                  <li role="separator" class="divider"></li>
                                  <li class="action-dropdown-li" v-if="!buddy.isBlocked"@click="btnAction(buddy, 'block',pageStatus)">
                                    <a>{{$store.getters['isTeacher']()? $t('teacher.block') : $t('buddy.block')}}</a>
                                  </li>
                                  <li class="action-dropdown-li" v-if="buddy.isBlocked" @click="btnAction(buddy, 'unblock',pageStatus)">
                                    <a>
                                      <!-- <i class="material-icons icon-pos">not_interested</i> -->
                                    {{$store.getters['isTeacher']()? $t('teacher.unblock') : $t('buddy.unblock')}}
                                    </a>
                                  </li>
                                  <li role="separator" class="divider"></li>
                                  <!-- <li class="text-center"><a href="#" @click="hideMenu"><i class="material-icons">clear</i></a><span class="caret caret-pos"></span></li> -->
                                </ul>

                                  <!-- <button class="btn addBuddyBtn dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" @click="dropdown">
                                    Buddy
                                  </button> -->

                              </div>
                                <!-- <btnDropdown :buddy="buddy" :pagestatus="pageStatus"></btnDropdown> -->
                            </div>
                      </div>
                    </li>
                </ul>


            </div>
        </div>

        <!--  <div class="dis">
           <h5>{{$t('study.description')}}</h5>
            <p>{{content.body[0].description}}</p>


        </div> -->
        <!-- <a class="btn btn-primary pull-right" @click="goToContent(content)">{{$t('study.read')}}</a> -->
    </div>
  </div>
</template>

<script>
import buddyProfileimg from '~/components/view/buddyProfileimg'
import btnDropdown from '~/components/view/buddyCardsBtn'
export default {
props: ['buddy'],
data() {
  return {
    actionDataObj: {},
    pageStatus: 'find',
    showMenu: false
  }
},
components: {buddyProfileimg,btnDropdown},
methods: {
  btnAction(data,name,pageStatus) {
    this.actionDataObj.dataObj = data
    this.actionDataObj.btnActionName = name
    this.actionDataObj.pageStatus = pageStatus
    let dataParam = this.actionDataObj
    this.$root.$emit('showActionPopup', {dataParam})
  },
  dropdown(event) {
    let temp = this.showMenu
    this.showMenu = !temp
  },
  toProfile(value) {
    let user = value.userId
    this.$router.push(this.$store.getters['locale/getFinalUrl'](`/profile/${user}`))
  }
}
}
</script>
<style>
/*.full-width{float:left;width:100%}
.userInfo{
    float: left;
    width: 50%;
    padding-right: 15px !important;
    padding-left: 15px !important;
    margin:0px !important;
}
.quickInfo .img {
    width: 25%;
    float: left;
    border-radius: 4px;
}
.quickInfo{transform: scale(1) !important;position: static;width: 100%;padding:0px;box-shadow: none;}*/
</style>

<template>
  <div class="bodyCon clearfix">
    <!-- COMMENTS POPUP COMES HERE-->
    <section class="container">
      <div class="pagebox clearfix">
        <div class="pageboxOver" v-bind:style="{backgroundColor:('#'+(this.$store.state.initialData.theme?this.$store.state.initialData.theme.color:''))}"></div>
        <sidebarUser></sidebarUser>
        <div class="contentSec">
          <div class="scrollSec">
            <div class="conMidSec">
            <ol class="breadcrumb">
                              <li><a href="#">{{$t('index.home')}}</a></li>
                              <li class="active">{{title}}</li>
                            </ol>
            <div class="primaryContentSec clearfix">

              <div class="primaryContentSecInner clearfix inviteFriend">
                <div class="conMidSec">
                  <!--  <br>
                                    <div class="full-width text-center">
                                        <img src="~assets/images/giftGraphic.png" style="margin-left:-30px;">
                                    </div> -->
                  <div class="placeholderSec">
                    <div class="placeHoldConMid zoomIn">
                      <div class="placeHolderImg">
                        <img src="~assets/images/placeholder/plcHold_invite_friends.png">
                      </div>
                      <h2 class="placeholderHeading">{{$t('refer.refer_head')}}</h2>
                      <p class="placeHoldTxt">{{$t('refer.refer_text')}} <strong>{{this.$store.state.initialData.referralCoins}}</strong> {{$t('refer.coins')}} ! <br>{{$t('refer.refer_code')}} <strong>{{this.$store.state.initialData.referralCode}}</strong></p>
                    </div>
                  </div>

                  <div class="referForm" style="margin:0;">
                    <div class="formControl">

                      <!-- <b @click="checkFb">my Fb</b> -->
                      <div class="formGroup">

                        <input type="text" class="form-control" @keypress="inputDataChange" v-model="friendDetails.friendEmail" :placeholder="$t('refer.refer_placeholder')">
                      </div>

                      <div class="subChip" v-for="(chips,index) in emailPhoneData">
                        {{chips}}
                        <button class="btn chipClose"><i class="material-icons" @click="removeSelectedTag(index)">close</i></button>
                      </div>

                    </div>
                    <customloader loaderClass="btn btn-primary btn-invite" :loaderClick="invite" :loaderDisabled="inviteButtonLoading" loaderText="refer.invite"></customloader>
                    <social-sharing url="http://35.154.14.106:4000/marketing" title="Refer a friend" :description="userDescription" :quote="userDescription" inline-template>
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
                  </div>


                </div>
              </div>
            </div>
          </div>
</div>

          <div class="deletePostPop blockReportPostPop" v-if="inviteSuccess">

            <div class="deletePostPopInner">
              <a class="pclose" @click="closeInviteSuccess()"><span><i class="material-icons">&#xE5CD;</i></span></a>
              <div class="full-width">

                <div class="text">
                  <h4>{{$t('refer.refer_sent_message')}}</h4>

                  <ul class="blockBullets">
                    <li v-for="data in this.emailPhoneData"><i class="material-icons">&#xE5CA;</i> {{data}}</li>
                  </ul>

                </div>

              </div>
              <!---->
            </div>
          </div>






        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import sidebarUser from '~/components/sidebarUser'
  export default {
    head() {
      return {
        title: this.title
      }
    },
    middleware: 'authenticated',
    data() {
      return {
        friendDetails: {},
        inviteSuccess: false,
        validations: false,
        emailPhoneData: [],
        userDescription: "Every time a friend joins you earn" + this.$store.state.initialData.referralCoins + "Coins  ! Your Referral Code is " + this.$store.state.initialData.referralCode,
        shareUrl: '',
        inviteButtonLoading: false,
        title: this.$t('index.refer_friend')
      }
    },
    mounted() {
      this.$store.dispatch('header/navChange', {
        key: 1,
        authToken: this.$store.state.auth.user.token,
        langCode: this.$store.state.locale.selectedLocale,
        context: this
      })
      if(!this.$store.getters['isParent']()) {
        this.$store.dispatch('sidebarHomeContent/navChange', 4)
        }
      else{
        this.$store.dispatch('sidebarHomeContent/parentNavChange', 4)
      }
      this.$store.dispatch('snowPlowPageView',{pageName: "INVITE"});

    },
    components: {
      sidebarUser
    },
    layout: 'default',
    methods: {
      inputDataChange(event) {
        if (event.key === 'Enter') {
          var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (this.friendDetails.friendEmail === "") {
            this.$toast.error(this.$t('toastMsg.emailPhone_validation'))

            return false;
          } else if (isNaN(this.friendDetails.friendEmail)) {

            if (!(this.friendDetails.friendEmail.match(mailformat))) {
              this.$toast.error(this.$t('toastMsg.email_validation'))
              return false;
            } else {
              this.inviteFriendChips()
            }
          } else {
            if (this.friendDetails.friendEmail.length != 10) {
              this.$toast.error(this.$t('toastMsg.phone_validation'))
              return false;
            } else {
              this.inviteFriendChips()
            }
          }

          // if((typeof JSON.parse(this.friendDetails.friendEmail) === 'number')&&this.friendDetails.friendEmail.length === 10) {
          //   if(this.$store.getters['validatePhone'](this.friendDetails.friendEmail)){
          //     this.validations = true
          //     this.inviteFriendChips()
          //   }else{
          //     this.$toast.error(this.$t('toastMsg.phone_validation'))
          //   }
          // }else{
          //   if(this.$store.getters['validateEmail'](this.friendDetails.friendEmail)){
          //     this.validations = true
          //     this.inviteFriendChips()
          //   }else{
          //     this.$toast.error(this.$t('toastMsg.email_validation'))
          //   }
          //
          // }
        }
      },
      inviteFriendChips() {
        if (this.emailPhoneData.indexOf(this.friendDetails.friendEmail) === -1) {
          this.emailPhoneData.push(this.friendDetails.friendEmail)
          this.friendDetails.friendEmail = ''
        }
      },
      // checkFb() {
      //   FB.ui(
      //           {
      //               method: 'feed',
      //               name: 'ibilive',
      //               link: ' https://www.ibilive.com/',
      //               picture: 'https://ibilive.com/assets/images/ibilogo3.png',
      //               caption: 'ibilive.com',
      //               description: 'ibiLive lets you go to places without moving! And you can make money with it too! Get £5 off your first service with code'+'\nUse my code'+' '  + $rootScope.referData + ' for ibilive!',
      //               message: 'Wow !! What an app.'
      //           });
      // },
      closeInviteSuccess() {
        this.inviteSuccess = false;
        this.emailPhoneData = []
      },
      vkShare() {
        let url = "https://google.com"
        let img = this.$store.state.initialData.profilePic
        this.shareUrl = "http://vkontakte.ru/share.php?" + "url=" + "http://13.126.163.24:4000/shareStudy/5a0ad46b63de9241c7bbf2df"
        window.open(this.shareUrl);
      },
      fbShare() {
        let url = "http://google.com"
        let app_id = "138206883536995"
        let img = this.$store.state.initialData.profilePic
        // app_id={app_id}&display=page&href={url}&redirect_uri={redirect_url}
        // http://vkontakte.ru/share.php?url=https://simplesharebuttons.com
        this.shareUrl = "http://www.facebook.com/sharer.php?u=" + "http://13.126.163.24:4000/shareStudy/5a0ad46b63de9241c7bbf2df"
        // FB.ui(
        //         {
        //             method: 'feed',
        //             name: 'ibilive',
        //             link: ' https://www.ibilive.com/',
        //             picture: 'https://ibilive.com/assets/images/ibilogo3.png',
        //             caption: 'ibilive.com',
        //             description: 'ibiLive lets you go to places without moving! And you can make money with it too! Get £5 off your first service with code'+'\nUse my code'+' '  + $rootScope.referData + ' for ibilive!',
        //             message: 'Wow !! What an app.'
        //         });
        window.open(this.shareUrl);
      },
      removeSelectedTag(data) {
        this.emailPhoneData.splice(data, 1);
      },
      invite() {
        if (this.emailPhoneData.length !== 0) {
          let email = this.emailPhoneData
          this.inviteButtonLoading = true
          this.$store.dispatch('common/inviteFriend', {
            authToken: this.$store.state.auth.user.token,
            friendEmailData: email,
            langCode: this.$store.state.locale.selectedLocale
          }).then((response) => {
            if (response.data.status === 'ERROR') {
              this.inviteButtonLoading = false
              let errorMsg = response.data.code
              this.$toast.error(errorMsg)
            } else {
              this.inviteButtonLoading = false
              this.inviteSuccess = true;

            }
          })
        } else if ((this.friendDetails.friendEmail) && this.emailPhoneData.length === 0) {
          let userInviteData = []
          userInviteData.push(this.friendDetails.friendEmail)
          //check for valid phone and valid email
          if (this.$store.getters['validateEmail'](this.friendDetails.friendEmail) || this.$store.getters['validatePhone'](this.friendDetails.friendEmail)) {
            this.inviteButtonLoading = true
            this.$store.dispatch('common/inviteFriend', {
              authToken: this.$store.state.auth.user.token,
              friendEmailData: userInviteData,
              langCode: this.$store.state.locale.selectedLocale
            }).then((response) => {
              if (response.data.status === 'ERROR') {
                this.inviteButtonLoading = false
                let errorMsg = response.data.code
                this.$toast.error(errorMsg)
              } else {
                this.emailPhoneData.push(this.friendDetails.friendEmail)
                this.inviteButtonLoading = false
                this.inviteSuccess = true;
                this.friendDetails.friendEmail = ''
              }
            })
          } else {
            this.$toast.error(this.$t('toastMsg.emailPhone_validation'))
          }
        } else {
          this.$toast.error(this.$t('toastMsg.userPrincipalNeeded'))
        }
      }
    }
  }
</script>

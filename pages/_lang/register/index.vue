<template>
  <div>
    <div class="WrapperSubscribe">
      <div class="pageboxSubscribeOuter">
        <div class="contentSec pageboxSubscribe">
          <div class="scrollSec ">
            <div class="conMidSec">
              <div class="subjectsRow clearfix">
                <!-- <div class="subscribe_sec loginPage">
                  <a href="#" class="logo"> {{$t('index.brandLogo')}} </a>
                  <h2 class="brandName">{{$t('index.brandName')}}</h2>
                  <p class="regesterTxt">{{$t('register.sign_learning')}}</p>

                  <form class="form-signin">
                    <label for="inputEmail" class="sr-only">Email address</label>

                    <div class="linput">
                      <input type="email" id="email1" class="formcontrol" :placeholder="$t('register.registered_email_phone')" required="" autofocus="">
                    </div>
                    <label for="inputPassword" class="sr-only">Password</label>
                    <div class="linput">

                      <input type="password" class="formcontrol" :placeholder="$t('register.password')">

                      <span>
                              <i class="material-icons">remove_red_eye</i>

                            </span>
                    </div>
                    <div class="forget">
                      <a href="#">{{$t('register.forgot_password')}}</a>
                    </div>
                    <div class="clearfix loginBtn">
                      <button class="btn btnStdnt btnLg" type="submit"> {{$t('register.sign_in')}} </button>
                    </div>
                  </form>
                  <div class="subsSignInSec clearfix">
                    <a class="subsSignIn">{{$t('register.buy_subscription')}} </a> |
                    <a class="subsSignIn">{{$t('register.free_trial')}}</a>
                    <div class="trailInfo">
                      <i class="material-icons">info_outline</i>
                      <div class="infoContent">
                        {{$t('register.access_free_trial')}}
                        <br>
                        <a class="knowMore">{{$t('register.know_more')}}</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="subscribe_sec loginPage" style="display:none;">
                  <a class="logo"> Brand Logo </a>
                  <h2 class="brandName">Brand Name</h2>
                  <p class="regesterTxt">{{$t('register.change_password')}}</p>
                  <form class="form-signin">
                    <label for="inputEmail" class="sr-only">Principal</label>
                    <div class="linput">
                      <input type="number" id="email" class="formcontrol" :placeholder="$t('register.registered_phone')" required="" autofocus="">
                    </div>
                    <label for="inputPassword" class="sr-only">Password</label>
                    <div class="linput">
                      <input type="password" class="formcontrol" :placeholder="$t('register.password')">
                      <span>
                              <i class="material-icons">remove_red_eye</i>

                            </span>
                    </div>
                    <label for="inputPassword" class="sr-only">{{$t('register.confirm_pssword')}}</label>
                    <div class="linput">
                      <input type="password" class="formcontrol" placeholder="Confirm password">
                    </div>
                    <div class="clearfix loginBtn">
                      <button class="btn btnStdnt btnLg" type="submit">{{$t('register.submit')}}</button>
                    </div>
                  </form>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



    <div style="display: block">
      <div class="modal fade in selectUserTypePopup" style="display: block;">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
          <div class="popLangBox" >
          <languageSelectBox/>
          </div>
            <a class="pclose" @click="backToMarketing"><span><i class="material-icons">&#xE5CD;</i></span></a>
            <div class="minner">
              <div class="smallLogo"><img src="~assets/images/smallLogo.svg"></div>
              <h3>{{$t('register.subscribe')}}</h3>

              <p>{{$t('register.subscribe_msg')}}</p>
              <div class="btns">
                <button class="btn btn-block btnUserSelect" :class="[{selected: (selectedUser === user.value)}, user.class]" v-for="user in userTypeArray" @click="selectUserType(user.value)">{{$t(user.name)}} <i class="material-icons checkIcon">&#xE86C;</i> </button>
              </div>
              <!-- <div class="row">
                <h5 class="text-center">{{$t('register.already_have_account1')}} <a @click="toSignin">{{$t('register.sign_in')}}</a></h5>
              </div> -->
              <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                </div>
              </div>
            </div>


            <div class="promocodePop">

              <!--OpT Starts-->
              <div class="minner">
                <h3 v-if="this.selectedUser !== 'PARENT'">{{$t('register.got_discount_code')}}?
                  <div class="trailInfo"><i class="material-icons">info_outline</i>
                    <div class="infoContent">
                      <h6>{{$t('register.promo_code')}}</h6>
                      {{$t('register.discountTooltip')}}
                    </div>
                  </div>
                </h3>


                <div class="regFormElements">
                  <div class="formControlOuter" v-if="this.selectedUser !== 'PARENT'">
                    <div class="proCodeInput">
                      <span class="verifiedIco" v-if="appliedPromo"></span>
                      <input type="text" :placeholder="$t('register.enter_promo_code')" @input="changePromoCode" class="formControl">
                      <button class="btn btn-default" @click="applyPromocode">{{$t('common.apply')}}</button>

                    </div>
                    <div class="mError">{{promocodeError}}</div>

                  </div>

                  <div class="btns">
                    <button class="btn btn-link btnNext" @click="selectRegistrationType">

                            <!-- <span class="Nico"><i class="material-icons">&#xE409;</i></span> -->
                            {{$t('register.enter')}}
                          </button>
                  </div>
                  <div class="row">
                <h5 class="text-center alreadyAcTxt">{{$t('register.already_have_account1')}} <a @click="toSignin">{{$t('register.sign_in')}}</a></h5>
              </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      <div class="modal-backdrop fade in"></div>
    </div>


  </div>
</template>

<script>
  import languageSelectBox from '~/components/languageSelectBox'
  export default {
    head () {
      return {
        title: this.$t('index.register')
      }
    },
    data() {
      return {
        enteredPromocode: '',
        promocodeError : '',
        selectedUser: 'STUDENT',
        appliedPromo: false,
        userTypeArray: [{
            value: 'STUDENT',
            name: 'register.student',
            class: 'btn-primary',
            role: 'STUDENT'
          },
          {
            value: 'PARENT',
            name: 'register.parent',
            class: 'btn-secondary',
            role: 'PARENT'
          },
          {
            value: 'TEACHER',
            name: 'register.teacher',
            class: 'btn-blue',
            role: 'TEACHER'
          }
        ]
      }
    },
    layout: 'login',
    mounted() {
      this.checkPhone();
      let dataParamObj = this.$router.currentRoute.path
      // console.log(dataParamObj);
      // let userRouterPath = dataParamObj.split('/')[1]
      this.$root.$emit('showLangCodeActive', {dataParamObj})
    },
    components: {
      languageSelectBox
    },
    methods: {
    checkPhone:function (){
        if(this.$store.state.platFormType == 'android'){
          return window.location = this.$store.getters['getAndriodPlayStore']()
        }else if(this.$store.state.platFormType == 'ios'){
          return window.location = this.$store.getters['getIosPlayStore']()
        }
      },
      backToMarketing() {
        this.$router.push(this.$store.getters['locale/getFinalUrl'](`/marketing`))
      },
      toSignin() {
        this.$router.push({path: this.$store.getters['locale/getFinalUrl'](`/login`), query: this.$route.query});
      },
      selectRegistrationType() {
        if(this.selectedUser === 'STUDENT' || this.selectedUser === 'TEACHER') {
          console.log(localStorage.getItem('isParent'))
          localStorage.removeItem('isParent')
       }
        if(this.appliedPromo) {
          if(this.selectedUser === 'PARENT') {
            this.$router.push({path: this.$store.getters['locale/getFinalUrl'](`/ParentReg`),  query: this.$route.query} )
          }else {
            this.$router.push({path: this.$store.getters['locale/getFinalUrl'](`/register/${this.selectedUser}-${this.enteredPromocode}`),  query: this.$route.query} )
          }
        } else {
          if(this.selectedUser === 'PARENT') {
            this.$router.push({path: this.$store.getters['locale/getFinalUrl'](`/ParentReg`), query: this.$route.query})
          }else {
            this.$router.push({path: this.$store.getters['locale/getFinalUrl'](`/register/${this.selectedUser}-`), query: this.$route.query})
          }
        }
      },
      applyPromocode() {
        if (this.enteredPromocode) {
          this.$store.dispatch('auth/checkPromo', {
            langCode: this.$store.state.locale.selectedLocale,
            promocode: this.enteredPromocode,
            selectedUser: this.userTypeArray.filter(user => (user.value===this.selectedUser))[0].role
          }).then(response => {
            if (response.data.status === 'ERROR') {
              if(response.data.message) {
                this.promocodeError = response.data.message
                //this.$toast.error(response.data.message)
              }else {
                //this.$toast.error(response.data.code)
              }
              this.appliedPromo = false
            } else {
              this.appliedPromo = true
              this.promocodeError = ''
            }
          })
        } else {
          //this.$toast.error(this.$t('toastMsg.promocodeRequired'))
          this.promocodeError = this.$t('toastMsg.promocodeRequired')
        }
      },
      changePromoCode (event) {
        this.enteredPromocode = event.target.value
        this.appliedPromo = false
        this.promocodeError = ''
      },
      selectUserType(userType) {
       console.log(userType)
       if(userType === 'STUDENT' || userType === 'TEACHER') {
          localStorage.removeItem('isParent')
       }
        this.selectedUser = userType
      }
    }
  }
</script>

<style>
  .selected {
    /*background: orange !important;*/
  }
  .promocodePop .proCodeInput .verifiedIco {
    right: 70px;
  }
</style>

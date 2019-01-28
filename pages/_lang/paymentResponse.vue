<template>
  <div>
   <!--  <div v-if="showPopup">
        <div class="modal fade in selectUserTypePopup showTermsPopUp" >
          <div class="modal-dialog" role="document">
            <div class="modal-content" >

              <h3>{{$t('comment.termsText')}}</h3>
              <br>
              <div class="termsScroll" ref="mountingDiv">
                
              </div>

              <div class="regFormElements">
                <div class="btns">
                  <button class="btn btn-block btn-primary" @click="agreeTerms">{{$t('register.i_agree_this')}}</button>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="modal-backdrop fade in"></div>
</div> -->
<tnc-popup :agreeTerms="agreeTerms" :close="closeTncPopup" :selectedLang="selectedLang" v-if="showPopup"/>
<!-- <div v-if="showPopup" class="deletePostPop blockReportPostPop">
   <div class="deletePostPopInner">
      <div class="full-width">
        <div class="text">
          <h4>{{$t('comment.termsText')}}</h4>
        </div>
        <div class="btns">
          <button class="btn btn-primary btn-block" @click="agreeTerms">{{$t('register.i_agree_this')}}</button>
        </div>
      </div>
   </div>
</div> -->
   <!-- <div class="stataticPageOuter">
		   <div class="conMidSec">
		      <div class="stataticPageInner">
                  <a class="pclose" @click="back"><span><i class="material-icons">&#xE5CD;</i></span></a>
			       <h2 class="smallHeading">Hmmm... Seems like you have successfully done your payment</h2>
			        <p class="innerTxt">Let's get back to platform to explore more</p>
                    <div class="full-width">
                        <button class="btn btn-primary" @click="backToDashboard">Continue</button>
                    </div>
			    </div>
		   </div>
   </div> -->
   <div class="">
       <div class="paymentPgInner">
          <!-- <a class="pclose" @click="back"><span><i class="material-icons">&#xE5CD;</i></span></a> -->
          <!-- payment errror summary sec-->
          <!-- <div class="payAmountSec">
             <button class="btnBacktoPrePage"><i class="material-icons">chevron_left</i></button>
             <h4 class="smallHeading">Payable Amount</h4>
             <p class="errorRow">
             <i class="material-icons errIcon">warning</i>Payment Error ! Please Try Again</p>
             <div class="payAmountBox">
                 <div class="payDetailRowSec">
                    <div class="payDetailRow">
                      <div class="">
                      Subscription Details
                      </div>
                      <div class="oldPrice">
                      Rs 21,789
                      </div>
                    </div>
                    <div class="payDetailRow heighLightTxt">
                    <div class="heighLightTxt">
                      Silver Plan
                    </div>
                    <div class="heighLightTxt">
                     Rs 21,789
                    </div>
                  </div>
                </div>
                <div class="payDetailRowSec disCountSec">
                    <div class="payDetailRow">
                       <div>Discount Code <i class="material-icons info_icon">info_outline</i></div>
                    </div>
                    <div class="payDetailRow">
                       <div class="heighLightTxt">Applied
                          <button type="button" class="btn btn-link appliedCloseBtn">
                            <span class="appliedCloseIcon"></span>
                          </button>
                      </div>
                       <div class="heighLightTxt">- Rs 2,000</div>
                    </div>
                    <div class="payDetailRow">
                       <div class="">
                          <input type="text" placeholder="Enter Code" class="codeInput">

                      </div>
                       <div class="heighLightTxt">
                         <button type="button" class="btn btn-link applyBtn">Apply</button>
                       </div>
                    </div>
                </div>
                <div class="payDetailRowSec totalPaySec">
                    <div class="payDetailRow">
                       <div>Total Payable Amount</div>
                       <div class="heighLightTxt">Rs 21,789</div>
                    </div>
                </div>
             </div>
          </div> -->
          <!-- payment success sec-->
          <div id="test" class="paymentSuccessSec">
             <div class="welcocomeSec">
                <div class="welcomeTxtSec">
                <div class="paySucessIcon"><img src="~assets/images/payment_success.svg"></div>
                Dear <span class="heighLightTxt">{{invoiceDetails.userName}},</span> Welcome to Budbeed !</div>
                <button type="button" v-on:click="downloadInvoice" class="btn btn-link invoiceBtn">
                   Invoice <i class="material-icons">save_alt</i>
                </button>
             </div>
             <div class="paymentSuccesBox">
                <div class="paysucLogoSec">
                  <a href="#"><img src="~assets/images//logo.svg"></a>
                </div>
              <div class="paySumBoxSec">
                <div class="paySumBoxCols">
                  <h3 class="boxHeadingTxt">Order Summary</h3>
                  <div class="paySumBox">
                     <div class="topTxtSec">
                        Transaction Id  <span class="heighLightTxt">{{invoiceDetails.transactionId}}</span>
                     </div>
                     <div class="paySumDetailSec">
                         <div class="payDetailRowSec">
                              <div class="payDetailRow">
                                <div class="">
                                Subscription Details
                                </div>
                                
                              </div>
                              <div class="payDetailRow heighLightTxt">
                              <div class="heighLightTxt">
                                {{invoiceDetails.planName}}
                              </div>
                              <div class="heighLightTxt">
                                {{invoiceDetails.planPrice}}
                              </div>
                            </div>
                          </div>
                          <div class="payDetailRowSec">
                              <div class="payDetailRow">
                              <div class="">
                                Budbeed Discount
                              </div>
                              <div class="heighLightTxt">
                               -  {{invoiceDetails.planDiscount}}
                              </div>
                            </div>
                          </div>
                          <div class="payDetailRowSec">
                              <div class="payDetailRow">
                                <div class="">
                                Discount Code
                                </div>
                                <div class="heighLightTxt">
                                 -  {{invoiceDetails.discountCodeDiscount}}
                                </div>
                              </div>
                              <div class="payDetailRow">
                              <div class="">
                                Benefits
                              </div>
                            </div>
                          </div>
                     </div>
                     <div class="payAmntPaySec">
                              <div class="payDetailRow">
                                <div class="">
                                Amount Paid
                                </div>
                                <div class="heighLightTxt">
                                  {{invoiceDetails.totalPrice}}
                                </div>
                              </div>
                      </div>
                  </div>
                </div>
                <div class="paySumBoxCols">
                  <h3 class="boxHeadingTxt">Subscription Validity</h3>
                  <div class="paySumBox">
                     <div class="paySumDetailSec">
                         <div class="payDetailRowSec">
                              <div class="payDetailRow">
                                <div class="">
                                Start Date
                                </div>
                                <div class="">
                                End Date
                                </div>
                                
                              </div>
                              <div class="payDetailRow heighLightTxt">
                              <div class="">
                               {{invoiceDetails.planStartDate}}
                              </div>
                              <div class="">
                              {{invoiceDetails.planEndDate}}
                              </div>
                            </div>
                          </div>
                          <div class="payDetailRowSec">
                              <div class="payDetailRow">
                              <div class="">
                                Duration
                              </div>
                            </div>
                            <div class="payDetailRow heighLightTxt">
                              <div class="">
                                {{invoiceDetails.planDuration}} Days
                              </div>
                            </div>
                          </div>
                     </div>
                  </div>
                </div>
               </div>
               <div class="paySucHintSec">
                  <p class="paySucHint" v-if="invoiceDetails.daysCarriedForward > 0"><span class="heighLightTxt">* {{invoiceDetails.daysCarriedForward}} Days</span> carried forward from previous subscriptions</p>
                  <p v-if="promoCodeBenefitsDays > 0" class="paySucHint"><span class="heighLightTxt">* {{promoCodeBenefitsDays}} Days</span> added for applying promo code</p>
               </div>
             </div>
          </div>
        </div>
   </div>
   <!-- <div class="btns subscNextBtnSec clearfix"><button class="btn nextBtnNew">Make Payment</button></div> -->

 <div class="btns subscNextBtnSec clearfix"><button class="btn btn-primary" @click="back">Continue</button></div>

  </div>
</template>
<script>
import tncPopup from '~/components/tncPopup'
export default {
	layout: 'blank',
  data() {
        return {
        chatPop: true,
        invoiceDetails: {},
        transactionId: '',
        registerSubscription: '',
        showPopup: false,
        invoiceId: '',
        promoCodeBenefitsDays: 0,
        selectedLang: ''
        }
    },
    mounted: function () {
      this.init()
    },
    components: {tncPopup},
    // layout: 'default',
    methods: {
        back () {
            if(this.registerSubscription === 'registerSubscription')
              this.showPopup = true;
            else if(this.registerSubscription === 'pendingSubscription'){
              this.$router.push(this.$store.getters['locale/getFinalUrl'](`/`))
            }
            else {
              // this.$router.back()
              this.$router.push(this.$store.getters['locale/getFinalUrl'](`/`))
            }
        },
        backToDashboard() {
            this.$router.push(this.$store.getters['locale/getFinalUrl'](`/`))
        },
        // downloadInvoice(){
        //   var url_string = window.location.href;
        //   var url = new URL(url_string);
        //   var transactionId = url.searchParams.get("transactionId");
        //   console.log(transactionId);
        //   this.$store.dispatch('auth/getPaymentInvoice', {authToken: this.$store.state.auth.user.token,transactionId:transactionId, langCode: this.$store.state.locale.selectedLocale}).then(response => {
        //     console.log("download success");
        //     console.log("convert data to pdf");
        //   })
        // },
        init(){
          var url_string = window.location.href;
          var url = new URL(url_string);
          var transactionId = url.searchParams.get("transactionId");
          var invoiceId = url.searchParams.get("invoiceId");
          var selectedLanguage = url.searchParams.get("LANG");
          this.selectedLang = selectedLanguage;
          // console.log("invoiceId ",invoiceId);
          this.transactionId = transactionId;
          this.invoiceId = invoiceId;
          this.$store.dispatch('auth/getPaymentInvoiceDetails', {authToken: '',invoiceId:invoiceId, langCode: this.selectedLang}).then(response => {
            // console.log("data ",response.data);
            this.invoiceDetails = response.data;
            if(this.invoiceDetails.promoCodeBenefits == ''){
              this.promoCodeBenefitsDays = 0;
            }
            else{
              this.promoCodeBenefitsDays = parseInt(this.invoiceDetails.promoCodeBenefits);
            }
            this.registerSubscription = localStorage.getItem('source');
            localStorage.setItem('source','');
            // alert("registerSubscription ",this.registerSubscription);
          })
        },
        downloadInvoice(){
          this.$store.dispatch('auth/getPaymentInvoice', {authToken: '',invoiceId: this.invoiceId, langCode: this.selectedLang}).then(response => {
                // console.log("download success");
                // console.log(response.data);
                let blob = new Blob([response.data], { type:   'application/pdf' } )
                let link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = 'PaymentInvoice.pdf'
                document.body.appendChild(link);
                link.click()
            }, error => {

          })
        },
        agreeTerms(){
          console.log(localStorage.getItem('isParent'))
          if(localStorage.getItem('isParent')){
            let userId = this.$store.state.initialData.userId
                    this.$store.dispatch('auth/logout', {
                      deviceId: 'WEB',
                      userId: userId,
                      context: this,
                      langCode: this.selectedLang
                    }).then(response => {
                      this.$router.push(this.$store.getters['locale/getFinalUrl']('/ParentReg'))
                      localStorage.removeItem('isParent')
                    })
          }else{
            this.$router.push(this.$store.getters['locale/getFinalUrl'](`/onboarding`))
          }
          
        },
        closeTncPopup() {
          this.showPopup = false
          this.registerSubscription === 'registerSubscription'
        }
    }
}
</script>

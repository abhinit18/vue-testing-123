<template>
  <div>
    <div class="WrapperSubscribe">
      <div class="pageboxSubscribeOuter">
        <div class="contentSec pageboxSubscribe subscrbPaymentPg">

                 <div class="scrollSec">
                     <div class="conMidSec">
                                 <div class="subscrbPaymentLeft">
                                    <h2 class="payOptionHeading">How do you wish to pay?</h2>
                                    <div class="payMode">
                                        <h3 class="headingTxt">Select Payment Mode</h3>
                                        <ul class="payModeTab">
                                           <li class="active">
                                            <a href="#"> 
                                               <i class="material-icons cardOptIcons">credit_card</i> 
                                               Credit Card 
                                             </a>
                                            </li> 
                                           <li>
                                              <a href="#">
                                              <i class="material-icons cardOptIcons">credit_card</i> 
                                                 Debit Card
                                              </a>
                                            </li>
                                           <li><a href="#">
                                              <i class="material-icons cardOptIcons">computer</i>
                                                 Netbanking
                                              </a>
                                           </li>
                                        </ul>
                                    </div>
                                    <div class="payTabContent">
                                      <h3 class="headingTxt">Enter card details</h3>
                                      <div class="fullrow">
                                       <div class="cardDetailsBox">
                                         <div class="input">
                                           <label> Credit Card Number </label>
                                           <input type="text" class="formControl" placeholder="0000 0000 0000 0000"/>
                                         </div>
                                         <div class="input">
                                           <label> Name on Card </label>
                                           <input type="text" class="formControl" placeholder="Name"/>
                                         </div>
                                          <div class="input">
                                             <div class="colsFifty">
                                               <label> Expires on </label>
                                               <input type="text" class="formControl" placeholder="mm/yy"/>
                                             </div>
                                             <div class="colsFifty">
                                               <label> CVV codes </label>
                                               <input type="text" class="formControl" placeholder="123"/>
                                             </div>
                                         </div>
                                       </div>
                                      </div>
                                       <button type="submit" class="btn btn-primary loginSignBtn"> Pay Now </button>
                                    </div>
                                 </div>
                                 <div class="subscrbPaymentright">
                                  <h3 class="headingTxt">Select Plan</h3>
                                   <div class="selectedPlan"><p>12
                                    <span>Months</span><!----><!----> - TEACHER Plan</p><h4>3000 ₸</h4></div>
                                   <h3 class="headingTxt">Amount Details</h3>
                                   <div class="subscrbAmntInfo">
                                     <div class="detailsRow">
                                       <div class="pull-right">3000 T</div>
                                       Subtotal
                                     </div>
                                     <div class="detailsRow">
                                       <div class="pull-right">0</div>
                                       Discount
                                     </div>
                                     <div class="lineDivider">
                                     </div>
                                     <div class="detailsRow totalRow">
                                       <div class="pull-right totalAmnt">3000 T</div>
                                       Discount
                                     </div>
     
                                   </div>
                                 </div>

                            </div>
                      </div>
                            
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "anonymous",
  layout: "login"
};
</script>
 

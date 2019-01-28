<template>
    <div class="bodyCon clearfix">
        <section class="container">
            <div class="pagebox clearfix">
                <div class="pageboxOver"></div>

              <sidebarUserStudy></sidebarUserStudy>

              <div class="contentSec">
                    <div class="scrollSec">
                        <div class="conMidSec">



<!--notesPopFull-->
                     <div class="notesPop ">
	                       <div class="ediNotetbox">
	                          <div class="header">
	                             <i class="material-icons addNote_iocn">note_add</i>
	                             Edit Note
	                             <div class="rightBtns">
	                               <a href="#" class="btnLinks minBtn"> - </a>
	                               <a href="#" class="btnLinks maxBtn"> + </a>
	                             </div>
	                          </div>
	                          <div class="body">
	                            <h2 class="formHeading">Add Tags</h2>
	                            <div class="input">
	                              <i class="material-icons srchIcon">search</i>
	                              <input class="form-control formFeild" placeholder="Subjects, Topics, etc.">

                                 <ul class="dropdown-menu">
                                  <li>Mathematics</li>
                                  <li>Molecules</li>
                                  <li>Mental Arithmetic</li>
                                </ul>

	                            </div>
	                            <div class="subChip">
	                              <button class="btn chipClose"><i class="material-icons">cancel</i></button>
	                              Mathematics
	                            </div>
	                            <h2 class="formHeading">Notes</h2>
	                            <div class="input txtArea">
	                              <textarea class="form-control formFeild textArea" placeholder="Write your note here">

	                              </textarea>
	                            </div>
	                            <button class="brn btnYellow btn-block">Save Note</button>
	                          </div>
	                       </div>
	                    </div>





                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import sidebarUserStudy from '~/components/sidebarUserStudy'
export default {
  components: {
    sidebarUserStudy
  },
  mounted() {
    this.$store.dispatch('header/navChange', {key: 2, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale, context: this})
  }
}
</script>

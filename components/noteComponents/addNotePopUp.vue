<template>
<div class="notesPop " v-bind:class="{notesPopFull: maximizePopup}" v-on-click-outside="closeThisNotePopup"  @keyup="closeNotePopup">
    <div class="ediNotetbox">
       <div class="noteHeading">
          <i class="material-icons addNote_iocn">note_add</i>
          {{note? $t('study.edit_note') : $t('study.add_note')}}
          <div class="rightBtns">
            <!-- <a href="#" class="btnLinks minBtn" @click="minimize"> - </a> -->
            <a  style="display: none;" class="btnLinks maxBtn" v-if="!maximizePopup" @click="maximize"> + </a>
            <a  class="btnLinks" v-else-if="maximizePopup" @click="maximize">
              <i class="material-icons clear-icon">crop_7_5</i>
            </a>
            <a  class="btnLinks" @click="closeThisNotePopup">
              <i class="material-icons clear-icon">clear</i>
            </a>
          </div>
       </div>
       <div class="noteBody" v-bind:class="{minimize: minimizePopup}">
        <div class="bodyInner">
         <!-- <h2 class="formHeading">{{$t('study.add_tags')}}</h2> -->
         <div class="titleFeild">
           <input class="formControl" @keyup="usersTagInput" maxlength="50" @change="onBlurTaggedChipsShow" v-model="payloadData.subject" :placeholder="$t('study.subjects_topics')">
            <ul class="dropdown-menu" v-if="showTaggedData">
             <li @click="selectTag(tag)" v-for="tag in this.$store.state.note.userTagList.tags">{{tag}}</li>
           </ul>

           <div class="subChipContainer">
           <div class="subChip" v-for="(chips,index) in taggedChips">
             {{chips}}
             <button class="btn chipClose" @click="removeSelectedTag(index)"><i class="material-icons">close</i></button>
           </div>
           <div class="subChip moreChips" style="display: none;">
              3 More
           </div>
           </div>


         </div>
         <!-- <h2 class="formHeading">{{$t('study.notes')}}</h2> -->
         <div class="titleFeild txtArea">
           <textarea class="formControl textArea" v-model="payloadData.body" :placeholder="$t('study.write_note')">

           </textarea>
         </div>
         <customloader loaderClass="brn saveNoteBtn btn-block" :loaderClick="createUsersNote" :loaderDisabled="addNoteButtonLoading" :loaderText="note? 'study.edit_note': 'study.add_note'"></customloader>
         <!-- <button type="button" class="brn saveNoteBtn btn-block" @click="createUsersNote">{{note? $t('study.edit_note'): $t('study.add_note')}}</button> -->
       </div>
     </div>

    </div>
 </div>
</template>
<script>
export default {
    data() {
      return {
        payloadData: {
          body: this.note? this.note.body: ''
        },
        showTaggedData: false,
        taggedChips: this.note? this.note.tags.concat() : [],
        newPartialArray: [],
        addedParam: true,
        maximizePopup: false,
        minimizePopup: false,
        disableNoteButton: false,
        addNoteButtonLoading: false
      }
    },
    methods: {
      createUsersNote() {

        if(this.disableNoteButton) return;

        this.payloadData.userId = this.$store.state.auth.user.userId;
        this.payloadData.ownerId = '';
        this.payloadData.subject = '';
        this.payloadData.tags = this.taggedChips;
        let payloadDetails = {};
        if(this.content) {
          this.payloadData.contentId = this.content.contentId,
          payloadDetails = {
            description: this.content.body[0]['description'],
            thumbnail: this.content.body[0]['thumbnail'],
            title:  this.content.body[0]['title'],
            type: this.content.type
          }
        }
        if(this.note) {
          this.payloadData.noteId = this.note.noteId
        }
        if(this.taggedChips.length === 0){
          this.$toast.error(this.$t('toastMsg.tagsRequired'))
        }
        if((this.payloadData.body.trim() === '' || this.payloadData.body === undefined)){
          this.$toast.error(this.$t('toastMsg.noteBodyRequired'))
          return
        }

        if((this.taggedChips.length !== 0) && (this.payloadData.body !== '')){
          this.disableNoteButton = true;
          this.addNoteButtonLoading = true
          let vm = this
          let createEditDecider = this.note? 'editNote': 'createNote'
          this.$store.dispatch(`note/${createEditDecider}`, {authToken: this.$store.state.auth.user.token, payload: this.payloadData, langCode: this.$store.state.locale.selectedLocale, contentDetails: payloadDetails}).then(response => {
            this.addNoteButtonLoading = false
            this.disableNoteButton = false;
            //vm.$toast.success(vm.$t('note.add_note_success'))
            this.payloadData = ''
            this.taggedChips = ''
            // this.note = undefined

            this.$root.$emit('closeAddPopupEmit',{})
            this.$root.$emit('closeEditPopupEmit',{})
          }, error => {
            this.addNoteButtonLoading = false
          })
        }
      },
      maximize() {
        this.maximizePopup = !this.maximizePopup;
        this.minimizePopup = false;
      },
      minimize() {
        this.minimizePopup = !this.minimizePopup;
        this.maximizePopup = false;
      },
      closeNotePopup(event){

        if(event.key === 'Escape') {
          this.showTaggedData = false;
          // this.$root.$emit('closeAddPopupEmit',{})
        }
      },
      closeThisNotePopup(event){
        this.$root.$emit('closeAddPopupEmit',{})
      },
      usersTagInput(event) {

        if(this.payloadData.subject === ''){
          this.showTaggedData = false;
        }else{
          this.$store.dispatch('note/fetchUserSubjectTags', {authToken: this.$store.state.auth.user.token, tagParams: this.payloadData.subject, langCode: this.$store.state.locale.selectedLocale})
          if(event.key === 'Enter'){
            if(this.payloadData.subject.trim() === ''){
              this.showTaggedData = false;
              return
            }
            // this.showTaggedData = false;
            let tempInputData = this.payloadData.subject;
            if(this.taggedChips.indexOf(tempInputData) === -1){
            this.taggedChips.push(tempInputData)
            this.payloadData.subject = ''
            }
          }else {
            this.showTaggedData = true;
          }
        }
      },
      onBlurTaggedChipsShow() {

        this.$store.dispatch('note/fetchUserSubjectTags', {authToken: this.$store.state.auth.user.token, tagParams: this.payloadData.subject, langCode: this.$store.state.locale.selectedLocale}).then(response => {
          // let taggedDataList = this.$store.state.note.userTagList.tags;

          if(!this.$store.state.note.userTagList.tags){
            if(this.payloadData.subject !== ""){
              if(this.taggedChips.indexOf(this.payloadData.subject) === -1){
                this.showTaggedData = false;
                this.taggedChips.push(this.payloadData.subject);
                this.payloadData.subject = ''
              }
            }
          }
        })
      },
      selectTag(value) {
        this.showTaggedData = false;
        if(this.taggedChips.indexOf(value) === -1){
          this.taggedChips.push(value);
        }
      },
      removeSelectedTag(data,event) {
        this.taggedChips.splice(data,1);
      }
    },
    beforeDestroy() {
      this.$root.$emit('closeAddPopupEmit',{})
    },
    props: ['content', 'note']
  }

</script>
<style>
.notesPop{
  position: fixed;bottom:0%;right:2%;z-index: 9999999;
}
.clear-icon{color:#fff !important;opacity: 1 !important;}
.ediNotetbox .body{ transition: all 0.4s;   max-height: 500px; overflow: auto; }
.ediNotetbox .minimize,
.minimize{ max-height: 0px; overflow: hidden;}
.notesBox{margin-right: 15px;}
.notesPop.notesPopFull{position: absolute !important;z-index:99999;}
.bodyInner{}

</style>

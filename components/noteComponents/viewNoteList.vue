<template>
  <div class="full-width noteRow">




  <div class="notePopUpBox" v-if="showViewNotePopup">
       <div class="notesBox">
<!-- -->
         <a class="pclose" @click="closeViewNotePopup" ><span><i class="material-icons">&#xE5CD;</i></span></a>
         <div class="notesBoxInner">

        <div class="editOff" v-if="!onEdit">
            <p class="dateTxt">{{new Date(viewNotesData.updated) | moment("MMM, Do YYYY / HH:mm")}}</p>
            <div class="pos-rel-detail" v-if="viewNotesData.contentId">
              <div  @click="contentNavigation(viewNotesData.contentId)">

                   <span class="pos-rel">
                    <img v-if="viewNotesData.contentDetails" :src="viewNotesData.contentDetails.thumbnail" class="img-responsive">
                    <span class="vidicon pos-abs" v-if="viewNotesData.contentDetails.type === 'VIDEO'"></span>
                    <span class="audioicon pos-abs" v-if="viewNotesData.contentDetails.type === 'AUDIO'"></span>
                    <span class="texticon pos-abs" v-if="viewNotesData.contentDetails.type === 'EPUB'"></span>
                  </span>

              </div>

            </div>
            <p class="subjectTxt" v-if="!onEdit">
              <span v-for="contentags in this.viewNotesData.tags">{{contentags}}</span>
            </p>
            <div class="editBox">
                  <a class="editBtn" @click="edit(viewNotesData)" v-if="!onEdit"><i class="material-icons">mode_edit</i><span class="editBtnText">{{$t('note.edit')}}</span></a>
                  <!-- <a @click="saveEditedNote()" v-if="onEdit">{{$t('common.save')}}</a> -->
                  <customloader v-if="onEdit" loaderClass="btn btn-primary" :loaderClick="saveEditedNote" :loaderDisabled="editButtonLoading" loaderText="common.save"></customloader>
                  <a class="editBtn" @click="remove(viewNotesData.noteId)"><i class="material-icons">delete</i><span class="editBtnText">{{$t('note.remove')}}</span></a>

                </div>
            <p class="noteTxt" v-if="!onEdit">
                {{this.viewNotesData.body}}
            </p>

          </div>


            <div class="editOn" v-if="onEdit" >
              <h3><i class="material-icons">&#xE254;</i>{{$t('study.edit_note')}}</h3>

              <div class="eform">
            <div class="input" style="position:relative;"  v-if="onEdit" >

              <input class="  formFeild" @keyup="usersTagInput" @change="onBlurTaggedChipsShow" v-model="payloadData.subject" :placeholder="$t('study.subjects_topics')">
               <ul class="dropdown-menu" v-if="showTaggedData">
                <li @click="selectTag(tag)" v-for="tag in this.$store.state.note.userTagList.tags">{{tag}}</li>
              </ul>

            </div>
<div class="subChipOuter">
            <div class="subChip" v-if="onEdit" v-for="(chips,index) in editNotesDataObj.tags">
              <!-- @click="removeSelectedTag(index)" -->
              {{chips}}
              <button class="btn chipClose" @click="removeEditNotetags(index)"><i class="material-icons" >cancel</i></button>
            </div>
          </div>


            <textarea class="  formFeild textArea" v-if="onEdit" v-model="editNotesDataObj.body" :placeholder="$t('study.write_note')">

            </textarea>
            </div>

            <div class="editNotesave">
              <customloader v-if="onEdit" loaderClass="btn btn-primary" :loaderClick="saveEditedNote" :loaderDisabled="editButtonLoading" loaderText="common.save"></customloader>
            <!-- <a @click="saveEditedNote()" v-if="onEdit" class="btn btn-primary ">{{$t('common.save')}}</a> -->
          </div>
          </div>

            <!-- <div class="notesHoverBox">
                <div class="upperBox">
                  <a href="#" class="viewBtn">{{$t('note.view')}}</a>

                </div> -->
                <!-- <div class="editBox">
                  <a class="editBtn" @click="edit(viewNotesData)" v-if="!onEdit"><i class="material-icons">mode_edit</i><span class="editBtnText">{{$t('note.edit')}}</span></a>
                  <a @click="saveEditedNote()" v-if="onEdit">Save</a>

                  <a @click="remove(viewNotesData.noteId)"><i class="material-icons">delete</i><span class="editBtnText">{{$t('note.remove')}}</span></a>

                </div> -->
            <!-- </div> -->
      </div>
    </div>
  </div>



      <!--- delete confirmation message popUp  -->



<div class="notePopUpBoxDelete" v-if="showDeleteNotePopup">
  <div class="deletePostPop">
        <a class="pclose" @click="showDeleteNotePopup = false" ><span><i class="material-icons">&#xE5CD;</i></span></a>
        <div class="deletePostPopInner">
            <!-- <h3><i class="material-icons">&#xE872;</i> Delete Post</h3> -->
            <p>{{$t('note.note_delete_confirmation')}}</p>
            <div class="btns">
              <customloader loaderClass="btn btn-bordered" :loaderClick="removeCreatedNote" :loaderDisabled="deleteNoteButtonLoading" loaderText="settings.yes"></customloader>
                <!-- <a  class="btn btn-bordered" @click="removeCreatedNote()">{{$t('settings.yes')}}</a> -->
              <a  class="btn btn-primary" @click="showDeleteNotePopup = false">{{$t('settings.no')}}</a>
            </div>
        </div>
    </div>
</div>







    <div class="notesBoxSec clearfix">
      <h2 class="welcomText">{{$t('index.note')}}</h2>
      <div class="actionBtnsec" v-if="actionButtons" >
        <div class="actionBtn sortBtn" > <div @click="openSort">{{$t('note.sort')}} <i class="material-icons">sort</i></div>
              <div class="dropShow sorting" v-on-click-outside="openSort" v-if="viewSortingBlock">
                <ul class="sortList">
                  <li v-for="sort in $store.state.note.sort" @click="refetchData(sort)" :class="{active: sort===selectedSort}">{{$t('note.'+sort)}}</li>
                </ul>
            </div>
        </div>

        <div class="actionBtn filterBtn"> <div  @click="openFilter"> {{$t('note.filter')}} <i class="material-icons">filter_list</i></div>
              <div class="dropShow filterOpt" v-if="viewFilterBlock" v-on-click-outside="openFilter">
                   <div class="filterLinkSec clearfix">
                      <span class="filterNub">{{$t('buddy.filter')}} <span>(</span>{{this.savedNoteTagschips.length}}<span>)</span></span>
                      <!-- <button type="button" class="btn btn-link btnFilter active">Subjects</button>
                      <button type="button" class="btn btn-link btnFilter">Topics</button> -->
                      <button type="button" class="btn btn-link btnFilter clearAll" @click="clearAllTagChips">{{$t('note.clear_all')}}</button>
                   </div>
                   <div class="filterListOuter">
                       <div class="srchBox">
                         <i class="material-icons srchIcon">search</i>
                         <input type="text" class="form-control" v-model="filterInputSearch" :placeholder="$t('study.type_subjects_topics')">
                       </div>
                       <ul class="filterListOpt">
                        <li v-for="listedtag in filterInputSearchData">
                          <label class="control control--checkbox">
                          {{listedtag.tagName}}<input type="checkbox" :checked="savedNoteTagschips.indexOf(listedtag.tagName)!==-1" :value="listedtag.tagName"  @change="filteredData(listedtag)"><div class="control__indicator"></div> ({{listedtag.total}})
                          </label>
                       </li>
                     </ul>
                  </div>
                  <button type="button" class="brn saveNoteBtn btn-block" @click="applyFilter">{{$t('common.apply')}}</button>

            </div>
        </div>
        <button class="btn add_notesBtn" @click="addNotesToggle">{{$t('study.add_notes')}}</button>
        <div class="optCloseSec">
           <div class="subChip" v-for="(mySavedTaggedChips,index) in savedNoteTagschips">
              {{mySavedTaggedChips}}<span class="closeChip" @click="removeSelectedTag(index)"><i class="material-icons" >cancel</i></span>
            </div>
            <button type="button" class="btn btn-link btnFilter clearAll" v-if="savedNoteTagschips.length !== 0" @click="clearAllTagChips">{{$t('note.clear_all')}}</button>
        </div>
     </div>




     <div class="notesListingOuter">
      <masonry
  :cols="4"
  :gutter="0"
  >
      <div class="notesBox" v-for="myNote in this.$store.state.note.fetchednotes"  v-if="actionButtons ||  contentId == myNote.contentId">
        <div class="notesBoxInner">
            <p class="dateTxt">{{new Date(myNote.updated) | moment("MMM, Do YYYY / HH:mm")}}</p>
            <div class="full-width pad10" v-if="myNote.contentId">
                  <span class="pos-rel">
                    <img v-if="myNote.contentDetails && myNote.contentDetails.thumbnail !== undefined" :src="myNote.contentDetails.thumbnail" class="img-responsive">
                    <span class="vidicon pos-abs" v-if="myNote.contentDetails && myNote.contentDetails.type === 'VIDEO'"></span>
                    <span class="audioicon pos-abs" v-if="myNote.contentDetails &&myNote.contentDetails.type === 'AUDIO'"></span>
                    <span class="texticon pos-abs" v-if="myNote.contentDetails&&myNote.contentDetails.type === 'EPUB'"></span>
                  </span>
                    <h5><b v-if="myNote.contentDetails">{{myNote.contentDetails.description}}</b></h5>

            </div>
            <p class="noteTxt block-with-text text-ellipsis">{{myNote.body}}</p>
            <p class="subjectTxt">
              <span v-for="mySubjectTags in myNote.tags">{{mySubjectTags}}</span>

            </p>
            <div class="notesHoverBox">
              <!--  -->
                <!-- <div class="upperBox"> -->
                  <a  @click="viewNotePopup(myNote)" class="btn add_notesBtn viewBtn">{{$t('note.view')}}</a>
                <div class="editBox">
                  <a class="editBtn" @click="edit(myNote)"><i class="material-icons">mode_edit</i>
                  <span class="editBtnText">{{$t('note.edit')}}</span></a>
                  <a class="editBtn" @click="remove(myNote.noteId)"><i class="material-icons">delete</i><span class="editBtnText">{{$t('note.remove')}}</span></a>
                </div>
                <!-- </div> -->
            </div>
      </div>
    </div>
</masonry>

  </div>
  <!--  -->

    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import VueMasonry from 'vue-masonry-css'
Vue.use(VueMasonry);
Vue.use(require('vue-moment'));
export default{
  data() {
    return {
        showViewNotePopup: false,
        viewNotesData: {},
        viewSortingBlock: false,
        editNotesDataObj:{},
        payloadData:{},
        filterInputSearch: '',
        finalNoteDeleteId: '',
        onEdit:false,
        showDeleteNotePopup: false,
        showTaggedData:false,
        viewFilterBlock: false,
        savedNoteTagschips: [],
        disableEditButton: false,
        deleteNoteButtonLoading: false,
        editButtonLoading: false,
        selectedSort: 'MODIFIED'
    }
  },
  props: ['listedFilteredNotes', 'actionButtons', 'contentId'],
  mounted() {
    this.$root.$on('closeEditPopupEmit', ({note}) => {
      this.showViewNotePopup = false
    })
  },
  beforeDestroy () {
  this.$root.$off('closeEditPopupEmit')
  },
  methods: {
    addNotesToggle() {
      // this.$store.dispatch('note/toggleAddNotePopup')
      this.$root.$emit('openAddPopupEmit',{})
    },
    removeCreatedNote(){
      this.deleteNoteButtonLoading = true
      let noteId = this.finalNoteDeleteId
      let payload = {noteId}
      this.$store.dispatch('note/deleteNote', {authToken: this.$store.state.auth.user.token, payload, langCode: this.$store.state.locale.selectedLocale}).then(response => {
        // this.$toast.success(this.$t('note.note_delete_success'))
        this.showDeleteNotePopup = false
        this.deleteNoteButtonLoading = false
        if(response.data.status === 'SUCCESS'){
          // this.$store.dispatch('note/fetchDataByTags',{authToken: this.$store.state.auth.user.token, queryTaggedData:this.savedNoteTagschips, langCode: this.$store.state.locale.selectedLocale})
          this.$store.dispatch('note/fetchDataByTags',{authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale})
          // this.clearAllTagChips()
        }
      }, error => {
        this.deleteNoteButtonLoading = flase
      })
    },
    onBlurTaggedChipsShow() {
      console.log('inside on blur')
      this.$store.dispatch('note/fetchUserSubjectTags', {authToken: this.$store.state.auth.user.token, tagParams: this.payloadData.subject, langCode: this.$store.state.locale.selectedLocale}).then(response => {
        // let taggedDataList = this.$store.state.note.userTagList.tags;

        if(!this.$store.state.note.userTagList.tags){
          if(this.payloadData.subject !== ""){
            if(this.editNotesDataObj.tags.indexOf(this.payloadData.subject) === -1){
              this.showTaggedData = false;
              this.editNotesDataObj.tags.push(this.payloadData.subject);
              this.payloadData.subject = ''
            }
          }
        }
      })
    },
    contentNavigation(data) {
      this.$router.push(this.$store.getters['locale/getFinalUrl'](`/contentView/${data}`))
    },
    usersTagInput(event) {
      console.log('inside usersTag Input',event.target.value)
      if(this.payloadData.subject === ''){
        this.showTaggedData = false;
      }else{
        this.$store.dispatch('note/fetchUserSubjectTags', {authToken: this.$store.state.auth.user.token, tagParams: this.payloadData.subject, langCode: this.$store.state.locale.selectedLocale})
        if(event.key === 'Enter'){
          this.showTaggedData = false;
          let tempInputData = this.payloadData.subject;
          // if(this.taggedChips.indexOf(tempInputData) === -1){
          // this.taggedChips.push(tempInputData)
          // this.payloadData.subject = ''
          // }
        }else {
          this.showTaggedData = true;
        }

      }
    },
    selectTag(value) {
      this.showTaggedData = false;
      if(this.editNotesDataObj.tags === undefined) {
        this.editNotesDataObj.tags = [];
        this.editNotesDataObj.tags.push(value);
      }
      if(this.editNotesDataObj.tags.indexOf(value) === -1){
        this.editNotesDataObj.tags.push(value);
      }
    },
    openSort() {
      this.viewSortingBlock = !this.viewSortingBlock;
    },
    openFilter() {
      this.viewFilterBlock = !this.viewFilterBlock;
      this.$store.dispatch('note/fetchUserSavedNoteTags',{authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale})
      this.filterInputSearch = ''
    },
    viewNotePopup(data) {

      this.viewNotesData = data;
      this.showViewNotePopup = true;
      this.onEdit = false;
    },
    closeViewNotePopup() {
      this.viewNotesData = '';
      this.showViewNotePopup = false;
    },
    filteredData(value) {
      // this.savedNoteTagschips.push(value.tagName)

      // let queryString = this.savedNoteTagschips.toString();
      if(this.savedNoteTagschips.indexOf(value.tagName)===-1) {
        this.savedNoteTagschips.push(value.tagName)
        // this.$store.dispatch('note/fetchDataByTags',{authToken: this.$store.state.auth.user.token, queryTaggedData:this.savedNoteTagschips.toString(), langCode: this.$store.state.locale.selectedLocale})
      } else {
        this.savedNoteTagschips.splice(this.savedNoteTagschips.indexOf(value.tagName),1)
      }
    },
    fetchData () {
      fetchDataByTags
    },
    applyFilter() {
      if(this.savedNoteTagschips.length === 0){
        this.$store.dispatch('note/fetchDataByTags', { sort: this.selectedSort, authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale})
      }else{
        this.$store.dispatch('note/fetchDataByTags',{ sort: this.selectedSort, authToken: this.$store.state.auth.user.token, queryTaggedData:this.savedNoteTagschips, langCode: this.$store.state.locale.selectedLocale})
      }
      this.viewFilterBlock = false
      this.filterInputSearch = ''
    },
    clearAllTagChips() {
      this.savedNoteTagschips = [];
      this.$store.dispatch('note/fetchDataByTags', {authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale})
      this.filterInputSearch = ''
    },
    sortByNewDate() {
      this.$store.dispatch('note/toggleDataFilterByOldDate')
      // let filteredNewData = this.$store.state.note.fetchednotes.concat().sort(function(a,b) {
      //   return new Date(a.updated).getTime() - new Date(b.updated).getTime()
      // })
      // this.$root.$emit('fetchListedFilterednoteData' ,{responseData:filteredNewData})

      // this.listedNoteData = this.$store.state.note.fetchednotes.concat().sort(function(a,b){
      //   return new Date(a.updated).getTime() - new Date(b.updated).getTime()
      // });

    },
    sortByOldDate() {
      this.$store.dispatch('note/toggleDataFilterByNewDate')
      // let filteredNewData = this.$store.state.note.fetchednotes.concat().sort(function(a,b) {
      //   return new Date(b.updated).getTime() - new Date(a.updated).getTime()
      // })
      // this.$root.$emit('fetchListedFilterednoteData' ,{responseData:filteredNewData})
      // this.listedNoteData = this.$store.state.note.fetchednotes.concat().sort(function(a,b){
      //   return new Date(b.updated).getTime() - new Date(a.updated).getTime()
      // });
      // // this.$store.state.note.fetchednotes.sort(function(a,b){
      // //   return new Date(b.updated).getTime() - new Date(a.updated).getTime()
      // // });
      // console.log(this.listedNoteData);
    },
    refetchData (sort) {
      this.selectedSort = sort
      this.applyFilter()
      this.openSort()
    },
    remove (noteId) {

      let payload = {noteId}
      this.viewNotesData = noteId;
      this.finalNoteDeleteId = noteId;
      this.showViewNotePopup = false;
      this.showDeleteNotePopup = true;
    },
    edit (note) {
      this.viewNotesData = note;
      this.onEdit = true;
      this.editNotesDataObj = JSON.parse(JSON.stringify(note));
      this.showViewNotePopup = true;

      // this.$root.$emit('openAddPopupEmit', {note})
    },
    removeEditNotetags(data) {
      this.editNotesDataObj.tags.splice(data,1);
    },
    saveEditedNote() {
      if(this.disableEditButton) return;

      if(this.editNotesDataObj.tags === undefined) {
        this.$toast.error(this.$t('toastMsg.oneTagNeeded'))
      }
      if(this.editNotesDataObj.tags.length === 0) {
        this.$toast.error(this.$t('toastMsg.oneTagNeeded'))
      }
      if(this.editNotesDataObj.body === '') {
        this.$toast.error(this.$t('toastMsg.noteRemarkRequired'))
        return;
      }
      if((this.editNotesDataObj.tags.length !== 0) && (this.editNotesDataObj.body !== 0)) {
        this.editButtonLoading = true
        this.disableEditButton = true;
        this.$store.dispatch(`note/editNote`, {authToken: this.$store.state.auth.user.token, payload: this.editNotesDataObj, langCode: this.$store.state.locale.selectedLocale}).then(response => {
          // vm.$toast.success(vm.$t('note.note_add_success'))
          this.disableEditButton = false;
          this.editButtonLoading = false
          //this.$toast.success(this.$t('toastMsg.noteEditSuccess'))
          this.editNotesDataObj = ''
          this.showViewNotePopup = false;
          this.onEdit = false;

        // this.taggedChips = ''
        // this.note = undefined

        // this.$root.$emit('closeAddPopupEmit',{})
        // this.$root.$emit('closeEditPopupEmit',{})
      }, error => {
        this.editButtonLoading = false
      })
    }
    },
    removeSelectedTag(index) {
      console.log('inside remove selected tag')
      this.savedNoteTagschips.splice(index,1);
      if(this.savedNoteTagschips.length === 0) {
        this.$store.dispatch('note/fetchSavedList', {authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale})
      }
    }
  },
  computed:{
    function(){
      this.listedNoteData = this.$store.state.note.fetchednotes;
    //   this.sortByNewDate(){
    //     this.listedNoteData = this.$store.state.note.fetchednotes.concat().sort(function(a,b){
    //       return return new Date(a.updated).getTime() - new Date(b.updated).getTime()
    //     })
    //   };
    //   this.sortByOldDate(){
    //     this.listedNoteData = this.$store.state.note.fetchednotes.concat().sort(function(a,b){
    //     return return new Date(b.updated).getTime() - new Date(a.updated).getTime()
    //   })
    // };
  },
  filterInputSearchData() {
    return this.$store.state.note.userSavedNoteTags.filter(tags => {
      return tags.tagName.toLowerCase().indexOf(this.filterInputSearch.toLowerCase()) !== -1
  })
  }
  }
}
</script>
<style>
.notesBox{margin-right:15px;}
.notePopUpBox{display:block !important;z-index: 999999;}
.notePopUpBox .notesHoverBox .editBox {
    float: right;
    right: 0px;position: absolute;top:-14px;
}

.pclose{cursor:pointer;}
.dropShow{display: block !important;}
.actionBtn{z-index: 99999;}
.content-thumbnail{width:100%;height: 65vh;}
.text-ellipsis{
  display:block;width:100%;text-overflow:ellipsis;;overflow:hidden;max-height:200px;
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
}
</style>

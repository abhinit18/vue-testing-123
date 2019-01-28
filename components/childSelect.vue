<template>

<div>
        <!-- <span class="icons select__arrow"></span> -->

        <!-- <select class="" @change="changeLanguage" :value="this.$store.state.locale.selectedLocale">
                      <option v-for="locale in this.$store.state.locale.locales"
                      :key="locale.code" :value="locale.code">{{locale.name}}</option>
                    </select> -->
              <a>
                  <childImgDropdown  :imageObj="fetchNameAndPic(this.defaultChild.id)"/>
              </a>

                 <div class="dropDownBox headerProfDropBox">
                  <ul>
                   <li class="headerProfList" v-bind:class="{proUnread: defaultChild.id === child.id}" v-for="child in this.$store.state.initialData.children">
                     <div class="leftRadio">

                     <div class="radioCustom">
                        <label>
                          <input type="radio" v-model="defaultChild" @click="changeLanguage(child)" :value="child" name="sex">
                          <span></span>
                          </label>
                     </div>

                     </div>
                     <div class="info profileInfo">
                        <div class="headerProInfoImg">
                           <childImgDropdown :imageObj="fetchNameAndPic(child.id)"/>
                         </div>
                         <div class="headerProInfoImgTxt">{{child.name}}</div>
                         <div class="headerProRgtDrop active">
                             <removeChild :child="child"/>
                        </div>
                      </div>
                   </li>
                  </ul>
                  <div class="headerProBtnSec">
                   <button type="button" @click="goto" class="btn btn-primary profAddBtn">Add Child</button>
                  </div>
                </div>



<!--
    <div class="dropdownSel">
      <div class="seleLangcbtn">
        <span>
            <img :src="this.defaultChild.pic" style="width:30px;height:30px;border-radius:50%;"/>
        </span>{{this.defaultChild.name}}
        <span class="icons select__arrow"></span>
      </div>
      <ul style="width:200px;">
         <li v-for="child in this.$store.state.initialData.children" @click="changeLanguage(child)"
                          :value="child.id">
                          <span>
                            <img :src="child.profilePic" style="width:30px;height:30px;border-radius:50%;"/>
                          </span>
                          {{child.name}}</li>
      </ul>
    </div> -->
</div>
</template>

<script>
    import childImgDropdown from '~/components/childImgDropdown'
    import removeChild from '~/components/view/removeChild'
    export default {
        data() {
            return{
                defaultChild: this.$store.state.currentSelectedChild,
                childSelection: false,
                toggleMenuOpt: false
            }
        },
        components: {childImgDropdown,removeChild},
        mounted() {
            this.defaultChild = this.$store.state.currentSelectedChild
        },
        methods: {
            goto(){
                this.$router.push(this.$store.getters['locale/getFinalUrl'](`/postLoginAddChild`));
            },

            changeLanguage(child) {
            this.defaultChild = child
            let defaultChild = this.defaultChild
            this.$store.dispatch('fetchUsersGrades', {authToken: this.$store.state.auth.user.token, childId: defaultChild.id, langCode: this.$store.state.locale.selectedLocale, context: this}).then(response =>{
                if(response.data.status === 'SUCCESS'){
                    this.$store.dispatch('content/fetchSubject', {
                    curriculumId: this.$store.getters['getCurrentGrade']().curriculumId,
                    id: 1,
                    childId: this.$store.getters['getCurrentChildId'](),
                    authToken: this.$store.state.auth.user.token,
                    langCode: this.$store.state.locale.selectedLocale
                }).then(resp => {
                    this.$root.$emit('childExpiryPopUp', {
                        byParent: this.defaultChild.expiryDays,
                        bySubs: this.$router.currentRoute.path
                    })
                    this.$root.$emit('childProgressUpdatedData', {
                        data: this.defaultChild.expiryDays
                    })
                    this.$router.push(this.$store.getters['locale/getFinalUrl'](`/myprogress`));
                }, (err) =>{
                    this.$router.push(this.$store.getters['locale/getFinalUrl'](`/mySubscription`));
                })


                }else if(response.data.status === 'ERROR' && response.data.code === 'CHILDREN_SUBSCRIPTION_EXPIRED') {
                    this.$router.push(this.$store.getters['locale/getFinalUrl'](`/mySubscription`));
                }
            })
            this.$store.dispatch('updateChildId', {childObj: defaultChild})
            //authToken, langCode,childId, type
            this.$store.dispatch('content/fetchRecent',
            {authToken : this.$store.state.auth.user.token,
            langCode : this.$store.state.locale.selectedLocale, childId : defaultChild.id,type:'viewed'} ).then(res => {
            });
            },
            fetchNameAndPic (userId) {
                let userInfoArr = this.$store.state.initialData.children
                let userInfoObj = {username: 'name', userpic: '' }
                for(let i=0; i<userInfoArr.length;i++)
                {
                if(userId === userInfoArr[i].id)
                {
                    userInfoObj['username'] = userInfoArr[i].name
                    userInfoObj['userpic'] = userInfoArr[i].pic
                    // userInfoObj['userid'] = id
                }
                }
                return userInfoObj
            }
        }
    }
</script>

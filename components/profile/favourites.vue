<template>
    <div>
    <favourites v-if="getSubjects.length===0 && getHobbies.length===0"/>
    <div v-else>
    <div class="subjectsRow clearfix" v-if="getSubjects.length>0">
            <h3 class="smallHeading">{{$t('settings.subjects')}}</h3>
            <div class="subjectsList clearfix">
               <ul v-for="subject in subjects">
                  <li v-if="subject.isSelected"><span class="subImg"><img :src="subject.imageUrl" class="temp_size"></span>
                     {{subject.name}}
                  </li>
               </ul>
            </div>
         </div>
         <div class="subjectsRow clearfix" v-if="getHobbies.length>0">
            <h3 class="smallHeading">{{$t('settings.hobbies')}}</h3>
            <div class="subjectsList clearfix">
               <ul v-for="hobby in getHobbies">
                  <li v-if="hobby.isSelected"><span class="subImg"><img :src="hobby.imageUrl" class="temp_size"></span>
                     {{hobby.hobbyName}}
                  </li>
               </ul>
            </div>
         </div>
         </div>
         </div>
</template>

<script>
import favourites from '~/components/placeholders/favourites'
export default {
    props: ['userId'],
    components: {favourites},
    data () {
        return {
            hobbies: [],
            subjects: []
        }
    },
    mounted () {
        let sendUserId  = ''
        if(this.$store.state.initialData.userId !== this.userId) {
          sendUserId = this.userId
        }
        this.$store.dispatch('profile/fetchProfileSetting', {
        userId: sendUserId,
        authToken: this.$store.state.auth.user.token,
        langCode: this.$store.state.locale.selectedLocale
      }).then(response => {
          if (response && response.data ) {
              this.hobbies = response.data.hobbies? response.data.hobbies: []
              this.subjects = response.data.subjects? response.data.subjects: []
          }
      })
    },
    computed: {
        getHobbies () {
            return this.hobbies.filter(hobby => hobby.isSelected)
        },
        getSubjects () {
            return this.subjects.filter(subject => subject.isSelected)
        }
    }
}
</script>

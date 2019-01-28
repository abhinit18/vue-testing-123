<template>
<div class=" buddySec">
            <div class="full-width ">
               <div class="col-lg-10 col-md-10 col-sm-12 col-xs-12"></div>
               <nobuddy v-if="buddies.length===0" nolabel="true"/>
               <ul class="buddylistinline" v-else>
                   <li class="buddycustom-box mg-btm" v-for="buddy in buddies">
                    <buddyCardsView :buddy="buddy" :pageStatus="pageStatus"/>
                  </li>
               </ul>
            </div>
         </div>
</template>

<script>
import buddyCardsView from "~/components/view/buddyCardsView"
import nobuddy from '~/components/placeholders/nobuddy'
export default {
    components: {buddyCardsView, nobuddy},
    props: ['userId'],
    data () {
        return {
            pageStatus: 'profile',
            buddies: []
        }
    },
    mounted () {

        this.$store.dispatch('profile/fetchBuddies', {
        userId: this.userId,
        authToken: this.$store.state.auth.user.token,
        langCode: this.$store.state.locale.selectedLocale
      }).then(response => {
          if (response && response.data && response.data.connections) {
              this.buddies = response.data.connections
          }

      })

      this.$root.$on('buddyActionByUser', (dataUser) => {
        //this.$toast.success(this.$t('toastMsg.addBuddySuccess'))
        if(dataUser) {
          this.$store.dispatch('profile/fetchBuddies', {
          userId: this.userId,
          authToken: this.$store.state.auth.user.token,
          langCode: this.$store.state.locale.selectedLocale
        }).then(response => {
            if (response && response.data && response.data.connections) {
                this.buddies = response.data.connections
            }

        })
        }

        // console.log('inside success check',this.buddies);
        // debugger
        // if(dataUser !== '') {
        //   for(var i=0;i<this.buddies.length;i++) {
        //     if(this.buddies[i].userId === dataUser){
        //       this.buddies.splice(this.buddies[i],1)
        //     }
        //   }
        // }
      })
    },
    beforeDestroy () {
    this.$root.$off('buddyActionByUser')
    },
    methods: {
        goToProfile (userId) {
            this.$router.push(this.$store.getters['locale/getFinalUrl'](`/profile/${userId}`))
        }
    }
}
</script>

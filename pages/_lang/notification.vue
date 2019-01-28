<template>
  <div class="notificationSecOuter">
    <div class=" ">
      <a class="pclose" @click="closePopup"><span><i class="material-icons">&#xE5CD;</i></span> </a>

      <div class="notificationSec clearfix">



        <!-- <div class="dropDownBox clearfix">
                <h3><i class="material-icons">notifications_none</i> Notifications</h3>

                <ul>
                  <li class="unread">
                    <div class="img"><img width="40" height="40" src="http://via.placeholder.com/36x36"></div>
                    <div class="info">
                      <strong>Mehrool Hafiz</strong> commented your post "Can anyone help me with trigonometry"


                      <p class="date">Feb 12, 2017  <span>13:54</span></p>
                    </div>
                  </li>
                  <li class="unread">
                    <div class="img"><img width="40" height="40" src="http://via.placeholder.com/36x36"></div>
                    <div class="info">
                      <strong>Mehrool Hafiz</strong> commented your post "Can anyone help me with trigonometry"
                      <p class="date">Feb 12, 2017  <span>13:54</span></p>
                    </div>
                  </li><li>
                    <div class="img"><img width="40" height="40" src="http://via.placeholder.com/36x36"></div>
                    <div class="info">
                      <strong>Mehrool Hafiz</strong> commented your post "Can anyone help me with trigonometry"
                      <p class="date">Feb 12, 2017  <span>13:54</span></p>
                    </div>
                  </li>
                  <li class="unread">
                    <div class="img"><img width="40" height="40" src="http://via.placeholder.com/36x36"></div>
                    <div class="info">
                      <strong>Mehrool Hafiz</strong> commented your post "Can anyone help me with trigonometry"

                    </div>
                  </li>
                  <li>
                    <div class="img"><img width="40" height="40" src="http://via.placeholder.com/36x36"></div>
                    <div class="info">
                      <strong>Mehrool Hafiz</strong> commented your post "Can anyone help me with trigonometry"

                    </div>
                  </li>
                  <li>
                    <div class="img"><img width="40" height="40" src="http://via.placeholder.com/36x36"></div>
                    <div class="info">
                      <strong>Mehrool Hafiz</strong> commented your post "Can anyone help me with trigonometry"

                    </div>
                  </li>

                </ul>

              </div> -->

        <notification :isPage="true" />



      </div>

    </div>
  </div>
</template>

<script>
  import notification from '~/components/notification'
  export default {
    head () {
			return {
			title: this.$t('common.notifications')
			}
		},
    middleware: 'authenticated',
    //layout: 'popupview',
    mounted() {
      this.$store.dispatch('locale/startNotificationPolling', {
        authToken: this.$store.state.auth.user.token,
        langCode: this.$store.state.locale.selectedLocale,
        context: this
      })
    },
    methods: {
      closePopup() {
        this.$router.push(this.$store.getters['locale/getFinalUrl'](`/`))
      }
    },
    components: {
      notification
    }
  }
</script>

<style>
  .studyPopUpPage {
    top: 20px;
    position: fixed;
  }

  .onlyOneLink {
    width: 100%
  }

  .whenOnlyLeft {
    text-align: left!important;
  }

  .whenOnlyLeft .material-icons {
    float: left!important;
    margin: 0 0 0 -30px!important;
  }

  .video_thumbnail {
    max-height: 133px
  }
</style>

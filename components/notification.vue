<template>
    <div class="dropDownBox">
        <h3 v-if="type !== 'FEATURED_CONTENT_UPLOAD'"><i class="material-icons">notifications_none</i> {{$t('common.notifications')}}</h3>
        <div class="loaderMin" v-if="notificationLoading"></div>
        <ul v-else>
            <li class="subscrbExpRow" v-if="!$store.getters['isParent']() && !isTour">
                <p v-if="expiryDays === 0">{{$t('profile.subscription_expiry_short')}} <span class="subscrbExpDays"> {{$t('common.today')}} </span> </p>
                <p v-else-if="expiryDays === 1">{{$t('profile.subscription_expiry_short')}} <span class="subscrbExpDays"> {{$t('common.tomorrow')}} </span> </p>
                <p v-else>{{$t('profile.subscription_expiry')}} <span class="subscrbExpDays">{{expiryDays}} {{$t('activity.days')}} </span> </p>
                <router-link :to="$store.getters['locale/getFinalUrl']('/mySubscription')" class="btnSubscUpgrade">{{$t('common.upgrade')}}</router-link>
            </li>
            <li :class="{unread: notification.read===-1}" v-for="notification in notifications.filter(notification => { return notification.notification})" @click="markNotificationRead(notification)">
                <div class="img">
                    <img width="36" height="36" :src="getImageUrl(notification)">
                </div>
                <div class="info">
                    <strong>{{$store.getters['locale/getNotificationTitle'](notification)}} </strong>
                    <!-- <strong v-if="notification.notificationType==='SUBSCRIPTION_PURCHASE'"> {{new Date(notification.notificationData.subscriptionEndDate) | moment("MMM, Do YYYY / HH:mm")}} </strong> -->
                    <p class="date">{{new Date(notification.created)  | moment("MMM, Do YYYY / HH:mm")}}</p>
                </div>
            </li>
            <li class="subscrbExpRow" v-if="notifications.length == 0">No Results found</li>
        </ul>

        <div class="btnsecLoad">
            <button  class="btn loadMoreBtn" @click="loadMore" v-if="isLoadMore()">
                 {{$t('common.more')}}
            </button>
        </div>
        <div class="viewAll" v-if="!isPage">
            <router-link :to="$store.getters['locale/getFinalUrl']('/notification')">{{$t(`common.viewall`)}}</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        mounted () {
        if(!this.$store.getters['isParent']() && !this.isTour){
            this.$store.dispatch('profile/fetchUserExpiry', {
                authToken: this.$store.state.auth.user.token,
                langCode: this.$store.state.locale.selectedLocale
            }).then((response) => {
                if (response && response.status === 200 && response.data) {
                  console.log("Response is ",response.data);
                  this.expiryDays = response.data.expiryDays;
                }
            })
        }
        else{
          this.expiryDays = this.$store.state.currentSelectedChild.expiryDays;
            // console.log("expiry ",this.expiryDays);
        }
        if(this.$store.state.initialData.isTourUser) {
          this.isTour = true
        }

            this.type = this.$route.query.type
            this.fetchData()


        },
        data() {
            return {
                page: 0,
                notifications: [],
                totalNotifications: 0,
                size: 20,
                type: '',
                notificationLoading: false,
                isTour : false,
                expiryDays: ''
            }
        },
        beforeDestroy () {
            this.notifications = []
            this.totalNotifications = 0
            this.page = 0
        },
        props: ['isPage'],
        methods: {
            markNotificationRead(notification) {
                if (notification.readStatus !== 'READ') {
                    this.$store.dispatch('locale/markNotificationRead', {
                        authToken: this.$store.state.auth.user.token,
                        langCode: this.$store.state.locale.selectedLocale,
                        notificationId: notification.userNotificationId
                    })
                }
                if (notification.notificationType === 'FEATURED_CONTENT_UPLOAD') {
                    this.$router.push(this.$store.getters['locale/getFinalUrl'](`/contentView/${notification.notificationData.contentId}`))
                } else if (notification.notificationType === 'EBOOK_EXPIRY' ) {
                    this.$router.push(this.$store.getters['locale/getFinalUrl'](`/ebooks`))
                }
                else if (notification.notificationType === 'NOW_A_CONNECTION'  || notification.notificationType === 'ACCEPT_BUDDY_REQUEST') {
                    this.$router.push(this.$store.getters['locale/getFinalUrl'](`/profile/${notification.notificationData.fromUserId}`))
                }
                else if (notification.notificationType === 'NEW_BUDDY_REQUEST' || notification.notificationType === 'BUDDY_REQUEST_REMINDER') {
                  this.$router.push(this.$store.getters['locale/getFinalUrl'](`/newRequest`))
                }else if (notification.notificationType === 'SUBSCRIPTION_EXPIRY' || notification.notificationType === 'SUBSCRIPTION_RENEWAL' || notification.notificationType === 'SUBSCRIPTION_PURCHASE' || notification.notificationType === 'TRIAL_EXPIRY_REMINDER') {
                    this.$router.push(this.$store.getters['locale/getFinalUrl'](`/mySubscription`))
                } else if (notification.notificationType === 'SENT_A_GIFT') {
                    this.$root.$emit('showGift', {giftNotification: notification})
                } else if (notification.notificationType === 'LIKE_POST' || notification.notificationType === 'COMMENT_POST' || notification.notificationType === 'SHARE_POST' ||
                notification.notificationType === 'REPLY_TO_COMMENT' || notification.notificationType === 'NEW_BUDDY_POST' || notification.notificationType === 'NEW_POST_TAGGED' || notification.notificationType === 'NEW_WALL_POST') {
                    this.$store.dispatch('postContent/resetPost')
                    this.$root.$emit('openPostPopup', {postId: notification.notificationData.postId})
                } else if (notification.notificationType === 'WELCOME_MESSAGE') {
                    this.$router.push(this.$store.getters['locale/getFinalUrl'](`/help`))
                } else if (notification.notificationType === 'EARNED_NEW_BADGE' ) {
                    this.$router.push(this.$store.getters['locale/getFinalUrl'](`/scoreboard`))
                } else if (notification.notificationType === 'PIC_APPROVED') {
                    //this.$router.push(this.$store.getters['locale/getFinalUrl'](`/setting`))
                    this.$store.dispatch('refetchInitialData', {authToken: this.$store.state.auth.user.token, langCode: this.$store.state.locale.selectedLocale}).then(response => {
                        //this.$toast.success(this.$t('toastMsg.profile_pic_refreshed'))
                    }, error => {
                        this.$toast.error(this.$t('toastMsg.profile_pic_refresh_error'))
                    })
                }
            },
            getImageUrl(notification) {
                if (notification.notificationType === 'EARNED_NEW_BADGE') {
                    return notification.notificationData.badgePic ? notification.notificationData.badgePic : 'http://via.placeholder.com/36x36'
                }  else if (notification.notificationType === 'FEATURED_CONTENT_UPLOAD') {
                    return notification.notificationData.thumbnail ? notification.notificationData.thumbnail : 'http://via.placeholder.com/36x36'
                } else {
                    return notification.notificationData.fromUserPic ? notification.notificationData.fromUserPic : 'http://via.placeholder.com/36x36'
                }
            },
            loadMore () {
                if (this.isLoadMore()) {
                    this.fetchData ()
                }
            },
            isLoadMore () {
                return (this.page * this.size < this.totalNotifications)
            },
            fetchData () {
                this.notificationLoading = true
                this.$store.dispatch('locale/fetchNotification', {
                        authToken: this.$store.state.auth.user.token,
                        langCode: this.$store.state.locale.selectedLocale,
                        size: this.size,
                        page: this.page,
                        type: this.type? this.type : ''
                    }).then(response => {
                        this.notificationLoading = false
                        this.page = this.page + 1
                        this.totalNotifications = response.data.totalElements
                        let a = this.notifications
                        if (response.data.notification) {
                            let b = response.data.notification
                            let newArray = a.concat(b)
                            this.notifications = newArray
                        }
                    }, error => {
                        this.notificationLoading = false
                    })
            },
            beforeDestroy () {

                this.notifications = []
                this.totalElements = 0
                this.page = 0
            }
        }
    }
</script>
<style>
.btnsecLoad{margin:10px 0 10px; text-align:center;}
 .loadMoreBtn{cursor: pointer;
    padding: 3px 10px;
    background: #f1f1f1;
    color:#444;
    display: inline-block;
    text-align: center;font-size:12px;}

</style>

require('dotenv').config()
console.log('process.env.CDN_HOST >> ' + process.env.CDN_HOST);
console.log('process.env.LMS_HOST >> ' + process.env.LMS_HOST);
console.log('process.env.GTM_ID >> ' + process.env.GTM_ID);

module.exports = {
    /*
     ** Headers of the page
     {property:"og:image",content:"~/assets/images/Facebook_content_share.png"}

     */

    head: {
        title: 'Budbee',
        ssr: true,
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=1150' },
            {property:"og:url",content: process.env.CDN_HOST + "marketing"},
            {property:"og:type",content:"website"},
            {property:"og:title",content:"Budbeed"},
            {property:"og:description",content:"How much does culture influence creative thinking?"},
            {property:"og:image:url",content:process.env.CDN_HOST+"img/Facebook_content_share.png"}

        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
            {rel:'stylesheet', href:process.env.CDN_HOST+ "css/print.css", media:"print"}
        ],

        script: [
            { src: process.env.CDN_HOST+"js/jszip.min.js" },
            { src: process.env.CDN_HOST+"js/epub.js" },
            //{ async:true, src:"https://www.googletagmanager.com/gtag/js?id="+process.env.GTM_ID},
            //{ innerHTML:"window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '"+process.env.GTM_ID+"');",
            //  type:"text/javascript", body: true },
            // { src: "//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5a3b9e65206ebb3a" }
            // { src: "connect.facebook.net/en_us/all.js" }
            // { src: "'~/plugins/popBalloon.js'"}
            { src: "https://code.jquery.com/jquery-1.12.4.js" },

            {src:"https://maps.googleapis.com/maps/api/js?key=AIzaSyAESmMMLGqjj5grY2siW0XEKvAdAp1YfQI&libraries=places"},
            { src: "https://code.jquery.com/ui/1.12.1/jquery-ui.js" },
            {src: process.env.CDN_HOST+ "js/jquery.columnizer.js"},
            {src: process.env.CDN_HOST+ "js/url.js"},
            {src: process.env.CDN_HOST+ "js/polyfills.js"},
            { src: process.env.CDN_HOST+"js/snowplow.js" },
            { innerHTML:"document.getElementsByTagName('body')[0].oncontextmenu = function(){return false};",
              type:"text/javascript", body: true },
        ]
    },
    css: [
        '~/assets/css/main.scss', 'swiper/dist/css/swiper.css'
    ],
    env: {
    baseUrl: process.env.LMS_HOST,
    CDN_HOST: process.env.CDN_HOST,
    APP_HOST: process.env.APP_HOST,
    READER_HOST: process.env.READER_HOST,
    GTM_ID: process.env.GTM_ID
  },
    /*
     ** Customize the progress-bar color
     */
    loading: '~/components/loading.vue',
    /*
     ** Build configuration
     */
    build: {
      publicPath: process.env.CDN_HOST+'_nuxt/',
      extractCSS:true,
        /*
         ** Run ESLINT on save
         */
        extend(config, ctx) {
          config.module.noParse=[/videojs-contrib-hls/]
            if (ctx.dev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        },
        vendor: ['~/assets/js/zopim.js', '~/node_modules/event-source-polyfill/src/eventsource.js'],
    },

    /*
     ** Router config
     */
    router: {
        middleware: ['check-auth', 'i18n']
    },
    plugins: ['~/plugins/eventhub.js' , '~/plugins/customloader.js',{ src: '~/plugins/googleMap.js', ssr: false }, '~/plugins/momentPlugin.js',  { src: '~/plugins/swiper.js', ssr: false }, { src: '~/plugins/picturecropper.js', ssr: false }, { src: '~/plugins/datepicker.js', ssr: false },  { src: '~/plugins/carousel3d.js', ssr: false }, '~/plugins/i18n.js', '~/plugins/i18n-mixin.js','~/plugins/socialSharing.js', { src: '~/plugins/video.js', ssr: false }, { src: '~/plugins/emoji', ssr: false }, { src: '~/plugins/star_rating', ssr: false }, { src: '~/plugins/e-reader', ssr: false }, { src: '~/plugins/confirmBox', ssr: true }, {src: '~plugins/clickoutside.js', ssr: false}, {src: '~plugins/imageCropper.js', ssr: false}, {src: '~plugins/lazyload.js', ssr: false}, {src: '~plugins/forage.js', ssr: false},
    {src: '~plugins/lightBox.js', ssr: false}, {src: '~plugins/dotenv.js', ssr:false}, {src: '~plugins/ga.js', ssr:false}
],

    modules: ['@nuxtjs/toast'],
    toast: {
        duration: 6000,
        singleton:true
    }
}

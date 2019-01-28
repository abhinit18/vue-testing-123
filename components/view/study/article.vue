<template>
<div class="articalSecDiviFrame" id='articalSecDiviFrame'>
  <ratingPopup :content="content" :ratingsPopup="ratingsPopup"> </ratingPopup>
<div name="article" id='articleDiv'  frameborder="0" ></div>
</div>

</template>

<script>
import axios from "~/plugins/axios";
import { lrsPost } from "../../../utils/lrs";
import locales from "../../../locales";
import ratingPopup from "./ratingPopup";

export default {
  components: {
    ratingPopup
  },
  data(context) {
    return {
      locales: locales,
      hitTimeSeconds: 10000,
      refreshIntervalId: null,
      locale: "en",
      authToken: ""
    };
  },
  props: ["content", "ratingsPopup"],
  mounted() {

    this.locale = this.$store.state.locale.selectedLocale;
    let contentBody = ''
    if(this.content.body.length > 1){
    //fetch the content thru locale
    contentBody = this.content.body.find((aBody) => {
      return (aBody.lang == this.locale) ? true : false
    })['value']
    }else{
      contentBody = this.content.body[0]["value"]
    }
    console.log('contentBody>> ', contentBody);


    var xhr = new XMLHttpRequest();
    var self = this;
    xhr.onload = function() {
      document.getElementById(
        "articleDiv"
      ).innerHTML = this.responseXML.body.innerHTML;
      self.addScripts();
    };



    xhr.open("GET", contentBody);
    xhr.responseType = "document";
    xhr.send();

    let contentId = this.content.contentId;
    let verb = "initialised";
    let object = "article";

    let contentType = this.$store.state.locale.selectedLocale;
    let authToken = this.$store.state.auth.user.token;
    this.authToken = authToken;
    let objectDetails = {
      id: contentId
    };

    lrsPost(
      authToken,
      {
        verb,
        object,
        objectDetails
      },
      contentType
    ).then(response => {
      if (response && response.data && response.data.httpStatus == 200) {
        if (response.data.points && response.data.coins) {
          let points = response.data.points;
          let coins = response.data.coins;
          this.$store.dispatch("updateCoinsPoints", { points, coins });
        }
      }
    });

    this.$store.state.applicationProperties.forEach((item, index) => {
      if (item.name == "EBOOK_HITTIME_SECONDS") {
        this.hitTimeSeconds = parseInt(item.value);
      }
    });
  },
  methods: {
    translate(val) {
      let vals = val.split(".");
      return this.locales[this.locale][vals[0]][vals[1]];
    },
    addScripts() {
      window.translationsReader = {
        highlight: this.translate("ereader.highlight"),
        comment: this.translate("ereader.comment"),
        save: this.translate("common.save"),
        remove: this.translate("note.remove"),
        addNote: this.translate("study.add_note"),
        clear: this.translate("ereader.clear")
      };
      let iFrameWindow = window;
      window.commonArticle = true;

      iFrameWindow.token = this.$store.state.auth.user.token;
      iFrameWindow.contentId = this.content.contentId;
      iFrameWindow.LMS_HOST = axios.defaults.baseURL;
      iFrameWindow.platform = "web";

      let iFrameHead = iFrameWindow.document.getElementsByTagName("head")[0];

      let adder = [
        [".annotator-adder, .annotator-outer", ["position", "fixed"]]
      ];

      let scripts = ["annotator.js", "annotator-init-article.js"];

      var myscript = iFrameWindow.document.createElement("script");
      myscript.type = "text/javascript";
      myscript.src = "/js/" + scripts[0];

      myscript.onload = () => {
        let myscript = iFrameWindow.document.createElement("script");
        myscript.type = "text/javascript";
        myscript.src = "/js/" + scripts[1];
        iFrameHead.appendChild(myscript);
      };

      iFrameHead.appendChild(myscript);

      let csss = ["annotator2.css", "custom.css"];

      csss.forEach((val, index) => {
        let e = iFrameWindow.document.createElement("link");
        e.rel = "stylesheet";
        e.type = "text/css";
        e.href = "/css/" + val;
        iFrameHead.appendChild(e);
      });

      clearInterval(this.refreshIntervalId);

      if (this.refreshIntervalId == null) {
        this.refreshIntervalId = setInterval(() => {
          let contentId = this.content.contentId;
          let verb = "reading";
          let object = this.content.type;

          let objectDetails = {
            id: contentId,
            currentTime: "0"
          };
          let contentType = this.locale;

          lrsPost(
            this.authToken,
            {
              verb,
              object,
              objectDetails
            },
            contentType,
            "web"
          ).then(response => {
            if (response && response.data && response.data.httpStatus == 200) {
              let points = response.data.points;
              let coins = response.data.coins;
              this.$store.dispatch("updateCoinsPoints", { points, coins });
            }
          });
        }, this.hitTimeSeconds);
      }
    }
  },
  destroyed() {
    window.document.querySelector("body").classList.remove("highlightDefault");
    var TEXTSELECTOR_NS = "annotator-textselector";

    $(document.body)
      .off("mouseup." + TEXTSELECTOR_NS, window.eventHandle1)
      .off("mousedown." + TEXTSELECTOR_NS, window.eventHandle2);

    clearInterval(this.refreshIntervalId);
  }
};
</script>
<style>
.articalSecDiviFrame img { max-width:100%!important}
.articalSecDiviFrame .pointRate_box {
  box-shadow: 0 0 50px #0000009e;
  position: fixed;
}
</style>

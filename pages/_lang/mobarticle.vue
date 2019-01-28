<template>
<div>
<div class="articalSecDiviFrame" id='articalSecDiviFrame'>
<div name="article" id='articleDiv'  frameborder="0" style="width: 100%;"></div>
        <div v-show="loaded" class="btnCompOuter clearfix">
          <button class="btn btn_border" v-if="!content.completed" @click="markCompleted" >
            <i class="material-icons done_icon">done</i>{{$t('study.complete')}}
            </button>
        <button class="btn btn_border completedVideo" v-else>{{$t('study.completed')}}</button>
      </div>

</div>
  <div class="eReaderOptionSec">
    <button class="hMenu"  @click="toggleMenu"><i class="material-icons"></i></button>
    <div class="leftbtns pull-left">
        <div style="display: none;">
            <button class="btn btn-link"><i class="ricons inforicons"></i>
                <div role="tooltip" class="tooltip bottom">
                    <div class="tooltip-arrow"></div>
                    <div class="tooltip-inner">Book Info</div>
                </div>
            </button>
        </div>
    </div>
</div>
<div class="menusEreaderOuter" v-bind:class="{displayNone: !menusOpen}">
  <div class="menusEreader">
    <div class="pclose" @click="toggleMenu"><span><i class="material-icons">&#xE5CD;</i></span></div>

    <ul>
        <li v-if='notesPresent > 0'>
          <a :href="noteBaseURL">
           <i class="ricons addnoteIcons"></i>
              {{notesPresent}} {{translate('study.notes')}}
          </a>
        </li>
        <li v-else>
                <a href="javascript:void(0);">
           <i class="ricons addnoteIcons"></i>
              0 {{translate('study.notes')}}
          </a>
        </li>
    </ul>
  </div>
</div>
</div>
</template>

<script>
import axios from "~/plugins/axios";
import apiUrls from "../../config/apiUrls";
import { lrsPost } from "../../utils/lrs";
import locales from '../../locales'

export default {
  asyncData(context) {
    const contentId = context.req.headers["contentid"];
    const authToken = context.req.headers["authorization"];
    const platform = context.req.headers["platform"];
    const locale = context.req.headers["accept-language"];
    const childId = context.req.headers["childid"];
    const headers = {
      Authorization: authToken,
      platform: platform,
      "Accept-Language": locale
    };
    return axios
      .get(apiUrls.getContent(contentId, childId), {
        headers: {
          Authorization: authToken,
          platform: platform,
          "Accept-Language": locale
        }
      })
      .then(response => {
        console.log(response);
        return {
          locales: locales,
          loaded: false,
          token: authToken,
          content: response.data.content[0],
          platform: platform,
          locale: locale,
          hitTimeSeconds: 10000,
          refreshIntervalId: null,
          noteBaseURL: axios.defaults.baseURL + 'notes',
          completeBaseURL: axios.defaults.baseURL + 'complete',
          menusOpen: false
        };
      })
      .catch(e => {
        console.log(e)
        context.error({ statusCode: 404, message: "ARTICLE NOT FOUND" });
      });
  },
  layout: "mobilereader",
  mounted() {
  this.$i18n.locale = this.$store.state.locale.selectedLocale

    //Handle expiration
    this.$store.dispatch("note/fetchSavedList", {
      authToken: this.token,
      langCode: this.locale,
      platform: this.platform
    });

    this.$store.state.applicationProperties.forEach((item, index) => {
      if (item.name == "EBOOK_HITTIME_SECONDS") {
        this.hitTimeSeconds = parseInt(item.value);
      }
    });

    let contentId = this.content.contentId;
    let verb = "initialised";
    let object = "article";

    let contentType = this.locale;
    let authToken = this.token;
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
      contentType,
      this.platform
    ).then(response => {
      if (response && response.data && response.data.httpStatus == 200) {
      }
    });

    window.refreshNotes = e => {
      //e.preventDefault();

      this.$store.dispatch("note/fetchSavedList", {
      authToken: this.token,
      langCode: this.locale,
      platform: this.platform
    });
    }

    window.oncontextmenu = e => {
      e.preventDefault();

      var clickEvent = new MouseEvent("mouseup", e);

      setTimeout(() => window.document.body.dispatchEvent(clickEvent), 1000);

      return false;
    };

    window.showNoteHighBox = e => {
      var clickEvent = new MouseEvent("mousedown", e);

      window.document.body.dispatchEvent(clickEvent);

      setTimeout(() => {
        var clickEvent = new MouseEvent("mouseup", e);

        window.document.body.dispatchEvent(clickEvent);
      }, 500);
    };

    var xhr = new XMLHttpRequest();
    var self = this;
    xhr.onload = function() {
      document.getElementById(
        "articleDiv"
      ).innerHTML = this.responseXML.body.innerHTML;
      self.addScripts();
    };
    xhr.open("GET", this.content.body[0]["value"]);
    xhr.responseType = "document";
    xhr.send();
  },
  methods: {
    toggleMenu(e){
e.preventDefault();
this.menusOpen = !this.menusOpen

    },
        markCompleted(e) { // TODO DRY

          this.content.completed = true;

          window.location.href = this.completeBaseURL;

    },

    translate(val){
        let vals = val.split('.')
        return this.locales[this.locale][vals[0]][vals[1]];
    },
    addScripts() {
      let iFrameWindow = window;
      window.translationsReader = {
  'highlight': this.translate('ereader.highlight'),
  'comment': this.translate('ereader.comment'),
  'save': this.translate('common.save'),
  'remove': this.translate('note.remove'),
  'addNote': this.translate('study.add_note'),
  'clear': this.translate('ereader.clear')
}
      window.commonArticle = true;

      iFrameWindow.token = this.token;
      iFrameWindow.contentId = this.content.contentId;
      iFrameWindow.LMS_HOST = axios.defaults.baseURL;
      iFrameWindow.platform = this.platform;
      iFrameWindow.article = true;

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
      /*
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
            this.token,
            {
              verb,
              object,
              objectDetails
            },
            contentType,
            this.platform
          ).then(response => {
            if (response && response.data && response.data.httpStatus == 200) {

            }
          });
        }, this.hitTimeSeconds);
      }*/

      this.loaded = true;
    }
  },
    computed: {
    notesPresent() {
      let c = this.$store.state.note.fetchednotes.filter(
        res => res.contentId == this.content.contentId
      );
      return c.length;
    }
  },
   destroyed(){
    window.document.querySelector('body').classList.remove('highlightDefault');
      var TEXTSELECTOR_NS = 'annotator-textselector';

      $(document.body)
            .off("mouseup." + TEXTSELECTOR_NS, window.eventHandle1)
            .off("mousedown." + TEXTSELECTOR_NS, window.eventHandle2);

      clearInterval(this.refreshIntervalId);
  }
};
</script>
<style>
body, html{ min-width: 100%!important; height: auto!important; overflow: scroll!important}
.displayNone {
  display: none;
}
.articalSecDiviFrame  { padding:55px 15px 0}
.articalSecDiviFrame img { max-width:100%!important}
.eReaderOptionSec .leftbtns {
  margin: 0;
  padding: 0;
}
.annotator-outer{
  margin: auto;

  width: 100%!important;
    height: 100%!important;
    position: fixed!important;
    left: 0px!important;
    top: 0px!important;
}

.annotator-widget{    left: 20px!important;
    top: 120px!important;
    right: 20px!important;
    bottom: auto!important;}


.eReaderOptionSec .tooltip,
.eReaderOptionSec .pageBtns,
.zopim {
  display: none !important;
}
.eReaderOptionSec .leftbtns {
  width: 100%;
}
.eReaderOptionSec .srchSecAll {
  position: absolute;
  right: 0;
  top: 0;
}
.eReaderOptionSec .srchSec {
  width: 0;
}
.eReaderOptionSec .tooltip {
}
.eReaderOptionSec {
  padding: 0; position: fixed; left: 0; top: 0; height: 44px;
}
.menusEreaderOuter{ position: fixed!important}

.eReaderOptionSec .srchSecAll .srchResult .srchResultList {
  height: calc(100vh - 80px);
}
.eReaderOptionSec .pull-right {
  display: none;
}
.eReaderOptionSec .srchSec {
  position: absolute;
  right: 60px;
  width: 260px;
  top: 14px;
}
.eReaderOptionSec .srchSecAll .srchResult {
  width: 300px;
  right: 60px;
}
.btnCompOuter{ padding: 20px 0}
.menusEreaderOuter {
  position: absolute;
  top: 44px;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  padding: 0;
  z-index: 99999;
  height: calc(100vh - 44px);
}
.menusEreader {
  width: 100%;
  background: #1f2533;
  padding: 10px 0;
  height: calc(100vh - 44px);
}
.menusEreader ul {
  padding: 0;
  margin: 0;
}
.menusEreader ul li {
  padding: 15px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
}

.menusEreader ul li a {
  color: rgba(255, 255, 255, 0.7);
}

.menusEreader .done_icon{ color: #fff}


.menusEreader .ricons {
  vertical-align: middle;
  margin: 0 15px 0 0;
}
.menusEreader ul li .addnoteIcons {
  background-position: -340px -191px;
  transform: scale(0.8);
}

.eReaderOptionSec .leftbtns .btn {
  border: none;
}

.hMenu {
  position: absolute;
  left: 11px;
  top: 9px;
  color: #fff;
  background: none;
  outline: none;
  border: 0;
}
.hMenu:hover {
  color: #39c1c7;
}
.hMenu .material-icons {
  font-size: 26px;
}
.eReaderOptionSec .srchSecAll .srchResult .srchResultList li {
  padding: 15px;
}
.eReaderOptionSec .srchSecAll .srchResult {
  padding: 0;
}

.eReaderOptionSec {
  z-index: 999999;
}

.articalSecDiviFrame *{ width: auto!important}
.articalSecDiviFrame img{ height: auto!important}
</style>

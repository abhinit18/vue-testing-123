  <template>
  <div>
<div class="eReaderSec">

<div class="searchResultBox annotationSearchResultBox" v-bind:class="{ hide: !buttonStates.annotationBar }" >


    <div  class="searchResultBoxItem">
      <div class="heading">
        <div class="pclose" @click="toggleSideBar(false)"><span><i class="material-icons">&#xE5CD;</i></span></div>  {{translate('ereader.annotations')}}
      </div>


      <div class="rfiltersOuter">
      <div class="rfilters">
        <div class="radioCustom">
         <label> <input type="radio" v-model="filter.searchAt" value="book" @click="filterAnnotations(filter.type)" > <span></span> {{translate('ereader.entireBook')}}</label>
        </div>
        <div class="radioCustom">
         <label> <input type="radio" v-model="filter.searchAt" value="page" @click="filterAnnotations(filter.type)"> <span></span> {{translate('ereader.thisPage')}}</label>
        </div>

      </div>
      <div class="rfilters">
        <a href="javascript:void(0);" class="btn btn-borderd" v-bind:class="{ active: filter.type == 'all' }" @click="filterAnnotations('all')">{{translate('ereader.all')}}</a>
        <a href="javascript:void(0);" class="btn btn-borderd" v-bind:class="{ active: filter.type == 'highlights' }" @click="filterAnnotations('highlights')" >{{translate('ereader.highlights')}}</a>
        <a href="javascript:void(0);" class="btn btn-borderd" v-bind:class="{ active: filter.type == 'comments' }" @click="filterAnnotations('comments')">{{translate('ereader.comments')}}</a>
      </div>
      <div class="rfilters" v-if="filter.type == 'highlights'" >
       <!--  <a href="javascript:void(0);" class="btn btn-borderd" v-bind:class="{ active: filter.type == 'all' }" @click="filterAnnotations('all')">ALL</a> -->

        <span class="colorBox green " v-bind:class="{ active: filter.color.indexOf('blue') != -1 }" @click="filterAnnotations('blue', true)"></span>
        <span class="colorBox orange " v-bind:class="{ active: filter.color.indexOf('orange') != -1 }" @click="filterAnnotations('orange', true)"></span>
        <span class="colorBox lightGreen " v-bind:class="{ active: filter.color.indexOf('green') != -1 }" @click="filterAnnotations('green', true)"></span>

      </div>
    </div>
      <div class="searchResultBoxInner">
        <ul>
          <li v-for="(ann, index) in filteredAnnotations" @click="goToBookmark(ann['cfi'])">
            <template v-if="ann.options == undefined">
              <h4><span class="count colorName annotator-hl-yellow" >{{ann['fetchOrder']}}</span>{{ann.quote && ann.quote.substring ? ann.quote.substring(0, 15) : ''}}</h4>
              <p>{{ann.quote && ann.quote.substring ? ann.quote.substring(15, 50) : ''}}</p>
            </template>
            <template v-else>
              <h4><span class="count colorName" v-bind:class="ann.options.colorClass">{{ann['fetchOrder']}}</span>{{ann.quote && ann.quote.substring ? ann.quote.substring(0, 15) : ''}}</h4>
            </template>
          </li>
        </ul>
      </div>
    </div>



  </div>





  <div class="searchResultBox" v-bind:class="{ hide: (!showOverLay || buttonStates.annotationBar) || buttonStates.searchBar }">

    <div v-if="buttonStates.topicBar" class="searchResultBoxItem tocsearchResultBoxItem">
      <div class="heading">

        <div class="pclose" @click="toggleSideBar(false)"><span><i class="material-icons">&#xE5CD;</i></span></div> Table of Content
      </div>

      <div class="searchResultBoxInner">
        <ul v-if="sidebar.toc.length > 0">
          <!-- <li v-for="item in sidebar.toc" v-bind:style="{ 'margin-left': item.level * 20 + 'px' }"
            @click="goToBookmark(item.href)">{{item.label}}</li> -->
            <li v-for="item in sidebar.toc" v-bind:class="{ 'sub': item.level }" @click="goToBookmark(item.href)">{{item.label}}</li>
        </ul>
      </div>
    </div>

    <div v-else-if="buttonStates.infoBar" class="searchResultBoxItem bookContentCover">
      <div class="heading">

        <div class="pclose" @click="toggleSideBar(false)"><span><i class="material-icons">&#xE5CD;</i></span></div> {{translate('ereader.information')}}
      </div>
      <div class="searchResultBoxInner">
        <div class="coverImg">
          <div class="img" v-bind:style="{ backgroundImage: 'url(' + sidebar.cover + ')' }"></div>
          <img v-bind:src="sidebar.cover" alt="translate('ereader.cover')" width="100%"/></div>
        <ul>
          <li><h4>{{title}}</h4></li>
          <li><label>{{translate('ereader.title')}}</label>
              <div>{{sidebar.metadata.title}}</div></li>
              <li><label>{{translate('ereader.creator')}}</label>
              <div>{{sidebar.metadata.creator}}</div></li>
        </ul>
      </div>
    </div>

  </div>

  <div class="eReaderSecInner clearfix">
    <div class="eReaderOptionSec">

      <div class="count" v-if="this.currentPage && this.totalPages">{{currentPage}} / {{totalPages}}</div>


      <button class="hMenu" @click="toggleSideBar(false, true)"><i class="material-icons">&#xE5D2;</i></button>


<div class="leftbtns pull-left">


           <div  style="display: none;">

          <button class="btn btn-link"  v-bind:class="{ active: buttonStates.infoBar }" @click="toggleSideBar(true, 'infoBar')">
            <i class="ricons inforicons"></i>
            <div class="tooltip bottom" role="tooltip"> <div class="tooltip-arrow"></div> <div class="tooltip-inner">{{translate('ereader.bookInfo')}}</div> </div>
          </button>
          <button class="btn btn-link"  v-bind:class="{ active: buttonStates.topicBar }" @click="toggleSideBar(true, 'topicBar')">
            <i class="ricons tableicons"></i>

            <div class="tooltip bottom" role="tooltip"> <div class="tooltip-arrow"></div> <div class="tooltip-inner">{{translate('ereader.tableOfContents')}}</div> </div>
          </button>
          <button class="btn btn-link btnBookmark" v-bind:class="{ active: buttonStates.annotationBar }" @click="toggleSideBar(true, 'annotationBar')">
             <span class="caret"></span> -->
             <i class="ricons annotationsicons"></i>
             <div class="tooltip bottom" role="tooltip"> <div class="tooltip-arrow"></div> <div class="tooltip-inner">{{translate('ereader.annotations')}}</div> </div>
           </button>
         </div>

          <div class="srchSecAll" >
            <button class="btn btn-link"   @click="toggleSideBar(true, 'searchBar')">
              <i class="ricons searchricons"   v-bind:class="{ activeSearch: buttonStates.searchBar }"></i>
              <div class="tooltip bottom" role="tooltip"> <div class="tooltip-arrow"></div> <div class="tooltip-inner">{{translate('ereader.search')}}</div> </div>
            </button>
            <div class="srchSec">
               <span v-if="sidebar.searchText != ''" class="closeSrch"><button class="btn btn-link letterLink" @click="reinitSearchData(); sidebar.searchText = ''"><i class="material-icons" >clear</i></button></span>
               <input  v-if="buttonStates.searchBar" type="text" class="formControl" placeholder="" v-model="sidebar.searchText" v-on:change="onSearch" >
            </div>
            <div class="srchResult" v-bind:class="{ displayNone: !(sidebar.searchResults.length > 0 || searchedAlready) }">
               <ul class="srchResultList" v-if="sidebar.searchResults.length > 0">
                  <li v-for="(result, index) in sidebar.searchResults" @click="goToBookmark(result.cfi, index)" :id='"searchResult" + index' >
                    {{highlightKeyword(result.excerpt, index)}}
                  </li>
               </ul>
                <div class="noResults" v-else-if="searchedAlready">
                    {{translate('ereader.noResults')}}
                </div>
            </div>
           </div>
    </div>

    </div>



<div class="menusEreaderOuter" v-bind:class="{displayNone: !menusOpen}">
  <div class="menusEreader">
    <div class="pclose" @click="toggleSideBar(false)"><span><i class="material-icons">&#xE5CD;</i></span></div>

    <ul>
        <li @click="toggleSideBar(true, 'infoBar')">

          <i class="ricons inforicons"></i>
                        {{translate('ereader.information')}}
        </li>
        <li  @click="toggleSideBar(true, 'topicBar')">

            <i class="ricons tableicons"></i>

              {{translate('ereader.tableOfContents')}}
          </button>
        </li>

        <li @click="toggleSideBar(true, 'annotationBar')">
           <i class="ricons annotationsicons"></i>
              {{translate('ereader.annotations')}}
        </li>
        <li v-if='notesPresent > 0'>
          <a :href="noteBaseURL">
           <i class="ricons addnoteIcons"></i>
              {{notesPresent}} {{translate('study.notes')}}
          </a>
        </li>
        <li id="contcontcunt" v-show="!content.completed" @click="markCompleted">
          <i class="material-icons done_icon">done</i>
          {{translate('study.complete')}}
        </li>
        <li v-show="content.completed">
          <i class="material-icons  done_icon">&#xE86C;</i>
          {{translate('study.completed')}}
        </li>

    </ul>
  </div>
</div>



  <div class="srchResultOvelay" v-bind:class="{ displayBlock: showOverLay }">
  </div>
    <div class="eReaderHolder">
      <div ref="area" id="area" @scroll="onReaderScroll" v-bind:class="{ loading: loading }"></div>
      <a id="prev" @click.prevent="prevPage" class="arrow">‹</a>
      <a id="next" @click.prevent="nextPage" class="arrow">›</a>
    </div>
  </div>
</div>
</div>
</template>

<script>
import config from "../config";
import axiosService from "../config/caller";
import apiUrls from "../config/apiUrls";
import axios from "~/plugins/axios";
import _array from "lodash/array";
import { fromRange } from "xpath-range";
import { lrsPost } from "../utils/lrs";
import locales from '../locales'

export default {


  asyncData(context) {


    const contentId = context.req.headers["contentid"];
    const authToken = context.req.headers["authorization"];
    const platform = context.req.headers["platform"];
    const locale = context.req.headers["accept-language"];

    const headers = {
      Authorization: authToken,
      platform: platform,
      "Accept-Language": locale
    };
    return axios
      .get(apiUrls.getContent(contentId), {
        headers: {
          Authorization: authToken,
          platform: platform,
          "Accept-Language": locale
        }
      })
      .then(response => {
        return {
          locales: locales,
          epubCompletionReached: false,
          locale: locale,
          route: null,
          contentLiked: response.data.content[0].liked,
          searchedAlready: false,
          searchBar: false,
          epubSrc: "",
          title: "",
          book: null,
          body: response.data.content[0].body[0],
          content: response.data.content[0],
          pages: [],
          buttonStates: {
            annotationBar: false,
            infoBar: false,
            topicBar: false,
            annotationBar: false,
            searchBar: false
          },
          menusOpen: false,
          currentPage: "",
          totalPages: "",
          isFullscreenActive: true,
          isBookmarkPopoverInactive: true,
          isAnnotationPopoverInactive: true,
          filteredAnnotations: [],
          rendition: null,
          loading: false,
          contentId: contentId,
          annotationsFiltered: [],
          filter: {
            searchAt: "book",
            type: "all",
            color: ["blue"],
            needColor: false
          },
          fontSize: 100,
          annotations: [],
          iframeRef: null,
          sidebar: {
            searchResults: [],
            searchText: "",
            type: "",
            toc: [],
            metadata: {},
            cover: null
          },
          authToken: authToken,
          showOverLay: false,
          currentSearch: [],
          page: 2,
          currentTime: 0,
          hitTimeSeconds: 10000,
          ebookAvgTime: 0,
          redirectedOnce: false,
          expiringTime: null,
          platform: platform,
          startPage: 0,
          noteBaseURL: axios.defaults.baseURL + 'notes',
          completeBaseURL: axios.defaults.baseURL + 'complete'
        };
      })
      .catch(e => {
        console.log(e);
        context.error({ statusCode: 404, message: "EPUB NOT FOUND" });
      });
  },
  layout: "mobilereader",
  head: {
    meta: [
      { charset: "utf-8" },
      {
        "http-equiv": "X-UA-Compatible",
        content: "width=device-width, initial-scale=1"
      },
      { name: "viewport", content: "width=device-width" },
      { name: "apple-mobile-web-app-capable", content: "yes" }
    ]
  },
  computed: {
    notesPresent() {
      let c = this.$store.state.note.fetchednotes.filter(
        res => res.contentId == this.content.contentId
      );
      return c.length;
    }
  },
  mounted() {
   // this.content.completed = false
    //Set mobreader flag on window
    window.mobreader = true;
    this.fontSize = this.$store.state.initialData.readerPreference.fontSize;
    // Fetch notes
    this.$store.dispatch("note/fetchSavedList", {
      authToken: this.authToken,
      langCode: this.locale,
      platform: this.platform
    });

    //Handle expiration
    this.$store.state.applicationProperties.forEach((item, index) => {
      if (item.name == "EBOOK_DOWNLOAD_EXPIRY_DURATION") {
        this.expiringTime = item.value;
      }

      if (item.name == "EBOOK_HITTIME_SECONDS") {
        this.hitTimeSeconds = parseInt(item.value);
      }
    });

    if (this.content.currentTime)
      this.currentTime = parseInt(this.content.currentTime);

    if (this.content.averageTimeSpentOnEbook) {
      let colonArray = parseInt(this.content.averageTimeSpentOnEbook);

      this.ebookAvgTime = colonArray * 60;
      this.ebookAvgTime *= 1000;

      if (this.$store.state.initialData.roles[0] == "TEACHER")
        this.ebookAvgTime = this.ebookAvgTime / 2;
    }

    if (this.ebookAvgTime < this.currentTime) {
        this.epubCompletionReached = true;
    }

    this.epubSrc = this.body.value;
    this.title = this.body.title;

    this.book = window.ePub(null, { encoding: "binary" });
    this.rendition = this.book.renderTo("area", {
      ignoreClass: "annotator-hl"
    });
    this.$vlf
      .getItem(this.contentId)
      .then(resCache => {
        if (resCache == null) {
          return axiosService.get(
            this.epubSrc,
            false,
            this.locale,
            "*/*",
            true
          );
        } else {
          return new Promise(resolve =>
            resolve({ status: 201, data: resCache })
          );
        }
      })
      .then(resApi => {
        this.book.open(resApi.data, "binary");

        if (this.content.downloaded && !this.isEbookExpired()) {
          if (resApi.status.toString() != "201")
            return this.$vlf.setItem(this.contentId, resApi.data);
        }

        if (this.content.downloaded && this.isEbookExpired()) {
          let contentType = this.locale;
          let authToken = this.authToken;
          this.$store.dispatch("content/purgeDownload", {
            contentType,
            authToken,
            contentId: this.content.contentId,
            platform: this.platform
          });

          this.$root.$emit("purgeDownload");

          if (resApi.status.toString() == "201")
            return this.$vlf.removeItem(this.contentId);
        }

        if (!this.content.downloaded) {
          if (resApi.status.toString() == "201")
            return this.$vlf.removeItem(this.contentId);
        }

        return new Promise(resolve => resolve(true));
      })
      .then(isOpen => {
        // TODO Handle when cache or api fails
      });

    this.loading = true;
    this.rendition.display(this.content.currentState).then(() => {
      //this.loading = false;
      setTimeout(() => {
        // Get the current CFI
        var currentLocation = this.rendition.currentLocation();
        // Get the Percentage (or location) from that CFI
        this.currentPage =
          currentLocation.start.displayed.page

        this.iframeRef.startPage = currentLocation.start.displayed.page;
        this.iframeRef.nextPrev = "";

        this.totalPages = currentLocation.start.displayed.total;
        //console.log('cccccccccccccccccccc', currentPage)
      }, 2000);
    });
    this.rendition.hooks.render.register(view => {
      var adder = [
        [".annotator-adder, .annotator-outer", ["position", "fixed"]]
      ];
      view.window.token = this.authToken;
      view.window.contentId = this.contentId;
      view.window.LMS_HOST = axios.defaults.baseURL;
      view.window.rendition = this.rendition;
      view.window.platform = this.platform;
      view.window.translationsReader = {
  'highlight': this.translate('ereader.highlight'),
  'comment': this.translate('ereader.comment'),
  'save': this.translate('common.save'),
  'remove': this.translate('note.remove'),
  'addNote': this.translate('study.add_note'),
  'clear': this.translate('ereader.clear')
}
      view.contents
        .addScript(
          "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-beta1/jquery.min.js"
        )
        .then(() => view.contents.addScript("/js/annotator.js"))
        .then(() => view.contents.addScript("/js/annotator-init.js"))
        .then(() => view.contents.addStylesheet("/css/annotator2.css"))
        .then(() => view.contents.addStylesheetRules(adder));
      this.iframeRef = view.window;

      // this.iframeRef

      // this.iframeRef.

      this.iframeRef.document.querySelectorAll("video").forEach((el, index) => {
        el.style.width = "240px";
        el.style.height = "200px";
      });
      view.window.oncontextmenu = e => {
        e.preventDefault();

        var clickEvent = new MouseEvent("mouseup", e);

        setTimeout(
          () => this.iframeRef.document.body.dispatchEvent(clickEvent),
          1000
        );

        return false;
      };

      window.iframeRefReal = this.iframeRef;
    });
    this.book.ready.then(() => {
      let contentId = this.content.contentId;
      let verb = "initialised";
      let object = "epub";

      let contentType = this.locale;
      let authToken = this.authToken;
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
          if (response.data.points && response.data.coins) {
            let points = response.data.points;
            let coins = response.data.coins;
            this.$store.dispatch("updateCoinsPoints", { points, coins });
          }
        }
      });

        this.loading = false;
    });
    this.book.loaded.navigation.then(tocArray => {
      let toc = [];
      function buildToc(level, array, elements) {
        if (elements && elements.length) {
          level++;
          for (var i = 0; i < elements.length; i++) {
            const element = elements[i];
            array.push({
              level: level,
              label: element.label,
              href: element.href
            });

            if (element && element.subitems) {
              buildToc(level, array, element.subitems);
            }
          }
        }
      }
      buildToc(-1, toc, tocArray.toc);
      this.sidebar.toc = toc;
    });
    this.book.loaded.metadata.then(metadata => {
      this.sidebar.metadata = metadata;
    });
    this.book.loaded.cover
      .then(blobUrl => this.book.archive.createUrl(this.book.cover))
      .then(blobUrl => {
        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = () => {
          var recoveredBlob = xhr.response;
          var reader = new FileReader();
          reader.onload = () => {
            this.sidebar.cover = reader.result;
          };
          reader.readAsDataURL(recoveredBlob);
        };
        xhr.open("GET", blobUrl);
        xhr.send();
      });

    window.document.getElementById("area").addEventListener(
      "hideFocus",
      event => {
        if (event.target.id.toLowerCase() === "area") {
          this.toggleSideBar(false, undefined, "hideFocus");
        }
      },
      true
    );

    window.document
      .getElementById("area")
      .addEventListener("annotationsLoaded", event => {
        console.log("inside component load event");
        clearInterval(this.refreshIntervalId);
        if (event.target.id.toLowerCase() === "area") {
          console.log("inside component load area tag");
          this.annotations = [].concat(event.detail.annotations);
        }


        let contentId = this.content.contentId;
        let verb = "reading";
        let object = this.content.type;
        let contentType = this.locale;
        let authToken = this.authToken;

        if (this.refreshIntervalId == null) {
          this.refreshIntervalId = setInterval(() => {
            if (!this.content.completed) {
              this.currentTime += parseInt(this.hitTimeSeconds);

              if (this.ebookAvgTime < this.currentTime) {
                this.epubCompletionReached = true;
              }
            }

            let currentLocation = this.rendition.currentLocation();

            let objectDetails = {
              id: contentId,
              currentTime: this.currentTime.toString()
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
              if (
                response &&
                response.data &&
                response.data.httpStatus == 200
              ) {
                if (response.data.points && response.data.coins) {
                  let points = response.data.points;
                  let coins = response.data.coins;
                  this.$store.dispatch("updateCoinsPoints", { points, coins });
                }
              }
            });
          }, this.hitTimeSeconds);
        }

        this.filterAnnotations(this.filter.type);
      });

    window.document
      .getElementById("area")
      .addEventListener("annotationCreated", e => {
        this.annotations.push(Object.assign({}, e.detail.annotation));
        this.filterAnnotations(this.filter.type);
      });
    window.document
      .getElementById("area")
      .addEventListener("annotationDeleted", e => {
        var index = _array.findIndex(this.annotations, {
          id: e.detail.annotation.id
        });
        this.annotations.splice(index, 1);
        this.filterAnnotations(this.filter.type);
      });
    window.document
      .getElementById("area")
      .addEventListener("annotationUpdated", e => {
        var index = _array.findIndex(this.annotations, {
          id: e.detail.annotation.id
        });
        this.annotations[index] = e.detail.annotation;
        this.filterAnnotations(this.filter.type);
      });

    window.showNoteHighBox = e => {
      var clickEvent = new MouseEvent("mousedown", e);

      this.iframeRef.document.body.dispatchEvent(clickEvent);

      setTimeout(() => {
        var clickEvent = new MouseEvent("mouseup", e);

        this.iframeRef.document.body.dispatchEvent(clickEvent);
      }, 500);
    };

    window.showHighlightBox = e => {
      this.iframeRef.document.body.querySelector(".noteBox").click();
    };

    window.showHighlightBox = e => {
      this.iframeRef.document.body.querySelector(".noteBox").click();
    };

    window.showCommentBox = e => {
      console.log(
        "asssaasasasasass",
        this.iframeRef.document.body.querySelector(".addNoteBox")
      );
      this.iframeRef.document.body.querySelector(".addNoteBox").click();
    };

    window.selectColor = e => {
      //this.iframeRef.document.body.
    };
  },
  methods: {
    highlightKeyword(text, id) {
       let reText = text.replace(
        new RegExp(this.sidebar.searchText, "g"),
        '<span class="highlightKeyword">' + this.sidebar.searchText + "</span>"
      );
      
      setTimeout( () =>  document.getElementById('searchResult' + id).innerHTML = reText, 0);

    },
    translate(val){
        let vals = val.split('.')
        return this.locales[this.locale][vals[0]][vals[1]];
    },
    markCompleted(e) {
      this.content.completed = true
      window.location.href = this.completeBaseURL;
    },
    lrsCaptures(verb, otherDetails, activityDetails) {
      let transformObject = {};
      Object.keys(otherDetails).forEach((val, i) => {
        if (typeof otherDetails[val] === "object" && otherDetails[val]) {
          transformObject[val] = otherDetails[val];
        } else {
          if (otherDetails[val] != undefined)
            transformObject[val] = otherDetails[val].toString();
        }
      });

      let contentId = this.content.contentId;
      let object = "epub";

      let contentType = this.locale;
      let authToken = this.authToken;

      transformObject["id"] = contentId;

      let lrsObject = {
        verb,
        object,
        objectDetails: transformObject
      };

      if (activityDetails) lrsObject = { ...lrsObject, activityDetails };

      lrsPost(authToken, lrsObject, contentType, this.platform).then(
        response => {
          if (response && response.data && response.data.httpStatus == 200) {
            if (response.data.points && response.data.coins) {
            }
          }
        }
      );
    },
    filterAnnotations(value, isColor) {
      if (isColor) {
        let indexColor = this.filter.color.indexOf(value);
        if (indexColor == -1) this.filter.color.push(value);
        else this.filter.color.splice(indexColor, 1);
      } else this.filter.type = value;

      let currentLocation = this.rendition.currentLocation();
      if (!currentLocation || Object.keys(currentLocation).length == 0) return;

      let cfi = currentLocation.start.cfi;

      this.filteredAnnotations = this.annotations.filter((res, index) => {
        res["fetchOrder"] = index + 1;

        if (this.filter.searchAt != "book") if (res.cfi != cfi) return false;

        if (this.filter.type == "all") return true;
        else if (
          this.filter.type == "highlights" &&
          this.filter.color.indexOf("blue") != -1 &&
          res.options &&
          res.options.colorClass == "annotator-hl-blue"
        )
          return true;
        else if (
          this.filter.type == "highlights" &&
          this.filter.color.indexOf("orange") != -1 &&
          res.options &&
          res.options.colorClass == "annotator-hl-orange"
        )
          return true;
        else if (
          this.filter.type == "highlights" &&
          this.filter.color.indexOf("green") != -1 &&
          res.options &&
          res.options.colorClass == "annotator-hl-green"
        )
          return true;
        else if (this.filter.type == "comments" && !res.options) return true;
        else return false;
      });

      this.lrsCaptures(
        "filterannotations",
        { value, isColor },
        currentLocation
      );
    },
    prevPage(e) {
      this.rendition.prev();
      let contentId = this.content.contentId;
      let verb = "read";
      let object = this.content.type;
      let contentType = this.locale;
      let authToken = this.authToken;

      this.iframeRef.currentPage = --this.startPage;
      this.iframeRef.nextPrev = true;

      setTimeout(() => {
        let currentLocation = this.rendition.currentLocation();
        this.currentPage =
          currentLocation.start.displayed.page
        this.totalPages = currentLocation.start.displayed.total;
        let cfid = currentLocation.start.cfi;

        let objectDetails = {
          id: contentId,
          cfid
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
            if (response.data.points && response.data.coins) {
              let points = response.data.points;
              let coins = response.data.coins;
              this.$store.dispatch("updateCoinsPoints", { points, coins });
            }
          }
        });
      }, 1000);
    },
    nextPage(e) {
      this.rendition.next();

      let contentId = this.content.contentId;
      let verb = "read";
      let object = this.content.type;
      let contentType = this.locale;
      let authToken = this.authToken;

      this.iframeRef.currentPage = this.startPage++;
      this.iframeRef.nextPrev = true;

      setTimeout(() => {
        let currentLocation = this.rendition.currentLocation();
        let cfid = currentLocation.start.cfi;
        this.currentPage =
          currentLocation.start.displayed.page 
        this.totalPages = currentLocation.start.displayed.total;

        let objectDetails = {
          id: contentId,
          cfid
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
            if (response.data.points && response.data.coins) {
              let points = response.data.points;
              let coins = response.data.coins;
              this.$store.dispatch("updateCoinsPoints", { points, coins });
            }
          }
        });
      }, 1000);
    },
    onReaderScroll(e) {},
    goToBookmark(cfid, index) {
      this.rendition.display(cfid);

      if (index != undefined) {
        this.sidebar.searchResults.forEach((e, i) => {
          if (index != i) this.currentSearch[i] = false;
          else this.currentSearch[i] = true;
        });

        this.toggleSideBar(true, "searchBar");
      } else this.toggleSideBar(false);

      this.lrsCaptures("gotobookmark", { cfid, index });
    },
    toggleBookmarkDropdown() {
      this.isAnnotationPopoverInactive = true;
      this.isBookmarkPopoverInactive = !this.isBookmarkPopoverInactive;
    },
    toggleAnnotationDropdown() {
      this.isBookmarkPopoverInactive = true;
      this.isAnnotationPopoverInactive = !this.isAnnotationPopoverInactive;
    },
    beforeDestroy() {
      this.book.destroy();
    },
    incrFonSize() {
      this.fontSize += 10;
      this.rendition.themes.fontSize(this.fontSize.toString() + "%");
    },
    decrFontSize() {
      this.fontSize -= 10;
      this.rendition.themes.fontSize(this.fontSize.toString() + "%");
    },
    isEbookExpired() {
      var timeDiff = Math.abs(
        new Date() - new Date(this.content.downloadedTime)
      );
      return (
        parseInt(Math.ceil(timeDiff / (1000 * 3600 * 24))) >
        parseInt(this.expiringTime)
      );
    },
    onSearch(e) {
      this.reinitSearchData();
      if (this.sidebar.searchText && this.sidebar.searchText.length < 3) {
        return;
      }

      let q = this.sidebar.searchText;
      q = q.replace(/^\s+|\s+$/g, "");

      let sectionLoadedPromises = [];
      let sections = [];
      for (var i = 0; i < this.book.spine.length; i++) {
        var section = this.book.spine.get(i);
        var _request = this.book.load.bind(this.book);
        sectionLoadedPromises.push(section.load(_request));
        sections.push(section);
      }

      Promise.all(sectionLoadedPromises).then(() => {
        let results = [];
        for (var i = 0; i < sections.length; i++) {
          const section = sections[i];
          results = results.concat(section.find(q));
        }

        results = results.filter((result, index, self) => 
          index == results.findIndex(t => (
            t.excerpt == result.excerpt
          ))
        )

        this.sidebar.searchResults = results;

        this.currentSearch = new Array();

        for (i = 0; i < results.length; i++) {
          this.currentSearch.push(false);
        }

        this.searchedAlready = true;

        const searchedResultAnnotations = results.map((result, index) => {
          const range = result.range;
          range.start = range.start
            .split("/")
            .slice(0, -1)
            .join("/");
          range.end = range.end
            .split("/")
            .slice(0, -1)
            .join("/");

          return {
            id: index,
            quote: result.query,
            ranges: [range],
            text: ""
          };
        });
        // if no results then show no results found, return
        const customEvent = new CustomEvent("searchedResultsLoaded", {
          detail: { searchedResultAnnotations }
        });
        this.iframeRef.document.body.dispatchEvent(customEvent);
      });

      this.lrsCaptures("textsearched", { searchText: this.sidebar.searchText });
    },
    reinitSearchData(val) {
      if (val) this.sidebar.searchText = "";
      this.iframeRef.document.body.dispatchEvent(
        new CustomEvent("searchedResultsRemoved")
      );
      this.sidebar.searchResults = [];
      this.searchedAlready = false;
    },
    toggleSideBar(value, type, from) {
      //  if (type != "searchBar") {
      this.sidebar.searchText = "";
      // }
      this.reinitSearchData();

      if (value == false) {
        for (var prop in this.buttonStates) {
          this.buttonStates[prop] = false;
        }
        this.showOverLay = false;

        if (type) {
          this.menusOpen = !this.menusOpen;
          // this.showOverLay = !this.showOverLay;
        } else {
          if (this.menusOpen) {
            this.menusOpen = false;
          }
        }
      } else {
        for (var prop in this.buttonStates) {
          if (prop == type) {
            this.buttonStates[prop] = !this.buttonStates[prop];
            if (this.buttonStates[prop]) this.showOverLay = true;
            else this.showOverLay = false;
          } else this.buttonStates[prop] = false;
        }

        this.menusOpen = false;
      }

      if (from != "hideFocus")
        this.lrsCaptures("togglesidebar", {
          searchText: this.sidebar.searchText,
          value,
          type
        });
    }
  },
  destroyed() {
    this.$store.dispatch("content/makeContentFullscreen");
  }
};
</script>


<style>
.highlightKeyword{
  color: #39c1c7
}

#prev {
  left: -12px !important; 
}

#next {
  right: 10px !important;
  text-align: right;
}

.arrow {
  position: absolute;
  top: 50%;
  margin-top: -32px;
  font-size: 64px;
  color: #e2e2e2;
  font-family: arial, sans-serif;
  font-weight: bold;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  width: 20px;
  z-index: 9999;
  padding: 0 10px;
}

.arrow:hover {
  color: #777;
}

.arrow:active {
  color: #000;
}

.eReaderOptions .listing {
  max-height: 150px;
}

.displayNone {
  display: none;
}
.eReaderOptionSec .dropdown .material-icons {
  vertical-align: middle;
}
.addBox .input-group-addon {
  background: none;
  padding: 2px 8px;
  border: 0;
  color: white;
  cursor: pointer;
}
.eReaderHolder {
  height: calc(100vh - 60px);
}

.epub-container {
  word-spacing: 0px;
  line-height: 0;
  vertical-align: top;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  overflow: hidden;
  direction: ltr;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
.eReaderHolder .loading {
  background: url(~/assets/images/ajax-loader.gif) center center no-repeat;
}

.searchResultBox {
  position: absolute;
  width: 360px;
  top: 61px;
  background: white;
  height: calc(100% - 61px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 99999;
  display: block;
  font-size: 14px;
  color: #424956;
}
.searchResultBoxInner {
  height: calc(100% - 82px);
  overflow: auto;
}

.searchResultBoxInner li {
  border-bottom: 1px solid #d9d9d9;
  padding: 15px 20px 15px 50px;
  cursor: pointer;
}

.tocsearchResultBoxItem .searchResultBoxInner li {
  text-transform: uppercase;
}
.tocsearchResultBoxItem .searchResultBoxInner li.sub {
  font-size: 12px;
  text-transform: none;
}

.searchResultBoxInner li:hover {
  background: #f1f1f1;
}
.searchResultBoxInner h4 {
  font-size: 16px;
  font-weight: 400;
}
.searchResultBoxInner li label {
  font-size: 12px;
  padding: 0;
  margin: 0;
  font-weight: normal;
}
.searchResultBoxInner .noResults {
  font-size: 17px;
  text-align: center;
  padding: 20px 0;
  opacity: 0.2;
}
.searchResultBox .readerSearch .form-control {
  border-bottom-color: #ccc;
  color: #333 !important;
}
.searchResultBox .readerSearch .srchIcon {
  color: #ccc;
}
.searchResultBox .readerSearch {
  padding: 0;
  margin: 0;
}
.searchResultBox .heading {
  padding: 20px 20px 20px 50px;
  font-weight: 500;
  font-size: 21px;
  font-weight: 300;
  color: #424956;
}
.searchResultBox .close {
  background: #8e8989;
  opacity: 1;
  width: 30px;
  height: 30px;
  border-radius: 3px;
  line-height: 30px;
  text-align: center;
  font-size: 16px;
  color: #fff;
}
.searchResultBox .hide {
  display: none;
}

.srchResultOvelay {
  z-index: 99999;
}

.displayBlock {
  display: block;
}

.searchResultBoxItem {
  height: 100%;
}
.activeSearch {
  background-position: -180px -52px !important;
}
.eReaderHolder {
  min-height: 500px;
}
.eReaderHolder .epub-container,
.eReaderHolder .epub-view,
.eReaderHolder iframe {
  height: 100%;
} /*
.leftbtns  .btn.active{ background:background: rgb(34,194,198);
      background: -moz-linear-gradient(top, rgba(34,194,198,1) 0%, rgba(27,155,158,1) 100%);
      background: -webkit-linear-gradient(top, rgba(34,194,198,1) 0%,rgba(27,155,158,1) 100%);
      background: linear-gradient(to bottom, rgba(34,194,198,1) 0%,rgba(27,155,158,1) 100%);
}*/
#prev {
  left: 0;
}
.eReaderHolder {
  padding: 10px;
}
.eReaderOptionSec .leftbtns {
  margin: 0;
  padding: 0;
}
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
  padding: 0;
}

.eReaderOptionSec .srchSecAll .srchResult .srchResultList {
  height: calc(100vh - 80px);
}

.searchResultBox {
  width: 100%;

  background: #fff;

  -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 99999999999;
  display: block;
  font-size: 14px;
  color: #424956;
}
.eReaderOptionSec .pull-right {
  display: none;
}
.eReaderOptionSec .srchSec {
  position: absolute;
  right: 60px;
  width: calc(100vw - 113px);
  top: 14px;
}
.eReaderOptionSec .srchSecAll .srchResult {
  width: 300px;
  right: 60px;
}

.menusEreaderOuter {
  position: absolute;
  top: 60px;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  padding: 0;
  z-index: 99999;
  height: calc(100vh - 60px);
}
.menusEreader {
  width: 100%;
  background: #1f2533;
  padding: 10px 0;
  height: calc(100vh - 60px);
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
  top: 17px;
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

.count.colorName.annotator-hl-blue {
  background: #8ef4eb;
}
.count.colorName.annotator-hl-orange {
  background: #ffb2ad;
}
.count.colorName.annotator-hl-green {
  background: #beff93;
}
.count.colorName.annotator-hl-yellow {
  background: #ffcc4b;
}

.searchResultBoxInner li .count,
.rfilters .colorBox.yellow {
  background: #ffcc4b;
}

.bookContentCover .searchResultBoxInner {
  position: relative;
  height: calc(100%);
}
.annotationSearchResultBox.highlighttabopen .searchResultBoxInner {
  height: calc(100% - 190px);
}

</style>

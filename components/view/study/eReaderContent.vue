<template>
<div class="eReaderSec" style="height: 500px">
    <iframe :src="getEReaderUrl()" style="width: 100%; height: 100%"/>

</div>
</template>

<script>
  /*
  <ratingPopup :content="content" :ratingsPopup="ratingsPopup"> </ratingPopup>


<div class="searchResultBox annotationSearchResultBox" v-bind:class="{ hide: !buttonStates.annotationBar, highlighttabopen: isHighlightActive }" >


    <div  class="searchResultBoxItem">
      <div class="heading">
        <div class="pclose" @click="toggleSideBar(false)"><span><i class="material-icons">&#xE5CD;</i></span></div>  {{$t('ereader.annotations')}}
      </div>

      <div class="rfiltersOuter">
      <div class="rfilters">
        <div class="radioCustom">
         <label> <input type="radio" v-model="filter.searchAt" value="book" @click="filterAnnotations(filter.type)" > <span></span> {{$t('ereader.entireBook')}}</label>
        </div>
        <div class="radioCustom">
         <label> <input type="radio" v-model="filter.searchAt" value="page" @click="filterAnnotations(filter.type)"> <span></span> {{$t('ereader.thisPage')}}</label>
        </div>

      </div>
      <div class="rfilters">
        <a href="javascript:void(0);" class="btn btn-borderd" v-bind:class="{ active: filter.type == 'all' }" @click="filterAnnotations('all')">{{$t('ereader.all')}}</a>
        <a href="javascript:void(0);" class="btn btn-borderd" v-bind:class="{ active: filter.type == 'highlights' }" @click="filterAnnotations('highlights')" >{{$t('ereader.highlights')}}</a>
        <a href="javascript:void(0);" class="btn btn-borderd" v-bind:class="{ active: filter.type == 'comments' }" @click="filterAnnotations('comments')">{{$t('ereader.comments')}}</a>
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
          <li v-for="(ann, index) in filteredAnnotations" @click="goToBookmark(ann['cfi'], undefined, 'annotationBar')">
            <template v-if="ann.options == undefined">
              <h4><span class="count colorName annotator-hl-yellow" >{{ann['fetchOrder']}}</span>{{ann.quote && ann.quote.substring ? ann.quote.substring(0, 15) : ''}}</h4>
              <p>{{ann.text}}</p>
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
    <!-- <div v-if="buttonStates.searchBar" class="searchResultBoxItem">
      <div class="heading">

        <div class="pclose" @click="toggleSideBar(false)"><span><i class="material-icons">&#xE5CD;</i></span></div>  Search
      </div>
      <div class="readerSearch">
        <i class="material-icons srchIcon">search</i>
        <input type="text" class="form-control srch_feild" v-model="sidebar.searchText" v-on:change="onSearch">
      </div>
      <div class="searchResultBoxInner">
        <ul v-if="sidebar.searchResults.length > 0">
          <li v-for="result in sidebar.searchResults" @click="goToBookmark(result.cfi)">{{result.excerpt}}</li>
        </ul>
        <div class="noResults" v-else="sidebar.searchResults.length <= 0">
          No results to display
        </div>
      </div>
    </div> -->

    <div v-if="buttonStates.topicBar" class="searchResultBoxItem tocsearchResultBoxItem">
      <div class="heading">

        <div class="pclose" @click="toggleSideBar(false)"><span><i class="material-icons">&#xE5CD;</i></span></div> {{$t('ereader.tableOfContent')}}
      </div>

      <div class="searchResultBoxInner">
        <ul v-if="sidebar.toc.length > 0">
          <!-- <li v-for="item in sidebar.toc" v-bind:style="{ 'margin-left': item.level * 20 + 'px' }"
            @click="goToBookmark(item.href)">{{item.label}}</li> -->
            <li v-for="item in sidebar.toc" v-bind:class="{ 'sub': item.level }" @click="goToBookmark(item.href, undefined, 'topicBar')">{{item.label}}</li>
        </ul>
      </div>
    </div>

    <div v-else-if="buttonStates.infoBar" class="searchResultBoxItem bookContentCover">

      <div class="searchResultBoxInner">

        <div class="heading">

        <div class="pclose" @click="toggleSideBar(false)"><span><i class="material-icons">&#xE5CD;</i></span></div> {{$t('ereader.information')}}
      </div>
        <div class="coverImg">
          <div class="img" v-bind:style="{ backgroundImage: 'url(' + sidebar.cover + ')' }"></div>
          <img v-bind:src="sidebar.cover" alt="$t('ereader.cover')" width="100%"/></div>
        <ul>
          <li><h4>{{title}}</h4></li>
          <li><label>{{$t('ereader.title')}}</label>
              <div>{{sidebar.metadata.title}}</div></li>
              <li><label>{{$t('ereader.creator')}}</label>
              <div>{{sidebar.metadata.creator}}</div></li>
        </ul>
        <!-- <table class="table table-bordered">
          <tbody>
            <tr>
              <td>Title</td>
              <td>{{sidebar.metadata.title}}</td>
            </tr>
            <tr>
              <td>Creator</td>
              <td>{{sidebar.metadata.creator}}</td>
            </tr>
        </tbody>
        </table> -->
      </div>
    </div>

  </div>

  <div class="eReaderSecInner clearfix">
    <div class="eReaderOptionSec">

<div class="leftbtns pull-left">

          <button class="btn btn-link"  v-bind:class="{ active: buttonStates.infoBar }" @click="toggleSideBar(true, 'infoBar')">
            <!-- <i class="material-icons">info_outline</i> -->
            <i class="ricons inforicons"></i>
            <div class="tooltip bottom" role="tooltip"> <div class="tooltip-arrow"></div> <div class="tooltip-inner">{{$t('ereader.bookInfo')}}</div> </div>
          </button>
          <button class="btn btn-link"  v-bind:class="{ active: buttonStates.topicBar }" @click="toggleSideBar(true, 'topicBar')">
            <i class="ricons tableicons"></i>

            <!-- <i class="material-icons">description</i> -->
            <div class="tooltip bottom" role="tooltip"> <div class="tooltip-arrow"></div> <div class="tooltip-inner">{{$t('ereader.tableOfContents')}}</div> </div>
          </button>
          <button class="btn btn-link btnBookmark" v-bind:class="{ active: buttonStates.annotationBar }" @click="toggleSideBar(true, 'annotationBar')">
             <!-- <i class="material-icons ico"></i>
             <span class="caret"></span> -->
             <i class="ricons annotationsicons"></i>
             <div class="tooltip bottom" role="tooltip"> <div class="tooltip-arrow"></div> <div class="tooltip-inner">{{$t('ereader.annotations')}}</div> </div>
           </button>
          <div class="srchSecAll" v-if="!isIE11" >
            <button class="btn btn-link"   @click="toggleSideBar(true, 'searchBar')">
              <!-- <i class="material-icons srchIcon">search</i> -->
              <i class="ricons searchricons"   v-bind:class="{ activeSearch: buttonStates.searchBar }"></i>
              <div class="tooltip bottom" role="tooltip"> <div class="tooltip-arrow"></div> <div class="tooltip-inner">{{$t('ereader.search')}}</div> </div>
            </button>
            <div class="srchSec">
               <span v-if="sidebar.searchText != ''" class="closeSrch"><button class="btn btn-link letterLink" @click="reinitSearchData(); sidebar.searchText = ''"><i class="material-icons" >clear</i></button></span>
               <input  v-if="buttonStates.searchBar" type="text" class="formControl" placeholder="" v-model="sidebar.searchText" v-on:change="onSearch" @keyup.enter="onSearch" >
            </div>
            <div class="srchResult" v-bind:class="{ displayNone: !(sidebar.searchResults.length > 0 || searchedAlready) }">
               <ul class="srchResultList" v-if="sidebar.searchResults.length > 0">
                  <li v-for="(result, index) in sidebar.searchResults" @click="goToBookmark(result.cfi, index,  'searchBar')" :id='"searchResult" + index' >
                    {{highlightKeyword(result.excerpt, index)}}
                  </li>
                  <!-- <li v-for="(result, index) in sidebar.searchResults" @click="goToBookmark(result.cfi, index, 'searchBar')">{{result.excerpt}}</li> -->
               </ul>
                <div class="noResults" v-else-if="searchedAlready">
                    {{$t('ereader.noResults')}}
                </div>
            </div>
           </div>
    </div>



    <div class="pageBtns">
      <span class="ricons onepageico" v-bind:class="{active: page == 1}" @click="togglePage($refs.ereaderContainer.clientWidth + 400 - 140, 1)">
        <div class="tooltip bottom" role="tooltip"> <div class="tooltip-arrow"></div> <div class="tooltip-inner">{{$t('ereader.singlePageView')}}</div> </div>
      </span>
      <span class="ricons twopageico" v-bind:class="{active: page == 2}" @click="togglePage($refs.ereaderContainer.clientWidth - 140, 2)">
        <div class="tooltip bottom" role="tooltip"> <div class="tooltip-arrow"></div> <div class="tooltip-inner"> {{$t('ereader.doublePageView')}}</div> </div>
      </span>
    </div>



      <div class="pull-right">
        <div class="dropdown letterOuter">


           <button class="btn btn-link letterLink" @click="decrFontSize"><div class="tooltip bottom" role="tooltip"> <div class="tooltip-arrow"></div> <div class="tooltip-inner">{{$t('ereader.zoomOut')}}</div> </div><i class="material-icons">&#xE15B;</i></button>
           <span class="letterLinkA">{{$t('ereader.letterLink')}}</span>
           <button class="btn btn-link letterLink" @click="incrFonSize"><div class="tooltip bottom" role="tooltip"> <div class="tooltip-arrow"></div> <div class="tooltip-inner">{{$t('ereader.zoomIn')}}</div> </div><i class="material-icons">&#xE145;</i></button>


        </div>
        <!-- <div class="dropdown">
          <button class="btn btn-link" @click="toggleAnnotationDropdown">
            <i class="material-icons">star_border</i>
            <span class="caret"></span>
          </button>

          <ul class="listing" v-bind:class="{ displayNone: isAnnotationPopoverInactive }">
            <li class="head">Annotations </li>
            <li v-for="(annotation, index) in annotations">
              <span class="lNum">{{index + 1}}</span>
              <span>{{annotation.text}}</span>
            </li>
          </ul>
        </div> -->
        <button class="btn btn-link closeBtn2" @click="$router.back(); lrsCaptures('closeepub', {})">        <div class="tooltip bottom" role="tooltip"> <div class="tooltip-arrow"></div> <div class="tooltip-inner">{{$t('settings.close')}}</div> </div><i class="material-icons">&#xE5CD;</i></button>

      </div>
    </div>
<div class="srchResultOvelay" v-bind:class="{ displayBlock: showOverLay }" @click="toggleSideBar(true, 'searchBar')">
</div>
    <div class="eReaderHolder" ref='ereaderContainer'>
      <div ref="area" id="area" @scroll="onReaderScroll" v-bind:class="{ loading: loading }"></div>
      <a id="prev" @click.prevent="prevPage" class="arrow">‹</a>
      <a id="next" @click.prevent="nextPage" class="arrow">›</a>
    </div>
  </div>*/
import config from "../../../config";
import dotenv from "~/plugins/dotenv";
import axios from "~/plugins/axios";
import _array from "lodash/array";
import { fromRange } from "xpath-range";
import { lrsPost } from "../../../utils/lrs";
import axiosService from "../../../config/caller";
import ratingPopup from "./ratingPopup";
import locales from '../../../locales'

export default {
  components: {
    ratingPopup
  },
  data(context) {
    return {
      locales: locales,
      searchedAlready: false,
      epubSrc: "",
      title: "",
      searchBar: false,
      book: null,
      body: null,
      pages: [],
      isFullscreenActive: true,
      buttonStates: {
        infoBar: false,
        topicBar: false,
        annotationBar: false,
        searchBar: false
      },
      bookmarkFormData: {
        title: ""
      },
      filteredAnnotations: [],
      rendition: null,
      loading: true,
      contentId: this.content.contentId,
      fontSize: 100,
      annotations: [],
      annotationsFiltered: [],
      filter: {
        searchAt: "book",
        type: "all",
        color: ["blue"],
        needColor: false
      },
      iframeRef: null,
      sidebar: {
        searchResults: [],
        searchText: "",
        type: "",
        toc: [],
        metadata: {},
        cover: null
      },
      showOverLay: false,
      currentSearch: [],
      refreshIntervalId: null,
      page: 2,
      currentTime: 0,
      hitTimeSeconds: 10000,
      ebookAvgTime: 0,
      redirectedOnce: false,
      expiringTime: null,
      locale: "en",
      isIE11: true,
      pageHrefMapArr: []
    };
  },
  props: ["content", "ratingsPopup", "fullscreen"],
  mounted() {
    //this.READER_HOST = dotenv.READER_HOST;
    this.isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
    this.locale = this.$store.state.locale.selectedLocale;
    window.onkeydown = e => {
      var code = e.keyCode ? e.keyCode : e.which;
      if (code === 37) {
        //left key
        this.prevPage();
      } else if (code === 39) {
        //right key
        this.nextPage();
      }
    };

    this.fontSize = this.$store.state.initialData.readerPreference.fontSize;
    console.log(this.fontSize)
    this.page = this.$store.state.initialData.readerPreference.pageType;

    //Handle repaint on fullscreen toggle
    this.$root.$on("handleFullscreen", () => {
      setTimeout(() => {


        if (this.$refs.ereaderContainer == undefined) return;
        if (this.$refs.ereaderContainer.clientWidth == undefined) return;



        let width = 0;
        width = this.$refs.ereaderContainer.clientWidth - 160;

        if (this.page == 1) width += 400;

        if (this.rendition) this.rendition.spread("auto", width);

        setTimeout(() => {
          if (this.rendition) this.rendition.flow("auto");

          setTimeout(() => {
          this.goToBookmark(this.content.currentState);
          setTimeout(() => {

                  let currentLocation = this.rendition.currentLocation();

                if(currentLocation == undefined || currentLocation.start == undefined) return;

        let currentPage =
          currentLocation.start.displayed.page +
          "-" +
          currentLocation.end.displayed.page;
        let totalPages = currentLocation.start.displayed.total;

        let cfid = currentLocation.start.cfi;

        this.iframeRef.massiveContents.resizeListeners();

        let pageName = '';
        this.pageHrefMapArr.forEach((value, index)=>{
          if(value.href == currentLocation.start.href)
            pageName = value.label;
        });

        this.$root.$emit("pageMetadata", { currentPage, totalPages, cfid, pageName });
          }, 500);
          }, 500);

        }, 500);
      }, 500);
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
      setTimeout(() => {
        this.$root.$emit("epubCompletionReached");
      }, 1000);
    }

    // Fetch bookmarks
    this.$store.dispatch("bookmark/getBookmarks", {
      contentId: this.contentId,
      lang: "en",
      authToken: this.$store.state.auth.user.token
    });

    // Load ebooks
    const body = this.content.body[0];
    this.epubSrc = body.value;
    this.title = body.title;
    this.body = body;
    this.book = window.ePub(null, { encoding: "binary", spreads: false });
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
        this.book.open(resApi.data, "binary").then(res => {

        }).catch(err => {
        });

        if (this.content.downloaded && !this.isEbookExpired()) {
          if (resApi.status.toString() != "201")
            return this.$vlf.setItem(this.contentId, resApi.data);
        }

        if (this.content.downloaded && this.isEbookExpired()) {
          let contentType = this.locale;
          let authToken = this.$store.state.auth.user.token;
          this.$store.dispatch("content/purgeDownload", {
            contentType,
            authToken,
            contentId: this.content.contentId
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

    this.rendition.display(this.content.currentState).then(() => {
      setTimeout(() => {
        // Get the current CFI
        var currentLocation = this.rendition.currentLocation();
        console.log(currentLocation.start.cfi)
                        if(currentLocation == undefined || currentLocation.start == undefined) return;
        // Get the Percentage (or location) from that CFI
        let currentPage =
          currentLocation.start.displayed.page +
          "-" +
          currentLocation.end.displayed.page;
        let totalPages = currentLocation.start.displayed.total;
        let cfid = currentLocation.start.cfi;
        let pageName = '';
        this.pageHrefMapArr.forEach((value, index)=>{
          if(value.href == currentLocation.start.href)
            pageName = value.label;
        });
        this.$root.$emit("pageMetadata", { currentPage, totalPages,cfid, pageName });
      }, 2000);
      //this.loading = false;
    });
    this.rendition.hooks.render.register(view => {
      var adder = [
        [".annotator-adder, .annotator-outer", ["position", "fixed"]]
      ];
      view.window.locale = this.locale;
      view.window.token = this.$store.state.auth.user.token;
      view.window.contentId = this.contentId;
      //console.log('axios.baseURL >> ' + config.baseUrl);

      view.window.LMS_HOST = axios.defaults.baseURL;
      view.window.rendition = this.rendition;
      view.window.platform = "web";

view.window.translationsReader = {
  'highlight': this.translate('ereader.highlight'),
  'comment': this.translate('ereader.comment'),
  'save': this.translate('common.save'),
  'remove': this.translate('note.remove'),
  'addNote': this.translate('study.add_note'),
  'clear': this.translate('ereader.clear')
}

        view.contents.addScript(
          "/js/jquery-3.3.1.min.js"
        )
        .then(() => view.contents.addScript('/js/wgxpath.install.js'))
        .then(() => {
          view.contents.addScript("/js/polyfills.js")
        })
        .then(() => view.contents.addScript("/js/url.js"))
        .then(() => view.contents.addScript("/js/jquery.columnizer.js"))
        .then(() => view.contents.addScript("/js/annotator.js"))
        .then(() => view.contents.addScript("/js/annotator-init.js"))
        .then(() => view.contents.addStylesheet("/css/annotator2.css"))
        .then(() => view.contents.addStylesheetRules(adder));

      this.iframeRef = view.window;

      let elemVideo = this.iframeRef.document.querySelectorAll("video");

      for(let i = 0; i < elemVideo.length; i++){

        elemVideo[i].style.width = "240px";
        elemVideo[i].style.height = "200px";
      }

    });
    this.book.ready.then(() => {
      let contentId = this.content.contentId;
      let verb = "initialised";
      let object = "epub";

      let contentType = this.$store.state.locale.selectedLocale;
      let authToken = this.$store.state.auth.user.token;
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

        if (this.page == 1) {
          if (
            this.$refs.ereaderContainer &&
            this.$refs.ereaderContainer.clientWidth
          )
            this.togglePage(
              this.$refs.ereaderContainer.clientWidth + 400 - 140,
              1
            );
        }

        if (this.page == 2) {
          if (
            this.$refs.ereaderContainer &&
            this.$refs.ereaderContainer.clientWidth
          )
            this.togglePage(this.$refs.ereaderContainer.clientWidth - 140, 2);
        }

        setTimeout(() => {
          this.rendition.themes.fontSize(this.fontSize.toString() + "%");
        }, 1000);

        this.loading = false;

    });
    this.book.loaded.navigation.then(tocArray => {
      let toc = [];
      let selfComponent = this;
      function buildToc(level, array, elements) {
        if (elements && elements.length) {
          level++;
          for (var i = 0; i < elements.length; i++) {
            const element = elements[i];
            selfComponent.pageHrefMapArr.push({
                            label: element.label,
              href: element.href
            })
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
      .then(blobUrl => {
        this.book.archive.createUrl(this.book.cover)
      })
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

    //       this.book.generatePagination().then( (a, b,c) => {
    //         console.log(a, b, c)
    //     console.log("The pagination has been generated");
    // });

    window.document.querySelector("body").addEventListener(
      "hideFocus",
      event => {
        if (event.target.id.toLowerCase() === "area") {
          this.toggleSideBar(false, undefined, "hideFocus");
        }
      },
      true
    );

    window.document.querySelector("body").addEventListener(
      "annotationsLoaded",
      event => {
       // console.log('L' , this.content.currentState)
        clearInterval(this.refreshIntervalId);

        this.refreshIntervalId = setInterval(() => {
          let contentId = this.content.contentId;
          let verb = "reading";
          let object = this.content.type;
          let contentType = this.$store.state.locale.selectedLocale;
          let authToken = this.$store.state.auth.user.token;

          let currentLocation = null;

          if (this.rendition && this.rendition.currentLocation())
            currentLocation = this.rendition.currentLocation();
          else return;

          if (!this.content.completed) {
            this.currentTime += this.hitTimeSeconds;

            if (this.ebookAvgTime < this.currentTime) {
              this.$root.$emit("epubCompletionReached");
            }
          }

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
        }, this.hitTimeSeconds);

        if (event.target.id.toLowerCase() === "area") {
          // console.log("inside component load area tag");
          this.annotations = [].concat(event.detail.annotations);
        }

        this.filterAnnotations(this.filter.type);
      },
      true
    );

    window.document.querySelector("body").addEventListener(
      "annotationCreated",
      event => {
        if (event.target.id.toLowerCase() === "area") {
     //     console.log(event.detail.annotation);
          this.annotations.push(Object.assign({}, event.detail.annotation));
          this.filterAnnotations(this.filter.type);
        }
      },
      true
    );

    window.document.querySelector("body").addEventListener(
      "annotationDeleted",
      event => {
        if (event.target.id.toLowerCase() === "area") {
          var index = _array.findIndex(this.annotations, {
            id: event.detail.annotation.id
          });
          this.annotations.splice(index, 1);
          this.filterAnnotations(this.filter.type);
        }
      },
      true
    );

    window.document.querySelector("body").addEventListener(
      "annotationUpdated",
      event => {
        if (event.target.id.toLowerCase() === "area") {
          var index = _array.findIndex(this.annotations, {
            id: event.detail.annotation.id
          });
          this.annotations[index] = event.detail.annotation;
          this.filterAnnotations(this.filter.type);
        }
      },
      true
    );
  },
  methods: {
    getEReaderUrl () {
      let base = dotenv.READER_HOST;
      base = base + `ebook/details/${this.content.contentId}`
      let result = base + `?token=${this.$store.state.auth.user.token}`
      return result
    },
     translate(val) {
  let vals = val.split('.')
  return this.locales[this.locale][vals[0]][vals[1]];
},
    togglePage(width, page) {
   // debugger;
      if (width) this.pageWidth = width;

      if (page) this.page = page;

      this.rendition.spread("auto", this.pageWidth);

      if (width != undefined && page != undefined)
        this.$store.dispatch("updateAppProps", {
          feature: "pageType",
          value: this.page
        });

setTimeout(()=>{
this.fontSize--;
      this.rendition.themes.fontSize(this.fontSize.toString() + "%");
setTimeout(()=>{
this.fontSize++;
      this.rendition.themes.fontSize(this.fontSize.toString() + "%");
         setTimeout(() => {
              let currentLocation = this.rendition.currentLocation();
                        if(currentLocation == undefined) return;

        let currentPage =
          currentLocation.start.displayed.page +
          "-" +
          currentLocation.end.displayed.page;
        let totalPages = currentLocation.start.displayed.total;

        let cfid = currentLocation.start.cfi;

        let pageName = '';
        this.pageHrefMapArr.forEach((value, index)=>{
          if(value.href == currentLocation.start.href)
            pageName = value.label;
        });

        this.$root.$emit("pageMetadata", { currentPage, totalPages, cfid, pageName });
}, 1000);
}, 100)
}, 100)



      this.lrsCaptures("togglepage", {
        width: this.pageWidth,
        page: this.page
      });
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

      let contentType = this.$store.state.locale.selectedLocale;
      let authToken = this.$store.state.auth.user.token;

      transformObject["id"] = contentId;

      let lrsObject = {
        verb,
        object,
        objectDetails: transformObject
      };

      if (activityDetails) lrsObject = { ...lrsObject, activityDetails };

      lrsPost(authToken, lrsObject, contentType).then(response => {
        if (response && response.data && response.data.httpStatus == 200) {
          if (response.data.points && response.data.coins) {
            let points = response.data.points;
            let coins = response.data.coins;
            this.$store.dispatch("updateCoinsPoints", { points, coins });
          }
        }
      });
    },
    highlightKeyword(text, id) {
       let reText = text.replace(
        new RegExp(this.sidebar.searchText, "ig"),
        '<span class="highlightKeyword">' + this.sidebar.searchText + "</span>"
      );

      setTimeout( () =>  document.getElementById('searchResult' + id).innerHTML = reText, 0);

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
      let contentType = this.$store.state.locale.selectedLocale;
      let authToken = this.$store.state.auth.user.token;

      setTimeout(() => {
        let currentLocation = this.rendition.currentLocation();
                        if(currentLocation == undefined) return;
        let currentPage =
          currentLocation.start.displayed.page +
          "-" +
          currentLocation.end.displayed.page;
        let totalPages = currentLocation.start.displayed.total;

        let cfid = currentLocation.start.cfi;
        //let cfidEnd = currentLocation.end.cfi;

        let pageName = '';
        this.pageHrefMapArr.forEach((value, index)=>{
          if(value.href == currentLocation.start.href)
            pageName = value.label;
        });

        this.$root.$emit("pageMetadata", { currentPage, totalPages, cfid, pageName });

        let objectDetails = {
          id: contentId,
          cfid
          //cfidEnd
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
      }, 1000);
    },
    nextPage(e) {
      this.rendition.next();
     //   console.log('np', this.content.currentState)


      let contentId = this.content.contentId;
      let verb = "read";
      let object = this.content.type;
      let contentType = this.$store.state.locale.selectedLocale;
      let authToken = this.$store.state.auth.user.token;

      setTimeout(() => {

   //     console.log('npt', this.content.currentState)
        let currentLocation = this.rendition.currentLocation();
                        if(currentLocation == undefined) return;

        let currentPage =
          currentLocation.start.displayed.page +
          "-" +
          currentLocation.end.displayed.page;
        let totalPages = currentLocation.start.displayed.total;

        let cfid = currentLocation.start.cfi;

        let pageName = '';
        this.pageHrefMapArr.forEach((value, index)=>{
          if(value.href == currentLocation.start.href)
            pageName = value.label;
        });

        this.$root.$emit("pageMetadata", { currentPage, totalPages, cfid, pageName });

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
      }, 1000);
    },
    onReaderScroll(e) {
      // console.log(e);
    },
    goToBookmark(cfid, index, val) {
   //   debugger;
      this.rendition.display(cfid);

      if (index != undefined) {
        this.sidebar.searchResults.forEach((e, i) => {
          if (index != i) this.currentSearch[i] = false;
          else this.currentSearch[i] = true;
        });

        this.toggleSideBar(true, val);
      } else this.toggleSideBar(true, val);

      this.lrsCaptures("gotobookmark", { cfid, index });
    },
    beforeDestroy() {
      this.book.destroy();
      this.$root.$off('handleFullscreen')
    },
    incrFonSize() {
      this.fontSize += 10;
      this.rendition.themes.fontSize(this.fontSize.toString() + "%");

      this.$store.dispatch("updateAppProps", {
        feature: "fontSize",
        value: this.fontSize
      });
      this.lrsCaptures("increasefont", {}, { fontSize: this.fontSize });
    },
    decrFontSize() {
      this.fontSize -= 10;
      this.rendition.themes.fontSize(this.fontSize.toString() + "%");

      this.$store.dispatch("updateAppProps", {
        feature: "fontSize",
        value: this.fontSize
      });
      this.lrsCaptures("decreasefont", {}, { fontSize: this.fontSize });
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

        this.currentSearch = new Array();

        for (i = 0; i < results.length; i++) {
          this.currentSearch.push(false);
        }

        this.searchedAlready = true;

        results = results.filter(
          (result, index, self) =>
            index == results.findIndex(t => t.excerpt == result.excerpt)
        );

        this.sidebar.searchResults = results;

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
    reinitSearchData() {
    if(this.iframeRef == null)
      return;
      this.iframeRef.document.body.dispatchEvent(
        new CustomEvent("searchedResultsRemoved")
      );
      this.sidebar.searchResults = [];
      this.searchedAlready = false;
    },
    toggleSideBar(value, type, from) {
      this.sidebar.searchText = "";
      this.reinitSearchData();

      if (value == false) {
        for (var prop in this.buttonStates) {
          this.buttonStates[prop] = false;
        }
        this.showOverLay = false;
      } else {
        for (var prop in this.buttonStates) {
          if (prop == type) {
            this.buttonStates[prop] = !this.buttonStates[prop];
            if (this.buttonStates[prop]) this.showOverLay = true;
            else this.showOverLay = false;
          } else this.buttonStates[prop] = false;
        }
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
    clearInterval(this.refreshIntervalId);

    //this.$store.dispatch("content/makeContentFullscreen");

    try {
      var currentLocation = this.rendition.currentLocation();
                      if(currentLocation == undefined) return;
    } catch (e) {
      console.log(e);
    }
  },
  computed: {
    isHighlightActive() {
      return this.filter.type == "highlights";
    }
  }
};
</script>


<style>
.highlightKeyword{
  color: #39c1c7
}

#prev {
  left: 0;
}

#next {
  right: 0;
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
  z-index: 10;
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
  z-index: 9 !important;
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

/*
.leftbtns  .btn.active{ background:background: rgb(34,194,198);
      background: -moz-linear-gradient(top, rgba(34,194,198,1) 0%, rgba(27,155,158,1) 100%);
      background: -webkit-linear-gradient(top, rgba(34,194,198,1) 0%,rgba(27,155,158,1) 100%);
      background: linear-gradient(to bottom, rgba(34,194,198,1) 0%,rgba(27,155,158,1) 100%);
}*/
</style>

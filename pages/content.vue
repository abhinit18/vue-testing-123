<template>
  <section class="">
    <div id="main">
      <div id="prev" @click="prevPage" class="arrow">‹</div>
      <div ref="area" id="area"></div>
      <div id="next" @click="nextPage" class="arrow">›</div>
    </div>

    <script src="/js/epub.js"></script>
    <script src="/js/jszip.min.js"></script>
  </section>
</template>

<script>

export default {
  data () {
    return {
      users: [],
      app: null,
      epubSrc: "https://kplms-content.s3.ap-south-1.amazonaws.com/kplms-content/en-content/children%20epub",
      book: null,
      contentId: null
    }
  },
  mounted () {
    this.book = window.ePub("https://kplms-content.s3.ap-south-1.amazonaws.com/kplms-content/en-content/children%20epub", { contained : true, fixedLayout: true })
    this.book.renderTo("area")
    this.book.on('renderer:chapterDisplayed', (chapter) => {
      window.EPUBJS.core.addCss("/css/annotator.css", null, this.book.renderer.render.window.document.head)
      const pageUri = function () {
        return {
          beforeAnnotationCreated: function (ann) {
            ann.contentId = "123"
          }
        }
      }

      this.book.renderer.render.window.annotator = new annotatorEPUB.App()
      this.book.renderer.render.window.annotator.include(annotatorUI.main, {
        element: this.book.renderer.render.window.document.body,
        window: this.book.renderer.render.window
      })
      this.book.renderer.render.window.annotator.include(pageUri);
      annotatorStorage.HttpStorage.options.headers = {
        "Authorization": "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJTVFVERU5UIl0sInVzZXJJZCI6ImRlZjc3YTYxLWY0MjQtNDE4OS04MmYwLTJmYjZiYjFhZGY2OSIsImRldmljZUlkIjoiV0VCIn0.M0Ey4hUf2FQ8zXpalVov6fRKjJ1ZpIUkGxlshAFoh07eW4bqpsaYkGACpzmT41H2IyuD7mP5ch2mGc3nMKfDrw"
      }
      annotatorStorage.HttpStorage.options.urls = {
        create: '/api/v1/annotations',
        update: '/api/v1/annotations/{id}',
        destroy: '/api/v1/annotations/{id}',
        search: '/api/v1/annotations/search'
      }
      this.book.renderer.render.window.annotator.include(annotatorStorage.http, {
        prefix: 'http://52.66.117.215:8000/api'
      })
      this.book.renderer.render.window.annotator.start().then(() => {
        this.book.renderer.render.window.annotator.annotations.load({ contentId: "123" } )
      })
    })
    this.book.on('book:pageChanged', (page) => {

    })
  },
  methods: {
    prevPage(e) {
      this.book.prevPage()
    },
    nextPage(e) {
      this.book.nextPage()
    }
  },
  head () {
    return {
      title: 'Users'
    }
  }
}
</script>

<style scoped>
body {
  overflow: hidden;
}

#main {
  position: absolute;
  width: 100%;
  bottom: 0;
  top: 50px;
}

#area {
  width: 80%;
  height: 80%;
  margin: 5% auto;
  max-width: 1250px;
}

#area iframe {
  border: none;
}

#prev {
  left: 40px;
}

#next {
  right: 40px;
}

.arrow {
  position: absolute;
  top: 50%;
  margin-top: -32px;
  font-size: 64px;
  color: #E2E2E2;
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

#btnSelectBook {
  position: absolute;
  top: 20px;
  left: 20px;
}
</style>

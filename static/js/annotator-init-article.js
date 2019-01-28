// token
// contentId
// LMS_HOST
var pageUri = function () {
  return {
    beforeAnnotationCreated: function (ann) {
      ann.contentId = window.contentId
    }
  }
}

annotator.storage.HttpStorage.options.headers = {
  "Authorization": window.token,
  "Platform": window.platform
}



annotator.storage.HttpStorage.options.urls = {
  create: 'v1/api/annotations',
  update: 'v1/api/annotations/{id}',
  destroy: 'v1/api/annotations/{id}',
  search: 'v1/api/annotations/search'
}
annotator.util.mousePosition = function(event, customEvent) {
  
  var pageX = event.pageX;
  var pageY = event.pageY;
  if (pageX === undefined) {
    pageX = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    pageY = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }

  var rect = event.target.getBoundingClientRect();
  var offsetX = event.clientX - rect.left;
  var offsetY = event.clientY - rect.top;

    var body = document.body;
    if(window.platform == 'IOS' && customEvent){
      var pos = window.getSelection().getRangeAt(0).getClientRects()[0]
      pageY = offsetY + 100
      pageX = 50
    }

    let returnPosition =  {
        // screenWidth: event.view.screen.availWidth,
        screenX: event.screenX,
        top: pageY,
        left: pageX,
        width: window.screen.width,
        height: window.screen.height
        
    };
    console.log(returnPosition)
    return returnPosition
};

var ann = new annotator.App()
ann.include(annotator.ui.main, {
  element: document.getElementById('articalSecDiviFrame'),
  parentAnnotationListenerSelector: "#area"
})
ann.include(pageUri);
ann.include(annotator.storage.http, {
  prefix: window.LMS_HOST
})
ann.start().then(function() {
  ann.annotations.load({ contentId: window.contentId } )
})



/* eslint-disable */

export default ({ app }) => {
  /*
  ** Only run on client-side and only in production mode
  */
  if (process.env.NODE_ENV !== 'production') return
  /*
  ** Include Google Analytics Script
  */
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  /*
  ** Set the current page
  */
  ga('create', process.env.GTM_ID, 'auto')
  /*
  ** Every time the route changes (fired on initialization too)
  */
    app.router.afterEach((to, from) => {

      ga('set', 'page', to.fullPath)
      ga('send', 'pageview')

      try{
          let tokenEnc = JSON.parse(window.localStorage.getItem('token'))['token'];
          let base64Url = tokenEnc.split('.')[1];
          let base64 = base64Url.replace('-', '+').replace('_', '/');
          let token =  JSON.parse(window.atob(base64));

          ga('set', 'userId', token.userId);
          ga('set', 'dimension1',  token.roles[0]);
          if(token.roles[0] == 'STUDENT'){
            ga('set', 'dimension2',  token.grades[0]);
          }
      }catch(e){};

    })
}

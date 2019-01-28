;
(function(p, l, o, w, i, n, g) {
    if (!p[i]) {
        p.GlobalSnowplowNamespace = p.GlobalSnowplowNamespace || [];
        p.GlobalSnowplowNamespace.push(i);
        p[i] = function() {
            (p[i].q = p[i].q || []).push(arguments)
        };
        p[i].q = p[i].q || [];
        n = l.createElement(o);
        g = l.getElementsByTagName(o)[0];
        n.async = 1;
        n.src = w;
        g.parentNode.insertBefore(n, g)
    }
}(window, document, "script", "//d1fc8wv8zag5ca.cloudfront.net/2.5.1/sp.js", "kplmssnowplow"));
    kplmssnowplow("newTracker", "kplmstracker", "35.154.127.220", {
    appId: "lms_web",
    platform: "web",
    post: true,
    cookieDomain: null,
    discoverRootDomain: true,
    cookieName: "_sp534_",
    encodeBase64: false,
    respectDoNotTrack: false,
    userFingerprint: true,
    userFingerprintSeed: 6385926734,
    pageUnloadTimer: 0,
    //forceSecureTracker: true,
    bufferSize: 1,
    maxPostBytes: 45000,
    crossDomainLinker: function (linkElement) {
      return (linkElement.href === "http://acme.de" || linkElement.id === "crossDomainLink");
    },
    cookieLifetime: 86400 * 31,
    stateStorageStrategy: "cookie",
    contexts: {
      webPage: true,
      performanceTiming: true,
      gaCookies: true,
      geolocation: false
    }
  });

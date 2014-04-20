/*
 * UiO JavaScript - Responsive apps
 *
 */

var responsiveUiOApp= (function() {
  function ResponsiveUiOApp() {
    this.supportsResponsive = (function() {
      var ua = navigator.userAgent;
      var re  = /MSIE ([0-9]+[\.0-9]*)/.exec(ua);
      if (re) {
        rv = parseFloat(re[1]);
        if(rv < 9) {
         return false;
        }
      }
      return true;
    }());
    this.isResponsive = (typeof enquire !== "undefined") && this.supportsResponsive;
    this.responsivePortraitBreakpoint = "15.5cm";
    this.responsiveLandscapeBreakpoint = "17.5cm";
    this.responsiveMax = "screen and (max-width: " + this.responsivePortraitBreakpoint + ") and (orientation : portrait)" +
                       ", screen and (max-width: " + this.responsiveLandscapeBreakpoint + ") and (orientation : landscape)";
    this.responsiveMin = "screen and (min-width: " + this.responsivePortraitBreakpoint + ") and (orientation : portrait)" +
                       ", screen and (min-width: " + this.responsiveLandscapeBreakpoint + ") and (orientation : landscape)";
  }

  var responsiveUiOApp = new ResponsiveUiOApp();

  if(responsiveUiOApp.isResponsive) {

    /* Takes care of toggle language select and username focus */

    document.addEventListener("DOMContentLoaded", function() {
        var languageSelect = document.getElementById('language-select');
        var languageList = document.getElementsByClassName('language-menu')[0];
        var appMenuLink = document.getElementById('responsive-menu');
        var appMenu = document.getElementById('head-login');

        var hasAppMenuMultipleLinks = appMenu.getElementsByTagName("li").length > 2;

        if(languageSelect){
          languageSelect.addEventListener('click', function(event) {
              event.preventDefault();
              if(languageList.offsetWidth === 0 || languageList.offsetHeight === 0) {
                  languageList.style.display='block';
                  if(hasAppMenuMultipleLinks) {
                    appMenu.style.display='none';
                    appMenuLink.style.display='none';
                  }
              } else {
                  languageList.style.display='none';
                  if(hasAppMenuMultipleLinks) {
                    appMenuLink.style.display='block';
                  }
              }
          });
        }
        if (appMenuLink) {
          if(hasAppMenuMultipleLinks) {
            appMenuLink.addEventListener('click', function(event) {
              event.preventDefault();
              if (appMenu.offsetWidth === 0 || appMenu.offsetHeight === 0) {
                appMenu.style.display = 'block';
                if(languageSelect) {
                  languageList.style.display = 'none';
                }
              } else {
                appMenu.style.display = 'none';
              }
            });
            uioApp.addClass(appMenu, "multiple-links");
          } else {
            appMenuLink.style.display = 'none';
          }
        }
        if(typeof appResponsiveDOMContentLoaded === "function") {
          appResponsiveDOMContentLoaded();
        }
    });

    /* Fixes iOS 5 iPad zooming on orientation change / landscape mode
     * http://stackoverflow.com/questions/5434656/ipad-layout-scales-up-when-rotating-from-portrait-to-landcape
     */

    var ua = navigator.userAgent;
    if (/iPad/i.test(ua) && /OS 5/i.test(ua)) {
        var viewportmeta = document.querySelector('meta[name="viewport"]');
        if (viewportmeta) {
            viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
            document.body.addEventListener('gesturestart', function () {
                viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
            }, false);
        }
    }
  }
  return responsiveUiOApp;
}());

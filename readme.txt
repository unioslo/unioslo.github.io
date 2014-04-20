University of Oslo app profile (top and bottom)
***********************************************

html-template(-eng).html
-----------------------------------------------

HTML for top and bottom in the app profile. To switch to fluid
design add "app-fluid" to body-class. To use full-width
fluid design add the additional "app-fluid-full-width"
to body-class. If you want a red colon in front of the
application name you can add "app-colon".

uio-app-top bottom.css
-----------------------------------------------

CSS for the top and bottom in the app profile.

uio-app-top-bottom-responsive.css
-----------------------------------------------

CSS for the top and bottom in the responsive app profile.

images/ files
-----------------------------------------------

Belonging to the top and bottom in the app profile,
and referred to relatively in uio-app-top-bottom.css.

uio-app.js
-----------------------------------------------

Takes care of active state of buttons in IE 6 and IE 7
and label text in search field(s). If you want to keep  
the text in search field(s) after re-focus you can set
doKeepSearchTextFocus to true. Also contains utility
functions for CSS-classes (adding/removing and query DOM).

uio-app-responsive.js
-----------------------------------------------

Takes care of toggle language select.
Fixes iOS 5 iPad zooming on orientation change / landscape mode. 

Turn off responsive design
-----------------------------------------------

- Remove class="app-fluid-responsive" from the body element on line 13.
- Remove <link href="uio-app-top-bottom-responsive.css"...> on line 10 and 11.
- Remove <script src="responsive-libs"...> on line 73.
- Remove <script src="uio-app-responsive.js"...> on line 74.
- Remove the script block on line 76 to 102.

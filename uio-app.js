/*
 * UiO JavaScript - Apps
 *
 * Takes care of label text in search field(s) and active state of buttons in IE 6 and IE 7
 *
 * Public available general methods:
 *
 * uioApp.hasClass(elm, cls)
 * uioApp.addClass(elm, cls) - utilize hasClass
 * uioApp.removeClass(elm, cls) - utilize hasClass
 * uioApp.getElementsByClass(searchClass, node, tag)
 *
 * Credits:
 * http://www.dustindiaz.com/getelementsbyclass/ <= http://ejohn.org/blog/getelementsbyclassname-speed-comparison/
 * http://snipplr.com/view/3561/addclass-removeclass-hasclass/
 */

var uioApp = (function () {
    "use strict";

    var uioAppNs = {
        doKeepSearchTextFocus: false,
        doDebug: false,
        appDebug: function (e) {
            var str = "<strong>Debug event:</strong><ul style='padding: 10px; list-style-position: inside'><li>Type: " + e.type + "</li>";
            if (uioAppNs.isIE) {
                str += "<li>Node: " + e.target.nodeName + "</li>" +
                    "<li>Class: " + e.target.className + "</li>" +
                    "<li>Name: " + e.target.name + "</li>" +
                    "<li>Value: " + e.target.value + "</li>";
            }
            str += "</ul>";
            document.getElementById("app-content").innerHTML = str;
        },
        isIE: navigator.appName.indexOf("Internet Explorer") === -1,
        hasClass: function (elm, cls) {
            return elm.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        },
        addClass: function (elm, cls) {
            if (!uioAppNs.hasClass(elm, cls)) {
                elm.className += " " + cls;
            }
        },
        removeClass: function (elm, cls) {
            if (uioAppNs.hasClass(elm, cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                elm.className = elm.className.replace(reg, ' ');
            }
        },
        getElementsByClass: function (searchClass, node, tag) {
            if (node === null) {
                node = document;
            }
            if (tag === null) {
                tag = '*';
            }
            var elements = [],
                elms = null,
                elm = null,
                hasClassFunc = null,
                len = null,
                i = null;
            if (document.querySelectorAll) {
                elements = node.querySelectorAll("." + searchClass);
            } else if (document.getElementsByClassName) {
                elements = node.getElementsByClassName(searchClass);
            } else {
                elms = node.getElementsByTagName(tag);
                hasClassFunc = uioAppNs.hasClass;
                len = elms.length;
                for (i = 0; i < len; i = i + 1) {
                    elm = elms[i];
                    if (hasClassFunc(elm, searchClass)) {
                        elements.push(elm);
                    }
                }
            }
            return elements;
        },
        searchStringChanges: function (text, color, fontSize, that) {
            var elem = uioAppNs.getElementsByClass("searchstring", that.parentNode, "input")[0];
            elem.value = text;
            elem.style.color = color;
            elem.style.fontSize = fontSize;
        },
        search: function (e) {
            if (!e) {
                e = window.event;
            }
            if (uioAppNs.doDebug) {
                uioAppNs.appDebug(e);
            }
            var initSearch = uioAppNs.getElementsByClass("searchstringlabel", this.parentNode, "label")[0].innerHTML,
                searchString = uioAppNs.getElementsByClass("searchstring", this.parentNode, "input")[0];
            if (searchString.value === initSearch) {
                searchString.value = "";
            }
            e.cancelBubble = true;
            if (e.stopPropagation) {
                e.stopPropagation();
            }
        },
        searchFocus: function (e) {
            if (!e) {
                e = window.event;
            }
            if (uioAppNs.doDebug) {
                uioAppNs.appDebug(e);
            }
            if (uioAppNs.doKeepSearchTextFocus) {
                var initSearch = uioAppNs.getElementsByClass("searchstringlabel", this.parentNode, "label")[0].innerHTML;
                if (this.value === initSearch) {
                    uioAppNs.searchStringChanges("", "#2B2B2B", "100%", this);
                }
            } else {
                uioAppNs.searchStringChanges("", "#2B2B2B", "100%", this);
            }
            e.cancelBubble = true;
            if (e.stopPropagation) {
                e.stopPropagation();
            }
        },
        searchBlur: function (e) {
            if (!e) {
                e = window.event;
            }
            if (uioAppNs.doDebug) {
                uioAppNs.appDebug(e);
            }
            var initSearch = uioAppNs.getElementsByClass("searchstringlabel", this.parentNode, "label")[0].innerHTML;
            if (uioAppNs.getElementsByClass("searchstring", this.parentNode, "input")[0].value === "") {
                uioAppNs.searchStringChanges(initSearch, "#505050", "90%", this);
            }
            e.cancelBubble = true;
            if (e.stopPropagation) {
                e.stopPropagation();
            }
        },
        makeActive: function (e) {
            if (!e) {
                e = window.event;
            }
            uioAppNs.addClass(this, "active");
        },
        makeDeactive: function (e) {
            if (!e) {
                e = window.event;
            }
            uioAppNs.removeClass(this, "active");
        },
        init: function() {
            var searchSubmits = uioAppNs.getElementsByClass("searchsubmit", null, "button"),
                searchStrings = uioAppNs.getElementsByClass("searchstring", null, "input"),
                searchLabels = uioAppNs.getElementsByClass("searchstringlabel", null, "label"),
                searchFunc = uioAppNs.search,
                searchFocusFunc = uioAppNs.searchFocus,
                searchBlurFunc = uioAppNs.searchBlur,
                searchStringChangesFunc = uioAppNs.searchStringChanges,
                makeActiveFunc = null,
                makeDeactiveFunc = null,
                i = 0,
                len = 0,
                searchString = null,
                ie = null,
                ieVersion = null,
                buttons = null;

            // Search submit buttons init
            for (i = 0, len = searchSubmits.length; i < len; i = i + 1) {
                searchSubmits[i].onclick = searchFunc;
            }

            // Searchfields init (labeltext logic)
            for (i = 0, len = searchStrings.length; i < len; i = i + 1) {
                searchString = searchStrings[i];
                searchString.onfocus = searchFocusFunc;
                searchString.onblur = searchBlurFunc;
                searchStringChangesFunc(searchLabels[i].innerHTML, "#505050", "90%", searchString);
            }

            // Fix active state for buttons in IE 6 / IE 7,
            if (uioAppNs.isIE) {
                ie = navigator.appVersion.split("MSIE");
                ieVersion = parseFloat(ie[1]);
                if (ieVersion <= 7 && ieVersion !== -1) {
                    buttons = document.getElementsByTagName("button");
                    makeActiveFunc = uioAppNs.makeActive;
                    makeDeactiveFunc = uioAppNs.makeDeactive;
                    for (i = 0, len = buttons.length; i < len; i = i + 1) {
                        buttons[i].onmousedown = makeActiveFunc;
                        buttons[i].onmouseup = makeDeactiveFunc;
                    }
                }
            }
        }
    };

    uioAppNs.init();

    return {
        hasClass: uioAppNs.hasClass,
        addClass: uioAppNs.addClass,
        removeClass: uioAppNs.removeClass,
        getElementsByClass: uioAppNs.getElementsByClass,
    };
}());

/* Backwards compatible */
var uioAppHasClass = uioApp.hasClass,
    uioAppAddClass = uioApp.addClass,
    uioAppRemoveClass = uioApp.removeClass,
    getElementsByClass = uioApp.getElementsByClass;

"use strict";(self.webpackChunkcursoionic=self.webpackChunkcursoionic||[]).push([[186],{1186:function(e,t,n){n.r(t),n.d(t,{startInputShims:function(){return E}});var r=n(4165),o=n(5861),i=n(3743),a=n(1811),u=new WeakMap,c=function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;u.has(e)!==n&&(n?d(e,t,r):l(e,t))},s=function(e){return e===e.getRootNode().activeElement},d=function(e,t,n){var r=t.parentNode,o=t.cloneNode(!1);o.classList.add("cloned-input"),o.tabIndex=-1,r.appendChild(o),u.set(e,o);var i="rtl"===e.ownerDocument.dir?9999:-9999;e.style.pointerEvents="none",t.style.transform="translate3d(".concat(i,"px,").concat(n,"px,0) scale(0)")},l=function(e,t){var n=u.get(e);n&&(u.delete(e),n.remove()),e.style.pointerEvents="",t.style.transform=""},f=function(e,t,n){if(!n||!t)return function(){};var r=function(n){s(t)&&c(e,t,n)},o=function(){return c(e,t,!1)},i=function(){return r(!0)},u=function(){return r(!1)};return(0,a.a)(n,"ionScrollStart",i),(0,a.a)(n,"ionScrollEnd",u),t.addEventListener("blur",o),function(){(0,a.b)(n,"ionScrollStart",i),(0,a.b)(n,"ionScrollEnd",u),t.addEventListener("ionBlur",o)}},v="input, textarea, [no-blur], [contenteditable]",p=function(e,t,n){var r=e.closest("ion-item,[ion-item]")||e;return m(r.getBoundingClientRect(),t.getBoundingClientRect(),n,e.ownerDocument.defaultView.innerHeight)},m=function(e,t,n,r){var o=e.top,i=e.bottom,a=t.top,u=a+15,c=.75*Math.min(t.bottom,r-n)-i,s=u-o,d=Math.round(c<0?-c:s>0?-s:0),l=Math.min(d,o-a),f=Math.abs(l)/.3;return{scrollAmount:l,scrollDuration:Math.min(400,Math.max(150,f)),scrollPadding:n,inputSafeY:4-(o-u)}},h=function(e,t,n,r,o){var i,u=function(e){i=(0,a.q)(e)},c=function(u){if(i){var c=(0,a.q)(u);b(6,i,c)||s(t)||w(e,t,n,r,o)}};return e.addEventListener("touchstart",u,{capture:!0,passive:!0}),e.addEventListener("touchend",c,!0),function(){e.removeEventListener("touchstart",u,!0),e.removeEventListener("touchend",c,!0)}},w=function(){var e=(0,o.Z)((0,r.Z)().mark((function e(t,n,u,s,d){var l,f,v,m,h,w;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(u||s){e.next=2;break}return e.abrupt("return");case 2:if(l=p(t,u||s,d),!(u&&Math.abs(l.scrollAmount)<4)){e.next=6;break}return n.focus(),e.abrupt("return");case 6:if(c(t,n,!0,l.inputSafeY),n.focus(),(0,a.r)((function(){return t.click()})),"undefined"===typeof window){e.next=22;break}if(v=function(){var e=(0,o.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0!==f&&clearTimeout(f),window.removeEventListener("ionKeyboardDidShow",m),window.removeEventListener("ionKeyboardDidShow",v),!u){e.next=6;break}return e.next=6,(0,i.c)(u,0,l.scrollAmount,l.scrollDuration);case 6:c(t,n,!1,l.inputSafeY),n.focus();case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),m=function e(){window.removeEventListener("ionKeyboardDidShow",e),window.addEventListener("ionKeyboardDidShow",v)},!u){e.next=21;break}return e.next=15,(0,i.g)(u);case 15:if(h=e.sent,w=h.scrollHeight-h.clientHeight,!(l.scrollAmount>w-h.scrollTop)){e.next=21;break}return"password"===n.type?(l.scrollAmount+=50,window.addEventListener("ionKeyboardDidShow",m)):window.addEventListener("ionKeyboardDidShow",v),f=setTimeout(v,1e3),e.abrupt("return");case 21:v();case 22:case"end":return e.stop()}}),e)})));return function(t,n,r,o,i){return e.apply(this,arguments)}}(),b=function(e,t,n){if(t&&n){var r=t.x-n.x,o=t.y-n.y;return r*r+o*o>e*e}return!1},g=function(e,t){var n,r;if("INPUT"===e.tagName&&(!e.parentElement||"ION-INPUT"!==e.parentElement.tagName)&&"ION-SEARCHBAR"!==(null===(r=null===(n=e.parentElement)||void 0===n?void 0:n.parentElement)||void 0===r?void 0:r.tagName)){var o=(0,i.a)(e);if(null!==o){var a=o.$ionPaddingTimer;a&&clearTimeout(a),t>0?o.style.setProperty("--keyboard-offset","".concat(t,"px")):o.$ionPaddingTimer=setTimeout((function(){o.style.setProperty("--keyboard-offset","0px")}),120)}}},E=function(e){var t=document,n=e.getNumber("keyboardHeight",290),u=e.getBoolean("scrollAssist",!0),c=e.getBoolean("hideCaretOnScroll",!0),s=e.getBoolean("inputBlurring",!0),d=e.getBoolean("scrollPadding",!0),l=Array.from(t.querySelectorAll("ion-input, ion-textarea")),p=new WeakMap,m=new WeakMap,w=function(){var e=(0,o.Z)((0,r.Z)().mark((function e(t){var o,s,d,l,v,w;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e){return(0,a.c)(t,e)}));case 2:if(o=t.shadowRoot||t,s=o.querySelector("input")||o.querySelector("textarea"),d=(0,i.a)(t),l=d?null:t.closest("ion-footer"),s){e.next=8;break}return e.abrupt("return");case 8:d&&c&&!p.has(t)&&(v=f(t,s,d),p.set(t,v)),(d||l)&&u&&!m.has(t)&&(w=h(t,s,d,l,n),m.set(t,w));case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();s&&function(){var e=!0,t=!1,n=document,r=function(){t=!0},o=function(){e=!0},i=function(r){if(t)t=!1;else{var o=n.activeElement;if(o&&!o.matches(v)){var i=r.target;i!==o&&(i.matches(v)||i.closest(v)||(e=!1,setTimeout((function(){e||o.blur()}),50)))}}};(0,a.a)(n,"ionScrollStart",r),n.addEventListener("focusin",o,!0),n.addEventListener("touchend",i,!1)}(),d&&function(e){var t=document,n=function(t){g(t.target,e)},r=function(e){g(e.target,0)};t.addEventListener("focusin",n),t.addEventListener("focusout",r)}(n);for(var b=0,E=l;b<E.length;b++){var y=E[b];w(y)}t.addEventListener("ionInputDidLoad",(function(e){w(e.detail)})),t.addEventListener("ionInputDidUnload",(function(e){!function(e){if(c){var t=p.get(e);t&&t(),p.delete(e)}if(u){var n=m.get(e);n&&n(),m.delete(e)}}(e.detail)}))}}}]);
//# sourceMappingURL=186.5a7ba221.chunk.js.map
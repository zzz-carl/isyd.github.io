"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};function _toConsumableArray(t){if(Array.isArray(t)){for(var n=0,e=Array(t.length);n<t.length;n++)e[n]=t[n];return e}return Array.from(t)}!function(){var t="author",n="me";new Vue({el:"#mobile",data:{baseUrl:"http://182.92.76.165:8829",messages:[],dialogs:null,lastDialog:null,msgChain:Promise.resolve(),isTyping:!1,nextTopics:[],hasPrompt:!1,latestMsgContent:null},mounted:function(){var t=this;$.getJSON("./assets/dialog.json",function(n){t.dialogs=n,t.nextTopics=t.dialogs.fromUser,t.appendDialog("0000")})},methods:{appendDialog:function(n){var o=this;if("object"===(void 0===n?"undefined":_typeof(n))&&n.length>0)n.forEach(function(t){return o.appendDialog(t)});else{if(null!=n){this.isTyping=!0;var r=this.getDialog(n);return e(r.details).forEach(function(n){o.msgChain=o.msgChain.then(function(){return s(5e3)}).then(function(){return o.sendMsg(n,t)})}),r.nextAuthor?this.appendDialog(r.nextAuthor):this.msgChain.then(function(){o.lastDialog=r,o.isTyping=!1})}this.lastDialog.responses=null}},sendMsg:function(t,n){switch(n){case"me":return this.sendUserMsg(t);default:return this.sendFriendMsg(t,n)}},sendFriendMsg:function(t,n){var i=this,a=e(t),u=a.replace(/<[^>]+>/g,"").length,l=/<img[^>]+>/.test(a),c=u>2||l,h={author:n,content:c?'\n        <div class="dot"></div>\n        <div class="dot"></div>\n        <div class="dot"></div>\n    ':a,isImg:l};return this.messages.push(h),c?(this.markMsgSize(h),setTimeout(r),s(Math.min(100*u,2e3)).then(function(){return i.markMsgSize(h,a)}).then(function(){return s(150)}).then(function(){h.content=a,o()})):(o(),Promise.resolve())},sendUserMsg:function(t){return this.messages.push({author:n,content:t}),o(),Promise.resolve()},markMsgSize:function(t){var n=this,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return this.latestMsgContent=e||t.content,s(0).then(function(){return t.isImg&&i($("#mock-msg img"))}).then(function(){var e;Object.assign(t,{width:(e=$("#mock-msg")).width(),height:e.height()}),n.messages=[].concat(_toConsumableArray(n.messages))})},getDialog:function(t){var n=this.dialogs.fromMe.filter(function(n){return n.id===t});return n?n[0]:null},getDialogFromUser:function(t){var n=this.dialogs.fromUser.filter(function(n){return n.id===t});return n?n[0]:null},togglePrompt:function(t){this.isTyping||(this.hasPrompt=t)},respond:function(t){return this.say(t.content,t.nextAuthor)},ask:function(t){var n=e(t.details);return this.say(n,t.nextAuthor)},say:function(t,e){var o=this;return this.hasPrompt=!1,s(200).then(function(){return o.sendMsg(t,n)}).then(function(){return s(300)}).then(function(){return o.appendDialog(e)})},submitF1:function(){var t=this,n={password:$("#f1-password").val()};$.ajax({url:this.baseUrl+"/checkPassword",type:"POST",data:n,success:function(n){var e={content:n.message,nextAuthor:[n.data?"0002":"0001"]};t.respond(e)},error:function(){console.error("Ajax request failed")}})}}});function e(t){return"string"!=typeof t&&t.length?t[Math.floor(Math.random()*t.length)]:t}function o(){setTimeout(function(){r();var t=$("#mobile-body-content .msg-row:last-child .msg");t.find("a").attr("target","_blank"),i(t).then(r)})}function r(){var t=$("#mobile-body-content"),n=t[0].scrollHeight-t.height()-t.scrollTop(),e=Date.now();requestAnimationFrame(function o(){var r=Math.min(1,(Date.now()-e)/250);t.scrollTop(t.scrollTop()+n*r),r<1&&requestAnimationFrame(o)})}function s(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return new Promise(function(n){setTimeout(n,t)})}function i(t){return new Promise(function(n){t.one("load",n).each(function(t,n){n.complete&&$(n).trigger("load")})})}}();
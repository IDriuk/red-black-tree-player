(this["webpackJsonpred-black-tree-player"]=this["webpackJsonpred-black-tree-player"]||[]).push([[0],{76:function(t,n,e){t.exports=e(83)},81:function(t,n,e){},82:function(t,n,e){},83:function(t,n,e){"use strict";e.r(n);var a=e(0),r=e.n(a),o=e(20),c=e.n(o),i=(e(81),e(82),e(3));var l=function(){return Object(a.useEffect)((function(){!function(){var t=500,n=1100,e=i.b(".canvas").append("svg").attr("width",n+100).attr("height",t+100).append("g").attr("transform","translate(50, 50)"),a=i.c().id((function(t){return t.name})).parentId((function(t){return t.parent})),r=i.d().size([n,t]);!function(t){e.selectAll(".node").remove(),e.selectAll(".link").remove();var n=a(t),o=r(n).descendants(),c=e.selectAll(".node").data(o);e.selectAll(".link").data(r(n).links()).enter().append("path").transition().duration(300).attr("class","link").attr("fill","none").attr("stroke","#aaa").attr("stroke-width",2).attr("d",i.a().x((function(t){return t.x})).y((function(t){return t.y}))),c.enter().append("g").attr("class","node").attr("transform",(function(t){return"translate(".concat(t.x,", ").concat(t.y,")")})).append("circle").attr("fill","orangered").attr("stroke","#555").attr("stroke-width",2).attr("r",20)}([{name:"grandparent"},{name:"parent",parent:"grandparent"},{name:"uncle",parent:"grandparent"},{name:"child1",parent:"parent"},{name:"child2",parent:"parent"},{name:"sibling1",parent:"uncle"},{name:"sibling2",parent:"uncle"}])}()}),[]),r.a.createElement("div",{className:"canvas"})};var s=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(l,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(s,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[76,1,2]]]);
//# sourceMappingURL=main.9872c7e9.chunk.js.map
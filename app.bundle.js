!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=10)}([function(t,e){function n(t,e,n){var r,o,i,a,s;function c(){var l=Date.now()-a;l<e&&l>=0?r=setTimeout(c,e-l):(r=null,n||(s=t.apply(i,o),i=o=null))}null==e&&(e=100);var l=function(){i=this,o=arguments,a=Date.now();var l=n&&!r;return r||(r=setTimeout(c,e)),l&&(s=t.apply(i,o),i=o=null),s};return l.clear=function(){r&&(clearTimeout(r),r=null)},l.flush=function(){r&&(s=t.apply(i,o),i=o=null,clearTimeout(r),r=null)},l}n.debounce=n,t.exports=n},function(t,e){t.exports=jQuery},function(t,e,n){"use strict";(function(t){n.d(e,"a",(function(){return i})),n.d(e,"b",(function(){return a}));var r=n(4),o=n(6);const i=e=>{const n=e.$canvas;var r=t("#save-canvas"),o=t("#refresh-canvas"),i=t("#zoom-100"),a=t("#show-svg"),s=t("#clear-canvas"),c=t("#undo"),l=t("#redo");c.on("click",()=>{n.undo()}),l.on("click",()=>{n.redo()}),s.on("click",()=>{console.log("cE-oC"),n.clear()}),r.on("click",()=>{console.log("sC-oC");const t=n.toJSON();console.log("Canvas JSON",t);const r={width:e.width,height:e.height,lastScale:e.lastScale,canvas:t};localStorage.setItem("infiniteCanvas",JSON.stringify(r))}),o.on("click",()=>{console.log("rC-oC");const t=JSON.parse(localStorage.getItem("infiniteCanvas")||"");console.log("rcoc, inf",t),n.loadFromJSON(t.canvas,()=>{e.width=e.scaledWidth=t.width,e.height=e.scaledHeight=t.height,e.lastScale=t.lastScale,n.setWidth(t.width),n.setHeight(t.height),e.$canvasContainer.width(t.width).height(t.height),n.renderAll()})}),i.on("click",()=>{console.log("zoom100"),e.resetZoom(),n.renderAll()}),a.on("click",()=>{console.log("showSVG");const n=e.$canvas.toSVG();t("#svgImage").html(""+n)}),t("#enlarge-left").on("click",()=>{const n=parseInt(t("#enlargeValue").val(),10);e.$canvas.transformCanvas("left",n)}),t("#enlarge-top").on("click",()=>{const n=parseInt(t("#enlargeValue").val(),10);e.$canvas.transformCanvas("top",n)}),t("#enlarge-right").on("click",()=>{const n=parseInt(t("#enlargeValue").val(),10);e.$canvas.transformCanvas("right",n)}),t("#enlarge-bottom").on("click",()=>{const n=parseInt(t("#enlargeValue").val(),10);e.$canvas.transformCanvas("bottom",n)}),t("#crop-canvas").on("click",()=>{e.cropCanvas()}),t("#mode-select").on("click",()=>{e.$canvas.isDrawingMode=!1,e.drawWithTouch=!1}),t("#mode-drawWithTouch").on("click",()=>{e.drawWithTouch=!0})},a=e=>{const n=e.$canvas;t("#pen-1").on("click",()=>{n.freeDrawingBrush=new fabric.PencilBrush(n),n.freeDrawingBrush.color="black",n.freeDrawingBrush.width=2,n.isDrawingMode=!0}),t("#pen-2").on("click",()=>{n.freeDrawingBrush=new fabric.PencilBrush(n),n.freeDrawingBrush.color="red",n.freeDrawingBrush.width=2,n.isDrawingMode=!0}),t("#pen-3").on("click",()=>{n.freeDrawingBrush=new fabric.PencilBrush(n),n.freeDrawingBrush.color="green",n.freeDrawingBrush.width=2,n.isDrawingMode=!0}),t("#pen-4").on("click",()=>{n.freeDrawingBrush=new fabric.PencilBrush(n),n.freeDrawingBrush.color="blue",n.freeDrawingBrush.width=2,n.isDrawingMode=!0}),t("#marker-1").on("click",()=>{n.freeDrawingBrush=new fabric.PencilBrush(n),n.freeDrawingBrush.color="rgba(255, 255, 0, 0.5)",n.freeDrawingBrush.width=10,n.isDrawingMode=!0}),t("#marker-2").on("click",()=>{n.freeDrawingBrush=new fabric.PencilBrush(n),n.freeDrawingBrush.color="rgba(241,229,170, 0.5)",n.freeDrawingBrush.width=10,n.isDrawingMode=!0}),t("#marker-3").on("click",()=>{n.freeDrawingBrush=new fabric.PencilBrush(n),n.freeDrawingBrush.color="rgba(51,204,0, 0.5)",n.freeDrawingBrush.width=10,n.isDrawingMode=!0}),t("#marker-4").on("click",()=>{n.freeDrawingBrush=new fabric.PencilBrush(n),n.freeDrawingBrush.color="rgba(75,141,242, 0.5)",n.freeDrawingBrush.width=10,n.isDrawingMode=!0}),t("#eraser").on("click",()=>{const{EraserBrush:t}=Object(r.a)(fabric),e=new t(n);e.width=10,e.color="rgb(236,195,195)",n.freeDrawingBrush=e,n.isDrawingMode=!0}),t("#eraser-path").on("click",()=>{const{EraserBrushPath:t}=Object(o.a)(fabric),e=new t(n);e.width=8,e.color="rgba(236,195,220, 20)",n.freeDrawingBrush=e,n.isDrawingMode=!0}),t("#text-1").on("click",()=>{e.activatePlaceTextBox=!0,n.isDrawingMode=!1})}}).call(this,n(1))},function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){"use strict";var r=n(5),o=n.n(r);e.a=t=>{const e=t.util.createClass(t.Group,{original:null,erasedPath:null,initialize:function(t,e,n,r){this.original=t,this.erasedPath=e,this.callSuper("initialize",[this.original,this.erasedPath],n,r)},_calcBounds:function(t){const e=[],n=[],r=["tr","br","bl","tl"],o=r.length;let i=this.original;i.setCoords(!0);for(let t=0;t<o;t++){const o=r[t];e.push(i.aCoords[o].x),n.push(i.aCoords[o].y)}console.log("_calcBounds",e,n,r,o,t),this._getBounds(e,n,t)}}),n=t.util.createClass(t.PencilBrush,{_finalizeAndAddPath:async function(){this.canvas.contextTop.closePath(),this.decimate&&(this._points=this.decimatePoints(this._points,this.decimate));var n=this.convertPointsToSVGPath(this._points).join("");if("M 0 0 Q 0 0 0 0 L 0 0"===n)return void this.canvas.requestRenderAll();var i=this.createPath(n);i.globalCompositeOperation="destination-out",i.selectable=!1,i.evented=!1,i.absolutePositioned=!0;const a=this.canvas.getObjects().filter(e=>!(e instanceof t.Textbox)&&(!(e instanceof t.Text)&&(!(e instanceof t.IText)&&!!e.intersectsWithObject(i,!0))));for(const t of a){const n=o()(i),a=new e(t,n),s=a.toDataURL({withoutTransform:!0}),c=await r(s);console.log(n,a,"fabricimage",c),console.image(s),c.set({left:a.left,top:a.top}),this.canvas.remove(t),this.canvas.add(c)}this.canvas.renderAll(),this.canvas.clearContext(this.canvas.contextTop),this._resetShadow()}}),r=(e,n)=>new Promise(r=>{t.Image.fromURL(e,r,n)});return{EraserBrush:n,ErasedGroup:e}}},function(t,e,n){(function(t,n){var r="[object Arguments]",o="[object Function]",i="[object GeneratorFunction]",a="[object Map]",s="[object Set]",c=/\w*$/,l=/^\[object .+?Constructor\]$/,h=/^(?:0|[1-9]\d*)$/,u={};u[r]=u["[object Array]"]=u["[object ArrayBuffer]"]=u["[object DataView]"]=u["[object Boolean]"]=u["[object Date]"]=u["[object Float32Array]"]=u["[object Float64Array]"]=u["[object Int8Array]"]=u["[object Int16Array]"]=u["[object Int32Array]"]=u[a]=u["[object Number]"]=u["[object Object]"]=u["[object RegExp]"]=u[s]=u["[object String]"]=u["[object Symbol]"]=u["[object Uint8Array]"]=u["[object Uint8ClampedArray]"]=u["[object Uint16Array]"]=u["[object Uint32Array]"]=!0,u["[object Error]"]=u[o]=u["[object WeakMap]"]=!1;var f="object"==typeof t&&t&&t.Object===Object&&t,d="object"==typeof self&&self&&self.Object===Object&&self,g=f||d||Function("return this")(),p=e&&!e.nodeType&&e,v=p&&"object"==typeof n&&n&&!n.nodeType&&n,b=v&&v.exports===p;function w(t,e){return t.set(e[0],e[1]),t}function y(t,e){return t.add(e),t}function m(t,e,n,r){var o=-1,i=t?t.length:0;for(r&&i&&(n=t[++o]);++o<i;)n=e(n,t[o],o,t);return n}function _(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}function j(t){var e=-1,n=Array(t.size);return t.forEach((function(t,r){n[++e]=[r,t]})),n}function x(t,e){return function(n){return t(e(n))}}function P(t){var e=-1,n=Array(t.size);return t.forEach((function(t){n[++e]=t})),n}var C,O=Array.prototype,B=Function.prototype,D=Object.prototype,T=g["__core-js_shared__"],S=(C=/[^.]+$/.exec(T&&T.keys&&T.keys.IE_PROTO||""))?"Symbol(src)_1."+C:"",A=B.toString,E=D.hasOwnProperty,$=D.toString,k=RegExp("^"+A.call(E).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),I=b?g.Buffer:void 0,M=g.Symbol,W=g.Uint8Array,z=x(Object.getPrototypeOf,Object),H=Object.create,F=D.propertyIsEnumerable,V=O.splice,N=Object.getOwnPropertySymbols,U=I?I.isBuffer:void 0,R=x(Object.keys,Object),G=vt(g,"DataView"),L=vt(g,"Map"),Y=vt(g,"Promise"),X=vt(g,"Set"),Z=vt(g,"WeakMap"),J=vt(Object,"create"),q=_t(G),Q=_t(L),K=_t(Y),tt=_t(X),et=_t(Z),nt=M?M.prototype:void 0,rt=nt?nt.valueOf:void 0;function ot(t){var e=-1,n=t?t.length:0;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}function it(t){var e=-1,n=t?t.length:0;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}function at(t){var e=-1,n=t?t.length:0;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}function st(t){this.__data__=new it(t)}function ct(t,e){var n=xt(t)||function(t){return function(t){return function(t){return!!t&&"object"==typeof t}(t)&&Pt(t)}(t)&&E.call(t,"callee")&&(!F.call(t,"callee")||$.call(t)==r)}(t)?function(t,e){for(var n=-1,r=Array(t);++n<t;)r[n]=e(n);return r}(t.length,String):[],o=n.length,i=!!o;for(var a in t)!e&&!E.call(t,a)||i&&("length"==a||yt(a,o))||n.push(a);return n}function lt(t,e,n){var r=t[e];E.call(t,e)&&jt(r,n)&&(void 0!==n||e in t)||(t[e]=n)}function ht(t,e){for(var n=t.length;n--;)if(jt(t[n][0],e))return n;return-1}function ut(t,e,n,l,h,f,d){var g;if(l&&(g=f?l(t,h,f,d):l(t)),void 0!==g)return g;if(!Bt(t))return t;var p=xt(t);if(p){if(g=function(t){var e=t.length,n=t.constructor(e);e&&"string"==typeof t[0]&&E.call(t,"index")&&(n.index=t.index,n.input=t.input);return n}(t),!e)return function(t,e){var n=-1,r=t.length;e||(e=Array(r));for(;++n<r;)e[n]=t[n];return e}(t,g)}else{var v=wt(t),b=v==o||v==i;if(Ct(t))return function(t,e){if(e)return t.slice();var n=new t.constructor(t.length);return t.copy(n),n}(t,e);if("[object Object]"==v||v==r||b&&!f){if(_(t))return f?t:{};if(g=function(t){return"function"!=typeof t.constructor||mt(t)?{}:(e=z(t),Bt(e)?H(e):{});var e}(b?{}:t),!e)return function(t,e){return gt(t,bt(t),e)}(t,function(t,e){return t&&gt(e,Dt(e),t)}(g,t))}else{if(!u[v])return f?t:{};g=function(t,e,n,r){var o=t.constructor;switch(e){case"[object ArrayBuffer]":return dt(t);case"[object Boolean]":case"[object Date]":return new o(+t);case"[object DataView]":return function(t,e){var n=e?dt(t.buffer):t.buffer;return new t.constructor(n,t.byteOffset,t.byteLength)}(t,r);case"[object Float32Array]":case"[object Float64Array]":case"[object Int8Array]":case"[object Int16Array]":case"[object Int32Array]":case"[object Uint8Array]":case"[object Uint8ClampedArray]":case"[object Uint16Array]":case"[object Uint32Array]":return function(t,e){var n=e?dt(t.buffer):t.buffer;return new t.constructor(n,t.byteOffset,t.length)}(t,r);case a:return function(t,e,n){return m(e?n(j(t),!0):j(t),w,new t.constructor)}(t,r,n);case"[object Number]":case"[object String]":return new o(t);case"[object RegExp]":return function(t){var e=new t.constructor(t.source,c.exec(t));return e.lastIndex=t.lastIndex,e}(t);case s:return function(t,e,n){return m(e?n(P(t),!0):P(t),y,new t.constructor)}(t,r,n);case"[object Symbol]":return i=t,rt?Object(rt.call(i)):{}}var i}(t,v,ut,e)}}d||(d=new st);var x=d.get(t);if(x)return x;if(d.set(t,g),!p)var C=n?function(t){return function(t,e,n){var r=e(t);return xt(t)?r:function(t,e){for(var n=-1,r=e.length,o=t.length;++n<r;)t[o+n]=e[n];return t}(r,n(t))}(t,Dt,bt)}(t):Dt(t);return function(t,e){for(var n=-1,r=t?t.length:0;++n<r&&!1!==e(t[n],n,t););}(C||t,(function(r,o){C&&(r=t[o=r]),lt(g,o,ut(r,e,n,l,o,t,d))})),g}function ft(t){return!(!Bt(t)||(e=t,S&&S in e))&&(Ot(t)||_(t)?k:l).test(_t(t));var e}function dt(t){var e=new t.constructor(t.byteLength);return new W(e).set(new W(t)),e}function gt(t,e,n,r){n||(n={});for(var o=-1,i=e.length;++o<i;){var a=e[o],s=r?r(n[a],t[a],a,n,t):void 0;lt(n,a,void 0===s?t[a]:s)}return n}function pt(t,e){var n,r,o=t.__data__;return("string"==(r=typeof(n=e))||"number"==r||"symbol"==r||"boolean"==r?"__proto__"!==n:null===n)?o["string"==typeof e?"string":"hash"]:o.map}function vt(t,e){var n=function(t,e){return null==t?void 0:t[e]}(t,e);return ft(n)?n:void 0}ot.prototype.clear=function(){this.__data__=J?J(null):{}},ot.prototype.delete=function(t){return this.has(t)&&delete this.__data__[t]},ot.prototype.get=function(t){var e=this.__data__;if(J){var n=e[t];return"__lodash_hash_undefined__"===n?void 0:n}return E.call(e,t)?e[t]:void 0},ot.prototype.has=function(t){var e=this.__data__;return J?void 0!==e[t]:E.call(e,t)},ot.prototype.set=function(t,e){return this.__data__[t]=J&&void 0===e?"__lodash_hash_undefined__":e,this},it.prototype.clear=function(){this.__data__=[]},it.prototype.delete=function(t){var e=this.__data__,n=ht(e,t);return!(n<0)&&(n==e.length-1?e.pop():V.call(e,n,1),!0)},it.prototype.get=function(t){var e=this.__data__,n=ht(e,t);return n<0?void 0:e[n][1]},it.prototype.has=function(t){return ht(this.__data__,t)>-1},it.prototype.set=function(t,e){var n=this.__data__,r=ht(n,t);return r<0?n.push([t,e]):n[r][1]=e,this},at.prototype.clear=function(){this.__data__={hash:new ot,map:new(L||it),string:new ot}},at.prototype.delete=function(t){return pt(this,t).delete(t)},at.prototype.get=function(t){return pt(this,t).get(t)},at.prototype.has=function(t){return pt(this,t).has(t)},at.prototype.set=function(t,e){return pt(this,t).set(t,e),this},st.prototype.clear=function(){this.__data__=new it},st.prototype.delete=function(t){return this.__data__.delete(t)},st.prototype.get=function(t){return this.__data__.get(t)},st.prototype.has=function(t){return this.__data__.has(t)},st.prototype.set=function(t,e){var n=this.__data__;if(n instanceof it){var r=n.__data__;if(!L||r.length<199)return r.push([t,e]),this;n=this.__data__=new at(r)}return n.set(t,e),this};var bt=N?x(N,Object):function(){return[]},wt=function(t){return $.call(t)};function yt(t,e){return!!(e=null==e?9007199254740991:e)&&("number"==typeof t||h.test(t))&&t>-1&&t%1==0&&t<e}function mt(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||D)}function _t(t){if(null!=t){try{return A.call(t)}catch(t){}try{return t+""}catch(t){}}return""}function jt(t,e){return t===e||t!=t&&e!=e}(G&&"[object DataView]"!=wt(new G(new ArrayBuffer(1)))||L&&wt(new L)!=a||Y&&"[object Promise]"!=wt(Y.resolve())||X&&wt(new X)!=s||Z&&"[object WeakMap]"!=wt(new Z))&&(wt=function(t){var e=$.call(t),n="[object Object]"==e?t.constructor:void 0,r=n?_t(n):void 0;if(r)switch(r){case q:return"[object DataView]";case Q:return a;case K:return"[object Promise]";case tt:return s;case et:return"[object WeakMap]"}return e});var xt=Array.isArray;function Pt(t){return null!=t&&function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=9007199254740991}(t.length)&&!Ot(t)}var Ct=U||function(){return!1};function Ot(t){var e=Bt(t)?$.call(t):"";return e==o||e==i}function Bt(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function Dt(t){return Pt(t)?ct(t):function(t){if(!mt(t))return R(t);var e=[];for(var n in Object(t))E.call(t,n)&&"constructor"!=n&&e.push(n);return e}(t)}n.exports=function(t){return ut(t,!0,!0)}}).call(this,n(3),n(11)(t))},function(t,e,n){"use strict";e.a=t=>({EraserBrushPath:t.util.createClass(t.PencilBrush,{_finalizeAndAddPath:async function(){this.canvas.contextTop.closePath(),this.decimate&&(this._points=this.decimatePoints(this._points,this.decimate));var e=this.convertPointsToSVGPath(this._points).join("");if("M 0 0 Q 0 0 0 0 L 0 0"===e)return void this.canvas.requestRenderAll();var n=this.createPath(e);n.globalCompositeOperation="destination-out",n.selectable=!1,n.evented=!1,n.absolutePositioned=!0;const r=this.canvas.getObjects().filter(e=>!(e instanceof t.Textbox)&&(!(e instanceof t.Text)&&(!(e instanceof t.IText)&&!!e.intersectsWithObject(n,!0))));for(const t of r)this.canvas.remove(t);this.canvas.renderAll(),this.canvas.clearContext(this.canvas.contextTop),this._resetShadow()}})})},function(t,e,n){"use strict";(function(t){n.d(e,"a",(function(){return l}));var r=n(8),o=n.n(r),i=n(0),a=n.n(i),s=(n(13),n(9)),c=document.createElement("img");c.src=s.a;EventTarget;class l{constructor(t,e,n){this.$canvas=t,this.$canvasContainer=n,this.$parent=e,this.isDragging,this.selection,this.lastPosX,this.lastPosY,this.startPosX=0,this.startPosY=0,this.numberOfPanEvents,this.lastScale=1,this.fonts=["Times New Roman","Arial","Verdana","Calibri","Consolas","Comic Sans MS"],this.width=this.scaledWidth=1500,this.height=this.scaledHeight=1500,this.drawWithTouch=!1,this.activatePlaceTextBox=!1,this.handlePointerEventBefore=this.handlePointerEventBefore.bind(this),this.resizeCanvas=this.resizeCanvas.bind(this),this.handlePinch=this.handlePinch.bind(this),this.handlePinchEnd=this.handlePinchEnd.bind(this),this.handlePanStart=this.handlePanStart.bind(this),this.handlePanning=this.handlePanning.bind(this),this.handlePanEnd=this.handlePanEnd.bind(this),this.transformCanvas=this.transformCanvas.bind(this),this.resetZoom=this.resetZoom.bind(this),this.cropCanvas=this.cropCanvas.bind(this),this.placeTextBox=this.placeTextBox.bind(this)}overrideFabric(){fabric.Object.prototype.controls.deleteControl=new fabric.Control({x:.5,y:-.5,offsetY:16,cursorStyle:"pointer",mouseUpHandler:this.deleteObject,render:this.renderIcon,cornerSize:24})}renderIcon(t,e,n,r,o){var i=this.cornerSize;t.save(),t.translate(e,n),t.rotate(fabric.util.degreesToRadians(o.angle)),t.drawImage(c,-i/2,-i/2,i,i),t.restore()}deleteObject(t,e){var n=e.canvas;n.remove(e),n.requestRenderAll()}initFabric(){this.overrideFabric();const t=this.$canvas.get(0);this.canvasElement=t;const e=new fabric.Canvas(t,{isDrawingMode:!1,allowTouchScrolling:!0,transparentCorners:!1});this.$canvas=e,e.on("mouse:down:before",this.handlePointerEventBefore),this.hammer=new Hammer.Manager(e.upperCanvasEl);var n=new Hammer.Pinch,r=new Hammer.Pan;return this.hammer.add([n,r]),this.hammer.on("pinchmove",o()(this.handlePinch,20)),this.hammer.on("pinchend",a()(this.handlePinchEnd,200)),this.hammer.on("panstart",this.handlePanStart),this.hammer.on("pan",this.handlePanning),this.hammer.on("panend",this.handlePanEnd),e.transformCanvas=this.transformCanvas,this}transformCanvas(t,e){console.log("transforming",t,e);const n=this.$canvas;this.resetZoom();const r=n.getObjects();for(let o=0;o<r.length;o++){const r=n.item(o).setCoords();console.log("tc, item",r),"top"===t&&(r.top=r.top+e),"left"===t&&(r.left=r.left+e)}let o=this.scaledWidth,i=this.scaledHeight;"top"===t||"bottom"===t?i=this.scaledHeight+e:"left"!==t&&"right"!==t||(o=this.scaledWidth+e),this.scaledWidth=this.width=o,this.scaledHeight=this.height=i,n.setWidth(o),n.setHeight(i),this.$canvasContainer.width(o).height(i),n.renderAll(),console.log("called tc",t,e)}resetZoom(){const t=this.$canvas;t.setZoom(1),t.setWidth(this.width),t.setHeight(this.height),this.scaledWidth=this.width,this.scaledHeight=this.height,this.lastScale=1,this.$canvasContainer.width(this.width).height(this.height)}handlePointerEventBefore(t){const e=this.$canvas,n=this.recognizeInput(t.e);if(console.log("mdb",t,t.e,"inputType",n),this.activatePlaceTextBox&&t&&t.absolutePointer)return this.placeTextBox(t.absolutePointer.x,t.absolutePointer.y),void(this.activatePlaceTextBox=!1);if("touch"===n)this.drawWithTouch?e.isDrawingMode=!0:(console.log("mdb touch"),e.isDrawingMode=!1,e.selection=!1,t.target&&e&&e.deactivateAll().renderAll());else if("pen"===n)console.log("mdb pen"),e.isDrawingMode=!0;else{if("mouse"!==n)throw console.log("mdb input type not recognized!"),new Error("input type not recognized!");console.log("mdb mouse, draw")}}placeTextBox(t,e){const n=this.$canvas;n.add(new fabric.IText("Tap and Type",{fontFamily:"Arial",fontSize:15,left:t,top:e})),n.isDrawingMode=!1}handlePinch(t){console.log("hp",t);const e=this.$canvas;console.log("pinch",t,"pinchingi scale",this.lastScale,t.scale);let n=null;n=new fabric.Point(0,0),e.zoomToPoint(n,this.lastScale*t.scale)}handlePinchEnd(t){const e=this.$canvas;console.log("hpe",t),this.lastScale=this.lastScale*t.scale,console.log("pinchend",this.lastScale,t.scale,t),this.scaledWidth=this.scaledWidth*t.scale,this.scaledHeight=this.scaledHeight*t.scale,e.setWidth(this.scaledWidth),e.setHeight(this.scaledHeight),this.$canvasContainer.width(this.scaledWidth).height(this.scaledHeight)}handlePanStart(e){const n=this.$canvas;if(console.log("panstart",e),"touch"===e.pointerType&&!this.drawWithTouch){n.isDrawingMode=!1,n.isDragging=!0,n.selection=!1,this.selection=!1;var r=t("#parentContainer").get(0);this.startPosX=r.scrollLeft,this.startPosY=r.scrollTop}}handlePanning(e){const n=this.$canvas;if("touch"===e.pointerType&&n.isDragging){const o=1,i=this.startPosX-e.deltaX*o,a=this.startPosY-e.deltaY*o;var r=t("#parentContainer");r.scrollLeft(i),r.scrollTop(a),n.requestRenderAll()}}async handlePanEnd(e){const n=this.$canvas;if(console.log("panend",e),"touch"===e.pointerType){n.isDragging=!1,n.selection=!0;var r=t("#parentContainer").get(0);this.startPosX=r.scrollLeft,this.startPosY=r.scrollTop}}recognizeInput(t){if(console.log("recognizeInput Touchevent",t),!t.touches)return console.log("recognizeInput","mouse"),"mouse";if(t.touches.length>1)return console.log("recognizeInput","touch"),"touch";if(1===t.touches.length){const e=t.touches[0]||{};return console.log("recognizeInput Touchevent",e),.5===e.radiusX&&.5===e.radiusY?(console.log("recognizeInput","pen"),"pen"):(console.log("recognizeInput","touch"),"touch")}}resizeCanvas(){const t=this.$canvas,e=this.$parent.width(),n=this.$parent.height();console.log(`setting canvas to ${e} x ${n}px`),t.setWidth(1500),t.setHeight(1500),t.renderAll()}async cropCanvas(){console.log("cropCanvas");const t=this.$canvas.getObjects(),e={tl:{x:1/0,y:1/0},br:{x:0,y:0}};for(let n=0;n<t.length;n++){const r=t[n],o=r.aCoords.tl,i=r.aCoords.br;console.log("cC, item",o,i),o.x<e.tl.x&&(e.tl.x=o.x),o.y<e.tl.y&&(e.tl.y=o.y),i.x>e.br.x&&(e.br.x=i.x),i.y>e.br.y&&(e.br.y=i.y)}console.log("cC, bounds:",e),this.transformCanvas("left",-e.tl.x),this.transformCanvas("top",-e.tl.y),this.transformCanvas("right",-(this.width-e.br.x+e.tl.x)),this.transformCanvas("bottom",-(this.height-e.br.y+e.tl.y))}}}).call(this,n(1))},function(t,e,n){(function(e){var n=/^\s+|\s+$/g,r=/^[-+]0x[0-9a-f]+$/i,o=/^0b[01]+$/i,i=/^0o[0-7]+$/i,a=parseInt,s="object"==typeof e&&e&&e.Object===Object&&e,c="object"==typeof self&&self&&self.Object===Object&&self,l=s||c||Function("return this")(),h=Object.prototype.toString,u=Math.max,f=Math.min,d=function(){return l.Date.now()};function g(t,e,n){var r,o,i,a,s,c,l=0,h=!1,g=!1,b=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function w(e){var n=r,i=o;return r=o=void 0,l=e,a=t.apply(i,n)}function y(t){return l=t,s=setTimeout(_,e),h?w(t):a}function m(t){var n=t-c;return void 0===c||n>=e||n<0||g&&t-l>=i}function _(){var t=d();if(m(t))return j(t);s=setTimeout(_,function(t){var n=e-(t-c);return g?f(n,i-(t-l)):n}(t))}function j(t){return s=void 0,b&&r?w(t):(r=o=void 0,a)}function x(){var t=d(),n=m(t);if(r=arguments,o=this,c=t,n){if(void 0===s)return y(c);if(g)return s=setTimeout(_,e),w(c)}return void 0===s&&(s=setTimeout(_,e)),a}return e=v(e)||0,p(n)&&(h=!!n.leading,i=(g="maxWait"in n)?u(v(n.maxWait)||0,e):i,b="trailing"in n?!!n.trailing:b),x.cancel=function(){void 0!==s&&clearTimeout(s),l=0,r=c=o=s=void 0},x.flush=function(){return void 0===s?a:j(d())},x}function p(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function v(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&"[object Symbol]"==h.call(t)}(t))return NaN;if(p(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=p(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(n,"");var s=o.test(t);return s||i.test(t)?a(t.slice(2),s?2:8):r.test(t)?NaN:+t}t.exports=function(t,e,n){var r=!0,o=!0;if("function"!=typeof t)throw new TypeError("Expected a function");return p(n)&&(r="leading"in n?!!n.leading:r,o="trailing"in n?!!n.trailing:o),g(t,e,{leading:r,maxWait:e,trailing:o})}}).call(this,n(3))},function(t,e,n){"use strict";e.a="data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E"},function(t,e,n){"use strict";n.r(e),function(t){var e=n(2),r=(n(12),n(7)),o=n(0),i=n.n(o);setTimeout(()=>{const n=new r.a(t(".canvasElement"),t("#parentContainer"),t("#canvasContainer")),o=n.initFabric(),a=o.$canvas;a.setWidth(n.width),a.setHeight(n.height),Object(e.a)(o),Object(e.b)(o),t("#pkg-version").html("v0.0.5"),a.on("after:render",i()((function(){console.log("after:render outside, call a save function or what not")}),1e3)),window.fabric=fabric,window.myCanvas=a})}.call(this,n(1))},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},function(t,e,n){"use strict"},function(t,e,n){"use strict"}]);
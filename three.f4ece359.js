parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"c9v3":[function(require,module,exports) {
function t(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function n(t,n){for(var i=0;i<n.length;i++){var e=n[i];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}function i(t,i,e){return i&&n(t.prototype,i),e&&n(t,e),t}for(var e="#000",r=.005,a=1,o=function(){function n(i,e){t(this,n),this.x=i,this.y=e,this.angle=2*Math.PI*Math.random(),this.vx=(a/4+Math.random()*(1-a))*Math.cos(this.angle),this.vy=a+Math.random()*(1-a),this.r=16+5*Math.random()}return i(n,[{key:"update",value:function(){this.x+=this.vx,this.y+=this.vy,this.r-=r}}]),n}(),h=function(t,n){return Math.random()*(n-t)+t},s=50,l=function(){function n(i,e){t(this,n),this.lx=i+s*Math.random()-s,this.rx=i+s*Math.random()-s,this.thickness=e,this.r=f}return i(n,[{key:"update",value:function(t,n,i){var e=this.thickness;u.beginPath(),u.moveTo(this.lx,t.y),u.lineTo(this.rx,n.y),u.lineTo(this.rx+e,n.y),u.lineTo(this.lx+e,t.y),u.fill()}}]),n}(),c=document.getElementById("canvas"),u=c.getContext("2d"),f=c.width=window.innerWidth,d=c.height=window.innerHeight,y={x:f/2,y:d/2},x={x:f/2,y:d/2},v=[],w=0,m=1,g=[],M=Math.floor(f/100),p=0;p<M;p++)g.push(new l(p*(f/M)+(50*Math.random()-50),h(5,50)));var b=50,k=50;function P(){u.clearRect(0,0,f,d);var t=(1-x.y/d)/2;g.forEach(function(n){n.update({y:d*t},{y:d*(1-t)},2*t)}),u.fillRect(0,0,f,d*t+30),u.fillRect(0,d*(1-t)-30,f,d*t+30),w===m&&(v.push(new o(y.x,y.y)),w=0,m=3+Math.floor(5*Math.random())),w++;for(var n=0;n<v.length;n++){var i=v[n];u.fillStyle=e,u.beginPath();var r=i.r>=0?i.r:0;u.arc(i.x,i.y,r,0,2*Math.PI,!1),u.fill(),i.update()}y.y=-10,y.x+=b,y.x>f-k?(y.x=f-k,b*=-1):y.x<k&&(y.x=k,b*=-1),T(),requestAnimationFrame(P)}function T(){for(var t=0;t<v.length;t++){var n=v[t];(n.x+n.r<0||n.x-n.r>f||n.y+n.r<0||n.y-n.r>d||n.r<=0)&&v.splice(t,1)}}P(),window.onresize=function(){f=c.width=window.innerWidth,d=c.height=window.innerHeight,y={x:f/2,y:d/2}},window.addEventListener("mousemove",function(t){x.x=t.clientX,x.y=t.clientY},!1);
},{}]},{},["c9v3"], null)
//# sourceMappingURL=three.f4ece359.js.map
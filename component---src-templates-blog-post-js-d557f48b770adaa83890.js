(self.webpackChunkgatsby_starter_blog=self.webpackChunkgatsby_starter_blog||[]).push([[751],{4967:function(e,t,r){"use strict";var n=r(6540),o=r(4794);t.A=()=>{var e,t;const r=(0,o.useStaticQuery)("230163734"),a=null===(e=r.site.siteMetadata)||void 0===e?void 0:e.author,s=null===(t=r.site.siteMetadata)||void 0===t?void 0:t.social;return n.createElement("div",{className:"bio"},(null==a?void 0:a.name)&&n.createElement("p",null,n.createElement("strong",null,a.name)," ",(null==a?void 0:a.summary)||null," ",n.createElement("a",{href:`https://github.com/${(null==s?void 0:s.github)||""}`},n.createElement("br",null),n.createElement("img",{src:"/GitHub-Mark-32px.png"}))))}},2200:function(e,t,r){"use strict";r.r(t),r.d(t,{Head:function(){return rr},default:function(){return nr}});var n=r(6540),o=r(4794),a=r(5019),s=r.n(a),i=r(4967),c=r(5025),u=r(7528);var l=function(){return l=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},l.apply(this,arguments)};Object.create;function f(e,t,r){if(r||2===arguments.length)for(var n,o=0,a=t.length;o<a;o++)!n&&o in t||(n||(n=Array.prototype.slice.call(t,0,o)),n[o]=t[o]);return e.concat(n||Array.prototype.slice.call(t))}Object.create;"function"==typeof SuppressedError&&SuppressedError;var p=r(2833),d=r.n(p),h="-ms-",m="-moz-",g="-webkit-",v="comm",y="rule",b="decl",S="@keyframes",w=Math.abs,E=String.fromCharCode,x=Object.assign;function A(e){return e.trim()}function C(e,t){return(e=t.exec(e))?e[0]:e}function I(e,t,r){return e.replace(t,r)}function P(e,t,r){return e.indexOf(t,r)}function O(e,t){return 0|e.charCodeAt(t)}function k(e,t,r){return e.slice(t,r)}function j(e){return e.length}function R(e){return e.length}function $(e,t){return t.push(e),e}function N(e,t){return e.filter((function(e){return!C(e,t)}))}var _=1,T=1,D=0,z=0,L=0,M="";function F(e,t,r,n,o,a,s,i){return{value:e,root:t,parent:r,type:n,props:o,children:a,line:_,column:T,length:s,return:"",siblings:i}}function G(e,t){return x(F("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function B(e){for(;e.root;)e=G(e.root,{children:[e]});$(e,e.siblings)}function U(){return L=z>0?O(M,--z):0,T--,10===L&&(T=1,_--),L}function W(){return L=z<D?O(M,z++):0,T++,10===L&&(T=1,_++),L}function Y(){return O(M,z)}function H(){return z}function Z(e,t){return k(M,e,t)}function q(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function V(e){return _=T=1,D=j(M=e),z=0,[]}function J(e){return M="",e}function K(e){return A(Z(z-1,ee(91===e?e+2:40===e?e+1:e)))}function Q(e){for(;(L=Y())&&L<33;)W();return q(e)>2||q(L)>3?"":" "}function X(e,t){for(;--t&&W()&&!(L<48||L>102||L>57&&L<65||L>70&&L<97););return Z(e,H()+(t<6&&32==Y()&&32==W()))}function ee(e){for(;W();)switch(L){case e:return z;case 34:case 39:34!==e&&39!==e&&ee(L);break;case 40:41===e&&ee(e);break;case 92:W()}return z}function te(e,t){for(;W()&&e+L!==57&&(e+L!==84||47!==Y()););return"/*"+Z(t,z-1)+"*"+E(47===e?e:W())}function re(e){for(;!q(Y());)W();return Z(e,z)}function ne(e,t){for(var r="",n=0;n<e.length;n++)r+=t(e[n],n,e,t)||"";return r}function oe(e,t,r,n){switch(e.type){case"@layer":if(e.children.length)break;case"@import":case b:return e.return=e.return||e.value;case v:return"";case S:return e.return=e.value+"{"+ne(e.children,n)+"}";case y:if(!j(e.value=e.props.join(",")))return""}return j(r=ne(e.children,n))?e.return=e.value+"{"+r+"}":""}function ae(e,t,r){switch(function(e,t){return 45^O(e,0)?(((t<<2^O(e,0))<<2^O(e,1))<<2^O(e,2))<<2^O(e,3):0}(e,t)){case 5103:return g+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return g+e+e;case 4789:return m+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return g+e+m+e+h+e+e;case 5936:switch(O(e,t+11)){case 114:return g+e+h+I(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return g+e+h+I(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return g+e+h+I(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return g+e+h+e+e;case 6165:return g+e+h+"flex-"+e+e;case 5187:return g+e+I(e,/(\w+).+(:[^]+)/,g+"box-$1$2"+h+"flex-$1$2")+e;case 5443:return g+e+h+"flex-item-"+I(e,/flex-|-self/g,"")+(C(e,/flex-|baseline/)?"":h+"grid-row-"+I(e,/flex-|-self/g,""))+e;case 4675:return g+e+h+"flex-line-pack"+I(e,/align-content|flex-|-self/g,"")+e;case 5548:return g+e+h+I(e,"shrink","negative")+e;case 5292:return g+e+h+I(e,"basis","preferred-size")+e;case 6060:return g+"box-"+I(e,"-grow","")+g+e+h+I(e,"grow","positive")+e;case 4554:return g+I(e,/([^-])(transform)/g,"$1"+g+"$2")+e;case 6187:return I(I(I(e,/(zoom-|grab)/,g+"$1"),/(image-set)/,g+"$1"),e,"")+e;case 5495:case 3959:return I(e,/(image-set\([^]*)/,g+"$1$`$1");case 4968:return I(I(e,/(.+:)(flex-)?(.*)/,g+"box-pack:$3"+h+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+g+e+e;case 4200:if(!C(e,/flex-|baseline/))return h+"grid-column-align"+k(e,t)+e;break;case 2592:case 3360:return h+I(e,"template-","")+e;case 4384:case 3616:return r&&r.some((function(e,r){return t=r,C(e.props,/grid-\w+-end/)}))?~P(e+(r=r[t].value),"span",0)?e:h+I(e,"-start","")+e+h+"grid-row-span:"+(~P(r,"span",0)?C(r,/\d+/):+C(r,/\d+/)-+C(e,/\d+/))+";":h+I(e,"-start","")+e;case 4896:case 4128:return r&&r.some((function(e){return C(e.props,/grid-\w+-start/)}))?e:h+I(I(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return I(e,/(.+)-inline(.+)/,g+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(j(e)-1-t>6)switch(O(e,t+1)){case 109:if(45!==O(e,t+4))break;case 102:return I(e,/(.+:)(.+)-([^]+)/,"$1"+g+"$2-$3$1"+m+(108==O(e,t+3)?"$3":"$2-$3"))+e;case 115:return~P(e,"stretch",0)?ae(I(e,"stretch","fill-available"),t,r)+e:e}break;case 5152:case 5920:return I(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,(function(t,r,n,o,a,s,i){return h+r+":"+n+i+(o?h+r+"-span:"+(a?s:+s-+n)+i:"")+e}));case 4949:if(121===O(e,t+6))return I(e,":",":"+g)+e;break;case 6444:switch(O(e,45===O(e,14)?18:11)){case 120:return I(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+g+(45===O(e,14)?"inline-":"")+"box$3$1"+g+"$2$3$1"+h+"$2box$3")+e;case 100:return I(e,":",":"+h)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return I(e,"scroll-","scroll-snap-")+e}return e}function se(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case b:return void(e.return=ae(e.value,e.length,r));case S:return ne([G(e,{value:I(e.value,"@","@"+g)})],n);case y:if(e.length)return function(e,t){return e.map(t).join("")}(r=e.props,(function(t){switch(C(t,n=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":B(G(e,{props:[I(t,/:(read-\w+)/,":-moz-$1")]})),B(G(e,{props:[t]})),x(e,{props:N(r,n)});break;case"::placeholder":B(G(e,{props:[I(t,/:(plac\w+)/,":"+g+"input-$1")]})),B(G(e,{props:[I(t,/:(plac\w+)/,":-moz-$1")]})),B(G(e,{props:[I(t,/:(plac\w+)/,h+"input-$1")]})),B(G(e,{props:[t]})),x(e,{props:N(r,n)})}return""}))}}function ie(e){return J(ce("",null,null,null,[""],e=V(e),0,[0],e))}function ce(e,t,r,n,o,a,s,i,c){for(var u=0,l=0,f=s,p=0,d=0,h=0,m=1,g=1,v=1,y=0,b="",S=o,x=a,A=n,C=b;g;)switch(h=y,y=W()){case 40:if(108!=h&&58==O(C,f-1)){-1!=P(C+=I(K(y),"&","&\f"),"&\f",w(u?i[u-1]:0))&&(v=-1);break}case 34:case 39:case 91:C+=K(y);break;case 9:case 10:case 13:case 32:C+=Q(h);break;case 92:C+=X(H()-1,7);continue;case 47:switch(Y()){case 42:case 47:$(le(te(W(),H()),t,r,c),c);break;default:C+="/"}break;case 123*m:i[u++]=j(C)*v;case 125*m:case 59:case 0:switch(y){case 0:case 125:g=0;case 59+l:-1==v&&(C=I(C,/\f/g,"")),d>0&&j(C)-f&&$(d>32?fe(C+";",n,r,f-1,c):fe(I(C," ","")+";",n,r,f-2,c),c);break;case 59:C+=";";default:if($(A=ue(C,t,r,u,l,o,i,b,S=[],x=[],f,a),a),123===y)if(0===l)ce(C,t,A,A,S,a,f,i,x);else switch(99===p&&110===O(C,3)?100:p){case 100:case 108:case 109:case 115:ce(e,A,A,n&&$(ue(e,A,A,0,0,o,i,b,o,S=[],f,x),x),o,x,f,i,n?S:x);break;default:ce(C,A,A,A,[""],x,0,i,x)}}u=l=d=0,m=v=1,b=C="",f=s;break;case 58:f=1+j(C),d=h;default:if(m<1)if(123==y)--m;else if(125==y&&0==m++&&125==U())continue;switch(C+=E(y),y*m){case 38:v=l>0?1:(C+="\f",-1);break;case 44:i[u++]=(j(C)-1)*v,v=1;break;case 64:45===Y()&&(C+=K(W())),p=Y(),l=f=j(b=C+=re(H())),y++;break;case 45:45===h&&2==j(C)&&(m=0)}}return a}function ue(e,t,r,n,o,a,s,i,c,u,l,f){for(var p=o-1,d=0===o?a:[""],h=R(d),m=0,g=0,v=0;m<n;++m)for(var b=0,S=k(e,p+1,p=w(g=s[m])),E=e;b<h;++b)(E=A(g>0?d[b]+" "+S:I(S,/&\f/g,d[b])))&&(c[v++]=E);return F(e,t,r,0===o?y:i,c,u,l,f)}function le(e,t,r,n){return F(e,t,r,v,E(L),k(e,2,-2),0,n)}function fe(e,t,r,n,o){return F(e,t,r,b,k(e,0,n),k(e,n+1,-1),n,o)}var pe={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},de="undefined"!=typeof process&&void 0!=={}&&({}.REACT_APP_SC_ATTR||{}.SC_ATTR)||"data-styled",he="active",me="data-styled-version",ge="6.1.13",ve="/*!sc*/\n",ye="undefined"!=typeof window&&"HTMLElement"in window,be=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!=={}&&void 0!=={}.REACT_APP_SC_DISABLE_SPEEDY&&""!=={}.REACT_APP_SC_DISABLE_SPEEDY?"false"!=={}.REACT_APP_SC_DISABLE_SPEEDY&&{}.REACT_APP_SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!=={}&&void 0!=={}.SC_DISABLE_SPEEDY&&""!=={}.SC_DISABLE_SPEEDY&&("false"!=={}.SC_DISABLE_SPEEDY&&{}.SC_DISABLE_SPEEDY)),Se=(new Set,Object.freeze([])),we=Object.freeze({});function Ee(e,t,r){return void 0===r&&(r=we),e.theme!==r.theme&&e.theme||t||r.theme}var xe=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),Ae=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Ce=/(^-|-$)/g;function Ie(e){return e.replace(Ae,"-").replace(Ce,"")}var Pe=/(a)(d)/gi,Oe=function(e){return String.fromCharCode(e+(e>25?39:97))};function ke(e){var t,r="";for(t=Math.abs(e);t>52;t=t/52|0)r=Oe(t%52)+r;return(Oe(t%52)+r).replace(Pe,"$1-$2")}var je,Re=function(e,t){for(var r=t.length;r;)e=33*e^t.charCodeAt(--r);return e},$e=function(e){return Re(5381,e)};function Ne(e){return ke($e(e)>>>0)}function _e(e){return e.displayName||e.name||"Component"}function Te(e){return"string"==typeof e&&!0}var De="function"==typeof Symbol&&Symbol.for,ze=De?Symbol.for("react.memo"):60115,Le=De?Symbol.for("react.forward_ref"):60112,Me={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},Fe={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},Ge={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Be=((je={})[Le]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},je[ze]=Ge,je);function Ue(e){return("type"in(t=e)&&t.type.$$typeof)===ze?Ge:"$$typeof"in e?Be[e.$$typeof]:Me;var t}var We=Object.defineProperty,Ye=Object.getOwnPropertyNames,He=Object.getOwnPropertySymbols,Ze=Object.getOwnPropertyDescriptor,qe=Object.getPrototypeOf,Ve=Object.prototype;function Je(e,t,r){if("string"!=typeof t){if(Ve){var n=qe(t);n&&n!==Ve&&Je(e,n,r)}var o=Ye(t);He&&(o=o.concat(He(t)));for(var a=Ue(e),s=Ue(t),i=0;i<o.length;++i){var c=o[i];if(!(c in Fe||r&&r[c]||s&&c in s||a&&c in a)){var u=Ze(t,c);try{We(e,c,u)}catch(e){}}}}return e}function Ke(e){return"function"==typeof e}function Qe(e){return"object"==typeof e&&"styledComponentId"in e}function Xe(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function et(e,t){if(0===e.length)return"";for(var r=e[0],n=1;n<e.length;n++)r+=t?t+e[n]:e[n];return r}function tt(e){return null!==e&&"object"==typeof e&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function rt(e,t,r){if(void 0===r&&(r=!1),!r&&!tt(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var n=0;n<t.length;n++)e[n]=rt(e[n],t[n]);else if(tt(t))for(var n in t)e[n]=rt(e[n],t[n]);return e}function nt(e,t){Object.defineProperty(e,"toString",{value:t})}function ot(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var at=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e}return e.prototype.indexOfGroup=function(e){for(var t=0,r=0;r<e;r++)t+=this.groupSizes[r];return t},e.prototype.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var r=this.groupSizes,n=r.length,o=n;e>=o;)if((o<<=1)<0)throw ot(16,"".concat(e));this.groupSizes=new Uint32Array(o),this.groupSizes.set(r),this.length=o;for(var a=n;a<o;a++)this.groupSizes[a]=0}for(var s=this.indexOfGroup(e+1),i=(a=0,t.length);a<i;a++)this.tag.insertRule(s,t[a])&&(this.groupSizes[e]++,s++)},e.prototype.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],r=this.indexOfGroup(e),n=r+t;this.groupSizes[e]=0;for(var o=r;o<n;o++)this.tag.deleteRule(r)}},e.prototype.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var r=this.groupSizes[e],n=this.indexOfGroup(e),o=n+r,a=n;a<o;a++)t+="".concat(this.tag.getRule(a)).concat(ve);return t},e}(),st=new Map,it=new Map,ct=1,ut=function(e){if(st.has(e))return st.get(e);for(;it.has(ct);)ct++;var t=ct++;return st.set(e,t),it.set(t,e),t},lt=function(e,t){ct=t+1,st.set(e,t),it.set(t,e)},ft="style[".concat(de,"][").concat(me,'="').concat(ge,'"]'),pt=new RegExp("^".concat(de,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),dt=function(e,t,r){for(var n,o=r.split(","),a=0,s=o.length;a<s;a++)(n=o[a])&&e.registerName(t,n)},ht=function(e,t){for(var r,n=(null!==(r=t.textContent)&&void 0!==r?r:"").split(ve),o=[],a=0,s=n.length;a<s;a++){var i=n[a].trim();if(i){var c=i.match(pt);if(c){var u=0|parseInt(c[1],10),l=c[2];0!==u&&(lt(l,u),dt(e,l,c[3]),e.getTag().insertRules(u,o)),o.length=0}else o.push(i)}}},mt=function(e){for(var t=document.querySelectorAll(ft),r=0,n=t.length;r<n;r++){var o=t[r];o&&o.getAttribute(de)!==he&&(ht(e,o),o.parentNode&&o.parentNode.removeChild(o))}};function gt(){return r.nc}var vt=function(e){var t=document.head,r=e||t,n=document.createElement("style"),o=function(e){var t=Array.from(e.querySelectorAll("style[".concat(de,"]")));return t[t.length-1]}(r),a=void 0!==o?o.nextSibling:null;n.setAttribute(de,he),n.setAttribute(me,ge);var s=gt();return s&&n.setAttribute("nonce",s),r.insertBefore(n,a),n},yt=function(){function e(e){this.element=vt(e),this.element.appendChild(document.createTextNode("")),this.sheet=function(e){if(e.sheet)return e.sheet;for(var t=document.styleSheets,r=0,n=t.length;r<n;r++){var o=t[r];if(o.ownerNode===e)return o}throw ot(17)}(this.element),this.length=0}return e.prototype.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return!1}},e.prototype.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},e.prototype.getRule=function(e){var t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:""},e}(),bt=function(){function e(e){this.element=vt(e),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(e,t){if(e<=this.length&&e>=0){var r=document.createTextNode(t);return this.element.insertBefore(r,this.nodes[e]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},e.prototype.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),St=function(){function e(e){this.rules=[],this.length=0}return e.prototype.insertRule=function(e,t){return e<=this.length&&(this.rules.splice(e,0,t),this.length++,!0)},e.prototype.deleteRule=function(e){this.rules.splice(e,1),this.length--},e.prototype.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),wt=ye,Et={isServer:!ye,useCSSOMInjection:!be},xt=function(){function e(e,t,r){void 0===e&&(e=we),void 0===t&&(t={});var n=this;this.options=l(l({},Et),e),this.gs=t,this.names=new Map(r),this.server=!!e.isServer,!this.server&&ye&&wt&&(wt=!1,mt(this)),nt(this,(function(){return function(e){for(var t=e.getTag(),r=t.length,n="",o=function(r){var o=function(e){return it.get(e)}(r);if(void 0===o)return"continue";var a=e.names.get(o),s=t.getGroup(r);if(void 0===a||!a.size||0===s.length)return"continue";var i="".concat(de,".g").concat(r,'[id="').concat(o,'"]'),c="";void 0!==a&&a.forEach((function(e){e.length>0&&(c+="".concat(e,","))})),n+="".concat(s).concat(i,'{content:"').concat(c,'"}').concat(ve)},a=0;a<r;a++)o(a);return n}(n)}))}return e.registerId=function(e){return ut(e)},e.prototype.rehydrate=function(){!this.server&&ye&&mt(this)},e.prototype.reconstructWithOptions=function(t,r){return void 0===r&&(r=!0),new e(l(l({},this.options),t),this.gs,r&&this.names||void 0)},e.prototype.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(e=function(e){var t=e.useCSSOMInjection,r=e.target;return e.isServer?new St(r):t?new yt(r):new bt(r)}(this.options),new at(e)));var e},e.prototype.hasNameForId=function(e,t){return this.names.has(e)&&this.names.get(e).has(t)},e.prototype.registerName=function(e,t){if(ut(e),this.names.has(e))this.names.get(e).add(t);else{var r=new Set;r.add(t),this.names.set(e,r)}},e.prototype.insertRules=function(e,t,r){this.registerName(e,t),this.getTag().insertRules(ut(e),r)},e.prototype.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},e.prototype.clearRules=function(e){this.getTag().clearGroup(ut(e)),this.clearNames(e)},e.prototype.clearTag=function(){this.tag=void 0},e}(),At=/&/g,Ct=/^\s*\/\/.*$/gm;function It(e,t){return e.map((function(e){return"rule"===e.type&&(e.value="".concat(t," ").concat(e.value),e.value=e.value.replaceAll(",",",".concat(t," ")),e.props=e.props.map((function(e){return"".concat(t," ").concat(e)}))),Array.isArray(e.children)&&"@keyframes"!==e.type&&(e.children=It(e.children,t)),e}))}function Pt(e){var t,r,n,o=void 0===e?we:e,a=o.options,s=void 0===a?we:a,i=o.plugins,c=void 0===i?Se:i,u=function(e,n,o){return o.startsWith(r)&&o.endsWith(r)&&o.replaceAll(r,"").length>0?".".concat(t):e},l=c.slice();l.push((function(e){e.type===y&&e.value.includes("&")&&(e.props[0]=e.props[0].replace(At,r).replace(n,u))})),s.prefix&&l.push(se),l.push(oe);var f=function(e,o,a,i){void 0===o&&(o=""),void 0===a&&(a=""),void 0===i&&(i="&"),t=i,r=o,n=new RegExp("\\".concat(r,"\\b"),"g");var c=e.replace(Ct,""),u=ie(a||o?"".concat(a," ").concat(o," { ").concat(c," }"):c);s.namespace&&(u=It(u,s.namespace));var f,p,d,h=[];return ne(u,(f=l.concat((d=function(e){return h.push(e)},function(e){e.root||(e=e.return)&&d(e)})),p=R(f),function(e,t,r,n){for(var o="",a=0;a<p;a++)o+=f[a](e,t,r,n)||"";return o})),h};return f.hash=c.length?c.reduce((function(e,t){return t.name||ot(15),Re(e,t.name)}),5381).toString():"",f}var Ot=new xt,kt=Pt(),jt=n.createContext({shouldForwardProp:void 0,styleSheet:Ot,stylis:kt}),Rt=(jt.Consumer,n.createContext(void 0));function $t(){return(0,n.useContext)(jt)}function Nt(e){var t=(0,n.useState)(e.stylisPlugins),r=t[0],o=t[1],a=$t().styleSheet,s=(0,n.useMemo)((function(){var t=a;return e.sheet?t=e.sheet:e.target&&(t=t.reconstructWithOptions({target:e.target},!1)),e.disableCSSOMInjection&&(t=t.reconstructWithOptions({useCSSOMInjection:!1})),t}),[e.disableCSSOMInjection,e.sheet,e.target,a]),i=(0,n.useMemo)((function(){return Pt({options:{namespace:e.namespace,prefix:e.enableVendorPrefixes},plugins:r})}),[e.enableVendorPrefixes,e.namespace,r]);(0,n.useEffect)((function(){d()(r,e.stylisPlugins)||o(e.stylisPlugins)}),[e.stylisPlugins]);var c=(0,n.useMemo)((function(){return{shouldForwardProp:e.shouldForwardProp,styleSheet:s,stylis:i}}),[e.shouldForwardProp,s,i]);return n.createElement(jt.Provider,{value:c},n.createElement(Rt.Provider,{value:i},e.children))}var _t=function(){function e(e,t){var r=this;this.inject=function(e,t){void 0===t&&(t=kt);var n=r.name+t.hash;e.hasNameForId(r.id,n)||e.insertRules(r.id,n,t(r.rules,n,"@keyframes"))},this.name=e,this.id="sc-keyframes-".concat(e),this.rules=t,nt(this,(function(){throw ot(12,String(r.name))}))}return e.prototype.getName=function(e){return void 0===e&&(e=kt),this.name+e.hash},e}(),Tt=function(e){return e>="A"&&e<="Z"};function Dt(e){for(var t="",r=0;r<e.length;r++){var n=e[r];if(1===r&&"-"===n&&"-"===e[0])return e;Tt(n)?t+="-"+n.toLowerCase():t+=n}return t.startsWith("ms-")?"-"+t:t}var zt=function(e){return null==e||!1===e||""===e},Lt=function(e){var t,r,n=[];for(var o in e){var a=e[o];e.hasOwnProperty(o)&&!zt(a)&&(Array.isArray(a)&&a.isCss||Ke(a)?n.push("".concat(Dt(o),":"),a,";"):tt(a)?n.push.apply(n,f(f(["".concat(o," {")],Lt(a),!1),["}"],!1)):n.push("".concat(Dt(o),": ").concat((t=o,null==(r=a)||"boolean"==typeof r||""===r?"":"number"!=typeof r||0===r||t in pe||t.startsWith("--")?String(r).trim():"".concat(r,"px")),";")))}return n};function Mt(e,t,r,n){return zt(e)?[]:Qe(e)?[".".concat(e.styledComponentId)]:Ke(e)?!Ke(o=e)||o.prototype&&o.prototype.isReactComponent||!t?[e]:Mt(e(t),t,r,n):e instanceof _t?r?(e.inject(r,n),[e.getName(n)]):[e]:tt(e)?Lt(e):Array.isArray(e)?Array.prototype.concat.apply(Se,e.map((function(e){return Mt(e,t,r,n)}))):[e.toString()];var o}function Ft(e){for(var t=0;t<e.length;t+=1){var r=e[t];if(Ke(r)&&!Qe(r))return!1}return!0}var Gt=$e(ge),Bt=function(){function e(e,t,r){this.rules=e,this.staticRulesId="",this.isStatic=(void 0===r||r.isStatic)&&Ft(e),this.componentId=t,this.baseHash=Re(Gt,t),this.baseStyle=r,xt.registerId(t)}return e.prototype.generateAndInjectStyles=function(e,t,r){var n=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,r):"";if(this.isStatic&&!r.hash)if(this.staticRulesId&&t.hasNameForId(this.componentId,this.staticRulesId))n=Xe(n,this.staticRulesId);else{var o=et(Mt(this.rules,e,t,r)),a=ke(Re(this.baseHash,o)>>>0);if(!t.hasNameForId(this.componentId,a)){var s=r(o,".".concat(a),void 0,this.componentId);t.insertRules(this.componentId,a,s)}n=Xe(n,a),this.staticRulesId=a}else{for(var i=Re(this.baseHash,r.hash),c="",u=0;u<this.rules.length;u++){var l=this.rules[u];if("string"==typeof l)c+=l;else if(l){var f=et(Mt(l,e,t,r));i=Re(i,f+u),c+=f}}if(c){var p=ke(i>>>0);t.hasNameForId(this.componentId,p)||t.insertRules(this.componentId,p,r(c,".".concat(p),void 0,this.componentId)),n=Xe(n,p)}}return n},e}(),Ut=n.createContext(void 0);Ut.Consumer;var Wt={};new Set;function Yt(e,t,r){var o=Qe(e),a=e,s=!Te(e),i=t.attrs,c=void 0===i?Se:i,u=t.componentId,f=void 0===u?function(e,t){var r="string"!=typeof e?"sc":Ie(e);Wt[r]=(Wt[r]||0)+1;var n="".concat(r,"-").concat(Ne(ge+r+Wt[r]));return t?"".concat(t,"-").concat(n):n}(t.displayName,t.parentComponentId):u,p=t.displayName,d=void 0===p?function(e){return Te(e)?"styled.".concat(e):"Styled(".concat(_e(e),")")}(e):p,h=t.displayName&&t.componentId?"".concat(Ie(t.displayName),"-").concat(t.componentId):t.componentId||f,m=o&&a.attrs?a.attrs.concat(c).filter(Boolean):c,g=t.shouldForwardProp;if(o&&a.shouldForwardProp){var v=a.shouldForwardProp;if(t.shouldForwardProp){var y=t.shouldForwardProp;g=function(e,t){return v(e,t)&&y(e,t)}}else g=v}var b=new Bt(r,h,o?a.componentStyle:void 0);function S(e,t){return function(e,t,r){var o=e.attrs,a=e.componentStyle,s=e.defaultProps,i=e.foldedComponentIds,c=e.styledComponentId,u=e.target,f=n.useContext(Ut),p=$t(),d=e.shouldForwardProp||p.shouldForwardProp,h=Ee(t,f,s)||we,m=function(e,t,r){for(var n,o=l(l({},t),{className:void 0,theme:r}),a=0;a<e.length;a+=1){var s=Ke(n=e[a])?n(o):n;for(var i in s)o[i]="className"===i?Xe(o[i],s[i]):"style"===i?l(l({},o[i]),s[i]):s[i]}return t.className&&(o.className=Xe(o.className,t.className)),o}(o,t,h),g=m.as||u,v={};for(var y in m)void 0===m[y]||"$"===y[0]||"as"===y||"theme"===y&&m.theme===h||("forwardedAs"===y?v.as=m.forwardedAs:d&&!d(y,g)||(v[y]=m[y]));var b=function(e,t){var r=$t();return e.generateAndInjectStyles(t,r.styleSheet,r.stylis)}(a,m),S=Xe(i,c);return b&&(S+=" "+b),m.className&&(S+=" "+m.className),v[Te(g)&&!xe.has(g)?"class":"className"]=S,v.ref=r,(0,n.createElement)(g,v)}(w,e,t)}S.displayName=d;var w=n.forwardRef(S);return w.attrs=m,w.componentStyle=b,w.displayName=d,w.shouldForwardProp=g,w.foldedComponentIds=o?Xe(a.foldedComponentIds,a.styledComponentId):"",w.styledComponentId=h,w.target=o?a.target:e,Object.defineProperty(w,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(e){this._foldedDefaultProps=o?function(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];for(var n=0,o=t;n<o.length;n++)rt(e,o[n],!0);return e}({},a.defaultProps,e):e}}),nt(w,(function(){return".".concat(w.styledComponentId)})),s&&Je(w,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),w}function Ht(e,t){for(var r=[e[0]],n=0,o=t.length;n<o;n+=1)r.push(t[n],e[n+1]);return r}var Zt=function(e){return Object.assign(e,{isCss:!0})};function qt(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(Ke(e)||tt(e))return Zt(Mt(Ht(Se,f([e],t,!0))));var n=e;return 0===t.length&&1===n.length&&"string"==typeof n[0]?Mt(n):Zt(Mt(Ht(n,t)))}function Vt(e,t,r){if(void 0===r&&(r=we),!t)throw ot(1,t);var n=function(n){for(var o=[],a=1;a<arguments.length;a++)o[a-1]=arguments[a];return e(t,r,qt.apply(void 0,f([n],o,!1)))};return n.attrs=function(n){return Vt(e,t,l(l({},r),{attrs:Array.prototype.concat(r.attrs,n).filter(Boolean)}))},n.withConfig=function(n){return Vt(e,t,l(l({},r),n))},n}var Jt=function(e){return Vt(Yt,e)},Kt=Jt;xe.forEach((function(e){Kt[e]=Jt(e)}));!function(){function e(e,t){this.rules=e,this.componentId=t,this.isStatic=Ft(e),xt.registerId(this.componentId+1)}e.prototype.createStyles=function(e,t,r,n){var o=n(et(Mt(this.rules,t,r,n)),""),a=this.componentId+e;r.insertRules(a,a,o)},e.prototype.removeStyles=function(e,t){t.clearRules(this.componentId+e)},e.prototype.renderStyles=function(e,t,r,n){e>2&&xt.registerId(this.componentId+e),this.removeStyles(e,r),this.createStyles(e,t,r,n)}}();(function(){function e(){var e=this;this._emitSheetCSS=function(){var t=e.instance.toString();if(!t)return"";var r=gt(),n=et([r&&'nonce="'.concat(r,'"'),"".concat(de,'="true"'),"".concat(me,'="').concat(ge,'"')].filter(Boolean)," ");return"<style ".concat(n,">").concat(t,"</style>")},this.getStyleTags=function(){if(e.sealed)throw ot(2);return e._emitSheetCSS()},this.getStyleElement=function(){var t;if(e.sealed)throw ot(2);var r=e.instance.toString();if(!r)return[];var o=((t={})[de]="",t[me]=ge,t.dangerouslySetInnerHTML={__html:r},t),a=gt();return a&&(o.nonce=a),[n.createElement("style",l({},o,{key:"sc-0-0"}))]},this.seal=function(){e.sealed=!0},this.instance=new xt({isServer:!0}),this.sealed=!1}e.prototype.collectStyles=function(e){if(this.sealed)throw ot(2);return n.createElement(Nt,{sheet:this.instance},e)},e.prototype.interleaveWithNodeStream=function(e){throw ot(3)}})(),"__sc-".concat(de,"__");const Qt=Kt.div`
    position: sticky;
    top: 5rem;
    width: 250px;
    a {
      color: #838383;
    }
    a[href="${e=>e.headerUrl}"] {
      color: #1b1b1b;
      font-weight: bold;
    }
    a:hover {
      color: #1b1b1b;
    }
  `;var Xt=function(e){let{post:t,headerUrl:r}=e;return n.createElement("div",{className:"blog-post-tablecontent"},n.createElement(Qt,{dangerouslySetInnerHTML:{__html:t.tableOfContents},headerUrl:r}))},er=r(7387);var tr=function(e){function t(t){var r;return(r=e.call(this,t)||this).commentsEl=n.createRef(),r.state={status:"pending"},r}(0,er.A)(t,e);var r=t.prototype;return r.componentDidMount=function(){const e=document.createElement("script");e.onload=()=>this.setState({status:"success"}),e.onerror=()=>this.setState({status:"failed"}),e.async=!0,e.src="https://utteranc.es/client.js",e.setAttribute("repo","jdalma/jdalma.github.io"),e.setAttribute("issue-term","title"),e.setAttribute("theme","github-light"),e.setAttribute("crossorigin","anonymous"),this.commentsEl.current.appendChild(e)},r.render=function(){const{status:e}=this.state;return n.createElement("div",{className:"comments-wrapper"},"failed"===e&&n.createElement("div",null,"Error. Please try again."),"pending"===e&&n.createElement("div",null,"Loading script..."),n.createElement("div",{ref:this.commentsEl}))},t}(n.Component);const rr=e=>{let{data:{markdownRemark:t}}=e;return n.createElement(u.A,{title:t.frontmatter.title,description:t.frontmatter.description||t.excerpt})};var nr=e=>{var t;let{data:{previous:r,next:a,site:u,markdownRemark:l},location:f}=e;const p=(null===(t=u.siteMetadata)||void 0===t?void 0:t.title)||"Title",{0:d,1:h}=(0,n.useState)(void 0);(0,n.useEffect)((()=>(window.addEventListener("scroll",m),()=>window.removeEventListener("scroll",m))),[]);const m=e=>{const t=window.pageYOffset,r=document.querySelectorAll(".anchor-header");for(const n of r){const{top:e}=n.getBoundingClientRect(),o=e+t;r[r.length-1];o<=t&&h(n.href.split(window.location.origin)[1])}};return n.createElement(c.A,{location:f,title:p},n.createElement("article",{className:"blog-post",itemScope:!0,itemType:"http://schema.org/Article"},n.createElement("header",null,n.createElement("h1",{itemProp:"headline"},l.frontmatter.title),n.createElement("p",null,"수정일 ",l.frontmatter.update,", 작성일 ",l.frontmatter.date)),n.createElement("div",{className:"tags"},n.createElement("ul",null,l.frontmatter.tags?l.frontmatter.tags.map((e=>n.createElement("li",{key:s()(e)},n.createElement(o.Link,{to:`/tags/${s()(e)}`},s()(e))))):null)),n.createElement("section",{dangerouslySetInnerHTML:{__html:l.html},itemProp:"articleBody"}),n.createElement("hr",null),n.createElement("footer",null,n.createElement(i.A,null))),n.createElement("nav",{className:"blog-post-nav"},n.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},n.createElement("li",null,r&&n.createElement(o.Link,{to:r.fields.slug,rel:"prev"},"← ",r.frontmatter.title)),n.createElement("li",null,a&&n.createElement(o.Link,{to:a.fields.slug,rel:"next"},a.frontmatter.title," →")))),n.createElement(Xt,{post:l,headerUrl:d}),n.createElement(tr,{repo:"jdalma/jdalma.github.io",theme:"github-light"}))}},5019:function(e,t,r){var n="[object Symbol]",o=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,a=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,s="\\ud800-\\udfff",i="\\u2700-\\u27bf",c="a-z\\xdf-\\xf6\\xf8-\\xff",u="A-Z\\xc0-\\xd6\\xd8-\\xde",l="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",f="['’]",p="["+l+"]",d="[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]",h="\\d+",m="["+i+"]",g="["+c+"]",v="[^"+s+l+h+i+c+u+"]",y="(?:\\ud83c[\\udde6-\\uddff]){2}",b="[\\ud800-\\udbff][\\udc00-\\udfff]",S="["+u+"]",w="(?:"+g+"|"+v+")",E="(?:"+S+"|"+v+")",x="(?:['’](?:d|ll|m|re|s|t|ve))?",A="(?:['’](?:D|LL|M|RE|S|T|VE))?",C="(?:"+d+"|\\ud83c[\\udffb-\\udfff])"+"?",I="[\\ufe0e\\ufe0f]?",P=I+C+("(?:\\u200d(?:"+["[^"+s+"]",y,b].join("|")+")"+I+C+")*"),O="(?:"+[m,y,b].join("|")+")"+P,k=RegExp(f,"g"),j=RegExp(d,"g"),R=RegExp([S+"?"+g+"+"+x+"(?="+[p,S,"$"].join("|")+")",E+"+"+A+"(?="+[p,S+w,"$"].join("|")+")",S+"?"+w+"+"+x,S+"+"+A,h,O].join("|"),"g"),$=/[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,N="object"==typeof r.g&&r.g&&r.g.Object===Object&&r.g,_="object"==typeof self&&self&&self.Object===Object&&self,T=N||_||Function("return this")();var D,z=(D={"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","Ç":"C","ç":"c","Ð":"D","ð":"d","È":"E","É":"E","Ê":"E","Ë":"E","è":"e","é":"e","ê":"e","ë":"e","Ì":"I","Í":"I","Î":"I","Ï":"I","ì":"i","í":"i","î":"i","ï":"i","Ñ":"N","ñ":"n","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","Ù":"U","Ú":"U","Û":"U","Ü":"U","ù":"u","ú":"u","û":"u","ü":"u","Ý":"Y","ý":"y","ÿ":"y","Æ":"Ae","æ":"ae","Þ":"Th","þ":"th","ß":"ss","Ā":"A","Ă":"A","Ą":"A","ā":"a","ă":"a","ą":"a","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","ć":"c","ĉ":"c","ċ":"c","č":"c","Ď":"D","Đ":"D","ď":"d","đ":"d","Ē":"E","Ĕ":"E","Ė":"E","Ę":"E","Ě":"E","ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e","Ĝ":"G","Ğ":"G","Ġ":"G","Ģ":"G","ĝ":"g","ğ":"g","ġ":"g","ģ":"g","Ĥ":"H","Ħ":"H","ĥ":"h","ħ":"h","Ĩ":"I","Ī":"I","Ĭ":"I","Į":"I","İ":"I","ĩ":"i","ī":"i","ĭ":"i","į":"i","ı":"i","Ĵ":"J","ĵ":"j","Ķ":"K","ķ":"k","ĸ":"k","Ĺ":"L","Ļ":"L","Ľ":"L","Ŀ":"L","Ł":"L","ĺ":"l","ļ":"l","ľ":"l","ŀ":"l","ł":"l","Ń":"N","Ņ":"N","Ň":"N","Ŋ":"N","ń":"n","ņ":"n","ň":"n","ŋ":"n","Ō":"O","Ŏ":"O","Ő":"O","ō":"o","ŏ":"o","ő":"o","Ŕ":"R","Ŗ":"R","Ř":"R","ŕ":"r","ŗ":"r","ř":"r","Ś":"S","Ŝ":"S","Ş":"S","Š":"S","ś":"s","ŝ":"s","ş":"s","š":"s","Ţ":"T","Ť":"T","Ŧ":"T","ţ":"t","ť":"t","ŧ":"t","Ũ":"U","Ū":"U","Ŭ":"U","Ů":"U","Ű":"U","Ų":"U","ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","Ż":"Z","Ž":"Z","ź":"z","ż":"z","ž":"z","Ĳ":"IJ","ĳ":"ij","Œ":"Oe","œ":"oe","ŉ":"'n","ſ":"ss"},function(e){return null==D?void 0:D[e]});var L=Object.prototype.toString,M=T.Symbol,F=M?M.prototype:void 0,G=F?F.toString:void 0;function B(e){if("string"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&L.call(e)==n}(e))return G?G.call(e):"";var t=e+"";return"0"==t&&1/e==-1/0?"-0":t}function U(e){return null==e?"":B(e)}var W,Y=(W=function(e,t,r){return e+(r?"-":"")+t.toLowerCase()},function(e){return function(e,t,r,n){var o=-1,a=e?e.length:0;for(n&&a&&(r=e[++o]);++o<a;)r=t(r,e[o],o,e);return r}(function(e,t,r){return e=U(e),void 0===(t=r?void 0:t)?function(e){return $.test(e)}(e)?function(e){return e.match(R)||[]}(e):function(e){return e.match(o)||[]}(e):e.match(t)||[]}(function(e){return(e=U(e))&&e.replace(a,z).replace(j,"")}(e).replace(k,"")),W,"")});e.exports=Y},2833:function(e){e.exports=function(e,t,r,n){var o=r?r.call(n,e,t):void 0;if(void 0!==o)return!!o;if(e===t)return!0;if("object"!=typeof e||!e||"object"!=typeof t||!t)return!1;var a=Object.keys(e),s=Object.keys(t);if(a.length!==s.length)return!1;for(var i=Object.prototype.hasOwnProperty.bind(t),c=0;c<a.length;c++){var u=a[c];if(!i(u))return!1;var l=e[u],f=t[u];if(!1===(o=r?r.call(n,l,f,u):void 0)||void 0===o&&l!==f)return!1}return!0}}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-d557f48b770adaa83890.js.map
(self.webpackChunkgatsby_starter_blog=self.webpackChunkgatsby_starter_blog||[]).push([[989],{8771:function(e,t,n){"use strict";var a=n(7294),r=n(1883);t.Z=()=>{var e,t;const n=(0,r.useStaticQuery)("230163734"),l=null===(e=n.site.siteMetadata)||void 0===e?void 0:e.author,u=null===(t=n.site.siteMetadata)||void 0===t?void 0:t.social;return a.createElement("div",{className:"bio"},(null==l?void 0:l.name)&&a.createElement("p",null,a.createElement("strong",null,l.name)," ",(null==l?void 0:l.summary)||null," ",a.createElement("a",{href:"https://github.com/"+((null==u?void 0:u.github)||"")},a.createElement("br",null),a.createElement("img",{src:"/GitHub-Mark-32px.png"}))))}},8678:function(e,t,n){"use strict";var a=n(7294),r=n(1883);t.Z=e=>{let{location:t,title:n,children:l}=e;const u="/"===t.pathname;let o;return o=u?a.createElement("h1",{className:"main-heading"},a.createElement(r.Link,{to:"/"},n)):a.createElement(r.Link,{className:"header-link-home",to:"/"},n),a.createElement("div",{className:"global-wrapper","data-is-root-path":u},a.createElement("header",{className:"global-header"},o),a.createElement("main",null,l),a.createElement("footer",null,"© ",(new Date).getFullYear(),", Built with"," ",a.createElement("a",{href:"https://www.gatsbyjs.com"},"Gatsby")))}},9357:function(e,t,n){"use strict";var a=n(7294),r=n(1883);t.Z=e=>{var t,n,l;let{description:u,title:o,children:i}=e;const{site:c}=(0,r.useStaticQuery)("3589320610"),s=u||c.siteMetadata.description,m=null===(t=c.siteMetadata)||void 0===t?void 0:t.title;return a.createElement(a.Fragment,null,a.createElement("title",null,m?o+" | "+m:o),a.createElement("meta",{name:"description",content:s}),a.createElement("meta",{property:"og:title",content:o}),a.createElement("meta",{property:"og:description",content:s}),a.createElement("meta",{property:"og:type",content:"website"}),a.createElement("meta",{name:"github:card",content:"summary"}),a.createElement("meta",{name:"github:creator",content:(null===(n=c.siteMetadata)||void 0===n||null===(l=n.social)||void 0===l?void 0:l.github)||""}),a.createElement("meta",{name:"github:title",content:o}),a.createElement("meta",{name:"github:description",content:s}),i)}},2607:function(e,t,n){"use strict";n.r(t),n.d(t,{Head:function(){return m},default:function(){return f}});var a=n(7294),r=n(1883),l=n(5683),u=n.n(l),o=n(8771),i=n(8678),c=n(9357);var s=e=>{let{content:t}=e;return a.createElement("div",{className:"table-of-content",dangerouslySetInnerHTML:{__html:t}})};const m=e=>{let{data:{markdownRemark:t}}=e;return a.createElement(c.Z,{title:t.frontmatter.title,description:t.frontmatter.description||t.excerpt})};var f=e=>{var t;let{data:{previous:n,next:l,site:c,markdownRemark:m},location:f}=e;const d=(null===(t=c.siteMetadata)||void 0===t?void 0:t.title)||"Title";return a.createElement(i.Z,{location:f,title:d},a.createElement("article",{className:"blog-post",itemScope:!0,itemType:"http://schema.org/Article"},a.createElement("header",null,a.createElement("h1",{itemProp:"headline"},m.frontmatter.title),a.createElement("p",null,m.frontmatter.date)),a.createElement("div",{className:"tags"},a.createElement("ul",null,m.frontmatter.tags?m.frontmatter.tags.map((e=>a.createElement("li",{key:u()(e)},a.createElement(r.Link,{to:"/tags/"+u()(e)},u()(e))))):null)),a.createElement("section",{dangerouslySetInnerHTML:{__html:m.html},itemProp:"articleBody"}),a.createElement("hr",null),a.createElement("footer",null,a.createElement(o.Z,null))),a.createElement("nav",{className:"blog-post-nav"},a.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},a.createElement("li",null,n&&a.createElement(r.Link,{to:n.fields.slug,rel:"prev"},"← ",n.frontmatter.title)),a.createElement("li",null,l&&a.createElement(r.Link,{to:l.fields.slug,rel:"next"},l.frontmatter.title," →")))),a.createElement("div",{class:"table-of-content"},a.createElement(s,{content:m.tableOfContents})))}},5683:function(e,t,n){var a="[object Symbol]",r=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,l=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,u="\\u2700-\\u27bf",o="a-z\\xdf-\\xf6\\xf8-\\xff",i="A-Z\\xc0-\\xd6\\xd8-\\xde",c="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",s="['’]",m="["+c+"]",f="[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]",d="\\d+",E="[\\u2700-\\u27bf]",p="["+o+"]",g="[^\\ud800-\\udfff"+c+d+u+o+i+"]",b="(?:\\ud83c[\\udde6-\\uddff]){2}",x="[\\ud800-\\udbff][\\udc00-\\udfff]",h="["+i+"]",v="(?:"+p+"|"+g+")",y="(?:"+h+"|"+g+")",j="(?:['’](?:d|ll|m|re|s|t|ve))?",k="(?:['’](?:D|LL|M|RE|S|T|VE))?",A="(?:[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]|\\ud83c[\\udffb-\\udfff])?",O="[\\ufe0e\\ufe0f]?",w=O+A+("(?:\\u200d(?:"+["[^\\ud800-\\udfff]",b,x].join("|")+")"+O+A+")*"),L="(?:"+[E,b,x].join("|")+")"+w,S=RegExp(s,"g"),Z=RegExp(f,"g"),N=RegExp([h+"?"+p+"+"+j+"(?="+[m,h,"$"].join("|")+")",y+"+"+k+"(?="+[m,h+v,"$"].join("|")+")",h+"?"+v+"+"+j,h+"+"+k,d,L].join("|"),"g"),I=/[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,C="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g,M="object"==typeof self&&self&&self.Object===Object&&self,U=C||M||Function("return this")();var z,R=(z={"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","Ç":"C","ç":"c","Ð":"D","ð":"d","È":"E","É":"E","Ê":"E","Ë":"E","è":"e","é":"e","ê":"e","ë":"e","Ì":"I","Í":"I","Î":"I","Ï":"I","ì":"i","í":"i","î":"i","ï":"i","Ñ":"N","ñ":"n","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","Ù":"U","Ú":"U","Û":"U","Ü":"U","ù":"u","ú":"u","û":"u","ü":"u","Ý":"Y","ý":"y","ÿ":"y","Æ":"Ae","æ":"ae","Þ":"Th","þ":"th","ß":"ss","Ā":"A","Ă":"A","Ą":"A","ā":"a","ă":"a","ą":"a","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","ć":"c","ĉ":"c","ċ":"c","č":"c","Ď":"D","Đ":"D","ď":"d","đ":"d","Ē":"E","Ĕ":"E","Ė":"E","Ę":"E","Ě":"E","ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e","Ĝ":"G","Ğ":"G","Ġ":"G","Ģ":"G","ĝ":"g","ğ":"g","ġ":"g","ģ":"g","Ĥ":"H","Ħ":"H","ĥ":"h","ħ":"h","Ĩ":"I","Ī":"I","Ĭ":"I","Į":"I","İ":"I","ĩ":"i","ī":"i","ĭ":"i","į":"i","ı":"i","Ĵ":"J","ĵ":"j","Ķ":"K","ķ":"k","ĸ":"k","Ĺ":"L","Ļ":"L","Ľ":"L","Ŀ":"L","Ł":"L","ĺ":"l","ļ":"l","ľ":"l","ŀ":"l","ł":"l","Ń":"N","Ņ":"N","Ň":"N","Ŋ":"N","ń":"n","ņ":"n","ň":"n","ŋ":"n","Ō":"O","Ŏ":"O","Ő":"O","ō":"o","ŏ":"o","ő":"o","Ŕ":"R","Ŗ":"R","Ř":"R","ŕ":"r","ŗ":"r","ř":"r","Ś":"S","Ŝ":"S","Ş":"S","Š":"S","ś":"s","ŝ":"s","ş":"s","š":"s","Ţ":"T","Ť":"T","Ŧ":"T","ţ":"t","ť":"t","ŧ":"t","Ũ":"U","Ū":"U","Ŭ":"U","Ů":"U","Ű":"U","Ų":"U","ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","Ż":"Z","Ž":"Z","ź":"z","ż":"z","ž":"z","Ĳ":"IJ","ĳ":"ij","Œ":"Oe","œ":"oe","ŉ":"'n","ſ":"ss"},function(e){return null==z?void 0:z[e]});var T=Object.prototype.toString,_=U.Symbol,G=_?_.prototype:void 0,H=G?G.toString:void 0;function D(e){if("string"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&T.call(e)==a}(e))return H?H.call(e):"";var t=e+"";return"0"==t&&1/e==-Infinity?"-0":t}function Y(e){return null==e?"":D(e)}var F,B=(F=function(e,t,n){return e+(n?"-":"")+t.toLowerCase()},function(e){return function(e,t,n,a){var r=-1,l=e?e.length:0;for(a&&l&&(n=e[++r]);++r<l;)n=t(n,e[r],r,e);return n}(function(e,t,n){return e=Y(e),void 0===(t=n?void 0:t)?function(e){return I.test(e)}(e)?function(e){return e.match(N)||[]}(e):function(e){return e.match(r)||[]}(e):e.match(t)||[]}(function(e){return(e=Y(e))&&e.replace(l,R).replace(Z,"")}(e).replace(S,"")),F,"")});e.exports=B}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-a5020bb4ecef02afa2a4.js.map
"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[943],{7942:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var r=n(959);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(n),f=a,m=u["".concat(s,".").concat(f)]||u[f]||d[f]||o;return n?r.createElement(m,i(i({ref:t},p),{},{components:n})):r.createElement(m,i({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=f;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:a,i[1]=l;for(var c=2;c<o;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},333:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var r=n(1163),a=(n(959),n(7942));const o={sidebar_position:1},i="Install",l={unversionedId:"install",id:"install",title:"Install",description:"How to install @arkejs/table?",source:"@site/docs/install.md",sourceDirName:".",slug:"/install",permalink:"/table/docs/install",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/install.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"docsSidebar",next:{title:"Usage",permalink:"/table/docs/usage"}},s={},c=[{value:"Using Tailwind CSS?",id:"using-tailwind-css",level:3}],p={toc:c},u="wrapper";function d(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"install"},"Install"),(0,a.kt)("p",null,"How to install ",(0,a.kt)("inlineCode",{parentName:"p"},"@arkejs/table"),"?"),(0,a.kt)("p",null,"Install ",(0,a.kt)("inlineCode",{parentName:"p"},"@arkejs/table")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"npm i @arkejs/table\n")),(0,a.kt)("h3",{id:"using-tailwind-css"},"Using Tailwind CSS?"),(0,a.kt)("p",null,"If you're using Tailwind CSS remember to add this line to your ",(0,a.kt)("inlineCode",{parentName:"p"},"tailwind.config.js")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:"title='tailwind.config.js'",title:"'tailwind.config.js'"},"  module.exports = {\n     // rest of config\n     content: [\n        './node_modules/@arkejs/table/dist/**/*.{js,ts,jsx,tsx}',\n     ]\n  }\n")))}d.isMDXComponent=!0}}]);
import{w as p,dp as g,ag as m,j as n,dq as k,dr as u}from"./iframe-BZVnfrYv.js";import{g as r,M as o}from"./miljø-Bzde1iVw.js";import{U as a}from"./umamiEvents-4lZbqD_K.js";import{S as v}from"./ThumbUp-NB_Ue0Uc.js";import"./preload-helper-PPVm8Dsz.js";/**
 * @license lucide-react v0.574.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]],h=p("link",S),_=r()!==o.ProdGcp?"https://vis-stilling.intern.dev.nav.no/arbeid/stilling":"https://www.nav.no/arbeid/stilling",x=r()!==o.ProdGcp?"https://arbeidsplassen.intern.dev.nav.no/stillinger/stilling":"https://arbeidsplassen.nav.no/stillinger/stilling",l=(e,i)=>`${e}/${i}`,d=({stillingsData:e})=>{const i=g(e).erDirektemeldt,c=l(i?_:x,e.stilling.uuid),s=m();return n.jsx(k,{size:"small",variant:"action",copyText:c,text:"Kopier delingslenke",activeText:"Lenken er kopiert",icon:n.jsx(h,{"aria-hidden":!0}),activeIcon:n.jsx(v,{"aria-hidden":!0}),onClick:()=>i?s.track(a.Stilling.kopier_delingslenke_direktemeldt):s.track(a.Stilling.kopier_delingslenke_arbeidsplassen)})};d.__docgenInfo={description:"",methods:[],displayName:"KopierStillingLenke",props:{stillingsData:{required:!0,tsType:{name:"StillingsDataDTO"},description:""}}};const U={tags:["autodocs"],component:d},t={args:{stillingsData:u}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    stillingsData: mockBaseStilling
  }
}`,...t.parameters?.docs?.source}}};export{t as Default,U as default};

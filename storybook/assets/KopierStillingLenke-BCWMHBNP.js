import{c3 as o,c as s,j as i,co as a}from"./iframe-7eHG5h_U.js";import{g as r,M as l}from"./miljø-Cn9pyrta.js";import{U as c}from"./umamiEvents-Cv3rLRMc.js";import{S as p}from"./ThumbUp-FdCUfIUT.js";/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]],m=o("link",d),g=r()!==l.ProdGcp?"https://vis-stilling.intern.dev.nav.no/arbeid/stilling":"https://www.nav.no/arbeid/stilling",k=e=>`${g}/${e}`,u=({stillingsId:e})=>{const n=k(e),t=s();return i.jsx(a,{size:"small",variant:"action",copyText:n,text:"Kopier delingslenke",activeText:"Lenken er kopiert",icon:i.jsx(m,{"aria-hidden":!0}),activeIcon:i.jsx(p,{"aria-hidden":!0}),onClick:()=>t.track(c.Stilling.kopier_delingslenke)})};u.__docgenInfo={description:"",methods:[],displayName:"KopierStillingLenke",props:{stillingsId:{required:!0,tsType:{name:"string"},description:""}}};export{u as K};

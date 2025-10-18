import{r as m,u,O as k,j as S,d as v,cp as t}from"./iframe-Ck33ggOC.js";import{o as f}from"./opprett-ny-DWOUX4iX.js";import"./preload-helper-PPVm8Dsz.js";import"./umamiEvents-D8PysN3T.js";const s=({kategori:o})=>{const[n,i]=m.useState(!1),{valgtNavKontor:p,brukerData:a}=u(),{trackAndNavigate:g}=k(),l=async()=>{i(!0);const d={kategori:o,eierNavKontorEnhetId:p?.navKontor,navident:a.ident,brukerNavn:`${a.fornavn} ${a.etternavn}`};await f(d,g)},c=()=>{switch(o){case t.Stilling:return"Opprett stillingsoppdrag";case t.Formidling:return"Opprett etterregistrering";default:return"Opprett"}};return S.jsx(v,{size:"small",loading:n,onClick:l,children:c()})};s.__docgenInfo={description:"",methods:[],displayName:"OpprettKnapp",props:{kategori:{required:!0,tsType:{name:"Stillingskategori"},description:""}}};const h={tags:["autodocs"],component:s,args:{kategori:t.Stilling}},r={args:{kategori:t.Stilling}},e={args:{kategori:t.Formidling}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    kategori: Stillingskategori.Stilling
  }
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    kategori: Stillingskategori.Formidling
  }
}`,...e.parameters?.docs?.source}}};export{e as Formidling,r as Stilling,h as default};

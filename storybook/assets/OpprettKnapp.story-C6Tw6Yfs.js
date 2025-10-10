import{r as d,u,c as k,j as S,b as v}from"./iframe-CHkTVuiI.js";import{S as t}from"./stilling-typer-DLlwa7NU.js";import{o as f}from"./opprett-ny-CaJtCpwB.js";import"./preload-helper-BWMAHTUm.js";import"./stillingMock-BtxAEQoL.js";import"./chunk-RHFAIXC4-CteuV83n.js";import"./umamiEvents-BDpRy9-M.js";const s=({kategori:o})=>{const[n,i]=d.useState(!1),{valgtNavKontor:p,brukerData:a}=u(),{trackAndNavigate:g}=k(),l=async()=>{i(!0);const m={kategori:o,eierNavKontorEnhetId:p?.navKontor,navident:a.ident,brukerNavn:`${a.fornavn} ${a.etternavn}`};await f(m,g)},c=()=>{switch(o){case t.Stilling:return"Opprett stillingsoppdrag";case t.Formidling:return"Opprett etterregistrering";default:return"Opprett"}};return S.jsx(v,{size:"small",loading:n,onClick:l,children:c()})};s.__docgenInfo={description:"",methods:[],displayName:"OpprettKnapp",props:{kategori:{required:!0,tsType:{name:"Stillingskategori"},description:""}}};const b={tags:["autodocs"],component:s,args:{kategori:t.Stilling}},r={args:{kategori:t.Stilling}},e={args:{kategori:t.Formidling}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    kategori: Stillingskategori.Stilling
  }
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    kategori: Stillingskategori.Formidling
  }
}`,...e.parameters?.docs?.source}}};export{e as Formidling,r as Stilling,b as default};

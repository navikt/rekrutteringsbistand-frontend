import{j as e,B as n,n as d}from"./iframe-YU0gJw2_.js";import{B as k}from"./Box-WuO_Te3W.js";import{f as c}from"./format-ByhkG4B0.js";import{S as f}from"./HandShakeHeart-DYHu2acl.js";import{S as h}from"./SealCheckmark-Ii6DZhEr.js";import{S as x}from"./XMarkOctagon-B2ySjVnx.js";import"./preload-helper-PPVm8Dsz.js";import"./BasePrimitive-Byl2zsu_.js";import"./match-BiwrJVmm.js";const l=({tittel:m,tekst:p,dato:o,fargeKode:i,ikon:u,frist:s})=>{const g=i==="error"?"danger-softA":i==="success"?"success-softA":"info-softA";return e.jsx(k.New,{background:g,borderRadius:"xlarge",paddingInline:"space-16",paddingBlock:"space-12",children:e.jsx("div",{className:"flex items-start justify-between",children:e.jsxs("div",{className:"flex gap-2",children:[e.jsx("div",{className:"mt-0.5",children:u}),e.jsxs("div",{children:[e.jsx(n,{weight:"semibold",children:m}),s&&e.jsxs(n,{size:"small",textColor:"subtle",children:["Frist ",c(s,"dd. MMMM yyyy HH:mm",{locale:d})]}),!s&&e.jsxs(n,{size:"small",textColor:"subtle",children:[p," ",o&&c(o,"dd. MMMM yyyy HH:mm",{locale:d})]})]})]})})})};l.__docgenInfo={description:"",methods:[],displayName:"KandidatHendelseKort",props:{tittel:{required:!0,tsType:{name:"string"},description:""},tekst:{required:!0,tsType:{name:"string"},description:""},dato:{required:!1,tsType:{name:"Date"},description:""},frist:{required:!1,tsType:{name:"Date"},description:""},fargeKode:{required:!0,tsType:{name:"string"},description:""},ikon:{required:!0,tsType:{name:"ReactNode"},description:""}}};const M={tags:["autodocs"],component:l},t={args:{tittel:"Kontaktet kandidat",tekst:"Kandidaten ble kontaktet",fargeKode:"info",ikon:e.jsx(f,{"aria-hidden":!0}),dato:new Date}},r={args:{tittel:"Til intervju",tekst:"Intervju avtalt",fargeKode:"success",ikon:e.jsx(h,{"aria-hidden":!0}),frist:new Date(Date.now()+1e3*60*60*24)}},a={args:{tittel:"Avsluttet",tekst:"Prosessen stoppet",fargeKode:"error",ikon:e.jsx(x,{"aria-hidden":!0}),dato:new Date}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    tittel: 'Kontaktet kandidat',
    tekst: 'Kandidaten ble kontaktet',
    fargeKode: 'info',
    ikon: <HandShakeHeartIcon aria-hidden />,
    dato: new Date()
  }
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    tittel: 'Til intervju',
    tekst: 'Intervju avtalt',
    fargeKode: 'success',
    ikon: <SealCheckmarkIcon aria-hidden />,
    frist: new Date(Date.now() + 1000 * 60 * 60 * 24)
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    tittel: 'Avsluttet',
    tekst: 'Prosessen stoppet',
    fargeKode: 'error',
    ikon: <XMarkOctagonIcon aria-hidden />,
    dato: new Date()
  }
}`,...a.parameters?.docs?.source}}};export{a as Error,t as Info,r as Success,M as default};

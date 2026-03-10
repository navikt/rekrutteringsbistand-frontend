import{j as e,b as n,bl as d}from"./iframe-CneUl_wY.js";import{B as g}from"./Box-B2ztMX1_.js";import{f as c}from"./format-e0twARLu.js";import{S as f}from"./XMarkOctagon-g9QwqwBg.js";import{S as h}from"./HandShakeHeart-Qy6P2tNi.js";import{S as x}from"./SealCheckmark-BaAFfp9s.js";import"./preload-helper-PPVm8Dsz.js";import"./BasePrimitive-BCwzE-6u.js";import"./en-US-CZDsp8GY.js";import"./match-DaDQSp9V.js";const l=({tittel:m,tekst:p,dato:o,fargeKode:i,ikon:u,frist:a})=>{const k=i==="error"?"danger-softA":i==="success"?"success-softA":"info-softA";return e.jsx(g,{background:k,borderRadius:"12",paddingInline:"space-16",paddingBlock:"space-12",children:e.jsx("div",{className:"flex items-start justify-between",children:e.jsxs("div",{className:"flex gap-2",children:[e.jsx("div",{className:"mt-0.5",children:u}),e.jsxs("div",{children:[e.jsx(n,{weight:"semibold",children:m}),a&&e.jsxs(n,{size:"small",textColor:"subtle",children:["Frist ",c(a,"dd. MMMM yyyy HH:mm",{locale:d})]}),!a&&e.jsxs(n,{size:"small",textColor:"subtle",children:[p," ",o&&c(o,"dd. MMMM yyyy HH:mm",{locale:d})]})]})]})})})};l.__docgenInfo={description:"",methods:[],displayName:"KandidatHendelseKort",props:{tittel:{required:!0,tsType:{name:"string"},description:""},tekst:{required:!0,tsType:{name:"string"},description:""},dato:{required:!1,tsType:{name:"Date"},description:""},frist:{required:!1,tsType:{name:"Date"},description:""},fargeKode:{required:!0,tsType:{name:"string"},description:""},ikon:{required:!0,tsType:{name:"ReactNode"},description:""}}};const I={tags:["autodocs"],component:l},t={args:{tittel:"Kontaktet kandidat",tekst:"Kandidaten ble kontaktet",fargeKode:"info",ikon:e.jsx(h,{"aria-hidden":!0}),dato:new Date}},r={args:{tittel:"Til intervju",tekst:"Intervju avtalt",fargeKode:"success",ikon:e.jsx(x,{"aria-hidden":!0}),frist:new Date(Date.now()+1e3*60*60*24)}},s={args:{tittel:"Avsluttet",tekst:"Prosessen stoppet",fargeKode:"error",ikon:e.jsx(f,{"aria-hidden":!0}),dato:new Date}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    tittel: 'Avsluttet',
    tekst: 'Prosessen stoppet',
    fargeKode: 'error',
    ikon: <XMarkOctagonIcon aria-hidden />,
    dato: new Date()
  }
}`,...s.parameters?.docs?.source}}};export{s as Error,t as Info,r as Success,I as default};

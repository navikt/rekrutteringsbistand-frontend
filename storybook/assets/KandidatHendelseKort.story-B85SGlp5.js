import{j as e,B as n,f as d,n as c}from"./iframe-C0RnufXY.js";import{B as g}from"./Box-vRWMR1wU.js";import{S as f}from"./HandShakeHeart-GRgLuVNm.js";import{S as h}from"./SealCheckmark-DdfFw32_.js";import{S as x}from"./XMarkOctagon-Bum01GiJ.js";import"./preload-helper-PPVm8Dsz.js";import"./BasePrimitive-BpW17Mon.js";const l=({tittel:m,tekst:p,dato:o,fargeKode:i,ikon:u,frist:a})=>{const k=i==="error"?"danger-softA":i==="success"?"success-softA":"info-softA";return e.jsx(g,{background:k,borderRadius:"12",paddingInline:"space-16",paddingBlock:"space-12",children:e.jsx("div",{className:"flex items-start justify-between",children:e.jsxs("div",{className:"flex gap-2",children:[e.jsx("div",{className:"mt-0.5",children:u}),e.jsxs("div",{children:[e.jsx(n,{weight:"semibold",children:m}),a&&e.jsxs(n,{size:"small",textColor:"subtle",children:["Frist ",d(a,"dd. MMMM yyyy HH:mm",{locale:c})]}),!a&&e.jsxs(n,{size:"small",textColor:"subtle",children:[p," ",o&&d(o,"dd. MMMM yyyy HH:mm",{locale:c})]})]})]})})})};l.__docgenInfo={description:"",methods:[],displayName:"KandidatHendelseKort",props:{tittel:{required:!0,tsType:{name:"string"},description:""},tekst:{required:!0,tsType:{name:"string"},description:""},dato:{required:!1,tsType:{name:"Date"},description:""},frist:{required:!1,tsType:{name:"Date"},description:""},fargeKode:{required:!0,tsType:{name:"string"},description:""},ikon:{required:!0,tsType:{name:"ReactNode"},description:""}}};const D={tags:["autodocs"],component:l},t={args:{tittel:"Kontaktet kandidat",tekst:"Kandidaten ble kontaktet",fargeKode:"info",ikon:e.jsx(f,{"aria-hidden":!0}),dato:new Date}},r={args:{tittel:"Til intervju",tekst:"Intervju avtalt",fargeKode:"success",ikon:e.jsx(h,{"aria-hidden":!0}),frist:new Date(Date.now()+1e3*60*60*24)}},s={args:{tittel:"Avsluttet",tekst:"Prosessen stoppet",fargeKode:"error",ikon:e.jsx(x,{"aria-hidden":!0}),dato:new Date}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};export{s as Error,t as Info,r as Success,D as default};

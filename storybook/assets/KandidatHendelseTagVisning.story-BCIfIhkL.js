import{j as n,b as d}from"./iframe-9y18Ssu8.js";import{f as l}from"./dato-G81G8qMd.js";import{T as m}from"./Tooltip-CyGwbb9r.js";import{T as p}from"./Tag-DrKdKGXB.js";import"./preload-helper-PPVm8Dsz.js";import"./format-CYyuaQK7.js";import"./en-US-BqXGko0a.js";import"./match-Dbok1h-_.js";import"./parseISO-Cvidxtvo.js";import"./parse-CrR1rErE.js";import"./getDefaultOptions-Bv-K6pOf.js";import"./isSameDay-CsSUTsd2.js";import"./floating-ui.react-DReJ0bXv.js";import"./Modal.context-C4_R1QvZ.js";import"./Portal-B-_vJkTg.js";import"./VStack-CReScaEF.js";import"./BasePrimitive-zryuTTx0.js";import"./useControllableState-B7HGaoNK.js";const o=({kandidatHendelse:e,topBar:i})=>!e||!e.tag?null:i?e.tag:n.jsx(m,{content:e.tekst??"",children:n.jsxs("div",{children:[e.tag,e.dato&&n.jsx(d,{textColor:"subtle",children:l({dato:e.dato})})]})});o.__docgenInfo={description:"",methods:[],displayName:"KandidatHendelseTagVisning",props:{kandidatHendelse:{required:!1,tsType:{name:"union",raw:"KandidatHendelseInformasjon | null",elements:[{name:"KandidatHendelseInformasjon"},{name:"null"}]},description:""},topBar:{required:!1,tsType:{name:"boolean"},description:""}}};const E={tags:["autodocs"],component:o},s={tekst:"Kandidaten ble kontaktet",tag:n.jsx(p,{"data-color":"info",size:"small",variant:"outline",children:"Kontaktet"}),dato:null,type:null,raw:{utfall:"PRESENTERT",registrertAvIdent:"Z123456",tidspunkt:new Date().toISOString(),sendtTilArbeidsgiversKandidatliste:!1}},t={args:{kandidatHendelse:s}},r={args:{kandidatHendelse:{...s,dato:new Date}}},a={args:{kandidatHendelse:null}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    kandidatHendelse: baseHendelse
  }
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    kandidatHendelse: {
      ...baseHendelse,
      dato: new Date()
    }
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    kandidatHendelse: null
  }
}`,...a.parameters?.docs?.source}}};export{a as Ingen,r as MedDato,t as UtenDato,E as default};

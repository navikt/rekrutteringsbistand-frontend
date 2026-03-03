import{j as n,g as d}from"./iframe-DFtwoTh_.js";import{f as l}from"./dato-fXzLlyUY.js";import{T as m}from"./Tooltip-C5uIy07R.js";import{T as p}from"./Tag-BIOIosZZ.js";import"./preload-helper-PPVm8Dsz.js";import"./format-CfcYpSTP.js";import"./getTimezoneOffsetInMilliseconds-BBE5HC6h.js";import"./match-C6Ty43v9.js";import"./parseISO-B97Io5Ji.js";import"./parse-pScTYrPT.js";import"./getDefaultOptions-CV-Qyq1F.js";import"./isSameDay-BlXFn6_m.js";import"./floating-ui.react-BeotM2gb.js";import"./Modal.context-BnWAHEQc.js";import"./Portal-DDM1AoJr.js";import"./VStack-BXRFfnuf.js";import"./BasePrimitive-CDiUHIiY.js";import"./useControllableState-b9V7-pUK.js";const o=({kandidatHendelse:e,topBar:i})=>!e||!e.tag?null:i?e.tag:n.jsx(m,{content:e.tekst??"",children:n.jsxs("div",{children:[e.tag,e.dato&&n.jsx(d,{textColor:"subtle",children:l({dato:e.dato})})]})});o.__docgenInfo={description:"",methods:[],displayName:"KandidatHendelseTagVisning",props:{kandidatHendelse:{required:!1,tsType:{name:"union",raw:"KandidatHendelseInformasjon | null",elements:[{name:"KandidatHendelseInformasjon"},{name:"null"}]},description:""},topBar:{required:!1,tsType:{name:"boolean"},description:""}}};const E={tags:["autodocs"],component:o},s={tekst:"Kandidaten ble kontaktet",tag:n.jsx(p,{"data-color":"info",size:"small",variant:"outline",children:"Kontaktet"}),dato:null,type:null,raw:{utfall:"PRESENTERT",registrertAvIdent:"Z123456",tidspunkt:new Date().toISOString(),sendtTilArbeidsgiversKandidatliste:!1}},t={args:{kandidatHendelse:s}},r={args:{kandidatHendelse:{...s,dato:new Date}}},a={args:{kandidatHendelse:null}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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

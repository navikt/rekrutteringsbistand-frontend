import{j as n,g as d}from"./iframe-CC6VL7_i.js";import{f as l}from"./dato-CbpBeoBb.js";import{T as m}from"./Tooltip-Bw-0yiRZ.js";import{T as p}from"./Tag-Cx_gqqJG.js";import"./preload-helper-PPVm8Dsz.js";import"./format-BifkSCbE.js";import"./getTimezoneOffsetInMilliseconds-WjsRqsAD.js";import"./match-D08DcZY-.js";import"./parseISO-CIljvHn6.js";import"./parse-D5c0wGwL.js";import"./getDefaultOptions-COXxqqSZ.js";import"./isSameDay-CC7ir-aX.js";import"./floating-ui.react-098Ic5Zf.js";import"./Modal.context-B9dQfTWE.js";import"./Portal-CtmUbKL1.js";import"./VStack-JqhHne0b.js";import"./BasePrimitive-BAiSlWT1.js";import"./useControllableState-WjbrG42K.js";const o=({kandidatHendelse:e,topBar:i})=>!e||!e.tag?null:i?e.tag:n.jsx(m,{content:e.tekst??"",children:n.jsxs("div",{children:[e.tag,e.dato&&n.jsx(d,{textColor:"subtle",children:l({dato:e.dato})})]})});o.__docgenInfo={description:"",methods:[],displayName:"KandidatHendelseTagVisning",props:{kandidatHendelse:{required:!1,tsType:{name:"union",raw:"KandidatHendelseInformasjon | null",elements:[{name:"KandidatHendelseInformasjon"},{name:"null"}]},description:""},topBar:{required:!1,tsType:{name:"boolean"},description:""}}};const E={tags:["autodocs"],component:o},s={tekst:"Kandidaten ble kontaktet",tag:n.jsx(p,{"data-color":"info",size:"small",variant:"outline",children:"Kontaktet"}),dato:null,type:null,raw:{utfall:"PRESENTERT",registrertAvIdent:"Z123456",tidspunkt:new Date().toISOString(),sendtTilArbeidsgiversKandidatliste:!1}},t={args:{kandidatHendelse:s}},r={args:{kandidatHendelse:{...s,dato:new Date}}},a={args:{kandidatHendelse:null}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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

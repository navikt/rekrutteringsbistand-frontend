import{j as n,b as d}from"./iframe-B9EIERAQ.js";import{f as l}from"./dato-BM2vGqf6.js";import{T as m}from"./Tooltip-7CKPs9cK.js";import{T as p}from"./Tag-DIDn8Nt2.js";import"./preload-helper-PPVm8Dsz.js";import"./format-DmSMY60N.js";import"./en-US-5rbPq74o.js";import"./match-BNzN7Mxu.js";import"./parseISO-CaTi8wH-.js";import"./parse-rS6AgNhC.js";import"./getDefaultOptions-9vdk47zt.js";import"./isSameDay-C7GJG5VT.js";import"./floating-ui.react-BoG6eMh5.js";import"./Modal.context-BLDLPEvc.js";import"./Portal-Bbmc0y0W.js";import"./VStack-Dy4xRJaM.js";import"./BasePrimitive-okBwE8Ge.js";import"./useControllableState-UfBjBAk3.js";const o=({kandidatHendelse:e,topBar:i})=>!e||!e.tag?null:i?e.tag:n.jsx(m,{content:e.tekst??"",children:n.jsxs("div",{children:[e.tag,e.dato&&n.jsx(d,{textColor:"subtle",children:l({dato:e.dato})})]})});o.__docgenInfo={description:"",methods:[],displayName:"KandidatHendelseTagVisning",props:{kandidatHendelse:{required:!1,tsType:{name:"union",raw:"KandidatHendelseInformasjon | null",elements:[{name:"KandidatHendelseInformasjon"},{name:"null"}]},description:""},topBar:{required:!1,tsType:{name:"boolean"},description:""}}};const E={tags:["autodocs"],component:o},s={tekst:"Kandidaten ble kontaktet",tag:n.jsx(p,{"data-color":"info",size:"small",variant:"outline",children:"Kontaktet"}),dato:null,type:null,raw:{utfall:"PRESENTERT",registrertAvIdent:"Z123456",tidspunkt:new Date().toISOString(),sendtTilArbeidsgiversKandidatliste:!1}},t={args:{kandidatHendelse:s}},r={args:{kandidatHendelse:{...s,dato:new Date}}},a={args:{kandidatHendelse:null}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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

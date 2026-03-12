import{j as n,b as d}from"./iframe-Cngrpa0B.js";import{f as l}from"./dato-CpkWzOJY.js";import{T as m}from"./Tooltip-CY2SgTty.js";import{T as p}from"./Tag--IBSZNj-.js";import"./preload-helper-PPVm8Dsz.js";import"./format-3IHPRRWg.js";import"./en-US-B-0rQnz0.js";import"./match-OPoBeP1h.js";import"./parseISO-xTwo21f6.js";import"./parse-C3RwyexH.js";import"./getDefaultOptions-Ji22CbKk.js";import"./isSameDay-DD94dVMd.js";import"./floating-ui.react-DJCD_w5E.js";import"./Modal.context-CTgmsW8v.js";import"./Portal-UyaMQaKL.js";import"./VStack-BFBL45fh.js";import"./BasePrimitive-CGU5BbqL.js";import"./useControllableState-CGZKPh8n.js";const o=({kandidatHendelse:e,topBar:i})=>!e||!e.tag?null:i?e.tag:n.jsx(m,{content:e.tekst??"",children:n.jsxs("div",{children:[e.tag,e.dato&&n.jsx(d,{textColor:"subtle",children:l({dato:e.dato})})]})});o.__docgenInfo={description:"",methods:[],displayName:"KandidatHendelseTagVisning",props:{kandidatHendelse:{required:!1,tsType:{name:"union",raw:"KandidatHendelseInformasjon | null",elements:[{name:"KandidatHendelseInformasjon"},{name:"null"}]},description:""},topBar:{required:!1,tsType:{name:"boolean"},description:""}}};const E={tags:["autodocs"],component:o},s={tekst:"Kandidaten ble kontaktet",tag:n.jsx(p,{"data-color":"info",size:"small",variant:"outline",children:"Kontaktet"}),dato:null,type:null,raw:{utfall:"PRESENTERT",registrertAvIdent:"Z123456",tidspunkt:new Date().toISOString(),sendtTilArbeidsgiversKandidatliste:!1}},t={args:{kandidatHendelse:s}},r={args:{kandidatHendelse:{...s,dato:new Date}}},a={args:{kandidatHendelse:null}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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

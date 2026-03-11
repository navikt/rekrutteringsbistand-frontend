import{j as n,b as d}from"./iframe-9QB-DaFS.js";import{f as l}from"./dato-micr6Kx5.js";import{T as m}from"./Tooltip-B2NicKww.js";import{T as p}from"./Tag-DelammDU.js";import"./preload-helper-PPVm8Dsz.js";import"./format-B0Vk874m.js";import"./en-US-CG9j0nLu.js";import"./match-BX-jyUN2.js";import"./parseISO-D9_5QCXM.js";import"./parse-LM0aOrqK.js";import"./getDefaultOptions-onEum7HG.js";import"./isSameDay-_XOy3LZz.js";import"./floating-ui.react-BbfMT4OT.js";import"./Modal.context-BarcoW_3.js";import"./Portal-DASJv-o5.js";import"./VStack-IdSzJfb7.js";import"./BasePrimitive-CqnHCdpO.js";import"./useControllableState-D55ZSACu.js";const o=({kandidatHendelse:e,topBar:i})=>!e||!e.tag?null:i?e.tag:n.jsx(m,{content:e.tekst??"",children:n.jsxs("div",{children:[e.tag,e.dato&&n.jsx(d,{textColor:"subtle",children:l({dato:e.dato})})]})});o.__docgenInfo={description:"",methods:[],displayName:"KandidatHendelseTagVisning",props:{kandidatHendelse:{required:!1,tsType:{name:"union",raw:"KandidatHendelseInformasjon | null",elements:[{name:"KandidatHendelseInformasjon"},{name:"null"}]},description:""},topBar:{required:!1,tsType:{name:"boolean"},description:""}}};const E={tags:["autodocs"],component:o},s={tekst:"Kandidaten ble kontaktet",tag:n.jsx(p,{"data-color":"info",size:"small",variant:"outline",children:"Kontaktet"}),dato:null,type:null,raw:{utfall:"PRESENTERT",registrertAvIdent:"Z123456",tidspunkt:new Date().toISOString(),sendtTilArbeidsgiversKandidatliste:!1}},t={args:{kandidatHendelse:s}},r={args:{kandidatHendelse:{...s,dato:new Date}}},a={args:{kandidatHendelse:null}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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

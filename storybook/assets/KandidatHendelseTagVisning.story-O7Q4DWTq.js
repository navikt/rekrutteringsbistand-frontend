import{j as n,b as d}from"./iframe-BDkGlu2A.js";import{f as l}from"./dato-Bw5hcYdr.js";import{T as m}from"./Tooltip-B9CoPv1E.js";import{T as p}from"./Tag-PZgmnfu9.js";import"./preload-helper-PPVm8Dsz.js";import"./format-DOnqlv3Z.js";import"./getTimezoneOffsetInMilliseconds-B2lAfqmU.js";import"./match-H4nwVkoz.js";import"./parseISO-iW_-10Ww.js";import"./parse-DO6xBU5X.js";import"./getDefaultOptions-DaalUCUF.js";import"./isSameDay-CqMX9KMb.js";import"./floating-ui.react-BSApgiA0.js";import"./Modal.context-DYSmtGyK.js";import"./Portal-B956yLNG.js";import"./VStack-DmbEZUe6.js";import"./BasePrimitive-BKHuKnFY.js";import"./useControllableState-SFUimoeF.js";const o=({kandidatHendelse:e,topBar:i})=>!e||!e.tag?null:i?e.tag:n.jsx(m,{content:e.tekst??"",children:n.jsxs("div",{children:[e.tag,e.dato&&n.jsx(d,{textColor:"subtle",children:l({dato:e.dato})})]})});o.__docgenInfo={description:"",methods:[],displayName:"KandidatHendelseTagVisning",props:{kandidatHendelse:{required:!1,tsType:{name:"union",raw:"KandidatHendelseInformasjon | null",elements:[{name:"KandidatHendelseInformasjon"},{name:"null"}]},description:""},topBar:{required:!1,tsType:{name:"boolean"},description:""}}};const E={tags:["autodocs"],component:o},s={tekst:"Kandidaten ble kontaktet",tag:n.jsx(p,{"data-color":"info",size:"small",variant:"outline",children:"Kontaktet"}),dato:null,type:null,raw:{utfall:"PRESENTERT",registrertAvIdent:"Z123456",tidspunkt:new Date().toISOString(),sendtTilArbeidsgiversKandidatliste:!1}},t={args:{kandidatHendelse:s}},r={args:{kandidatHendelse:{...s,dato:new Date}}},a={args:{kandidatHendelse:null}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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

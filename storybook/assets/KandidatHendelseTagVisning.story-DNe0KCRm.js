import{j as n,b as d}from"./iframe-_cKBTLnw.js";import{f as l}from"./dato-BtRV7oEY.js";import{T as m}from"./Tooltip-cw8LUhHO.js";import{T as p}from"./Tag-D4kabPfr.js";import"./preload-helper-PPVm8Dsz.js";import"./format-D0HpuGDJ.js";import"./getTimezoneOffsetInMilliseconds-DSQFW4v8.js";import"./match-CGt28Yrq.js";import"./parseISO-C5QHaKFY.js";import"./parse-p_9Fxx5z.js";import"./getDefaultOptions-kvERS8Mm.js";import"./isSameDay-CoqLCJxk.js";import"./floating-ui.react-Cdc_p7Sm.js";import"./Modal.context-DgbU6aMT.js";import"./Portal-sHmli58Y.js";import"./VStack-BtbW7w57.js";import"./BasePrimitive-C5jwIYOF.js";import"./useControllableState-DuwAMkuq.js";const o=({kandidatHendelse:e,topBar:i})=>!e||!e.tag?null:i?e.tag:n.jsx(m,{content:e.tekst??"",children:n.jsxs("div",{children:[e.tag,e.dato&&n.jsx(d,{textColor:"subtle",children:l({dato:e.dato})})]})});o.__docgenInfo={description:"",methods:[],displayName:"KandidatHendelseTagVisning",props:{kandidatHendelse:{required:!1,tsType:{name:"union",raw:"KandidatHendelseInformasjon | null",elements:[{name:"KandidatHendelseInformasjon"},{name:"null"}]},description:""},topBar:{required:!1,tsType:{name:"boolean"},description:""}}};const E={tags:["autodocs"],component:o},s={tekst:"Kandidaten ble kontaktet",tag:n.jsx(p,{"data-color":"info",size:"small",variant:"outline",children:"Kontaktet"}),dato:null,type:null,raw:{utfall:"PRESENTERT",registrertAvIdent:"Z123456",tidspunkt:new Date().toISOString(),sendtTilArbeidsgiversKandidatliste:!1}},t={args:{kandidatHendelse:s}},r={args:{kandidatHendelse:{...s,dato:new Date}}},a={args:{kandidatHendelse:null}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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

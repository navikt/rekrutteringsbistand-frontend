import{j as r,g as i,cs as l}from"./iframe-PIyxYh0N.js";import{T as m}from"./Tooltip-BZ4wmMRF.js";import{T as c}from"./Tag-BfKDETSx.js";import"./preload-helper-PPVm8Dsz.js";import"./floating-ui.react-D2HIA0Oo.js";import"./Modal.context-cqPJuvGz.js";import"./Portal-BWKPtpF9.js";import"./VStack-C1VVTBrH.js";import"./BasePrimitive-B6gD52gJ.js";import"./useControllableState-ZQecNKS5.js";const s=({kandidatHendelse:e,topBar:d})=>!e||!e.tag?null:d?e.tag:r.jsx(m,{content:e.tekst??"",children:r.jsxs("div",{children:[e.tag,e.dato&&r.jsx(i,{textColor:"subtle",children:l({dato:e.dato})})]})});s.__docgenInfo={description:"",methods:[],displayName:"KandidatHendelseTagVisning",props:{kandidatHendelse:{required:!1,tsType:{name:"union",raw:"KandidatHendelseInformasjon | null",elements:[{name:"KandidatHendelseInformasjon"},{name:"null"}]},description:""},topBar:{required:!1,tsType:{name:"boolean"},description:""}}};const K={tags:["autodocs"],component:s},o={tekst:"Kandidaten ble kontaktet",tag:r.jsx(c,{"data-color":"info",size:"small",variant:"outline",children:"Kontaktet"}),dato:null,type:null,raw:{utfall:"PRESENTERT",registrertAvIdent:"Z123456",tidspunkt:new Date().toISOString(),sendtTilArbeidsgiversKandidatliste:!1}},t={args:{kandidatHendelse:o}},a={args:{kandidatHendelse:{...o,dato:new Date}}},n={args:{kandidatHendelse:null}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    kandidatHendelse: baseHendelse
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    kandidatHendelse: {
      ...baseHendelse,
      dato: new Date()
    }
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    kandidatHendelse: null
  }
}`,...n.parameters?.docs?.source}}};export{n as Ingen,a as MedDato,t as UtenDato,K as default};

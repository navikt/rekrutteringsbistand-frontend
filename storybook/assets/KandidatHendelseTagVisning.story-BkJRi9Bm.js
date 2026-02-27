import{j as r,g as i,cs as l}from"./iframe-BPmgH2Tx.js";import{T as m}from"./Tooltip-CG3Ql4F8.js";import{T as c}from"./Tag-BkLofOHG.js";import"./preload-helper-PPVm8Dsz.js";import"./floating-ui.react-D2LCOjcf.js";import"./Modal.context-Dp2nafXs.js";import"./Portal-Dw-ceXxH.js";import"./VStack-FkDzzsLz.js";import"./BasePrimitive-oP1t9L8b.js";import"./useControllableState-NeFzMEdM.js";const s=({kandidatHendelse:e,topBar:d})=>!e||!e.tag?null:d?e.tag:r.jsx(m,{content:e.tekst??"",children:r.jsxs("div",{children:[e.tag,e.dato&&r.jsx(i,{textColor:"subtle",children:l({dato:e.dato})})]})});s.__docgenInfo={description:"",methods:[],displayName:"KandidatHendelseTagVisning",props:{kandidatHendelse:{required:!1,tsType:{name:"union",raw:"KandidatHendelseInformasjon | null",elements:[{name:"KandidatHendelseInformasjon"},{name:"null"}]},description:""},topBar:{required:!1,tsType:{name:"boolean"},description:""}}};const K={tags:["autodocs"],component:s},o={tekst:"Kandidaten ble kontaktet",tag:r.jsx(c,{"data-color":"info",size:"small",variant:"outline",children:"Kontaktet"}),dato:null,type:null,raw:{utfall:"PRESENTERT",registrertAvIdent:"Z123456",tidspunkt:new Date().toISOString(),sendtTilArbeidsgiversKandidatliste:!1}},t={args:{kandidatHendelse:o}},a={args:{kandidatHendelse:{...o,dato:new Date}}},n={args:{kandidatHendelse:null}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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

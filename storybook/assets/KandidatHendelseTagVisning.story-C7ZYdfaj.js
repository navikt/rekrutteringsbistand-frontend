import{j as r,g as i,cs as l}from"./iframe-FHkBCfVU.js";import{T as m}from"./Tooltip-ByANt3Pk.js";import{T as c}from"./Tag-B9dItanu.js";import"./preload-helper-PPVm8Dsz.js";import"./floating-ui.react-CQO1Gy8D.js";import"./Modal.context-DfI42K82.js";import"./Portal-CwAZzS7w.js";import"./VStack-C2l0CBZp.js";import"./BasePrimitive-AqEGMIdf.js";import"./useControllableState-C70irtDf.js";const s=({kandidatHendelse:e,topBar:d})=>!e||!e.tag?null:d?e.tag:r.jsx(m,{content:e.tekst??"",children:r.jsxs("div",{children:[e.tag,e.dato&&r.jsx(i,{textColor:"subtle",children:l({dato:e.dato})})]})});s.__docgenInfo={description:"",methods:[],displayName:"KandidatHendelseTagVisning",props:{kandidatHendelse:{required:!1,tsType:{name:"union",raw:"KandidatHendelseInformasjon | null",elements:[{name:"KandidatHendelseInformasjon"},{name:"null"}]},description:""},topBar:{required:!1,tsType:{name:"boolean"},description:""}}};const K={tags:["autodocs"],component:s},o={tekst:"Kandidaten ble kontaktet",tag:r.jsx(c,{"data-color":"info",size:"small",variant:"outline",children:"Kontaktet"}),dato:null,type:null,raw:{utfall:"PRESENTERT",registrertAvIdent:"Z123456",tidspunkt:new Date().toISOString(),sendtTilArbeidsgiversKandidatliste:!1}},t={args:{kandidatHendelse:o}},a={args:{kandidatHendelse:{...o,dato:new Date}}},n={args:{kandidatHendelse:null}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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

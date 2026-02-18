import{j as r,g as i,cn as l}from"./iframe-CICabUNg.js";import{T as m}from"./Tooltip-WmP3zzTJ.js";import{T as c}from"./Tag-Ci9U1P_l.js";import"./preload-helper-PPVm8Dsz.js";import"./floating-ui.react-CNhHaEN_.js";import"./Modal.context-BPOBanTz.js";import"./Portal-CYXNw3oh.js";import"./useClientLayoutEffect-BwRbPqqF.js";import"./useControllableState-jDf_Tnei.js";const s=({kandidatHendelse:e,topBar:d})=>!e||!e.tag?null:d?e.tag:r.jsx(m,{content:e.tekst??"",children:r.jsxs("div",{children:[e.tag,e.dato&&r.jsx(i,{textColor:"subtle",children:l({dato:e.dato})})]})});s.__docgenInfo={description:"",methods:[],displayName:"KandidatHendelseTagVisning",props:{kandidatHendelse:{required:!1,tsType:{name:"union",raw:"KandidatHendelseInformasjon | null",elements:[{name:"KandidatHendelseInformasjon"},{name:"null"}]},description:""},topBar:{required:!1,tsType:{name:"boolean"},description:""}}};const b={tags:["autodocs"],component:s},o={tekst:"Kandidaten ble kontaktet",tag:r.jsx(c,{"data-color":"info",size:"small",variant:"outline",children:"Kontaktet"}),dato:null,type:null,raw:{utfall:"PRESENTERT",registrertAvIdent:"Z123456",tidspunkt:new Date().toISOString(),sendtTilArbeidsgiversKandidatliste:!1}},a={args:{kandidatHendelse:o}},t={args:{kandidatHendelse:{...o,dato:new Date}}},n={args:{kandidatHendelse:null}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    kandidatHendelse: baseHendelse
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    kandidatHendelse: {
      ...baseHendelse,
      dato: new Date()
    }
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    kandidatHendelse: null
  }
}`,...n.parameters?.docs?.source}}};export{n as Ingen,t as MedDato,a as UtenDato,b as default};

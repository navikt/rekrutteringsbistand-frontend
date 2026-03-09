import{j as n,b as d}from"./iframe-BZVnfrYv.js";import{f as l}from"./dato-DGRfIYWU.js";import{T as m}from"./Tooltip-Dy4uzitU.js";import{T as p}from"./Tag-DVH-2L1c.js";import"./preload-helper-PPVm8Dsz.js";import"./format-D0OOekqm.js";import"./en-US-CcvIPWQU.js";import"./match-DFPR2ZC7.js";import"./parseISO-CADi8uXe.js";import"./parse-D5-LkPQY.js";import"./getDefaultOptions-z7q4JSD4.js";import"./isSameDay-Dng7j_kr.js";import"./floating-ui.react-CRYv7j3Z.js";import"./Modal.context-DdxXfQQV.js";import"./Portal-C5FvaPgs.js";import"./VStack-DRl8vrOc.js";import"./BasePrimitive-e3pbX_Cv.js";import"./useControllableState-4LOe-ma9.js";const o=({kandidatHendelse:e,topBar:i})=>!e||!e.tag?null:i?e.tag:n.jsx(m,{content:e.tekst??"",children:n.jsxs("div",{children:[e.tag,e.dato&&n.jsx(d,{textColor:"subtle",children:l({dato:e.dato})})]})});o.__docgenInfo={description:"",methods:[],displayName:"KandidatHendelseTagVisning",props:{kandidatHendelse:{required:!1,tsType:{name:"union",raw:"KandidatHendelseInformasjon | null",elements:[{name:"KandidatHendelseInformasjon"},{name:"null"}]},description:""},topBar:{required:!1,tsType:{name:"boolean"},description:""}}};const E={tags:["autodocs"],component:o},s={tekst:"Kandidaten ble kontaktet",tag:n.jsx(p,{"data-color":"info",size:"small",variant:"outline",children:"Kontaktet"}),dato:null,type:null,raw:{utfall:"PRESENTERT",registrertAvIdent:"Z123456",tidspunkt:new Date().toISOString(),sendtTilArbeidsgiversKandidatliste:!1}},t={args:{kandidatHendelse:s}},r={args:{kandidatHendelse:{...s,dato:new Date}}},a={args:{kandidatHendelse:null}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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

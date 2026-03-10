import{j as n,b as d}from"./iframe-Clr6_eiR.js";import{f as l}from"./dato-XZ6L-0PL.js";import{T as m}from"./Tooltip-DA1Odr2L.js";import{T as p}from"./Tag-DR5-8C-T.js";import"./preload-helper-PPVm8Dsz.js";import"./format-CBz984WZ.js";import"./en-US-DqCJgRqo.js";import"./match-DybUA87c.js";import"./parseISO-CtQ5RE6R.js";import"./parse-C6dx_wHF.js";import"./getDefaultOptions-CTp-PeE4.js";import"./isSameDay-BPFxric3.js";import"./floating-ui.react-D_cR4aCz.js";import"./Modal.context-D3d_p7y-.js";import"./Portal-Dequ70rE.js";import"./VStack-CPx6I1hW.js";import"./BasePrimitive-CxRpgxE9.js";import"./useControllableState-COWj_ZN-.js";const o=({kandidatHendelse:e,topBar:i})=>!e||!e.tag?null:i?e.tag:n.jsx(m,{content:e.tekst??"",children:n.jsxs("div",{children:[e.tag,e.dato&&n.jsx(d,{textColor:"subtle",children:l({dato:e.dato})})]})});o.__docgenInfo={description:"",methods:[],displayName:"KandidatHendelseTagVisning",props:{kandidatHendelse:{required:!1,tsType:{name:"union",raw:"KandidatHendelseInformasjon | null",elements:[{name:"KandidatHendelseInformasjon"},{name:"null"}]},description:""},topBar:{required:!1,tsType:{name:"boolean"},description:""}}};const E={tags:["autodocs"],component:o},s={tekst:"Kandidaten ble kontaktet",tag:n.jsx(p,{"data-color":"info",size:"small",variant:"outline",children:"Kontaktet"}),dato:null,type:null,raw:{utfall:"PRESENTERT",registrertAvIdent:"Z123456",tidspunkt:new Date().toISOString(),sendtTilArbeidsgiversKandidatliste:!1}},t={args:{kandidatHendelse:s}},r={args:{kandidatHendelse:{...s,dato:new Date}}},a={args:{kandidatHendelse:null}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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

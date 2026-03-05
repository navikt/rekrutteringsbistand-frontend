import{j as n,b as d}from"./iframe-BPSD_YT1.js";import{f as l}from"./dato-BAVnjlbJ.js";import{T as m}from"./Tooltip-t30Mlp1F.js";import{T as p}from"./Tag-Z_hb8F6K.js";import"./preload-helper-PPVm8Dsz.js";import"./format-D-YFd6ny.js";import"./getTimezoneOffsetInMilliseconds-DQEVRmlI.js";import"./match-BuiY2TPh.js";import"./parseISO-BOW4UQTL.js";import"./parse-NK1nM1gG.js";import"./getDefaultOptions-C9er2TTU.js";import"./isSameDay-DbD_TQR0.js";import"./floating-ui.react-D5gzGk-9.js";import"./Modal.context-DvEzp0QD.js";import"./Portal-BgAknobq.js";import"./VStack-C67QtXfD.js";import"./BasePrimitive-8nTlBWV_.js";import"./useControllableState-_KJ3yXDg.js";const o=({kandidatHendelse:e,topBar:i})=>!e||!e.tag?null:i?e.tag:n.jsx(m,{content:e.tekst??"",children:n.jsxs("div",{children:[e.tag,e.dato&&n.jsx(d,{textColor:"subtle",children:l({dato:e.dato})})]})});o.__docgenInfo={description:"",methods:[],displayName:"KandidatHendelseTagVisning",props:{kandidatHendelse:{required:!1,tsType:{name:"union",raw:"KandidatHendelseInformasjon | null",elements:[{name:"KandidatHendelseInformasjon"},{name:"null"}]},description:""},topBar:{required:!1,tsType:{name:"boolean"},description:""}}};const E={tags:["autodocs"],component:o},s={tekst:"Kandidaten ble kontaktet",tag:n.jsx(p,{"data-color":"info",size:"small",variant:"outline",children:"Kontaktet"}),dato:null,type:null,raw:{utfall:"PRESENTERT",registrertAvIdent:"Z123456",tidspunkt:new Date().toISOString(),sendtTilArbeidsgiversKandidatliste:!1}},t={args:{kandidatHendelse:s}},r={args:{kandidatHendelse:{...s,dato:new Date}}},a={args:{kandidatHendelse:null}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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

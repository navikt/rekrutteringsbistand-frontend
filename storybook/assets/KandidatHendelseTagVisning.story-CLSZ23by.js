import{j as n,b as d}from"./iframe-dQW9Z_zk.js";import{f as l}from"./dato-6QacYvdF.js";import{T as m}from"./Tooltip-BRKY3PjM.js";import{T as p}from"./Tag-DhNgZu5O.js";import"./preload-helper-PPVm8Dsz.js";import"./format-Ci1biztN.js";import"./en-US-CEt_ID-_.js";import"./match-PiNg2qZ7.js";import"./parseISO-DYSaaqBK.js";import"./parse-C3XDkwLd.js";import"./getDefaultOptions-BwmOte06.js";import"./isSameDay-Cj5NnS7e.js";import"./floating-ui.react-CbnLySmp.js";import"./Modal.context-EZhP1nV5.js";import"./Portal-BKVXHdDH.js";import"./VStack-5Cn0xXnD.js";import"./BasePrimitive-G6oXtLOj.js";import"./useControllableState-BaYeSWn8.js";const o=({kandidatHendelse:e,topBar:i})=>!e||!e.tag?null:i?e.tag:n.jsx(m,{content:e.tekst??"",children:n.jsxs("div",{children:[e.tag,e.dato&&n.jsx(d,{textColor:"subtle",children:l({dato:e.dato})})]})});o.__docgenInfo={description:"",methods:[],displayName:"KandidatHendelseTagVisning",props:{kandidatHendelse:{required:!1,tsType:{name:"union",raw:"KandidatHendelseInformasjon | null",elements:[{name:"KandidatHendelseInformasjon"},{name:"null"}]},description:""},topBar:{required:!1,tsType:{name:"boolean"},description:""}}};const E={tags:["autodocs"],component:o},s={tekst:"Kandidaten ble kontaktet",tag:n.jsx(p,{"data-color":"info",size:"small",variant:"outline",children:"Kontaktet"}),dato:null,type:null,raw:{utfall:"PRESENTERT",registrertAvIdent:"Z123456",tidspunkt:new Date().toISOString(),sendtTilArbeidsgiversKandidatliste:!1}},t={args:{kandidatHendelse:s}},r={args:{kandidatHendelse:{...s,dato:new Date}}},a={args:{kandidatHendelse:null}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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

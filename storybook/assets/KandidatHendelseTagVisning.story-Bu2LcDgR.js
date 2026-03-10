import{j as n,b as d}from"./iframe-CneUl_wY.js";import{f as l}from"./dato-8F_fExdN.js";import{T as m}from"./Tooltip-2YJw_bZS.js";import{T as p}from"./Tag-DBrjzeu6.js";import"./preload-helper-PPVm8Dsz.js";import"./format-e0twARLu.js";import"./en-US-CZDsp8GY.js";import"./match-DaDQSp9V.js";import"./parseISO-DVqmX80D.js";import"./parse-C8THUBPX.js";import"./getDefaultOptions-DJwx3b_O.js";import"./isSameDay-BaAWF3Hu.js";import"./floating-ui.react-DnWFXdoj.js";import"./Modal.context-Bz5WRdyL.js";import"./Portal-Csncu1Zo.js";import"./VStack-DVjxuJxR.js";import"./BasePrimitive-BCwzE-6u.js";import"./useControllableState-B6yzSVwS.js";const o=({kandidatHendelse:e,topBar:i})=>!e||!e.tag?null:i?e.tag:n.jsx(m,{content:e.tekst??"",children:n.jsxs("div",{children:[e.tag,e.dato&&n.jsx(d,{textColor:"subtle",children:l({dato:e.dato})})]})});o.__docgenInfo={description:"",methods:[],displayName:"KandidatHendelseTagVisning",props:{kandidatHendelse:{required:!1,tsType:{name:"union",raw:"KandidatHendelseInformasjon | null",elements:[{name:"KandidatHendelseInformasjon"},{name:"null"}]},description:""},topBar:{required:!1,tsType:{name:"boolean"},description:""}}};const E={tags:["autodocs"],component:o},s={tekst:"Kandidaten ble kontaktet",tag:n.jsx(p,{"data-color":"info",size:"small",variant:"outline",children:"Kontaktet"}),dato:null,type:null,raw:{utfall:"PRESENTERT",registrertAvIdent:"Z123456",tidspunkt:new Date().toISOString(),sendtTilArbeidsgiversKandidatliste:!1}},t={args:{kandidatHendelse:s}},r={args:{kandidatHendelse:{...s,dato:new Date}}},a={args:{kandidatHendelse:null}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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

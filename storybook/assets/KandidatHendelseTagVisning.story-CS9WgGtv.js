import{j as n,g as d}from"./iframe-BrRRy87W.js";import{f as l}from"./dato-BmL0gDVE.js";import{T as m}from"./Tooltip-LztC2Dpz.js";import{T as p}from"./Tag-D_3Ry31M.js";import"./preload-helper-PPVm8Dsz.js";import"./format-BhK7W3zi.js";import"./getTimezoneOffsetInMilliseconds-Bh9fIElG.js";import"./match-CKM5Xknp.js";import"./parseISO-CIRKoOMJ.js";import"./parse-DU8IMmvF.js";import"./getDefaultOptions-Cd6CUs11.js";import"./isSameDay-CHqErPY1.js";import"./floating-ui.react-5tgXbmM2.js";import"./Modal.context-Bwo_Hchg.js";import"./Portal-CB858NuS.js";import"./VStack-CgfmCG0c.js";import"./BasePrimitive-YQMHy7Np.js";import"./useControllableState-BA6ifFhK.js";const o=({kandidatHendelse:e,topBar:i})=>!e||!e.tag?null:i?e.tag:n.jsx(m,{content:e.tekst??"",children:n.jsxs("div",{children:[e.tag,e.dato&&n.jsx(d,{textColor:"subtle",children:l({dato:e.dato})})]})});o.__docgenInfo={description:"",methods:[],displayName:"KandidatHendelseTagVisning",props:{kandidatHendelse:{required:!1,tsType:{name:"union",raw:"KandidatHendelseInformasjon | null",elements:[{name:"KandidatHendelseInformasjon"},{name:"null"}]},description:""},topBar:{required:!1,tsType:{name:"boolean"},description:""}}};const E={tags:["autodocs"],component:o},s={tekst:"Kandidaten ble kontaktet",tag:n.jsx(p,{"data-color":"info",size:"small",variant:"outline",children:"Kontaktet"}),dato:null,type:null,raw:{utfall:"PRESENTERT",registrertAvIdent:"Z123456",tidspunkt:new Date().toISOString(),sendtTilArbeidsgiversKandidatliste:!1}},t={args:{kandidatHendelse:s}},r={args:{kandidatHendelse:{...s,dato:new Date}}},a={args:{kandidatHendelse:null}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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

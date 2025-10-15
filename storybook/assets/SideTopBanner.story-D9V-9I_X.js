import{j as e,H as f,e as x}from"./iframe-BBDbIFjR.js";import{T as i}from"./Tag-Chl9ZaGi.js";import"./preload-helper-PPVm8Dsz.js";const o=({tittel:l,knappIBanner:c,headerInnhold:d,chip:p,tittelElementer:n})=>e.jsxs("div",{className:"@container/topBanner w-full flex justify-between pt-[32px] pb-10",children:[e.jsx("div",{className:"flex items-center w-full justify-between flex-col",children:e.jsx("div",{className:"flex w-full items-center justify-start gap-8",children:e.jsxs("div",{className:"w-full",children:[l&&e.jsxs("div",{className:"flex justify-between @2xl/topBanner:flex-row flex-col",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx(f,{className:"ml-0",level:"2",size:"xlarge",children:l}),n&&n.length>0&&e.jsx("div",{className:"flex items-center ml-4 gap-4",children:n.map((m,u)=>e.jsx("div",{children:m},`tittel-el-${u}`))})]}),e.jsx("div",{className:"flex-end flex",children:p})]}),e.jsx("div",{className:"w-full",children:d})]})})}),c&&e.jsx("div",{className:"flex justify-end w-full",id:"knapperRad",children:c})]});o.__docgenInfo={description:"",methods:[],displayName:"SideTopBanner",props:{tittel:{required:!0,tsType:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},description:""},chip:{required:!1,tsType:{name:"ReactNode"},description:""},ikon:{required:!1,tsType:{name:"ReactNode"},description:""},headerInnhold:{required:!1,tsType:{name:"ReactNode"},description:""},knappIBanner:{required:!1,tsType:{name:"ReactNode"},description:""},tilbakeKnapp:{required:!1,tsType:{name:"boolean"},description:""},tittelElementer:{required:!1,tsType:{name:"Array",elements:[{name:"ReactNode"}],raw:"ReactNode[]"},description:""}}};const T={tags:["autodocs"],component:o},t={args:{tittel:"Stor tittel"}},a={args:{tittel:"Tittel",chip:e.jsx(i,{variant:"neutral",children:"Ny"})}},r={args:{tittel:"Tittel",tittelElementer:[e.jsx(i,{variant:"neutral",children:"Status"},"1"),e.jsx(i,{variant:"info",children:"Under arbeid"},"2")]}},s={args:{tittel:"Tittel",knappIBanner:e.jsx(x,{size:"small",children:"Lagre"})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    tittel: 'Stor tittel'
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    tittel: 'Tittel',
    chip: <Tag variant='neutral'>Ny</Tag>
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    tittel: 'Tittel',
    tittelElementer: [<Tag key='1' variant='neutral'>
        Status
      </Tag>, <Tag key='2' variant='info'>
        Under arbeid
      </Tag>]
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    tittel: 'Tittel',
    knappIBanner: <Button size='small'>Lagre</Button>
  }
}`,...s.parameters?.docs?.source}}};export{t as Default,a as MedChip,r as MedElementer,s as MedKnapperad,T as default};

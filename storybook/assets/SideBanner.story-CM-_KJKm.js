import{j as e,H as d,e as r}from"./iframe-B2xGUNX-.js";import{S as l}from"./MegaphoneSpeaking-DbjuUucp.js";import"./preload-helper-BWMAHTUm.js";const o=({tittel:i,knapper:c,ikon:s})=>e.jsxs("div",{className:"h-10 py-4 flex justify-between  items-center my-4",children:[e.jsxs("div",{className:"flex",children:[s&&s,e.jsx(d,{className:s?"pl-1":"",size:"small",children:i})]}),c]});o.__docgenInfo={description:"",methods:[],displayName:"SideBanner",props:{tittel:{required:!0,tsType:{name:"string"},description:""},ikon:{required:!1,tsType:{name:"union",raw:"React.ReactNode | undefined",elements:[{name:"ReactReactNode",raw:"React.ReactNode"},{name:"undefined"}]},description:""},navigasjon:{required:!1,tsType:{name:"union",raw:"React.ReactNode | undefined",elements:[{name:"ReactReactNode",raw:"React.ReactNode"},{name:"undefined"}]},description:""},knapper:{required:!1,tsType:{name:"union",raw:"React.ReactNode | undefined",elements:[{name:"ReactReactNode",raw:"React.ReactNode"},{name:"undefined"}]},description:""}}};const g={tags:["autodocs"],component:o},a={args:{tittel:"Banner"}},n={args:{tittel:"Info",ikon:e.jsx(l,{})}},t={args:{tittel:"Handlinger",knapper:e.jsxs("div",{className:"flex gap-2",children:[e.jsx(r,{size:"small",children:"Lagre"}),e.jsx(r,{size:"small",variant:"secondary-neutral",children:"Avbryt"})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    tittel: 'Banner'
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    tittel: 'Info',
    ikon: <MegaphoneSpeakingIcon />
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    tittel: 'Handlinger',
    knapper: <div className='flex gap-2'>
        <Button size='small'>Lagre</Button>
        <Button size='small' variant='secondary-neutral'>
          Avbryt
        </Button>
      </div>
  }
}`,...t.parameters?.docs?.source}}};export{a as Enkelt,n as MedIkon,t as MedKnapper,g as default};

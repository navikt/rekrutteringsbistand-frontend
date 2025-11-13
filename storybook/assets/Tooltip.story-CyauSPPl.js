import{e2 as r,j as e,e3 as n,dK as s,e4 as a}from"./iframe-BovJDKCI.js";import"./preload-helper-PPVm8Dsz.js";const d={component:r,tags:["autodocs"]},t={render:()=>e.jsxs(r,{children:[e.jsx(n,{asChild:!0,children:e.jsx(s,{variant:"secondary",children:"Hold over"})}),e.jsx(a,{children:"Dette er en tooltip"})]})},o={render:()=>e.jsxs(r,{children:[e.jsx(n,{asChild:!0,children:e.jsx(s,{children:"Lang tekst"})}),e.jsx(a,{side:"bottom",className:"max-w-64",children:"Dette er en litt lengre forklaring som viser at tooltips kan brekke linjer og fortsatt se ryddige ut."})]})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <Tooltip>
      <TooltipTrigger asChild>
        <Button variant='secondary'>Hold over</Button>
      </TooltipTrigger>
      <TooltipContent>Dette er en tooltip</TooltipContent>
    </Tooltip>
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <Tooltip>
      <TooltipTrigger asChild>
        <Button>Lang tekst</Button>
      </TooltipTrigger>
      <TooltipContent side='bottom' className='max-w-64'>
        Dette er en litt lengre forklaring som viser at tooltips kan brekke
        linjer og fortsatt se ryddige ut.
      </TooltipContent>
    </Tooltip>
}`,...o.parameters?.docs?.source}}};export{o as MedLangTekst,t as Standard,d as default};

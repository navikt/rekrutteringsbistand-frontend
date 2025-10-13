import{j3 as r,j as t,j4 as n,iB as s,j5 as i}from"./iframe-C8Gl0mmh.js";import"./preload-helper-BWMAHTUm.js";const d={component:r,tags:["autodocs"]},e={render:()=>t.jsxs(r,{children:[t.jsx(n,{asChild:!0,children:t.jsx(s,{variant:"secondary",children:"Hold over"})}),t.jsx(i,{children:"Dette er en tooltip"})]})},o={render:()=>t.jsxs(r,{children:[t.jsx(n,{asChild:!0,children:t.jsx(s,{children:"Lang tekst"})}),t.jsx(i,{side:"bottom",className:"max-w-64",children:"Dette er en litt lengre forklaring som viser at tooltips kan brekke linjer og fortsatt se ryddige ut."})]})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => <Tooltip>
      <TooltipTrigger asChild>
        <Button variant='secondary'>Hold over</Button>
      </TooltipTrigger>
      <TooltipContent>Dette er en tooltip</TooltipContent>
    </Tooltip>
}`,...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <Tooltip>
      <TooltipTrigger asChild>
        <Button>Lang tekst</Button>
      </TooltipTrigger>
      <TooltipContent side='bottom' className='max-w-64'>
        Dette er en litt lengre forklaring som viser at tooltips kan brekke
        linjer og fortsatt se ryddige ut.
      </TooltipContent>
    </Tooltip>
}`,...o.parameters?.docs?.source}}};export{o as MedLangTekst,e as Standard,d as default};

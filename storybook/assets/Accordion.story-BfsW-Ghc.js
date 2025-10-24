import{j as n}from"./iframe-DhZ6odjH.js";import{A as d,a as e,b as o,c as r}from"./accordion-DfKX_W4t.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BeOHxzYE.js";import"./index-SvNVPI6g.js";import"./index-mAHf9UNY.js";import"./ChevronDown-BQcdOcKV.js";const p={component:d,tags:["autodocs"],args:{type:"single",collapsible:!0},argTypes:{type:{control:"select",options:["single","multiple"]}}},c={render:i=>n.jsxs(d,{...i,className:"w-80",children:[n.jsxs(e,{value:"a",children:[n.jsx(o,{children:"Første seksjon"}),n.jsx(r,{children:"Innhold for første seksjon"})]}),n.jsxs(e,{value:"b",children:[n.jsx(o,{children:"Andre seksjon"}),n.jsx(r,{children:"Mer innhold i nummer to"})]}),n.jsxs(e,{value:"c",children:[n.jsx(o,{children:"Tredje seksjon"}),n.jsx(r,{children:"Enda litt innhold."})]})]})},s={args:{type:"multiple"},render:i=>n.jsxs(d,{...i,className:"w-80",children:[n.jsxs(e,{value:"1",children:[n.jsx(o,{children:"Seksjon 1"}),n.jsx(r,{children:"Åpen samtidig med andre."})]}),n.jsxs(e,{value:"2",children:[n.jsx(o,{children:"Seksjon 2"}),n.jsx(r,{children:"Åpnes også."})]})]})};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => <Accordion {...args} className='w-80'>
      <AccordionItem value='a'>
        <AccordionTrigger>Første seksjon</AccordionTrigger>
        <AccordionContent>Innhold for første seksjon</AccordionContent>
      </AccordionItem>
      <AccordionItem value='b'>
        <AccordionTrigger>Andre seksjon</AccordionTrigger>
        <AccordionContent>Mer innhold i nummer to</AccordionContent>
      </AccordionItem>
      <AccordionItem value='c'>
        <AccordionTrigger>Tredje seksjon</AccordionTrigger>
        <AccordionContent>Enda litt innhold.</AccordionContent>
      </AccordionItem>
    </Accordion>
}`,...c.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'multiple'
  },
  render: args => <Accordion {...args} className='w-80'>
      <AccordionItem value='1'>
        <AccordionTrigger>Seksjon 1</AccordionTrigger>
        <AccordionContent>Åpen samtidig med andre.</AccordionContent>
      </AccordionItem>
      <AccordionItem value='2'>
        <AccordionTrigger>Seksjon 2</AccordionTrigger>
        <AccordionContent>Åpnes også.</AccordionContent>
      </AccordionItem>
    </Accordion>
}`,...s.parameters?.docs?.source}}};export{c as Enkelt,s as Multiple,p as default};

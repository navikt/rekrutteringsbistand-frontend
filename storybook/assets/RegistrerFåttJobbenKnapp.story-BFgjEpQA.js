import{r as c,j as n,o as m}from"./iframe-CFPerreN.js";import{R as a}from"./RegistrerFåttJobbenKnapp-DtgnuLLd.js";import{A as o}from"./ActionMenu-DfHINVVG.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-0umXxUAh.js";import"./useControllableState-3kn0Fx76.js";import"./Portal-v4euiJo1.js";import"./useDescendant-C6lh1Pga.js";import"./useClientLayoutEffect-BPoH14GW.js";import"./DismissableLayer-BJVNuyiY.js";import"./Floating-BQMv3uS6.js";import"./ChevronRight-KjIWhyZQ.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    endreUtfallForKandidat: log
  }
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    endreUtfallForKandidat: log
  },
  render: args => {
    const [open, setOpen] = useState(false);
    return <ActionMenu open={open} onOpenChange={setOpen}>
        <Button as={ActionMenu.Trigger} size='small' variant='secondary'>
          Meny
        </Button>
        <ActionMenu.Content>
          <RegistrerFåttJobbenKnapp actionMenu {...args} />
        </ActionMenu.Content>
      </ActionMenu>;
  }
}`,...t.parameters?.docs?.source}}};export{t as IMenu,e as Knapp,C as default};

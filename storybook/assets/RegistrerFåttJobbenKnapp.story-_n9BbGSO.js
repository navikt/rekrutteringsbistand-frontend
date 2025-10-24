import{r as c,j as n,o as m}from"./iframe-Bc22TiGf.js";import{R as a}from"./RegistrerFåttJobbenKnapp-CBWIR-e_.js";import{A as o}from"./ActionMenu-BaVcnUvH.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-BNAEMjIh.js";import"./useControllableState-UyBcdlFN.js";import"./Portal-CnJsNBHi.js";import"./useDescendant-PVy_roNc.js";import"./useClientLayoutEffect-BIyC2go8.js";import"./DismissableLayer-Bz7rM6Vb.js";import"./Floating-C1WU42hw.js";import"./ChevronRight-BwSg6iDl.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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

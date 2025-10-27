import{r as c,j as n,o as m}from"./iframe-DwCeUcpF.js";import{R as a}from"./RegistrerFåttJobbenKnapp-DSKnvTSl.js";import{A as o}from"./ActionMenu-D0StrI8J.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-CbGkjZ7C.js";import"./useControllableState-CdwTxnNv.js";import"./Portal-DuR5T2wf.js";import"./useDescendant-Cz42C0A9.js";import"./useClientLayoutEffect-DOY64x3I.js";import"./DismissableLayer-DFUxmEzV.js";import"./Floating-DDyZov3o.js";import"./ChevronRight-eFDzUYdZ.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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

import{r as c,j as n,d}from"./iframe-BNj3Trp7.js";import{R as a}from"./RegistrerFåttJobbenKnapp-C7waprnU.js";import{A as o}from"./ActionMenu-D_xH3I_O.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-C8x_SuV6.js";import"./useControllableState-CDlVFmtE.js";import"./Portal-DdswNZPj.js";import"./useDescendant-C0oyiaZY.js";import"./useClientLayoutEffect-DH9bhr_K.js";import"./DismissableLayer-C4HytRU8.js";import"./Floating-CS6O9H3Y.js";import"./ChevronRight-DKRLMowy.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(d,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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

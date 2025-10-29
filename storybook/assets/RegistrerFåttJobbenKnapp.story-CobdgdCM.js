import{r as c,j as n,d}from"./iframe-H0yXMhS1.js";import{R as a}from"./RegistrerFåttJobbenKnapp-sGRlzvAL.js";import{A as o}from"./ActionMenu-7SRNOsHs.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-B1iRXIBr.js";import"./useControllableState-B0Zl1xS9.js";import"./Portal-0Xm9zPqG.js";import"./useDescendant-vLD5m-34.js";import"./useClientLayoutEffect-D6WCDnon.js";import"./DismissableLayer-DJKR5cfd.js";import"./Floating-Bl0f4d36.js";import"./ChevronRight-DpDJ7q34.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(d,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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

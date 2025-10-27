import{r as c,j as n,d}from"./iframe-BwFHCbBn.js";import{R as a}from"./RegistrerFåttJobbenKnapp-By56pDfs.js";import{A as o}from"./ActionMenu-D607xmNA.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-BNG1La1A.js";import"./useControllableState-CK1iRQ76.js";import"./Portal-DWcXgWfE.js";import"./useDescendant-DkCq7a5W.js";import"./useClientLayoutEffect-CiE3Twg0.js";import"./DismissableLayer-DSgU7EkV.js";import"./Floating-DCJ6rvPq.js";import"./ChevronRight-BrjDHjsW.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(d,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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

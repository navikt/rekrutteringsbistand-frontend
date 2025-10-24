import{r as c,j as n,o as m}from"./iframe-Cnqf-bcl.js";import{R as a}from"./RegistrerFåttJobbenKnapp-Dr0-WG53.js";import{A as o}from"./ActionMenu-CU-eW4sD.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-b3xVmYOX.js";import"./useControllableState-C1wR1eYe.js";import"./Portal-68bkrRIL.js";import"./useDescendant-C96LCEco.js";import"./useClientLayoutEffect-C7dti1gw.js";import"./DismissableLayer-DLwtcRFm.js";import"./Floating-BefB-NWo.js";import"./ChevronRight-yrikcTqv.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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

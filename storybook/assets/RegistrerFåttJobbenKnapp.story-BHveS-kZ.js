import{r as c,j as n,d}from"./iframe-cLJRmr5B.js";import{R as a}from"./RegistrerFåttJobbenKnapp-BD2ZDp6h.js";import{A as o}from"./ActionMenu-CGATYqUX.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-Dv_WIP1o.js";import"./useControllableState-BdxLHsnI.js";import"./Portal-q3XAE_dB.js";import"./useDescendant-zeVkUmkX.js";import"./useClientLayoutEffect-GVk9Ue51.js";import"./DismissableLayer-BuXh4or2.js";import"./Floating-8nf5T7iJ.js";import"./ChevronRight-DCCiGThW.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(d,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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

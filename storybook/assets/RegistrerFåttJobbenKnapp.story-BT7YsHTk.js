import{r as c,j as n,e as m}from"./iframe-BF8BNn-P.js";import{R as a}from"./RegistrerFåttJobbenKnapp-BUoW2rog.js";import{A as o}from"./ActionMenu-fg41xxS3.js";import"./preload-helper-BWMAHTUm.js";import"./Modal.context-BhhqLRxX.js";import"./useControllableState-CH5q939z.js";import"./Portal-eIIH8qR5.js";import"./useDescendant-ng3Vo_aV.js";import"./useClientLayoutEffect-CVA0Lj03.js";import"./DismissableLayer-B6zBYQZd.js";import"./Floating-BVqTRMfc.js";import"./ChevronRight-CjLL0MwG.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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

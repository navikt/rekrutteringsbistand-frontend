import{r as c,j as n,d}from"./iframe-DGJZfRLj.js";import{R as a}from"./RegistrerFåttJobbenKnapp-DK0l6xRy.js";import{A as o}from"./ActionMenu-6sBw9Wov.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-DMB1oKZj.js";import"./useControllableState-V_CYkDBC.js";import"./Portal-BNwPUP_W.js";import"./useDescendant-D-o2dfrc.js";import"./useClientLayoutEffect-D8AEg2Kf.js";import"./DismissableLayer-BBi3BOGD.js";import"./Floating-J8PYjrsx.js";import"./ChevronRight-DNfVh4gM.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(d,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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

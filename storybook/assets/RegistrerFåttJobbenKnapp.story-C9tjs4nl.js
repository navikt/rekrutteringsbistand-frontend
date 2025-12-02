import{r as c,j as n,d as m}from"./iframe-DaMpkblx.js";import{R as a}from"./RegistrerFåttJobbenKnapp-CK_CoHYg.js";import{A as o}from"./ActionMenu-DD3F1B-s.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-B1rC-gT8.js";import"./useControllableState-Dli3H_H5.js";import"./Portal-BGTIfVfF.js";import"./useClientLayoutEffect-C28Y73Kt.js";import"./owner-CO0wgQ-G.js";import"./useLatestRef-C3Ad1k7t.js";import"./useDescendant-CR3GhaRx.js";import"./DismissableLayer-ByifLX4b.js";import"./Floating-xDYhT9VC.js";import"./ChevronRight-CiRgRSjl.js";const U={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};export{t as IMenu,e as Knapp,U as default};

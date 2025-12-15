import{r as c,j as n,d as m}from"./iframe-C1ovTrJQ.js";import{R as a}from"./RegistrerFåttJobbenKnapp--OuTx824.js";import{A as o}from"./ActionMenu-DPaMQQIC.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-BM-QBXBc.js";import"./useControllableState-B_oB0b42.js";import"./Portal-DSyQQW1F.js";import"./useClientLayoutEffect-o_MBhyI4.js";import"./owner-CO0wgQ-G.js";import"./useLatestRef-D4471ZKH.js";import"./useDescendant-fJDm5d6l.js";import"./DismissableLayer-BRnL8OqO.js";import"./Floating-CWgR1yJA.js";import"./ChevronRight-Cz1DRjgx.js";const U={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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

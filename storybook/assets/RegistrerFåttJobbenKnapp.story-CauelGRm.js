import{r as c,j as n,d as m}from"./iframe-CVGSEgl3.js";import{R as a}from"./RegistrerFåttJobbenKnapp-Ba6TLXk1.js";import{A as o}from"./ActionMenu-CXjwmqqA.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-CBMF66yi.js";import"./useControllableState-BUYnv2tY.js";import"./Portal-qBc4W2xm.js";import"./useClientLayoutEffect-ghVn4P7G.js";import"./owner-CO0wgQ-G.js";import"./useLatestRef-CLpRPFlw.js";import"./useDescendant-0QCBf2az.js";import"./DismissableLayer-BI4yZ3io.js";import"./Floating-BL2cgZHY.js";import"./ChevronRight-C-nCn4UC.js";const U={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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

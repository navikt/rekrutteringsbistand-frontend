import{r as c,j as n,d as m}from"./iframe-CpaCEoJu.js";import{R as a}from"./RegistrerFåttJobbenKnapp-CfAGnMoA.js";import{A as o}from"./ActionMenu-Coc95v4s.js";import"./preload-helper-PPVm8Dsz.js";import"./CheckmarkCircle-Cc1L9Qxd.js";import"./Modal.context-D_dG1LGR.js";import"./useControllableState-C5_OEs8z.js";import"./Portal-D8hpO35p.js";import"./useClientLayoutEffect-Dbupq2RB.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-DSWBXVQ5.js";import"./Floating-caSKg8O2.js";import"./useDescendant-Bcr7RB2c.js";import"./DismissableLayer-YI4klIIr.js";import"./ChevronRight-BRRxKdRX.js";const b={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};export{t as IMenu,e as Knapp,b as default};

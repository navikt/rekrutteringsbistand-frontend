import{r as c,j as n,d as m}from"./iframe-8sML1qxS.js";import{R as a}from"./RegistrerFåttJobbenKnapp-CT58DXCt.js";import{A as o}from"./ActionMenu-Dce-AJBZ.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-DE6FvpHB.js";import"./useControllableState-C6Xv7p8h.js";import"./Portal-BCS47DUs.js";import"./useClientLayoutEffect-CVhQb8QH.js";import"./owner-CO0wgQ-G.js";import"./useLatestRef-Bc6puf5m.js";import"./useDescendant-mLI6B6jd.js";import"./DismissableLayer-Bl2AF_UL.js";import"./Floating-CR1mvX24.js";import"./ChevronRight-Bmuxpbm6.js";const U={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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

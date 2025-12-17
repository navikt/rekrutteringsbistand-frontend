import{r as c,j as n,d as m}from"./iframe-D4iOfYdD.js";import{R as a}from"./RegistrerFåttJobbenKnapp-CDL0MLyG.js";import{A as o}from"./ActionMenu-BujjFkuk.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-Cq1NJ1e2.js";import"./useControllableState-CCn3Haam.js";import"./Portal-Ct8fySNE.js";import"./useClientLayoutEffect-5Htf0mWj.js";import"./owner-CO0wgQ-G.js";import"./useLatestRef-DiUA6Zqh.js";import"./useDescendant-CZhV9_z5.js";import"./DismissableLayer-DZiHPteH.js";import"./Floating-CmfqUZcz.js";import"./ChevronRight-r3A9Ip-5.js";const U={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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

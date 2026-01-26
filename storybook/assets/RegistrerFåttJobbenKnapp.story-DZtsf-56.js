import{r as c,j as n,d as m}from"./iframe-DLcFPOQU.js";import{R as a}from"./RegistrerFåttJobbenKnapp-BNPIhpHJ.js";import{A as o}from"./ActionMenu-By4U1fQQ.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-DE-XYzXq.js";import"./useControllableState-klXAuQpk.js";import"./Portal-CDE48S_n.js";import"./useClientLayoutEffect-C8cW1GFx.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-BSJ7xw7j.js";import"./Floating-XBKqXmG6.js";import"./useDescendant-Bh34eNTl.js";import"./DismissableLayer-CFcBKd-R.js";import"./ChevronRight-507tYxdX.js";const U={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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

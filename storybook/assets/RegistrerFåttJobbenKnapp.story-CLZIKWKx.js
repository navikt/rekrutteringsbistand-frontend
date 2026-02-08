import{r as c,j as n,d as m}from"./iframe-eUZc9IfG.js";import{R as a}from"./RegistrerFåttJobbenKnapp-un1pIzFY.js";import{A as o}from"./ActionMenu-CDT79EY2.js";import"./preload-helper-PPVm8Dsz.js";import"./CheckmarkCircle-Y0IgziDi.js";import"./Modal.context-BIF9Tjeq.js";import"./useControllableState-Becg88hF.js";import"./Portal-Sxhxb8JS.js";import"./useClientLayoutEffect-BJpTkOfa.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-BIBmpn5w.js";import"./Floating-sz1mxhxq.js";import"./useDescendant-CISw4Ovu.js";import"./DismissableLayer-BJaKTL7j.js";import"./ChevronRight-DnX4lRv5.js";const b={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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

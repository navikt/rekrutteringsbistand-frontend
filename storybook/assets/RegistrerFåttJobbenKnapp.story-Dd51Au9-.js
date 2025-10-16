import{r as c,j as n,e as m}from"./iframe-Cg2fkqe5.js";import{R as a}from"./RegistrerFåttJobbenKnapp-42E2mCVE.js";import{A as o}from"./ActionMenu-D2N9Iubi.js";import"./preload-helper-BWMAHTUm.js";import"./Modal.context-CyWWEpn_.js";import"./useControllableState-CwuKQ8Mr.js";import"./Portal-DNhx24vR.js";import"./useDescendant-CAAHdarD.js";import"./useClientLayoutEffect-B_Yh-X2q.js";import"./DismissableLayer-uEx1HtDr.js";import"./Floating-BXMAhPNs.js";import"./ChevronRight-ZU5KhQtv.js";const C={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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

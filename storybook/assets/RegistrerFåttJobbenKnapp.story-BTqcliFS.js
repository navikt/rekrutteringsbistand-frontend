import{r as c,j as n,d as m}from"./iframe-CS4cw4gB.js";import{R as a}from"./RegistrerFåttJobbenKnapp-C4NxYCJh.js";import{A as o}from"./ActionMenu-1CNNC7AQ.js";import"./preload-helper-PPVm8Dsz.js";import"./CheckmarkCircle-2gn0dFuq.js";import"./Modal.context-Cq02MwlR.js";import"./useControllableState-d5HlKukQ.js";import"./Portal-CyvltQ2b.js";import"./useClientLayoutEffect-C1L6rLPT.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-hxxWJ-et.js";import"./Floating-CkMCyzDm.js";import"./useDescendant-BSTG9OiP.js";import"./DismissableLayer-BWglAePK.js";import"./ChevronRight-YfQRRqLy.js";const b={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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

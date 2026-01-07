import{r as c,j as n,d as m}from"./iframe-rNYAyblL.js";import{R as a}from"./RegistrerFåttJobbenKnapp-CA9J0-4U.js";import{A as o}from"./ActionMenu-iBc27BxO.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-BOFYqOBv.js";import"./useControllableState-BIhpMQIW.js";import"./Portal-k63-yw1W.js";import"./useClientLayoutEffect-B9Y6M99n.js";import"./owner-CO0wgQ-G.js";import"./useLatestRef-dCZ-jBnn.js";import"./useDescendant-D05-5IgL.js";import"./DismissableLayer-sCDQcEC2.js";import"./Floating-BI3ChyXY.js";import"./ChevronRight-BPZvkTXq.js";const U={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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

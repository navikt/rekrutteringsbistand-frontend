import{r as c,j as n,d as m}from"./iframe-CeBddf6m.js";import{R as a}from"./RegistrerFåttJobbenKnapp-qgEPPqQi.js";import{A as o}from"./ActionMenu-CcfBY--f.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-DHabSalL.js";import"./useControllableState-Z5xfEuBZ.js";import"./Portal-xuNywQp0.js";import"./useClientLayoutEffect-LE5s5o8b.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-BfGve3Gx.js";import"./Floating-zp7EWh3L.js";import"./useDescendant-B8uZGA4T.js";import"./DismissableLayer-BVglxUyP.js";import"./ChevronRight-BS1GcyjH.js";const U={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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

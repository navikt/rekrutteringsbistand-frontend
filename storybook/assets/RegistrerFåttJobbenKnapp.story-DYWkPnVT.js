import{r as c,j as n,d as m}from"./iframe-SGs9n5AY.js";import{R as a}from"./RegistrerFåttJobbenKnapp-D6yR5GQq.js";import{A as o}from"./ActionMenu-D4KiZ2BO.js";import"./preload-helper-PPVm8Dsz.js";import"./CheckmarkCircle-CVplf9-9.js";import"./Modal.context-BKWfvGQj.js";import"./useControllableState-B3K6rjpl.js";import"./Portal-DK1RB1pW.js";import"./useClientLayoutEffect-B_bLdoEO.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-CTyKq8r-.js";import"./Floating-CZpSQI3O.js";import"./useDescendant-C5FaV9Ln.js";import"./DismissableLayer-qvel5ih6.js";import"./ChevronRight-BZDSz-Eu.js";const b={tags:["autodocs"],component:a},s=r=>alert("Utfall valgt: "+r),e={args:{endreUtfallForKandidat:s}},t={args:{endreUtfallForKandidat:s},render:r=>{const[i,p]=c.useState(!1);return n.jsxs(o,{open:i,onOpenChange:p,children:[n.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(a,{actionMenu:!0,...r})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
